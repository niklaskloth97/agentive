"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
   
  Play, 
  Pause, 
  Globe, 
} from "lucide-react";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import storiesData from '@/data/stories.json';
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';
import { StoryCarousel } from '@/components/StoryCarousel';


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

export function StoryPlayer({ 
  storyId, 
  showAudioControls = true,
  showText = true,
  className 
}: StoryPlayerProps) {
  // Get website language for translations
  const { websiteLanguage } = useWebsiteLanguage();
  
  // Story data access
  const storyInfo = storiesData.find(story => story.id === storyId);
  
  // State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAutoPlay, setAudioAutoPlay] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  const autoPlaySafariFix = (enable: boolean) => {
    // Safari requires user interaction to play audio, so we never enable autoplay on Safari
    if (isSafari) {
      setAudioAutoPlay(false);
      return false;
    } else {
      // For other browsers, set autoplay based on the enable parameter
      setAudioAutoPlay(enable);
      return enable;
    }
  }

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
    }
    
    setIsPlaying(false);
  };

  // Safari detection useEffect
  useEffect(() => {
    const detectSafari = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isSafariBrowser = userAgent.includes('safari') && 
                             !userAgent.includes('chrome') && 
                             !userAgent.includes('chromium') && 
                             !userAgent.includes('edg');
      setIsSafari(isSafariBrowser);
    };

    detectSafari();
  }, []);

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

  // Handle page changes for autoplay
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setIsPlaying(false);
    
    // If autoplay is enabled and not Safari, start playing new page
    if (audioAutoPlay && !isSafari) {
      // Small delay to ensure audio element is ready
      setTimeout(() => {
        const audioElement = document.querySelector('audio');
        if (audioElement) {
          audioElement.play().catch(err => {
            console.error('Auto-play failed:', err);
          });
        }
      }, 100);
    }
  };

  // Add event listeners to track actual audio state
  useEffect(() => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(false);
        // Keep audioAutoPlay enabled when audio ends naturally
        // This allows autoplay to continue on next slide
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

    const { websiteLanguage } = useWebsiteLanguage();
    
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
                  <h3 className="text-sm font-medium mb-2">
                    <TranslateButtons translationKey="select-lang" currentLanguage={websiteLanguage} />
                  </h3>
                  <LanguageSelector />
                </div>
                
                {selectedLanguage && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        <TranslateButtons translationKey="download" currentLanguage={websiteLanguage} />
                      </h3>
                      
                      {pages[currentPage]?.audioUrl && (
                        <Button className="w-full mb-2" variant="outline" asChild>
                          <a href={pages[currentPage].audioUrl} download>
                            <Download className="mr-2" size={16}/>
                            <TranslateButtons translationKey="audio" currentLanguage={websiteLanguage} />
                          </a>
                        </Button>
                      )}
                      
                      <Button className="w-full mb-4" variant="outline">
                        <Download className="mr-2" size={16}/>
                        <TranslateButtons translationKey="text" currentLanguage={websiteLanguage} />
                      </Button>
                      <Button className="w-full mb-4" variant="outline">
                        <Download className="mr-2" size={16}/>
                        <TranslateButtons translationKey="picture" currentLanguage={websiteLanguage} />
                      </Button>
                      <Button className="w-full mb-4" variant="outline">
                        <Download className="mr-2" size={16}/>
                        <TranslateButtons translationKey="dialog-guide" currentLanguage={websiteLanguage} />
                      </Button>
                    </div>

                    <Button 
                      className="center w-full mt-auto h-16 text-lg"
                      variant="default"
                      onClick={() => {
                        setIsFullscreen(true);
                        // Don't enable autoplay automatically - let user decide
                      }}
                      disabled={!pages[currentPage]?.audioUrl}
                    >
                      <Play className="mr-2" size={24}/>
                      <TranslateButtons translationKey="go" currentLanguage={websiteLanguage} />
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
              <div className="relative flex-1 px-16">
                {!selectedLanguage && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-sm">
                    <Card className=" w-80 shadow-lg">
                      <CardContent className="flex flex-col items-center p-6 text-center">
                        <Globe className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                          <TranslateButtons translationKey="select-lang" currentLanguage={websiteLanguage} />
                        </h3>
                        
                        <div className="mt-2">
                          <LanguageSelector />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Fullscreen button - only visible when a language is selected
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
                  </div> */}
                {/* )} */}
                
                {/* Main Carousel */}
                <StoryCarousel
                  pages={selectedLanguage && pages.length > 0 ? pages : [placeholderPage]}
                  selectedLanguage={selectedLanguage}
                  isTextVisible={isTextVisible}
                  onPageChange={handlePageChange}
                  isFullscreen={false}
                />
              </div>
            </div>
          </div>
          
          {/* Fullscreen */}
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTitle className="sr-only">Story Details</DialogTitle>
            <DialogContent
              className={cn(
                "p-0 m-0 border-0 bg-white rounded-lg flex flex-col items-center justify-center",
                "w-[95vw] h-[95vh] max-w-none max-h-none overflow-hidden"
              )}
              style={{ boxSizing: "border-box" }}
            >
              <div className="flex flex-col h-full w-full overflow-hidden">
                {/* Fullscreen carousel - takes remaining space */}
                <div className="flex-1 min-h-0 w-full px-4">
                  <StoryCarousel
                    pages={selectedLanguage && pages.length > 0 ? pages : [placeholderPage]}
                    selectedLanguage={selectedLanguage}
                    isTextVisible={isTextVisible}
                    onPageChange={handlePageChange}
                    isFullscreen={true}
                  />
                </div>

                {/* Bottom section - fixed height to prevent overflow */}
                <div className="flex-shrink-0 p-4 border-t bg-white">
                  {showAudioControls && (
                    <div className="flex flex-col gap-4">
                      {selectedLanguage && pages[currentPage]?.audioUrl && (
                        <audio 
                          autoPlay={audioAutoPlay && !isSafari}
                          key={`audio-${selectedLanguage}-${currentPage}`}
                          className="w-full h-12"
                          preload="auto"
                          src={pages[currentPage].audioUrl}
                          
                        >
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      
                      <div className="flex gap-4 justify-between w-full">
                        <Button 
                          size="lg"
                          onClick={() => {
                            const audioElement = document.querySelector('audio');
                            if (audioElement) {
                              if (audioElement.paused) {
                                audioElement.play().catch(err => {
                                  console.error('Audio playback failed:', err);
                                });
                                // Enable autoplay when user clicks play
                                autoPlaySafariFix(true);
                                setIsPlaying(true);
                              } else {
                                audioElement.pause();
                                // Disable autoplay when user clicks pause - use autoPlaySafariFix
                                autoPlaySafariFix(false);
                                setIsPlaying(false);
                              }
                            }
                          }}
                          className="h-14 min-w-[140px]"
                          variant="default"
                        >
                          {isPlaying ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
                          {isPlaying ? 
                            <TranslateButtons translationKey="pause" currentLanguage={websiteLanguage} /> : 
                            <TranslateButtons translationKey="play" currentLanguage={websiteLanguage} />
                          }
                        </Button>
                        <Button 
                          size="lg"
                          variant="outline"
                          className="h-14 min-w-[140px]"
                          asChild
                        >
                          <a href="/dashboard/stories">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                              <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            <TranslateButtons translationKey="stories" currentLanguage={websiteLanguage} />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Home button - show when audio controls are disabled */}
                  {!showAudioControls && (
                    <div className="flex gap-2 justify-center w-full">
                      <Button 
                        size="lg"
                        variant="outline"
                        className="h-14 min-w-[140px]"
                        asChild
                      >
                        <a href="/dashboard/stories">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                          </svg>
                          <TranslateButtons translationKey="stories" currentLanguage={websiteLanguage} />
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