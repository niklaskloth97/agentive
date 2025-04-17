"use client"

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, Download, Volume2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CollapsibleCard from "@/components/CollapsibleCard";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import LanguageAudioPlayer from "@/components/LanguageAudioPlayer";
import { ActivitySelection } from "@/components/ActivitySelection";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";

const storyContent = {
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

export default function ListeningPage() {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof storyContent>("en");
  
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

  return (
    <LanguageProvider defaultLanguage="en" availableLanguages={availableLanguages}>
      <DashboardLayout breadcrumbItems={breadcrumbItems}>
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />Back to Story
          </Button>
        </div>

        <h1 className="text-2xl font-bold ml-3 mb-6">Listen to Monster Story</h1>

        <div className="flex flex-col md:flex-row w-full gap-6">
          {/* Left Column - 75% */}
          <div className="w-full md:w-3/4">
            <Card className="relative">
              <div className="absolute top-2 right-2 z-10">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white/80 hover:bg-white"
                  onClick={() => setIsFullscreen(true)}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-6">
                  <Image
                    src={storyContent[selectedLanguage].coverImage}
                    alt="Story Cover"
                    width={800}
                    height={500}
                    className="rounded-lg object-contain w-full h-auto"
                  />
                </div>
                
                <div className="flex flex-col gap-3 bg-muted/20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-primary" />
                      <Select 
                        value={selectedLanguage as string} 
                        onValueChange={(value) => setSelectedLanguage(value as keyof typeof storyContent)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(storyContent).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <a 
                      href={storyContent[selectedLanguage].audioUrl} 
                      download 
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                    >
                      <Download className="h-4 w-4" />
                      Download audio
                    </a>
                  </div>
                  
                  <audio 
                    controls 
                    src={storyContent[selectedLanguage].audioUrl}
                    className="w-full"
                    autoPlay
                  ></audio>
                </div>
              </CardContent>
            </Card>
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
        </div>
        
        {/* Fullscreen dialog */}
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogTitle className="text-lg font-semibold"/>
          <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] max-h-[90vh]">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
             
              <span className="sr-only">Close</span>
            </DialogClose>
            
            <div className="flex flex-col h-full gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5" />
                    <Select 
                      value={selectedLanguage as string} 
                      onValueChange={(value) => setSelectedLanguage(value as keyof typeof storyContent)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(storyContent).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <a 
                    href={storyContent[selectedLanguage].audioUrl} 
                    download 
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Download className="h-4 w-4" />
                    Download audio
                  </a>
                </div>
                
                <audio 
                  controls 
                  src={storyContent[selectedLanguage].audioUrl}
                  className="w-full"
                ></audio>
              </div>
              
              <div className="flex-1 min-h-0 flex items-center justify-center">
                <Image
                  src={storyContent[selectedLanguage].coverImage}
                  alt="Story Cover"
                  width={1200}
                  height={800}
                  className="rounded-lg object-contain max-h-full max-w-full"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </LanguageProvider>
  );
}