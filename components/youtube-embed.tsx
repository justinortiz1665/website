"use client"

import { useState, useEffect } from "react"

interface YoutubeEmbedProps {
  youtubeId: string
}

export function YoutubeEmbed({ youtubeId }: YoutubeEmbedProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return a placeholder with the correct aspect ratio
    return (
      <div className="relative pb-[56.25%]">
        <div className="absolute inset-0 flex items-center justify-center bg-muted">Loading video...</div>
      </div>
    )
  }

  return (
    <div className="relative pb-[56.25%]">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

