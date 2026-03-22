import { ArrowRight, ShieldCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/use-reveal'

export function HeroSection() {
  const { ref, classes } = useReveal()

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white">
      <div className="container relative z-10 px-4 mx-auto" ref={ref}>
        <div className={`max-w-4xl mx-auto text-center ${classes}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold rounded-full bg-secondary text-black border border-primary/20 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Amparado pelo Código de Defesa do Consumidor
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-primary leading-[1.1] mb-6 tracking-tight">
            Limpe seu nome e recupere seu crédito de forma{' '}
            <span className="text-black relative inline-block">
              legal e segura
              <svg
                className="absolute w-full h-4 -bottom-2 left-0 text-secondary"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="text-lg md:text-xl text-black font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminamos apontamentos no SPC/Serasa sem que você precise pagar as dívidas originais,
            através de falhas de notificação. Volte a ter crédito no mercado em até 30 dias.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#consulta" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg h-16 px-10 btn-glow bg-primary text-white hover:bg-primary/90 font-bold group border-2 border-primary"
              >
                Consultar meu CPF Agora
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform text-secondary" />
              </Button>
            </a>
            <div className="flex items-center gap-2 text-sm font-bold text-black bg-secondary/20 px-4 py-3 rounded-lg border border-secondary">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <span>+5.000 clientes satisfeitos</span>
            </div>
          </div>

          {/* Trust Logos Placeholder */}
          <div className="pt-8 border-t-2 border-secondary/30 max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-6">
              Atuamos junto aos principais órgãos
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
              <div className="font-extrabold text-2xl text-black">SERASA</div>
              <div className="font-extrabold text-2xl text-black">SPC BRASIL</div>
              <div className="font-extrabold text-2xl text-black">BOA VISTA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
