import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import PortfolioSection from "@/components/portfolio-section"
import { getAllProjects, getAllTags } from "@/lib/markdown"

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
              src="/placeholder.svg?height=1000&width=800"
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
            Dedicated to optimizing athletic performance and ensuring athlete well-being through evidence-based
            practices and innovative rehabilitation techniques.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button asChild className="bg-black hover:bg-primary transition-colors">
              <Link href="/about">Learn More</Link>
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

