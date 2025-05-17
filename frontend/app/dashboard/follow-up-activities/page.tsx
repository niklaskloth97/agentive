"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Globe, Music, Gamepad2, PenLine, FileText, Video } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define types for our data
type ActivityType = "song" | "game" | "worksheet" | "art" | "video"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  filePath: string
  externalLink: string
  languages: string[]
}

export default function Page() {
  const [selectedActivities, setSelectedActivities] = useState<Record<string, boolean>>({});
  
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Follow-up Activities", href: "/dashboard/follow-up-activities" }
  ];

  // Sample data for the activities grid
  const languageAwarenessData = {
    title: "Follow-up Activities",
    description: "These activities help children develop language awareness skills across multiple languages.",
    activityLabel: "Language Awareness",
    stories: [
      {
        id: "monster-story",
        title: "Monster at the Hairdresser",
        description: "Sound patterns and language comparisons",
        image: "/images/stories/monster-story/monster.png",
        activities: [
          {
            id: "monster-song",
            type: "song" as ActivityType,
            title: "Monster Rhyming Song",
            filePath: "/files/monster-story/monster-song.mp3",
            externalLink: "/dashboard/activities/monster-story/monster-song",
          },
          {
            id: "monster-game",
            type: "game" as ActivityType,
            title: "Sound Matching Game",
            filePath: "/files/monster-story/sound-game.pdf",
            externalLink: "/dashboard/activities/monster-story/sound-game",
          },
          {
            id: "monster-worksheet",
            type: "worksheet" as ActivityType,
            title: "Word Patterns Worksheet",
            filePath: "/files/monster-story/word-patterns.pdf",
            externalLink: "/dashboard/activities/monster-story/word-patterns",
          }
        ]
      },
      {
        id: "pirate-story",
        title: "Pirate Adventure",
        description: "Maritime vocabulary across languages",
        image: "/images/stories/pirate-story/1.webp",
        activities: [
          {
            id: "pirate-song",
            type: "song" as ActivityType,
            title: "Pirate Language Song",
            filePath: "/files/pirate-story/pirate-song.mp3",
            externalLink: "/dashboard/activities/pirate-story/pirate-song",
          },
          {
            id: "pirate-art",
            type: "art" as ActivityType,
            title: "Create a Language Map",
            filePath: "/files/pirate-story/language-map.pdf",
            externalLink: "/dashboard/activities/pirate-story/language-map",
          },
          {
            id: "pirate-game",
            type: "game" as ActivityType,
            title: "Language Treasure Hunt",
            filePath: "/files/pirate-story/treasure-hunt.pdf",
            externalLink: "/dashboard/activities/pirate-story/treasure-hunt",
          }
        ]
      },
      {
        id: "dino-story",
        title: "Daniel Dino Goes on Vacation",
        description: "Travel vocabulary and expressions",
        image: "/images/stories/dino-story/dino.webp",
        activities: [
          {
            id: "dino-game",
            type: "game" as ActivityType,
            title: "Language Bingo",

            filePath: "/files/dino-story/language-bingo.pdf",
            externalLink: "/dashboard/activities/dino-story/language-bingo",
          },
          {
            id: "dino-video",
            type: "video" as ActivityType,
            title: "Travel Words Pronunciation",

            filePath: "/files/dino-story/pronunciation.mp4",
            externalLink: "/dashboard/activities/dino-story/pronunciation",
          },
          {
            id: "dino-worksheet",
            type: "worksheet" as ActivityType,
            title: "Language Comparison Sheet",

            filePath: "/files/dino-story/comparison-sheet.pdf",
            externalLink: "/dashboard/activities/dino-story/comparison-sheet",
          }
        ]
      }
    ]
  };

  // Get all unique languages from activities
  const allLanguages = Array.from(
    new Set(
      languageAwarenessData.stories.flatMap(story => 
        story.activities.flatMap(activity => activity.languages || [])
      )
    )
  ).sort();
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>(allLanguages[0] || "English");

  // Filter activities based on selected language
  const filteredStories = languageAwarenessData.stories.map(story => ({
    ...story,
    activities: story.activities.filter(
      activity => !selectedLanguage || !activity.languages || activity.languages.includes(selectedLanguage)
    )
  })).filter(story => story.activities.length > 0);

  // Helper function to get activity icon
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "song": return <Music className="h-4 w-4" />;
      case "game": return <Gamepad2 className="h-4 w-4" />;
      case "art": return <PenLine className="h-4 w-4" />;
      case "worksheet": return <FileText className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Helper function to get color based on activity type
  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case "song": return "bg-purple-100 text-purple-700";
      case "game": return "bg-green-100 text-green-700";
      case "art": return "bg-amber-100 text-amber-700";
      case "worksheet": return "bg-indigo-100 text-indigo-700";
      case "video": return "bg-rose-100 text-rose-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleCheckboxChange = (activityId: string, checked: boolean) => {
    setSelectedActivities(prev => ({
      ...prev,
      [activityId]: checked
    }));
  };

  const handleDownload = (activity: Activity) => {
    if (!activity.filePath) return;
    
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
        languageAwarenessData.stories.forEach(story => {
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
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container py-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle className="text-2xl">{languageAwarenessData.title}</CardTitle>
              
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

          
          </CardHeader>
          
          <CardContent>
            {/* Story Rows */}
            <div className="space-y-4">
              {filteredStories.map(story => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="grid grid-cols-12 md:gap-4">
                    {/* Story Info - Column 1 */}
                    <div className="col-span-12 md:col-span-3 border-r">
                      <div className="p-2 flex gap-3 items-start">
                        <div className="w-16 h-16 flex-shrink-0 relative rounded-md overflow-hidden">
                          <Image 
                            src={story.image} 
                            alt={story.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg">{story.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{story.description}</p>
                        </div>
                      </div>
                    </div>
                    
                                       {/* Activities - Columns 2-4 */}
                    {story.activities.map((activity, index) => (
                      <div 
                        key={activity.id} 
                        className={cn(
                          "col-span-12 md:col-span-3 py-6 px-4",
                          index < story.activities.length - 1 && "border-b md:border-b-0 md:border-r"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={activity.id}
                            checked={selectedActivities[activity.id] || false}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(activity.id, checked === true)
                            }
                            className="mt-1"
                          />
                          
                          <div className="flex-grow">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className={cn("p-1 rounded", getActivityColor(activity.type))}>
                                  {getActivityIcon(activity.type)}
                                </div>
                                <label 
                                  htmlFor={activity.id} 
                                  className="font-medium cursor-pointer text-sm line-clamp-1"
                                >
                                  {activity.title}
                                </label>
                              </div>
                              
                              {/* Action buttons - now on the same line */}
                              <div className="flex gap-1 shrink-0">
                                {activity.filePath && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-7 w-7 p-0"
                                    onClick={() => handleDownload(activity)}
                                    title="Download"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </Button>
                                )}
                                
                                {activity.externalLink && (
                                  <Link href={activity.externalLink}>
                                    <Button 
                                      size="sm"
                                      variant="ghost" 
                                      className="h-7 w-7 p-0"
                                      title="View"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add empty placeholders if there are fewer than 3 activities */}
                    {Array.from({ length: Math.max(0, 3 - story.activities.length) }).map((_, i) => (
                      <div 
                        key={`empty-${story.id}-${i}`}
                        className="col-span-12 md:col-span-3 p-4 hidden md:block"
                      >
                        <div className="text-center text-muted-foreground text-sm p-6">
                          No activity available
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              {filteredStories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Globe className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <h3 className="text-lg font-medium">No activities available</h3>
                  <p className="text-muted-foreground mt-1">
                    No {languageAwarenessData.activityLabel} activities are available in {selectedLanguage}
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}