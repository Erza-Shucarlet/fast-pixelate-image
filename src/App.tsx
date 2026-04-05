import { useCallback, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdSidebar } from './components/ads/AdSidebar';
import { AdBanner } from './components/ads/AdBanner';
import { UploadZone } from './components/pixelator/UploadZone';
import { QuickStartPanel } from './components/pixelator/QuickStartPanel';
import { ControlPanel, DEFAULT_OPTIONS } from './components/pixelator/ControlPanel';
import { PreviewCanvas } from './components/pixelator/PreviewCanvas';
import { DownloadButton } from './components/pixelator/DownloadButton';
import { InfoSection } from './components/InfoSection';
import { usePixelate } from './hooks/usePixelate';
import type { PixelateOptions } from './types';

export default function App() {
  const {
    originalImageData,
    pixelatedImageData,
    isProcessing,
    error,
    loadImage,
    processImage,
    downloadImage,
    imageInfo,
  } = usePixelate();

  const [options, setOptions] = useState<PixelateOptions>(DEFAULT_OPTIONS);
  const [showGrid, setShowGrid] = useState(true);
  // 是否已完成预设选择，进入自定义调整阶段
  const [presetSelected, setPresetSelected] = useState(false);

  // 新图片上传时重置到快速开始阶段
  const handleLoadImage = useCallback((file: File) => {
    setPresetSelected(false);
    setOptions(DEFAULT_OPTIONS);
    loadImage(file);
  }, [loadImage]);

  // 用户在快速开始面板中选定一个预设
  const handlePresetSelect = useCallback((pixelSize: number) => {
    const newOptions = { ...DEFAULT_OPTIONS, pixelSize };
    setOptions(newOptions);
    processImage(newOptions);
    setPresetSelected(true);
  }, [processImage]);

  const handleOptionsChange = useCallback((newOptions: PixelateOptions) => {
    setOptions(newOptions);
    processImage(newOptions);
  }, [processImage]);

  const hasImage = Boolean(originalImageData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-4">
        <AdSidebar position="left" />

        <div className="flex-1 min-w-0 space-y-4">
          {/* SEO H1 hero 区域 */}
          <div className="text-center py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
              Pixelate Image Online – Free &amp; Instant
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Upload any photo to pixelate image areas, blur faces, censor private info, or generate retro pixel art. Free, private, no sign-up required.
            </p>
          </div>

          {/* 上传区域 */}
          <UploadZone onFileSelect={handleLoadImage} hasImage={hasImage} />

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9h2v4h-2V9zm0-2h2v2h-2V7z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* 快速开始：上传后、选定预设前 */}
          {hasImage && !presetSelected && (
            <QuickStartPanel
              originalImageData={originalImageData!}
              onSelect={handlePresetSelect}
            />
          )}

          {/* 自定义调整阶段：选定预设后 */}
          {hasImage && presetSelected && (
            <>
              <ControlPanel
                options={options}
                onChange={handleOptionsChange}
                showGrid={showGrid}
                onShowGridChange={setShowGrid}
                disabled={isProcessing}
              />

              <PreviewCanvas
                originalImageData={originalImageData}
                pixelatedImageData={pixelatedImageData}
                isProcessing={isProcessing}
                showGrid={showGrid}
                pixelSize={options.pixelSize}
                imageInfo={imageInfo}
              />

              <DownloadButton
                onDownload={downloadImage}
                disabled={!pixelatedImageData || isProcessing}
              />
            </>
          )}

          <div className={`border-t border-gray-200 dark:border-gray-800 pt-10 ${hasImage ? 'mt-8' : 'mt-24'}`}>
            <InfoSection />
          </div>
        </div>

        <AdSidebar position="right" />
      </main>

      <AdBanner />
      <Footer />
    </div>
  );
}
