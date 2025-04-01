"use client"

import type React from "react"
import { Trash, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Exercise, Set } from "@/types/workout"

interface ExerciseInputProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
  onRemove: () => void
  canRemove: boolean
}

export function ExerciseInput({ exercise, onChange, onRemove, canRemove }: ExerciseInputProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...exercise, name: e.target.value })
  }

  const handleAddSet = () => {
    onChange({
      ...exercise,
      sets: [...exercise.sets, { reps: "", weight: "" }],
    })
  }

  const handleRemoveSet = (index: number) => {
    const newSets = [...exercise.sets]
    newSets.splice(index, 1)
    onChange({ ...exercise, sets: newSets })
  }

  const handleSetChange = (index: number, field: keyof Set, value: string) => {
    const newSets = [...exercise.sets]
    newSets[index] = { ...newSets[index], [field]: value }
    onChange({ ...exercise, sets: newSets })
  }

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={`exercise-${exercise.id}`}>Exercise Name</Label>
        {canRemove && (
          <Button type="button" variant="ghost" size="sm" onClick={onRemove} className="h-8 w-8 p-0 text-destructive">
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove exercise</span>
          </Button>
        )}
      </div>

      <Input
        id={`exercise-${exercise.id}`}
        placeholder="e.g., Bench Press, Squats, etc."
        value={exercise.name}
        onChange={handleNameChange}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Sets</Label>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleAddSet} className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add set</span>
            </Button>

            {exercise.sets.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveSet(exercise.sets.length - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Remove set</span>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {exercise.sets.map((set, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor={`set-${exercise.id}-${index}-reps`} className="text-xs">
                  Reps
                </Label>
                <Input
                  id={`set-${exercise.id}-${index}-reps`}
                  placeholder="e.g., 10, 8-12"
                  value={set.reps}
                  onChange={(e) => handleSetChange(index, "reps", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor={`set-${exercise.id}-${index}-weight`} className="text-xs">
                  Weight
                </Label>
                <Input
                  id={`set-${exercise.id}-${index}-weight`}
                  placeholder="e.g., 135, 60kg"
                  value={set.weight}
                  onChange={(e) => handleSetChange(index, "weight", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

