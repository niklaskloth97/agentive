import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StoryPlayer } from "@/components/StoryPlayer";
import storiesDataRaw from "@/data/stories.json";
import type { Story } from "@/components/story-pipeline";

// cast JSON once to your Story type
const storiesData = storiesDataRaw as unknown as Story[];

/**
 * Pre-render one page per storyId in stories.json
 */
export function generateStaticParams(): { storyId: string }[] {
	return storiesData.map((s) => ({ storyId: s.id }));
}

// mark as async so we can `await params`
export default async function ListeningPage({
	params,
}: {
	params: Promise<{ storyId: string }>;
}) {
	const { storyId } = await params;
	const story = storiesData.find((s) => s.id === storyId);
	if (!story) return notFound();

	const breadcrumbItems = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Stories", href: "/dashboard/stories" },
		{ label: story.title, href: `/dashboard/stories/${storyId}` },
		{ label: "Listen", href: `/dashboard/stories/${storyId}/listening` },
	];

	return (
		<DashboardLayout breadcrumbItems={breadcrumbItems}>
			<StoryPlayer
				storyId={storyId}
				showAudioControls={true}
				showText={false}
			/>
		</DashboardLayout>
	);
}
