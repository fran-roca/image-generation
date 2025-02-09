"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ColorPalette } from "./color-palette"

interface CardPersonalizerProps {
  images: string[]
}

export default function CardPersonalizer({ images }: CardPersonalizerProps) {
  const [cardImage, setCardImage] = useState(images[0] || "")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOrdering, setIsOrdering] = useState(false)
  const [colorFilter, setColorFilter] = useState("none")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const applyToCard = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const img = new Image()
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Apply color filter
          if (colorFilter === "mastercard") {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
            gradient.addColorStop(0, "rgba(235, 0, 27, 0.7)") // Mastercard red
            gradient.addColorStop(1, "rgba(247, 158, 27, 0.7)") // Mastercard orange
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          } else if (colorFilter === "black") {
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }

          // Add card details
          ctx.fillStyle = "white"
          ctx.font = "20px Arial"
          ctx.fillText("John Doe", 20, canvas.height - 60)

          ctx.font = "16px Arial"
          ctx.fillText("**** **** **** 1234", 20, canvas.height - 30)

          // Add Mastercard logo
          const logo = new Image()
          logo.onload = () => {
            ctx.drawImage(logo, canvas.width - 80, 20, 60, 40)
          }
          logo.src = "/mastercard-logo.png"
        }
        img.crossOrigin = "anonymous"
        img.src = cardImage
      }
    }
  }

  // Update effect to watch for both image and filter changes
  useEffect(() => {
    if (cardImage) {
      applyToCard()
    }
  }, [cardImage, colorFilter, applyToCard]) // Added applyToCard to dependencies

  const orderCard = () => {
    setIsOrdering(true)
    setTimeout(() => {
      setIsOrdering(false)
      alert("Card ordered successfully!")
    }, 2000)
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setCardImage(images[(currentIndex + 1) % images.length])
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setCardImage(images[(currentIndex - 1 + images.length) % images.length])
  }

  const getVisibleImages = () => {
    const result = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % images.length
      result.push({ image: images[index], index })
    }
    return result
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden mb-8">
        <div className="flex items-center justify-center">
          <Button variant="outline" size="icon" onClick={prevImage} className="z-10 absolute left-4">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="w-full max-w-2xl overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: `-${currentIndex * 33.33}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {images.map((img, index) => (
                <motion.div key={img} className="flex-shrink-0 w-1/3">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Card design ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(index)
                      setCardImage(img)
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Button variant="outline" size="icon" onClick={nextImage} className="z-10 absolute right-4">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Personalized Card</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas
            ref={canvasRef}
            width={400}
            height={250}
            className="w-full h-auto rounded-xl overflow-hidden shadow-lg"
          />
          <ColorPalette onSelectFilter={setColorFilter} currentFilter={colorFilter} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <AnimatePresence mode="wait">
            {isOrdering ? (
              <motion.div
                key="ordering"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-green-500 font-semibold"
              >
                Ordering your card...
              </motion.div>
            ) : (
              <motion.div
                key="order-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button onClick={orderCard} size="lg">
                  Order Your Card
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </div>
  )
}

