import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getProjectBySlug, markdownToHtml, getProjectSlugs, getImageUrl } from "@/lib/markdown"
import { YoutubeEmbed } from "@/components/youtube-embed"

export function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map(slug => ({
    slug: slug
  }))
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const contentHtml = await markdownToHtml(project.content)

  return (
    <div className="container flex flex-col gap-8 py-6 md:gap-12 md:py-12">
      {/* Header Section */}
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-4 px-4 md:px-0">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="order-first px-4 md:order-last md:px-0">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={getImageUrl(project.image, "16:9") || "/placeholder.svg"}
              alt={typeof project.image === 'object' ? project.image.alt || project.title : project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <section className="px-4 md:px-0">
        <Card className="p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold">Project Summary</h2>
          <p className="text-base text-muted-foreground sm:text-lg">{project.summary}</p>
        </Card>
      </section>

      {/* Problem Section */}
      <section className="px-4 md:px-0">
        <h2 className="mb-4 text-2xl font-bold">The Problem</h2>
        <p className="text-base text-muted-foreground sm:text-lg">{project.problem}</p>
      </section>

      {/* Solution Section */}
      <section className="px-4 md:px-0">
        <h2 className="mb-4 text-2xl font-bold">The Solution</h2>
        <p className="text-base text-muted-foreground sm:text-lg">{project.solution}</p>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-0">
        <h2 className="mb-6 text-2xl font-bold">Project Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
          {project.features.map((feature, index) => (
            <Card key={index} className="p-6">
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Content Section */}
      {contentHtml && (
        <section className="px-4 md:px-0">
          <h2 className="mb-6 text-2xl font-bold">Additional Information</h2>
          <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </section>
      )}

      {/* Demo Video Section */}
      {project.youtubeId && (
        <section className="px-4 md:px-0">
          <h2 className="mb-6 text-2xl font-bold">Demo Video</h2>
          <div className="overflow-hidden rounded-lg">
            <YoutubeEmbed youtubeId={project.youtubeId} />
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="mt-4 px-4 md:px-0">
        <Button variant="outline" asChild>
          <a href="/#portfolio">Back to Portfolio</a>
        </Button>
      </div>
    </div>
  )
}

