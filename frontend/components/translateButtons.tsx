'use client';

import { useTranslation } from '@/hooks/use-translation';

interface TranslatedTextProps {
  translationKey: string;
  currentLanguage: string;
  fallback?: string;
  className?: string;
}

export const TranslateButtons: React.FC<TranslatedTextProps> = ({ 
  translationKey, 
  currentLanguage, 
  fallback,
  className 
}) => {
  const { translate } = useTranslation(currentLanguage);
  const text = translate(translationKey) || fallback || translationKey;
  
  return <span className={className}>{text}</span>;
};