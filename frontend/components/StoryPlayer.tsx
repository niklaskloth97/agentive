"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Maximize2, 
  Play, 
  Pause, 
  Globe, 
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
import storiesData from '@/data/stories.json';
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface StoryPlayerProps {
  storyId: string;
  showAudioControls?: boolean;
  showText?: boolean;
  className?: string;
}

interface StoryLanguageContent {
  label: string;
  audioUrl: string;
  coverImage: string;
}

type StoryPageItem = {
  text: string;
  imageUrl: string;
  audioUrl?: string;
};

export function StoryPlayer({ 
  storyId, 
  showAudioControls = true,
  showText = true,
  className 
}: StoryPlayerProps) {
  // Story data access
  const storyInfo = storiesData.find(story => story.id === storyId);
  
  // Carousel state
  const [api, setApi] = useState<CarouselApi>();
  const [fullscreenApi,] = useState<CarouselApi>();
  // Remove the unused current variable
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Language state
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Text visibility state
  const [isTextVisible] = useState<boolean>(showText);
  
  // Create a StoryLanguageContent mapping
  const storyContent: Record<string, StoryLanguageContent> = {};
  
  // Populate storyContent if storyInfo exists
  if (storyInfo) {
    Object.entries(storyInfo).forEach(([lang, content]) => {
      // Skip id and slug fields
      if (lang === 'id' || lang === 'slug') return;
      
      // Check if content is an array and has items
      if (Array.isArray(content) && content.length > 0 && content[0].pages) {
        const firstPage = content[0].pages["1"];
        if (firstPage) {
          storyContent[lang] = {
            label: lang === 'en' ? 'EN' : 
                   lang === 'de' ? 'GER' : 
                   lang === 'fr' ? 'FRA' : 
                   lang === 'es' ? 'ESP' :
                   lang === 'it' ? 'ITA' :
                   lang === 'lux' ? 'LUX' :
                   lang === 'gr' ? 'GRC' :
                   lang === 'sv' ? 'SVN' :
                   lang === 'al' ? 'ALB' :
                   lang === 'ukr' ? 'UKR' :
                   lang === 'de-short' ? 'GER-S' :
                   lang.toUpperCase(),
            audioUrl: firstPage.audioUrl || "",
            coverImage: firstPage.imageUrl || ""
          };
        }
      }
    });
  }

  const availableLanguages = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { label: value.label }])
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    
    // Get pages for the new language
    const languageData = storyInfo?.[language as keyof typeof storyInfo];
    const newLanguagePages = Array.isArray(languageData) && languageData.length > 0 ? 
      Object.values(languageData[0].pages || {}) : [];
    
    // Only reset to first page if current page doesn't exist in new language
    if (currentPage >= newLanguagePages.length) {
      setCurrentPage(0);
      if (api) {
        api.scrollTo(0);
      }
    }
    // Otherwise keep the current page position
    
    setIsPlaying(false);
  };

  // COMMENTED OUT - using HTML5 player controls instead
  // // play/pause
  // const togglePlayPause = () => {
  //   if (!audioRef.current) return;
    
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // COMMENTED OUT - using HTML5 player controls instead
  // // Handle when audio ended
  // const handleAudioEnded = () => {
  //   setIsPlaying(false);
  // };

  // COMMENTED OUT - using HTML5 player controls instead
  // // Handle volume change
  // const handleVolumeChange = (value: number[]) => {
  //   const newVolume = value[0];
  //   setVolume(newVolume);
    
  //   if (audioRef.current) {
  //     audioRef.current.volume = newVolume;
  //   }
  // };
  
  // // Toggle text visibility
  // const toggleTextVisibility = () => {
  //   setIsTextVisible(prev => !prev);
  // };

  // Render text container
  const renderTextContainer = (page: StoryPageItem, isFullscreen: boolean = false) => {
    if (!isTextVisible) return null;
    
    return (
      <div className={cn(
        "text-container mt-4 bg-white rounded-lg",
        isFullscreen ? "p-4" : "border p-2 shadow-sm"
      )}>
        <p className={cn(
          "text-center break-words hyphens-auto",
          isFullscreen ? "text-2xl" : "text-xl"
        )}>
          {page.text}
        </p>
      </div>
    );
  };

  // Get pages for the selected language
  const languageData = selectedLanguage && storyInfo?.[selectedLanguage as keyof typeof storyInfo];
  const pages = Array.isArray(languageData) && languageData.length > 0 ? 
    Object.values(languageData[0].pages || {}) : [];
  
  // Create a placeholder page using the first English page of the story if available
  const englishData = storyInfo?.en;
  const placeholderPage = Array.isArray(englishData) && englishData.length > 0 && englishData[0].pages?.["1"] ? 
    englishData[0].pages["1"] : {
      imageUrl: "/images/placeholder-story.jpg",
      text: ""
    };

  // Handle regular carousel
  useEffect(() => {
    if (!api) return;

    // Remove the setCurrent call since current is no longer used

    api.on("select", () => {
      // Remove the setCurrent call since current is no longer used
      setCurrentPage(api.selectedScrollSnap());
      setIsPlaying(false);
    });
  }, [api]);
  // Fullscreen and audio button - SIMPLIFIED to just open fullscreen
  const openFullscreenWithAutoplay = () => {
    setIsFullscreen(true);
  };

  // Sync fullscreen carousel with main carousel
  useEffect(() => {
    if (!fullscreenApi || !api) return;
    
    fullscreenApi.scrollTo(api.selectedScrollSnap());
    
    fullscreenApi.on("select", () => {
      api.scrollTo(fullscreenApi.selectedScrollSnap());
      setCurrentPage(fullscreenApi.selectedScrollSnap());
    });
  }, [fullscreenApi, api, isFullscreen]);

  // Add event listeners to track actual audio state
  useEffect(() => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(false);
      };

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      audioElement.addEventListener('ended', handleEnded);

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [selectedLanguage, currentPage]);

  if (!storyInfo) {
    return <div className="p-4 text-center">Story not found</div>;
  }

  // Get the story title from the selected language or fallback to English
  const getStoryTitle = () => {
    if (selectedLanguage) {
      const langData = storyInfo[selectedLanguage as keyof typeof storyInfo];
      if (Array.isArray(langData) && langData.length > 0) {
        return langData[0].title;
      }
    }
    
    // Fallback to English title
    const englishData = storyInfo.en;
    if (Array.isArray(englishData) && englishData.length > 0) {
      return englishData[0].title;
    }
    
    return "Story";
  };

  return (
    <LanguageProvider 
      defaultLanguage=""
      availableLanguages={availableLanguages}
      onLanguageChange={handleLanguageChange}
    >
      <div className={cn("flex flex-col w-full h-full overflow-hidden", className)}>
        <div className="flex text-center items-center justify-between mb-4">
          <h1 className="text-2xl absolute left-1/2 transform -translate-x-1/2 font-bold">
            {getStoryTitle()}
          </h1>
        </div>

        <div className="flex flex-row w-full gap-0 relative">
          <div className="flex flex-col border-r border-slate-200 transition-all duration-300 ease-in-out h-full w-56">
            <div className="flex flex-col p-4 gap-6 h-full relative">
              <div className="transition-opacity space-y-8">
                <div>
                  <h3 className="text-sm font-medium mb-2">Select a Language</h3>
                  <LanguageSelector />
                </div>
                
                {selectedLanguage && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Download</h3>
                      
                      {pages[currentPage]?.audioUrl && (
                        <Button className="w-full mb-2" variant="outline" asChild>
                          <a href={pages[currentPage].audioUrl} download>
                            <Download className="mr-2" size={16}/> Audio
                          </a>
                        </Button>
                      )}
                      
                      <Button className="w-full mb-4" variant="outline">
                        <Download className="mr-2" size={16}/> Text
                      </Button>
                      <Button className="w-full mb-4" variant="outline">
                        <Download className="mr-2" size={16}/> Pictures
                      </Button>
                      <Button className="w-full mb-4" variant="outline">
                        <Download className="mr-2" size={16}/> Dialogic Reading Guide
                      </Button>
                    </div>

                    <Button 
                      className="center w-full mt-auto h-16 text-lg"
                      variant="default"
                      onClick={openFullscreenWithAutoplay}
                      disabled={!pages[currentPage]?.audioUrl}
                    >
                      <Play className="mr-2" size={24}/> Go
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
            
          {/* Main Content */}
          <div className={cn(
            "flex-1 min-h-0 flex flex-col transition-all duration-300 ease-in-out",
            "w-[calc(100%-16rem)]"
          )}>
            <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
              <div className="relative flex-1">
                {!selectedLanguage && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-sm">
                    <Card className="w-80 shadow-lg">
                      <CardContent className="flex flex-col items-center p-6 text-center">
                        <Globe className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-medium mb-2">Select a Language</h3>
                        
                        <div className="mt-2">
                          <LanguageSelector />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Fullscreen button - only visible when a language is selected */}
                {selectedLanguage && (
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
                )}
                
                {/* Carousel - always render but show placeholder if no language selected */}
                <Carousel setApi={setApi} className="">
                  <CarouselContent className="">
                    {(selectedLanguage && pages.length > 0 ? pages : [placeholderPage]).map((page, index) => (
                      <CarouselItem 
                        key={`${selectedLanguage || "placeholder"}-${index}`} 
                        className="w-full flex items-center justify-center"
                      >
                        <Card className="w-full max-h-[100vh]">
                          <CardContent className="flex flex-col p-4 items-center justify-center">
                            <div className="w-full aspect-video relative">
                              <Image
                                src={page.imageUrl} 
                                alt={`Story scene ${index + 1}`}
                                fill
                                className={cn(
                                  "object-contain rounded-lg",
                                  !selectedLanguage && "opacity-50 blur-sm"
                                )}
                              />
                            </div>
                            
                            {selectedLanguage && renderTextContainer(page)}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {selectedLanguage && pages.length > 1 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
              </div>
            </div>
          </div>
          
          {/* COMMENTED OUT - Hidden audio player replaced by HTML5 player in fullscreen */}
          {/* {showAudioControls && selectedLanguage && pages[currentPage]?.audioUrl && (
            <audio 
              ref={audioRef}
              src={pages[currentPage].audioUrl}
              onEnded={handleAudioEnded}
              className="hidden"
            />
          )} */}
          
          {/* Fullscreen */}
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTitle className="sr-only">Story Details</DialogTitle>
            <DialogContent
              className={cn(
                "p-0 m-0 border bg-white rounded-lg flex flex-col items-center justify-center",
                "w-full h-full max-w-[90vw] max-h-[90vh] overflow-hidden"
              )}
              style={{ boxSizing: "border-box" }}
            >
              <div className="flex flex-col h-full w-full px-20">
                {/* Fullscreen carousel - takes remaining space */}
                <div className="flex-1 min-h-0 w-full">
                  <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent className="h-full">
                      {(selectedLanguage && pages.length > 0 ? pages : [placeholderPage]).map((page, index) => (
                        <CarouselItem 
                          key={`${selectedLanguage || "placeholder"}-${index}`} 
                          className="flex items-center justify-center h-full"
                        >
                          <Card className="w-full h-full flex items-center justify-center">
                            <CardContent className="flex flex-col w-full h-full items-center justify-center p-2">
                              <div 
                                className={cn(
                                  "relative aspect-video w-full",
                                  // Dynamic height based on text presence and length
                                  selectedLanguage && isTextVisible && page.text ? 
                                    // When text is shown, reduce height based on text length
                                    page.text.length > 200 ? "h-[50vh]" : 
                                    page.text.length > 100 ? "h-[60vh]" : "h-[70vh]"
                                    :
                                    // When no text, use maximum height
                                    "h-[80vh]"
                                )}
                              >
                                <Image
                                  src={page.imageUrl} 
                                  alt={`Story scene ${index + 1}`}
                                  fill
                                  className={cn(
                                    "object-contain rounded-lg",
                                    !selectedLanguage && "opacity-50 blur-sm"
                                  )}
                                />
                              </div>
                              {selectedLanguage && renderTextContainer(page, true)}
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {selectedLanguage && pages.length > 1 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                </div>
                
                {/* Bottom section - fixed height to prevent overflow */}
                <div className="flex-shrink-0 space-y-2">
                  {showAudioControls && (
                    <div className="flex justify-between flex-col">
                      {selectedLanguage && pages[currentPage]?.audioUrl && (
                        <audio 
                          key={`audio-${selectedLanguage}-${currentPage}`}
                          className="w-full"
                          preload="auto"
                          src={pages[currentPage].audioUrl}
                        >
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      
                      <div className="flex gap-2 justify-between w-full">
                        <Button 
                          size="lg"
                          onClick={() => {
                            const audioElement = document.querySelector('audio');
                            if (audioElement) {
                              if (audioElement.paused) {
                                audioElement.play().catch(err => {
                                  console.error('Audio playback failed:', err);
                                });
                              } else {
                                audioElement.pause();
                              }
                            }
                          }}
                          className="h-12 w-32" // double width
                          variant="default"
                        >
                          {isPlaying ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
                          {isPlaying ? "Pause" : "Play"}
                        </Button>
                        <Button 
                          size="lg"
                          variant="outline"
                          className="h-12 flex-shrink-0 min-w-[120px]"
                          asChild
                        >
                          <a href="/dashboard/stories">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                              <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            Stories
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Home button - show when audio controls are disabled */}
                   {!showAudioControls && (
                    <div className="flex gap-2 justify-between w-full">
                      <Button 
                        size="lg"
                        variant="outline"
                        className="h-12 flex-shrink-0 min-w-[120px]"
                        asChild
                      >
                        <a href="/dashboard/stories">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                          </svg>
                          Stories
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </LanguageProvider>
  );
}