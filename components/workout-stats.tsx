"use client"

import { useState, useEffect } from "react"
import { Activity, Dumbbell, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getWorkouts } from "@/lib/workouts"
import type { Workout } from "@/types/workout"

export function WorkoutStats() {
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    thisMonth: 0,
    streak: 0,
  })

  useEffect(() => {
    const workouts = getWorkouts()
    if (workouts.length === 0) return

    const now = new Date()
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const oneMonthAgo = new Date(now)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const thisWeek = workouts.filter((w) => new Date(w.date) >= oneWeekAgo).length
    const thisMonth = workouts.filter((w) => new Date(w.date) >= oneMonthAgo).length

    // Calculate streak (consecutive days with workouts)
    const streak = calculateStreak(workouts)

    setStats({
      total: workouts.length,
      thisWeek,
      thisMonth,
      streak,
    })
  }, [])

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
      <Card className="p-4 w-[280px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-xs font-medium">Total Workouts</CardTitle>
          <Dumbbell className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Workouts logged</p>
        </CardContent>
      </Card>

      <Card className="p-4 w-[280px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-xs font-medium">This Week</CardTitle>
          <Calendar className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-xl font-bold">{stats.thisWeek}</div>
          <p className="text-xs text-muted-foreground">Workouts this week</p>
        </CardContent>
      </Card>

      <Card className="p-4 w-[280px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-xs font-medium">This Month</CardTitle>
          <Activity className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-xl font-bold">{stats.thisMonth}</div>
          <p className="text-xs text-muted-foreground">Workouts this month</p>
        </CardContent>
      </Card>

      <Card className="p-4 w-[280px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-xs font-medium">Current Streak</CardTitle>
          <TrendingUp className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-xl font-bold">{stats.streak}</div>
          <p className="text-xs text-muted-foreground">Consecutive days</p>
        </CardContent>
      </Card>
    </div>
  )
}

function calculateStreak(workouts: Workout[]): number {
  if (workouts.length === 0) return 0

  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Check if there's a workout today
  const today = new Date().toISOString().split("T")[0]
  const hasWorkoutToday = sortedWorkouts.some((w) => w.date === today)

  if (!hasWorkoutToday && sortedWorkouts[0].date !== yesterday()) {
    return 0 // Streak broken if no workout today or yesterday
  }

  // Count consecutive days
  let streak = hasWorkoutToday ? 1 : 0
  let currentDate = hasWorkoutToday ? today : sortedWorkouts[0].date

  // Create a set of dates with workouts for faster lookup
  const workoutDates = new Set(sortedWorkouts.map((w) => w.date))

  // Check previous days
  while (true) {
    const prevDate = getPreviousDay(currentDate)
    if (workoutDates.has(prevDate)) {
      streak++
      currentDate = prevDate
    } else {
      break
    }
  }

  return streak
}

function yesterday(): string {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().split("T")[0]
}

function getPreviousDay(dateString: string): string {
  const date = new Date(dateString)
  date.setDate(date.getDate() - 1)
  return date.toISOString().split("T")[0]
}

