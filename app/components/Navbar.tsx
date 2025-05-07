"use client"

import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold">
            Workout Tracker
          </a>
        </div>
        <Button variant="ghost" size="sm" onClick={() => signOut({ redirectTo: "/" })}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  )
} 