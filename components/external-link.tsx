
"use client"

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getSiteConfig, getSocialLinks } from '@/lib/env'

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
  // Get social links including blog URL
  const socialLinks = type ? getSocialLinks() : null;
  const siteConfig = type === 'blog' ? getSiteConfig() : null;
  
  // Determine the URL to use
  // 1. Use provided href directly if available
  // 2. If type is 'blog', use the blog URL from siteConfig
  // 3. If type exists in socialLinks, use that
  // 4. Fall back to DEFAULT_URLS
  // 5. Final fallback to '#'
  const linkHref = href || 
                  (type === 'blog' && siteConfig?.blogUrl) || 
                  (type && socialLinks && socialLinks[type as keyof typeof socialLinks]) ||
                  (type && DEFAULT_URLS[type as keyof typeof DEFAULT_URLS]) || 
                  '#';
  
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
