import { useState, useEffect } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { ScoreMeter } from '@/components/ScoreMeter'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
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
    text: 'Graças a Ilumicred consegui limpar meu nome em 20 dias e finalmente financiar meu carro novo.',
    rating: 5,
    gender: 'male',
    seed: 1,
  },
  {
    name: 'Ana P.',
    role: 'Autônoma',
    text: 'Eu não aguentava mais ter crédito negado. O processo foi super transparente e rápido.',
    rating: 5,
    gender: 'female',
    seed: 2,
  },
  {
    name: 'Roberto F.',
    role: 'Servidor Público',
    text: 'Excelente atendimento. Me explicaram tudo sobre a lei e resolveram meu problema.',
    rating: 5,
    gender: 'male',
    seed: 3,
  },
  {
    name: 'Juliana T.',
    role: 'Comerciante',
    text: 'Consegui capital de giro para minha loja após a reabilitação do meu CPF. Gratidão!',
    rating: 5,
    gender: 'female',
    seed: 4,
  },
]

export function SocialProofSection() {
  const { ref, classes } = useReveal()
  const [isAfter, setIsAfter] = useState(false)
  const [score, setScore] = useState(250)

  // When toggle changes, update score to trigger animation
  const handleToggle = (checked: boolean) => {
    setIsAfter(checked)
    setScore(checked ? 850 : 250)
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${classes}`}>
          {/* Before / After Interactive */}
          <div className="flex flex-col items-center bg-background rounded-3xl p-10 border border-border shadow-sm">
            <h3 className="text-2xl font-bold mb-8 text-center">A transformação do seu CPF</h3>

            <div className="flex items-center gap-4 mb-10 bg-white p-2 rounded-full border shadow-sm">
              <span
                className={`text-sm font-semibold px-3 ${!isAfter ? 'text-destructive' : 'text-muted-foreground'}`}
              >
                Antes
              </span>
              <Switch
                checked={isAfter}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-success data-[state=unchecked]:bg-destructive"
              />
              <span
                className={`text-sm font-semibold px-3 ${isAfter ? 'text-success' : 'text-muted-foreground'}`}
              >
                Depois da Ilumicred
              </span>
            </div>

            <div className="h-48 flex items-center justify-center w-full">
              <ScoreMeter score={score} />
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              * Resultados reais baseados na média de nossos clientes após a limpeza de
              apontamentos.
            </p>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aprovado por milhares de brasileiros
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Não acredite apenas em nossas palavras. Veja o que quem já recuperou o poder de compra
              tem a dizer.
            </p>

            <div className="relative">
              <Carousel
                opts={{ align: 'start', loop: true }}
                plugins={[Autoplay({ delay: 5000 })]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {testimonials.map((t, idx) => (
                    <CarouselItem key={idx} className="pl-4 md:basis-1/2">
                      <Card className="border-none shadow-elevation h-full">
                        <CardContent className="p-6">
                          <div className="flex gap-1 mb-4">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                            ))}
                          </div>
                          <p className="text-muted-foreground text-sm italic mb-6">"{t.text}"</p>
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://img.usecurling.com/ppl/thumbnail?gender=${t.gender}&seed=${t.seed}`}
                              alt={t.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-bold text-sm">{t.name}</div>
                              <div className="text-xs text-muted-foreground">{t.role}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="-left-4 bg-white border shadow-sm" />
                  <CarouselNext className="-right-4 bg-white border shadow-sm" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
