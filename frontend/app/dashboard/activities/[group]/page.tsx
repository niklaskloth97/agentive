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
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import { useState } from "react";
import { use } from "react";

// Add the ActivityGuideSelector component
function ActivityGuideSelector({
	groupKey,
	meta,
	websiteLanguage,
}: {
	groupKey: ActivityGroupKey;
	meta: {
		slug: string;
		colors: {
			primary: string;
			text: string;
		};
	};
	websiteLanguage: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedGuideLanguage, setSelectedGuideLanguage] = useState<string>("");

	// Update to use the same language codes as your LanguageSelector
	const availableLanguages = ["en", "fr", "de", "gr"]; // Changed 'el' to 'gr' and 'sl' to 'slo'

	// Create available languages object for LanguageSelector
	const guideLanguageOptions = Object.fromEntries(
		availableLanguages.map((langId) => [
			langId,
			{
				label:
					langId === "en"
						? "EN"
						: langId === "de"
						? "DE"
						: langId === "fr"
						? "FR"
						: langId === "gr"   // Changed from 'el' to 'gr'
						? "GR"
						: langId.toUpperCase(),
			},
		])
	);

	const handleLanguageChange = (languageId: string) => {
		setSelectedGuideLanguage(languageId);
	};

	// Update the language mapping to match your LanguageSelector codes
	const getGuideFilename = (groupKey: string, language: string): string => {
		const languageMap: Record<string, string> = {
			en: "E",
			fr: "F",
			de: "German",
			gr: "GR",   // Changed from 'el' to 'gr'
		};

		console.log('Mapping language:', language, 'to:', languageMap[language]); // Debug log

		const langCode = languageMap[language] || "E"; // Default to English
		return `Activities_${groupKey.toUpperCase()}_${langCode}.pdf`;
	};

	const handleDownload = () => {
		if (!selectedGuideLanguage) return;

		console.log(
			"Downloading guide for group:",
			groupKey,
			"in language:",
			selectedGuideLanguage
		);

		const filename = getGuideFilename(groupKey, selectedGuideLanguage);
		const guidePath = `/activities/guides/${groupKey.toUpperCase()}/${filename}`;

		console.log("Guide path:", guidePath);

		// Create download link
		const link = document.createElement("a");
		link.href = guidePath;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Close dialog after download
		setIsOpen(false);
		setSelectedGuideLanguage("");
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					className="h-24 text-2xl"
					style={{
						backgroundColor: meta.colors.primary,
						color: meta.colors.text,
					}}
				>
					<Download className="mr-2" size={20} />
					<TranslateButtons
						translationKey="guide"
						currentLanguage={websiteLanguage}
					/>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						<TranslateButtons
							translationKey="select-guide-language"
							currentLanguage={websiteLanguage}
						/>
					</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium mb-2 block">
								<TranslateButtons
									translationKey="available-languages"
									currentLanguage={websiteLanguage}
								/>
							</label>

							{/* Use LanguageProvider and LanguageSelector */}
							<LanguageProvider
								defaultLanguage=""
								availableLanguages={guideLanguageOptions}
								onLanguageChange={handleLanguageChange}
							>
								<LanguageSelector />
							</LanguageProvider>
						</div>

						{selectedGuideLanguage && (
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleDownload}
									className="flex-1"
									style={{
										backgroundColor: meta.colors.primary,
										color: meta.colors.text,
									}}
								>
									<Download className="mr-2" size={16} />
									<TranslateButtons
										translationKey="download"
										currentLanguage={websiteLanguage}
									/>
								</Button>
								<Button
									variant="outline"
									onClick={() => {
										setIsOpen(false);
										setSelectedGuideLanguage("");
									}}
								>
									<TranslateButtons
										translationKey="cancel"
										currentLanguage={websiteLanguage}
									/>
								</Button>
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

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
					<ActivityGuideSelector
						groupKey={group}
						meta={meta}
						websiteLanguage={websiteLanguage}
					/>
				</div>
			</div>
		</DashboardLayout>
	);
}
