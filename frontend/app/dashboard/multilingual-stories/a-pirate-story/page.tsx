"use client"

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import LanguageAudioPlayer from "@/components/LanguageAudioPlayer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const storyContent = {
  en: {
    label: "English",
    url: "/audio/Free_Test_Data_1MB_MP3.mp3",
    images: ["/images/stories/pirate-story/2.png", "/images/stories/pirate-story/2.png", "/images/pirate3.jpg"]
  },
  de: {
    label: "Deutsch",
    url: "/audio/ALEC BENJAMIN - LET ME DOWN SLOWLY.mp3",
    images: ["/images/stories/pirate-story/1.png", "/images/stories/pirate-story/.png", "/images/pirate3-de.jpg"]
  },
  es: {
    label: "Español",
    url: "/audio/pirate-story-es.mp3",
    images: ["/images/pirate1-es.jpg", "/images/pirate2-es.png", "/images/pirate3-es.jpg"]
  }
};

export default function Page() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof storyContent>("en");

  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard/stories" },
    { label: "A pirate story", href: "/dashboard/multilingual-stories/a-pirate-story" }
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className='w-full flex flex-col gap-8 px-1 md:px-2 xl:px-2 my-4'>
        <div className='w-full max-w-md mx-auto'>
          <LanguageAudioPlayer 
            audioSources={storyContent}
            defaultLanguage="en"
            onLanguageChange={(language: string) => setSelectedLanguage(language as keyof typeof storyContent)}
          />
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {storyContent[selectedLanguage].images.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      <img 
                        src={image} 
                        alt={`Story scene ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
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
      </div>
    </DashboardLayout>
  );
}