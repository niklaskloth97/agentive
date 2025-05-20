"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Activity, ArrowRight, GraduationCap } from "lucide-react"

export default function Page() {
  const breadcrumbItems = [
    { label: "Learning Resources", href: "/dashboard" },
    { label: "Overview" }
  ];

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Multilingual Learning Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First column - Storytime */}
          <Card className="transition hover:shadow-lg">
            <CardHeader className="bg-primary/10 rounded-t-lg pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Book className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Storytime</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border rounded-md overflow-hidden shadow-sm">
                  <Image 
                    src="/images/stories/monster-story/monster.png" 
                    alt="Monster Story" 
                    width={300} 
                    height={200} 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Monster Story</h3>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden shadow-sm">
                  <Image 
                    src="/images/stories/pirate-story/1.webp" 
                    alt="Pirate Adventure" 
                    width={300} 
                    height={200} 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">Pirate Adventure</h3>
                  </div>
                </div>
              </div>
               <div className="p-3 bg-muted/50 rounded-md text-sm">
                <ul className="space-y-1 list-disc pl-5 text-sm mb-4">
                <li>Audio narration</li>
                <li>Illustrations</li>
                <li>Multiple languages</li>
              </ul>
              </div>
              
            </CardContent>

            <CardFooter className="flex justify-end">
              <Link href="/dashboard/multilingual-stories">
                <Button variant="outline" className="gap-2">
                  View stories <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Second column - Activities */}
          <Card className="transition hover:shadow-lg">
            <CardHeader className="bg-accent/10 rounded-t-lg pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-full">
                  <Activity className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Activities</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 p-2 border bg-background rounded hover:bg-muted/80 transition cursor-pointer">
                  <div className="bg-green-100 p-2 rounded flex justify-center" style={{ width: '40px', minWidth: '40px' }}>
                    <span className="text-green-700 font-semibold text-sm">PC</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Plurilingual Competence</h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-background border rounded hover:bg-muted/80 transition cursor-pointer">
                  <div className="bg-blue-100 p-2 rounded flex justify-center" style={{ width: '40px', minWidth: '40px' }}>
                    <span className="text-blue-700 font-semibold text-sm">LA</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Language Awareness</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-background border rounded hover:bg-muted/80 transition cursor-pointer">
                  <div className="bg-amber-100 p-2 rounded flex justify-center" style={{ width: '40px', minWidth: '40px' }}>
                    <span className="text-amber-700 font-semibold text-sm">ELS</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Early Literacy Skills</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-background border rounded hover:bg-muted/80 transition cursor-pointer">
                  <div className="bg-rose-100 p-2 rounded flex justify-center" style={{ width: '40px', minWidth: '40px' }}>
                    <span className="text-rose-700 font-semibold text-sm">ICAU</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">InterCultural Awareness and Understanding​</h4>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md text-sm">
                Fun games and exercises to practice language skills
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Link href="/dashboard/activities">
                <Button variant="outline" className="gap-2">
                  View activities <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Third column - Pedagogical Guide (NEW) */}
          <Card className="transition hover:shadow-lg">
            <CardHeader className="bg-blue-50 rounded-t-lg pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Peadagogical Guide</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3 mb-4">
                <div className="border rounded-lg p-3 hover:bg-slate-50 transition">
                  <h3 className="font-semibold text-sm mb-1">Teaching Tips & Tricks</h3>
                  <p className="text-xs text-muted-foreground">Lesson plans and guides</p>
                </div>
                
                <div className="border rounded-lg p-3 hover:bg-slate-50 transition">
                  <h3 className="font-semibold text-sm mb-1">Children Inclusion</h3>
                  <p className="text-xs text-muted-foreground">Adresss multilingualism and -cultural awareness </p>
                </div>
                
                <div className="border rounded-lg p-3 hover:bg-slate-50 transition">
                  <h3 className="font-semibold text-sm mb-1">Implementation Tips</h3>
                  <p className="text-xs text-muted-foreground">Best practices for classroom use</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                <div className="rounded-full bg-yellow-200 p-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-700">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                <p className="text-sm text-yellow-800">Free downloadable resources</p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Link href="dashboard/activities/story-1/activity-1-1">
                <Button variant="outline" className="gap-2">
                  View guide<ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}