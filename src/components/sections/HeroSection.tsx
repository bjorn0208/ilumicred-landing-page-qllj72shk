import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { MagneticButton } from '@/components/MagneticButton'

export function HeroSection() {
  const { ref, classes } = useReveal()

  return (
    <section className="relative pt-16 pb-24 md:pt-28 md:pb-32 flex items-center min-h-[85vh]">
      <div className="container relative z-10 px-4 mx-auto" ref={ref}>
        <div className={`max-w-4xl mx-auto text-center ${classes}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs md:text-sm font-medium rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 shadow-lg">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Amparado pelo Código de Defesa do Consumidor
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[1.1] mb-8 tracking-tight">
            Recupere seu Crédito e <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary">
              Volte a Sonhar
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-sans mb-12 max-w-2xl mx-auto leading-relaxed">
            Eliminamos apontamentos irregulares no SPC/Serasa através de falhas de notificação.
            Volte a ter crédito aprovado no mercado em até 45 dias, de forma 100% legal.
          </p>

          <div className="flex flex-col items-center justify-center gap-6">
            <a href="#consulta" className="block">
              <MagneticButton className="group relative px-8 py-5 rounded-2xl bg-primary text-white font-bold text-lg overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(138,43,226,0.3)] hover:shadow-[0_0_60px_rgba(138,43,226,0.5)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-3">
                  Iniciar Análise Gratuita
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>
            </a>

            <div className="flex -space-x-3 items-center opacity-80 hover:opacity-100 transition-opacity">
              <img
                src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5"
                alt="Cliente"
                className="w-10 h-10 rounded-full border-2 border-background"
              />
              <img
                src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=6"
                alt="Cliente"
                className="w-10 h-10 rounded-full border-2 border-background"
              />
              <img
                src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=7"
                alt="Cliente"
                className="w-10 h-10 rounded-full border-2 border-background"
              />
              <div className="w-10 h-10 rounded-full border-2 border-background bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white">
                +5k
              </div>
              <span className="ml-5 text-sm text-white/60 font-medium">
                Brasileiros já reabilitados
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
