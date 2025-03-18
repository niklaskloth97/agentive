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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard/stories" },
    { label: "A dino story", href: "/dashboard/multilingual-stories/a-dino-story" }
  ];

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isCardVisible, setIsCardVisible] = useState(false)

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
        <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-md">
          <Button 
            variant="outline" 
            className="mb-2 flex items-center justify-center"
            onClick={() => setIsCardVisible(!isCardVisible)}
          >
            {isCardVisible ? (
              <>
                <span className="mr-2">Hide Details</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="mr-2">Show Details</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
          
          {isCardVisible && (
            <Card className="w-full transition-all duration-300 ease-in-out">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is additional content that can be shown or hidden.</p>
                <p className="mt-2">You can put any information here related to the current slide.</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Slide {current}: More details about this content</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}