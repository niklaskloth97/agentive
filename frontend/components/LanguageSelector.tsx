"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

// Language flag mapping
const languageFlags: Record<string, string> = {
  en: "🇬🇧",  // UK flag for English
  de: "🇩🇪",  // German flag
  // gershort: "🇩🇪", // German short flag
  "sw-ger": "🇨🇭", // Swiss flag
  por: "🇵🇹",  // Portuguese flag
  pl: "🇵🇱",  // Polish flag
  slo: "🇸🇮",  // Slovenian flag
  fr: "🇫🇷",  // French flag
  it: "🇮🇹",  // Italian flag
  sv: "🇸🇮",  // Slovenian flag
  gr: "🇬🇷",  // Greek flag
  lux: "🇱🇺", // Luxembourg flag
  alb: "🇦🇱",  // Albanian flag
  ukr: "🇺🇦", // Ukrainian flag
  tur: "🇹🇷", // Turkish flag
  ld: "🇮🇹", // Ladin flag 
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
          <span className="text-lg" aria-hidden="true">
            {languageFlags[langCode] || "🌐"}
          </span>
          <span className="text-xs md:text-sm">{value.label}</span>
        </Button>
      ))}
    </div>
  );
}