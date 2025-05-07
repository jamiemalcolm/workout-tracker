import { auth, providers } from "@/auth"
import SignInSection from "./components/SignInSection"
import { WorkoutList } from "@/components/workout-list"
import { WorkoutStats } from "@/components/workout-stats"
import { Button } from "@/components/ui/button"
import { Navbar } from "./components/Navbar"
import Link from "next/link"
import { Plus, Dumbbell, Activity, TrendingUp } from "lucide-react"
import { AvatarUpload } from "./components/AvatarUpload"

export default async function Home() {
  const session = await auth()
  const providersMap = providers.reduce((acc, provider) => {
    acc[provider.id] = {
      id: provider.id,
      name: provider.name
    }
    return acc
  }, {} as Record<string, { id: string; name: string }>)

  if (!session?.user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-16 px-6 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-col items-center gap-8 text-center w-full">
            <div className="flex items-center gap-3">
              <Dumbbell className="h-12 w-12 text-blue-500" />
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                Workout Tracker
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl">
              Track your fitness journey with ease. Monitor your progress, set goals, and achieve your fitness dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-3xl">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Activity className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
              <p className="text-gray-400">Monitor your workouts and see your improvement over time</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Dumbbell className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Log Workouts</h3>
              <p className="text-gray-400">Record your exercises, sets, and reps with ease</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <TrendingUp className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Set Goals</h3>
              <p className="text-gray-400">Define your fitness objectives and track your achievements</p>
            </div>
          </div>

          <div className="w-full max-w-md">
            <SignInSection providers={providersMap} />
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container max-w-5xl mx-auto py-8 space-y-8 px-6 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AvatarUpload image={session.user.image} name={session.user.name} />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-muted-foreground">Track and manage your workouts</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/add-workout">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Workout
              </Button>
            </Link>
          </div>

          <div className="flex justify-center">
            <WorkoutStats />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Recent Workouts</h2>
            <WorkoutList />
          </div>
        </div>
      </main>
    </>
  )
}

