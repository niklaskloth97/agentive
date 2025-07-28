import ActivityOverview from "@/components/ActivityOverview";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
	ACTIVITY_GROUPS,
	ACTIVITY_GROUPS_META,
	type ActivityGroupKey,
} from "@/data";
import { Button } from "@/components/ui/button";

export default async function Page({
	params,
}: {
	params: Promise<{ group: ActivityGroupKey }>;
}) {
	const { group } = await params;

	const breadcrumbItems = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Activities", href: "/dashboard/activities" },
	];

	const data = ACTIVITY_GROUPS[group];
	const meta = ACTIVITY_GROUPS_META[group];

	if (!data) {
		return <div>Activity group not found</div>;
	}

	return (
		<DashboardLayout breadcrumbItems={breadcrumbItems}>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold">{meta.label}</h1>
				<ActivityOverview groupKey={group} />
				<Button className="mt-4" variant="outline" asChild>
					<a href={`/dashboard/activities/${group}/guide.pdf`} download>
						Download Guide
					</a>
				</Button>
			</div>
		</DashboardLayout>
	);
}
