import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StoryPlayer } from "@/components/StoryPlayer";
import storiesDataRaw from "@/data/stories.json";
import type { Story } from "@/components/story-pipeline";
import { TranslateButtons } from "@/components/translateButtons";
import { use } from "react";

// cast JSON once to your Story type
const storiesData = storiesDataRaw as unknown as Story[];

/** 
 * Pre-render one page per storyId in stories.json 
 */
export function generateStaticParams(): { storyId: string }[] {
  return storiesData.map((s) => ({ storyId: s.id }));
}

export default function ListeningPage({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const { storyId } = use(params);
  const story = storiesData.find((s) => s.id === storyId);
  
  if (!story) return notFound();

  // Since this is a server component, we'll need to handle the website language differently
  // For now, we'll use a default language or pass it as a prop
  const websiteLanguage = "en"; // This should be handled through a different mechanism

  const breadcrumbItems = [
    {
      label: (
        <TranslateButtons
          translationKey="multilingual-stories"
          currentLanguage={websiteLanguage}
        />
      ),
      href: "/dashboard",
    },
    {
      label: (
        <TranslateButtons
          translationKey="stories"
          currentLanguage={websiteLanguage}
        />
      ),
      href: "/dashboard/stories",
    },

    {
      label: (
        <TranslateButtons
          translationKey="listen-n-watch"
          currentLanguage={websiteLanguage}
        />
      ),
      href: `/dashboard/stories/${storyId}/listening`,
    },
  ];

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <StoryPlayer
        storyId={storyId}
        showAudioControls={true}
        showText={false}
      />
    </DashboardLayout>
  );
}