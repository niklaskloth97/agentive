"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, BookOpen, Music, Gamepad2, PenLine, Globe } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type ActivityType = "song" | "game" | "art" | "reading" | "worksheet" | "video"

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description?: string
  filePath?: string
  externalLink?: string
  languages?: string[]
}

export interface Story {
  id: string
  title: string
  description?: string
  image?: string
  activities: Activity[]
}

export interface ActivitiesGridProps {
  title: string
  description?: string
  activityLabel: string // e.g. "Language Awareness"
  stories: Story[]
  className?: string
  onDownload?: (filePath: string) => void // Custom download handler (optional)
}

// Helper function to get icon based on activity type
const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "song": return <Music className="h-4 w-4" />;
    case "game": return <Gamepad2 className="h-4 w-4" />;
    case "art": return <PenLine className="h-4 w-4" />;
    case "reading": return <BookOpen className="h-4 w-4" />;
    case "worksheet": return <PenLine className="h-4 w-4" />;
    case "video": return <BookOpen className="h-4 w-4" />;
    default: return <ExternalLink className="h-4 w-4" />;
  }
};

// Helper function to get color based on activity type
const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case "song": return "bg-purple-100 text-purple-700";
    case "game": return "bg-green-100 text-green-700";
    case "art": return "bg-amber-100 text-amber-700";
    case "reading": return "bg-blue-100 text-blue-700";
    case "worksheet": return "bg-indigo-100 text-indigo-700";
    case "video": return "bg-rose-100 text-rose-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function ActivitiesGrid({
  title,
  description,
  activityLabel,
  stories,
  className,
  onDownload
}: ActivitiesGridProps) {
  const [selectedActivities, setSelectedActivities] = useState<Record<string, boolean>>({});
  
  // Get all unique languages from activities
  const allLanguages = Array.from(
    new Set(
      stories.flatMap(story => 
        story.activities.flatMap(activity => activity.languages || [])
      )
    )
  ).sort();
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>(allLanguages[0] || "English");

  const handleCheckboxChange = (activityId: string, checked: boolean) => {
    setSelectedActivities(prev => ({
      ...prev,
      [activityId]: checked
    }));
  };

  const handleDownload = (activity: Activity) => {
    if (!activity.filePath) return;
    
    if (onDownload) {
      onDownload(activity.filePath);
      return;
    }
    
    // Default download behavior
    const link = document.createElement('a');   
    link.href = activity.filePath;
    link.download = activity.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSelected = () => {
    // Find all selected activities
    Object.entries(selectedActivities).forEach(([id, isSelected]) => {
      if (isSelected) {
        // Find the activity with this ID
        stories.forEach(story => {
          const activity = story.activities.find(a => a.id === id);
          if (activity?.filePath) {
            handleDownload(activity);
          }
        });
      }
    });
  };

  const selectedCount = Object.values(selectedActivities).filter(Boolean).length;

  // Filter activities based on selected language
  const filteredStories = stories.map(story => ({
    ...story,
    activities: story.activities.filter(
      activity => !selectedLanguage || !activity.languages || activity.languages.includes(selectedLanguage)
    )
  })).filter(story => story.activities.length > 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <p className="text-muted-foreground mt-1">{activityLabel} Activities</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {allLanguages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={downloadSelected}
              disabled={selectedCount === 0}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span> ({selectedCount})
            </Button>
          </div>
        </div>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStories.map(story => (
            <Card key={story.id} className="overflow-hidden h-full">
              {/* Story header */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
                    {story.image ? (
                      <Image 
                        src={story.image} 
                        alt={story.title} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{story.title}</h3>
                    {story.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{story.description}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Activities section */}
              <div className="p-4">
                <div className="space-y-3">
                  {story.activities.map(activity => (
                    <div 
                      key={activity.id} 
                      className="border rounded-md p-2 flex items-center gap-2 hover:bg-muted/10 transition-colors"
                    >
                      <Checkbox
                        id={activity.id}
                        checked={selectedActivities[activity.id] || false}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(activity.id, checked === true)
                        }
                      />
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1 rounded", getActivityColor(activity.type))}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <label 
                            htmlFor={activity.id} 
                            className="font-medium text-sm cursor-pointer truncate"
                          >
                            {activity.title}
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 flex-shrink-0">
                        {activity.filePath && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-7 w-7"
                            onClick={() => handleDownload(activity)}
                            title="Download"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        
                        {activity.externalLink && (
                          <Link href={activity.externalLink}>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-7 w-7"
                              title="Open"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {story.activities.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No activities available for {selectedLanguage}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {filteredStories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Globe className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-medium">No activities available</h3>
              <p className="text-muted-foreground mt-1">
                No {activityLabel} activities are available in {selectedLanguage}
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSelectedLanguage(allLanguages[0])}
              >
                Reset language filter
              </Button>
            </div>
          )}
        </div>
        
        {/* Summary of selected items */}
        {selectedCount > 0 && (
          <div className="mt-6 border-t pt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="selected">
                <AccordionTrigger className="text-sm font-medium">
                  Selected Activities ({selectedCount})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                    {stories.map(story => 
                      story.activities.map(activity => 
                        selectedActivities[activity.id] ? (
                          <div key={activity.id} className="flex items-center justify-between border rounded-md p-2 bg-muted/10">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <div className={cn("p-1 rounded", getActivityColor(activity.type))}>
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium truncate">{activity.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{story.title}</p>
                              </div>
                            </div>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-7 w-7 flex-shrink-0" 
                              onClick={() => handleDownload(activity)}
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : null
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
}