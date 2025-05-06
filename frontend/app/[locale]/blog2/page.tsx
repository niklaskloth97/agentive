'use client';

import { useTranslations } from 'next-intl';

export default function BlogPage() {
  const t = useTranslations('common');

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-3xl font-bold mb-6">{t('heading')}</h1>
      <h2 className="text-xl font-semibold">{t('subheading')}</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <p className="text-gray-600 mb-6 dark:text-white">{t('intro_paragraph')}</p>

          <h2 className="text-m font-semibold">{t('platform_heading')}</h2>
          <div className="text-gray-600 mb-4 dark:text-white">
            <p className="mb-1">{t('platform_intro')}</p>
            <ul className="list-disc ml-8">
              <li className="mb-1"><p className="font-semibold dark:text-white">{t('opensource_heading')}</p></li>
              <p className="font-sembibold dark:text-white">{t('opensource_text')}</p>

              <li className="mb-1"><p className="font-semibold dark:text-white">{t('licensing_heading')}</p></li>
              <p className="font-sembibold dark:text-white">{t('licensing_text')}</p>

              <li className="mb-1"><p className="font-semibold dark:text-white">{t('accessibility_heading')}</p></li>
              <p className="font-sembibold dark:text-white">{t('accessibility_text')}</p>
            </ul>
          </div>

          <h2 className="text-m font-semibold mb-2">{t('future_heading')}</h2>
          <div className="text-gray-600 mb-4 dark:text-white">
            <p className="mb-1">{t('future_intro')}</p>
            <ul className="list-disc ml-8">
              <li className="mb-1 dark:text-white">
                <p className="font-semibold dark:text-white">{t('materials_heading')}</p>
                <p className="font-sembibold dark:text-white">{t('materials_text')}</p>
              </li>
              <li className="mb-1 dark:text-white">
                <p className="font-semibold dark:text-white">{t('analytics_heading')}</p>
                <p className="font-sembibold dark:text-white">{t('analytics_text')}</p>
              </li>
              <li className="mb-1 dark:text-white">
                <p className="font-semibold dark:text-white">{t('development_heading')}</p>
                <p className="font-sembibold dark:text-white">{t('development_text')}</p>
              </li>
            </ul>
          </div>

          <p className="text-gray-600 mb-4 dark:text-white">{t('platform_summary')}</p>
          <p className="text-gray-600 mb-4 dark:text-white">{t('closing')}</p>

          <h2 className="text-m font-semibold mb-2">{t('tech_heading')}</h2>
          <div className="text-gray-600 mb-4 dark:text-white">
            <p className="mb-1">{t('tech_intro')}</p>
            <ul className="list-disc ml-8">
              <li className="mb-1">
                <p className="font-semibold">{t('react_heading')}</p>
                <p className="font-sembibold">{t('react_text')}</p>
              </li>
              <li className="mb-1">
                <p className="font-semibold">{t('shadcn_heading')}</p>
                <p className="font-sembibold">{t('shadcn_text')}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
