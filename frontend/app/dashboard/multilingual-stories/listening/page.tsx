"use client"

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download} from "lucide-react";
import CollapsibleCard from "@/components/CollapsibleCard";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
// import LanguageAudioPlayer from "@/components/LanguageAudioPlayer";
import { ActivitySelection } from "@/components/ActivitySelection";
// import { useRouter } from "next/navigation";
import ListeningFrame, { StoryLanguageContent } from "@/components/ListeningFrame";

const storyContent: Record<string, StoryLanguageContent> = {
  en: {
    label: "English",
    audioUrl: "/audio/test-en.opus",
    coverImage: "/images/stories/monster-story/monster.png"
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

export default function ListeningPage() {
  // const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Monster Story", href: "/dashboard/multilingual-stories/a-monster-story" },
    { label: "Listen", href: "/dashboard/multilingual-stories/a-monster-story/listen" }
  ];

  const availableLanguages = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { label: value.label }])
  );
  
  const audioSources = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { url: value.audioUrl }])
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageProvider defaultLanguage="en" availableLanguages={availableLanguages}>
      <DashboardLayout breadcrumbItems={breadcrumbItems}>


        <h1 className="text-2xl font-bold ml-3 mb-6">Listen to Monster Story</h1>

        <div className="flex flex-col md:flex-row w-full gap-6">
          
          
          {/* Right Column - 25% */}
          <div className="w-full md:w-1/4 flex flex-col gap-4">
            <CollapsibleCard 
              title="Select a language"
              defaultOpen={true}
            >
              <LanguageSelector />
            </CollapsibleCard>

            <CollapsibleCard 
              title="Download Options"
              className="w-full"
            >
              <div className="space-y-3">
                <p className="text-gray-700">Downloading downloads the material for the selected language.</p>
                
                <Button className="w-full" variant="outline">
                  <Download/> Audio
                </Button>
                <Button className="w-full" variant="outline">
                  <Download/> Transcript
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
          {/* Left Column - 75% */}
          <div className="w-full md:w-3/4">
            <ListeningFrame
              storyContent={storyContent}
              initialLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </DashboardLayout>
    </LanguageProvider>
  );
}