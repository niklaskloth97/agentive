"use client";

import { useLanguage } from "@/components/LanguageProvider";
import AudioPlayer from "./AudioPlayer";

interface AudioSourcesMap {
  [language: string]: {
    url: string;
  };
}

interface LanguageAudioPlayerProps {
  audioSources: AudioSourcesMap;
}

export default function LanguageAudioPlayer({ 
  audioSources 
}: LanguageAudioPlayerProps) {
  const { selectedLanguage } = useLanguage();
  
  // Default to first available audio if the selected language isn't available
  const audioUrl = audioSources[selectedLanguage]?.url || 
    Object.values(audioSources)[0]?.url || "";

  return (
    <AudioPlayer url={audioUrl} />
  );
}