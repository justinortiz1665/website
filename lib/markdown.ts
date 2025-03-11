import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

// Define the content directory path
const contentDirectory = path.join(process.cwd(), "content")
const projectsDirectory = path.join(contentDirectory, "projects")

// Define the Project interface based on frontmatter
export interface ProjectFrontmatter {
  slug: string
  title: string
  date: string
  summary: string
  problem: string
  solution: string
  image: string
  tags: string[]
  features: {
    title: string
    description: string
  }[]
  youtubeId?: string
}

export interface Project extends ProjectFrontmatter {
  content: string
}

// Get all project slugs
export function getProjectSlugs(): string[] {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }

    return fs
      .readdirSync(projectsDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""))
  } catch (error) {
    console.error("Error reading project directory:", error)
    return []
  }
}

// Get project data by slug
export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      problem: data.problem,
      solution: data.solution,
      image: data.image,
      tags: data.tags || [],
      features: data.features || [],
      youtubeId: data.youtubeId,
      content,
    }
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

// Get all projects
export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return projects
}

// Get all unique tags from all projects
export function getAllTags(): string[] {
  const projects = getAllProjects()
  const tagsSet = new Set<string>()

  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet).sort()
}

// Convert markdown content to HTML
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)

  return result.toString()
}

