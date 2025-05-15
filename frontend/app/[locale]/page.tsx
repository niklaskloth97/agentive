// app/[locale]/page.tsx
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
export default function Homepage() {
  const t = useTranslations('common');
  return (
    <div className="container mx-auto py-8 px-8 font-[var(--font-geist-sans)]">
  <h1 className="text-3xl font-bold mb-6">{t('hp.heading')}</h1>
  <h2 className="text-xl font-semibold mb-4">{t('hp.subheading')}</h2>

  <div className="flex flex-col md:flex-row gap-8">
    <div>
      <p className="text-gray-600 mb-6 dark:text-white">{t('hp.intro_paragraph')}</p>

      <h2 className="text-lg font-semibold mb-2">{t('hp.expect_heading')}</h2>
      <p className="text-gray-600 mb-2 dark:text-white">{t('hp.expect_text_1')}</p>
      <p className="text-gray-600 mb-4 dark:text-white">{t('hp.expect_text_2')}</p>

      <h2 className="text-lg font-semibold mb-2">{t('hp.who_heading')}</h2>
      <p className="text-gray-600 mb-4 dark:text-white">{t('hp.who_text')}</p>

      <h2 className="text-lg font-semibold mb-2">{t('hp.team_heading')}</h2>
      <p className="text-gray-600 mb-4 dark:text-white">{t('hp.team_text')}</p>

      <h2 className="text-lg font-semibold mb-2">{t('hp.blog_heading')}</h2>
      <p className="text-gray-600 mb-4 dark:text-white">{t('hp.blog_text')}</p>

      <h2 className="text-lg font-semibold mb-2">{t('hp.stay_heading')}</h2>
      <p className="text-gray-600 mb-2 dark:text-white">{t('hp.stay_text_1')}</p>
      <p className="text-gray-600 mb-4 dark:text-white">{t('hp.stay_text_2')}</p>
    </div>
  </div>
</div>
  );
}