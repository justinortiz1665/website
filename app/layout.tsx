import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getSiteConfig } from "@/lib/env"

const inter = Inter({ subsets: ["latin"] })
const { siteName, siteDescription } = getSiteConfig()

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

