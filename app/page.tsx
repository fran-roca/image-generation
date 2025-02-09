import ImageGenerator from "@/components/image-generator"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Card Personalizer</h1>
        <p className="text-center text-gray-600 mb-8">
          Create unique card designs using AI. Choose your style, technique, and mood to generate the perfect image for
          your card.
        </p>
        <ImageGenerator />
      </div>
    </main>
  )
}

