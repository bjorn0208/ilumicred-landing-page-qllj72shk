import { ArrowRight, ShieldCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/use-reveal'

export function HeroSection() {
  const { ref, classes } = useReveal()

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] z-0 pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto" ref={ref}>
        <div className={`max-w-4xl mx-auto text-center ${classes}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-sm font-medium rounded-full bg-primary/5 text-primary border border-primary/10">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Amparado pelo Código de Defesa do Consumidor
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
            Limpe seu nome e recupere seu crédito de forma{' '}
            <span className="text-primary relative inline-block">
              legal e segura
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-secondary"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminamos apontamentos no SPC/Serasa sem que você precise pagar as dívidas originais,
            através de falhas de notificação. Volte a ter crédito no mercado em até 30 dias.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#consulta" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg h-14 px-8 btn-glow bg-secondary text-primary hover:bg-secondary/90 font-bold group"
              >
                Consultar meu CPF Agora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span>+5.000 clientes satisfeitos</span>
            </div>
          </div>

          {/* Trust Logos Placeholder */}
          <div className="pt-8 border-t border-border/60">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">
              Atuamos junto aos principais órgãos
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="font-bold text-xl text-foreground">SERASA</div>
              <div className="font-bold text-xl text-foreground">SPC BRASIL</div>
              <div className="font-bold text-xl text-foreground">BOA VISTA</div>
              <div className="font-bold text-xl text-foreground">CENIQ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
