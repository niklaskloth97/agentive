"use client"

// import { AppSidebar } from "@/app/dashboard/app-sidebar"
import { DynamicBreadcrumb } from "@/components/dynamicBreadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardLayoutProps {
  breadcrumbItems: BreadcrumbItem[];
  children: React.ReactNode;
}

export function DashboardLayout({ breadcrumbItems, children }: DashboardLayoutProps) {
  const router = useRouter();
  return (
    
    <SidebarProvider>
      {/* <AppSidebar className="h-[calc(100vh-4rem)] mt-14 z-10"/> */}
      <div className="inset-0 flex-1 z-10">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b py-2">
          {/* <SidebarTrigger className="-ml-1" /> */}
            <Button 
            onClick={() =>  router.back()} 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            aria-label="Go back"
            >
            <ChevronLeft className="h-4 w-4" />
            </Button>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb items={breadcrumbItems} />
        </header>
        <div className="flex flex-1 flex-col gap-2 py-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </SidebarInset>
      </div>
    </SidebarProvider>
  )
}