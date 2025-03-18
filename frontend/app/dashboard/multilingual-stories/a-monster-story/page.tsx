"use client"

import { DashboardLayout } from "@/components/DashboardLayout";
import { Download } from "lucide-react";
import CollapsibleCard from "@/components/CollapsibleCard";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import LanguageAudioPlayer from "@/components/LanguageAudioPlayer";
import LanguageAwarePdfViewer from "@/components/LanguageAwarePdfViewer";
import { Button } from "@/components/ui/button";
import { ActivitySelection } from "@/components/ActivitySelection";

const storyContent = {
  en: {
    label: "English",
    audioUrl: "/audio/Free_Test_Data_1MB_MP3.mp3",
    pdfUrl: "/Monster story example_october6.pdf",
    images: ["/images/stories/monster-story/1.webp", "/images/stories/monster-story/2.webp"]
  },
  de: {
    label: "German",
    audioUrl: "/audio/ALEC BENJAMIN - LET ME DOWN SLOWLY.mp3",
    pdfUrl: "/Memo_Group_1.1_Data_and_knowing.pdf",
    images: ["/images/stories/monster-story/1-de.webp", "/images/stories/monster-story/2-de.webp"]
  },
  it: {
    label: "Italian",
    audioUrl: "/audio/pirate-story-es.mp3",
    pdfUrl: "/Monster story example_es.pdf",
    images: ["/images/stories/monster-story/1-es.webp", "/images/stories/monster-story/2-es.webp"]
  },
  fr: {
    label: "French",
    audioUrl: "/audio/pirate-story-es.mp3",
    pdfUrl: "/Monster story example_es.pdf",
    images: ["/images/stories/monster-story/1-es.webp", "/images/stories/monster-story/2-es.webp"]
  },
  sv: {
    label: "Slovene",
    audioUrl: "/audio/pirate-story-es.mp3",
    pdfUrl: "/Monster story example_es.pdf",
    images: ["/images/stories/monster-story/1-es.webp", "/images/stories/monster-story/2-es.webp"]
  },
  lux: {
    label: "Luxembourgish",
    audioUrl: "/audio/pirate-story-es.mp3",
    pdfUrl: "/Monster story example_es.pdf",
    images: ["/images/stories/monster-story/1-es.webp", "/images/stories/monster-story/2-es.webp"]
  },
  gr: {
    label: "Greek",
    audioUrl: "/audio/pirate-story-es.mp3",
    pdfUrl: "/Monster story example_es.pdf",
    images: ["/images/stories/monster-story/1-es.webp", "/images/stories/monster-story/2-es.webp"]
  }
};

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Monster Story", href: "/dashboard/multilingual-stories/a-monster-story" }
  ];

  // Extract language info for the context
  const availableLanguages = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { label: value.label }])
  );
  
  // Extract audio sources for the audio player
  const audioSources = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { url: value.audioUrl }])
  );

  return (
    <LanguageProvider 
      defaultLanguage="en" 
      availableLanguages={availableLanguages}
    >
      <DashboardLayout breadcrumbItems={breadcrumbItems}>
        <div className="flex justify-end mb-4">
          
        </div>
        <h1 className="text-2xl font-bold">Monster Story</h1>
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Left Column - 75% */}
          <div className="w-full md:w-3/4">
            <CollapsibleCard 
              title="Read the story"
              defaultOpen={true}
            >
               <LanguageAwarePdfViewer 
                contentMap={storyContent} 
                defaultHeight={1070} 
              />
            </CollapsibleCard>
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
                <p className="text-gray-700">Downloading downloads the material for the selected language. You can choose to download everything or the different files below.</p>
                
              <Button className="w-full" variant="slate">
                  <Download/> Full material
                </Button>
                <Button className="w-full" variant="outline">
                  <Download/> Full PDF
                </Button>
                <Button className="w-full" variant="outline">
                  <Download/> Pictures only
                </Button>
                <Button className="w-full" variant="outline">
                <Download/> Audio
                </Button>
                <Button className="w-full" variant="outline">
                  <Download/> Dialogic Reading Guide
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
      </DashboardLayout>
    </LanguageProvider>
  )
}

