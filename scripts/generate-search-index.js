
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Define paths
const contentDirectory = path.join(process.cwd(), 'content');
const projectsDirectory = path.join(contentDirectory, 'projects');
const outputPath = path.join(process.cwd(), 'public', 'search-index.json');

function getProjectSlugs() {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }
    return fs.readdirSync(projectsDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading project directory:", error);
    return [];
  }
}

function getProjectBySlug(slug) {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      ...data,
      content
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

function getAllProjects() {
  const slugs = getProjectSlugs();
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== null)
    .filter((project) => !project.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateSearchIndex() {
  const searchResults = [];
  
  // Add projects to search index
  const projects = getAllProjects();
  
  projects.forEach((project) => {
    searchResults.push({
      title: project.title,
      content: project.summary || "",
      url: `/projects/${project.slug}`,
      type: 'project',
      tags: project.tags,
      image: typeof project.image === 'string' ? project.image : 
             typeof project.image === 'object' ? project.image.src : undefined
    });
  });
  
  // Add static pages to search index
  searchResults.push({
    title: "About",
    content: "About page with information about Justin Ortiz",
    url: "/about",
    type: 'page'
  });
  
  searchResults.push({
    title: "Home",
    content: "Justin Ortiz portfolio homepage",
    url: "/",
    type: 'page'
  });

  return searchResults;
}

// Generate and save the search index
const searchIndex = generateSearchIndex();
fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
console.log(`Search index generated at ${outputPath}`);
