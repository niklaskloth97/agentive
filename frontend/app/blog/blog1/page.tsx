import { useTranslation } from 'next-i18next';
export default function About() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-3xl font-bold mb-6">{t('about_title')}</h1>
      <p className="text-gray-600 dark:text-white font-semibold mb-4">{t('paragraph_1')}</p>
      <p className="text-gray-600 dark:text-white mb-4">{t('paragraph_2')}</p>

      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <h2 className="text-m font-semibold mb-4">{t('section_1_title')}</h2>
          <p className="text-gray-600 dark:text-white mb-4">{t('section_1_text_1')}</p>
          <p className="text-gray-600 dark:text-white mb-4">{t('section_1_text_2')}</p>

          <h2 className="text-m font-semibold mb-4">{t('section_2_title')}</h2>
          <p className="text-gray-600 dark:text-white mb-4">{t('section_2_text_1')}</p>
          <p className="text-gray-600 dark:text-white mb-4">{t('section_2_text_2')}</p>
        </div>
      </div>
    </div>
  )
}