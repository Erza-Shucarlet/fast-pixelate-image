// 像素化参数配置
export interface PixelateOptions {
  pixelSize: number;       // 像素块大小（2–64px）
  colorPalette: ColorPalette;
  shape: PixelShape;
  contrast: number;        // -50 到 +50
  brightness: number;      // -50 到 +50
  customColors?: number;   // Custom 模式下颜色数量（4–256）
}

export type ColorPalette = 'original' | 'grayscale' | '8bit' | 'custom';
export type PixelShape = 'square';

// Web Worker 消息类型
export interface WorkerInput {
  imageData: ImageData;
  options: PixelateOptions;
}

export interface WorkerOutput {
  imageData: ImageData;
}

// 下载格式
export type DownloadFormat = 'png' | 'jpeg' | 'webp';
