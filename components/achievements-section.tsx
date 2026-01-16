"use client"

import { ACHIEVEMENTS } from "@/lib/constants"

interface AchievementsSectionProps {
  achievements: string[]
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Conquistas</h3>
        <span className="text-sm text-muted-foreground">
          {achievements.length}/{ACHIEVEMENTS.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = achievements.includes(achievement.id)
          return (
            <div
              key={achievement.id}
              className={`bg-card rounded-xl p-4 text-center border-2 transition-all ${
                unlocked ? "border-primary" : "border-transparent opacity-50 grayscale"
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h5 className="font-semibold text-sm">{achievement.name}</h5>
              <p className="text-xs text-muted-foreground mt-1">{unlocked ? "Desbloqueado!" : achievement.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
