import { AlertTriangle, TrendingDown, Ban } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

const problems = [
  {
    icon: AlertTriangle,
    title: 'Nome Negativado',
    description:
      'Seu CPF está com restrições nos órgãos de proteção ao crédito, impedindo novas compras e financiamentos.',
    delay: 0,
  },
  {
    icon: TrendingDown,
    title: 'Score Baixo',
    description:
      'Sua pontuação despencou, fazendo com que os bancos vejam você como um cliente de alto risco.',
    delay: 150,
  },
  {
    icon: Ban,
    title: 'Crédito Negado',
    description:
      'Cartões de crédito, empréstimos e financiamentos são constantemente recusados, travando seus projetos.',
    delay: 300,
  },
]

function ProblemCard({ prob }: { prob: (typeof problems)[0] }) {
  const { ref, classes } = useReveal(0.1, prob.delay)
  return (
    <div
      ref={ref}
      className={`bg-background rounded-2xl p-8 border border-border/50 shadow-subtle hover:shadow-elevation transition-all duration-300 group ${classes}`}
    >
      <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
        <prob.icon className="w-7 h-7 text-destructive" />
      </div>
      <h3 className="text-xl font-bold mb-3">{prob.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{prob.description}</p>
    </div>
  )
}

export function ProblemSection() {
  const { ref, classes } = useReveal(0.2)

  return (
    <section id="beneficios" className="py-24 bg-white relative">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto mb-16 ${classes}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Você se identifica com algum destes problemas?
          </h2>
          <p className="text-muted-foreground text-lg">
            As restrições financeiras afetam não apenas o seu bolso, mas também a sua paz de
            espírito. Nós entendemos a sua situação.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((prob, idx) => (
            <ProblemCard key={idx} prob={prob} />
          ))}
        </div>
      </div>
    </section>
  )
}
