
"use client"

import { useEffect, useState } from "react"
import { getSiteConfig } from "@/lib/env"

interface ExternalLinkProps {
  type: "blog" | "twitter" | "github" | "linkedin" | "youtube" | "instagram"
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function ExternalLink({ type, className, children, onClick }: ExternalLinkProps) {
  const [href, setHref] = useState("https://substack.com/")
  
  useEffect(() => {
    // Only run on client side
    let url = ""
    
    switch (type) {
      case "blog":
        url = getSiteConfig().blogUrl || "https://substack.com/"
        break
      case "twitter":
        url = getSiteConfig().twitter || "https://twitter.com"
        break
      case "github":
        url = getSiteConfig().github || "https://github.com"
        break
      case "linkedin":
        url = getSiteConfig().linkedin || "https://linkedin.com"
        break
      case "youtube":
        url = getSiteConfig().youtube || "https://youtube.com"
        break
      case "instagram":
        url = getSiteConfig().instagram || "https://instagram.com"
        break
      default:
        url = "https://substack.com/"
    }
    
    setHref(url)
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
