"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Download } from "lucide-react";
import CollapsibleCard from "@/components/CollapsibleCard";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import LanguageAwarePdfViewer from "@/components/LanguageAwarePdfViewer";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

// Define types for activity data structure
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

interface ActivityViewerProps {
	activity: Activity;
	storyTitle: string;
	storySlug: string;
	className?: string;
}

export default function ActivityViewer({
	activity,
	storyTitle,
	storySlug,
}: ActivityViewerProps) {
	const breadcrumbItems = [
		{ label: "Multilingual Stories", href: "/dashboard" },
		{ label: "Follow-up Activities", href: "/dashboard/follow-up-activities" },
		{ label: storyTitle, href: `/dashboard/multilingual-stories/${storySlug}` },
		{ label: activity.title },
	];
	// Get all available languages from the activity
	const allLanguages = Object.keys(activity.languages);

	// Set default language to the first available one
	const [selectedLanguage, setSelectedLanguage] = useState<string>(
		allLanguages.length > 0 ? allLanguages[0] : "en"
	);

	// Convert the languages object to the format expected by LanguageProvider
	const availableLanguages: Record<string, { label: string }> = {};
	for (const [key, value] of Object.entries(activity.languages)) {
		availableLanguages[key] = { label: value.label };
	}

	// Handle download for the selected language
	const handleDownload = useCallback(() => {
		const currentContent = activity.languages[selectedLanguage];
		if (currentContent && currentContent.pdfUrl) {
			const link = document.createElement("a");
			link.href = currentContent.pdfUrl;
			link.download = `${activity.title}-${currentContent.label}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}, [activity, selectedLanguage]);

	// Handle language change
	const handleLanguageChange = useCallback((language: string) => {
		setSelectedLanguage(language);
	}, []);

	return (
		<LanguageProvider
			defaultLanguage={selectedLanguage}
			availableLanguages={availableLanguages}
			onLanguageChange={handleLanguageChange}
		>
			<DashboardLayout breadcrumbItems={breadcrumbItems}>
				<h1 className="text-2xl text-center font-bold ml-3 mb-4">
					{activity.title}
				</h1>
				<div className="flex flex-col md:flex-row w-full gap-4">
					{/* Right Column - 25% */}
					<div className="w-full md:w-1/5 flex flex-col gap-4">
						<CollapsibleCard title="Select a language" defaultOpen={true}>
							<LanguageSelector />
						</CollapsibleCard>
						<Button
							className="w-full"
							onClick={handleDownload}
							disabled={!activity.languages[selectedLanguage]?.pdfUrl}
						>
							<Download className="mr-2" /> Download material
						</Button>
					</div>

					{/* Left Column - 75% */}
					<div className="w-full md:w-4/5">
						<CollapsibleCard title={`View ${activity.type}`} defaultOpen={true}>
							<LanguageAwarePdfViewer
								contentMap={activity.languages}
								defaultHeight={1070}
							/>
						</CollapsibleCard>
					</div>
				</div>
			</DashboardLayout>
		</LanguageProvider>
	);
}
