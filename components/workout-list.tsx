"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Dumbbell, Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getWorkouts } from "@/lib/workouts"
import type { Workout } from "@/types/workout"

export function WorkoutList() {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    setWorkouts(getWorkouts())
  }, [])

  if (workouts.length === 0) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center px-4 sm:px-6">
          <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No workouts yet</h3>
          <p className="text-muted-foreground mb-4">Start tracking your fitness journey today</p>
          <Link href="/add-workout">
            <Button>Add Your First Workout</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Link key={workout.id} href={`/workout/${workout.id}`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <div className="flex justify-between items-start">
                <CardTitle>{workout.name}</CardTitle>
                <Badge variant={getWorkoutBadgeVariant(workout.type)}>{formatWorkoutType(workout.type)}</Badge>
              </div>
              <CardDescription className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(workout.date), "MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-sm text-muted-foreground">
                {workout.exercises.length} exercise{workout.exercises.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0 px-4 sm:px-6">
              <div className="text-xs text-muted-foreground">
                {workout.exercises
                  .slice(0, 3)
                  .map((ex) => ex.name)
                  .join(", ")}
                {workout.exercises.length > 3 ? "..." : ""}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardFooter>
          </Card>
        </Link>
      ))}
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
