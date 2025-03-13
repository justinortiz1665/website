import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import PortfolioSection from "@/components/portfolio-section"
import { getAllProjects, getAllTags } from "@/lib/markdown"
import { Metadata } from "next"
import { Github, ExternalLink } from "lucide-react"; // Assuming these are imported from a library

// Function to retrieve social links (needs implementation based on your .env setup)
const getSocialLinks = () => {
  return {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || ""
  }
}


export const metadata: Metadata = {
  title: "Home",
}

export default function Home() {
  const projects = getAllProjects()
  const tags = getAllTags()

  return (
    <div className="flex flex-col gap-8 pb-8 md:gap-12">
      {/* Hero Section */}
      <section className="container grid gap-8 pt-6 md:grid-cols-2 md:items-center md:pt-12">
        {/* Hero Image */}
        <div className="order-1 px-4 md:order-none md:px-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src={process.env.NEXT_PUBLIC_DEFAULT_PROJECT_IMAGE || process.env.NEXT_PUBLIC_AVATAR_URL || "/placeholder.svg"}
              alt="Profile Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col gap-4 px-4 md:px-0">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Healthcare Professional & Lego Builder
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
            From Helping Athletes Run Faster to Making Websites Load Slower.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button asChild className="bg-primary hover:bg-black text-white hover:text-white transition-colors">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-black text-white hover:text-white transition-colors">
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection projects={projects} tags={tags} />
    </div>
  )
}