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
    { label: "Plurilingual Competence", href: "/dashboard/follow-up-activities/plurilingual-competence" }
  ]

  // Sample data for the activities grid
  const plurilingualCompetenceData = {
    title: "Plurilingual Competence Activities",
    description: "These activities help children develop the ability to use multiple languages for communication.",
    activityLabel: "Plurilingual Competence",
    stories: [
      {
        id: "monster-story",
        title: "Monster at the Hairdresser",
        description: "Follow-up activities for the Monster Story",
        image: "/images/stories/monster-story/monster.png",
        activities: [
          {
            id: "monster-pc-cards",
            type: "game" as const,
            title: "Multilingual Vocabulary Cards",
            description: "Flashcards with key vocabulary from the story in multiple languages",
            filePath: "/files/monster-story/vocab-cards.pdf",
            externalLink: "/dashboard/activities/monster-story/vocab-cards",
            languages: ["English", "German", "French", "Italian", "Spanish"]
          },
          {
            id: "monster-pc-dialogue",
            type: "reading" as const,
            title: "Bilingual Dialogues",
            description: "Practice conversations from the story in different language combinations",
            filePath: "/files/monster-story/dialogues.pdf",
            externalLink: "/dashboard/activities/monster-story/dialogues",
            languages: ["English", "German", "Spanish"]
          },
          {
            id: "monster-pc-song",
            type: "song" as const,
            title: "Mixed Language Song",
            description: "A song that incorporates words from multiple languages",
            filePath: "/files/monster-story/mixed-song.mp3",
            externalLink: "/dashboard/activities/monster-story/mixed-song",
            languages: ["English", "German", "French", "Italian"]
          }
        ]
      },
      // Add more stories with their PC activities...
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
          title={plurilingualCompetenceData.title}
          description={plurilingualCompetenceData.description}
          activityLabel={plurilingualCompetenceData.activityLabel}
          stories={plurilingualCompetenceData.stories}
        />
      </div>
    </DashboardLayout>
  )
}