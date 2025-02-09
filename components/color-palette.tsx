import { cn } from "@/lib/utils"

interface ColorPaletteProps {
  onSelectFilter: (filter: string) => void
  currentFilter: string
}

export function ColorPalette({ onSelectFilter, currentFilter }: ColorPaletteProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => onSelectFilter("none")}
        className={cn(
          "w-8 h-8 rounded-full border-2 border-gray-300 transition-transform",
          currentFilter === "none" && "scale-110",
        )}
      />
      <button
        onClick={() => onSelectFilter("mastercard")}
        className={cn(
          "w-8 h-8 rounded-full bg-gradient-to-r from-[#EB001B] to-[#F79E1B] transition-transform",
          currentFilter === "mastercard" && "scale-110",
        )}
      />
      <button
        onClick={() => onSelectFilter("black")}
        className={cn("w-8 h-8 rounded-full bg-black transition-transform", currentFilter === "black" && "scale-110")}
      />
    </div>
  )
}

