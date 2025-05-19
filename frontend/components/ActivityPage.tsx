"use client"

import { use } from "react";
import ActivityViewer from "@/components/ActivityViewer";
import { getActivityBySlug } from "@/lib/activity-utils";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, StoryActivities } from "@/lib/activity-utils";

export default function ActivityPage({ params }: {
  params: {
    storySlug: string;
    activityId: string;
  }
}) {
  // Get params directly, no need for React.use() in this version
  const { storySlug, activityId } = params;
  
  const [loading, setLoading] = useState<boolean>(true);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [story, setStory] = useState<StoryActivities | undefined>(undefined);
  
  useEffect(() => {
    try {
      // Get activity data
      console.log("Fetching activity with:", { storySlug, activityId });
      const result = getActivityBySlug(storySlug, activityId);
      console.log("Activity lookup result:", result);
      
      if (result.activity && result.story) {
        setActivity(result.activity);
        setStory(result.story);
      } else {
        console.error("No activity or story found:", storySlug, activityId);
      }
    } catch (error) {
      console.error("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  }, [storySlug, activityId]);
  
  // Show loading state
  if (loading) {
    return <div className="p-8 text-center">Loading activity...</div>;
  }
  
  // If activity not found, return 404
  if (!activity || !story) {
    console.error("Activity not found for:", storySlug, activityId);
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