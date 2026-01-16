"use client"

import { useMemo } from "react"
import { getDailyTip } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"

export function DailyTipCard() {
  const tip = useMemo(() => getDailyTip(), [])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Dica do Dia</h3>
        <Badge variant="secondary">{tip.category}</Badge>
      </div>

      <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-5 text-primary-foreground">
        <h4 className="text-lg font-semibold mb-2">{tip.title}</h4>
        <p className="text-sm opacity-90 leading-relaxed">{tip.description}</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-sm">Sugestoes de Refeicao</h4>
        <div className="grid grid-cols-3 gap-3">
          {tip.meals.map((meal, index) => (
            <div key={index} className="bg-card rounded-xl p-3 border shadow-sm hover:border-primary transition-colors">
              <div className="text-2xl mb-2">{meal.emoji}</div>
              <h5 className="font-medium text-sm leading-tight">{meal.name}</h5>
              <p className="text-xs text-muted-foreground mt-0.5">{meal.desc}</p>
              <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {meal.calories}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
