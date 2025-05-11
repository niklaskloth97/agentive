"use client"

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import CollapsibleCard from "@/components/CollapsibleCard";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import LanguageAudioPlayer from "@/components/LanguageAudioPlayer";
import { ActivitySelection } from "@/components/ActivitySelection";
import { StoryLanguageContent } from "@/components/ListeningFrame";

// interface LanguageProviderProps {
//   children: ReactNode;
//   defaultLanguage?: string;
//   availableLanguages: {
//     [key: string]: {
//       label: string;
//     };
//   };
//   onLanguageChange?: (language: string) => void;
// }

const storyContent: Record<string, StoryLanguageContent> = {
  en: {
    label: "English",
    audioUrl: "/audio/test-en.opus",
    coverImage: "/images/stories/monster-story/1.webp"
  },
  de: {
    label: "German",
    audioUrl: "/audio/test-de.opus",
    coverImage: "/images/stories/monster-story/1-de.webp"
  },
  it: {
    label: "Italian",
    audioUrl: "/audio/test-it.opus",
    coverImage: "/images/stories/monster-story/1-it.webp"
  },
  fr: {
    label: "French",
    audioUrl: "/audio/test-fr.opus",
    coverImage: "/images/stories/monster-story/1-fr.webp"
  },
  sv: {
    label: "Slovene",
    audioUrl: "/audio/test-sv.opus",
    coverImage: "/images/stories/monster-story/1-sv.webp"
  },
  lux: {
    label: "Luxembourgish",
    audioUrl: "/audio/test-lux.opus",
    coverImage: "/images/stories/monster-story/1-lux.webp"
  },
  gr: {
    label: "Greek",
    audioUrl: "/audio/test-gr.opus",
    coverImage: "/images/stories/monster-story/1-gr.webp"
  }
};

export default function ReadingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Monster Story", href: "/dashboard/multilingual-stories/a-monster-story" },
    { label: "Read", href: "/dashboard/multilingual-stories/a-monster-story/read" }
  ];

  const availableLanguages = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { label: value.label }])
  );
  
  const audioSources = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { url: value.audioUrl }])
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log(`Language changed to: ${selectedLanguage}`);
  };

  return (
    <LanguageProvider 
      defaultLanguage="en" 
      availableLanguages={availableLanguages}
      onLanguageChange={handleLanguageChange}
    >
      <DashboardLayout breadcrumbItems={breadcrumbItems}>
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold mb-6">Reading the Monster Story</h1>

          <div className="flex flex-col md:flex-row w-full gap-6">
            {/* Left Column - 75% */}
            <div className="w-full md:w-3/4">
              <div className="relative w-full overflow-hidden rounded-lg shadow-md" style={{ paddingTop: "56.25%" }}>
                <iframe 
                  src="https://docs.google.com/presentation/d/e/2PACX-1vRoyBi_m9pdtLcWIDU429svlxfFxdalp4gI7fshCAL5BglKUFI91FlxADsieNUGWQyFzBadkl65GUAb/pubembed?start=false&loop=false&delayms=60000" 
                  className="absolute top-0 left-0 w-full h-full border-none"
                  title="Monster Story Presentation"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* Right Column - 25% */}
            <div className="w-full md:w-1/4 flex flex-col gap-4">
              <CollapsibleCard 
                title="Select a language"
                defaultOpen={true}
              >
                <LanguageSelector />
              </CollapsibleCard>
              
              <CollapsibleCard 
                title="Listen to audio"
                defaultOpen={true}
              >
                <LanguageAudioPlayer audioSources={audioSources} />
              </CollapsibleCard>

              <CollapsibleCard 
                title="Download Options"
                className="w-full"
              >
                <div className="space-y-3">
                  <p className="text-gray-700">Download materials for the selected language.</p>
                  
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4"/> Audio
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4"/> Transcript
                  </Button>
                </div>
              </CollapsibleCard>
              
              <CollapsibleCard 
                title="Follow-up activities"
                className="w-full"
              >
                <ActivitySelection />
              </CollapsibleCard>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </LanguageProvider>
  );
}