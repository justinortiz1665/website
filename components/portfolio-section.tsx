"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/markdown"

export default function PortfolioSection({
  projects,
  tags,
}: {
  projects: Project[]
  tags: string[]
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  // Filter projects when selected tags change
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter((project) => project.tags.some((tag) => selectedTags.includes(tag)))
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
        <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl">Portfolio</h2>
        <p className="text-base text-muted-foreground sm:text-lg">
          Explore my latest projects and professional work in athletic training and sports medicine.
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
                src={project.image || "/placeholder.svg?height=600&width=600"}
                alt={project.title}
                width={600}
                height={600}
                className="aspect-square object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{project.summary.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
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

