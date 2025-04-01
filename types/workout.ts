export interface Set {
  reps: string
  weight: string
}

export interface Exercise {
  id: string
  name: string
  sets: Set[]
}

export interface Workout {
  id: string
  name: string
  date: string
  type: string
  notes: string
  exercises: Exercise[]
  createdAt: string
}

