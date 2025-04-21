
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
      { label: "Multilingual Stories", href: "/dashboard/multilingual-stories" },
      { label: "Examples", href: "/dashboard/multilingual-stories/examples" },
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
            <h1 className="text-3xl font-bold mb-6 "> Leere Seite für mehr Examples</h1>
      <h2 className="text-xl font-semibold ">  Unterüberschrift möglich für die bestimmte page</h2>
      <h2 className="text-lg font-semibold mb-2">Some more examples...</h2>
           <p className="text-sm">Weitere Details, Informationen ....</p>
      <h2 className="text-lg font-semibold mb-2">You can't get enough? Meet our other friends, e.g. the monster or the pirate</h2>
           <p className="text-sm">Weitere Details, Informationen ....</p>
    </div>
    </DashboardLayout>
     )}