"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ExerciseInput } from "@/components/exercise-input"
import { addWorkout } from "@/lib/workouts"
import type { Exercise } from "@/types/workout"

export default function AddWorkoutPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [type, setType] = useState("strength")
  const [notes, setNotes] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([{ id: "1", name: "", sets: [{ reps: "", weight: "" }] }])

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: "",
        sets: [{ reps: "", weight: "" }],
      },
    ])
  }

  const handleExerciseChange = (updatedExercise: Exercise, index: number) => {
    const newExercises = [...exercises]
    newExercises[index] = updatedExercise
    setExercises(newExercises)
  }

  const handleRemoveExercise = (index: number) => {
    const newExercises = [...exercises]
    newExercises.splice(index, 1)
    setExercises(newExercises)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!name || !date || !type) return

    // Filter out empty exercises
    const validExercises = exercises.filter((ex) => ex.name.trim() !== "")

    if (validExercises.length === 0) return

    const workout = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      date,
      type,
      notes,
      exercises: validExercises,
      createdAt: new Date().toISOString(),
    }

    addWorkout(workout)
    router.push("/")
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Workout</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Workout Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workout Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Leg Day, Upper Body, etc."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Workout Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="How did the workout feel? Any achievements?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Exercises</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddExercise}>
                  Add Exercise
                </Button>
              </div>

              {exercises.map((exercise, index) => (
                <ExerciseInput
                  key={exercise.id}
                  exercise={exercise}
                  onChange={(updatedExercise) => handleExerciseChange(updatedExercise, index)}
                  onRemove={() => handleRemoveExercise(index)}
                  canRemove={exercises.length > 1}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button type="submit">Save Workout</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

