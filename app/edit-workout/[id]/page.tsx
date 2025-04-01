"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ExerciseInput } from "@/components/exercise-input"
import { getWorkoutById, updateWorkout } from "@/lib/workouts"
import type { Exercise, Workout } from "@/types/workout"

export default function EditWorkoutPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [workout, setWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    const foundWorkout = getWorkoutById(params.id)
    if (!foundWorkout) {
      router.push("/")
      return
    }

    setWorkout(foundWorkout)
  }, [params.id, router])

  if (!workout) {
    return <div className="container py-6">Loading...</div>
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, name: e.target.value })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, date: e.target.value })
  }

  const handleTypeChange = (value: string) => {
    setWorkout({ ...workout, type: value })
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkout({ ...workout, notes: e.target.value })
  }

  const handleAddExercise = () => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises,
        {
          id: Math.random().toString(36).substring(2, 9),
          name: "",
          sets: [{ reps: "", weight: "" }],
        },
      ],
    })
  }

  const handleExerciseChange = (updatedExercise: Exercise, index: number) => {
    const newExercises = [...workout.exercises]
    newExercises[index] = updatedExercise
    setWorkout({ ...workout, exercises: newExercises })
  }

  const handleRemoveExercise = (index: number) => {
    const newExercises = [...workout.exercises]
    newExercises.splice(index, 1)
    setWorkout({ ...workout, exercises: newExercises })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!workout.name || !workout.date || !workout.type) return

    // Filter out empty exercises
    const validExercises = workout.exercises.filter((ex) => ex.name.trim() !== "")

    if (validExercises.length === 0) return

    const updatedWorkout = {
      ...workout,
      exercises: validExercises,
    }

    updateWorkout(updatedWorkout)
    router.push(`/workout/${workout.id}`)
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Workout</h1>

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
                  value={workout.name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={workout.date} onChange={handleDateChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Workout Type</Label>
              <Select value={workout.type} onValueChange={handleTypeChange}>
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
                value={workout.notes}
                onChange={handleNotesChange}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Exercises</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddExercise}>
                  Add Exercise
                </Button>
              </div>

              {workout.exercises.map((exercise, index) => (
                <ExerciseInput
                  key={exercise.id}
                  exercise={exercise}
                  onChange={(updatedExercise) => handleExerciseChange(updatedExercise, index)}
                  onRemove={() => handleRemoveExercise(index)}
                  canRemove={workout.exercises.length > 1}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push(`/workout/${workout.id}`)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

