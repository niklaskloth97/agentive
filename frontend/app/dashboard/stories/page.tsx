"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import Image from 'next/image'
import Link from 'next/link'
import { Headphones, BookOpen, Home } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import storiesData from '@/data/stories.json'
import { Button } from "@/components/ui/button"

export default function Page() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'json' | 'array' | null>(null)
  
  const breadcrumbItems = [
    { label: "Learning Material Overview", href: "/dashboard/" },
    { label: "Multilingual Stories" }
  ];

  // Helper function to get available languages from JSON story data
  const getJsonStoryLanguages = (story: any) => {
    const languages: string[] = [];
    Object.keys(story).forEach(key => {
      if (key !== 'id' && key !== 'slug' && Array.isArray(story[key]) && story[key].length > 0) {
        switch(key) {
          case 'en': languages.push('English'); break;
          case 'de': languages.push('German'); break;
          case 'de-short': languages.push('German (Short)'); break;
          case 'fr': languages.push('French'); break;
          case 'es': languages.push('Spanish'); break;
          case 'it': languages.push('Italian'); break;
          case 'lux': languages.push('Luxembourgish'); break;
          case 'gr': languages.push('Greek'); break;
          case 'sv': languages.push('Slovenian'); break;
          case 'al': languages.push('Albanian'); break;
          case 'ukr': languages.push('Ukrainian'); break;
          default: languages.push(key.toUpperCase());
        }
      }
    });
    return languages.length > 0 ? languages : ['English'];
  }

  // Helper function to get a cover image for JSON story
  const getJsonStoryCoverImage = (story: any) => {
    // Try to get the titlePicture from English, fallback to any available language
    const englishData = story.en;
    if (Array.isArray(englishData) && englishData.length > 0 && englishData[0].titlePicture) {
      return englishData[0].titlePicture;
    }
    
    // Try other languages
    for (const [key, value] of Object.entries(story)) {
      if (key !== 'id' && key !== 'slug' && Array.isArray(value) && value.length > 0) {
        const langData = value[0] as any;
        if (langData.titlePicture) {
          return langData.titlePicture;
        }
        // Fallback to first page image
        if (langData.pages && langData.pages["1"] && langData.pages["1"].imageUrl) {
          return langData.pages["1"].imageUrl;
        }
      }
    }
    
    // Final fallback image
    return '/images/story-placeholder.jpg';
  }

  // Helper function to get story title
  const getStoryTitle = (story: any) => {
    // Try to get title from English first
    const englishData = story.en;
    if (Array.isArray(englishData) && englishData.length > 0 && englishData[0].title) {
      return englishData[0].title;
    }
    
    // Try other languages
    for (const [key, value] of Object.entries(story)) {
      if (key !== 'id' && key !== 'slug' && Array.isArray(value) && value.length > 0) {
        const langData = value[0] as any;
        if (langData.title) {
          return langData.title;
        }
      }
    }
    
    return `Story ${story.id}`;
  }

  const openStoryDialog = (id: string, type: 'json' | 'array') => {
    setSelectedStory(id);
    setSelectedType(type);
  }

  const closeStoryDialog = () => {
    setSelectedStory(null);
    setSelectedType(null);
  }

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold mb-6">Multilingual Stories</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {storiesData.map((story) => (
            <Card 
              key={story.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openStoryDialog(story.id, 'json')}
            >
              <div className="relative aspect-square">
                <Image 
                  src={getJsonStoryCoverImage(story)} 
                  alt={getStoryTitle(story)} 
                  fill
                  className="object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-lg font-semibold text-white">{getStoryTitle(story)}</h2>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Fullscreen Story Dialog */}
        <Dialog open={selectedStory !== null} onOpenChange={closeStoryDialog}>
          <DialogTitle className="sr-only">Story Details</DialogTitle>
              <DialogContent 
              className="w-[200vw] h-[85vh] max-h-[85vh] max-w-[160vh] m-4 rounded-lg border"
            >            
            {/* Display JSON story details */}
            {selectedType === 'json' && selectedStory && (
              <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col items-center justify-center">
                  {(() => {
                    const story = storiesData.find(s => s.id === selectedStory);
                    if (!story) return null;
                    
                    return (
                      <>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white dark:bg-gray-800/40 rounded-xl mb-6 max-w-2xl w-full overflow-hidden">
                          <div className="w-full sm:w-1/2 flex-shrink-0">
                            <div className="relative aspect-square w-full max-w-[100px] mx-auto">
                              <Image
                                src={getJsonStoryCoverImage(story)}
                                alt={getStoryTitle(story)}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          </div>
                          <div className="w-full sm:w-2/3 p-4 sm:border-l border-gray-200 dark:border-gray-700 flex flex-col justify-center h-full">
                            <h2 className="text-xl sm:text-2xl font-semibold">{getStoryTitle(story)}</h2>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              <p>Available in: {getJsonStoryLanguages(story).join(', ')}</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                          {/* Listen */}
                          <Link href={`/dashboard/stories/${story.id}/listening`} className="w-full">
                            <button 
                              className="w-full h-48 md:h-64 rounded-xl bg-blue-200 hover:bg-blue-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
                              aria-label="Listen to story"
                            >
                              <Headphones className="h-36 w-36 md:h-48 md:w-48 text-blue-600" strokeWidth={1.5} />
                              <span className="text-lg font-semibold text-blue-600 mt-3">Listen & Watch</span>
                            </button>
                          </Link>

                          {/* Read */}
                          <Link href={`/dashboard/stories/${story.id}/reading`} className="w-full">
                            <button 
                              className="w-full h-48 md:h-64 rounded-xl bg-yellow-200 hover:bg-yellow-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-yellow-300"
                              aria-label="Read story"
                            >
                              <BookOpen className="h-36 w-36 md:h-48 md:w-48 text-yellow-600" strokeWidth={1.5} />
                              <span className="text-lg font-semibold text-yellow-600 mt-3">Read</span>
                            </button>
                          </Link>

                        {/* Activities - disabled based on feedback*/}
                        {/* <Link href={`/dashboard/stories/${story.id}/activities`} className="w-full">
                          <button 
                            className="w-full h-48 md:h-64 rounded-xl bg-amber-200 hover:bg-amber-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-amber-300"
                            aria-label="View follow-up activities"
                          >
                            <Activity className="h-36 w-36 md:h-48 md:w-48 text-amber-600" strokeWidth={1.5} />
                            <span className="text-lg font-semibold text-amber-600 mt-3">Activities</span>
                          </button>
                        </Link> */}
                        </div>
                      </>
                    );
                  })()}
                </div>
                
                {/* Footer with Stories button aligned to the right */}
                <div className="w-full flex justify-end mt-2">  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-24 text-2xl"
                    asChild
                  >
                    <a href="/dashboard/stories">
                      <Home className="h-8 w-8 md:h-8 md:w-8 mr-2" />
                      Stories
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}