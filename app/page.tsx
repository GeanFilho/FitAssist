import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Droplets,
  Utensils,
  Dumbbell,
  Trophy,
  ChevronRight,
  Check,
  Star,
  Zap,
  Shield,
  BarChart3,
  Users,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: Droplets,
    title: "Controle de Hidratacao",
    description: "Acompanhe seu consumo de agua em litros com metas personalizaveis e lembretes inteligentes.",
  },
  {
    icon: Utensils,
    title: "Refeicoes Personalizadas",
    description: "Crie e gerencie suas proprias refeicoes com dicas diarias de nutricao.",
  },
  {
    icon: Dumbbell,
    title: "Registro de Treinos",
    description: "Registre tipo, duracao e intensidade dos seus treinos diarios.",
  },
  {
    icon: Trophy,
    title: "Sistema de Conquistas",
    description: "Desbloqueie conquistas e mantenha sua motivacao com metas progressivas.",
  },
  {
    icon: BarChart3,
    title: "Historico Completo",
    description: "Visualize seu progresso ao longo do tempo com graficos e estatisticas detalhadas.",
  },
  {
    icon: Zap,
    title: "Streak de Dias",
    description: "Mantenha sua sequencia de dias ativos e construa habitos saudaveis.",
  },
]

const testimonials = [
  {
    name: "Marina Silva",
    role: "Personal Trainer",
    content:
      "O FitAssist transformou a forma como acompanho meus clientes. A interface e intuitiva e os recursos sao completos.",
    rating: 5,
  },
  {
    name: "Carlos Eduardo",
    role: "Atleta Amador",
    content:
      "Finalmente um app que me ajuda a manter a consistencia. O sistema de conquistas me mantem motivado todos os dias.",
    rating: 5,
  },
  {
    name: "Ana Beatriz",
    role: "Nutricionista",
    content:
      "Recomendo para todos os meus pacientes. O controle de refeicoes personalizadas e exatamente o que faltava no mercado.",
    rating: 5,
  },
]

const plans = [
  {
    name: "Mensal",
    price: "R$19,90",
    period: "/mes",
    description: "Para quem quer comecar a cuidar da saude.",
    features: [
      "Controle ilimitado de agua",
      "Refeicoes ilimitadas personalizadas",
      "Treinos ilimitados com detalhes",
      "Todas as conquistas",
      "Historico de 30 dias",
      "Dicas de nutricao diarias",
    ],
    cta: "Assinar Mensal",
    popular: false,
  },
  {
    name: "Trimestral",
    price: "R$49,90",
    period: "/trimestre",
    description: "Melhor para criar o habito. Economize 17%.",
    features: [
      "Tudo do plano Mensal",
      "Historico ilimitado",
      "Suporte prioritario",
      "Relatorios semanais",
      "Metas personalizadas avancadas",
    ],
    cta: "Assinar Trimestral",
    popular: true,
    savings: "Economize R$10",
  },
  {
    name: "Anual",
    price: "R$149,90",
    period: "/ano",
    description: "Melhor custo-beneficio. Economize 37%.",
    features: [
      "Tudo do plano Trimestral",
      "4 meses gratis",
      "Acesso antecipado a novidades",
      "Consultoria nutricional mensal",
      "Exportacao de dados",
      "Integracao com wearables",
    ],
    cta: "Assinar Anual",
    popular: false,
    savings: "Economize R$88",
  },
]

const stats = [
  { value: "50k+", label: "Usuarios Ativos" },
  { value: "2M+", label: "Litros de Agua Registrados" },
  { value: "98%", label: "Taxa de Satisfacao" },
  { value: "4.9", label: "Avaliacao na App Store" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FitAssist</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#funcionalidades"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Funcionalidades
            </Link>
            <Link href="#depoimentos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Depoimentos
            </Link>
            <Link href="#planos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Planos
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/app">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            {/* Adicionado botao "Assinar" do header */}
            <Link href="#planos">
              <Button size="sm">Assinar</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-10" />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              Novo: Dicas de nutricao diarias
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Seu assistente fitness pessoal para uma vida mais saudavel
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Acompanhe sua hidratacao, refeicoes e treinos em um so lugar. Construa habitos saudaveis com metas
              personalizadas e conquistas motivadoras.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/app">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  Comecar Agora
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#funcionalidades">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Ver Funcionalidades
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="border-t border-border bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Tudo que voce precisa para sua rotina fitness
            </h2>
            <p className="text-lg text-muted-foreground">
              Recursos poderosos e intuitivos para acompanhar seu progresso diario.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="border-t border-border py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">O que nossos usuarios dizem</h2>
            <p className="text-lg text-muted-foreground">
              Milhares de pessoas ja transformaram suas rotinas com o FitAssist.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-border bg-card">
                <CardHeader>
                  <div className="mb-2 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-sm leading-relaxed text-foreground">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="border-t border-border bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Planos e Precos</h2>
            <p className="text-lg text-muted-foreground">Escolha o plano ideal para transformar sua rotina fitness.</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-border bg-card ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Mais Popular</Badge>
                  </div>
                )}
                {plan.savings && !plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      {plan.savings}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/app" className="w-full">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Pronto para transformar sua rotina?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Junte-se a milhares de pessoas que ja estao construindo habitos mais saudaveis com o FitAssist.
            </p>
            {/* Removed "E Gratis" do botao CTA */}
            <Link href="/app">
              <Button size="lg" className="gap-2">
                Comecar Agora
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">FitAssist</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Termos de Uso
              </Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacidade
              </Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contato
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">© 2026 FitAssist. Todos os direitos reservados.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
