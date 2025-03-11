import Link from "next/link"
import { Github, Linkedin, Instagram, Youtube, X } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} Justin Ortiz. All rights reserved.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Link
            href="https://x.com/justinbortiz"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-background p-2 hover:bg-accent"
          >
            <X className="h-5 w-5 text-primary" />
            <span className="sr-only">X (formerly Twitter)</span>
          </Link>
          <Link
            href="https://github.com/justinortiz1665"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-background p-2 hover:bg-accent"
          >
            <Github className="h-5 w-5 text-primary" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/justinbortiz/"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-background p-2 hover:bg-accent"
          >
            <Linkedin className="h-5 w-5 text-primary" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://www.youtube.com/@justinbortiz_atc"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-background p-2 hover:bg-accent"
          >
            <Youtube className="h-5 w-5 text-primary" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            href="https://www.instagram.com/justinbortiz/"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-background p-2 hover:bg-accent"
          >
            <Instagram className="h-5 w-5 text-primary" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
