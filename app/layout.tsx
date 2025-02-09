import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GalleryProvider } from "../context/GalleryContext"
import { NavMenu } from "@/components/nav-menu"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Card Personalizer",
  description: "Personalize your debit/credit card with AI-generated images",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen`}>
        <GalleryProvider>
          <NavMenu />
          {children}
        </GalleryProvider>
      </body>
    </html>
  )
}

