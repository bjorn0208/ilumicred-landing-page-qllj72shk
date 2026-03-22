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
    a: 'Sim. Trabalhamos fundamentados no Código de Defesa do Consumidor (Art. 42 e 43). O processo foca na anulação das restrições devido a irregularidades nas notificações ou prazos prescritos, de forma 100% legal e administrativa.',
  },
  {
    q: 'Quanto tempo demora para o nome ficar limpo?',
    a: 'Em média, nossos clientes têm seus CPFs reabilitados nos órgãos de proteção ao crédito em até 30 a 45 dias úteis após o início do processo.',
  },
  {
    q: 'A dívida com o credor desaparece?',
    a: 'Não. A dívida original permanece com a instituição financeira. O que desaparece é a negativação pública (SPC/Serasa/Boa Vista), o que permite que seu Score volte a subir e você recupere crédito no mercado com outros bancos.',
  },
  {
    q: 'Meu score vai voltar a subir?',
    a: 'Sim! Com a remoção dos apontamentos negativos que puxam sua pontuação para baixo, o sistema entenderá que você não tem mais restrições ativas e seu score começará a se recuperar.',
  },
  {
    q: 'A avaliação inicial tem algum custo?',
    a: 'Não, a nossa análise de viabilidade do seu CPF é totalmente gratuita. Só apresentamos uma proposta caso seu perfil se enquadre nos requisitos legais para reabilitação.',
  },
]

export function FAQSection() {
  const { ref, classes } = useReveal()

  return (
    <section id="faq" className="py-24 bg-white border-t border-border">
      <div className="container px-4 mx-auto max-w-3xl" ref={ref}>
        <div className={`text-center mb-16 ${classes}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dúvidas Frequentes</h2>
          <p className="text-muted-foreground text-lg">
            Respondemos as principais perguntas sobre a reabilitação de crédito.
          </p>
        </div>

        <Accordion type="single" collapsible className={`w-full ${classes}`}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-border py-2"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors data-[state=open]:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
