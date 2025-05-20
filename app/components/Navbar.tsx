"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function Navbar() {
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (response.ok) {
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold">
            Workout Tracker
          </a>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  )
} 