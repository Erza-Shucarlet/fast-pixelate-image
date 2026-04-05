import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('footer.copyright')}</p>
        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="text-sm text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {t('footer.privacy')}
          </a>
          <a
            href="mailto:shucarlet@gmail.com?subject=Fast%20Pixelate%20Image%20Feedback"
            className="text-sm text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {t('footer.contact')}
          </a>
        </div>
      </div>
    </footer>
  );
}
