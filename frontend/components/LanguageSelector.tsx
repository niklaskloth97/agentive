"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageProvider";

// Language flag mapping
const languageFlags: Record<string, string> = {
  en: "🇬🇧",  // UK flag for English
  de: "🇩🇪",  // German flag
  fr: "🇫🇷",  // French flag
  it: "🇮🇹",  // Italian flag
  es: "🇪🇸",  // Spanish flag
  sv: "🇸🇮",  // Slovenian flag
  gr: "🇬🇷",  // Greek flag
  lux: "🇱🇺", // Luxembourg flag
};

export default function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();

  // Custom display value with flag
  const getLanguageWithFlag = (langCode: string) => {
    const flag = languageFlags[langCode] || "🌐";
    const label = availableLanguages[langCode]?.label || langCode;
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">{flag}</span>
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedLanguage}
        onValueChange={setSelectedLanguage}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue>
            {selectedLanguage && getLanguageWithFlag(selectedLanguage)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(availableLanguages).map(([key, value]) => (
            <SelectItem key={key} value={key} className="flex items-center gap-2">
              <span className="text-lg mr-2" aria-hidden="true">{languageFlags[key] || "🌐"}</span>
              {value.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}