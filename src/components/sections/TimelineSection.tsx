import { useReveal } from '@/hooks/use-reveal'
import { Search, Scale, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    icon: Search,
    title: '1. Consulta & Análise',
    desc: 'Verificamos a situação do seu CPF nos órgãos de proteção gratuitamente.',
  },
  {
    icon: Scale,
    title: '2. Processo Legal',
    desc: 'Apoiados pelo CDC, iniciamos a remoção por quebras processuais e falta de AR.',
  },
  {
    icon: LineChart,
    title: '3. Recuperação',
    desc: 'Sem apontamentos, seu score volta a subir e você recupera seu crédito.',
  },
]

function TimelineStep({
  step,
  idx,
  total,
}: {
  step: (typeof steps)[0]
  idx: number
  total: number
}) {
  const { ref, classes } = useReveal(0.3, idx * 150)
  return (
    <div ref={ref} className={cn('relative flex flex-col items-center group', classes)}>
      {idx !== total - 1 && (
        <div className="hidden md:block absolute top-[28px] left-[50%] w-full h-[2px] bg-gradient-to-r from-primary/50 to-transparent z-0" />
      )}
      {idx !== total - 1 && (
        <div className="md:hidden absolute top-[56px] left-[27px] w-[2px] h-[calc(100%-20px)] bg-gradient-to-b from-primary/50 to-transparent z-0" />
      )}
      <div className="w-14 h-14 rounded-2xl glass-panel bg-white/5 border-primary/40 flex items-center justify-center shrink-0 mb-6 relative z-10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(138,43,226,0.2)]">
        <step.icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-center">
        <h4 className="text-lg font-display font-bold text-white mb-3">{step.title}</h4>
        <p className="text-sm font-medium text-white/60 max-w-[220px] mx-auto leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  )
}

export function TimelineSection() {
  const { ref, classes } = useReveal()

  return (
    <section id="como-funciona" className="py-24 relative z-10">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`text-center mb-20 ${classes}`}>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            O Caminho para a Liberdade
          </h2>
          <div className="inline-block px-4 py-1.5 rounded-full glass-panel text-sm text-white/80 border-primary/30">
            Processo 100% administrativo e seguro.
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <TimelineStep key={idx} step={step} idx={idx} total={steps.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
