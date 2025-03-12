"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  // Images array using environment variables with fallbacks
  const images = [
    {
      src: process.env.NEXT_PUBLIC_ABOUT_IMAGE_1 || "/placeholder.svg?height=500&width=400",
      alt: "About Image 1",
    },
    {
      src: process.env.NEXT_PUBLIC_ABOUT_IMAGE_2 || "/placeholder.svg?height=500&width=400",
      alt: "About Image 2",
    },
    {
      src: process.env.NEXT_PUBLIC_ABOUT_IMAGE_3 || "/placeholder.svg?height=500&width=400",
      alt: "About Image 3",
    },
    {
      src: process.env.NEXT_PUBLIC_ABOUT_IMAGE_4 || "/placeholder.svg?height=500&width=400",
      alt: "About Image 4",
    },
    {
      src: process.env.NEXT_PUBLIC_ABOUT_IMAGE_5 || "/placeholder.svg?height=500&width=400",
      alt: "About Image 5",
    },
  ]

  useEffect(() => {
    const onSelect = () => {
      setPrevBtnEnabled(emblaApi?.canScrollPrev() ?? false)
      setNextBtnEnabled(emblaApi?.canScrollNext() ?? false)
    }

    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div className="relative flex-[0_0_100%] min-w-0 pl-4 first:pl-0" key={index}>
              <div className="relative mx-auto aspect-[4/5] max-w-[500px]">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}

