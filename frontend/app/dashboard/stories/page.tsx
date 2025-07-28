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
import { Story, getStoryTitle, getStoryCoverImage, getStoryLanguages } from "@/types/story"

export default function Page() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'json' | 'array' | null>(null)
  
  const breadcrumbItems = [
    { label: "Multilingual Resources", href: "/dashboard/" },
    { label: "Stories" }
  ];

  const openStoryDialog = (id: string, type: 'json' | 'array') => {
    setSelectedStory(id);
    setSelectedType(type);
  }

  const closeStoryDialog = () => {
    setSelectedStory(null);
    setSelectedType(null);
  }

  // Type assertion for storiesData
  const typedStoriesData = storiesData as Story[];

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Multilingual Stories</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {typedStoriesData.map((story) => (
            <Card 
              key={story.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openStoryDialog(story.id, 'json')}
            >
              <div className="relative aspect-square">
                <Image 
                  src={getStoryCoverImage(story)} 
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
            className="w-[90vw] h-[85vh] max-h-[85vh] max-w-[1200px] m-4 rounded-lg border"
          >            
            {selectedType === 'json' && selectedStory && (
              <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col items-center justify-center">
                  {(() => {
                    const story = typedStoriesData.find(s => s.id === selectedStory);
                    if (!story) return null;
                    
                    return (
                      <>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white dark:bg-gray-800/40 rounded-xl mb-6 max-w-2xl w-full overflow-hidden">
                          <div className="w-full sm:w-1/2 flex-shrink-0">
                            <div className="relative aspect-square w-full max-w-[200px] mx-auto">
                              <Image
                                src={getStoryCoverImage(story)}
                                alt={getStoryTitle(story)}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          </div>
                          <div className="w-full sm:w-2/3 p-4 sm:border-l border-gray-200 dark:border-gray-700 flex flex-col justify-center h-full">
                            <h2 className="text-xl sm:text-2xl font-semibold">{getStoryTitle(story)}</h2>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              <p>Available in: {getStoryLanguages(story).join(', ')}</p>
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
                        </div>
                      </>
                    );
                  })()}
                </div>
                
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