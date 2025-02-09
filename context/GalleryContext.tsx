"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"

interface GalleryContextType {
  gallery: string[]
  addToGallery: (imageUrl: string) => void
  removeFromGallery: (imageUrl: string) => void
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<string[]>([])

  useEffect(() => {
    const storedGallery = localStorage.getItem("gallery")
    if (storedGallery) {
      setGallery(JSON.parse(storedGallery))
    }
  }, [])

  const addToGallery = (imageUrl: string) => {
    setGallery((prev) => {
      const newGallery = [...prev, imageUrl]
      localStorage.setItem("gallery", JSON.stringify(newGallery))
      return newGallery
    })
  }

  const removeFromGallery = (imageUrl: string) => {
    setGallery((prev) => {
      const newGallery = prev.filter((url) => url !== imageUrl)
      localStorage.setItem("gallery", JSON.stringify(newGallery))
      return newGallery
    })
  }

  return (
    <GalleryContext.Provider value={{ gallery, addToGallery, removeFromGallery }}>{children}</GalleryContext.Provider>
  )
}

export function useGallery() {
  const context = useContext(GalleryContext)
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider")
  }
  return context
}

