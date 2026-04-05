import { useTranslation } from 'react-i18next';

export function PrivacyPolicy() {
  const { t } = useTranslation();

  const sections = [
    { title: t('privacy.intro_title'),      text: t('privacy.intro_text') },
    { title: t('privacy.data_title'),       text: t('privacy.data_text') },
    { title: t('privacy.local_title'),      text: t('privacy.local_text') },
    { title: t('privacy.ads_title'),        text: t('privacy.ads_text') },
    { title: t('privacy.analytics_title'),  text: t('privacy.analytics_text') },
    { title: t('privacy.cookies_title'),    text: t('privacy.cookies_text') },
    { title: t('privacy.contact_title'),    text: t('privacy.contact_text') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mb-8"
        >
          {t('privacy.back_home')}
        </a>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('privacy.title')}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          {t('privacy.last_updated')}
        </p>

        <div className="space-y-8">
          {sections.map((sec, i) => (
            <section key={i}>
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {sec.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {sec.text}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
