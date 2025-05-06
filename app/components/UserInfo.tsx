"use client"

import { useSession } from "next-auth/react"
import { signOut } from "@/auth"

export default function UserInfo() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="p-4 rounded-lg bg-white shadow-md">
        <div className="flex items-center gap-4">
          {session.user.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || "User"} 
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{session.user.name}</h2>
            <p className="text-gray-600">{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ redirectTo: "/auth/signin" })}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return null
} 