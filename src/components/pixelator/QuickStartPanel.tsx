import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const PRESETS = [
  { size: 32, labelKey: 'quickstart.coarse' },
  { size: 16, labelKey: 'quickstart.retro' },
  { size: 8,  labelKey: 'quickstart.standard' },
  { size: 4,  labelKey: 'quickstart.fine' },
];

interface ThumbnailCardProps {
  imageData: ImageData;
  pixelSize: number;
  label: string;
  onClick: () => void;
}

function ThumbnailCard({ imageData, pixelSize, label, onClick }: ThumbnailCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = imageData;
    // 缩小到像素块数量对应的分辨率，再用 pixelated 渲染放大
    const smallW = Math.max(1, Math.round(width / pixelSize));
    const smallH = Math.max(1, Math.round(height / pixelSize));

    // 先把完整 ImageData 写入临时 canvas
    const temp = document.createElement('canvas');
    temp.width = width;
    temp.height = height;
    temp.getContext('2d')!.putImageData(imageData, 0, 0);

    // 缩小（浏览器双线性插值 ≈ 块平均色）
    canvas.width = smallW;
    canvas.height = smallH;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(temp, 0, 0, smallW, smallH);
  }, [imageData, pixelSize]);

  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/15 bg-white dark:bg-gray-800 focus:outline-none focus:border-primary-500"
    >
      {/* 缩略图 */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block group-hover:scale-105 transition-transform duration-300 origin-center"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* 标签区 */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</span>
        <span className="text-xs font-mono font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/40 px-2 py-0.5 rounded-full shrink-0">
          {pixelSize}px
        </span>
      </div>
    </button>
  );
}

interface QuickStartPanelProps {
  originalImageData: ImageData;
  onSelect: (pixelSize: number) => void;
}

export function QuickStartPanel({ originalImageData, onSelect }: QuickStartPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
      {/* 标题 */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          {t('quickstart.title')}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {t('quickstart.subtitle')}
        </p>
      </div>

      {/* 4 张预览卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRESETS.map(preset => (
          <ThumbnailCard
            key={preset.size}
            imageData={originalImageData}
            pixelSize={preset.size}
            label={t(preset.labelKey)}
            onClick={() => onSelect(preset.size)}
          />
        ))}
      </div>

      <p className="mt-3 text-xs text-center text-gray-400 dark:text-gray-500">
        {t('quickstart.hint')}
      </p>
    </div>
  );
}
