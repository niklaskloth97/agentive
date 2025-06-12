"use client";

import ActivityPage from "@/components/ActivityPage";

export default function ActivityPageWrapper({
	params,
}: {
	params: {
		storySlug: string;
		activityId: string;
	};
}) {
	return <ActivityPage params={params} />;
}
