"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Download } from "lucide-react";
import CollapsibleCard from "@/components/CollapsibleCard";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import LanguageAwarePdfViewer from "@/components/LanguageAwarePdfViewer";
import { Button } from "@/components/ui/button";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";

// const images = [
// "/images/stories/pirate-story/1.webp", "/images/stories/pirate-story/2.webp", "/images/stories/pirate-story/3.webp", "/images/stories/pirate-story/4.webp"]

const storyContent = {
	en: {
		label: "English",
		audioUrl: "/audio/test-en.opus",
		pdfUrl: "/learning-material/test-english.pdf",
		images: [
			"/images/stories/monster-story/1.webp",
			"/images/stories/monster-story/2.webp",
		],
	},
	de: {
		label: "German",
		audioUrl: "/audio/test-de.opus",
		pdfUrl: "/learning-material/test-german.pdf",
		images: [
			"/images/stories/monster-story/1-de.webp",
			"/images/stories/monster-story/2-de.webp",
		],
	},
	it: {
		label: "Italian",
		audioUrl: "/audio/pirate-story-es.mp3",
		pdfUrl: "/Monster story example_es.pdf",
		images: [
			"/images/stories/monster-story/1-es.webp",
			"/images/stories/monster-story/2-es.webp",
		],
	},
	fr: {
		label: "French",
		audioUrl: "/audio/pirate-story-es.mp3",
		pdfUrl: "/Monster story example_es.pdf",
		images: [
			"/images/stories/monster-story/1-es.webp",
			"/images/stories/monster-story/2-es.webp",
		],
	},
	sv: {
		label: "Slovene",
		audioUrl: "/audio/pirate-story-es.mp3",
		pdfUrl: "/Monster story example_es.pdf",
		images: [
			"/images/stories/monster-story/1-es.webp",
			"/images/stories/monster-story/2-es.webp",
		],
	},
	lux: {
		label: "Luxembourgish",
		audioUrl: "/audio/pirate-story-es.mp3",
		pdfUrl: "/Monster story example_es.pdf",
		images: [
			"/images/stories/monster-story/1-es.webp",
			"/images/stories/monster-story/2-es.webp",
		],
	},
	gr: {
		label: "Greek",
		audioUrl: "/audio/pirate-story-es.mp3",
		pdfUrl: "/Monster story example_es.pdf",
		images: [
			"/images/stories/monster-story/1-es.webp",
			"/images/stories/monster-story/2-es.webp",
		],
	},
};

export default function Page() {
	const breadcrumbItems = [
		{ label: "Multilingual Stories", href: "/dashboard" },
		{
			label: "Monster Story",
			href: "/dashboard/multilingual-stories/a-monster-story",
		},
	];

	// Extract language info for the context
	const availableLanguages = Object.fromEntries(
		Object.entries(storyContent).map(([key, value]) => [
			key,
			{ label: value.label },
		])
	);

	return (
		<LanguageProvider
			defaultLanguage="en"
			availableLanguages={availableLanguages}
		>
			<DashboardLayout breadcrumbItems={breadcrumbItems}>
				<div className="flex justify-end"></div>
				<h1 className="text-2xl text-center font-bold ml-3 mb-4">
					View Follow-Up Activity
				</h1>
				<div className="flex flex-col md:flex-row w-full gap-4">
					{/* Right Column - 25% */}
					<div className="w-full md:w-1/5 flex flex-col gap-4">
						<CollapsibleCard title="Select a language" defaultOpen={true}>
							<LanguageSelector />
						</CollapsibleCard>
						<Button className="w-full">
							<Download /> Download material
						</Button>
					</div>

					{/* Left Column - 75% */}
					<div className="w-full md:w-4/5">
						<CollapsibleCard title="Read the story" defaultOpen={true}>
							<LanguageAwarePdfViewer
								contentMap={storyContent}
								defaultHeight={1070}
							/>
						</CollapsibleCard>
					</div>
				</div>
			</DashboardLayout>
		</LanguageProvider>
	);
}
