
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MobileNav from "@/components/mobile-nav"
import ExternalLink from "@/components/external-link"
import { useSearch } from "@/lib/search"
import SearchResults from "@/components/search-results"
import { useDebouncedCallback } from "@/lib/hooks"

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const pathname = usePathname()
  const { searchIndex, search, isLoading } = useSearch()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Use debounced search to avoid excessive rendering
  const debouncedSearch = useDebouncedCallback(
    (value: string) => setSearchQuery(value),
    300
  )

  // Hide search results when navigating
  useEffect(() => {
    setShowResults(false)
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.value = ""
    }
  }, [pathname])

  const searchResults = searchQuery.trim() ? search(searchQuery) : []

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="Home"
          >
            <Image
              src={process.env.NEXT_PUBLIC_LOGO_URL || "/placeholder-logo.svg"}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold">
              {process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio"}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative w-64">
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search projects..."
              onChange={(e) => {
                debouncedSearch(e.target.value)
                setShowResults(true)
              }}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setShowResults(true)
                }
              }}
              className="w-full"
            />
            <SearchResults
              results={searchResults}
              isVisible={showResults}
              query={searchQuery}
              onClose={() => setShowResults(false)}
            />
          </div>
          
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${
              pathname === "/about"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            About
          </Link>
          <ExternalLink
            href={process.env.NEXT_PUBLIC_BLOG_URL || "#"}
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Blog
          </ExternalLink>
        </nav>

        {/* Mobile Navigation Toggle */}
        <Button
          variant="ghost"
          className="flex md:hidden"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  )
}
