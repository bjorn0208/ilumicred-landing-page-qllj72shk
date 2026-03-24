import { AlertCircle, TrendingDown, Ban } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

const problems = [
  {
    icon: AlertCircle,
    title: 'Nome Negativado',
    description:
      'Seu CPF está com restrições nos órgãos de proteção, travando sua vida financeira.',
    delay: 0,
  },
  {
    icon: TrendingDown,
    title: 'Score Baixo',
    description: 'Sua pontuação despencou, fazendo os bancos negarem qualquer limite.',
    delay: 150,
  },
  {
    icon: Ban,
    title: 'Crédito Recusado',
    description: 'Cartões, financiamentos e empréstimos constantemente negados.',
    delay: 300,
  },
]

function ProblemCard({ prob }: { prob: (typeof problems)[0] }) {
  const { ref, classes } = useReveal(0.1, prob.delay)
  return (
    <div
      ref={ref}
      className={`glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 ${classes}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
        <prob.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-display font-bold mb-3 text-white">{prob.title}</h3>
      <p className="text-white/60 font-medium leading-relaxed text-sm">{prob.description}</p>
    </div>
  )
}

export function ProblemSection() {
  const { ref, classes } = useReveal(0.2)

  return (
    <section className="py-24 relative z-10">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto mb-16 ${classes}`}>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
            As restrições estão <span className="text-primary">travando seus planos?</span>
          </h2>
          <p className="text-white/60 font-medium text-lg">
            Sabemos o quanto uma negativação injusta prejudica sua paz. Nós temos a solução amparada
            por lei.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {problems.map((prob, idx) => (
            <ProblemCard key={idx} prob={prob} />
          ))}
        </div>
      </div>
    </section>
  )
}
