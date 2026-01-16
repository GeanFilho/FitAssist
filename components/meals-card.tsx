"use client"

import { useState } from "react"
import { Coffee, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface MealsCardProps {
  meals: string[]
  completedMeals: string[]
  onToggle: (meal: string) => void
  onAddMeal: (meal: string) => void
}

export function MealsCard({ meals, completedMeals, onToggle, onAddMeal }: MealsCardProps) {
  const [newMeal, setNewMeal] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const percentage = meals.length > 0 ? (completedMeals.length / meals.length) * 100 : 0

  const handleAdd = () => {
    if (newMeal.trim()) {
      onAddMeal(newMeal.trim())
      setNewMeal("")
      setIsOpen(false)
    }
  }

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <Coffee className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Refeicoes</h4>
          <p className="text-sm text-muted-foreground">
            {completedMeals.length} / {meals.length} refeicoes
          </p>
        </div>
        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-3 border-t">
        {meals.map((meal) => (
          <button
            key={meal}
            onClick={() => onToggle(meal)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
              completedMeals.includes(meal)
                ? "bg-amber-500 border-amber-500 text-white"
                : "border-border hover:border-amber-500 text-foreground"
            }`}
          >
            {meal}
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-3 border-dashed bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar refeicao
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Refeicao</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              placeholder="Ex: Lanche da tarde"
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Button onClick={handleAdd} className="w-full">
              Adicionar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
