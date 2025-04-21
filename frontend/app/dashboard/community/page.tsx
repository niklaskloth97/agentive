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
            <h1 className="text-3xl font-bold mb-6 "> Überschrift: Leere Seite für community</h1>
      <h2 className="text-xl font-semibold ">  Unterüberschrift, falls nötig, Stichwörter</h2>
      <h2 className="text-lg font-semibold mb-2">Beispieltext - Community</h2>
              <p className="text-sm">more infos</p>
      <h2 className="text-lg font-semibold mb-2">Motivationstext - warum, man Mitglied werden sollte</h2>
              <p className="text-sm">more infos</p>
      <h2 className="text-lg font-semibold mb-2">Beispieltext - Wie kann man Mitglied werden, bei der Community</h2>
              <p className="text-sm">more infos, description</p>
      <h2 className="text-lg font-semibold mb-2">Contact us - for more infos</h2>
              <p className="text-sm"> Link to email etc.</p>
    </div>
    </DashboardLayout>
     )}
