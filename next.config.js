/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export for HostGator
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig