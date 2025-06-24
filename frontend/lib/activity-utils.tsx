import activitiesData from '@/data/activities.json';

// Define types to match the JSON structure
export type ActivityType = "song" | "game" | "worksheet" | "art" | "video";

export interface LanguageContent {
  label: string;
  audioUrl?: string;
  pdfUrl: string;
  images?: string[];
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  languages: Record<string, LanguageContent>;
}

export interface StoryActivities {
  id: string;
  title: string;
  slug: string;
  description: string;
  activities: Activity[];
}

// Type assertion for the imported JSON
const activities: StoryActivities[] = activitiesData as StoryActivities[];

/**
 * Debug function to print all activities
 */
export function debugActivities() {
  console.log("All stories:", activities);
  activities.forEach(story => {
    console.log(`Story: ${story.title} (${story.slug})`);
    console.log("Activities:", story.activities.map(a => `${a.id}: ${a.title}`));
  });
}

/**
 * Get a specific activity by story slug and activity ID
 */
export function getActivityBySlug(storySlug: string, activityId: string): {
  activity: Activity | undefined;
  story: StoryActivities | undefined;
} {
  // Print debug information
  console.log("Looking for story slug:", storySlug);
  console.log("Looking for activity ID:", activityId);
  console.log("Available stories:", activities.map(s => `${s.slug} (${s.title})`));
  
  // Find the story by slug
  const story = activities.find(s => s.slug === storySlug);
  if (!story) {
    console.error("Story not found with slug:", storySlug);
    return { activity: undefined, story: undefined };
  }
  
  console.log(`Found story: ${story.title}`);
  console.log("Activities in this story:", story.activities.map(a => a.id));
  
  // Find the activity by ID
  const activity = story.activities.find(a => a.id === activityId);
  if (!activity) {
    console.error("Activity not found with ID:", activityId);
    return { activity: undefined, story };
  }
  
  console.log(`Found activity: ${activity.title}`);
  return { activity, story };
}