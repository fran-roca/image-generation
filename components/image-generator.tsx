"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useGallery } from "../context/GalleryContext"
import { Loader2 } from "lucide-react"

const styles = [
  { value: "minimalist", label: "Minimalist" },
  { value: "abstract", label: "Abstract" },
  { value: "geometric", label: "Geometric" },
  { value: "nature", label: "Nature-inspired" },
  { value: "futuristic", label: "Futuristic" },
]

const techniques = [
  { value: "low-angle", label: "Low-angle view" },
  { value: "dramatic-lighting", label: "Dramatic lighting" },
  { value: "macro", label: "Macro perspective" },
  { value: "aerial", label: "Aerial view" },
  { value: "symmetrical", label: "Symmetrical composition" },
]

const moods = [
  { value: "energetic", label: "Energetic" },
  { value: "professional", label: "Professional" },
  { value: "luxurious", label: "Luxurious" },
  { value: "peaceful", label: "Peaceful" },
  { value: "dynamic", label: "Dynamic" },
]

export default function ImageGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const { addToGallery } = useGallery()
  const [formData, setFormData] = useState({
    subject: "",
    style: "",
    technique: "",
    mood: "",
  })

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Create prompt from form data. Keep in code as example only.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prompt = `Create a high-impact image of ${formData.subject} that captures a ${formData.style} vision. 
                   Render the subject with detailed, photorealistic techniques, showcasing elements such as 
                   ${formData.technique} to emphasize depth and clarity. Infuse the scene with a ${formData.mood} 
                   ambiance, while seamlessly integrating Mastercard's signature color palette.`

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const newImageUrl = `https://picsum.photos/seed/${Date.now()}/800/600`
    setImageUrl(newImageUrl)
    addToGallery(newImageUrl)

    setIsLoading(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Generate Your Card Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={generateImage} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">What would you like to create?</Label>
            <Input
              id="subject"
              placeholder="Describe your main subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Choose a style</Label>
              <Select value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Choose a technique</Label>
              <Select
                value={formData.technique}
                onValueChange={(value) => setFormData({ ...formData, technique: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technique" />
                </SelectTrigger>
                <SelectContent>
                  {techniques.map((technique) => (
                    <SelectItem key={technique.value} value={technique.value}>
                      {technique.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Choose a mood</Label>
              <Select value={formData.mood} onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map((mood) => (
                    <SelectItem key={mood.value} value={mood.value}>
                      {mood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formData.subject || !formData.style || !formData.technique || !formData.mood}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <AnimatePresence>
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Generated"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  )
}

