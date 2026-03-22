import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/use-reveal'

export function FinalCTASection() {
  const { ref, classes } = useReveal()

  return (
    <section className="py-24 relative overflow-hidden bg-secondary border-t-4 border-primary">
      {/* Dynamic Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
          backgroundSize: '30px 30px',
        }}
      ></div>

      <div className="container relative z-10 px-4 mx-auto text-center" ref={ref}>
        <div
          className={`max-w-4xl mx-auto bg-white p-12 rounded-[3rem] border-4 border-primary shadow-2xl ${classes}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 leading-tight">
            Sua liberdade financeira começa{' '}
            <span className="bg-secondary text-black px-4 py-1 rounded-lg border-2 border-primary inline-block transform -rotate-2">
              hoje.
            </span>
          </h2>
          <p className="text-xl text-black font-bold mb-10 max-w-2xl mx-auto">
            Não deixe que restrições injustas travem seus sonhos. Dê o primeiro passo para limpar
            seu nome agora mesmo, sem compromisso.
          </p>

          <a href="#consulta" className="inline-block">
            <Button
              size="lg"
              className="h-16 px-12 text-xl font-extrabold bg-primary text-white hover:bg-primary/90 btn-glow transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-white shadow-xl"
            >
              Fazer Análise Gratuita
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </a>

          <p className="mt-8 text-sm font-bold text-black/60 uppercase tracking-widest">
            Análise sigilosa e 100% segura.
          </p>
        </div>
      </div>
    </section>
  )
}
