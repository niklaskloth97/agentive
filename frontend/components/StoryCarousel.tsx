"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StoryCarouselProps {
  pages: Array<{
    text: string;
    imageUrl: string;
    audioUrl?: string;
  }>;
  selectedLanguage: string;
  isTextVisible: boolean;
  onPageChange?: (pageIndex: number) => void;
  className?: string;
  isFullscreen?: boolean;
}

export function StoryCarousel({ 
  pages, 
  selectedLanguage, 
  isTextVisible, 
  onPageChange,
  className,
  isFullscreen = false
}: StoryCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  // Handle carousel page changes
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap();
      onPageChange?.(currentIndex);
    });
  }, [api, onPageChange]);

  // Render text container
  const renderTextContainer = (page: { text: string }) => {
    if (!isTextVisible || !page.text) return null;
    
    return (
      <div className={cn(
        "text-container bg-white rounded-lg w-full flex-shrink-0",
        isFullscreen ? "px-4 py-3 mt-4 border shadow-sm" : "border p-2 shadow-sm mt-4"
      )}>
        <p className={cn(
          "text-center break-words hyphens-auto leading-relaxed",
          isFullscreen ? "text-lg md:text-xl lg:text-2xl" : "text-lg md:text-xl"
        )}>
          {page.text}
        </p>
      </div>
    );
  };

  return (
    <Carousel setApi={setApi} className={cn("h-full w-full", className)}>
      <CarouselContent className="h-full">
        {pages.map((page, index) => (
          <CarouselItem 
            key={`${selectedLanguage || "placeholder"}-${index}`} 
            className="w-full flex items-center justify-center h-full"
          >
            <Card className={cn(
              "w-full border-0 shadow-none bg-transparent", 
              isFullscreen ? "h-full" : "h-full"
            )}>
              <CardContent className={cn(
                "flex flex-col w-full h-full",
                isFullscreen ? "p-2 justify-start" : "p-4 items-center justify-center"
              )}>
                {/* Image container */}
                <div className={cn(
                  "w-full relative",
                  isFullscreen ? 
                    (selectedLanguage && isTextVisible && page.text ? 
                      "h-[65vh]" : "h-[80vh]"
                    ) : 
                    "aspect-video"
                )}>
                  <Image
                    src={page.imageUrl} 
                    alt={`Story scene ${index + 1}`}
                    fill
                    className={cn(
                      "rounded-lg object-contain",
                      !selectedLanguage && "opacity-50 blur-sm"
                    )}
                    sizes={isFullscreen ? "95vw" : "100vw"}
                    priority
                  />
                </div>
                
                {/* Text container */}
                {selectedLanguage && renderTextContainer(page)}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {selectedLanguage && pages.length > 1 && (
        <>
          <CarouselPrevious className={isFullscreen ? "left-2" : ""} />
          <CarouselNext className={isFullscreen ? "right-2" : ""} />
        </>
      )}
    </Carousel>
  );
}