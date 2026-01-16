"use client"

import { useState, useEffect } from "react"
import { Onboarding } from "@/components/onboarding"
import { MainApp } from "@/components/main-app"
import { Toaster } from "@/components/ui/sonner"
import type { FitData } from "@/lib/types"

export default function FitAssistApp() {
  const [data, setData] = useState<FitData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("fitData")
    if (stored) {
      const parsed = JSON.parse(stored) as FitData
      // Check if it's a new day
      const today = new Date().toDateString()
      if (parsed.lastDate !== today) {
        // Save to history if there was activity
        if (parsed.lastDate && parsed.score > 0) {
          parsed.history = parsed.history || []
          parsed.history.unshift({
            date: parsed.lastDate,
            score: parsed.score,
            water: parsed.checklist.water,
            meals: parsed.checklist.completedMeals?.length || 0,
            workout: parsed.checklist.workout,
          })
          parsed.history = parsed.history.slice(0, 30)

          if (parsed.score >= 80) {
            parsed.streak = (parsed.streak || 0) + 1
          } else {
            parsed.streak = 0
          }
        }

        // Reset for new day
        parsed.lastDate = today
        parsed.checklist = {
          water: 0,
          completedMeals: [],
          workout: false,
          workoutType: "",
          workoutDuration: 0,
        }
        parsed.score = 0
        localStorage.setItem("fitData", JSON.stringify(parsed))
      }
      setData(parsed)
    }
    setIsLoading(false)
  }, [])

  const handleStart = (newData: FitData) => {
    setData(newData)
    localStorage.setItem("fitData", JSON.stringify(newData))
  }

  const handleUpdate = (updatedData: FitData) => {
    setData(updatedData)
    localStorage.setItem("fitData", JSON.stringify(updatedData))
  }

  const handleReset = () => {
    localStorage.removeItem("fitData")
    setData(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <>
      {data?.userName ? (
        <MainApp data={data} onUpdate={handleUpdate} onReset={handleReset} />
      ) : (
        <Onboarding onStart={handleStart} />
      )}
      <Toaster position="bottom-center" />
    </>
  )
}
