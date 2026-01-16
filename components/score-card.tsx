"use client"

import { Zap } from "lucide-react"
import { useMemo } from "react"

interface ScoreCardProps {
  score: number
  streak: number
}

export function ScoreCard({ score, streak }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  const message = useMemo(() => {
    if (score === 0) return "Vamos comecar o dia!"
    if (score < 30) return "Bom comeco, continue assim!"
    if (score < 50) return "Voce esta no caminho certo!"
    if (score < 80) return "Otimo progresso!"
    if (score < 100) return "Quase la, falta pouco!"
    return "Parabens! Dia perfeito!"
  }, [score])

  return (
    <section className="bg-card rounded-3xl p-6 shadow-sm border flex items-center gap-8">
      <div className="relative w-28 h-28 flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">{score}</span>
          <span className="text-lg font-semibold text-muted-foreground">%</span>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-1">Progresso do Dia</h2>
        <p className="text-sm text-muted-foreground mb-3">{message}</p>
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium">
          <Zap className="w-4 h-4 fill-current" />
          {streak || 0} dias de sequencia
        </div>
      </div>
    </section>
  )
}
