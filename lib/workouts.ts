import type { Workout } from "@/types/workout"

const STORAGE_KEY = "workout-tracker-data"

export function getWorkouts(): Workout[] {
  if (typeof window === "undefined") return []

  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []

  try {
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to parse workouts data:", error)
    return []
  }
}

export function getWorkoutById(id: string): Workout | null {
  const workouts = getWorkouts()
  return workouts.find((workout) => workout.id === id) || null
}

export function addWorkout(workout: Workout): void {
  const workouts = getWorkouts()
  const updatedWorkouts = [workout, ...workouts]
  saveWorkouts(updatedWorkouts)
}

export function updateWorkout(updatedWorkout: Workout): void {
  const workouts = getWorkouts()
  const updatedWorkouts = workouts.map((workout) => (workout.id === updatedWorkout.id ? updatedWorkout : workout))
  saveWorkouts(updatedWorkouts)
}

export function deleteWorkout(id: string): void {
  const workouts = getWorkouts()
  const updatedWorkouts = workouts.filter((workout) => workout.id !== id)
  saveWorkouts(updatedWorkouts)
}

function saveWorkouts(workouts: Workout[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts))
}

