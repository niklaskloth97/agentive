"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import ActivitiesGrid from "@/components/ActivitiesGrid"

export default function Page() {
  const router = useRouter()
  
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Follow-up Activities", href: "/dashboard/follow-up-activities" },
    { label: "Language Awareness", href: "/dashboard/follow-up-activities/language-awareness" }
  ]

  // Sample data for the activities grid
  const languageAwarenessData = {
    title: "Language Awareness Activities",
    description: "These activities help children develop language awareness skills across multiple languages.",
    activityLabel: "Language Awareness",
    stories: [
      {
        id: "monster-story",
        title: "Monster at the Hairdresser",
        description: "Follow-up activities for the Monster Story",
        image: "/images/stories/monster-story/monster.png",
        activities: [
          {
            id: "monster-song",
            type: "song" as const,
            title: "Monster Rhyming Song",
            description: "A catchy song to help identify similar sounds across languages",
            filePath: "/files/monster-story/monster-song.mp3",
            externalLink: "/dashboard/activities/monster-story/monster-song",
            languages: ["English", "German", "French"]
          },
          {
            id: "monster-game",
            type: "game" as const,
            title: "Sound Matching Game",
            description: "Interactive game to match similar sounds in different languages",
            filePath: "/files/monster-story/sound-game.pdf",
            externalLink: "/dashboard/activities/monster-story/sound-game",
            languages: ["English", "German", "Spanish", "Italian"]
          },
          {
            id: "monster-worksheet",
            type: "worksheet" as const,
            title: "Word Patterns Worksheet",
            description: "Printable worksheet for recognizing patterns across languages",
            filePath: "/files/monster-story/word-patterns.pdf",
            externalLink: "/dashboard/activities/monster-story/word-patterns",
            languages: ["English", "German", "French", "Italian", "Spanish"]
          }
        ]
      },
      {
        id: "pirate-story",
        title: "Pirate Adventure",
        description: "Follow-up activities for the Pirate Story",
        image: "/images/stories/pirate-story/4.webp",
        activities: [
          {
            id: "pirate-song",
            type: "song" as const,
            title: "Pirate Language Song",
            description: "Learn how to say pirate terms in different languages",
            filePath: "/files/pirate-story/pirate-song.mp3",
            externalLink: "/dashboard/activities/pirate-story/pirate-song",
            languages: ["English", "German", "French"]
          },
          {
            id: "pirate-art",
            type: "art" as const,
            title: "Create a Language Map",
            description: "Art activity to create a map of different language islands",
            filePath: "/files/pirate-story/language-map.pdf",
            externalLink: "/dashboard/activities/pirate-story/language-map",
            languages: ["English", "German", "French", "Italian"]
          },
          {
            id: "pirate-game",
            type: "game" as const,
            title: "Language Treasure Hunt",
            description: "Find hidden treasure by solving language clues",
            filePath: "/files/pirate-story/treasure-hunt.pdf",
            externalLink: "/dashboard/activities/pirate-story/treasure-hunt",
            languages: ["English", "German", "Spanish"]
          }
        ]
      },
      {
        id: "dino-story",
        title: "Daniel Dino Goes on Vacation",
        description: "Follow-up activities for the Dino Story",
        image: "/images/stories/dino-story/dino-adventure1.webp",
        activities: [
          {
            id: "dino-game",
            type: "game" as const,
            title: "Language Bingo",
            description: "Bingo game with travel vocabulary in different languages",
            filePath: "/files/dino-story/language-bingo.pdf",
            externalLink: "/dashboard/activities/dino-story/language-bingo",
            languages: ["English", "German", "French"]
          },
          {
            id: "dino-video",
            type: "video" as const,
            title: "Travel Words Pronunciation",
            description: "Video showing how to pronounce travel words in different languages",
            filePath: "/files/dino-story/pronunciation.mp4",
            externalLink: "/dashboard/activities/dino-story/pronunciation",
            languages: ["English", "German", "French", "Spanish"]
          },
          {
            id: "dino-worksheet",
            type: "worksheet" as const,
            title: "Language Comparison Sheet",
            description: "Compare how travel words look and sound in different languages",
            filePath: "/files/dino-story/comparison-sheet.pdf",
            externalLink: "/dashboard/activities/dino-story/comparison-sheet",
            languages: ["English", "German", "French", "Italian"]
          }
        ]
      }
    ]
  };

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Activities
          </Button>
        </div>

        <ActivitiesGrid
          title={languageAwarenessData.title}
          description={languageAwarenessData.description}
          activityLabel={languageAwarenessData.activityLabel}
          stories={languageAwarenessData.stories}
        />
      </div>
    </DashboardLayout>
  )
}