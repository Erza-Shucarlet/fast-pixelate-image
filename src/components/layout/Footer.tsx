import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-4 text-center text-xs text-gray-300 dark:text-gray-600">
      <span>{t('footer.copyright')}</span>
      <span className="mx-2 opacity-40">·</span>
      <a
        href="/privacy"
        className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
      >
        {t('footer.privacy')}
      </a>
      <span className="mx-2 opacity-40">·</span>
      <a
        href="mailto:shucarlet@gmail.com?subject=Fast%20Pixelate%20Image%20Feedback"
        className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
      >
        {t('footer.contact')}
      </a>
    </footer>
  );
}
