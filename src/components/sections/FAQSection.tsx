import { useReveal } from '@/hooks/use-reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'O processo é realmente legal?',
    a: 'Sim. Trabalhamos estritamente dentro da lei, fundamentados no Código de Defesa do Consumidor (Art. 42 e 43). Atuamos na quebra processual por falta de notificação prévia (Aviso de Recebimento), exigindo a baixa administrativa dos apontamentos.',
  },
  {
    q: 'Quanto tempo demora para o nome ficar limpo?',
    a: 'O prazo legal administrativo é de 15 a 45 dias úteis para que Serasa, Boa Vista e SPC retirem as restrições do sistema visível.',
  },
  {
    q: 'A dívida com o credor desaparece?',
    a: 'Não prometemos o perdão da dívida. A dívida original permanece com o banco/credor. Nosso serviço remove a publicidade dessa dívida (a negativação no CPF), permitindo que seu score volte a subir e você volte a ter crédito.',
  },
  {
    q: 'E se o apontamento voltar?',
    a: 'Oferecemos garantia em contrato. Se o mesmo apontamento voltar a negativar seu CPF devido a processos refeitos pelo banco de forma incorreta dentro do período coberto, nós refazemos o procedimento sem custo adicional.',
  },
]

export function FAQSection() {
  const { ref, classes } = useReveal()

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="container px-4 mx-auto max-w-3xl" ref={ref}>
        <div className={`text-center mb-12 ${classes}`}>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Perguntas Frequentes
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className={`w-full glass-panel rounded-3xl p-6 md:p-10 ${classes} delay-200`}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-white/10 py-2 last:border-0"
            >
              <AccordionTrigger className="text-left text-lg font-display font-bold text-white hover:text-primary transition-colors hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 font-sans leading-relaxed text-base pt-2 pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
