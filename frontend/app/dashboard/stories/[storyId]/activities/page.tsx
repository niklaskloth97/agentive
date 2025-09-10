'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { ACTIVITY_GROUPS, ACTIVITY_GROUPS_META, ActivityGroupKey } from "@/data";
import storiesData from '@/data/stories.json';
import { Story, SimpleStory, getStoryTitle, getStoryCoverImage } from "@/types/story";
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';

export default function StoryActivitiesPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.storyId as string;
  const { websiteLanguage } = useWebsiteLanguage();
  const [story, setStory] = useState<SimpleStory>();
  const [availableGroups, setAvailableGroups] = useState<ActivityGroupKey[]>([]);

  useEffect(() => {
    // Type assertion for storiesData
    const typedStoriesData = storiesData as Story[];
    
    // First find the story in stories.json for title info
    const storyData = typedStoriesData.find(s => s.id === storyId);
    
    if (storyData) {
      const processedStory: SimpleStory = {
        id: storyData.id,
        title: getStoryTitle(storyData),
        slug: storyData.slug,
        coverImage: getStoryCoverImage(storyData)
      };
      setStory(processedStory);
    }
    
    // Find which groups contain this story
    const groups: ActivityGroupKey[] = [];
    Object.entries(ACTIVITY_GROUPS).forEach(([key, group]) => {
      const found = group.stories.some(s => s.id === storyId);
      if (found) {
        groups.push(key as ActivityGroupKey);
      }
    });
    
    setAvailableGroups(groups);
    
    // If there's only one group available, redirect directly to that group's activity view
    if (groups.length === 1) {
      const groupSlug = ACTIVITY_GROUPS_META[groups[0]].slug;
      router.push(`/dashboard/activities/${groupSlug}?storyId=${storyId}`);
    }
  }, [storyId, router]);
  
  const breadcrumbItems = [
    { 
      label: <TranslateButtons translationKey="multilingual-ressources" currentLanguage={websiteLanguage} />, 
      href: "/dashboard" 
    },
    { 
      label: <TranslateButtons translationKey="stories" currentLanguage={websiteLanguage} />, 
      href: "/dashboard/stories" 
    },
    { 
      label: story?.title || "Story", 
      href: `/dashboard/stories/${storyId}` 
    },
    { 
      label: <TranslateButtons translationKey="activities" currentLanguage={websiteLanguage} />, 
      href: `/dashboard/stories/${storyId}/activities` 
    },
  ];
  
  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container py-6">
        <h1 className="text-3xl text-center font-bold mb-6">
          <TranslateButtons translationKey="activities" currentLanguage={websiteLanguage} /> for {story?.title || 'Story'}
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          <TranslateButtons translationKey="select-activity-category" currentLanguage={websiteLanguage} />
        </p>
        
        {availableGroups.length > 0 ? (
          <div className="flex md:pt-6 flex-wrap gap-4 h-full items-center justify-center">
            {availableGroups.map((key) => {
              const meta = ACTIVITY_GROUPS_META[key];
              return (
                <Link 
                  href={`/dashboard/activities/${key}?storyId=${storyId}`} 
                  key={key}
                >
                  <button
                    style={
                      {
                        "--group-primary": meta.colors.primary,
                        "--group-secondary": meta.colors.secondary,
                        "--group-color": meta.colors.text,
                        "--group-focus": meta.colors.focus,
                      } as React.CSSProperties
                    }
                    className="aspect-square flex-grow p-4 h-52 md:h-64 rounded-xl bg-[--group-secondary] hover:bg-[--group-primary] flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[--group-focus]"
                    aria-label={`View ${meta.label} activities`}
                  >
                    <meta.icon
                      className="size-28 md:size-36 text-[--group-color]"
                      strokeWidth={1.5}
                    />
                    <span className="text-lg font-semibold text-[--group-color] mt-3">
                      {meta.label}
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p>
              <TranslateButtons translationKey="no-activities-found" currentLanguage={websiteLanguage} />
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}