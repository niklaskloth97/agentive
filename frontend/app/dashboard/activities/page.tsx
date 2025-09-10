"use client"

import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { ACTIVITY_GROUPS_META } from "@/data";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Add the ActivityGuideSelector component
function ActivityGuideSelector({ 
  groupKey, 
  meta, 
  websiteLanguage 
}: { 
  groupKey: string; 
  meta: {
		slug: string;
		colors: {
      focus: string;
      secondary: string;
			primary: string;
			text: string;
		};
	};
  websiteLanguage: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGuideLanguage, setSelectedGuideLanguage] = useState<string>("");

  // Update this to match your actual language system
  const availableLanguages = ["en", "fr", "de", "gr", "sl"]; // Use 'gr' instead of 'el'

  // Create available languages object for LanguageSelector
  const guideLanguageOptions = Object.fromEntries(
    availableLanguages.map(langId => [
      langId, 
      { 
        label: langId === 'en' ? 'EN' : 
               langId === 'de' ? 'DE' : 
               langId === 'fr' ? 'FR' : 
               langId === 'gr' ? 'GR' : // Changed from 'el' to 'gr'
               langId.toUpperCase() 
      }
    ])
  );

  // Update the language mapping
  const getGuideFilename = (groupKey: string, language: string): string => {
    const languageMap: Record<string, string> = {
      'en': 'E',
      'fr': 'F', 
      'de': 'German',
      'gr': 'GR',  // Changed from 'el' to 'gr'
    };
    
    console.log('Mapping language:', language, 'to:', languageMap[language]); // Debug log
    
    const langCode = languageMap[language] || 'E'; // Default to English
    return `Activities_${groupKey.toUpperCase()}_${langCode}.pdf`;
  };

  const handleLanguageChange = (languageId: string) => {
    setSelectedGuideLanguage(languageId);
  };

  const handleDownload = () => {
    if (!selectedGuideLanguage) return;

    console.log('Downloading guide for group:', groupKey, 'in language:', selectedGuideLanguage);
    const filename = getGuideFilename(groupKey, selectedGuideLanguage);
    const guidePath = `/activities/guides/${groupKey.toUpperCase()}/${filename}`;
    
    console.log('Guide path:', guidePath);
    
    // Create download link
    const link = document.createElement('a');
    link.href = guidePath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close dialog after download
    setIsOpen(false);
    setSelectedGuideLanguage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <TranslateButtons translationKey="select-guide-language" currentLanguage={websiteLanguage} />
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                <TranslateButtons translationKey="available-languages" currentLanguage={websiteLanguage} />
              </label>
              
              {/* Use LanguageProvider and LanguageSelector */}
              <LanguageProvider 
                defaultLanguage=""
                availableLanguages={guideLanguageOptions}
                onLanguageChange={handleLanguageChange}
              >
                <LanguageSelector />
              </LanguageProvider>
            </div>
            
            {selectedGuideLanguage && (
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleDownload}
                  className="flex-1"
                  style={{
                    backgroundColor: meta.colors.primary,
                    color: meta.colors.text,
                  }}
                >
                  <Download className="mr-2" size={16}/>
                  <TranslateButtons translationKey="download" currentLanguage={websiteLanguage} />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedGuideLanguage("");
                  }}
                >
                  <TranslateButtons translationKey="cancel" currentLanguage={websiteLanguage} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
            
            {/* Activity Guide Selector with Language Dialog */}
            <ActivityGuideSelector 
              groupKey={key}
              meta={meta}
              websiteLanguage={websiteLanguage}
            />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}