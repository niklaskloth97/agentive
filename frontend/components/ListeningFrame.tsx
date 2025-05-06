"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, Download, Volume2 } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface StoryLanguageContent {
  label: string;
  audioUrl: string;
  coverImage: string;
}

interface ListeningFrameProps {
  storyContent: Record<string, StoryLanguageContent>;
  initialLanguage?: string;
  title?: string;
  onLanguageChange?: (language: string) => void;
  className?: string;
}

export default function ListeningFrame({
  storyContent,
  initialLanguage = "en",
  title,
  onLanguageChange,
  className
}: ListeningFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage);

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    if (onLanguageChange) {
      onLanguageChange(value);
    }
  };

  return (
    <>
      <Card className={`relative ${className}`}>
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
          {title && (
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
          )}
          <div className="mb-6 flex justify-center">
            <div className="max-w-2xl w-full">
              <Image
                src={storyContent[selectedLanguage]?.coverImage || ''}
                alt="Story Cover"
                width={800}
                height={500}
                className="rounded-lg object-contain w-full h-auto"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-3 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                <Select 
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
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
                href={storyContent[selectedLanguage]?.audioUrl} 
                download 
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
              >
                <Download className="h-4 w-4" />
                Download audio
              </a>
            </div>
            
            <audio 
              controls 
              src={storyContent[selectedLanguage]?.audioUrl}
              className="w-full"
              key={storyContent[selectedLanguage]?.audioUrl} // Force reload when source changes
            ></audio>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogTitle/> 
        <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] max-h-[90vh] p-6">
          {/* Close button positioned like the maximize button */}
          <div className="absolute top-2 right-2 z-10">
            <DialogClose/>


          </div>
          
          {title && (
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
          )}
          
          <div className="mb-6 flex-1 flex items-center justify-center">
            <Image
              src={storyContent[selectedLanguage]?.coverImage || ''}
              alt="Story Cover"
              width={1200}
              height={800}
              className="rounded-lg object-contain max-h-[60vh] max-w-full"
            />
          </div>
          
          <div className="flex flex-col gap-3 rounded-lg px-4 mt-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                <Select 
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
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
                href={storyContent[selectedLanguage]?.audioUrl} 
                download 
                className="flex items-center gap-3 text-sm text-primary hover:text-primary/20"
              >
                <Download className="h-4 w-4" />
                Download audio
              </a>
            </div>
            
            <audio 
              controls 
              src={storyContent[selectedLanguage]?.audioUrl}
              className="w-full"
              key={`fullscreen-${storyContent[selectedLanguage]?.audioUrl}`}
            ></audio>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}