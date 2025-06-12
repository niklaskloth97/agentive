"use client";

import { useEffect, useState, ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import storiesDataJson from "@/data/stories.json"; // ← import raw JSON

// Types for our story content
export interface StoryPage {
	id: number;
	text: string;
	imageUrl: string;
	audioUrl: string;
}

export interface Story {
	id: string;
	title: string;
	description: string;
	slug: string;
	languages: string[];
	pages: Record<string, StoryPage[]>; // Key is the language code
}

// Cast once from unknown → Story[]
const storiesData = storiesDataJson as unknown as Story[];

interface StoryPipelineProps {
	storyId: string;
	pageIndex?: number;
	contentType?: "all" | "text" | "image" | "audio";
	render?: (content: StoryContent) => ReactNode;
	children?: (content: StoryContent) => ReactNode;
}

// Define a specific type for the content
type StoryContent = StoryPage | string | null;

export const StoryPipeline: React.FC<StoryPipelineProps> = ({
	storyId,
	pageIndex = 0,
	contentType = "all",
	render,
	children,
}) => {
	const { selectedLanguage } = useLanguage();
	const [content, setContent] = useState<StoryContent>(null);

	useEffect(() => {
		const story = storiesData.find((s) => s.id === storyId);
		if (!story) {
			console.error(`Story with ID "${storyId}" not found`);
			setContent(null);
			return;
		}

		const pages = story.pages[selectedLanguage] || story.pages.en;
		if (!pages || !pages[pageIndex]) {
			console.error(
				`Page ${pageIndex} not available for language ${selectedLanguage}`
			);
			setContent(null);
			return;
		}

		const page = pages[pageIndex];
		switch (contentType) {
			case "text":
				setContent(page.text);
				break;
			case "image":
				setContent(page.imageUrl);
				break;
			case "audio":
				setContent(page.audioUrl);
				break;
			default:
				setContent(page);
		}
	}, [storyId, pageIndex, selectedLanguage, contentType]);

	if (render) return <>{render(content)}</>;
	if (children) return <>{children(content)}</>;
	return null;
};

/** Helpers for your listening-page.tsx **/
export function getStoryInfo(storyId: string) {
	const story = storiesData.find((s) => s.id === storyId);
	if (!story) return null;
	// return whatever fields you need
	return {
		id: story.id,
		title: story.title,
		description: story.description,
		slug: story.slug,
		languages: story.languages,
	};
}

export function getStoryPageCount(storyId: string, language: string) {
	const story = storiesData.find((s) => s.id === storyId);
	if (!story) return 0;
	const pages = story.pages[language] || story.pages.en || [];
	return pages.length;
}
