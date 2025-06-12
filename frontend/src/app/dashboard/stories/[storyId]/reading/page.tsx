import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StoryPlayer } from "@/components/StoryPlayer";
import storiesDataRaw from "@/data/stories.json";
import type { Story } from "@/components/story-pipeline";

const storiesData = storiesDataRaw as unknown as Story[];

export function generateStaticParams(): { storyId: string }[] {
	return storiesData.map((s) => ({ storyId: s.id }));
}

export default async function ReadingPage({
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
		{ label: "Read", href: `/dashboard/stories/${storyId}/reading` },
	];

	return (
		<DashboardLayout breadcrumbItems={breadcrumbItems}>
			<StoryPlayer storyId={storyId} showAudioControls={true} showText={true} />
		</DashboardLayout>
	);
}
