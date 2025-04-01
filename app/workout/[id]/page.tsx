"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getWorkoutById, deleteWorkout } from "@/lib/workouts"
import type { Workout } from "@/types/workout"

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
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

  const handleDelete = () => {
    if (workout) {
      deleteWorkout(workout.id)
      router.push("/")
    }
  }

  if (!workout) {
    return <div className="container py-6">Loading...</div>
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">{workout.name}</h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{format(new Date(workout.date), "MMMM d, yyyy")}</span>
          </div>
        </div>

        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/edit-workout/${workout.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your workout and remove the data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant={getWorkoutBadgeVariant(workout.type)}>{formatWorkoutType(workout.type)}</Badge>
        <Badge variant="outline">
          {workout.exercises.length} exercise{workout.exercises.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {workout.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{workout.notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Exercises</h2>

        {workout.exercises.map((exercise, index) => (
          <Card key={exercise.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-4">
                    <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                      {setIndex + 1}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{set.reps || "-"} reps</Badge>
                      <Badge variant="outline">{set.weight || "-"}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getWorkoutBadgeVariant(type: string) {
  switch (type) {
    case "strength":
      return "default"
    case "cardio":
      return "secondary"
    case "hiit":
      return "destructive"
    case "flexibility":
      return "outline"
    default:
      return "secondary"
  }
}

function formatWorkoutType(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

