import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';
import zhTW from './locales/zh-TW.json';
import ru from './locales/ru.json';
import fr from './locales/fr.json';

i18n
  .use(LanguageDetector)       // 自动检测浏览器语言
  .use(initReactI18next)       // 绑定 React
  .init({
    resources: {
      en:    { translation: en },
      zh:    { translation: zh },
      'zh-TW': { translation: zhTW },
      ru:    { translation: ru },
      fr:    { translation: fr },
    },
    fallbackLng: 'en',         // 未匹配语言时回退到英文
    interpolation: {
      escapeValue: false,      // React 已处理 XSS
    },
    detection: {
      // 检测顺序：URL 参数 → 本地存储 → 浏览器语言
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
