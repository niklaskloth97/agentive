// app/[locale]/page.tsx
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
export default function Blog() {
  const t = useTranslations('common');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/blog">{t('blog')}</Link>
    </div>
  );
}

