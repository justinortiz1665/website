
# Portfolio Template - Next.js

A modern, responsive portfolio website template built with Next.js and Tailwind CSS. This template allows professionals to showcase their projects, skills, and experience with a clean, customizable interface.

![Portfolio Template Preview](https://via.placeholder.com/800x400/000000/FFFFFF?text=Portfolio+Template+Preview)

## ✨ Features

- **🎨 Modern Design**: Clean, professional layout with responsive design
- **📱 Mobile-First**: Works perfectly on all device sizes
- **🏷️ Project Filtering**: Dynamic portfolio with tag-based filtering
- **📝 Markdown Support**: Easy content management with Markdown
- **🎬 Media Rich**: Support for images, YouTube videos, and galleries
- **🔗 Dynamic Routing**: Automatic page generation for projects
- **⚡ Fast Performance**: Optimized with Next.js 14 and static generation
- **🎛️ Easy Customization**: Environment variables for quick personalization
- **♿ Accessible**: Built with accessibility best practices

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-template.git
   cd portfolio-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Option 1: Full configuration (recommended)
   cp .env.example .env
   
   # Option 2: Quick start with minimal config
   cp .env.local.example .env
   ```
   **Important:** You must create a `.env` file for the site to work properly. Open `.env` and replace all placeholder values with your own information.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📝 Customization Guide

> **⚠️ Important:** You must create a `.env` file before the site will work properly. Copy `.env.example` to `.env` and customize it with your information.

### 1. Basic Information
Edit your `.env` file to customize the basic information:

```env
# Your professional title and subtitle
NEXT_PUBLIC_HERO_TITLE=Your Professional Title
NEXT_PUBLIC_HERO_SUBTITLE=Your compelling subtitle

# About page content
NEXT_PUBLIC_ABOUT_INTRO=Hi, I'm [Your Name].
NEXT_PUBLIC_ABOUT_LOCATION=Currently based in [Your Location].
# ... (see .env.example for all options)
```

### 2. Social Media Links
Update your social media profiles:

```env
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourusername
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourusername
```

### 3. Images and Media
Replace placeholder images with your own:

```env
NEXT_PUBLIC_AVATAR_URL=https://your-domain.com/avatar.jpg
NEXT_PUBLIC_DEFAULT_PROJECT_IMAGE=https://your-domain.com/project-default.jpg
```

You can use:
- **Absolute URLs** (recommended for production)
- **Local paths** (place images in `/public/` directory)

### 4. Adding Projects

Create new project files in the `content/projects/` directory:

```markdown
---
title: "Your Project Name"
date: "2024-01-15"
summary: "Brief description of your project"
problem: "What problem does this project solve?"
solution: "How does your project solve this problem?"
image: "/media/projects/your-project-image.jpg"
tags: ["React", "TypeScript", "Node.js"]
githubUrl: "https://github.com/yourusername/project"
features:
  - title: "Feature Name"
    description: "Description of this feature"
---

## Project Overview
Write detailed information about your project here...
```

### 5. Styling and Layout
The template uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component styles throughout the codebase

## 🗂️ Project Structure

```
portfolio-template/
├── app/                    # Next.js 14 App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Dynamic project pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── portfolio-section.tsx
│   ├── header.tsx
│   └── footer.tsx
├── content/              # Markdown content
│   └── projects/         # Project markdown files
├── lib/                  # Utility functions
│   ├── env.ts           # Environment helpers
│   ├── markdown.ts      # Markdown processing
│   └── utils.ts         # General utilities
├── public/               # Static assets
│   └── media/           # Images and media
└── .env.example         # Environment template
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## 🎨 Customization Options

### Colors and Branding
Edit `tailwind.config.js` to customize your color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      }
    }
  }
}
```

### Typography
The template uses Inter font by default. You can change this in `app/layout.tsx`.

### Adding New Pages
1. Create a new directory in `app/`
2. Add a `page.tsx` file
3. Update navigation in `components/header.tsx`

## 📚 Technologies Used

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Content**: Markdown with Gray Matter
- **Icons**: Lucide React
- **Deployment**: Vercel, Netlify, or static export

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Build the project: `npm run build && npm run export`
2. Upload the `out/` directory to Netlify
3. Configure environment variables

### Static Export
For static hosting:
```bash
npm run build
npm run export
```
Upload the `out/` directory to your hosting provider.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Lucide](https://lucide.dev/) - Beautiful icons

## 🔧 Troubleshooting

### Development Server Won't Start

**Problem:** "This site can't be reached" or "ERR_CONNECTION_REFUSED"

**Solutions:**
1. **Missing .env file** - The most common issue
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your information. The site won't work without this file.

2. **Port conflicts** - Try a different port
   ```bash
   npm run dev -- --port 3001
   # or
   npm run dev -- --port 8080
   ```

3. **Clear previous processes**
   ```bash
   # Kill any existing Node processes
   killall node
   # Then restart
   npm run dev
   ```

4. **Network/Firewall issues**
   - Try `http://127.0.0.1:3000` instead of `localhost:3000`
   - Check your firewall or antivirus settings
   - Disable VPN temporarily if using one

5. **Use static build as fallback**
   ```bash
   npm run build
   # Open out/index.html in your browser
   ```

### Build Errors

**Problem:** Build fails with TypeScript or linting errors

**Solution:**
```bash
# Check for errors
npm run lint
# Auto-fix what's possible
npm run lint -- --fix
```

### Missing Images

**Problem:** Images not loading or showing broken links

**Solutions:**
1. Add images to `/public/media/projects/`
2. Use absolute URLs in your `.env` file
3. Update image paths in your project markdown files

### Environment Variables Not Working

**Problem:** Still seeing placeholder text

**Solutions:**
1. Restart the development server after changing `.env`
2. Make sure all variables start with `NEXT_PUBLIC_`
3. Check there are no spaces around the `=` in your `.env` file

## 💬 Support

If you have questions or need help customizing the template:
- Check the troubleshooting section above
- Look at the example projects in `content/projects/`
- Review the `.env.example` file for configuration options

---

**Happy building!** 🎉
