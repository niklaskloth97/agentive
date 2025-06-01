import ActivityViewer, {
	Activity,
	// StoryActivities,
} from "@/components/ActivityViewer";
import { notFound } from "next/navigation";
import { ACTIVITY_GROUPS, ActivityGroupKey, ACTIVITY_GROUPS_META } from "@/data";

interface PageProps {
  params: Promise<{
    group: string;
    activityId: string;
  }>;
}

export function generateStaticParams() {
  // First, generate params from ACTIVITY_GROUPS structure
  const groupParams: Array<{ group: string; activityId: string }> = [];
  
  Object.entries(ACTIVITY_GROUPS).forEach(([groupKey, groupData]) => {
    const groupSlug = ACTIVITY_GROUPS_META[groupKey as ActivityGroupKey].slug;
    
    groupData.stories.forEach(story => {
      // Flatten all sets of activities
      story.sets.flat().forEach(activity => {
        groupParams.push({
          group: groupSlug, 
          activityId: activity.id,
        });
      });
    });
  });
  
  return [...groupParams];
}

export default async function ActivityPage({ params }: PageProps) {
  // unwrap the promise
  const { group, activityId } = await params;
  
  const groupKey = Object.entries(ACTIVITY_GROUPS_META).find(
    ([_, meta]) => meta.slug === group
  )?.[0] as ActivityGroupKey | undefined;
  
  if (!groupKey) return notFound();
  
  // Find the activity within all stories and sets
  let foundActivity: Activity | undefined;
  let foundStory: { title: string; slug: string } | undefined;
  
  // Search through all stories in this group
  for (const story of ACTIVITY_GROUPS[groupKey].stories) {
    // Search through all activity sets in this story
    for (const activitySet of story.sets) {
      // Search through all activities in this set
      const activity = activitySet.find(act => act.id === activityId);
      if (activity) {
        foundActivity = activity;
        foundStory = {
          title: story.title,
          slug: story.slug
        };
        break;
      }
    }
    if (foundActivity) break;
  }
  
  if (!foundActivity || !foundStory) return notFound();


    return (
        <ActivityViewer
            activity={foundActivity}
            storyTitle={foundStory.title}
            storySlug={foundStory.slug}
        />
    );
}
