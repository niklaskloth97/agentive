"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

// // Language flag mapping
// const languageFlags: Record<string, string> = {
//   en: "🇬🇧",  // UK flag for English
//   de: "🇩🇪",  // German flag
//   // gershort: "🇩🇪", // German short flag
//   "de-lang": "🇩🇪", // Swiss flag
//   por: "🇵🇹",  // Portuguese flag
//   pl: "🇵🇱",  // Polish flag
//   svn: "🇸🇮",  // Slovenian flag
//   sv: "🇸🇮",  // Slovenian flag
//   fr: "🇫🇷",  // French flag
//   it: "🇮🇹",  // Italian flag
//   gr: "🇬🇷",  // Greek flag
//   lux: "🇱🇺", // Luxembourg flag
//   alb: "🇦🇱",  // Albanian flag
//   ukr: "🇺🇦", // Ukrainian flag
//   tur: "🇹🇷", // Turkish flag
//   ld: "🇮🇹", // Ladin flag 
//   rg: "🇸🇨", // Romansh flag
// };

// language → flag country code (ISO 3166-1 alpha-2)
export const languageFlags: Record<string, string> = {
  en: "gb",         // English -> United Kingdom (common convention)
  de: "de",         // German -> Germany
  "de-lang": "de",  // de
  por: "pt",        // Portuguese -> Portugal
  pl: "pl",         // Polish -> Poland
  svn: "si",        // Slovenian -> Slovenia (ISO code: si)
  sv: "si",         // you had sv=Slovenian; keep for back-compat (Slovenia is "si"; Swedish would be "se")
  fr: "fr",         // French -> France
  it: "it",         // Italian -> Italy
  gr: "gr",         // Greek -> Greece
  lux: "lu",        // Luxembourgish -> Luxembourg
  alb: "al",        // Albanian -> Albania
  ukr: "ua",        // Ukrainian -> Ukraine
  tur: "tr",        // Turkish -> Türkiye
  ld: "it",         // Ladin -> Italy (choose flag you prefer)
  rg: "ch",
  sur: "ch"

};


export default function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.entries(availableLanguages).map(([langCode, value]) => (
        <Button
          key={langCode}
          variant="ghost"
          size="sm"
          onClick={() => setSelectedLanguage(langCode)}
          className={cn(
            "flex items-center gap-1 px-2 py-1",
            selectedLanguage === langCode && "bg-primary/10 font-medium"
          )}
        >
          <span
            className={`fi fi-${languageFlags[langCode] || 'xx'} w-5 h-5`}
            title={value.label}
          />
          <span className="text-xs md:text-sm">{value.label}</span>
        </Button>
      ))}
    </div>
  );
}