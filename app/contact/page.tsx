
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/external-link"
import { getSocialLinks } from "@/lib/env"

export const metadata: Metadata = {
  title: "Contact",
}

export default function ContactPage() {
  const socialLinks = getSocialLinks()
  
  return (
    <div className="container flex flex-col gap-8 py-6 md:gap-12 md:py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {/* Image Section */}
        <div className="md:w-1/2 px-4 md:px-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src={process.env.NEXT_PUBLIC_DEFAULT_PROJECT_IMAGE || process.env.NEXT_PUBLIC_AVATAR_URL || "/placeholder.svg"}
              alt="Profile Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="md:w-1/2 px-4 md:px-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mb-6">
            Contact Me
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Justin Ortiz, ATC</h2>
              <p className="text-base text-muted-foreground sm:text-lg mb-6">
                I'm always open to new opportunities, collaborations, or just a friendly chat.
                Feel free to reach out through any of the channels below.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <ExternalLink 
                  href={socialLinks.linkedin} 
                  className="inline-flex items-center gap-2 text-lg font-medium hover:underline"
                >
                  <Button className="w-full text-white bg-primary hover:bg-black">Connect on LinkedIn</Button>
                </ExternalLink>
              </div>
              
              <div>
                <ExternalLink 
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'contact@example.com'}`} 
                  className="inline-flex items-center gap-2 text-lg font-medium hover:underline"
                >
                  <Button className="w-full text-white bg-primary hover:bg-black">Email Me</Button>
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
