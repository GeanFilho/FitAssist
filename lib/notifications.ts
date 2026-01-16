export interface NotificationSettings {
  enabled: boolean
  waterReminder: {
    enabled: boolean
    interval: number // em minutos
    startTime: string // HH:MM
    endTime: string // HH:MM
  }
  mealReminder: {
    enabled: boolean
    times: string[] // array de horarios HH:MM
  }
  workoutReminder: {
    enabled: boolean
    time: string // HH:MM
  }
}

export const defaultNotificationSettings: NotificationSettings = {
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
