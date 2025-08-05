"use client"

import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { ACTIVITY_GROUPS_META } from "@/data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';

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

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-8">
          <TranslateButtons translationKey="activities" currentLanguage={websiteLanguage} />
        </h1>
      </div>

      <div className="flex md:pt-12 flex-wrap gap-4 h-full items-center justify-center">
        {Object.entries(ACTIVITY_GROUPS_META).map(([key, meta]) => (
          <Link href={`/dashboard/activities/${key}`} key={key}>
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
                {meta.label}
              </span>
            </button>
          </Link>
        ))}
      </div>
      
      {/* <div className="flex justify-left mt-8">
        <Button
          variant="outline"
          size="lg"
          className="h-24 text-2xl"
          asChild
        >
          <a href={`/dashboard/activities/guide.pdf`} download>
            <Download className="mr-2" size={20} />
            <TranslateButtons translationKey="pedagogical-guide" currentLanguage={websiteLanguage} />
          </a>
        </Button>
      </div> */}
    </DashboardLayout>
  );
}
