"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Network } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to add background to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    // If we're not on the homepage, navigate to homepage first
    if (pathname !== "/") {
      router.push(`/${sectionId}`)
      return
    }

    // Find the section element
    const section = document.getElementById(sectionId)
    if (section) {
      // Scroll to the section
      window.scrollTo({
        top: section.offsetTop - 80, // Offset for header height
        behavior: "smooth",
      })

      // Update URL without page reload
      window.history.pushState({}, "", `/#${sectionId}`)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="#top" className="flex items-center gap-2" onClick={(e) => handleNavClick(e, "top")}>
            <Network className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">mure.my</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#top"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-foreground" : "text-muted-foreground",
            )}
            onClick={(e) => handleNavClick(e, "top")}
          >
            Home
          </a>
          <a
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            onClick={(e) => handleNavClick(e, "features")}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            onClick={(e) => handleNavClick(e, "pricing")}
          >
            Pricing
          </a>
          <a
            href="/login"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/login" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Login
          </a>
          <Button asChild>
            <a href="/login">Get Started</a>
          </Button>
        </nav>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}

