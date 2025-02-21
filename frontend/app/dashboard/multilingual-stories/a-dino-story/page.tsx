"use client"
import { DashboardLayout } from "@/components/DashboardLayout"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard/stories" },
    { label: "A dino story", href: "/dashboard/multilingual-stories/a-dino-story" }
  ];

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col items-center gap-4">
        <Carousel setApi={setApi} className="w-full max-w-md">
          <CarouselContent>
            <CarouselItem>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">A</span>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">B</span>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">C</span>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-center">
          Slide {current} of {count}
        </div>
      </div>
    </DashboardLayout>
  )
}