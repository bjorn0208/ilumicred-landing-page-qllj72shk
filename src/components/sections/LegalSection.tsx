import { Scale, CheckCircle2 } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

export function LegalSection() {
  const { ref, classes } = useReveal()

  return (
    <section
      id="legalidade"
      className="py-24 bg-white relative overflow-hidden border-y-4 border-secondary"
    >
      <div className="container px-4 mx-auto relative z-10" ref={ref}>
        <div className={`max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center ${classes}`}>
          <div className="md:col-span-2 flex justify-center relative">
            <div className="w-full max-w-sm aspect-[3/4] rounded-3xl bg-secondary border-4 border-primary p-8 flex flex-col justify-center items-center text-center shadow-2xl relative z-10">
              <div className="absolute -top-8 w-24 h-24 bg-white rounded-full flex items-center justify-center animate-float shadow-lg border-4 border-primary">
                <Scale className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-extrabold text-primary mb-4 mt-8">
                100% Amparado por Lei
              </h3>
              <p className="text-black font-bold text-lg">
                O Código de Defesa do Consumidor garante seus direitos.
              </p>
            </div>
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-black">
              É legal limpar o nome <span className="text-primary">sem pagar a dívida?</span>
            </h2>
            <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary mb-8">
              <p className="text-xl text-black font-medium leading-relaxed">
                <strong className="text-primary font-extrabold">Sim.</strong> Nosso trabalho não é
                "apagar" a dívida com o credor, mas sim anular os apontamentos irregulares nos
                órgãos de proteção (SPC/Serasa) devido a{' '}
                <strong className="font-extrabold bg-secondary px-2">
                  falhas de notificação e quebras processuais
                </strong>
                .
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Artigo 43 do CDC: O consumidor deve ser comunicado por escrito antes da negativação.',
                'Se não houve AR (Aviso de Recebimento), a negativação é nula.',
                'Atuamos de forma administrativa extrajudicial garantindo este direito.',
                'Seu score volta a subir naturalmente sem os apontamentos ativos.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-secondary shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
                  <span className="text-base font-bold text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
