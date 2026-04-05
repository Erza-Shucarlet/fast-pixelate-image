// Web Worker：像素化处理逻辑（在独立线程中运行，避免 UI 卡顿）
import type { WorkerInput } from '../types';

// 将亮度/对比度调整应用到单个像素值
function applyBrightnessContrast(value: number, brightness: number, contrast: number): number {
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  let v = value + brightness * 2.55;
  v = factor * (v - 128) + 128;
  return Math.max(0, Math.min(255, Math.round(v)));
}

// RGB 转灰度（ITU-R BT.601）
function toGrayscale(r: number, g: number, b: number): number {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

// 8-bit 量化（16 色）
function quantizeTo8bit(r: number, g: number, b: number): [number, number, number] {
  const levels = [0, 85, 170, 255];
  const q = (v: number) => levels[Math.round(v / 85)];
  return [q(r), q(g), q(b)];
}

// 自定义颜色数量化
function quantizeToCustom(r: number, g: number, b: number, colorCount: number): [number, number, number] {
  const step = Math.round(255 / (colorCount - 1));
  const q = (v: number) => Math.round(v / step) * step;
  return [q(r), q(g), q(b)];
}

// 主像素化函数（仅方形）
function pixelate(imageData: ImageData, options: import('../types').PixelateOptions): ImageData {
  const { width, height, data } = imageData;
  const { pixelSize, colorPalette, contrast, brightness, customColors = 16 } = options;

  const output = new ImageData(width, height);
  const outputData = output.data;

  for (let blockY = 0; blockY < height; blockY += pixelSize) {
    for (let blockX = 0; blockX < width; blockX += pixelSize) {
      const blockW = Math.min(pixelSize, width - blockX);
      const blockH = Math.min(pixelSize, height - blockY);

      // 计算块内平均颜色
      let sumR = 0, sumG = 0, sumB = 0, sumA = 0, count = 0;
      for (let y = blockY; y < blockY + blockH; y++) {
        for (let x = blockX; x < blockX + blockW; x++) {
          const idx = (y * width + x) * 4;
          sumR += data[idx];
          sumG += data[idx + 1];
          sumB += data[idx + 2];
          sumA += data[idx + 3];
          count++;
        }
      }
      let avgR = Math.round(sumR / count);
      let avgG = Math.round(sumG / count);
      let avgB = Math.round(sumB / count);
      const avgA = Math.round(sumA / count);

      // 亮度/对比度
      avgR = applyBrightnessContrast(avgR, brightness, contrast);
      avgG = applyBrightnessContrast(avgG, brightness, contrast);
      avgB = applyBrightnessContrast(avgB, brightness, contrast);

      // 调色板
      let finalR = avgR, finalG = avgG, finalB = avgB;
      if (colorPalette === 'grayscale') {
        finalR = finalG = finalB = toGrayscale(avgR, avgG, avgB);
      } else if (colorPalette === '8bit') {
        [finalR, finalG, finalB] = quantizeTo8bit(avgR, avgG, avgB);
      } else if (colorPalette === 'custom') {
        [finalR, finalG, finalB] = quantizeToCustom(avgR, avgG, avgB, customColors);
      }

      // 填充方形像素块
      for (let y = blockY; y < blockY + blockH; y++) {
        for (let x = blockX; x < blockX + blockW; x++) {
          const idx = (y * width + x) * 4;
          outputData[idx]     = finalR;
          outputData[idx + 1] = finalG;
          outputData[idx + 2] = finalB;
          outputData[idx + 3] = avgA;
        }
      }
    }
  }

  return output;
}

self.addEventListener('message', (event: MessageEvent<WorkerInput>) => {
  const { imageData, options } = event.data;
  const result = pixelate(imageData, options);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (self as any).postMessage({ imageData: result }, [result.data.buffer]);
});
