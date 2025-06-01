"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import {
	ACTIVITY_GROUPS,
	ACTIVITY_GROUPS_META,
	type ActivityGroupKey,
} from "@/data";

interface ActivityOverviewProps {
	groupKey: string;
	filterByStoryId?: string; // Add this optional prop
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function ActivityOverview({
	groupKey,
	filterByStoryId,
}: ActivityOverviewProps) {
	const [selectedActivities, setSelectedActivities] = useState<Set<string>>(
		new Set()
	);

	// Filter the data to show only activities for the provided story ID
	const data = ACTIVITY_GROUPS[groupKey as ActivityGroupKey];

	// Apply the story filter if provided
	const stories = filterByStoryId
		? data.stories.filter((story) => story.id === filterByStoryId)
		: data.stories;

	const groupMeta = ACTIVITY_GROUPS_META[groupKey as ActivityGroupKey];

	// Get all activities across all stories and sets
	const allActivities = stories.flatMap((story) =>
		story.sets.flatMap((set, setIndex) =>
			set.map((activity) => ({
				...activity,
				storyId: story.id,
				storyTitle: story.title,
				setIndex,
			}))
		)
	);

	const totalActivities = allActivities.length;

	// const handleActivitySelect = (activityId: string, checked: boolean) => {
	// 	const newSelected = new Set(selectedActivities);
	// 	if (checked) {
	// 		newSelected.add(activityId);
	// 	} else {
	// 		newSelected.delete(activityId);
	// 	}
	// 	setSelectedActivities(newSelected);
	// };

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedActivities(new Set(allActivities.map((a) => a.id)));
		} else {
			setSelectedActivities(new Set());
		}
	};

	// const handleActivityClick = (activity: never) => {
	// 	// Navigate to activity detail or open activity
	// 	console.log("Opening activity:", activity);
	// 	// You would implement actual navigation here
	// };

	const handleBulkDownload = () => {
		const selectedActivityData = allActivities.filter((a) =>
			selectedActivities.has(a.id)
		);
		console.log("Downloading activities:", selectedActivityData);

		// Here you would implement the actual download functionality
		// For example, you could download all PDFs for the selected activities
		selectedActivityData.forEach((activity) => {
			// For each activity, you might want to download files for all languages
			// or prompt the user to select a language
			const languages = Object.keys(activity.languages);
			console.log(
				`Activity ${activity.title} available in languages:`,
				languages
			);

			// Example: download the first available language PDF
			if (languages.length > 0) {
				const firstLang = languages[0] as keyof typeof activity.languages;
				const pdfUrl = activity.languages[firstLang]?.pdfUrl;
				if (pdfUrl) {
					console.log(`Would download: ${pdfUrl}`);
					// window.open(pdfUrl, '_blank')
				}
			}
		});
	};

	return (
		<div className="p-6">
			<div className="container mx-auto max-w-7xl">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="bg-white rounded-lg p-4 shadow-sm border max-w-4xl mx-auto">
						<div
							className="inline-block px-8 py-4 rounded-xl mb-4 shadow-lg"
							style={{
								backgroundColor: groupMeta.colors.primary,
								color: groupMeta.colors.text,
							}}
						>
							<h1 className="text-3xl font-bold mb-1">
								Follow-Up Activities ({totalActivities})
							</h1>
							<p className="text-lg opacity-90">{groupMeta.label}</p>
						</div>
						<p className="text-gray-700">
							Please <strong>check</strong> all the follow-up activities you
							would like to <strong>download</strong> and <strong>press</strong>{" "}
							download button, or simply <strong>click on</strong> the follow-up
							activity button you would like to <strong>be shown</strong>.
						</p>
					</div>
				</div>

				{/* Controls */}
				<div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-sm border">
					<Button
						onClick={handleBulkDownload}
						disabled={selectedActivities.size === 0}
						className="flex items-center gap-2 px-6 py-2 rounded-lg shadow hover:shadow-md transition-shadow"
						style={{
							backgroundColor: groupMeta.colors.primary,
							color: groupMeta.colors.text,
						}}
					>
						<Download className="w-5 h-5" />
						Download Follow-up Activity(ies) ({selectedActivities.size})
					</Button>

					<div className="flex items-center gap-2">
						<Checkbox
							id="select-all"
							checked={
								selectedActivities.size === allActivities.length &&
								allActivities.length > 0
							}
							onCheckedChange={handleSelectAll}
							className="w-5 h-5"
							disabled={allActivities.length === 0}
						/>
						<label
							htmlFor="select-all"
							className="text-sm font-medium cursor-pointer"
						>
							Select All
						</label>
					</div>
				</div>

				{/* Table */}
				<div className="bg-white rounded-lg overflow-hidden shadow-lg border">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr
									style={{ backgroundColor: `${groupMeta.colors.primary}20` }}
								>
									<th className="p-4 text-left font-semibold border-r" />
									{stories.map((story, index) => (
										<th
											className="p-4 text-center font-semibold border-r"
											key={story.id}
										>
											F-U Act LA_{groupKey}_{ALPHABET[index]}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{stories.length > 0 ? (
									stories.map((story) => {
										return (
											<tr
												key={story.id}
												className="border-t hover:bg-gray-50 transition-colors"
											>
												<td className="p-4 font-medium border-r bg-gray-50/50">
													{story.title}
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={4} className="p-8 text-center text-gray-500">
											No activities available for this group.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Selection Summary */}
				{selectedActivities.size > 0 && (
					<div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
						<p className="text-green-700 font-medium text-center">
							✓ Selected {selectedActivities.size} activities for download
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
