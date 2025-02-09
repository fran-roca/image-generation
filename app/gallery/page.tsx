"use client"

import { useState } from "react"
import { useGallery } from "../../context/GalleryContext"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Trash2, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  const { gallery, removeFromGallery } = useGallery()
  const [expandedImage, setExpandedImage] = useState<string | null>(null)

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = "generated-image.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((imageUrl, index) => (
          <motion.div
            key={index}
            layout
            className="relative group rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`Generated ${index}`}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => setExpandedImage(imageUrl)}
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" onClick={() => downloadImage(imageUrl)}>
                  <Download className="h-6 w-6 text-white" />
                </Button>
                <Link href={`/personalize?image=${encodeURIComponent(imageUrl)}`}>
                  <Button variant="ghost" size="icon">
                    <CreditCard className="h-6 w-6 text-white" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => removeFromGallery(imageUrl)}>
                  <Trash2 className="h-6 w-6 text-white" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setExpandedImage(null)}
          >
            <motion.img
              src={expandedImage}
              alt="Expanded"
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

