"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedLanguage}
        onValueChange={setSelectedLanguage}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(availableLanguages).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}