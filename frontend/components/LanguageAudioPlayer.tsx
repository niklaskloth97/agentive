"use client";

import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AudioLanguageMap {
  [key: string]: {
    label: string;
    url: string;
    images: string[];
  };
}

interface LanguageAudioPlayerProps {
  audioSources: AudioLanguageMap;
  defaultLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const LanguageAudioPlayer = ({
  audioSources,
  defaultLanguage = "en",
  onLanguageChange
}: LanguageAudioPlayerProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    onLanguageChange?.(value);
  };

  return (
    <div className="space-y-4">
      <Select
        value={selectedLanguage}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(audioSources).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AudioPlayer url={audioSources[selectedLanguage].url} />
    </div>
  );
};

export default LanguageAudioPlayer;