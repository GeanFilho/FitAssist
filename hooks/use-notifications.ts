"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { NotificationSettings } from "@/lib/notifications"

const defaultSettings: NotificationSettings = {
  enabled: false,
  waterReminder: {
    enabled: true,
    interval: 60,
    startTime: "08:00",
    endTime: "22:00",
  },
  mealReminder: {
    enabled: true,
    times: ["07:00", "12:00", "19:00"],
  },
  workoutReminder: {
    enabled: true,
    time: "18:00",
  },
}

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)

    // Verifica suporte a notificacoes apenas no cliente
    const supported = typeof window !== "undefined" && "Notification" in window
    setIsSupported(supported)

    if (supported) {
      setPermissionGranted(Notification.permission === "granted")

      // Carrega configuracoes do localStorage
      try {
        const stored = localStorage.getItem("notificationSettings")
        if (stored) {
          setSettings(JSON.parse(stored))
        }
      } catch (e) {
        console.log("[v0] Error loading notification settings:", e)
      }
    }
  }, [])

  // Configura o intervalo de verificacao de notificacoes
  useEffect(() => {
    if (!isMounted) return

    if (settings.enabled && permissionGranted) {
      // Verifica a cada minuto
      intervalRef.current = setInterval(() => {
        checkAndSendNotificationsInternal(settings)
      }, 60000)

      // Verifica imediatamente tambem
      checkAndSendNotificationsInternal(settings)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [settings, permissionGranted, isMounted])

  const enableNotifications = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false
    }

    try {
      let permission = Notification.permission

      if (permission !== "granted" && permission !== "denied") {
        permission = await Notification.requestPermission()
      }

      const granted = permission === "granted"
      setPermissionGranted(granted)

      if (granted) {
        const newSettings = { ...settings, enabled: true }
        setSettings(newSettings)
        localStorage.setItem("notificationSettings", JSON.stringify(newSettings))
      }

      return granted
    } catch (e) {
      console.log("[v0] Error requesting notification permission:", e)
      return false
    }
  }, [settings])

  const disableNotifications = useCallback(() => {
    const newSettings = { ...settings, enabled: false }
    setSettings(newSettings)
    try {
      localStorage.setItem("notificationSettings", JSON.stringify(newSettings))
    } catch (e) {
      console.log("[v0] Error saving notification settings:", e)
    }
  }, [settings])

  const updateSettings = useCallback((newSettings: NotificationSettings) => {
    setSettings(newSettings)
    try {
      localStorage.setItem("notificationSettings", JSON.stringify(newSettings))
    } catch (e) {
      console.log("[v0] Error saving notification settings:", e)
    }
  }, [])

  return {
    settings,
    permissionGranted,
    isSupported,
    enableNotifications,
    disableNotifications,
    updateSettings,
  }
}

function checkAndSendNotificationsInternal(settings: NotificationSettings) {
  if (!settings.enabled) return
  if (typeof window === "undefined" || !("Notification" in window)) return
  if (Notification.permission !== "granted") return

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  // Lembrete de agua
  if (settings.waterReminder.enabled) {
    if (isWithinTimeRange(settings.waterReminder.startTime, settings.waterReminder.endTime)) {
      try {
        const lastWaterNotification = localStorage.getItem("lastWaterNotification")
        const lastTime = lastWaterNotification ? Number.parseInt(lastWaterNotification) : 0

        if (currentMinutes - lastTime >= settings.waterReminder.interval || lastTime > currentMinutes) {
          sendNotification("Hora de tomar agua!", "Mantenha-se hidratado. Beba um copo de agua agora.")
          localStorage.setItem("lastWaterNotification", currentMinutes.toString())
        }
      } catch (e) {
        console.log("[v0] Error checking water notification:", e)
      }
    }
  }

  // Lembrete de refeicoes
  if (settings.mealReminder.enabled) {
    settings.mealReminder.times.forEach((time, index) => {
      if (isTimeForNotification(time)) {
        const mealNames = ["cafe da manha", "almoco", "jantar"]
        const mealName = mealNames[index] || `refeicao ${index + 1}`
        sendNotification("Hora de comer!", `Esta na hora do seu ${mealName}. Nao pule refeicoes!`)
      }
    })
  }

  // Lembrete de treino
  if (settings.workoutReminder.enabled) {
    if (isTimeForNotification(settings.workoutReminder.time)) {
      try {
        const fitData = localStorage.getItem("fitData")
        if (fitData) {
          const data = JSON.parse(fitData)
          if (!data.checklist?.workout) {
            sendNotification("Ja treinou hoje?", "Nao esqueca do seu treino! Mantenha a consistencia.")
          }
        }
      } catch (e) {
        console.log("[v0] Error checking workout notification:", e)
      }
    }
  }
}

function isWithinTimeRange(startTime: string, endTime: string): boolean {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const [startHour, startMin] = startTime.split(":").map(Number)
  const [endHour, endMin] = endTime.split(":").map(Number)

  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes
}

function isTimeForNotification(targetTime: string, toleranceMinutes = 1): boolean {
  const now = new Date()
  const [targetHour, targetMin] = targetTime.split(":").map(Number)

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const targetMinutes = targetHour * 60 + targetMin

  return Math.abs(currentMinutes - targetMinutes) <= toleranceMinutes
}

function sendNotification(title: string, body: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return null
  if (Notification.permission !== "granted") return null

  try {
    const notification = new Notification(title, {
      body,
      icon: "/apple-icon.png",
      tag: title.toLowerCase().replace(/\s/g, "-"),
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    return notification
  } catch (e) {
    console.log("[v0] Error sending notification:", e)
    return null
  }
}
