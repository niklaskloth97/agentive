"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';
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



function ActivityOverviewContent({ groupKey }: ActivityOverviewProps) {
    const searchParams = useSearchParams();
    const storyIdFromUrl = searchParams.get("storyId");
    const { websiteLanguage } = useWebsiteLanguage();
    const { selectedLanguage } = useLanguage(); // Get the language from LanguageSelector

    const [selectedActivities, setSelectedActivities] = useState<Set<string>>(
        new Set()
    );

    // Filter the data to show only activities for the provided story ID
    const data = ACTIVITY_GROUPS[groupKey as ActivityGroupKey];

    // Apply the story filter if provided via URL parameter or prop
    const stories = storyIdFromUrl
        ? data.stories.filter((story) => story.id === storyIdFromUrl)
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
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedActivities(new Set(allActivities.map((a) => a.id)));
        } else {
            setSelectedActivities(new Set());
        }
    };

    // Update the checkbox logic to be more explicit
    const isAllSelected = selectedActivities.size === allActivities.length && allActivities.length > 0;
    const isPartiallySelected = selectedActivities.size > 0 && selectedActivities.size < allActivities.length;

    const handleBulkDownload = () => {
        const selectedActivityData = allActivities.filter((a) =>
            selectedActivities.has(a.id)
        );
        console.log("Downloading activities:", selectedActivityData);

        selectedActivityData.forEach((activity) => {
            // Use selectedLanguage for activity downloads
            const languageData = activity.languages[selectedLanguage as keyof typeof activity.languages];
            if (languageData?.pdfUrl) {
                // Use websiteLanguage for story title
                const storyTitle = typeof activity.storyTitle === 'object' 
                    ? activity.storyTitle[websiteLanguage]  || activity.storyTitle
                    : activity.storyTitle;
                
                const filename = `${storyTitle}_${languageData.title}.pdf`;
                console.log(`Downloading: ${filename}`);
                
                // Create a temporary link element for download
                const link = document.createElement('a');
                link.href = languageData.pdfUrl;
                link.download = languageData.title || 'activity.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    return (
        <div className="p-2">
            <div className="container mx-auto max-w-7xl">									
                {/* Header */}
                <div className="text-center">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm border">
                            <h3 className="text-lg font-semibold mb-2">
                                <TranslateButtons translationKey="available-languages" currentLanguage={websiteLanguage} />
                            </h3>
                            <LanguageSelector />
                        </div>
                        <div className="bg-white rounded-lg p-4 pt-10 shadow-sm border col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                
                            </div>
                            
                            <p className="text-gray-700">
                                <TranslateButtons translationKey="check-activities" currentLanguage={websiteLanguage} />
                            </p>
                        </div>
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
                        <TranslateButtons translationKey="download-activities" currentLanguage={websiteLanguage} /> ({selectedActivities.size})
                    </Button>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="select-all"
                            checked={isAllSelected}
                            onCheckedChange={(checked) => {
                                // Handle the select/deselect all logic
                                if (isAllSelected) {
                                    // If all are selected, deselect all
                                    handleSelectAll(false);
                                } else {
                                    // If none or some are selected, select all
                                    handleSelectAll(true);
                                }
                            }}
                            className="w-5 h-5"
                            disabled={allActivities.length === 0}
                        />
                        <label
                            htmlFor="select-all"
                            className="text-sm font-medium cursor-pointer"
                        >
                            <TranslateButtons translationKey="select-all" currentLanguage={websiteLanguage} />
                            {isPartiallySelected && (
                                <span className="text-xs text-gray-500 ml-1">
                                    ({selectedActivities.size}/{allActivities.length})
                                </span>
                            )}
                        </label>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ backgroundColor: `${groupMeta.colors.primary}20` }}>
                                    <th className="p-4 text-left font-semibold border-r">
                                        <TranslateButtons translationKey="story-title" currentLanguage={websiteLanguage} />
                                    </th>
                                    {Array.from({
                                        length: Math.max(
                                            ...stories.flatMap((story) =>
                                                story.sets.map((set) => set.length)
                                            ),
                                            0
                                        ),
                                    }).map((_, activityIndex) => (
                                        <th
                                            className="p-4 text-center font-semibold border-r"
                                            key={activityIndex}
                                        >
                                            <TranslateButtons translationKey="activity" currentLanguage={websiteLanguage} /> {ALPHABET[activityIndex]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {stories.length > 0 ? (
                                    stories.flatMap((story) =>
                                        story.sets.map((set, setIndex) => (
                                            <tr
                                                key={`${story.id}-set-${setIndex}`}
                                                className="border-t hover:bg-gray-50 transition-colors"
                                            >
                                                {setIndex === 0 && (
                                                    <td
                                                        className="p-4 font-medium border-r bg-gray-50/50 align-top"
                                                        rowSpan={story.sets.length}
                                                    >
                                                            {story.title} 
                                                    </td>
                                                )}

                                                {Array.from({
                                                    length: Math.max(
                                                        ...stories.flatMap((s) =>
                                                            s.sets.map((set) => set.length)
                                                        ),
                                                        0
                                                    ),
                                                }).map((_, activityIndex) => {
                                                    const activity = set[activityIndex];
                                                    // Use selectedLanguage for activity content
                                                    const languageData = activity?.languages[selectedLanguage as keyof typeof activity.languages];

                                                    return (
                                                        <td
                                                            key={activityIndex}
                                                            className="p-4 border-r align-top"
                                                        >
                                                            {activity && languageData ? (
                                                                <div className="p-2 bg-gray-50 rounded border">
                                                                    <div className="flex items-center gap-2">
                                                                        <Checkbox
                                                                            id={`activity-${activity.id}`}
                                                                            checked={selectedActivities.has(activity.id)}
                                                                            onCheckedChange={(checked) => {
                                                                                const newSelected = new Set(selectedActivities);
                                                                                if (checked) {
                                                                                    newSelected.add(activity.id);
                                                                                } else {
                                                                                    newSelected.delete(activity.id);
                                                                                }
                                                                                setSelectedActivities(newSelected);
                                                                            }}
                                                                            className="flex-shrink-0"
                                                                        />
                                                                        <div className="min-w-0 flex-1">
                                                                            <div className="">
                                                                                {languageData.pdfUrl ? (
                                                                                    <a
                                                                                        href={languageData.pdfUrl}
                                                                                        rel="noopener noreferrer"
                                                                                        className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                                                                                    >
                                                                                        {languageData.title}
                                                                                    </a>
                                                                                ) : (
                                                                                    <h4 className="font-medium text-sm truncate">
                                                                                        {languageData.title}
                                                                                    </h4>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center text-gray-400 text-sm py-4">
                                                                    -
                                                                </div>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={
                                                Math.max(
                                                    ...stories.flatMap((s) =>
                                                        s.sets.map((set) => set.length)
                                                    ),
                                                    0
                                                ) + 1
                                            }
                                            className="p-8 text-center text-gray-500"
                                        >
                                            <TranslateButtons translationKey="no-activities" currentLanguage={websiteLanguage} /> 
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ActivityOverview({ groupKey }: ActivityOverviewProps) {
    return (
        <LanguageProvider 
            defaultLanguage="en"
            availableLanguages={{
                en: { label: "EN" },
                fr: { label: "FR" },
                de: { label: "DE" },
                it: { label: "IT" },
                sv: { label: "SV" },
            }}
        >
            <ActivityOverviewContent groupKey={groupKey} />
        </LanguageProvider>
    );
}