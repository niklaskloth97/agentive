import * as React from "react"
import { Minus, Plus } from "lucide-react"
//import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent, 
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  //SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Here are the links for the pages. 
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Introduction",
          url: "#",
          isActive: true
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Multilingual Stories",
      url: "multilingual-stories",
      items: [
        {
          title: "A pirate story",
          url: "/dashboard/multilingual-stories/a-pirate-story",
          isActive: true,
        },
        {
          title: "A dino story",
          url: "a-dino-story",
          isActive: true,
        },
        {
          title: "Another Story",
          url: "/dashboard/multilingual-stories/another-story",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "A dino story",
      url: "#",
      items: [
        {
          title: "Dino on a trip",
          url: "#",
        },
        {
          title: "Home alone",
          url: "#",
        },
        {
          title: "The football match",
          url: "#",
        },
        {
          title: "Dino goes for a swim",
          url: "#",
        },
        {
          title: "Dino at a doctor",
          url: "#",
        },
        {
          title: "Shopping tour",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      {/*<SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-black">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                { <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Menu</span>
                  <span className="">v1.0.0</span> }
                </div>
              </a>  
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm/>
      </SidebarHeader> */}
      <SidebarContent className = 'flex-grow'>
        <SidebarGroup>
          <SidebarMenu>
          {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
          </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
