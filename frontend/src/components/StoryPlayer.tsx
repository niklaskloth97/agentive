"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Download,
	Maximize2,
	Volume2,
	Play,
	Pause,
	Globe,
	VolumeX,
} from "lucide-react";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import storiesData from "@/data/stories.json";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface StoryPlayerProps {
	storyId: string;
	showAudioControls?: boolean;
	showText?: boolean; // New prop to control text visibility
	className?: string;
}

interface StoryLanguageContent {
	label: string;
	audioUrl: string;
	coverImage: string;
}
type StoryPageItem = {
	id: number;
	text: string;
	imageUrl: string;
	audioUrl: string;
};

export function StoryPlayer({
	storyId,
	showAudioControls = true,
	showText = true, // Default to showing text
	className,
}: StoryPlayerProps) {
	// Story data access
	const storyInfo = storiesData.find((story) => story.id === storyId);

	// Carousel state
	const [api, setApi] = useState<CarouselApi>();
	const [fullscreenApi, setFullscreenApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);

	// Language state
	const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // Empty string means no selection
	const [currentPage, setCurrentPage] = useState(0);

	// Sidebar state
	const [sidebarCollapsed] = useState(false);

	// Audio player state
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const audioRef = useRef<HTMLAudioElement>(null);

	// Text visibility state
	const [isTextVisible] = useState<boolean>(showText);

	// Create a StoryLanguageContent mapping
	const storyContent: Record<string, StoryLanguageContent> = {};

	// Populate storyContent if storyInfo exists
	if (storyInfo) {
		Object.entries(storyInfo.pages || {}).forEach(([lang, pages]) => {
			if (pages && pages.length > 0) {
				storyContent[lang] = {
					label:
						lang === "en"
							? "English"
							: lang === "de"
								? "Deutsch"
								: lang === "fr"
									? "Français"
									: lang === "es"
										? "Español"
										: lang === "it"
											? "Italiano"
											: lang === "lux"
												? "Luxembourgish"
												: lang === "gr"
													? "Greek"
													: lang === "sv"
														? "Slovenian"
														: lang === "al"
															? "Albanian"
															: lang === "ukr"
																? "Ukrainian"
																: lang.toUpperCase(),
					audioUrl: pages[0].audioUrl || "",
					coverImage: pages[0].imageUrl || "",
				};
			}
		});
	}

	const availableLanguages = Object.fromEntries(
		Object.entries(storyContent).map(([key, value]) => [
			key,
			{ label: value.label },
		])
	);

	const handleLanguageChange = (language: string) => {
		setSelectedLanguage(language);
		// Reset current page when language changes
		setCurrentPage(0);
		setIsPlaying(false);
		if (audioRef.current) {
			audioRef.current.pause();
		}
		if (api) {
			api.scrollTo(0);
		}
	};

	// play/pause
	const togglePlayPause = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	// Handle when audio ended
	const handleAudioEnded = () => {
		setIsPlaying(false);
	};

	// Handle volume change
	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0];
		setVolume(newVolume);

		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	// // Toggle text visibility
	// const toggleTextVisibility = () => {
	//   setIsTextVisible(prev => !prev);
	// };

	// Render text container
	const renderTextContainer = (
		page: StoryPageItem,
		isFullscreen: boolean = false
	) => {
		if (!isTextVisible) return null;

		return (
			<div
				className={cn(
					"text-container mt-4 bg-white rounded-lg w-full",
					isFullscreen ? "p-4" : "border p-2 shadow-sm"
				)}
			>
				<p className="text-lg">{page.text}</p>
			</div>
		);
	};

	// Get pages for the selected language
	const pages =
		(selectedLanguage &&
			storyInfo?.pages?.[selectedLanguage as keyof typeof storyInfo.pages]) ||
		[];

	// Create a placeholder page using the first English page of the story if available
	const placeholderPage = storyInfo?.pages?.en?.[0] || {
		id: "placeholder",
		imageUrl: "/images/placeholder-story.jpg", // Fallback image if no English version
		text: "",
	};

	// Handle regular carousel
	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
			setCurrentPage(api.selectedScrollSnap());
			setIsPlaying(false);
			if (audioRef.current) {
				audioRef.current.pause();
			}
		});
	}, [api]);

	//Fullscreen and audio buttion
	const openFullscreenWithAutoplay = () => {
		// First open fullscreen
		setIsFullscreen(true);

		// Set a small timeout to ensure the fullscreen dialog is mounted
		// before attempting to play audio (avoids race condition)
		setTimeout(() => {
			// Start playback if audio is available
			if (pages[currentPage]?.audioUrl && audioRef.current) {
				audioRef.current
					.play()
					.then(() => {
						setIsPlaying(true);
					})
					.catch((error) => {
						console.error("Audio autoplay failed:", error);
						// Browser may block autoplay; user interaction required
					});
			}
		}, 300);
	};

	// Sync fullscreen carousel with main carousel
	useEffect(() => {
		if (!fullscreenApi || !api) return;

		// When opening fullscreen, sync positions
		fullscreenApi.scrollTo(api.selectedScrollSnap());

		// Sync when navigating in fullscreen
		fullscreenApi.on("select", () => {
			api.scrollTo(fullscreenApi.selectedScrollSnap());
			setCurrentPage(fullscreenApi.selectedScrollSnap());
		});
	}, [fullscreenApi, api, isFullscreen]);

	if (!storyInfo) {
		return <div className="p-4 text-center">Story not found</div>;
	}

	return (
		<LanguageProvider
			defaultLanguage="" // No default language
			availableLanguages={availableLanguages}
			onLanguageChange={handleLanguageChange}
		>
			<div
				className={cn("flex flex-col w-full h-full overflow-hidden", className)}
			>
				<div className="flex text-center items-center justify-between p-4 mb-4">
					<h1 className="text-2xl p-4 absolute left-1/2 transform -translate-x-1/2 font-bold">
						{storyInfo?.title || "Story"}
					</h1>
					{!showAudioControls && <LanguageSelector />}
				</div>

				<div className="flex flex-row w-full gap-0 relative">
					{/* Collapsible Sidebar - disabled, when no audio options */}
					{showAudioControls && (
						<div className="flex flex-col border-r border-slate-200 transition-all duration-300 ease-in-out h-full w-56">
							<div className="flex flex-col p-4 gap-6 h-full relative">
								<div className="transition-opacity space-y-8">
									<div>
										<h3 className="text-sm font-medium mb-2">
											Select a Language
										</h3>
										<LanguageSelector />
									</div>

									{/* Only show these controls if a language is selected */}
									{selectedLanguage && (
										<>
											<div>
												<div className="flex items-center justify-between mb-2">
													<h3 className="text-sm font-medium">Volume</h3>
													<span className="text-xs text-gray-500">
														{Math.round(volume * 100)}%
													</span>
												</div>

												<div className="flex items-center gap-2">
													<Button
														variant="ghost"
														size="icon"
														className="h-6 w-6"
														onClick={() => handleVolumeChange([0])}
													>
														<VolumeX size={16} />
													</Button>

													<Slider
														value={[volume]}
														min={0}
														max={1}
														step={0.01}
														onValueChange={handleVolumeChange}
														className="flex-1"
													/>

													<Button
														variant="ghost"
														size="icon"
														className="h-6 w-6"
														onClick={() => handleVolumeChange([1])}
													>
														<Volume2 size={16} />
													</Button>
												</div>
											</div>

											{/* Download options */}
											<div>
												<h3 className="text-sm font-medium mb-2">Download</h3>

												{pages[currentPage]?.audioUrl && (
													<Button
														className="w-full mb-2"
														variant="outline"
														asChild
													>
														<a href={pages[currentPage].audioUrl} download>
															<Download className="mr-2" size={16} /> Story
															Audio
														</a>
													</Button>
												)}

												<Button className="w-full mb-4" variant="outline">
													<Download className="mr-2" size={16} /> Story Text
												</Button>
												<Button className="w-full mb-4" variant="outline">
													<Download className="mr-2" size={16} /> Story Guide
												</Button>
											</div>

											{/* Play button */}
											<Button
												className="center w-full mt-auto"
												variant="default"
												onClick={openFullscreenWithAutoplay}
												disabled={!pages[currentPage]?.audioUrl}
											>
												{isPlaying ? (
													<>
														<Pause className="mr-2" size={16} /> Pause
													</>
												) : (
													<>
														<Play className="mr-2" size={16} /> Play
													</>
												)}
											</Button>
										</>
									)}
								</div>
							</div>
						</div>
					)}

					{/* Main Content */}
					<div
						className={cn(
							"flex-1 min-h-0 flex flex-col transition-all duration-300 ease-in-out",
							showAudioControls
								? sidebarCollapsed
									? "w-[calc(100%-3rem)]"
									: "w-[calc(100%-16rem)]"
								: "w-full"
						)}
					>
						<div className="w-full max-w-4xl mx-auto h-full flex flex-col">
							<div className="relative flex-1">
								{/* Language selection overlay - show when no language is selected */}
								{!selectedLanguage && (
									<div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-sm">
										<Card className="w-80 shadow-lg">
											<CardContent className="flex flex-col items-center p-6 text-center">
												<Globe className="h-12 w-12 text-primary mb-4" />
												<h3 className="text-xl font-medium mb-2">
													Select a Language
												</h3>
												<p className="text-sm text-muted-foreground mb-4">
													Please choose a language to view this story
												</p>
												<div className="mt-2">
													<LanguageSelector />
												</div>
											</CardContent>
										</Card>
									</div>
								)}

								{/* Fullscreen button - only visible when a language is selected */}
								{selectedLanguage && (
									<div className="absolute top-2 right-2 z-10">
										<Button
											variant="outline"
											size="icon"
											className="bg-white/80 hover:bg-white"
											onClick={() => setIsFullscreen(true)}
										>
											<Maximize2 className="h-4 w-4" />
										</Button>
									</div>
								)}

								{/* Carousel - always render but show placeholder if no language selected */}
								<Carousel setApi={setApi} className="h-full">
									<CarouselContent className="h-full">
										{(selectedLanguage && pages.length > 0
											? pages
											: [placeholderPage]
										).map((page, index) => (
											<CarouselItem
												key={`${selectedLanguage || "placeholder"}-${index}`}
												className="h-full flex items-center justify-center"
											>
												<Card className="w-full max-h-[85vh]">
													<CardContent className="flex flex-col p-4 items-center justify-center">
														<div className="w-full aspect-video relative">
															<Image
																src={page.imageUrl}
																alt={`Story scene ${index + 1}`}
																fill
																className={cn(
																	"object-contain rounded-lg",
																	!selectedLanguage && "opacity-50 blur-sm"
																)}
															/>
														</div>

														{selectedLanguage && renderTextContainer(page)}
													</CardContent>
												</Card>
											</CarouselItem>
										))}
									</CarouselContent>
									{selectedLanguage && pages.length > 1 && (
										<>
											<CarouselPrevious />
											<CarouselNext />
										</>
									)}
								</Carousel>
							</div>

							{/* Page indicator - only show when a language is selected */}
							{selectedLanguage && (
								<div className="text-center py-2">
									Page {current} of {count}
								</div>
							)}
						</div>
					</div>

					{/* Hidden audio player - only if audio controls are enabled and language selected */}
					{showAudioControls &&
						selectedLanguage &&
						pages[currentPage]?.audioUrl && (
							<audio
								ref={audioRef}
								src={pages[currentPage].audioUrl}
								onEnded={handleAudioEnded}
								className="hidden"
							/>
						)}

					{/* Fullscreen */}
					<Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
						<DialogTitle className="sr-only">Story Details</DialogTitle>
						<DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] max-h-[90vh]">
							<div className="flex flex-col h-full gap-6">
								{/* Toolbar in fullscreen with language selector */}
								<div className="flex items-center justify-between">
									{/* Language selector in fullscreen */}

									{/* Audio controls in fullscreen - only if audio controls are enabled */}
									{showAudioControls &&
										selectedLanguage &&
										pages[currentPage]?.audioUrl && (
											<div className="flex items-center gap-4">
												<Button
													variant="outline"
													size="icon"
													onClick={togglePlayPause}
												>
													{isPlaying ? <Pause size={16} /> : <Play size={16} />}
												</Button>

												<div className="flex items-center gap-2 ml-6">
													<Volume2 size={16} />
													<Slider
														value={[volume]}
														min={0}
														max={1}
														step={0.01}
														onValueChange={handleVolumeChange}
														className="w-24"
													/>
												</div>
											</div>
										)}
								</div>

								{/* Fullscreen carousel */}
								<div className="flex-1 min-h-0">
									<Carousel setApi={setFullscreenApi} className="h-full">
										<CarouselContent className="h-full">
											{(selectedLanguage && pages.length > 0
												? pages
												: [placeholderPage]
											).map((page, index) => (
												<CarouselItem
													key={`fullscreen-${selectedLanguage || "placeholder"}-${index}`}
													className="h-full"
												>
													<div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full">
														<div className="w-full aspect-video relative rounded-lg overflow-hidden">
															<Image
																src={page.imageUrl}
																alt={`Story scene ${index + 1}`}
																fill
																className={cn(
																	"object-contain rounded-lg",
																	!selectedLanguage && "opacity-50 blur-sm"
																)}
															/>
														</div>
														{selectedLanguage &&
															renderTextContainer(page, true)}
													</div>
												</CarouselItem>
											))}
										</CarouselContent>
										{selectedLanguage && pages.length > 1 && (
											<>
												<CarouselPrevious className="left-4" />
												<CarouselNext className="right-4" />
											</>
										)}
									</Carousel>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</LanguageProvider>
	);
}
