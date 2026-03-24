import { useReveal } from '@/hooks/use-reveal'
import { Star, Quote } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Empresário',
    text: 'Limpei meu nome em 25 dias úteis. Finalmente consegui o limite para capital de giro que minha empresa precisava. Atendimento impecável.',
    gender: 'male',
    seed: 11,
  },
  {
    name: 'Ana P.',
    role: 'Autônoma',
    text: 'Eu não aguentava mais ter cartão negado. Fiquei desconfiada no início, mas o processo foi transparente e 100% legal. Meu score já subiu 300 pontos.',
    gender: 'female',
    seed: 12,
  },
  {
    name: 'Roberto F.',
    role: 'Servidor Público',
    text: 'Excelente atendimento do Dominic e da equipe. Explicaram tudo sobre o CDC e resolveram minhas restrições sem dor de cabeça.',
    gender: 'male',
    seed: 13,
  },
]

export function SocialProofSection() {
  const { ref, classes } = useReveal()

  return (
    <section id="depoimentos" className="py-24 relative z-10">
      <div className="absolute inset-0 bg-primary/5 -skew-y-2 transform origin-top-left -z-10" />
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-16 ${classes}`}>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
            Histórias Reais de <br /> <span className="text-primary">Recuperação</span>
          </h2>
        </div>

        <div className={`max-w-6xl mx-auto ${classes} delay-200`}>
          <Carousel
            opts={{ align: 'center', loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="glass-panel p-8 rounded-[2rem] h-full flex flex-col relative overflow-hidden group">
                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="w-12 h-12 text-primary" />
                    </div>
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-white/80 font-medium text-base mb-8 flex-1 leading-relaxed">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                      <img
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${t.gender}&seed=${t.seed}`}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-primary/50"
                      />
                      <div>
                        <div className="font-display font-bold text-white text-sm">{t.name}</div>
                        <div className="text-xs font-medium text-white/50">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-white/70 h-12 w-12" />
              <CarouselNext className="static translate-y-0 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-white/70 h-12 w-12" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
