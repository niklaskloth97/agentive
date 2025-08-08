"use client"

import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { ACTIVITY_GROUPS_META } from "@/data";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';
import { Download } from "lucide-react";

export default function Page() {
  const { websiteLanguage } = useWebsiteLanguage();

  const breadcrumbItems = [
    { 
      label: <TranslateButtons translationKey="multilingual-ressources" currentLanguage={websiteLanguage} />, 
      href: "/dashboard/" 
    },
    { 
      label: <TranslateButtons translationKey="activities" currentLanguage={websiteLanguage} />
    }
  ];

  // Function to map activity group keys to translation keys
  const getTranslationKey = (key: string): string => {
    // The keys in ACTIVITY_GROUPS_META should match the translation keys
    return key;
  };

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-8">
          <TranslateButtons translationKey="activities" currentLanguage={websiteLanguage} />
        </h1>
      </div>

      <div className="flex md:pt-12 flex-wrap gap-4 h-full items-center justify-center">
        {Object.entries(ACTIVITY_GROUPS_META).map(([key, meta]) => (
          <div key={key} className="flex flex-col items-center gap-3">
            <Link href={`/dashboard/activities/${key}`}>
              <button
                style={
                  {
                    "--group-primary": meta.colors.primary,
                    "--group-secondary": meta.colors.secondary,
                    "--group-color": meta.colors.text,
                    "--group-focus": meta.colors.focus,
                  } as React.CSSProperties
                }
                className="aspect-square flex-grow p-4 h-52 md:h-64 rounded-xl bg-[--group-secondary] hover:bg-[--group-primary] flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[--group-focus]"
                aria-label="Activity"
              >
                <meta.icon
                  className="size-28 md:size-36 text-[--group-color]"
                  strokeWidth={1.5}
                />
                <span className="text-lg font-semibold text-[--group-color] mt-3">
                  <TranslateButtons 
                    translationKey={getTranslationKey(meta.slug)} 
                    currentLanguage={websiteLanguage} 
                  />
                </span>
              </button>
            </Link>
            
            {/* Dialogic Reading Guide Button */}
            <Link href={`/dashboard/activities/${key}/dialogic-guide`}>
              <button
                style={
                  {
                    "--group-primary": meta.colors.primary,
                    "--group-secondary": meta.colors.secondary,
                    "--group-color": meta.colors.text,
                    "--group-focus": meta.colors.focus,
                  } as React.CSSProperties
                }
                className="px-4 py-2 rounded-lg bg-[--group-secondary] hover:bg-[--group-primary] text-[--group-color] text-sm font-medium shadow-md transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[--group-focus]"
              >
                <Download className="inline mr-2 size-4" />
                <TranslateButtons 
                  translationKey="guide" 
                  currentLanguage={websiteLanguage} 
                />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}