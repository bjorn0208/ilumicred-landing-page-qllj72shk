import { useReveal } from '@/hooks/use-reveal'
import { Search, FileText, Eraser, RefreshCw, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    icon: Search,
    title: 'Análise Gratuita',
    desc: 'Verificamos a situação do seu CPF nos órgãos de proteção.',
  },
  {
    icon: FileText,
    title: 'Encaminhamento Legal',
    desc: 'Apoiados pelo CDC, iniciamos o processo administrativo.',
  },
  {
    icon: Eraser,
    title: 'Baixa de Negativações',
    desc: 'Os apontamentos irregulares são removidos do sistema.',
  },
  { icon: RefreshCw, title: 'Atualização', desc: 'Sincronização com Serasa, SPC e Boa Vista.' },
  {
    icon: LineChart,
    title: 'Recuperação',
    desc: 'Sem apontamentos, seu score volta a subir naturalmente.',
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
  const { ref, classes } = useReveal(0.5, idx * 100)
  return (
    <div
      ref={ref}
      className={cn(
        'relative flex md:flex-col items-start md:items-center gap-6 md:gap-4 group',
        classes,
      )}
    >
      {idx !== total - 1 && (
        <div className="absolute left-[27px] top-[60px] w-1 h-[calc(100%+16px)] bg-secondary md:hidden" />
      )}
      <div className="w-16 h-16 rounded-full bg-white border-4 border-primary shadow-xl flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors z-10">
        <step.icon className="w-7 h-7 text-primary" />
      </div>
      <div className="md:text-center mt-1 md:mt-2">
        <div className="inline-block px-2 py-1 bg-secondary text-black text-xs font-extrabold rounded mb-2 border border-primary">
          PASSO {idx + 1}
        </div>
        <h4 className="text-lg font-extrabold text-primary mb-2 leading-tight">{step.title}</h4>
        <p className="text-sm font-medium text-black md:max-w-[150px] leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  )
}

export function TimelineSection() {
  const { ref, classes } = useReveal()

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`text-center mb-20 ${classes}`}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
            Como funciona o nosso processo
          </h2>
          <p className="text-black font-medium text-xl max-w-2xl mx-auto bg-secondary inline-block px-6 py-2 rounded-full border-2 border-primary">
            Um método claro, seguro e amparado por lei.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative bg-white p-8 md:p-12 rounded-3xl border-4 border-secondary shadow-xl">
          <div className="hidden md:block absolute top-[85px] left-10 w-[calc(100%-80px)] h-2 bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-full" />
          </div>

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
