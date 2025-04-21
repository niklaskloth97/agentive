
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {ActivitySelection} from "@/components/ActivitySelection";
import Image from "next/image";

export default function Page() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const breadcrumbItems = [
      { label: "Getting Started", href: "/dashboard/getting-started" },
      { label: "Project Structure", href: "/dashboard/getting-started/project-structure" }
    ];
  
    useEffect(() => {
      if (!api) return;
  
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
  
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);
  
    return (
      <DashboardLayout breadcrumbItems={breadcrumbItems} >

    <div className="container mx-auto py-8 px-8">
            <h1 className="text-3xl font-bold mb-6 "> Leere Seite für Project Structure</h1>
      <h2 className="text-xl font-semibold ">  Unterüberschrift möglich für die bestimmte page</h2>
      <h2 className="text-lg font-semibold mb-2">Description towards the structure</h2>
              <p className="text-sm">more infos</p>
      <h2 className="text-lg font-semibold mb-2">Zuständigkeiten-Team</h2>
              <p className="text-sm">more infos</p>
      <h2 className="text-lg font-semibold mb-2">Meet the Team:...</h2>
              <Button className="w-full" variant="slate">
                    // Link/Verweis auf die Seite Team bei AGENTIVE
                    //title: "The Team"
                     //url: "app/team"
                    <p className="text-sm">more infos</p>
                      </Button>
    </div>
    </DashboardLayout>
     )}