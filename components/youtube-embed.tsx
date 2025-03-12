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

  // Extract video ID from URL if a full URL was provided
  const getVideoId = (input: string): string => {
    // If it's already just an ID (no slashes or dots)
    if (!/[\/\.]/.test(input)) {
      return input;
    }

    // Handle youtube.com/watch?v=ID format
    const watchMatch = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?\/]+)/);
    if (watchMatch) {
      return watchMatch[1];
    }

    // Handle youtube.com/embed/ID format
    const embedMatch = input.match(/youtube\.com\/embed\/([^\/\?&]+)/);
    if (embedMatch) {
      return embedMatch[1];
    }

    // Return original if no patterns match
    return input;
  };

  const videoId = getVideoId(youtubeId);

  if (!isClient) {
    // Return a placeholder with the correct aspect ratio
    return (
      <div className="relative pb-[56.25%]">
        <div className="absolute inset-0 flex items-center justify-center bg-muted">Loading video...</div>
      </div>
    )
  }

  if (!videoId) {
    return (
      <div className="relative pb-[56.25%]">
        <div className="absolute inset-0 flex items-center justify-center bg-muted">Invalid YouTube URL or ID</div>
      </div>
    );
  }

  return (
    <div className="relative pb-[56.25%]">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

