"use client"

import { useState, useEffect } from "react"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface WorkoutCardProps {
  isActive: boolean
  workoutType: string
  workoutDuration: number
  onToggle: () => void
  onSaveDetails: (type: string, duration: number) => void
}

export function WorkoutCard({ isActive, workoutType, workoutDuration, onToggle, onSaveDetails }: WorkoutCardProps) {
  const [type, setType] = useState(workoutType)
  const [duration, setDuration] = useState(workoutDuration.toString())

  useEffect(() => {
    setType(workoutType)
    setDuration(workoutDuration.toString())
  }, [workoutType, workoutDuration])

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isActive
              ? "bg-emerald-500 text-white"
              : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          <Dumbbell className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Treino do Dia</h4>
          <p className="text-sm text-muted-foreground">{isActive ? "Concluido" : "Pendente"}</p>
        </div>
        <Switch checked={isActive} onCheckedChange={onToggle} />
      </div>

      {isActive && (
        <div className="mt-4 pt-4 border-t space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workout-type">Tipo de treino</Label>
            <Input
              id="workout-type"
              placeholder="Ex: Peito e Triceps"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workout-duration">Duracao (minutos)</Label>
            <Input
              id="workout-duration"
              type="number"
              placeholder="60"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onSaveDetails(type, Number.parseInt(duration) || 0)}
          >
            Salvar Detalhes
          </Button>
        </div>
      )}
    </div>
  )
}
