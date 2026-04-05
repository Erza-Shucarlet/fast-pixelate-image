// 底部横幅广告组件（728x90）
// 接入真实 AdSense 步骤：同 AdSidebar，替换 data-ad-client 和 data-ad-slot

import { useTranslation } from 'react-i18next';

export function AdBanner() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center py-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1">
        {t('ads.label')}
      </p>
      {/* 占位容器（728×90，Leaderboard 标准尺寸）移动端改为小横幅 */}
      <div
        className="hidden md:flex bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded items-center justify-center"
        style={{ width: 728, height: 90 }}
      >
        {/* 真实 AdSense 代码替换此占位块：
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: 728, height: 90 }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
          />
        */}
        <span className="text-xs text-gray-400 dark:text-gray-600">728 × 90</span>
      </div>
      {/* 移动端：320×50 小横幅 */}
      <div
        className="flex md:hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded items-center justify-center"
        style={{ width: 320, height: 50 }}
      >
        <span className="text-xs text-gray-400 dark:text-gray-600">320 × 50</span>
      </div>
    </div>
  );
}
