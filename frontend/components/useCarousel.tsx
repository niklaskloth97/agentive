"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"

  import { type CarouselApi } from "@/components/ui/carousel"
import React from "react"

  export function Example() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [,setCurrent] = React.useState(0)
    const [,setCount] = React.useState(0)
  
    React.useEffect(() => {
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
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>A</CarouselItem>
          <CarouselItem>B</CarouselItem>
          <CarouselItem>C</CarouselItem>
        </CarouselContent>
      </Carousel>
    )
  }
  