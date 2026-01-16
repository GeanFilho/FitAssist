export interface FitData {
  userName: string
  goal: string
  mealsList: string[]
  waterGoal: number
  checklist: {
    water: number
    completedMeals: string[]
    workout: boolean
    workoutType: string
    workoutDuration: number
  }
  achievements: string[]
  history: HistoryItem[]
  streak: number
  score: number
  lastDate: string
}

export interface HistoryItem {
  date: string
  score: number
  water: number
  meals: number
  workout: boolean
}

export interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
}

export interface DailyTip {
  category: string
  title: string
  description: string
  icon: string
  meals: MealSuggestion[]
}

export interface MealSuggestion {
  name: string
  desc: string
  calories: string
  emoji: string
}
