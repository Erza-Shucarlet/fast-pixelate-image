import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface PreviewCanvasProps {
  originalImageData: ImageData | null;
  pixelatedImageData: ImageData | null;
  isProcessing: boolean;
  showGrid: boolean;
  pixelSize: number;
  imageInfo: { width: number; height: number; blockCount: number } | null;
}

function drawImageData(canvas: HTMLCanvasElement, imageData: ImageData) {
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.putImageData(imageData, 0, 0);
}

// 在 canvas 上绘制像素块网格线
function drawGrid(canvas: HTMLCanvasElement, width: number, height: number, pixelSize: number) {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
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
}

export function PreviewCanvas({
  originalImageData,
  pixelatedImageData,
  isProcessing,
  showGrid,
  pixelSize,
  imageInfo,
}: PreviewCanvasProps) {
  const { t } = useTranslation();
  const origCanvasRef = useRef<HTMLCanvasElement>(null);
  const pixelCanvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dividerX, setDividerX] = useState(50);
  const isDragging = useRef(false);

  useEffect(() => {
    if (originalImageData && origCanvasRef.current) {
      drawImageData(origCanvasRef.current, originalImageData);
    }
  }, [originalImageData]);

  useEffect(() => {
    if (pixelatedImageData && pixelCanvasRef.current) {
      drawImageData(pixelCanvasRef.current, pixelatedImageData);
    }
  }, [pixelatedImageData]);

  // 网格线：pixelatedImageData 或 showGrid 或 pixelSize 变化时重绘
  useEffect(() => {
    if (!gridCanvasRef.current || !pixelatedImageData) return;
    if (showGrid) {
      drawGrid(gridCanvasRef.current, pixelatedImageData.width, pixelatedImageData.height, pixelSize);
    } else {
      // 清空网格
      gridCanvasRef.current.width = pixelatedImageData.width;
      gridCanvasRef.current.height = pixelatedImageData.height;
      const ctx = gridCanvasRef.current.getContext('2d')!;
      ctx.clearRect(0, 0, pixelatedImageData.width, pixelatedImageData.height);
    }
  }, [pixelatedImageData, showGrid, pixelSize]);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
  }, []);

  const updateDivider = useCallback((clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setDividerX((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => updateDivider(e.clientX);
    const handleTouchMove = (e: TouchEvent) => updateDivider(e.touches[0].clientX);
    const handleEnd = () => { isDragging.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [updateDivider]);

  if (!originalImageData) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center h-64 text-gray-400 dark:text-gray-600 text-sm">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 3v18M3 3l18 18" />
          </svg>
          <p>{t('upload.placeholder')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* 图片信息栏 */}
      {imageInfo && (
        <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          <span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{imageInfo.width}</span> × <span className="font-medium text-gray-700 dark:text-gray-300">{imageInfo.height}</span> px
          </span>
          {imageInfo.blockCount > 0 && (
            <span>{imageInfo.blockCount.toLocaleString()} {t('preview.blocks')}</span>
          )}
          {isProcessing && (
            <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
              <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              {t('preview.processing')}
            </span>
          )}
        </div>
      )}

      {/* 分屏预览 */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{ aspectRatio: `${originalImageData.width} / ${originalImageData.height}`, maxHeight: '60vh' }}
      >
        {/* 原图（右半部分背景） */}
        <canvas
          ref={origCanvasRef}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* 像素化效果（左半部分，通过 clip 裁剪） */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${dividerX}%` }}
        >
          <canvas
            ref={pixelCanvasRef}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ width: `${100 / (dividerX / 100)}%`, imageRendering: 'pixelated' }}
          />
          {/* 网格线叠层（随像素化层一起裁剪） */}
          <canvas
            ref={gridCanvasRef}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ width: `${100 / (dividerX / 100)}%`, imageRendering: 'pixelated' }}
          />
        </div>

        {/* 分隔条 */}
        <div
          className="absolute top-0 bottom-0 w-1 cursor-col-resize"
          style={{ left: `${dividerX}%`, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)', boxShadow: '0 0 0 1.5px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.18)' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* 手柄：紫色渐变圆形，带双箭头图标 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full cursor-col-resize flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 2px 12px rgba(124,58,237,0.5), 0 0 0 3px rgba(255,255,255,0.9)' }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
            </svg>
          </div>
        </div>

        {/* 标签 */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-md backdrop-blur-sm">
            {t('preview.pixelated')}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-md backdrop-blur-sm">
            {t('preview.original')}
          </span>
        </div>

        {/* 处理中遮罩 */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl px-5 py-3 shadow-lg flex items-center gap-3">
              <svg className="w-5 h-5 animate-spin text-primary-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('preview.processing')}</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-2">{t('preview.drag_to_compare')}</p>
    </div>
  );
}
