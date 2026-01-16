"use client"

import { useState } from "react"
import { Coffee, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import type { FitData } from "@/lib/types"

interface OnboardingProps {
  onStart: (data: FitData) => void
}

const PRESET_MEALS = ["Cafe da manha", "Almoco", "Jantar", "Lanche"]

export function Onboarding({ onStart }: OnboardingProps) {
  const [userName, setUserName] = useState("")
  const [goal, setGoal] = useState("saude")
  const [waterGoal, setWaterGoal] = useState("2")
  const [meals, setMeals] = useState<string[]>(["Cafe da manha", "Almoco", "Jantar"])
  const [newMeal, setNewMeal] = useState("")

  const addMeal = (meal: string) => {
    if (meal.trim() && !meals.includes(meal.trim())) {
      setMeals([...meals, meal.trim()])
      setNewMeal("")
    }
  }

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index))
  }

  const handleStart = () => {
    if (meals.length === 0) {
      toast.error("Adicione pelo menos uma refeicao!")
      return
    }

    const data: FitData = {
      userName: userName.trim() || "Amigo",
      goal,
      mealsList: [...meals],
      waterGoal: Number.parseFloat(waterGoal) || 2,
      checklist: {
        water: 0,
        completedMeals: [],
        workout: false,
        workoutType: "",
        workoutDuration: 0,
      },
      achievements: [],
      history: [],
      streak: 0,
      score: 0,
      lastDate: new Date().toDateString(),
    }

    onStart(data)
    toast.success("Bem-vindo ao FitAssist!")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-primary/5">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center">
            <Coffee className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">FitAssist</h1>
        </div>
        <p className="text-muted-foreground">Seu assistente pessoal de rotina fitness</p>
      </div>

      <div className="w-full max-w-md bg-card rounded-3xl p-8 shadow-xl border">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <div className="w-10 h-0.5 bg-border" />
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <div className="w-10 h-0.5 bg-border" />
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
            3
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">Vamos configurar sua rotina</h2>
        <p className="text-muted-foreground text-center mb-6">Personalize o app de acordo com seus objetivos</p>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Seu nome</Label>
            <Input
              id="name"
              placeholder="Como podemos te chamar?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Qual seu objetivo?</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emagrecer">Emagrecer</SelectItem>
                <SelectItem value="massa">Ganhar Massa Muscular</SelectItem>
                <SelectItem value="manter">Manter Peso Atual</SelectItem>
                <SelectItem value="saude">Melhorar Saude Geral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="water">Meta de agua diaria (litros)</Label>
            <div className="relative">
              <Input
                id="water"
                type="number"
                min="0.5"
                max="6"
                step="0.25"
                value={waterGoal}
                onChange={(e) => setWaterGoal(e.target.value)}
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">L</span>
            </div>
            <p className="text-xs text-muted-foreground">Recomendado: 2 a 3 litros por dia</p>
          </div>

          <div className="space-y-3">
            <Label>Suas refeicoes do dia</Label>
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {meals.map((meal, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 py-1.5 px-3">
                    {meal}
                    <button onClick={() => removeMeal(index)} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar refeicao..."
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addMeal(newMeal)}
                  className="flex-1"
                />
                <Button size="icon" onClick={() => addMeal(newMeal)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-muted-foreground">Sugestoes:</span>
                {PRESET_MEALS.filter((m) => !meals.includes(m)).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => addMeal(preset)}
                    className="text-xs px-2 py-1 rounded-full border hover:border-primary hover:text-primary transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleStart} className="w-full h-12 text-base font-semibold">
            Comecar Jornada
          </Button>
        </div>
      </div>
    </div>
  )
}
