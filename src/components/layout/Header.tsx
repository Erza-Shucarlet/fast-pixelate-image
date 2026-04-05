import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

const LANGUAGES = [
  { code: 'en',    label: 'EN' },
  { code: 'zh',    label: '中' },
  { code: 'zh-TW', label: '繁' },
  { code: 'ru',    label: 'РУ' },
  { code: 'fr',    label: 'FR' },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  // 语言匹配：当前语言前缀匹配（如 zh-CN → zh）
  const activeLang = LANGUAGES.find(l => i18n.language === l.code)
    ? i18n.language
    : LANGUAGES.find(l => i18n.language.startsWith(l.code.split('-')[0]))?.code ?? 'en';

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1" fill="white" opacity="0.9"/>
              <rect x="10" y="1" width="7" height="7" rx="1" fill="white" opacity="0.6"/>
              <rect x="1" y="10" width="7" height="7" rx="1" fill="white" opacity="0.6"/>
              <rect x="10" y="10" width="7" height="7" rx="1" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">Fast Pixelate Image</span>
        </a>

        {/* 标语（中等屏幕以上显示） */}
        <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 font-medium">
          {t('header.tagline')}
        </p>

        {/* 右侧：语言切换 + 主题切换 */}
        <div className="flex items-center gap-2">
          {/* 语言切换 */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`px-2 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeLang === lang.code
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* 明暗主题切换 */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? (
              /* 太阳图标（暗模式下显示，点击切亮） */
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              /* 月亮图标（亮模式下显示，点击切暗） */
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
