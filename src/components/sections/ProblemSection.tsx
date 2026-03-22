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
      className={`bg-secondary rounded-2xl p-8 border-2 border-primary shadow-elevation transition-all duration-300 group ${classes}`}
    >
      <div className="w-16 h-16 rounded-xl bg-white border-2 border-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
        <prob.icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-extrabold mb-3 text-primary">{prob.title}</h3>
      <p className="text-black font-medium leading-relaxed">{prob.description}</p>
    </div>
  )
}

export function ProblemSection() {
  const { ref, classes } = useReveal(0.2)

  return (
    <section className="py-24 bg-white relative border-y-4 border-primary">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto mb-16 ${classes}`}>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-black">
            Você se identifica com algum destes <span className="text-primary">problemas?</span>
          </h2>
          <p className="text-black font-medium text-xl">
            As restrições financeiras afetam o seu bolso e a sua paz. Nós entendemos a sua situação
            e temos a solução legal.
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
