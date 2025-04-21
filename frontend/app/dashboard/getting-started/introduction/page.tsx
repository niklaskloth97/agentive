
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
      { label: "Getting started", href: "/dashboard/getting-started" },
      { label: "introduction", href: "/dashboard/getting-started/introduction" }
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
     <h1 className="text-3xl font-bold mb-6 "> Leere Seite für introduction</h1>
      <h2 className="text-xl font-semibold ">  Unterüberschrift - falls nötig: Get a first insight into our learning materials</h2>
      <h2 className="text-lg font-semibold mb-2">Motivationstext, what is the history, what is behind that all?</h2>
              <p className="text-sm">more infos....</p>
      <h2 className="text-lg font-semibold mb-2">How to get started....</h2>
              <p className="text-sm">kleine Beschreibung ....</p>
              
              //Falls ein Button gesetzt werden möchte
              <Button className="w-full" variant="slate">
                //Verweis auf community
                </Button>
                <Button className="w-full" variant="outline">
                  //Verweis auf erste story 
                </Button>
                <Button className="w-full" variant="outline">
                  // more....
                </Button>
        <h2 className="text-lg font-semibold mb-2">Still questions ?</h2>
                <p className="text-sm">Contact us...</p>
      </div>
    </DashboardLayout>
     )}