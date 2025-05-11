"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import storiesData from '@/data/stories.json';

export default function StoryReadingPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageContent, setPageContent] = useState<{
    text: string;
    imageUrl: string;
    audioUrl: string;
  } | null>(null);
  
  // Hardcode the story ID to "1" as you mentioned
  const storyId = "1";
  const selectedLanguage = "en";
  
  // Get story info directly from the JSON file
  const storyInfo = storiesData.find(story => story.id === storyId);
  const pages = storyInfo?.pages?.[selectedLanguage] || [];
  const totalPages = pages.length;
  
  useEffect(() => {
    // Get the current page data
    if (storyInfo && pages[currentPage]) {
      setPageContent(pages[currentPage]);
    }
  }, [currentPage, storyInfo]);

  if (!storyInfo || !pageContent) {
    return <div className="container mx-auto py-6">Loading story...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">{storyInfo.title}</h1>
      
      <div className="story-content-wrapper">
        <div className="image-container mb-6">
          {pageContent.imageUrl && (
            <Image 
              src={pageContent.imageUrl}
              alt={`Page ${currentPage + 1}`} 
              width={600} 
              height={400} 
              className="rounded-lg mx-auto"
            />
          )}
        </div>
        
        <div className="text-container bg-white p-4 rounded-lg shadow-sm mb-4">
          <p className="text-lg">{pageContent.text}</p>
        </div>
        
        {pageContent.audioUrl && (
          <audio 
            controls 
            src={pageContent.audioUrl} 
            className="mt-4 w-full"
            onError={(e) => console.error("Audio error:", e)}
          ></audio>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <span className="px-4 py-2">
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}