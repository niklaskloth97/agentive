import activitiesData from "@/data/activities.json";
import ActivityViewer from "@/components/ActivityViewer";
import { getActivityBySlug } from "@/lib/activity-utils";
import { notFound } from "next/navigation";
import type { StoryActivities, Activity } from "@/lib/activity-utils";

interface PageProps {
  // params must be a Promise so it has then/catch/finally
  params: Promise<{
    storySlug: string;
    activityId: string;
  }>;
}

/** 
 * Tell Next.js which activity pages to pre-render 
 */
export function generateStaticParams(): {
  storySlug: string;
  activityId: string;
}[] {
  const stories = activitiesData as StoryActivities[];
  return stories.flatMap((story) =>
    story.activities.map((act) => ({
      storySlug: story.slug,
      activityId: act.id,
    }))
  );
}

export default async function ActivityPage({ params }: PageProps) {
  // unwrap the promise
  const { storySlug, activityId } = await params;

  const { activity, story } = getActivityBySlug(storySlug, activityId);
  if (!activity || !story) return notFound();

  return (
    <ActivityViewer
      activity={activity as Activity}
      storyTitle={story.title}
      storySlug={story.slug}
    />
  );
}