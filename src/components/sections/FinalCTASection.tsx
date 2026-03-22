import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/use-reveal'

export function FinalCTASection() {
  const { ref, classes } = useReveal()

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A192F]">
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-0"></div>

      <div className="container relative z-10 px-4 mx-auto text-center" ref={ref}>
        <div className={`max-w-3xl mx-auto ${classes}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Sua liberdade financeira começa <span className="text-secondary text-glow">hoje</span>.
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Não deixe que restrições injustas travem seus sonhos. Dê o primeiro passo para limpar
            seu nome agora mesmo, sem compromisso.
          </p>

          <a href="#consulta" className="inline-block">
            <Button
              size="lg"
              className="h-16 px-10 text-xl font-bold bg-secondary text-primary hover:bg-secondary/90 btn-glow transform hover:scale-105 transition-all duration-300 group"
            >
              Fazer Análise Gratuita
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </a>

          <p className="mt-6 text-sm text-white/50">Análise sigilosa e 100% segura.</p>
        </div>
      </div>
    </section>
  )
}
