"use client"

import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Maximize2, 
  Volume2, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  Globe, 
  VolumeX 
} from "lucide-react";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import storiesData from '@/data/stories.json';
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

// Define the StoryLanguageContent interface
interface StoryLanguageContent {
  label: string;
  audioUrl: string;
  coverImage: string;
}


export default function ListeningPage() {
  // Story data access
  const storyId = "1"; // Hardcode the story ID, change later
  const storyInfo = storiesData.find(story => story.id === storyId);
  
  // Carousel state
  const [api, setApi] = useState<CarouselApi>();
  const [fullscreenApi, setFullscreenApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Language state
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [currentPage, setCurrentPage] = useState(0);
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Create a StoryLanguageContent mapping from storiesData
  const storyContent: Record<string, StoryLanguageContent> = {};
  
  // Populate storyContent if storyInfo exists
  if (storyInfo) {
    Object.entries(storyInfo.pages || {}).forEach(([lang, pages]) => {
      if (pages && pages.length > 0) {
        storyContent[lang] = {
          label: lang === 'en' ? 'English' : 
                 lang === 'de' ? 'Deutsch' : 
                 lang === 'fr' ? 'Français' : 
                 lang.toUpperCase(),
          audioUrl: pages[0].audioUrl || "",
          coverImage: pages[0].imageUrl || ""
        };
      }
    });
  }
  
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: storyInfo?.title || "Story", href: `/dashboard/multilingual-stories/${storyId}` },
    { label: "Listen", href: `/dashboard/multilingual-stories/${storyId}/listen` }
  ];

  const availableLanguages = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { label: value.label }])
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Reset current page when language changes
    setCurrentPage(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (api) {
      api.scrollTo(0);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle audio ended
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  // Get pages for the selected language
  const pages = storyInfo?.pages?.[selectedLanguage as keyof typeof storyInfo.pages] || [];
  
  // Handle regular carousel
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCurrentPage(api.selectedScrollSnap());
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    });
  }, [api]);

  // Sync fullscreen carousel with main carousel
  useEffect(() => {
    if (!fullscreenApi || !api) return;
    
    // When opening fullscreen, sync positions
    fullscreenApi.scrollTo(api.selectedScrollSnap());
    
    // Sync when navigating in fullscreen
    fullscreenApi.on("select", () => {
      api.scrollTo(fullscreenApi.selectedScrollSnap());
      setCurrentPage(fullscreenApi.selectedScrollSnap());
    });
  }, [fullscreenApi, api, isFullscreen]);

  return (
    <LanguageProvider 
      defaultLanguage="en" 
      availableLanguages={availableLanguages}
      onLanguageChange={handleLanguageChange}
    >
      <DashboardLayout breadcrumbItems={breadcrumbItems}>
        <h1 className="text-2xl text-center font-bold ml-3 mb-6">Listen to {storyInfo?.title || "Story"}</h1>

        <div className="flex flex-row w-full gap-0 relative">
          {/* Collapsible Sidebar */}
          <div 
            className={cn(
              "flex flex-col border-r border-slate-200 transition-all duration-300 ease-in-out h-full",
              sidebarCollapsed ? "w-12" : "w-64"
            )}
          >
            <div className="flex flex-col pr-4 gap-4 h-full relative">
              {/* Toggle sidebar button at the top */}
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="ml-auto h-6 w-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
              </div>

              {/* Sidebar content - only shown when expanded */}
              <div className={cn("transition-opacity space-y-8", sidebarCollapsed ? "opacity-0 invisible" : "opacity-100")}>
                {/* Language selector */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Language</h3>
                  <LanguageSelector />
                </div>
                
                {/* Volume control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Volume</h3>
                    <span className="text-xs text-gray-500">{Math.round(volume * 100)}%</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleVolumeChange([0])}
                    >
                      <VolumeX size={16} />
                    </Button>
                    
                    <Slider
                      value={[volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="flex-1"
                    />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleVolumeChange([1])}
                    >
                      <Volume2 size={16} />
                    </Button>
                  </div>
                </div>

                {/* Download options */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Download</h3>
                  
                  {pages[currentPage]?.audioUrl && (
                    <Button className="w-full mb-2" variant="outline" asChild>
                      <a href={pages[currentPage].audioUrl} download>
                        <Download className="mr-2" size={16}/> Audio
                      </a>
                    </Button>
                  )}
                  
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2" size={16}/> Text
                  </Button>
                </div>

                {/* Play button */}
                <Button 
                  className="center w-full"
                  variant="default"
                  onClick={togglePlayPause}
                  disabled={!pages[currentPage]?.audioUrl}
                >
                  {isPlaying ? (
                    <><Pause className="mr-2" size={16}/></>
                  ) : (
                    <><Play className="mr-2" size={16}/></>
                  )}
                </Button>
              </div>

              {/* Collapsed sidebar icons */}
              {sidebarCollapsed && (
                <div className="flex flex-col items-center gap-8">
                  <button 
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200"
                    onClick={() => {
                      setSidebarCollapsed(false);
                    }}
                  >
                    <Globe size={14} />
                  </button>
                  
                  <button 
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200"
                    onClick={() => {
                      if (volume > 0) {
                        handleVolumeChange([0]);
                      } else {
                        handleVolumeChange([1]);
                      }
                    }}
                  >
                    {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  
                  <button 
                    className="h-8 w-8 mt-auto mb-4 flex items-center justify-center rounded-full bg-primary text-white"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "w-[calc(100%-3rem)]" : "w-[calc(100%-16rem)]"
          )}>
            <div className="w-full max-w-4xl mx-auto relative">
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
              
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {pages.map((page, index) => (
                    <CarouselItem key={`${selectedLanguage}-${index}`}>
                      <Card>
                        <CardContent className="flex flex-col p-4 items-center justify-center">
                          <Image
                            src={page.imageUrl} 
                            alt={`Story scene ${index + 1}`}
                            width={800}
                            height={800}
                            className="object-cover rounded-lg"
                          />
                          <div className="text-container mt-4 bg-white border p-2 rounded-lg shadow-sm w-full">
                            <p className="text-lg">{page.text}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              
              <div className="text-center mt-2">
                Page {current} of {count}
              </div>
            </div>
          </div>
          
          {/* Hidden audio player */}
          {pages[currentPage]?.audioUrl && (
            <audio 
              ref={audioRef}
              src={pages[currentPage].audioUrl}
              onEnded={handleAudioEnded}
              className="hidden"
              autoPlay
            />
          )}
          
          {/* Fullscreen dialog */}
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTitle className="sr-only">Story Details</DialogTitle>
            <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] max-h-[90vh]">
              <div className="flex flex-col h-full gap-6">
                {/* Fullscreen carousel */}
                <div className="flex-1 min-h-0">
                  <Carousel setApi={setFullscreenApi} className="h-full">
                    <CarouselContent className="h-full">
                      {pages.map((page, index: number) => (
                        <CarouselItem key={`fullscreen-${selectedLanguage}-${index}`} className="h-full">
                          <div className="flex flex-col items-center justify-center h-full gap-4">
                            <Image
                              src={page.imageUrl} 
                              alt={`Story scene ${index + 1}`}
                              width={800}
                              height={600}
                              className="object-contain max-h-[60vh] rounded-lg"
                            />
                            <div className="text-container bg-white p-4 rounded-lg shadow-sm w-full max-w-2xl">
                              <p className="text-lg">{page.text}</p>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DashboardLayout>
    </LanguageProvider>
  );
}