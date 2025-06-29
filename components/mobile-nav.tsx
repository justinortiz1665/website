"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getSiteConfig } from "@/lib/env"
import { ExternalLink } from "@/components/external-link"
import { getSocialLinks } from "@/lib/env"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const socialLinks = getSocialLinks()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-bold">{process.env.NEXT_PUBLIC_SITE_NAME || "Your Name"}</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
            About
          </Link>
          <Link 
            href={socialLinks.blog || "https://substack.com"} 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)} 
            className="text-lg font-medium hover:text-primary"
          >
            Blog
          </Link>
          <Link href="/#portfolio" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
            Portfolio
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
            Contact Me
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}