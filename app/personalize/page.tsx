"use client"

import { useGallery } from "../../context/GalleryContext"
import CardPersonalizer from "@/components/card-personalizer"

export default function PersonalizePage() {
  const { gallery } = useGallery()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Personalize Your Card</h1>
      <CardPersonalizer images={gallery} />
    </main>
  )
}

