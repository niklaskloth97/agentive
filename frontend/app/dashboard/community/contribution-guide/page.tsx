"use client"

import { useState, useEffect } from "react";
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
      { label: "Community", href: "/dashboard/community" },
      { label: "Contribution guide", href: "/dashboard/community/contribution-guide" }
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
            <h1 className="text-3xl font-bold mb-6 "> Überschrift: Leere Seite für contribution-guide</h1>
      <h2 className="text-xl font-semibold ">Unterüberschrift..falls nötig</h2>
      <h2 className="text-lg font-semibold mb-2">Contribution guide content</h2>
              <p className="text-sm">more infos about content</p>
      <h2 className="text-lg font-semibold mb-2">Still More infos? - contact us</h2>
              <p className="text-sm">description how to contact us - eventuell Link auf Mail</p>
    </div>
    </DashboardLayout>
     )}