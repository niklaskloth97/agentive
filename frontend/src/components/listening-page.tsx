// Example usage in a story page
import Image from "next/image";
import {
	StoryPipeline,
	getStoryInfo,
	getStoryPageCount,
} from "@/components/story-pipeline";
import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";

export default function StoryReadingPage({
	params,
}: {
	params: { slug: string };
}) {
	const [currentPage, setCurrentPage] = useState(0);
	const { selectedLanguage } = useLanguage();
	const storyId = params.slug; // assuming slug is the story ID
	console.log("Story ID:", storyId);
	const storyInfo = getStoryInfo(storyId);
	const totalPages = getStoryPageCount(storyId, selectedLanguage);

	// Get just the text
	const pageText = (
		<StoryPipeline
			storyId={storyId}
			pageIndex={currentPage}
			contentType="text"
		/>
	);

	// Get just the image URL
	const imageUrl = (
		<StoryPipeline
			storyId={storyId}
			pageIndex={currentPage}
			contentType="image"
		/>
	);

	// Get just the audio URL
	const audioUrl = (
		<StoryPipeline
			storyId={storyId}
			pageIndex={currentPage}
			contentType="audio"
		/>
	);

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-2xl font-bold mb-4">{storyInfo?.title}</h1>

			{/* The actual story content - styled elsewhere as you mentioned */}
			<div className="story-content-wrapper">
				{imageUrl && (
					<div className="image-container">
						<Image
							src={String(imageUrl)}
							alt={`Page ${currentPage + 1}`}
							width={500}
							height={300}
							className="rounded-lg"
						/>
					</div>
				)}

				<div className="text-container">{pageText}</div>

				{audioUrl && (
					<audio
						controls
						src={String(audioUrl)}
						className="mt-4 w-full"
					></audio>
				)}
			</div>

			{/* Navigation buttons */}
			<div className="flex justify-between mt-6">
				<button
					onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
					disabled={currentPage === 0}
					className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
				>
					Previous
				</button>

				<span className="px-4 py-2">
					Page {currentPage + 1} of {totalPages}
				</span>

				<button
					onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
					disabled={currentPage >= totalPages - 1}
					className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
}
