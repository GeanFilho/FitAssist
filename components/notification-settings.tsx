"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff, Droplets, Utensils, Dumbbell, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useNotifications } from "@/hooks/use-notifications"
import { toast } from "sonner"
import type { NotificationSettings } from "@/lib/notifications"

export function NotificationSettingsPanel() {
  const { settings, permissionGranted, isSupported, enableNotifications, disableNotifications, updateSettings } =
    useNotifications()

  const [localSettings, setLocalSettings] = useState<NotificationSettings>(settings)
  const [newMealTime, setNewMealTime] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  if (!isMounted) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Bell className="w-4 h-4" />
          <span className="text-sm">Carregando...</span>
        </div>
      </div>
    )
  }

  if (!isSupported) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BellOff className="w-4 h-4" />
          <span className="text-sm">Seu navegador nao suporta notificacoes</span>
        </div>
      </div>
    )
  }

  const handleToggleNotifications = async () => {
    if (!settings.enabled) {
      const granted = await enableNotifications()
      if (granted) {
        toast.success("Notificacoes ativadas!")
      } else {
        toast.error("Permissao de notificacoes negada. Verifique as configuracoes do navegador.")
      }
    } else {
      disableNotifications()
      toast.success("Notificacoes desativadas")
    }
  }

  const handleUpdateSettings = (newSettings: NotificationSettings) => {
    setLocalSettings(newSettings)
    updateSettings(newSettings)
  }

  const addMealTime = () => {
    if (newMealTime && !localSettings.mealReminder.times.includes(newMealTime)) {
      const newTimes = [...localSettings.mealReminder.times, newMealTime].sort()
      handleUpdateSettings({
        ...localSettings,
        mealReminder: { ...localSettings.mealReminder, times: newTimes },
      })
      setNewMealTime("")
    }
  }

  const removeMealTime = (time: string) => {
    const newTimes = localSettings.mealReminder.times.filter((t) => t !== time)
    handleUpdateSettings({
      ...localSettings,
      mealReminder: { ...localSettings.mealReminder, times: newTimes },
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <Label className="text-base font-medium">Notificacoes</Label>
        </div>
        <Switch checked={settings.enabled && permissionGranted} onCheckedChange={handleToggleNotifications} />
      </div>

      {!permissionGranted && !settings.enabled && (
        <p className="text-xs text-muted-foreground">Clique para ativar lembretes de agua, refeicoes e treinos</p>
      )}

      {settings.enabled && permissionGranted && (
        <div className="space-y-4 pt-2">
          <Separator />

          {/* Lembrete de Água */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <Label className="text-sm">Lembrete de agua</Label>
              </div>
              <Switch
                checked={localSettings.waterReminder.enabled}
                onCheckedChange={(checked) =>
                  handleUpdateSettings({
                    ...localSettings,
                    waterReminder: { ...localSettings.waterReminder, enabled: checked },
                  })
                }
              />
            </div>

            {localSettings.waterReminder.enabled && (
              <div className="ml-6 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground w-20">Intervalo:</Label>
                  <select
                    value={localSettings.waterReminder.interval}
                    onChange={(e) =>
                      handleUpdateSettings({
                        ...localSettings,
                        waterReminder: {
                          ...localSettings.waterReminder,
                          interval: Number.parseInt(e.target.value),
                        },
                      })
                    }
                    className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  >
                    <option value="30">30 min</option>
                    <option value="60">1 hora</option>
                    <option value="90">1h30</option>
                    <option value="120">2 horas</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground w-20">Horario:</Label>
                  <Input
                    type="time"
                    value={localSettings.waterReminder.startTime}
                    onChange={(e) =>
                      handleUpdateSettings({
                        ...localSettings,
                        waterReminder: {
                          ...localSettings.waterReminder,
                          startTime: e.target.value,
                        },
                      })
                    }
                    className="w-24 h-9"
                  />
                  <span className="text-muted-foreground">ate</span>
                  <Input
                    type="time"
                    value={localSettings.waterReminder.endTime}
                    onChange={(e) =>
                      handleUpdateSettings({
                        ...localSettings,
                        waterReminder: {
                          ...localSettings.waterReminder,
                          endTime: e.target.value,
                        },
                      })
                    }
                    className="w-24 h-9"
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Lembrete de Refeições */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-500" />
                <Label className="text-sm">Lembrete de refeicoes</Label>
              </div>
              <Switch
                checked={localSettings.mealReminder.enabled}
                onCheckedChange={(checked) =>
                  handleUpdateSettings({
                    ...localSettings,
                    mealReminder: { ...localSettings.mealReminder, enabled: checked },
                  })
                }
              />
            </div>

            {localSettings.mealReminder.enabled && (
              <div className="ml-6 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {localSettings.mealReminder.times.map((time) => (
                    <Badge key={time} variant="secondary" className="gap-1 py-1.5 px-3">
                      {time}
                      <button onClick={() => removeMealTime(time)} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={newMealTime}
                    onChange={(e) => setNewMealTime(e.target.value)}
                    className="w-28 h-9"
                    placeholder="HH:MM"
                  />
                  <Button size="sm" onClick={addMealTime} disabled={!newMealTime}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Lembrete de Treino */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-green-500" />
                <Label className="text-sm">Lembrete de treino</Label>
              </div>
              <Switch
                checked={localSettings.workoutReminder.enabled}
                onCheckedChange={(checked) =>
                  handleUpdateSettings({
                    ...localSettings,
                    workoutReminder: { ...localSettings.workoutReminder, enabled: checked },
                  })
                }
              />
            </div>

            {localSettings.workoutReminder.enabled && (
              <div className="ml-6 flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Horario:</Label>
                <Input
                  type="time"
                  value={localSettings.workoutReminder.time}
                  onChange={(e) =>
                    handleUpdateSettings({
                      ...localSettings,
                      workoutReminder: {
                        ...localSettings.workoutReminder,
                        time: e.target.value,
                      },
                    })
                  }
                  className="w-28 h-9"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
