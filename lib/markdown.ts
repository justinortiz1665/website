
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

// Define the content directory path
const contentDirectory = path.join(process.cwd(), "content")
const projectsDirectory = path.join(contentDirectory, "projects")

// Add image metadata interface
export interface ImageMetadata {
  src: string
  alt?: string
  aspectRatio?: "1:1" | "4:5" | "16:9" | string
  width?: number
  height?: number
  caption?: string
}

// Define the Project interface based on frontmatter
export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectSection {
  title: string
  content: string
  type?: "text" | "gallery" | "quote" | "code" | string
}

export interface ProjectFrontmatter {
  slug: string
  title: string
  date: string
  summary?: string
  problem?: string
  solution?: string
  // Replace simple image string with ImageMetadata or string
  image?: string | ImageMetadata
  // Add support for multiple images
  images?: (string | ImageMetadata)[]
  // Add a featured image specifically for thumbnails (1:1 ratio)
  thumbnail?: string | ImageMetadata
  tags?: string[]
  features?: ProjectFeature[]
  youtubeId?: string
  // Add support for custom sections
  sections?: ProjectSection[]
  // Add a flexible metadata field for any additional data
  metadata?: Record<string, any>
  // Allow for any other custom fields
  [key: string]: any
}

export interface Project extends ProjectFrontmatter {
  content: string
}

// Get all project slugs
export function getProjectSlugs(): string[] {
  try {
    // Check if content directory exists
    if (!fs.existsSync(contentDirectory)) {
      console.log("Content directory does not exist:", contentDirectory)
      fs.mkdirSync(contentDirectory, { recursive: true })
    }

    // Check if projects directory exists
    if (!fs.existsSync(projectsDirectory)) {
      console.log("Projects directory does not exist:", projectsDirectory)
      fs.mkdirSync(projectsDirectory, { recursive: true })
      return []
    }

    const files = fs.readdirSync(projectsDirectory)
    return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""))
  } catch (error) {
    console.error("Error reading project directory:", error)
    return []
  }
}

// Get project data by slug with enhanced flexibility
export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Create a base project with required fields
    const project: Project = {
      slug,
      title: data.title || "Untitled Project",
      date: data.date || new Date().toISOString().split("T")[0],
      content,
    }

    // Process image data to ensure proper format
    if (data.image && typeof data.image === "string") {
      // Convert string image to ImageMetadata with 1:1 aspect ratio for thumbnails
      project.image = {
        src: data.image,
        aspectRatio: "1:1",
      }
    } else if (data.image) {
      // If it's already an object, ensure it has aspectRatio
      project.image = {
        ...data.image,
        aspectRatio: data.image.aspectRatio || "1:1",
      }
    }

    // Process thumbnail specifically for 1:1 display
    if (data.thumbnail && typeof data.thumbnail === "string") {
      project.thumbnail = {
        src: data.thumbnail,
        aspectRatio: "1:1",
      }
    } else if (data.thumbnail) {
      project.thumbnail = {
        ...data.thumbnail,
        aspectRatio: "1:1", // Force 1:1 for thumbnails
      }
    } else if (project.image) {
      // If no thumbnail is specified, use the main image as thumbnail
      project.thumbnail =
        typeof project.image === "string"
          ? { src: project.image, aspectRatio: "1:1" }
          : { ...project.image, aspectRatio: "1:1" }
    }

    // Add all other frontmatter fields dynamically
    Object.keys(data).forEach((key) => {
      if (!["title", "date", "image", "thumbnail"].includes(key)) {
        project[key as keyof Project] = data[key]
      }
    })

    return project
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

// Get image URL with proper aspect ratio
export function getImageUrl(image: string | ImageMetadata | undefined, defaultRatio = "1:1"): string {
  if (!image) return `/placeholder.svg?height=600&width=600`

  if (typeof image === "string") {
    // For placeholder images, enforce the aspect ratio
    if (image.includes("placeholder.svg")) {
      return `/placeholder.svg?height=600&width=600` // Always 1:1 for consistency
    }
    return image
  }

  // If it's an ImageMetadata object
  if (image.src) {
    // For placeholder images, enforce the aspect ratio
    if (image.src.includes("placeholder.svg")) {
      return `/placeholder.svg?height=600&width=600` // Always 1:1 for consistency
    }
    return image.src
  }

  return `/placeholder.svg?height=600&width=600`
}

// Helper function to get dimensions from aspect ratio
export function getAspectRatioDimensions(aspectRatio: string, baseSize: number): [number, number] {
  if (!aspectRatio.includes(":")) {
    return [baseSize, baseSize] // Default to square
  }

  const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number)

  if (widthRatio === heightRatio) {
    return [baseSize, baseSize] // 1:1 ratio
  }

  if (widthRatio > heightRatio) {
    // Landscape
    const height = Math.round(baseSize * (heightRatio / widthRatio))
    return [baseSize, height]
  } else {
    // Portrait
    const width = Math.round(baseSize * (widthRatio / heightRatio))
    return [width, baseSize]
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
    if (project.tags) {
      project.tags.forEach((tag) => {
        tagsSet.add(tag)
      })
    }
  })

  return Array.from(tagsSet).sort()
}

// Get projects by tag
export function getProjectsByTag(tag: string): Project[] {
  const allProjects = getAllProjects()
  return allProjects.filter((project) => project.tags && project.tags.includes(tag))
}

// Get projects by any custom field
export function getProjectsByField(fieldName: string, value: any): Project[] {
  const allProjects = getAllProjects()
  return allProjects.filter((project) => project[fieldName as keyof Project] === value)
}

// Get projects by search query (searches in title, summary, and content)
export function searchProjects(query: string): Project[] {
  const allProjects = getAllProjects()
  const searchTerm = query.toLowerCase()

  return allProjects.filter((project) => {
    const titleMatch = project.title.toLowerCase().includes(searchTerm)
    const summaryMatch = project.summary ? project.summary.toLowerCase().includes(searchTerm) : false
    const contentMatch = project.content.toLowerCase().includes(searchTerm)

    return titleMatch || summaryMatch || contentMatch
  })
}

// Convert markdown content to HTML with options
export async function markdownToHtml(
  markdown: string,
  options: {
    removeHeadings?: boolean
    excerpt?: boolean
    excerptLength?: number
  } = {},
): Promise<string> {
  let processedMarkdown = markdown

  // Option to remove headings (useful for excerpts)
  if (options.removeHeadings) {
    processedMarkdown = processedMarkdown.replace(/^#{1,6}\s+.+$/gm, "")
  }

  // Option to get only an excerpt
  if (options.excerpt) {
    const length = options.excerptLength || 150
    // Remove markdown formatting for cleaner excerpts
    const plainText = processedMarkdown.replace(/[#*_~`]/g, "")
    processedMarkdown = plainText.slice(0, length)

    // Don't cut words in half
    if (processedMarkdown.length === length) {
      const lastSpaceIndex = processedMarkdown.lastIndexOf(" ")
      if (lastSpaceIndex > length * 0.8) {
        // Only trim if we're not cutting too much
        processedMarkdown = processedMarkdown.slice(0, lastSpaceIndex)
      }
    }

    processedMarkdown += "..."
  }

  const result = await remark().use(html).process(processedMarkdown)

  return result.toString()
}

// Get related projects based on tags
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  if (!project.tags || project.tags.length === 0) {
    return []
  }

  const allProjects = getAllProjects()

  // Filter out the current project
  const otherProjects = allProjects.filter((p) => p.slug !== project.slug)

  // Calculate relevance score based on tag matches
  const projectsWithScore = otherProjects.map((p) => {
    let score = 0
    if (p.tags) {
      // Count matching tags
      project.tags!.forEach((tag) => {
        if (p.tags!.includes(tag)) {
          score++
        }
      })
    }
    return { project: p, score }
  })

  // Sort by score (highest first) and take the top 'limit' projects
  return projectsWithScore
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0) // Only include projects with at least one matching tag
    .slice(0, limit)
    .map((item) => item.project)
}
