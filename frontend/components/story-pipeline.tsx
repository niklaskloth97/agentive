"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

// Types for our story content
export interface StoryPage {
  id: number;
  text: string;
  imageUrl: string;
  audioUrl: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  slug: string;
  languages: string[];
  pages: Record<string, StoryPage[]>; // Key is the language code
}

interface StoryPipelineProps {
  storyId: string;
  pageIndex?: number;
  contentType?: 'all' | 'text' | 'image' | 'audio';
}

// Import all stories data directly
import storiesData from '@/data/stories.json';

export const StoryPipeline: React.FC<StoryPipelineProps> = ({
  storyId,
  pageIndex = 0,
  contentType = 'all'
}) => {
  const { selectedLanguage } = useLanguage();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Find the requested story
    const story = (storiesData as Story[]).find(s => s.id === storyId);
    
    if (!story) {
      console.error(`Story with ID "${storyId}" not found`);
      setContent(null);
      return;
    }

    // Get the pages for the selected language or fallback to English
    const pages = story.pages[selectedLanguage] || story.pages["en"];
    
    if (!pages || !pages[pageIndex]) {
      console.error(`Page ${pageIndex} not available for language ${selectedLanguage}`);
      setContent(null);
      return;
    }

    const page = pages[pageIndex];

    // Return the requested content type
    switch(contentType) {
      case 'text':
        setContent(page.text);
        break;
      case 'image':
        setContent(page.imageUrl);
        break;
      case 'audio':
        setContent(page.audioUrl);
        break;
      default:
        // Return the full page object
        setContent(page);
    }
  }, [storyId, pageIndex, selectedLanguage, contentType]);

  return content;
};

// Helper function to get story meta information
export function getStoryInfo(storyId: string): {
  title: string;
  description: string;
  languages: string[];
} | null {
  const story = (storiesData as Story[]).find(s => s.id === storyId);
  
  if (!story) return null;
  
  return {
    title: story.title,
    description: story.description,
    languages: story.languages
  };
}

// Helper function to get total page count for a story
export function getStoryPageCount(storyId: string, language: string): number {
  const story = (storiesData as Story[]).find(s => s.id === storyId);
  
  if (!story) return 0;
  
  const pages = story.pages[language] || story.pages["en"];
  return pages ? pages.length : 0;
}