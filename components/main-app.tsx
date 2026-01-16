"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { Clock, Settings, RotateCcw, Share2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScoreCard } from "@/components/score-card"
import { DailyTipCard } from "@/components/daily-tip-card"
import { WaterCard } from "@/components/water-card"
import { MealsCard } from "@/components/meals-card"
import { WorkoutCard } from "@/components/workout-card"
import { AchievementsSection } from "@/components/achievements-section"
import { HistoryModal } from "@/components/history-modal"
import { SettingsModal } from "@/components/settings-modal"
import { toast } from "sonner"
import type { FitData } from "@/lib/types"
import { ACHIEVEMENTS } from "@/lib/constants"

interface MainAppProps {
  data: FitData
  onUpdate: (data: FitData) => void
  onReset: () => void
}

export function MainApp({ data, onUpdate, onReset }: MainAppProps) {
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const calcScore = useCallback(() => {
    let score = 0
    score += Math.min(data.checklist.water / data.waterGoal, 1) * 30
    if (data.mealsList.length > 0) {
      score += (data.checklist.completedMeals.length / data.mealsList.length) * 40
    }
    if (data.checklist.workout) score += 30
    return Math.round(score)
  }, [data])

  const score = useMemo(() => calcScore(), [calcScore])

  const checkAchievement = useCallback(
    (id: string) => {
      if (!data.achievements.includes(id)) {
        const achievement = ACHIEVEMENTS.find((a) => a.id === id)
        if (achievement) {
          toast.success(`${achievement.icon} Conquista: ${achievement.name}`)
        }
        return [...data.achievements, id]
      }
      return data.achievements
    },
    [data.achievements],
  )

  const handleWaterChange = useCallback(
    (amount: number) => {
      const newWater = Math.max(0, Math.min(data.waterGoal + 1, data.checklist.water + amount))
      let achievements = data.achievements

      if (amount > 0 && !achievements.includes("first_water")) {
        achievements = checkAchievement("first_water")
      }

      if (newWater >= data.waterGoal && !achievements.includes("hydration_master")) {
        achievements = [...achievements, "hydration_master"]
        const hydrationAchievement = ACHIEVEMENTS.find((a) => a.id === "hydration_master")
        if (hydrationAchievement) {
          toast.success(`${hydrationAchievement.icon} Conquista: ${hydrationAchievement.name}`)
        }
        if (data.checklist.water < data.waterGoal) {
          toast.success("Meta de agua atingida!")
        }
      }

      const newData = {
        ...data,
        checklist: { ...data.checklist, water: Math.round(newWater * 100) / 100 },
        achievements,
      }
      newData.score = Math.round(
        Math.min(newData.checklist.water / newData.waterGoal, 1) * 30 +
          (newData.mealsList.length > 0
            ? (newData.checklist.completedMeals.length / newData.mealsList.length) * 40
            : 0) +
          (newData.checklist.workout ? 30 : 0),
      )

      if (newData.score === 100 && !newData.achievements.includes("perfect_day")) {
        newData.achievements = [...newData.achievements, "perfect_day"]
        const perfectAchievement = ACHIEVEMENTS.find((a) => a.id === "perfect_day")
        if (perfectAchievement) {
          toast.success(`${perfectAchievement.icon} Conquista: ${perfectAchievement.name}`)
        }
      }

      onUpdate(newData)
    },
    [data, checkAchievement, onUpdate],
  )

  const handleMealToggle = useCallback(
    (mealName: string) => {
      const completedMeals = data.checklist.completedMeals.includes(mealName)
        ? data.checklist.completedMeals.filter((m) => m !== mealName)
        : [...data.checklist.completedMeals, mealName]

      let achievements = data.achievements

      if (completedMeals.length > 0 && !achievements.includes("first_meal")) {
        achievements = checkAchievement("first_meal")
      }

      if (completedMeals.length === data.mealsList.length && !achievements.includes("all_meals")) {
        achievements = [...achievements, "all_meals"]
        const allMealsAchievement = ACHIEVEMENTS.find((a) => a.id === "all_meals")
        if (allMealsAchievement) {
          toast.success(`${allMealsAchievement.icon} Conquista: ${allMealsAchievement.name}`)
        }
        toast.success("Todas as refeicoes completas!")
      }

      const newData = {
        ...data,
        checklist: { ...data.checklist, completedMeals },
        achievements,
      }
      newData.score = Math.round(
        Math.min(newData.checklist.water / newData.waterGoal, 1) * 30 +
          (newData.mealsList.length > 0
            ? (newData.checklist.completedMeals.length / newData.mealsList.length) * 40
            : 0) +
          (newData.checklist.workout ? 30 : 0),
      )

      if (newData.score === 100 && !newData.achievements.includes("perfect_day")) {
        newData.achievements = [...newData.achievements, "perfect_day"]
        const perfectAchievement = ACHIEVEMENTS.find((a) => a.id === "perfect_day")
        if (perfectAchievement) {
          toast.success(`${perfectAchievement.icon} Conquista: ${perfectAchievement.name}`)
        }
      }

      onUpdate(newData)
    },
    [data, checkAchievement, onUpdate],
  )

  const handleAddMeal = useCallback(
    (mealName: string) => {
      if (mealName.trim() && !data.mealsList.includes(mealName.trim())) {
        onUpdate({
          ...data,
          mealsList: [...data.mealsList, mealName.trim()],
        })
        toast.success("Refeicao adicionada!")
      }
    },
    [data, onUpdate],
  )

  const handleWorkoutToggle = useCallback(() => {
    const workout = !data.checklist.workout
    let achievements = data.achievements

    if (workout && !achievements.includes("first_workout")) {
      achievements = checkAchievement("first_workout")
    }

    const newData = {
      ...data,
      checklist: {
        ...data.checklist,
        workout,
        workoutType: workout ? data.checklist.workoutType : "",
        workoutDuration: workout ? data.checklist.workoutDuration : 0,
      },
      achievements,
    }
    newData.score = Math.round(
      Math.min(newData.checklist.water / newData.waterGoal, 1) * 30 +
        (newData.mealsList.length > 0 ? (newData.checklist.completedMeals.length / newData.mealsList.length) * 40 : 0) +
        (newData.checklist.workout ? 30 : 0),
    )

    if (newData.score === 100 && !newData.achievements.includes("perfect_day")) {
      newData.achievements = [...newData.achievements, "perfect_day"]
      const perfectAchievement = ACHIEVEMENTS.find((a) => a.id === "perfect_day")
      if (perfectAchievement) {
        toast.success(`${perfectAchievement.icon} Conquista: ${perfectAchievement.name}`)
      }
    }

    onUpdate(newData)
  }, [data, checkAchievement, onUpdate])

  const handleWorkoutDetails = useCallback(
    (type: string, duration: number) => {
      onUpdate({
        ...data,
        checklist: { ...data.checklist, workoutType: type, workoutDuration: duration },
      })
      toast.success("Detalhes do treino salvos!")
    },
    [data, onUpdate],
  )

  const handleResetDay = useCallback(() => {
    onUpdate({
      ...data,
      checklist: {
        water: 0,
        completedMeals: [],
        workout: false,
        workoutType: "",
        workoutDuration: 0,
      },
      score: 0,
    })
    toast.success("Dia resetado!")
  }, [data, onUpdate])

  const handleShare = useCallback(async () => {
    const goalText: Record<string, string> = {
      emagrecer: "Emagrecimento",
      massa: "Ganho de Massa",
      manter: "Manutencao",
      saude: "Saude Geral",
    }

    const txt = `FitAssist - Meu Progresso Hoje

Score: ${score}%
Agua: ${data.checklist.water}/${data.waterGoal}L
Refeicoes: ${data.checklist.completedMeals.length}/${data.mealsList.length}
Treino: ${data.checklist.workout ? "Concluido" : "Pendente"}
Sequencia: ${data.streak || 0} dias
Objetivo: ${goalText[data.goal] || data.goal}

Conquistas: ${data.achievements.length}/${ACHIEVEMENTS.length}`

    if (navigator.share) {
      await navigator.share({ title: "FitAssist - Meu Progresso", text: txt })
    } else {
      await navigator.clipboard.writeText(txt)
      toast.success("Copiado para a area de transferencia!")
    }
  }, [data, score])

  const handleSaveSettings = useCallback(
    (settings: { userName: string; goal: string; waterGoal: number; mealsList: string[] }) => {
      const newData = {
        ...data,
        ...settings,
        checklist: {
          ...data.checklist,
          completedMeals: data.checklist.completedMeals.filter((m) => settings.mealsList.includes(m)),
        },
      }
      onUpdate(newData)
      setShowSettings(false)
      toast.success("Configuracoes salvas!")
    },
    [data, onUpdate],
  )

  const currentDate = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }
    return new Date().toLocaleDateString("pt-BR", options)
  }, [])

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{currentDate}</p>
              <h1 className="text-xl font-bold">
                {greeting}, {data.userName}!
              </h1>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => setShowHistory(true)}>
              <Clock className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleResetDay}>
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4 space-y-6 pb-8">
        <ScoreCard score={score} streak={data.streak} />
        <DailyTipCard />

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Checklist do Dia</h3>
          <WaterCard
            current={data.checklist.water}
            goal={data.waterGoal}
            onAdd={(amount) => handleWaterChange(amount)}
            onRemove={() => handleWaterChange(-0.25)}
          />
          <MealsCard
            meals={data.mealsList}
            completedMeals={data.checklist.completedMeals}
            onToggle={handleMealToggle}
            onAddMeal={handleAddMeal}
          />
          <WorkoutCard
            isActive={data.checklist.workout}
            workoutType={data.checklist.workoutType}
            workoutDuration={data.checklist.workoutDuration}
            onToggle={handleWorkoutToggle}
            onSaveDetails={handleWorkoutDetails}
          />
        </section>

        <AchievementsSection achievements={data.achievements} />

        <Button variant="outline" className="w-full bg-transparent" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar Progresso
        </Button>
      </main>

      <HistoryModal open={showHistory} onClose={() => setShowHistory(false)} history={data.history} />
      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        data={data}
        onSave={handleSaveSettings}
        onResetAll={onReset}
      />
    </div>
  )
}
