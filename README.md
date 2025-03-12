
# NextJS Portfolio Template

## Overview
A modern, responsive portfolio website built with Next.js and Tailwind CSS. This template allows professionals to showcase their projects, skills, and experience with a clean, customizable interface.

## Features
- Responsive design that works on all device sizes
- Project portfolio with filtering by tags
- Markdown support for project content
- Image galleries and YouTube video embedding
- Dynamic routing for project pages
- Custom sections for problems, solutions, and features
- Environment variable configuration for easy customization

## Technologies Used
- JavaScript/TypeScript
- Next.js (React framework)
- Tailwind CSS
- Radix UI for accessible components
- Remark for Markdown processing
- Gray Matter for frontmatter parsing

## Installation & Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/nextjs-portfolio-template.git

# Navigate to the directory
cd nextjs-portfolio-template

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your own information

# Run the development server
npm run dev
```

## Usage
To add a new project to your portfolio:

1. Create a new markdown file in the `content/projects` directory:

```markdown
---
title: "My Amazing Project"
date: "2023-05-01"
summary: "A brief summary of the project"
problem: "The problem this project solves"
solution: "How this project solves the problem"
image: "/media/projects/project-image.jpg"
tags: ["React", "TypeScript", "API"]
features:
  - title: "Key Feature"
    description: "Description of this feature"
---

## Project Details
Detailed information about your project...
```

2. Add project images to the `public/media/projects` directory.

3. Customize the site content in the environment variables.

## Project Structure
```
project-root/
│
├── app/                # Next.js app directory
│   ├── projects/       # Project page routes
│   ├── about/          # About page
│   ├── globals.css     # Global styles
│   └── page.tsx        # Homepage
│
├── components/         # React components
│   ├── ui/             # UI components
│   └── portfolio-section.tsx  # Portfolio display
│
├── content/            # Markdown content
│   └── projects/       # Project markdown files
│
├── lib/                # Utility functions
│   └── markdown.ts     # Markdown processing
│
├── public/             # Static assets
│   └── media/          # Images
│
└── tailwind.config.js  # Tailwind configuration
```

## Learning Outcomes
- Implementation of dynamic routing in Next.js
- Creating a type-safe content management system with TypeScript
- Building responsive UI components with Tailwind CSS
- Creating a flexible project showcase with filtering capabilities
- Integrating Markdown for rich content management

## Future Improvements
- Dark mode support
- Blog section with categories and tags
- Contact form integration
- Analytics integration

## License
MIT License - See LICENSE file for details

## Acknowledgements
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Remark](https://github.com/remarkjs/remark)
