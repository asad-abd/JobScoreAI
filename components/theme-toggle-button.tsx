"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

/**
 * Renders a fixed toggle button to switch between dark and light themes.
 * Defaults to dark and does not respect system preference.
 */
export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === "dark" || theme == null

  return (
    <div className="fixed top-3 right-3 md:top-4 md:right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <Sun className={isDark ? "hidden h-5 w-5" : "h-5 w-5"} />
        <Moon className={isDark ? "h-5 w-5" : "hidden h-5 w-5"} />
      </Button>
    </div>
  )
}


