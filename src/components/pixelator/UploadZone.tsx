import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  hasImage: boolean;
}

export function UploadZone({ onFileSelect, hasImage }: UploadZoneProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }, [handleFile]);

  /* ── 有图片时：紧凑换图条 ── */
  if (hasImage) {
    return (
      <label className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl cursor-pointer border-2 border-dashed transition-all duration-200 ${
        isDragging
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50/40 dark:hover:bg-primary-900/10'
      }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleInputChange} />
        <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400">{t('upload.drag_drop')}</span>
      </label>
    );
  }

  /* ── 无图片时：大型视觉上传区 ── */
  return (
    <label
      className={`group relative flex flex-col items-center justify-center w-full py-14 rounded-2xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
        isDragging
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-[1.01]'
          : 'border-primary-200 dark:border-primary-800/60 bg-gradient-to-b from-primary-50/60 to-white dark:from-primary-900/10 dark:to-gray-900 hover:border-primary-400 hover:from-primary-50 hover:shadow-lg hover:shadow-primary-500/10'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleInputChange} />

      {/* 圆形图标区 */}
      <div className="relative mb-5">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDragging
            ? 'bg-primary-100 dark:bg-primary-800/40 shadow-lg shadow-primary-500/20'
            : 'bg-primary-100 dark:bg-primary-900/40 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 group-hover:shadow-xl group-hover:shadow-primary-500/20'
        }`}>
          <svg
            className={`w-11 h-11 transition-all duration-300 ${
              isDragging ? 'text-primary-600 scale-110' : 'text-primary-400 dark:text-primary-500 group-hover:text-primary-600 group-hover:scale-105'
            }`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        {/* 右下角 + 徽章 */}
        <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
          isDragging ? 'bg-primary-600 scale-110' : 'bg-primary-500 group-hover:bg-primary-600 group-hover:scale-110'
        }`}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>

      {/* 文字区 */}
      <p className={`text-lg font-semibold transition-colors duration-300 ${
        isDragging ? 'text-primary-700 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200 group-hover:text-primary-700 dark:group-hover:text-primary-400'
      }`}>
        {t('upload.drag_drop')}
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1.5">
        {t('upload.or_click')}
      </p>
      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-800/60 px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
        {t('upload.supported')}
      </p>
    </label>
  );
}
