import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkoutList } from "@/components/workout-list"
import { WorkoutStats } from "@/components/workout-stats"

export default function HomePage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workout Tracker</h1>
          <p className="text-muted-foreground">Track your gym progress and stay motivated</p>
        </div>
        <Link href="/add-workout">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Workout
          </Button>
        </Link>
      </div>

      <WorkoutStats />

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
        <WorkoutList />
      </div>
    </div>
  )
}

