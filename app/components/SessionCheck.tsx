"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SessionCheck() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log("Session active:", session.user)
      router.push("/")
    } else if (status === "loading") {
      console.log("Loading session...")
    } else {
      console.log("No session")
    }
  }, [session, status, router])

  return null
} 