"use client"

import ActivityViewer from "@/components/ActivityViewer";
import { getActivityBySlug } from "@/lib/activity-utils";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, StoryActivities } from "@/lib/activity-utils";

interface ActivityPageProps {
  params: {
    storySlug: string;
    activityId: string;
  }
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { storySlug, activityId } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [story, setStory] = useState<StoryActivities | undefined>(undefined);
  
  useEffect(() => {
    // Get activity data
    const result = getActivityBySlug(storySlug, activityId);
    
    if (result.activity && result.story) {
      setActivity(result.activity);
      setStory(result.story);
    }
    
    setLoading(false);
  }, [storySlug, activityId]);
  
  // Show loading state
  if (loading) {
    return <div>Loading activity...</div>;
  }
  
  // If activity not found, return 404
  if (!activity || !story) {
    notFound();
  }
  
  return (
    <ActivityViewer 
      activity={activity}
      storyTitle={story.title}
      storySlug={story.slug}
    />
  );
}