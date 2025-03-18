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
import {NavigationMenuDemo} from "@/components/ActivitySelection";
import Image from "next/image";

const storyContent = {
  en: {
    label: "English",
    url: "/audio/Free_Test_Data_1MB_MP3.mp3",
    images: ["/images/stories/pirate-story/1.webp", "/images/stories/pirate-story/2.webp", "/images/stories/pirate-story/3.webp", "/images/stories/pirate-story/4.webp"]
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
          {/* <LanguageAudioPlayer 
            audioSources={storyContent}
            defaultLanguage="en"
            onLanguageChange={(language: string) => setSelectedLanguage(language as keyof typeof storyContent)}
          /> */}
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {storyContent[selectedLanguage].images.map((image: string, index: number) => (
                <CarouselItem key={index}>
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
          <div className="w-2/5 pl-4">
            {/* Add your additional component here */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Additional Stuff</h2>
              <p className="text-sm">This is just for testing...</p>
              <div className="mt-4 px-2 flex space-x-4">
              <a 
                href="/Strategic_Management_and_Public_Sector_Digitalization_Strategies v1.pdf" 
                download 
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Download PDF
              </a>
              <a 
                href={storyContent[selectedLanguage].url} 
                download 
                className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Download Audio
              </a>
              </div>
              <div className="mt-4">
                <NavigationMenuDemo />
              </div>
            </div>
            </div>
          </div>
          
        </div>
      
    </DashboardLayout>
  );
}