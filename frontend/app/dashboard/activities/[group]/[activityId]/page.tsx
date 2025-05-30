import activitiesData from "@/data/activities.json";
import ActivityViewer, {
	Activity,
	StoryActivities,
} from "@/components/ActivityViewer";
import { notFound } from "next/navigation";
import { ACTIVITY_GROUPS, ActivityGroupKey } from "@/data";

interface PageProps {
	// params must be a Promise so it has then/catch/finally
	params: Promise<{
		group: string;
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
	const { group, activityId } = await params;

	const { activity, story } =
		ACTIVITY_GROUPS[group as ActivityGroupKey][activityId];
	if (!activity || !story) return notFound();

	return (
		<ActivityViewer
			activity={activity as Activity}
			storyTitle={story.title}
			storySlug={story.slug}
		/>
	);
}
