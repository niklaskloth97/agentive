"use client"

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X, Volume2, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const storyContent = {
  en: {
    label: "English",
    url: "/audio/test-en.opus",
    images: ["/images/stories/pirate-story/1.webp", "/images/stories/pirate-story/2.webp", "/images/stories/pirate-story/3.webp", "/images/stories/pirate-story/4.webp"]
  },
  de: {
    label: "Deutsch",
    url: "/audio/test-de.opus",
    images: ["/images/stories/pirate-story/1.png", "/images/stories/pirate-story/.png", "/images/pirate3-de.jpg"]
  },
  es: {
    label: "Español",
    url: "/audio/test-en.opus",
    images: ["/images/pirate1-es.jpg", "/images/pirate2-es.png", "/images/pirate3-es.jpg"]
  }
};

export default function Page() {
  const [api, setApi] = useState<CarouselApi>();
  const [fullscreenApi, setFullscreenApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof storyContent>("en");
  const [audioLanguage, setAudioLanguage] = useState<keyof typeof storyContent>("en");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard/stories" },
    { label: "A pirate story", href: "/dashboard/multilingual-stories/a-pirate-story" }
  ];

  // Handle regular carousel
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
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
    });
  }, [fullscreenApi, api, isFullscreen]);

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className='w-full flex flex-col gap-8 px-1 md:px-2 xl:px-2 my-4'>
        <div className='w-full max-w-3xl mx-auto relative'>
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
              {storyContent[selectedLanguage].images.map((image: string, index: number) => (
                <CarouselItem key={`${selectedLanguage}-${index}`}>
                  <Card>
                    <CardContent className="flex p-4 items-center justify-center">
                      <Image
                        src={image} 
                        alt={`Story scene ${index + 1}`}
                        width={400}
                        height={400}
                        className="object-cover rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="text-center mt-2">
            Scene {current} of {count}
          </div>
        </div>
        
        {/* Fullscreen dialog */}
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
          <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] max-h-[90vh]">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            <div className="flex flex-col h-full gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5" />
                    <Select 
                      value={audioLanguage as string} 
                      onValueChange={(value) => setAudioLanguage(value as keyof typeof storyContent)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select audio language" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(storyContent).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <a 
                    href={storyContent[audioLanguage].url} 
                    download 
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Download className="h-4 w-4" />
                    Download audio
                  </a>
                </div>
                
                <audio 
                  controls 
                  src={storyContent[audioLanguage].url}
                  className="w-full"
                ></audio>
              </div>
              
              <div className="flex justify-end items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Image language:</span>
                  <Select 
                    value={selectedLanguage as string} 
                    onValueChange={(value) => setSelectedLanguage(value as keyof typeof storyContent)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select image language" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(storyContent).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex-1 min-h-0">
                <Carousel setApi={setFullscreenApi} className="h-full">
                  <CarouselContent className="h-full">
                    {storyContent[selectedLanguage].images.map((image: string, index: number) => (
                      <CarouselItem key={`fullscreen-${selectedLanguage}-${index}`} className="h-full">
                        <div className="flex items-center justify-center h-full">
                          <Image
                            src={image} 
                            alt={`Story scene ${index + 1}`}
                            width={800}
                            height={600}
                            className="object-contain max-h-full rounded-lg"
                          />
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

        <div className="flex w-full mt-8">
          <div className="w-3/5">
            <embed
              src="/Monster story example_october6.pdf"
              type="application/pdf"
              width="100%"
              height="1000"
              title="Embedded PDF Viewer"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}