
"use client"

import { useEffect, useState } from "react"

interface ExternalLinkProps {
  type: "blog" | "twitter" | "github" | "linkedin" | "youtube" | "instagram"
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

// Default fallback URLs that don't contain personal information
const DEFAULT_URLS = {
  blog: "https://substack.com",
  twitter: "https://twitter.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com",
  instagram: "https://instagram.com"
}

export function ExternalLink({ type, className, children, onClick }: ExternalLinkProps) {
  const [href, setHref] = useState(DEFAULT_URLS[type])
  
  useEffect(() => {
    // This runs only on the client side, after hydration
    // Fetch the environment variable directly
    let url = ""
    
    // Check for the corresponding environment variable based on type
    switch (type) {
      case "blog":
        url = process.env.NEXT_PUBLIC_BLOG_URL || ""
        break
      case "twitter":
        url = process.env.NEXT_PUBLIC_TWITTER_URL || ""
        break
      case "github":
        url = process.env.NEXT_PUBLIC_GITHUB_URL || ""
        break
      case "linkedin":
        url = process.env.NEXT_PUBLIC_LINKEDIN_URL || ""
        break
      case "youtube":
        url = process.env.NEXT_PUBLIC_YOUTUBE_URL || ""
        break
      case "instagram":
        url = process.env.NEXT_PUBLIC_INSTAGRAM_URL || ""
        break
    }
    
    // Only update if we have a valid URL from the environment
    if (url && url.trim() !== "") {
      setHref(url)
    }
  }, [type])
  
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        if (onClick) onClick()
      }}
    >
      {children}
    </a>
  )
}
