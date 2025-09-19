"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';
import { GUIDES } from "@/data";
import storiesData from '@/data/stories.json';
import {
    ACTIVITY_GROUPS,
    ACTIVITY_GROUPS_META,
    type ActivityGroupKey,
} from "@/data";
import { cn } from "@/lib/utils";

interface ActivityOverviewProps {
    groupKey: string;
    filterByStoryId?: string; // Add this optional prop
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Vocabulary Boost",
    href: "/docs/primitives/alert-dialog",
    description:
      "Reenforce vocabulary with fun activities.",
  },
  {
    title: "Language Awareness",
    href: "/docs/primitives/hover-card",
    description:
      "Learn about different languages deal with speaking letters.",
  },
  {
    title: "Intercultural Awareness",
    href: "/docs/primitives/hover-card",
    description:
      "Learn about how different cultures perceive the world. This activity is meant to teach an open mindset.",
  }, {
    title: "Early Literacy",
    href: "/docs/primitives/hover-card",
    description:
      "Encourage early literacy skills.",
  },
]

// Add the DialogicGuideSelector component from StoryPlayer
function DialogicGuideSelector({ websiteLanguage }: { websiteLanguage: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGuideLanguage, setSelectedGuideLanguage] = useState<string>("");

  // Get available languages for dialogic guide
  const dialogicGuide = GUIDES.dialogic;
  const availableLanguages = dialogicGuide ? Object.keys(dialogicGuide.translations).filter(
    lang => dialogicGuide.translations[lang as keyof typeof dialogicGuide.translations]?.url
  ) : [];

  // Create available languages object for LanguageSelector
  const guideLanguageOptions = Object.fromEntries(
    availableLanguages.map(langId => [
      langId, 
      { 
        label: langId === 'en' ? 'EN' : 
               langId === 'de' ? 'DE' : 
               langId === 'fr' ? 'FR' : 
               langId === 'gr' ? 'GR' : 
               langId.toUpperCase() 
      }
    ])
  );

  const handleLanguageChange = (languageId: string) => {
    setSelectedGuideLanguage(languageId);
  };

  const handleDownload = () => {
    if (!selectedGuideLanguage) return;

    const guideData = dialogicGuide?.translations[selectedGuideLanguage as keyof typeof dialogicGuide.translations];
    
    if (guideData?.url) {
      // Create download link
      const link = document.createElement('a');
      link.href = guideData.url;
      link.download = `Dialogic Reading Guide (${guideLanguageOptions[selectedGuideLanguage]?.label || selectedGuideLanguage}).pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close dialog after download
      setIsOpen(false);
      setSelectedGuideLanguage("");
    }
  };

  if (availableLanguages.length === 0) {
    return null; // Don't render if no guides available
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Download className="mr-2" size={16}/>
          <TranslateButtons translationKey="dialog-guide" currentLanguage={websiteLanguage} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <TranslateButtons translationKey="select-guide-language" currentLanguage={websiteLanguage} />
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                <TranslateButtons translationKey="available-languages" currentLanguage={websiteLanguage} />
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
                >
                  <Download className="mr-2" size={16}/>
                  <TranslateButtons translationKey="download" currentLanguage={websiteLanguage} />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedGuideLanguage("");
                  }}
                >
                  <TranslateButtons translationKey="cancel" currentLanguage={websiteLanguage} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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

    // Helper function to get translated story title
    const getStoryTitle = (storyId: string) => {
        const story = storiesData.find(s => s.id === storyId);
        if (!story) return `Story ${storyId}`;
        
        // Get the story data for the website language
        const languageData = story[websiteLanguage as keyof typeof story];
        if (Array.isArray(languageData) && languageData.length > 0) {
            return languageData[0].title;
        }
        
        // Fallback to English if website language not available
        const englishData = story.en;
        if (Array.isArray(englishData) && englishData.length > 0) {
            return englishData[0].title;
        }
        
        return `Story ${storyId}`;
    };

    // Get all activities across all stories and sets
    const allActivities = stories.flatMap((story) =>
        story.sets.flatMap((set, setIndex) =>
            set.map((activity) => ({
                ...activity,
                storyId: story.id,
                storyTitle: getStoryTitle(story.id), // Use translated title
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
                // activity.storyTitle is now already translated
                const storyTitle = activity.storyTitle;
                
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

        // Handle ICAU resources if selected
        if (groupKey === 'ICAU') {
            stories.forEach((story) => {
                if (selectedActivities.has(`resource-${story.id}`)) {
                    const resourceUrl = `/activities/story${story.id}/ICAU/Story ${story.id}_ICAU_Res.pdf`;
                    const link = document.createElement('a');
                    link.href = resourceUrl;
                    link.download = `Story_${story.id}_ICAU_Resources.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
        }
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
                            onCheckedChange={() => {
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
                                    
                                    {/* Add Resources column only for ICAU */}
                                    {groupKey === 'ICAU' && (
                                        <th className="p-4 text-center font-semibold border-r">
                                            <TranslateButtons translationKey="resources" currentLanguage={websiteLanguage} />
                                        </th>
                                    )}
                                    
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
                                                        {getStoryTitle(story.id)}
                                                    </td>
                                                )}

                                                {/* Add Resources cell only for ICAU */}
                                                {groupKey === 'ICAU' && setIndex === 0 && (
                                                    <td
                                                        className="p-4 border-r align-top"
                                                        rowSpan={story.sets.length}
                                                    >
                                                        <div className="p-2 bg-gray-50 rounded border">
                                                            <div className="flex items-center gap-2">
                                                                <Checkbox
                                                                    id={`resource-${story.id}`}
                                                                    checked={selectedActivities.has(`resource-${story.id}`)}
                                                                    onCheckedChange={(checked) => {
                                                                        const newSelected = new Set(selectedActivities);
                                                                        if (checked) {
                                                                            newSelected.add(`resource-${story.id}`);
                                                                        } else {
                                                                            newSelected.delete(`resource-${story.id}`);
                                                                        }
                                                                        setSelectedActivities(newSelected);
                                                                    }}
                                                                    className="flex-shrink-0"
                                                                />
                                                                <div className="min-w-0 flex-1">
                                                                    <a
                                                                        href={`/activities/story${story.id}/ICAU/Story ${story.id}_ICAU_Res.pdf`}
                                                                        rel="noopener noreferrer"
                                                                        className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                                                                    >
                                                                        <TranslateButtons translationKey="story-resources" currentLanguage={websiteLanguage} />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                ) + 1 + (groupKey === 'ICAU' ? 1 : 0) // Add 1 for Resources column if ICAU -> for ressources
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
                // it: { label: "IT" },
                svn: { label: "SV" },
            }}
        >
            <ActivityOverviewContent groupKey={groupKey} />
        </LanguageProvider>
    );
}

export function ActivitySelection() {
  const { websiteLanguage } = useWebsiteLanguage();

  // Check if dialogic guide is available (at least one language)
  const hasDialogicGuide = !!(GUIDES.dialogic && 
    Object.values(GUIDES.dialogic.translations).some(translation => translation?.url));

  return (
    <div className="space-y-6">
      {/* Guide Download Section */}
      {hasDialogicGuide && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">
            <TranslateButtons translationKey="download-guides" currentLanguage={websiteLanguage} />
          </h3>
          <div className="max-w-xs">
            <DialogicGuideSelector websiteLanguage={websiteLanguage} />
          </div>
        </div>
      )}

      {/* Activity Categories */}
      <ul className="flex flex-col w-full gap-3">
        {components.map((component) => (
          <ListItem
            key={component.title}
            title={component.title}
            href={component.href}
          >
            {component.description}
          </ListItem>
        ))}
      </ul>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-semibold leading-none">{title}</div>
        <p className="text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  )
})
ListItem.displayName = "ListItem"