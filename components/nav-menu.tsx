"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/personalize", label: "Personalize Card" },
]

export function NavMenu() {
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-[#EB001B] to-[#F79E1B] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="flex items-center py-4 px-2">
              <span className="font-semibold text-white text-lg">AI Card Personalizer</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-4 px-2 text-white font-semibold hover:bg-white/20 transition duration-300",
                    pathname === link.href && "bg-white/20",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className="w-6 h-6 text-white hover:text-gray-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

