// Environment variable utility functions

/**
 * Get an environment variable with a fallback value
 */
export const getEnv = (key: string, fallback: string = ''): string => {
  const value = process.env[`NEXT_PUBLIC_${key}`] 
  return value || fallback
}

// Social media links
export const getSocialLinks = () => ({
  twitter: getEnv('TWITTER_URL', 'https://twitter.com'),
  github: getEnv('GITHUB_URL', 'https://github.com'),
  linkedin: getEnv('LINKEDIN_URL', 'https://linkedin.com'),
  youtube: getEnv('YOUTUBE_URL', 'https://youtube.com'),
  instagram: getEnv('INSTAGRAM_URL', 'https://instagram.com'),
  blog: getEnv('BLOG_URL', 'https://substack.com')
})

// Media URLs
export const getMediaUrls = () => ({
  avatar: getEnv('AVATAR_URL', '/placeholder.svg'),
  logo: getEnv('LOGO_URL', '/placeholder.svg'),
  defaultProjectImage: getEnv('DEFAULT_PROJECT_IMAGE', '/placeholder.svg')
})

// Site configuration
export const getSiteConfig = () => ({
  siteName: getEnv('SITE_NAME', 'Your Name - Portfolio'),
  siteDescription: getEnv('SITE_DESCRIPTION', 'Professional portfolio showcasing projects and experience'),
  blogUrl: getEnv('BLOG_URL', ''),
  email: getEnv('EMAIL', 'your.email@example.com')
})

// Homepage content
export const getHomepageContent = () => ({
  heroTitle: getEnv('HERO_TITLE', 'Your Professional Title'),
  heroSubtitle: getEnv('HERO_SUBTITLE', 'Your compelling subtitle that describes what you do')
})

// About page content
export const getAboutContent = () => ({
  title: getEnv('ABOUT_TITLE', 'About Me'),
  intro: getEnv('ABOUT_INTRO', "Hi, I'm [Your Name]."),
  location: getEnv('ABOUT_LOCATION', 'Currently based in [Your Location].'),
  tagline: getEnv('ABOUT_TAGLINE', "I'm a [your profession/passion]."),
  background: getEnv('ABOUT_BACKGROUND', 'Brief description of your background and interests.'),
  journey1: getEnv('ABOUT_JOURNEY_1', 'Describe your professional journey, key experiences, and what you\'ve learned along the way. Share the highlights of your career path and the experiences that shaped you.'),
  journey2: getEnv('ABOUT_JOURNEY_2', 'Continue your story here. Talk about transitions in your career, new skills you\'re developing, or directions you\'re heading in your professional life.'),
  philosophy1: getEnv('ABOUT_PHILOSOPHY_1', 'Share the principles that guide your work and life. What values are important to you?'),
  philosophy2: getEnv('ABOUT_PHILOSOPHY_2', 'Elaborate on your approach to work, problem-solving, or life in general. What drives you?'),
  work: getEnv('ABOUT_WORK', 'Describe what you do, what you\'re passionate about creating, and what makes you excited about your work.'),
  quote: getEnv('ABOUT_QUOTE', 'Your favorite inspirational quote here'),
  quoteAuthor: getEnv('ABOUT_QUOTE_AUTHOR', 'Quote Author'),
  connect: getEnv('ABOUT_CONNECT', 'If you\'d like to learn more or follow my journey, feel free to reach out. I love collaborating, discovering something new, and building connections within the community.'),
  personalNote: getEnv('ABOUT_PERSONAL_NOTE', 'Add a personal touch here - maybe a hobby, interest, or fun fact that helps people connect with you!')
})