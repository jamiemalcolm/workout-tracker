"use client"

import { Camera } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface AvatarUploadProps {
  image?: string | null
  name?: string | null
}

export function AvatarUpload({ image, name }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [currentImage, setCurrentImage] = useState(image)
  const { toast } = useToast()

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setCurrentImage(data.url)
      toast({
        title: "Success",
        description: "Your avatar has been updated",
      })
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative group">
      <Avatar className="h-16 w-16">
        <AvatarImage src={currentImage || undefined} alt={name || "User"} />
        <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <label 
        htmlFor="avatar-upload" 
        className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity ${isUploading ? 'opacity-100' : ''}`}
      >
        {isUploading ? (
          <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Camera className="h-6 w-6 text-white" />
        )}
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarUpload}
          disabled={isUploading}
        />
      </label>
    </div>
  )
} 