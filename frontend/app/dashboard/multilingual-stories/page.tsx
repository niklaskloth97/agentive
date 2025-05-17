"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import Image from 'next/image'
import Link from 'next/link'
import { Headphones, BookOpen, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import storiesData from '@/data/stories.json'

export default function Page() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'json' | 'array' | null>(null)
  
  const breadcrumbItems = [
    { label: "Learning Material Overview", href: "/dashboard/" },
    { label: "Multilingual Stories" }
  ];

  const learningmaterial = [
    { 
      title: 'Daniel Dino goes on vacation', 
      excerpt: 'Learning basic vocabulary', 
      image: '/images/stories/dino-story/dino-adventure1.webp', 
      slug: 'daniel-dino',
      description: 'Join Daniel Dino on his exciting vacation adventure! This story introduces basic travel vocabulary and concepts in multiple languages.',
      languages: ['English', 'German', 'French']
    },
    { 
      title: 'Paul Pirate explores foreign lands', 
      excerpt: 'Dialogic reading about dealing with different cultures', 
      image: '/images/stories/pirate-story/4.webp', 
      slug: 'a-pirate-story',
      description: 'Follow Paul Pirate as he discovers new cultures and makes friends around the world. Perfect for developing intercultural awareness.',
      languages: ['English', 'German', 'Spanish', 'Italian', 'French']
    },
    { 
      title: 'Monster at the hairdresser', 
      excerpt: 'Dialogic reading about dealing with different cultures', 
      image: '/images/stories/monster-story/monster.png', 
      slug: 'a-monster-story',
      description: 'A funny story about a monster\'s first trip to the hairdresser, introducing vocabulary about emotions and everyday activities.',
      languages: ['English', 'German', 'Spanish', 'Italian']
    },
  ]

  // Helper function to get available languages from JSON story data
  const getJsonStoryLanguages = (story) => {
    if (!story.pages) return ['English'];
    return Object.keys(story.pages).map(lang => {
      switch(lang) {
        case 'en': return 'English';
        case 'de': return 'German';
        case 'fr': return 'French';
        case 'es': return 'Spanish';
        case 'it': return 'Italian';
        default: return lang.toUpperCase();
      }
    });
  }

  // Helper function to get a cover image for JSON story
  const getJsonStoryCoverImage = (story) => {
    // Try to get the first image from English pages, fallback to any available language
    const pages = story.pages?.en || Object.values(story.pages || {})[0];
    if (pages && pages.length > 0 && pages[0].imageUrl) {
      return pages[0].imageUrl;
    }
    // Fallback image
    return '/images/story-placeholder.jpg';
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
        
        {/* Stories from JSON data */}
        <h2 className="text-2xl font-semibold mb-4">Multilingual Stories</h2>
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
                  alt={story.title} 
                  fill
                  className="object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-lg font-semibold text-white">{story.title}</h2>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Demo learning material */}
        <h2 className="text-2xl font-semibold mb-4">Demo Stories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {learningmaterial.map((story, index) => (
            <Card 
              key={`material-${index}`} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openStoryDialog(index.toString(), 'array')}
            >
              <div className="relative aspect-square">
                <Image 
                  src={story.image} 
                  alt={story.title} 
                  fill
                  className="object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-lg font-semibold text-white">{story.title}</h2>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Fullscreen Story Dialog */}
        <Dialog open={selectedStory !== null} onOpenChange={closeStoryDialog}>
          <DialogTitle className="sr-only">Story Details</DialogTitle>
          <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] max-h-[90vh] p-6">
            
            {/* Display JSON story details */}
            {selectedType === 'json' && selectedStory && (
              <div className="flex flex-col h-full items-center justify-center">
                {(() => {
                  const story = storiesData.find(s => s.id === selectedStory);
                  if (!story) return null;
                  
                  return (
                    <>
                      <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white dark:bg-gray-800/40 rounded-xl mb-8 max-w-2xl w-full overflow-hidden">
                        <div className="w-full sm:w-1/3 flex-shrink-0">
                          <div className="relative aspect-square w-full max-w-[120px] mx-auto">
                            <Image
                              src={getJsonStoryCoverImage(story)}
                              alt={story.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        </div>
                        <div className="w-full sm:w-2/3 p-4 sm:border-l border-gray-200 dark:border-gray-700 flex flex-col justify-center h-full">
                          <h2 className="text-xl sm:text-2xl font-semibold">{story.title}</h2>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <p>Available in: {getJsonStoryLanguages(story).join(', ')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {/* Updated URL path for Listen */}
                        <Link href={`/dashboard/multilingual-stories/story-${story.id}/listening`} className="w-full">
                          <button 
                            className="w-full h-48 md:h-64 rounded-xl bg-blue-200 hover:bg-blue-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
                            aria-label="Listen to story"
                          >
                            <Headphones className="h-36 w-36 md:h-48 md:w-48 text-blue-600" strokeWidth={1.5} />
                            <span className="text-lg font-semibold text-blue-600 mt-3">Listen</span>
                          </button>
                        </Link>
                        
                        {/* Updated URL path for Read */}
                        <Link href={`/dashboard/multilingual-stories/story-${story.id}/reading`} className="w-full">
                          <button 
                            className="w-full h-48 md:h-64 rounded-xl bg-emerald-200 hover:bg-emerald-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-300"
                            aria-label="Read story"
                          >
                            <BookOpen className="h-36 w-36 md:h-48 md:w-48 text-emerald-600" strokeWidth={1.5} />
                            <span className="text-lg font-semibold text-emerald-600 mt-3">Read</span>
                          </button>
                        </Link>
                        
                        {/* Updated URL path for Activities */}
                        <Link href={`/dashboard/multilingual-stories/story-${story.id}/activities`} className="w-full">
                          <button 
                            className="w-full h-48 md:h-64 rounded-xl bg-amber-200 hover:bg-amber-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-amber-300"
                            aria-label="View activities"
                          >
                            <Activity className="h-36 w-36 md:h-48 md:w-48 text-amber-600" strokeWidth={1.5} />
                            <span className="text-lg font-semibold text-amber-600 mt-3">Follow-up Activities</span>
                          </button>
                        </Link>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
            
            {/* Display original learning material details */}
            {selectedType === 'array' && selectedStory !== null && (
              <div className="flex flex-col h-full items-center justify-center">
                <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white dark:bg-gray-800/40 rounded-xl mb-8 max-w-2xl w-full overflow-hidden">
                  <div className="w-full sm:w-1/3 flex-shrink-0">
                    <div className="relative aspect-square w-full max-w-[120px] mx-auto">
                      <Image
                        src={learningmaterial[parseInt(selectedStory)].image}
                        alt={learningmaterial[parseInt(selectedStory)].title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-2/3 p-4 sm:border-l border-gray-200 dark:border-gray-700 flex flex-col justify-center h-full">
                    <h2 className="text-xl sm:text-2xl font-semibold">{learningmaterial[parseInt(selectedStory)].title}</h2>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <p>{learningmaterial[parseInt(selectedStory)].description}</p>
                      <p className="mt-1">Available in: {learningmaterial[parseInt(selectedStory)].languages.join(', ')}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                  <Link href={`/dashboard/multilingual-stories/${learningmaterial[parseInt(selectedStory)].slug}/listen`} className="w-full">
                    <button 
                      className="w-full h-48 md:h-64 rounded-xl bg-blue-200 hover:bg-blue-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
                      aria-label="Listen to story"
                    >
                      <Headphones className="h-36 w-36 md:h-48 md:w-48 text-blue-600" strokeWidth={1.5} />
                      <span className="text-lg font-semibold text-blue-600 mt-3">Listen</span>
                    </button>
                  </Link>
                  
                  <Link href={`/dashboard/multilingual-stories/${learningmaterial[parseInt(selectedStory)].slug}/read`} className="w-full">
                    <button 
                      className="w-full h-48 md:h-64 rounded-xl bg-emerald-200 hover:bg-emerald-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-300"
                      aria-label="Read story"
                    >
                      <BookOpen className="h-36 w-36 md:h-48 md:w-48 text-emerald-600" strokeWidth={1.5} />
                      <span className="text-lg font-semibold text-emerald-600 mt-3">Read</span>
                    </button>
                  </Link>
                  
                  <Link href={`/dashboard/multilingual-stories/${learningmaterial[parseInt(selectedStory)].slug}/activities`} className="w-full">
                    <button 
                      className="w-full h-48 md:h-64 rounded-xl bg-amber-200 hover:bg-amber-300 flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-amber-300"
                      aria-label="View activities"
                    >
                      <Activity className="h-36 w-36 md:h-48 md:w-48 text-amber-600" strokeWidth={1.5} />
                      <span className="text-lg font-semibold text-amber-600 mt-3">Follow-up Activities</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}