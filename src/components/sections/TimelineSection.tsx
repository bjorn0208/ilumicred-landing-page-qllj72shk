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
    desc: 'Apoiados pelo CDC (Art. 42 e 43), iniciamos o processo administrativo.',
  },
  {
    icon: Eraser,
    title: 'Baixa de Negativações',
    desc: 'Os apontamentos irregulares são removidos do sistema.',
  },
  {
    icon: RefreshCw,
    title: 'Atualização de Órgãos',
    desc: 'Sincronização com Serasa, SPC e Boa Vista.',
  },
  {
    icon: LineChart,
    title: 'Recuperação de Score',
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
      {/* Mobile vertical line */}
      {idx !== total - 1 && (
        <div className="absolute left-[27px] top-[60px] w-0.5 h-[calc(100%+16px)] bg-border md:hidden" />
      )}

      <div className="w-14 h-14 rounded-full bg-white border-4 border-background shadow-md flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-colors z-10">
        <step.icon className="w-6 h-6 text-primary" />
      </div>

      <div className="md:text-center mt-1 md:mt-2">
        <div className="text-xs font-bold text-secondary mb-1">PASSO {idx + 1}</div>
        <h4 className="text-lg font-bold mb-2">{step.title}</h4>
        <p className="text-sm text-muted-foreground md:max-w-[150px] leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  )
}

export function TimelineSection() {
  const { ref, classes } = useReveal()

  return (
    <section id="como-funciona" className="py-24 bg-background border-y border-border">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`text-center mb-20 ${classes}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona o nosso processo</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Um método claro, seguro e amparado por lei para devolver o seu poder de compra.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Desktop horizontal line */}
          <div className="hidden md:block absolute top-[45px] left-0 w-full h-1 bg-border rounded-full overflow-hidden">
            {/* Scroll animated fill could go here if tied to complex scroll listener, using simple CSS for now */}
            <div className="h-full bg-primary/20 w-full" />
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
