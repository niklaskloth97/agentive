import { DashboardLayout } from "@/components/DashboardLayout"

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard/stories" },
    { label: "A pirate story", href: "/dashboard/multilingual-stories/a-pirate-story" }
  ];

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
        <h1>Test Pirate</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </DashboardLayout>
  )
}
