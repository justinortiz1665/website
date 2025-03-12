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
  href: string
  children: React.ReactNode
  className?: string
}

export function ExternalLink({ 
  href, 
  children, 
  className, 
  ...props 
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}