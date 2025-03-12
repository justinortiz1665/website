
"use client"

import Link from 'next/link'
import { cn } from '@/lib/utils'

export const DEFAULT_URLS = {
  blog: "https://substack.com",
  twitter: "https://twitter.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com",
  instagram: "https://instagram.com"
}

interface ExternalLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  type?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ 
  type, 
  href, 
  children, 
  className, 
  ...props 
}: ExternalLinkProps) {
  // Use the provided href or fallback to default URL if type is provided
  const linkHref = href || (type ? DEFAULT_URLS[type as keyof typeof DEFAULT_URLS] || '#' : '#');
  
  return (
    <Link
      href={linkHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
