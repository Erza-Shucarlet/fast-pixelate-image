import { useState, useCallback, useRef, useEffect } from 'react';
import type { PixelateOptions } from '../types';

const MAX_PREVIEW_SIZE = 1200;

// 在 canvas 上绘制网格线
function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, pixelSize: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = pixelSize; x < width; x += pixelSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = pixelSize; y < height; y += pixelSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
  ctx.restore();
}

interface UsePixelateResult {
  originalImageData: ImageData | null;
  pixelatedImageData: ImageData | null;
  originalFile: File | null;
  isProcessing: boolean;
  error: string | null;
  loadImage: (file: File) => void;
  processImage: (options: PixelateOptions) => void;
  downloadImage: (format: 'png' | 'jpeg' | 'webp', withGrid: boolean) => void;
  imageInfo: {
    width: number;
    height: number;
    blockCount: number;
  } | null;
}

export function usePixelate(): UsePixelateResult {
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);
  const [pixelatedImageData, setPixelatedImageData] = useState<ImageData | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number; blockCount: number } | null>(null);

  const fullResImageDataRef = useRef<ImageData | null>(null);
  const lastOptionsRef = useRef<PixelateOptions | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/pixelate.worker.ts', import.meta.url),
      { type: 'module' }
    );
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const loadImage = useCallback((file: File) => {
    setError(null);
    setOriginalImageData(null);
    setPixelatedImageData(null);
    setImageInfo(null);

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!supportedTypes.includes(file.type)) {
      setError('Unsupported file format. Please use JPG, PNG, WEBP, or GIF.');
      return;
    }

    setOriginalFile(file);

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      const origW = img.width;
      const origH = img.height;

      const fullCanvas = document.createElement('canvas');
      fullCanvas.width = origW;
      fullCanvas.height = origH;
      const fullCtx = fullCanvas.getContext('2d')!;
      fullCtx.drawImage(img, 0, 0);
      fullResImageDataRef.current = fullCtx.getImageData(0, 0, origW, origH);

      let previewW = origW;
      let previewH = origH;
      if (origW > MAX_PREVIEW_SIZE || origH > MAX_PREVIEW_SIZE) {
        const scale = Math.min(MAX_PREVIEW_SIZE / origW, MAX_PREVIEW_SIZE / origH);
        previewW = Math.round(origW * scale);
        previewH = Math.round(origH * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = previewW;
      canvas.height = previewH;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, previewW, previewH);
      const previewImageData = ctx.getImageData(0, 0, previewW, previewH);

      setOriginalImageData(previewImageData);
      setImageInfo({ width: origW, height: origH, blockCount: 0 });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('Failed to load image. Please try another file.');
    };

    img.src = url;
  }, []);

  const processImage = useCallback((options: PixelateOptions) => {
    if (!originalImageData || !workerRef.current) return;
    lastOptionsRef.current = options;
    setIsProcessing(true);

    const worker = workerRef.current;

    worker.onmessage = (event: MessageEvent<{ imageData: ImageData }>) => {
      setPixelatedImageData(event.data.imageData);
      setIsProcessing(false);
      if (imageInfo) {
        const bx = Math.ceil(originalImageData.width / options.pixelSize);
        const by = Math.ceil(originalImageData.height / options.pixelSize);
        setImageInfo(prev => prev ? { ...prev, blockCount: bx * by } : prev);
      }
    };

    worker.onerror = () => {
      setIsProcessing(false);
      setError('Processing failed. Please try again.');
    };

    const cloned = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    );
    worker.postMessage({ imageData: cloned, options }, [cloned.data.buffer]);
  }, [originalImageData, imageInfo]);

  const downloadImage = useCallback((format: 'png' | 'jpeg' | 'webp', withGrid: boolean) => {
    if (!fullResImageDataRef.current || !lastOptionsRef.current) return;

    const options = lastOptionsRef.current;
    const fullWorker = new Worker(
      new URL('../workers/pixelate.worker.ts', import.meta.url),
      { type: 'module' }
    );

    fullWorker.onmessage = (event: MessageEvent<{ imageData: ImageData }>) => {
      const { imageData } = event.data;
      const canvas = document.createElement('canvas');
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      const ctx = canvas.getContext('2d')!;
      ctx.putImageData(imageData, 0, 0);

      // 可选：绘制网格线
      if (withGrid) {
        drawGrid(ctx, imageData.width, imageData.height, options.pixelSize);
      }

      const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      const quality = format === 'jpeg' ? 0.92 : undefined;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      const link = document.createElement('a');
      link.download = `pixelcraft-output.${format}`;
      link.href = dataUrl;
      link.click();

      fullWorker.terminate();
    };

    const cloned = new ImageData(
      new Uint8ClampedArray(fullResImageDataRef.current.data),
      fullResImageDataRef.current.width,
      fullResImageDataRef.current.height
    );
    fullWorker.postMessage({ imageData: cloned, options }, [cloned.data.buffer]);
  }, []);

  return {
    originalImageData,
    pixelatedImageData,
    originalFile,
    isProcessing,
    error,
    loadImage,
    processImage,
    downloadImage,
    imageInfo,
  };
}
