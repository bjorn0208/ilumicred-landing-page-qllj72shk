import { Scale, CheckCircle2 } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

export function LegalSection() {
  const { ref, classes } = useReveal()

  return (
    <section
      id="legalidade"
      className="py-24 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Background graphic */}
      <Scale className="absolute right-[-10%] top-[-20%] w-[600px] h-[600px] text-white/5 rotate-12 pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10" ref={ref}>
        <div className={`max-w-4xl mx-auto grid md:grid-cols-5 gap-12 items-center ${classes}`}>
          <div className="md:col-span-2 flex justify-center">
            <div className="w-full max-w-sm aspect-[3/4] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 flex flex-col justify-center items-center text-center shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full flex items-center justify-center animate-float shadow-xl">
                <Scale className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">100% Amparado por Lei</h3>
              <p className="text-white/80 text-sm">
                O Código de Defesa do Consumidor garante seus direitos.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              É legal limpar o nome sem pagar a dívida?
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              <strong className="text-secondary">Sim.</strong> Nosso trabalho não é "apagar" a
              dívida com o credor, mas sim anular os apontamentos irregulares nos órgãos de proteção
              (SPC/Serasa) devido a <strong>falhas de notificação e quebras processuais</strong>.
            </p>

            <ul className="space-y-4">
              {[
                'Artigo 43 do CDC: O consumidor deve ser comunicado por escrito antes da negativação.',
                'Se não houve AR (Aviso de Recebimento), a negativação é nula.',
                'Atuamos de forma administrativa extrajudicial garantindo este direito.',
                'Seu score volta a subir naturalmente sem os apontamentos ativos.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                  <span className="text-sm md:text-base font-medium text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
