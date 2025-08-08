"use client";

import ActivityOverview from "@/components/ActivityOverview";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
	ACTIVITY_GROUPS,
	ACTIVITY_GROUPS_META,
	type ActivityGroupKey,
} from "@/data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TranslateButtons } from "@/components/translateButtons";
import { useWebsiteLanguage } from "@/contexts/WebsiteLanguageContext";
import { use } from "react";

export default function Page({
	params,
}: {
	params: Promise<{ group: ActivityGroupKey }>;
}) {
	const { group } = use(params);
	const { websiteLanguage } = useWebsiteLanguage();

	const breadcrumbItems = [
		{
			label: (
				<TranslateButtons
					translationKey="dashboard"
					currentLanguage={websiteLanguage}
				/>
			),
			href: "/dashboard",
		},
		{
			label: (
				<TranslateButtons
					translationKey="activities"
					currentLanguage={websiteLanguage}
				/>
			),
			href: "/dashboard/activities",
		},
	];

	const data = ACTIVITY_GROUPS[group];
	const meta = ACTIVITY_GROUPS_META[group];

	if (!data) {
		return <div>Activity group not found</div>;
	}

	return (
		<DashboardLayout breadcrumbItems={breadcrumbItems}>
			<div className="space-y-6">
<h1 className="text-3xl font-bold">
					<TranslateButtons
						translationKey={meta.slug}
						currentLanguage={websiteLanguage}
					/>
				</h1>				
				<ActivityOverview groupKey={group} />

				<div className="flex justify-left mt-8">
					<Button
						variant="outline"
						size="lg"
						className="h-24 text-2xl"
						style={{
								backgroundColor: meta.colors.primary,
								color: meta.colors.text,
                            }}
						asChild
					>
						<a href={`/dashboard/activities/${group}/guide.pdf`} download>
							<Download className="mr-2" size={20} />
							<TranslateButtons
								translationKey="guide"
								currentLanguage={websiteLanguage}
							/>
						</a>
					</Button>
				</div>
			</div>
		</DashboardLayout>
	);
}
