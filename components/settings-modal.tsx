"use client"

import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NotificationSettingsPanel } from "@/components/notification-settings"
import type { FitData } from "@/lib/types"

interface SettingsModalProps {
  open: boolean
  onClose: () => void
  data: FitData
  onSave: (settings: { userName: string; goal: string; waterGoal: number; mealsList: string[] }) => void
  onResetAll: () => void
}

export function SettingsModal({ open, onClose, data, onSave, onResetAll }: SettingsModalProps) {
  const [userName, setUserName] = useState(data.userName)
  const [goal, setGoal] = useState(data.goal)
  const [waterGoal, setWaterGoal] = useState(data.waterGoal.toString())
  const [meals, setMeals] = useState<string[]>([...data.mealsList])
  const [newMeal, setNewMeal] = useState("")

  useEffect(() => {
    if (open) {
      setUserName(data.userName)
      setGoal(data.goal)
      setWaterGoal(data.waterGoal.toString())
      setMeals([...data.mealsList])
    }
  }, [open, data])

  const addMeal = () => {
    if (newMeal.trim() && !meals.includes(newMeal.trim())) {
      setMeals([...meals, newMeal.trim()])
      setNewMeal("")
    }
  }

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave({
      userName: userName.trim() || "Amigo",
      goal,
      waterGoal: Number.parseFloat(waterGoal) || 2,
      mealsList: meals,
    })
  }

  const handleResetAll = () => {
    if (confirm("Tem certeza que deseja apagar todos os dados? Esta acao nao pode ser desfeita.")) {
      onResetAll()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuracoes</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label>Seu nome</Label>
            <Input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Seu nome" />
          </div>

          <div className="space-y-2">
            <Label>Objetivo</Label>
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
            <Label>Meta de agua (litros)</Label>
            <div className="relative">
              <Input
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
          </div>

          <div className="space-y-3">
            <Label>Suas refeicoes</Label>
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
                  placeholder="Nova refeicao"
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addMeal()}
                  className="flex-1"
                />
                <Button size="icon" onClick={addMeal}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />
          <NotificationSettingsPanel />
          <Separator />

          <Button onClick={handleSave} className="w-full">
            Salvar Alteracoes
          </Button>
          <Button variant="destructive" onClick={handleResetAll} className="w-full">
            Resetar Todos os Dados
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
