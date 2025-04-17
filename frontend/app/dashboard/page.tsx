"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Activity, ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Overview" }
  ];

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Multilingual Learning Resources</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Storytime */}
          <div className="w-full md:w-1/2">
            <Card className="h-full transition hover:shadow-lg">
              <CardHeader className="bg-primary/10 rounded-t-lg pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Book className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Storytime</CardTitle>
                </div>
                <CardDescription className="pt-2">
                  Explore multilingual stories for young learners
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Our collection of multilingual stories helps children develop language skills 
                  through engaging narratives available in multiple languages. Each story includes:
                </p>
                
                <ul className="space-y-2 mb-6 list-disc pl-5">
                  <li>Audio narration by native speakers</li>
                  <li>Beautiful illustrations</li>
                  <li>Interactive PDFs for reading along</li>
                  <li>Language switching to compare translations</li>
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <Link href="/dashboard/multilingual-stories/a-monster-story" className="block">
                    <div className="border rounded-md overflow-hidden transition hover:shadow-md">
                      <Image 
                        src="/images/stories/monster-story/1.webp" 
                        alt="Monster Story" 
                        width={300} 
                        height={200} 
                        className="w-full h-40 object-cover" 
                      />
                      <div className="p-3">
                        <h3 className="font-semibold">Monster Story</h3>
                        <p className="text-xs text-muted-foreground">Available in 7 languages</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/multilingual-stories/a-pirate-story" className="block">
                    <div className="border rounded-md overflow-hidden transition hover:shadow-md">
                      <Image 
                        src="/images/stories/pirate-story/1.webp" 
                        alt="Pirate Adventure" 
                        width={300} 
                        height={200} 
                        className="w-full h-40 object-cover" 
                      />
                      <div className="p-3">
                        <h3 className="font-semibold">Pirate Adventure</h3>
                        <p className="text-xs text-muted-foreground">Available in 5 languages</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Link href="/dashboard/multilingual-stories">
                  <Button variant="outline" className="gap-2">
                    View all stories <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Middle separator */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <Separator orientation="vertical" className="h-full" />
          </div>
          <div className="flex md:hidden items-center justify-center py-4">
            <Separator orientation="horizontal" className="w-full" />
          </div>

          {/* Right side - Follow-up Activities */}
          <div className="w-full md:w-1/2">
            <Card className="h-full transition hover:shadow-lg">
              <CardHeader className="bg-accent/10 rounded-t-lg pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-full">
                    <Activity className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Follow-up Activities</CardTitle>
                </div>
                <CardDescription className="pt-2">
                  Reinforce language learning through interactive exercises
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  These activities are designed to reinforce vocabulary and language concepts 
                  introduced in our stories. Each set of activities focuses on:
                </p>
                
                <ul className="space-y-2 mb-6 list-disc pl-5">
                  <li>Vocabulary reinforcement</li>
                  <li>Language awareness exercises</li>
                  <li>Intercultural understanding</li>
                  <li>Early literacy development</li>
                </ul>

                <div className="bg-muted p-4 rounded-lg mt-6">
                  <h3 className="font-semibold mb-2">Featured Activities:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-background rounded hover:bg-muted/80 transition cursor-pointer">
                      <div className="bg-green-100 p-2 rounded">
                        <span className="text-green-700 font-semibold text-sm">Voc</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Vocabulary Boost</h4>
                        <p className="text-xs text-muted-foreground">Interactive matching and memory games</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-background rounded hover:bg-muted/80 transition cursor-pointer">
                      <div className="bg-blue-100 p-2 rounded">
                        <span className="text-blue-700 font-semibold text-sm">LA</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Language Awareness</h4>
                        <p className="text-xs text-muted-foreground">Explore sounds and patterns across languages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Link href="/learning-material">
                  <Button variant="outline" className="gap-2">
                    Explore activities <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}