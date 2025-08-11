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

	// Function to get the guide filename based on group key and language
	const getGuideFilename = (groupKey: string, language: string): string => {
		const languageMap: Record<string, string> = {
			// Language codes (what websiteLanguage actually returns)
			"en": "E",
			"fr": "F",
			"de": "German",
			"el": "GR", // Greek language code
			"sl": "S", // Slovenian language code
			"lux": "E", // Lux falls back to English
			"it": "E", // Italian falls back to English
			// Full language names (fallback)
			"English": "E",
			"French": "F",
			"German": "German",
			"Greek": "GR",
			"Slovenian": "S",
			"Lux": "E",
			"Italian": "E",
		};

		console.log("Current website language:", language); // Debug log
		const langCode = languageMap[language] || "E"; // Default to English
		console.log("Mapped language code:", langCode); // Debug log
		return `Activities_${groupKey.toUpperCase()}_${langCode}.pdf`;
	};

	// Function to handle guide download
	const handleGuideDownload = (groupKey: string) => {
		console.log(
			"Downloading guide for group:",
			groupKey,
			"in language:",
			websiteLanguage
		); // Debug log
		const filename = getGuideFilename(groupKey, websiteLanguage);
		const guidePath = `/activities/guides/${groupKey.toUpperCase()}/${filename}`;

		console.log("Guide path:", guidePath); // Debug log

		// Create download link
		const link = document.createElement("a");
		link.href = guidePath;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

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
						onClick={() => handleGuideDownload(group)}
					>
						<Download className="mr-2" size={20} />
						<TranslateButtons
							translationKey="guide"
							currentLanguage={websiteLanguage}
						/>
					</Button>
				</div>
			</div>
		</DashboardLayout>
	);
}
