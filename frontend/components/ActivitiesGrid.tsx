"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, BookOpen, Music, Gamepad2, PenLine } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

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
    case "song":
      return <Music className="h-4 w-4" />;
    case "game":
      return <Gamepad2 className="h-4 w-4" />;
    case "art":
      return <PenLine className="h-4 w-4" />;
    case "reading":
      return <BookOpen className="h-4 w-4" />;
    case "worksheet":
      return <PenLine className="h-4 w-4" />;
    case "video":
      return <BookOpen className="h-4 w-4" />;
    default:
      return <ExternalLink className="h-4 w-4" />;
  }
};

// Helper function to get color based on activity type
const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case "song":
      return "bg-purple-100 text-purple-700";
    case "game":
      return "bg-green-100 text-green-700";
    case "art":
      return "bg-amber-100 text-amber-700";
    case "reading":
      return "bg-blue-100 text-blue-700";
    case "worksheet":
      return "bg-indigo-100 text-indigo-700";
    case "video":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-gray-100 text-gray-700";
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

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <p className="text-muted-foreground mt-1">{activityLabel} Activities</p>
          </div>
          
          <Button 
            onClick={downloadSelected}
            disabled={selectedCount === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Selected ({selectedCount})
          </Button>
        </div>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {stories.map(story => (
            <Card key={story.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Story image and details */}
                <div className="w-full md:w-1/4 p-4 bg-muted/20">
                  <div className="aspect-square relative rounded-md overflow-hidden mb-3">
                    {story.image ? (
                      <Image 
                        src={story.image} 
                        alt={story.title} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  {story.description && (
                    <p className="text-sm text-muted-foreground mt-1">{story.description}</p>
                  )}
                </div>
                
                {/* Activities list */}
                <div className="w-full md:w-3/4 p-4">
                  <h4 className="font-medium text-sm mb-3">Available Activities:</h4>
                  <div className="space-y-3">
                    {story.activities.map(activity => (
                      <div 
                        key={activity.id} 
                        className="border rounded-md p-3 flex items-start gap-3 hover:bg-muted/20 transition-colors"
                      >
                        <Checkbox
                          id={activity.id}
                          checked={selectedActivities[activity.id] || false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(activity.id, checked === true)
                          }
                        />
                        
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={cn("p-1.5 rounded-md", getActivityColor(activity.type))}>
                              {getActivityIcon(activity.type)}
                            </div>
                            <label 
                              htmlFor={activity.id} 
                              className="font-medium cursor-pointer"
                            >
                              {activity.title}
                            </label>
                          </div>
                          
                          {activity.description && (
                            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          )}
                          
                          <div className="flex items-center gap-3 mt-2">
                            {activity.languages && activity.languages.length > 0 && (
                              <div className="flex gap-1 flex-wrap">
                                {activity.languages.map(lang => (
                                  <Badge key={lang} variant="outline" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex gap-2 ml-auto">
                              {activity.filePath && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 gap-1"
                                  onClick={() => handleDownload(activity)}
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  Download
                                </Button>
                              )}
                              
                              {activity.externalLink && (
                                <Link href={activity.externalLink}>
                                  <Button 
                                    size="sm" 
                                    variant="default" 
                                    className="h-8 gap-1"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Open
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Summary of selected items */}
        {selectedCount > 0 && (
          <div className="mt-6 border-t pt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="selected">
                <AccordionTrigger className="text-base font-medium">
                  Selected Activities ({selectedCount})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {stories.map(story => 
                      story.activities.map(activity => 
                        selectedActivities[activity.id] ? (
                          <div key={activity.id} className="flex items-center justify-between border rounded-md p-2 bg-muted/10">
                            <div className="flex items-center gap-2">
                              <div className={cn("p-1 rounded-md", getActivityColor(activity.type))}>
                                {getActivityIcon(activity.type)}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">{story.title}</p>
                              </div>
                            </div>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-7 w-7" 
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