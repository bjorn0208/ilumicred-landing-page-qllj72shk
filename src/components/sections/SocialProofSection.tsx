import { useState } from 'react'
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
    text: 'Limpei meu nome em 20 dias e finalmente financiei meu carro novo. Recomendo muito!',
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
    text: 'Excelente atendimento do Dominic. Explicaram tudo sobre a lei e resolveram.',
    rating: 5,
    gender: 'male',
    seed: 3,
  },
  {
    name: 'Juliana T.',
    role: 'Comerciante',
    text: 'Consegui capital de giro para minha loja após a reabilitação. Gratidão!',
    rating: 5,
    gender: 'female',
    seed: 4,
  },
]

export function SocialProofSection() {
  const { ref, classes } = useReveal()
  const [isAfter, setIsAfter] = useState(false)
  const [score, setScore] = useState(250)

  const handleToggle = (checked: boolean) => {
    setIsAfter(checked)
    setScore(checked ? 850 : 250)
  }

  return (
    <section id="depoimentos" className="py-24 bg-white border-t-4 border-primary">
      <div className="container px-4 mx-auto" ref={ref}>
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${classes}`}>
          <div className="flex flex-col items-center bg-white rounded-3xl p-10 border-4 border-secondary shadow-xl relative">
            <div className="absolute -top-5 bg-primary text-white font-bold px-6 py-2 rounded-full border-2 border-white shadow-md">
              A transformação do seu CPF
            </div>

            <div className="flex items-center gap-4 mt-8 mb-10 bg-white p-3 rounded-full border-2 border-primary shadow-sm">
              <span
                className={`text-sm font-extrabold px-3 ${!isAfter ? 'text-destructive' : 'text-black/40'}`}
              >
                Antes
              </span>
              <Switch
                checked={isAfter}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-success data-[state=unchecked]:bg-destructive"
              />
              <span
                className={`text-sm font-extrabold px-3 ${isAfter ? 'text-success' : 'text-black/40'}`}
              >
                Depois da Ilumicred
              </span>
            </div>

            <div className="h-48 flex items-center justify-center w-full">
              <ScoreMeter score={score} />
            </div>
            <p className="text-center text-sm font-bold text-black mt-6">
              * Resultados reais baseados na média de clientes.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-black">
              Aprovado por milhares de <span className="text-primary">brasileiros</span>
            </h2>
            <p className="text-black font-medium text-xl mb-10">
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
                    <CarouselItem key={idx} className="pl-4 md:basis-full lg:basis-full">
                      <Card className="bg-secondary border-2 border-primary shadow-lg h-full rounded-2xl">
                        <CardContent className="p-8">
                          <div className="flex gap-1 mb-4 bg-white inline-flex p-2 rounded-lg border border-primary/20">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="text-black font-bold text-lg italic mb-8">"{t.text}"</p>
                          <div className="flex items-center gap-4">
                            <img
                              src={`https://img.usecurling.com/ppl/thumbnail?gender=${t.gender}&seed=${t.seed}`}
                              alt={t.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                            />
                            <div>
                              <div className="font-extrabold text-primary text-lg">{t.name}</div>
                              <div className="text-sm font-bold text-black/70">{t.role}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:flex gap-2 mt-6 justify-end">
                  <CarouselPrevious className="static translate-y-0 bg-white border-2 border-primary shadow-sm hover:bg-secondary text-primary" />
                  <CarouselNext className="static translate-y-0 bg-white border-2 border-primary shadow-sm hover:bg-secondary text-primary" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
