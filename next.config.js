
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add rewrites for SPA-like behavior
  trailingSlash: true,
  // Disable image optimization which requires server components
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
