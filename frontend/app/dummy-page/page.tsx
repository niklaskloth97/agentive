"use client";

import Image from 'next/image'
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext'
import { TranslateButtons } from '@/components/translateButtons'

export default function DummyPage() {
  const { websiteLanguage } = useWebsiteLanguage();

  return (    
  <div className="container mx-auto px-8">
      <h1 className="text-3xl font-bold mb-6">
        <TranslateButtons translationKey="dummy-page-title" currentLanguage={websiteLanguage} />
      </h1>


    </div>
  );
}
