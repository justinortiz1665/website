
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
  siteName: getEnv('SITE_NAME', 'Next.js Portfolio'),
  siteDescription: getEnv('SITE_DESCRIPTION', 'A portfolio built with Next.js'),
  blogUrl: getEnv('BLOG_URL', '')
})
