"use client"

import { DashboardLayout } from "@/components/DashboardLayout";
import { StoryPlayer } from "@/components/StoryPlayer";

export default function ListeningPage() {
  const storyId = "1";
  
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Story", href: `/dashboard/multilingual-stories/${storyId}` },
    { label: "Listen", href: `/dashboard/multilingual-stories/${storyId}/listen` }
  ];

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <StoryPlayer 
        storyId={storyId} 
        showAudioControls={false}
      />
    </DashboardLayout>
  );
}