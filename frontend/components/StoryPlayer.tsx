"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Maximize2, 
  Volume2, 
  Play, 
  Pause, 
  Globe, 
  VolumeX,
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

interface StoryPlayerProps {
  storyId: string;
  showAudioControls?: boolean;
  showText?: boolean; // New prop to control text visibility
  className?: string;
}

interface StoryLanguageContent {
  label: string;
  audioUrl: string;
  coverImage: string;
}
type StoryPageItem = {
  id: number;
  text: string;
  imageUrl: string;
  audioUrl?: string;
};

export function StoryPlayer({ 
  storyId, 
  showAudioControls = true,
  showText = true, // Default to showing text
  className 
}: StoryPlayerProps) {
  // Story data access
  const storyInfo = storiesData.find(story => story.id === storyId);
  
  // Carousel state
  const [api, setApi] = useState<CarouselApi>();
  const [fullscreenApi, setFullscreenApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Language state
  const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // Empty string means no selection
  const [currentPage, setCurrentPage] = useState(0);
  
  // Sidebar state
  const [sidebarCollapsed] = useState(false);

  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [audioAutoPlay, setAudioAutoPlay] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null); // COMMENTED OUT - using HTML5 player instead
  
  // Text visibility state
  const [isTextVisible] = useState<boolean>(showText);
  
  // Create a StoryLanguageContent mapping
  const storyContent: Record<string, StoryLanguageContent> = {};
  
  // Populate storyContent if storyInfo exists
  if (storyInfo) {
    Object.entries(storyInfo.pages || {}).forEach(([lang, pages]) => {
      if (pages && pages.length > 0) {
        storyContent[lang] = {
          label: lang === 'en' ? 'English' : 
                 lang === 'de' ? 'German' : 
                 lang === 'fr' ? 'French' : 
                 lang === 'es' ? 'Espagnol' :
                 lang === 'it' ? 'Italian' :
                 lang === 'lux' ? 'Luxembourgish' :
                 lang === 'gr' ? 'Greek' :
                 lang === 'sv' ? 'Slovenian' :
                 lang ===  'al' ? 'Albanian' :
                 lang ===  'ukr' ? 'Ukrainian' :
                 lang.toUpperCase(),
          audioUrl: pages[0].audioUrl || "",
          coverImage: pages[0].imageUrl || ""
        };
      }
    });
  }

  const availableLanguages = Object.fromEntries(
    Object.entries(storyContent).map(([key, value]) => [key, { label: value.label }])
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Reset current page when language changes
    setCurrentPage(0);
    setIsPlaying(false);
    // if (audioRef.current) {
    //   audioRef.current.pause();
    // }
    if (api) {
      api.scrollTo(0);
    }
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
        "text-container mt-4 bg-white rounded-lg w-full",
        isFullscreen ? "p-4" : "border p-2 shadow-sm"
      )}>
        <p className="text-2xl text-center">{page.text}</p>
      </div>
    );
  };
  
  // Get pages for the selected language
  const pages = selectedLanguage && storyInfo?.pages?.[selectedLanguage as keyof typeof storyInfo.pages] || [];
  
  // Create a placeholder page using the first English page of the story if available
  const placeholderPage = storyInfo?.pages?.en?.[0] || {
    id: 0, // Changed from string to number to match StoryPageItem interface
    imageUrl: "/images/placeholder-story.jpg", // Fallback image if no English version
    text: ""
  };

  // Handle regular carousel
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCurrentPage(api.selectedScrollSnap());
      setIsPlaying(false);
      // if (audioRef.current) {
      //   audioRef.current.pause();
      // }
    });
  }, [api]);


  //Fullscreen and audio button - SIMPLIFIED to just open fullscreen
  const openFullscreenWithAutoplay = () => {
    // Just open fullscreen - HTML5 player will handle audio
    setIsFullscreen(true);
  };

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

  // Add event listeners to track actual audio state
  useEffect(() => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(false);
        setAudioAutoPlay(false);
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

  return (
    <LanguageProvider 
      defaultLanguage="" // No default language 
      availableLanguages={availableLanguages}
      onLanguageChange={handleLanguageChange}
    >
      <div className={cn("flex flex-col w-full h-full overflow-hidden", className)}>
        <div className="flex text-center items-center justify-between p-4 mb-4">
          <h1 className="text-2xl p-4 absolute left-1/2 transform -translate-x-1/2 font-bold">
            {storyInfo?.title || "Story"}
          </h1>
          {!showAudioControls && (
                  <LanguageSelector />
          )}
        </div>

        <div className="flex flex-row w-full gap-0 relative">
          {/* Collapsible Sidebar - disabled, when no audio options */}
          {showAudioControls && (
            <div 
              className=
                "flex flex-col border-r border-slate-200 transition-all duration-300 ease-in-out h-full w-56"
              
            >
              <div className="flex flex-col p-4 gap-6 h-full relative">
                

                <div className="transition-opacity space-y-8">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Select a Language</h3>
                    <LanguageSelector />
                  </div>
                  
                  {/* Audio-controls */}
                  {selectedLanguage && (
                    <>
                      {/* COMMENTED OUT - Volume controls now handled by HTML5 player */}
                      {/* <div>
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
                      </div> */}

                      {/* Download options */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Download</h3>
                        
                        {pages[currentPage]?.audioUrl && (
                          <Button className="w-full mb-2" variant="outline" asChild>
                            <a href={pages[currentPage].audioUrl} download>
                              <Download className="mr-2" size={16}/> Story Audio
                            </a>
                          </Button>
                        )}
                        
                        <Button className="w-full mb-4" variant="outline">
                          <Download className="mr-2" size={16}/> Story Text
                        </Button>
                        <Button className="w-full mb-4" variant="outline">
                          <Download className="mr-2" size={16}/> Story Pictures
                        </Button>
                        <Button className="w-full mb-4" variant="outline">
                          <Download className="mr-2" size={16}/> Story Guide
                        </Button>
                      </div>

                      {/* Play button - simplified to just open fullscreen */}
                      <Button 
                        className="center w-full mt-auto h-16 text-lg"
                        variant="default"
                        onClick={openFullscreenWithAutoplay}
                        disabled={!pages[currentPage]?.audioUrl}
                      >
                        <Play className="mr-2" size={24}/> Play Story
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
            
          {/* Main Content */}
          <div className={cn(
            "flex-1 min-h-0 flex flex-col transition-all duration-300 ease-in-out",
            showAudioControls ? 
              (sidebarCollapsed ? "w-[calc(100%-3rem)]" : "w-[calc(100%-16rem)]") : 
              "w-full"
          )}>
            <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
              <div className="relative flex-1">
                {/* Language selection overlay - show when no language is selected */}
                {!selectedLanguage && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-sm">
                    <Card className="w-80 shadow-lg">
                      <CardContent className="flex flex-col items-center p-6 text-center">
                        <Globe className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-medium mb-2">Select a Language</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Please choose a language to view this story
                        </p>
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
                        className="h-full flex items-center justify-center"
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
              
              {/* Page indicator - only show when a language is selected */}
              {selectedLanguage && (
                <div className="text-center py-2">
                  Page {current} of {pages.length}
                </div>
              )}
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
            <DialogContent className="max-w-[calc(95vw/1.25)] w-[calc(95vw/1.25)] h-[calc(90vh/1.25)] max-h-[calc(90vh/1.25)] m-4">
              <div className="flex flex-col h-full gap-4">
                {/* COMMENTED OUT - Toolbar with custom audio controls replaced by HTML5 player */}
                {/* <div className="flex items-center justify-between flex-shrink-0">
                  {showAudioControls && selectedLanguage && pages[currentPage]?.audioUrl && (
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline" 
                        size="icon"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Volume2 size={16} />
                        <Slider
                          value={[volume]}
                          min={0}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          className="w-24"
                        />
                      </div>
                    </div>
                  )}
                </div> */}
                
                {/* Fullscreen carousel */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  <Carousel setApi={setFullscreenApi} className="h-full w-full">
                    <CarouselContent className="h-full">
                      {(selectedLanguage && pages.length > 0 ? pages : [placeholderPage]).map((page, index) => (
                        <CarouselItem key={`fullscreen-${selectedLanguage || "placeholder"}-${index}`} className="h-full">
                          <div className="flex flex-col items-center justify-center h-full w-full p-4">
                            <div className="w-full max-w-4xl aspect-video relative rounded-lg overflow-hidden">
                              <Image
                                src={page.imageUrl} 
                                alt={`Story scene ${index + 1}`}
                                fill
                                className={cn(
                                  "object-contain",
                                  !selectedLanguage && "opacity-50 blur-sm"
                                )}
                              />
                            </div>
                            {selectedLanguage && renderTextContainer(page, true)}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {selectedLanguage && pages.length > 1 && (
                      <>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                      </>
                    )}
                  </Carousel>
                </div>
                <div className="flex items-center flex-col justify-between">
                 
                  {selectedLanguage && pages[currentPage]?.audioUrl && (
                    <audio 
                      controls 
                      autoPlay={audioAutoPlay}
                      key={`audio-${selectedLanguage}-${currentPage}`} // Force re-render when page changes
                      className="w-full"
                    >
                      <source src={pages[currentPage].audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  
                  <div className="flex mt-2 gap-2 justify-between w-full">
                    <Button 
                      size="lg"
                      onClick={() => {
                        const audioElement = document.querySelector('audio');
                        if (audioElement) {
                          if (audioElement.paused) {
                            audioElement.play();
                            setAudioAutoPlay(true);
                            setIsPlaying(true);
                          } else {
                            audioElement.pause();
                            setAudioAutoPlay(false);
                            setIsPlaying(false);
                          }
                        }
                      }}
                      className="h-12"
                      variant="default"
                    >
                      {isPlaying ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
                      {isPlaying ? "Start Autoplay" : "Stop Autoplay"}
                    </Button>
                    
                    <Button 
                      size="lg"
                      variant="outline"
                      className="h-12"
                      asChild
                    >
                      <a href="/dashboard/stories">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        Stories
                      </a>
                    </Button>
                  </div>
                  
                  {/* Page indicator for fullscreen */}
                  {selectedLanguage && (
                    <div className="text-center py-2 flex-shrink-0">
                      <span className="text-sm text-muted-foreground">
                        Page {current} of {pages.length}
                      </span>
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