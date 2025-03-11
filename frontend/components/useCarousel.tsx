"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"

// //import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// Idea: use the next and previous for the carousel to klick on keyboard left and right.

  import { type CarouselApi } from "@/components/ui/carousel"
import { log } from "console"
import React from "react"

  export function Example() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
  
    React.useEffect(() => {
      if (!api) {
        return
      }
  
      setCount(api.scrollSnapList().length)
      log("Count:" + count)
      setCurrent(api.selectedScrollSnap() + 1)
  
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
        log("Current page:" + current)
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
  