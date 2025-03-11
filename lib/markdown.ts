
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// Define the content directory path
const contentDirectory = process.cwd() + '/content'
const projectsDirectory = join(contentDirectory, 'projects')

// Define the image metadata interface
export interface ImageMetadata {
  src: string
  alt?: string
  aspectRatio?: "1:1" | "4:5" | "16:9" | string
  width?: number
  height?: number
  caption?: string
}

// Define the Project interface based on frontmatter
export interface ProjectFrontmatter {
  slug: string
  title: string
  date: string
  summary?: string
  problem?: string
  solution?: string
  // Support for string or image metadata
  image?: string | ImageMetadata
  // Add support for multiple images
  images?: (string | ImageMetadata)[]
  // Add a featured image specifically for thumbnails (1:1 ratio)
  thumbnail?: string | ImageMetadata
  tags: string[]
  // Draft flag to indicate project is not ready to be displayed on the homepage
  draft?: boolean
  features?: {
    title: string
    description: string
  }[]
  // Add support for custom sections
  sections?: {
    title: string
    content: string
    type?: "text" | "gallery" | "quote" | "code" | string
  }[]
  youtubeId?: string
  // Allow for any other custom fields
  [key: string]: any
}

export interface Project extends ProjectFrontmatter {
  content: string
}

// This ensures these functions only run on the server side
// and not during client-side rendering
const isServer = typeof window === 'undefined'

// Get all project slugs
export function getProjectSlugs(): string[] {
  if (!isServer) return []
  
  try {
    if (!existsSync(projectsDirectory)) {
      return []
    }

    return readdirSync(projectsDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""))
  } catch (error) {
    console.error("Error reading project directory:", error)
    return []
  }
}

// Get project data by slug
export function getProjectBySlug(slug: string): Project | null {
  if (!isServer) return null
  
  try {
    const fullPath = join(projectsDirectory, `${slug}.md`)

    if (!existsSync(fullPath)) {
      return null
    }

    const fileContents = readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Create a base project with default values for optional fields
    const project: Project = {
      slug,
      title: data.title || '',
      date: data.date || '',
      summary: data.summary || '',
      problem: data.problem || '',
      solution: data.solution || '',
      image: data.image || '',
      tags: data.tags || [],
      features: data.features || [],
      content: content || '',
    }

    // Add any additional fields from the frontmatter
    Object.keys(data).forEach(key => {
      if (!project.hasOwnProperty(key)) {
        project[key] = data[key]
      }
    })

    return project
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

// Get all projects
export function getAllProjects(includeDrafts = false): Project[] {
  if (!isServer) return []
  
  const slugs = getProjectSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    // Filter out draft projects unless specifically requested
    .filter((project) => includeDrafts || !project.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return projects
}

// Get all unique tags from all projects
export function getAllTags(): string[] {
  if (!isServer) return []
  
  const projects = getAllProjects()
  const tagsSet = new Set<string>()

  projects.forEach((project) => {
    project.tags?.forEach((tag) => {
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
