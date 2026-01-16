"use client"

import { Droplet, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WaterCardProps {
  current: number
  goal: number
  onAdd: (amount: number) => void
  onRemove: () => void
}

export function WaterCard({ current, goal, onAdd, onRemove }: WaterCardProps) {
  const percentage = Math.min((current / goal) * 100, 100)
  const displayCurrent = current.toFixed(2).replace(/\.?0+$/, "")

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Droplet className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Hidratacao</h4>
          <p className="text-sm text-muted-foreground">
            {displayCurrent} / {goal} L
          </p>
        </div>
        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 py-2 border-t">
        <Button variant="outline" size="icon" className="rounded-full bg-transparent" onClick={onRemove}>
          <Minus className="w-5 h-5" />
        </Button>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{displayCurrent}</span>
          <span className="text-lg font-medium text-muted-foreground">L</span>
        </div>
        <Button variant="outline" size="icon" className="rounded-full bg-transparent" onClick={() => onAdd(0.25)}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        <Button variant="outline" size="sm" className="text-xs bg-transparent" onClick={() => onAdd(0.25)}>
          +250ml
        </Button>
        <Button variant="outline" size="sm" className="text-xs bg-transparent" onClick={() => onAdd(0.5)}>
          +500ml
        </Button>
        <Button variant="outline" size="sm" className="text-xs bg-transparent" onClick={() => onAdd(1)}>
          +1L
        </Button>
      </div>
    </div>
  )
}
