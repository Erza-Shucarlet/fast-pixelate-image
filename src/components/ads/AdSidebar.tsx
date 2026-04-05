// 广告侧边栏组件（160x600 大矩形广告位）
// 接入真实 AdSense 步骤：
// 1. 在 index.html 中取消注释 AdSense script 标签
// 2. 将下方 <ins> 标签的 data-ad-client 替换为 "ca-pub-XXXXXXXXXX"
// 3. 将 data-ad-slot 替换为您的广告单元 ID

import { useTranslation } from 'react-i18next';

interface AdSidebarProps {
  position: 'left' | 'right';
}

export function AdSidebar({ position }: AdSidebarProps) {
  const { t } = useTranslation();

  return (
    <aside
      className={`hidden xl:flex flex-col items-center justify-start pt-8 w-[180px] shrink-0 ${
        position === 'left' ? 'pl-2' : 'pr-2'
      }`}
    >
      <div className="sticky top-8">
        {/* 广告标签 */}
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest text-center mb-1">
          {t('ads.label')}
        </p>
        {/* 占位容器（160×600） */}
        <div
          className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex items-center justify-center"
          style={{ width: 160, height: 600 }}
        >
          {/* 真实 AdSense 代码替换此占位块：
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: 160, height: 600 }}
              data-ad-client="ca-pub-XXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
            />
          */}
          <span className="text-xs text-gray-400 dark:text-gray-600 rotate-90 whitespace-nowrap">160 × 600</span>
        </div>
      </div>
    </aside>
  );
}
