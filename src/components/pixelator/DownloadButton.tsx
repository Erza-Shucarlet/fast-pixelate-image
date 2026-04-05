import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { DownloadFormat } from '../../types';

interface DownloadButtonProps {
  onDownload: (format: DownloadFormat, withGrid: boolean) => void;
  disabled: boolean;
}

export function DownloadButton({ onDownload, disabled }: DownloadButtonProps) {
  const { t } = useTranslation();
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('png');
  const [withGrid, setWithGrid] = useState(false);

  const formats: { value: DownloadFormat; label: string; desc: string }[] = [
    { value: 'png',  label: 'PNG',  desc: t('download.png_desc') },
    { value: 'jpeg', label: 'JPEG', desc: t('download.jpeg_desc') },
    { value: 'webp', label: 'WebP', desc: t('download.webp_desc') },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* 格式选择 */}
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            {t('download.format')}
          </p>
          <div className="flex gap-2">
            {formats.map(fmt => (
              <button
                key={fmt.value}
                onClick={() => setSelectedFormat(fmt.value)}
                disabled={disabled}
                className={`flex-1 sm:flex-none px-3 py-2 rounded-lg border text-sm transition-all ${
                  selectedFormat === fmt.value
                    ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 text-primary-700 dark:text-primary-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <span className="font-semibold block">{fmt.label}</span>
                <span className="text-xs opacity-70">{fmt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={() => onDownload(selectedFormat, withGrid)}
          disabled={disabled}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-indigo-500 hover:from-primary-700 hover:to-indigo-600 shadow-md hover:shadow-primary-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t('download.button')}
        </button>
      </div>

      {/* 网格线导出勾选 */}
      <label className={`flex items-center gap-2 cursor-pointer select-none w-fit ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
        <input
          type="checkbox"
          checked={withGrid}
          onChange={e => setWithGrid(e.target.checked)}
          className="w-4 h-4 accent-primary-600 rounded"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">{t('download.with_grid')}</span>
      </label>
    </div>
  );
}
