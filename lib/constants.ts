import type { Achievement, DailyTip } from "./types"

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_water", name: "Hidratado", desc: "Beba agua pela primeira vez", icon: "💧" },
  { id: "first_meal", name: "Primeira Refeicao", desc: "Registre sua primeira refeicao", icon: "🍽️" },
  { id: "first_workout", name: "Primeiro Treino", desc: "Complete seu primeiro treino", icon: "💪" },
  { id: "perfect_day", name: "Dia Perfeito", desc: "Alcance 100% no score", icon: "⭐" },
  { id: "hydration_master", name: "Mestre da Hidratacao", desc: "Beba toda a agua do dia", icon: "🌊" },
  { id: "all_meals", name: "Nutricao Completa", desc: "Complete todas as refeicoes", icon: "🥗" },
  { id: "streak_3", name: "3 Dias Seguidos", desc: "Mantenha 3 dias de sequencia", icon: "🔥" },
  { id: "streak_7", name: "Semana Perfeita", desc: "Mantenha 7 dias de sequencia", icon: "🏆" },
  { id: "streak_30", name: "Mes de Dedicacao", desc: "Mantenha 30 dias de sequencia", icon: "👑" },
  { id: "early_bird", name: "Madrugador", desc: "Registre atividade antes das 7h", icon: "🌅" },
]

export const DAILY_TIPS: DailyTip[] = [
  {
    category: "Nutricao",
    title: "Proteina no cafe da manha",
    description:
      "Comece o dia com proteina para manter a saciedade e energia por mais tempo. Ovos, iogurte grego ou whey sao otimas opcoes.",
    icon: "egg",
    meals: [
      { name: "Ovos mexidos", desc: "Com pao integral", calories: "320 kcal", emoji: "🍳" },
      { name: "Iogurte com granola", desc: "E frutas frescas", calories: "280 kcal", emoji: "🥣" },
      { name: "Smoothie proteico", desc: "Banana, whey e aveia", calories: "350 kcal", emoji: "🥤" },
    ],
  },
  {
    category: "Hidratacao",
    title: "Agua antes das refeicoes",
    description:
      "Beber um copo de agua 30 minutos antes das refeicoes ajuda na digestao e pode reduzir a quantidade de calorias ingeridas.",
    icon: "droplet",
    meals: [
      { name: "Agua com limao", desc: "Desintoxicante natural", calories: "5 kcal", emoji: "🍋" },
      { name: "Cha verde gelado", desc: "Acelera metabolismo", calories: "0 kcal", emoji: "🍵" },
      { name: "Agua de coco", desc: "Rica em eletrolitos", calories: "45 kcal", emoji: "🥥" },
    ],
  },
  {
    category: "Energia",
    title: "Carboidratos complexos",
    description:
      "Prefira carboidratos de baixo indice glicemico como aveia, batata doce e arroz integral para energia sustentada.",
    icon: "zap",
    meals: [
      { name: "Bowl de aveia", desc: "Com frutas e mel", calories: "380 kcal", emoji: "🥣" },
      { name: "Batata doce assada", desc: "Com frango grelhado", calories: "420 kcal", emoji: "🍠" },
      { name: "Arroz integral", desc: "Com legumes salteados", calories: "350 kcal", emoji: "🍚" },
    ],
  },
  {
    category: "Recuperacao",
    title: "Pos-treino ideal",
    description: "Consuma proteina e carboidratos em ate 2 horas apos o treino para otimizar a recuperacao muscular.",
    icon: "heart",
    meals: [
      { name: "Frango com arroz", desc: "Classico e eficiente", calories: "450 kcal", emoji: "🍗" },
      { name: "Shake proteico", desc: "Com banana e pasta de amendoim", calories: "380 kcal", emoji: "🥤" },
      { name: "Omelete de claras", desc: "Com queijo cottage", calories: "280 kcal", emoji: "🍳" },
    ],
  },
  {
    category: "Saciedade",
    title: "Fibras no almoco",
    description:
      "Inclua vegetais e legumes em suas refeicoes. As fibras ajudam na digestao e prolongam a sensacao de saciedade.",
    icon: "leaf",
    meals: [
      { name: "Salada colorida", desc: "Com grao de bico", calories: "220 kcal", emoji: "🥗" },
      { name: "Sopa de legumes", desc: "Rica em fibras", calories: "180 kcal", emoji: "🍲" },
      { name: "Wrap integral", desc: "Com vegetais grelhados", calories: "320 kcal", emoji: "🌯" },
    ],
  },
  {
    category: "Lanche Saudavel",
    title: "Snacks inteligentes",
    description:
      "Tenha sempre opcoes saudaveis por perto para evitar tentacoes. Nuts, frutas e iogurte sao otimos aliados.",
    icon: "apple",
    meals: [
      { name: "Mix de castanhas", desc: "30g e energetico", calories: "180 kcal", emoji: "🥜" },
      { name: "Banana com canela", desc: "Pre-treino perfeito", calories: "120 kcal", emoji: "🍌" },
      { name: "Cenoura baby", desc: "Com homus", calories: "150 kcal", emoji: "🥕" },
    ],
  },
  {
    category: "Jantar Leve",
    title: "Noite sem peso",
    description:
      "A noite, prefira refeicoes mais leves com proteinas magras e vegetais. Evite carboidratos simples perto de dormir.",
    icon: "moon",
    meals: [
      { name: "Peixe grelhado", desc: "Com legumes no vapor", calories: "320 kcal", emoji: "🐟" },
      { name: "Salada com atum", desc: "Leve e nutritiva", calories: "280 kcal", emoji: "🥗" },
      { name: "Sopa de frango", desc: "Reconfortante e leve", calories: "220 kcal", emoji: "🍲" },
    ],
  },
]

export function getDailyTip(): DailyTip {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
  )
  const tipIndex = dayOfYear % DAILY_TIPS.length
  return DAILY_TIPS[tipIndex]
}
