"use client"

import { useGallery } from "../context/GalleryContext"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Gallery() {
  const { gallery, removeFromGallery } = useGallery()

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = "generated-image.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {gallery.map((imageUrl, index) => (
        <Card key={index}>
          <CardContent className="p-2">
            <img src={imageUrl || "/placeholder.svg"} alt={`Generated ${index}`} className="w-full h-auto" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => downloadImage(imageUrl)}>Download</Button>
            <Link href={`/personalize?image=${encodeURIComponent(imageUrl)}`}>
              <Button>Apply to Card</Button>
            </Link>
            <Button variant="destructive" onClick={() => removeFromGallery(imageUrl)}>
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

