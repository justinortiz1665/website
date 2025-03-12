"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getSiteConfig } from "@/lib/env"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

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
          <SheetTitle className="text-left text-lg font-bold">Justin Ortiz, ATC</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
            About
          </Link>
          <button 
            onClick={() => {
              const blogUrl = getSiteConfig().blogUrl;
              if (blogUrl) {
                window.open(blogUrl, '_blank', 'noopener,noreferrer');
              }
              setOpen(false);
            }} 
            className="text-lg font-medium hover:text-primary text-left w-full border-0 bg-transparent p-0"
          >
            Blog
          </button>
          <Link href="/#portfolio" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
            Portfolio
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

