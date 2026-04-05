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
    // 清空 input，允许重复上传同一文件
    e.target.value = '';
  }, [handleFile]);

  return (
    <label
      className={`relative flex flex-col items-center justify-center w-full rounded-xl cursor-pointer transition-all duration-200 ${
        hasImage ? 'py-4' : 'py-12'
      } border-2 border-dashed ${
        isDragging
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-primary-400 hover:bg-primary-50/30 dark:hover:bg-primary-900/10'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="sr-only"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleInputChange}
      />

      {/* 上传图标 */}
      <div className={`mb-3 rounded-full p-3 transition-colors ${
        isDragging ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-white dark:bg-gray-700 shadow-sm'
      }`}>
        <svg
          className={`w-7 h-7 ${isDragging ? 'text-primary-600' : 'text-gray-400 dark:text-gray-500'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>

      <p className={`text-sm font-semibold ${isDragging ? 'text-primary-700' : 'text-gray-700 dark:text-gray-300'}`}>
        {t('upload.drag_drop')}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('upload.or_click')}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600">
        {t('upload.supported')}
      </p>
    </label>
  );
}
