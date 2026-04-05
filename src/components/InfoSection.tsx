import { useTranslation } from 'react-i18next';

export function InfoSection() {
  const { t } = useTranslation();

  const advantages = [
    t('info.adv1'),
    t('info.adv2'),
    t('info.adv3'),
    t('info.adv4'),
    t('info.adv5'),
    t('info.adv6'),
  ];

  const faqs = [
    { q: t('info.faq1q'), a: t('info.faq1a') },
    { q: t('info.faq2q'), a: t('info.faq2a') },
    { q: t('info.faq3q'), a: t('info.faq3a') },
    { q: t('info.faq4q'), a: t('info.faq4a') },
    { q: t('info.faq5q'), a: t('info.faq5a') },
  ];

  return (
    <div className="space-y-8 mt-4">
      {/* What is Pixelate Image */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {t('info.what_title')}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t('info.what_text')}
        </p>
      </section>

      {/* Why Use Fast Pixelate Image */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {t('info.adv_title')}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {advantages.map((adv, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{adv}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {t('info.faq_title')}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {faq.q}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </p>
              {i < faqs.length - 1 && (
                <hr className="mt-4 border-gray-100 dark:border-gray-800" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
