"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/external-link"
import { Github } from "lucide-react"
import type { Project } from "@/lib/markdown"
import { getMediaUrls } from "@/lib/env"

export default function PortfolioSection({
  projects,
  tags,
}: {
  projects: Project[]
  tags: string[]
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  // Filter projects when selected tags change or when projects change
  useEffect(() => {
    // Filter out draft projects inside the effect
    const visibleProjects = projects.filter(project => !project.draft)
    
    if (selectedTags.length === 0) {
      setFilteredProjects(visibleProjects)
    } else {
      const filtered = visibleProjects.filter((project) => project.tags.some((tag) => selectedTags.includes(tag)))
      setFilteredProjects(filtered)
    }
  }, [selectedTags, projects])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <section id="portfolio" className="container space-y-6 px-4 md:space-y-8 md:px-0">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl">Portfolio</h2>
          <ExternalLink 
            href={getMediaUrls().github || process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
            className="inline-flex items-center"
          >
            <Github className="h-6 w-6" />
          </ExternalLink>
        </div>
        <p className="text-base text-muted-foreground sm:text-lg">
          Explore my latest projects and professional work in AI, software development, and data analytics.
        </p>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTag(tag)}
            className={`
              ${selectedTags.includes(tag) ? "bg-primary hover:bg-black hover:text-white" : ""}
              transition-colors
            `}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <Image
                src={project.image || getMediaUrls().defaultProjectImage}
                alt={project.title}
                width={600}
                height={600}
                className="aspect-square object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {project.summary && project.summary.length > 0 
                    ? `${project.summary.substring(0, 100)}...` 
                    : 'No summary available'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs rounded-full border border-muted-foreground/30 bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-muted-foreground">
            No projects match the selected filters. Try selecting different tags.
          </div>
        )}
      </div>
    </section>
  )
}