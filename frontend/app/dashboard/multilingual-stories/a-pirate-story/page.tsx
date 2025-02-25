import AudioPlayer from "@/components/AudioPlayer";
import { DashboardLayout } from "@/components/DashboardLayout"

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard/stories" },
    { label: "A pirate story", href: "/dashboard/multilingual-stories/a-pirate-story" }
  ];

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
        <h1>Test Pirate</h1>
        <div className='w-full flex flex-col lg:flex-row gap-4 px-1 md:px-2 xl:px-2 my-4'>
      <div className='w-full lg:max-w-md'>
        <AudioPlayer url="/audio/Free_Test_Data_1MB_MP3.mp3"/>
      </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </DashboardLayout>
  )
}
