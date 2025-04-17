import { DashboardLayout } from "@/components/DashboardLayout"
import Image from 'next/image'
import Link from 'next/link'
import { Headphones, BookOpen, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningmaterial.map((story, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <div className="relative">
                <Image 
                  src={story.image} 
                  alt={story.title} 
                  width={400} 
                  height={200} 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-xl font-semibold text-white">{story.title}</h2>
                </div>
              </div>
              
              <CardContent className="p-4 flex-1">
                <p className="text-gray-600 mb-3">{story.description}</p>
                <div className="mt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <p>Available in: </p>
                    <div className="flex gap-1 ml-2">
                      {story.languages.map((lang, i) => (
                        <span key={i} className="bg-muted px-1.5 py-0.5 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-muted/20 p-0">
                <Tabs defaultValue="listen" className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="listen">
                      <div className="flex items-center gap-1.5">
                        <Headphones className="h-4 w-4" />
                        <span>Listen</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="read">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        <span>Read</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="activities">
                      <div className="flex items-center gap-1.5">
                        <Activity className="h-4 w-4" />
                        <span>Activities</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="listen" className="p-3 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Listen to the story with audio narration</p>
                    <Link href={`/dashboard/multilingual-stories/${story.slug}/listen`}>
                      <Button size="sm" className="w-full">
                        Listen to Story
                      </Button>
                    </Link>
                  </TabsContent>
                  <TabsContent value="read" className="p-3 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Read the illustrated storybook</p>
                    <Link href={`/dashboard/multilingual-stories/${story.slug}/read`}>
                      <Button size="sm" variant="outline" className="w-full">
                        Open Storybook
                      </Button>
                    </Link>
                  </TabsContent>
                  <TabsContent value="activities" className="p-3 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Explore related learning activities</p>
                    <Link href={`/dashboard/multilingual-stories/${story.slug}/activities`}>
                      <Button size="sm" variant="secondary" className="w-full">
                        View Activities
                      </Button>
                    </Link>
                  </TabsContent>
                </Tabs>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}