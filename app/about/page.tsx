import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/external-link"
import { getSocialLinks } from "@/lib/env"
import { Card } from "@/components/ui/card"
import AboutCarousel from "@/components/about-carousel"

export const metadata: Metadata = {
  title: "About",
}

export default function AboutPage() {
  const socialLinks = getSocialLinks()

  return (
    <div className="container flex flex-col gap-8 py-6 md:gap-12 md:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 md:px-0">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          {process.env.NEXT_PUBLIC_ABOUT_TITLE || "About Me"}
        </h1>
      </div>

      {/* Carousel */}
      <Card className="mx-4 overflow-hidden rounded-lg border bg-background md:mx-0">
        <AboutCarousel />
      </Card>

      {/* About Text */}
      <div className="prose prose-gray max-w-none px-4 md:px-0">
        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_INTRO || "Hi, I'm [Your Name]."}
        </p>
        
        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_LOCATION || "Currently based in [Your Location]."}
        </p>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_TAGLINE || "I'm a [your profession/passion]."}
        </p>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_BACKGROUND || "Brief description of your background and interests."}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">My Journey</h2>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_JOURNEY_1 || "Describe your professional journey, key experiences, and what you've learned along the way. Share the highlights of your career path and the experiences that shaped you."}
        </p>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_JOURNEY_2 || "Continue your story here. Talk about transitions in your career, new skills you're developing, or directions you're heading in your professional life."}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">My Philosophy</h2>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_PHILOSOPHY_1 || "Share the principles that guide your work and life. What values are important to you?"}
        </p>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_PHILOSOPHY_2 || "Elaborate on your approach to work, problem-solving, or life in general. What drives you?"}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What I Do</h2>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_WORK || "Describe what you do, what you're passionate about creating, and what makes you excited about your work."}
        </p>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          <strong>&quot;{process.env.NEXT_PUBLIC_ABOUT_QUOTE || "Your favorite inspirational quote here}"}&quot;</strong> – {process.env.NEXT_PUBLIC_ABOUT_QUOTE_AUTHOR || "Quote Author"}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Let's Connect</h2>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_CONNECT || "If you'd like to learn more or follow my journey, feel free to reach out. I love collaborating, discovering something new, and building connections within the community."}
        </p>

        <p className="text-base text-muted-foreground sm:text-lg mb-6">
          {process.env.NEXT_PUBLIC_ABOUT_PERSONAL_NOTE || "Add a personal touch here - maybe a hobby, interest, or fun fact that helps people connect with you!"}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 font-medium"
          >
            <Button className="w-full text-white bg-primary hover:bg-black hover:text-white">Contact Me</Button>
          </Link>
          <ExternalLink 
            href={socialLinks.linkedin}
            className="inline-flex items-center gap-2 font-medium"
          >
            <Button className="w-full text-white bg-primary hover:bg-black hover:text-white">Connect on LinkedIn</Button>
          </ExternalLink>
          <ExternalLink 
            href={socialLinks.github}
            className="inline-flex items-center gap-2 font-medium"
          >
            <Button className="w-full text-white bg-primary hover:bg-black hover:text-white">View on GitHub</Button>
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}