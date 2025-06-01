'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from "@/components/DashboardLayout";
import ActivityOverview from "@/components/ActivityOverview"; // Reuse the same component
import { ACTIVITY_GROUPS } from "@/data";
import storiesData from '@/data/stories.json';

interface Story {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImage?: string;
  tags?: string[];
}

export default function StoryActivitiesPage() {
  const params = useParams();
  const storyId = params.storyId as string;
  const [story, setStory] = useState<Story>();
  const [groupKey, setGroupKey] = useState<string | null>(null);
  
  // Find which activity group contains this story
  useEffect(() => {
    // First find the story in stories.json for title info
    const storyData = storiesData.find(s => s.id === storyId);
    setStory(storyData);
    
    // Find which group contains this story
    for (const [key, group] of Object.entries(ACTIVITY_GROUPS)) {
      const found = group.stories.some(s => s.id === storyId);
      if (found) {
        setGroupKey(key);
        break;
      }
    }
  }, [storyId]);
  
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Stories", href: "/dashboard/stories" },
    { label: story?.title || "Story", href: `/dashboard/stories/${storyId}` },
    { label: "Activities", href: `/dashboard/stories/${storyId}/activities` },
  ];
  
  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div>
        <h1>Activities for {story?.title || 'Story'}</h1>
      </div>
      
      {/* Re-use the same ActivityOverview component, but filter it for the current story */}
      {groupKey && <ActivityOverview 
        groupKey={groupKey} 
        filterByStoryId={storyId} 
      />}
      
      {!groupKey && (
        <div className="py-12 text-center">
          <p>No activities found for this story.</p>
        </div>
      )}
    </DashboardLayout>
  );
}