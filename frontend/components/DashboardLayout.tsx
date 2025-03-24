import { AppSidebar } from "@/app/dashboard/app-sidebar"
import { DynamicBreadcrumb } from "@/components/dynamicBreadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardLayoutProps {
  breadcrumbItems: BreadcrumbItem[];
  children: React.ReactNode;
}

export function DashboardLayout({ breadcrumbItems, children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar className="h-[calc(100vh-4rem)] mt-14 z-10"/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb items={breadcrumbItems} />
        </header>
        <div className="flex flex-1 flex-col gap-2 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}