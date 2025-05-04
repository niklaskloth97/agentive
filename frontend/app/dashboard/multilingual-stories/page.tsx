import { DashboardLayout } from "@/components/DashboardLayout"
import Image from 'next/image'
import Link from 'next/link'
import { Headphones, BookOpen, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard/storytime" },
    { label: "Overview" }
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
      description: 'A funny story about a monster`s first trip to the hairdresser, introducing vocabulary about emotions and everyday activities.',
      languages: ['English', 'German', 'Spanish', 'Italian']
    },
  ]

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold mb-6">Multilingual Stories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {learningmaterial.map((story, index) => (
            <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image 
                  src={story.image} 
                  alt={story.title}
                  fill
                  className="object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <h2 className="text-sm sm:text-base font-semibold text-white line-clamp-2">{story.title}</h2>
                </div>
              </div>
              
<CardContent className="p-4 flex-1">
                <p className="text-gray-600">{story.description}</p>
              </CardContent>

              <CardFooter className="border-t bg-muted/20 p-4">
                <div className="grid grid-cols-3 gap-2 w-full">
                  <Link href={`/dashboard/multilingual-stories/${story.slug}/listen`} className="w-full">
                    <Button 
                      size="sm" 
                      className="w-full flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600"
                    >
                      <Headphones className="h-4 w-4" />
                      <span>Listen</span>
                    </Button>
                  </Link>
                  
                  <Link href={`/dashboard/multilingual-stories/${story.slug}/read`} className="w-full">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-1 bg-emerald-100 hover:bg-emerald-200 border-emerald-200 text-emerald-700"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span className="text-xs">Read</span>
                    </Button>
                  </Link>
                  
                  <Link href={`/dashboard/multilingual-stories/${story.slug}/activities`} className="w-full">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-1 bg-amber-100 hover:bg-amber-200 border-amber-200 text-amber-700"
                    >
                      <Activity className="h-3 w-3" />
                      <span className="text-xs">Activities</span>
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}