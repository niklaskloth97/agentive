"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  Globe,
  Music,
  Gamepad2,
  PenLine,
  FileText,
  Video,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ActivityType = "song" | "game" | "worksheet" | "art" | "video";


export default function Page() {
  const [selectedActivities, setSelectedActivities] = useState<
    Record<string, boolean>
  >({});
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Activities", href: "/dashboard/activities" },
  ];

  const languageAwarenessData = {
    title: "Follow-up Activities",
    description:
      "These activities help children develop language awareness skills across multiple languages.",
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
            language: ["English", "German" ]
          },
          {
            id: "monster-game",
            type: "game" as ActivityType,
            title: "Sound Matching Game",
            filePath: "/files/monster-story/sound-game.pdf",
            externalLink: "/dashboard/activities/monster-story/sound-game",
            language: ["English", "German" ]
          },
          {
            id: "monster-worksheet",
            type: "worksheet" as ActivityType,
            title: "Word Patterns Worksheet",
            filePath: "/files/monster-story/word-patterns.pdf",
            externalLink: "/dashboard/activities/monster-story/word-patterns",
            language: ["English", "German" ]
          },
        ],
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
            language: ["English", "German" ]
          },
          {
            id: "pirate-art",
            type: "art" as ActivityType,
            title: "Create a Language Map",
            filePath: "/files/pirate-story/language-map.pdf",
            externalLink: "/dashboard/activities/pirate-story/language-map",
            language: ["English", "German" ]
          },
          {
            id: "pirate-game",
            type: "game" as ActivityType,
            title: "Language Treasure Hunt",
            filePath: "/files/pirate-story/treasure-hunt.pdf",
            externalLink: "/dashboard/activities/pirate-story/treasure-hunt",
            language: ["English", "German" ]
          },
        ],
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
            language: ["English", "German" ]
          },
          {
            id: "dino-video",
            type: "video" as ActivityType,
            title: "Travel Words Pronunciation",
            filePath: "/files/dino-story/pronunciation.mp4",
            externalLink: "/dashboard/activities/dino-story/pronunciation",
            language: ["English", "German" ]
          },
          {
            id: "dino-worksheet",
            type: "worksheet" as ActivityType,
            title: "Language Comparison Sheet",
            filePath: "/files/dino-story/comparison-sheet.pdf",
            externalLink: "/dashboard/activities/dino-story/comparison-sheet",
            language: ["English", "German" ]
          },
        ],
      },
    ],
  };

  const allLanguages = Array.from(
    new Set(
      languageAwarenessData.stories.flatMap((story) =>
        story.activities.flatMap((a) => a.language || [])
      )
    )
  ).sort();

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    allLanguages[0] || ""
  );

  const filteredStories = languageAwarenessData.stories
    .map((story) => ({
      ...story,
      activities: story.activities.filter(
        (act) =>
          !selectedLanguage ||
          !act.language ||
          act.language.includes(selectedLanguage)
      ),
    }))
    .filter((story) => story.activities.length > 0);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "song":
        return <Music className="h-4 w-4" />;
      case "game":
        return <Gamepad2 className="h-4 w-4" />;
      case "art":
        return <PenLine className="h-4 w-4" />;
      case "worksheet":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case "song":
        return "bg-purple-100 text-purple-700";
      case "game":
        return "bg-green-100 text-green-700";
      case "art":
        return "bg-amber-100 text-amber-700";
      case "worksheet":
        return "bg-indigo-100 text-indigo-700";
      case "video":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedActivities((prev) => ({ ...prev, [id]: checked }));
  };

const handleDownload = (filePath: string, fileName?: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName || filePath.split("/").pop() || "";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   };

  const downloadSelected = () => {
    Object.entries(selectedActivities).forEach(([id, sel]) => {
      if (sel) {
        languageAwarenessData.stories.forEach((story) => {
          const act = story.activities.find((a) => a.id === id);
          if (act?.filePath) handleDownload(act.filePath);
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
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {allLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={downloadSelected} disabled={selectedCount === 0} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download ({selectedCount})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredStories.map((story) => (
              <Card key={story.id} className="overflow-hidden mb-4">
                <div className="grid grid-cols-12 md:gap-4">
                  <div className="col-span-12 md:col-span-3 border-r p-2 flex gap-3">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden">
                      <Image src={story.image} alt={story.title} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{story.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
                        {story.description}
                      </p>
                    </div>
                  </div>
                  {story.activities.map((activity, idx) => (
                    <div
                      key={activity.id}
                      className={cn(
                        "col-span-12 md:col-span-3 py-6 px-4",
                        idx < story.activities.length - 1 && "border-b md:border-b-0 md:border-r"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={activity.id}
                          checked={!!selectedActivities[activity.id]}
                          onCheckedChange={(c) => handleCheckboxChange(activity.id, c === true)}
                          className="mt-1"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className={cn("p-1 rounded", getActivityColor(activity.type))}>
                                {getActivityIcon(activity.type)}
                              </div>
                              <label htmlFor={activity.id} className="font-medium cursor-pointer text-sm line-clamp-1">
                                {activity.title}
                              </label>
                            </div>
                            <div className="flex gap-1">
                              {activity.filePath && (
                                <Button size="sm" variant="ghost" onClick={() => handleDownload(activity.filePath)} title="Download">
                                  <Download className="h-3.5 w-3.5" />
                                </Button>
                              )}
                              {activity.externalLink && (
                                <Link href={activity.externalLink}>
                                  <Button size="sm" variant="ghost" title="View">
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
                </div>

            </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}