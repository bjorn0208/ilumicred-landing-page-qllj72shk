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
    a: 'Em média, nossos clientes têm seus CPFs reabilitados nos órgãos de proteção ao crédito em até 15 a 45 dias úteis após o início do processo.',
  },
  {
    q: 'A dívida com o credor desaparece?',
    a: 'Não. A dívida original permanece com a instituição financeira. O que desaparece é a negativação pública (SPC/Serasa/Boa Vista), o que permite que seu Score volte a subir.',
  },
  {
    q: 'Meu score vai voltar a subir?',
    a: 'Sim! Com a remoção dos apontamentos negativos que puxam sua pontuação para baixo, o sistema entenderá que você não tem mais restrições ativas e seu score começará a se recuperar entre 7 a 15 dias.',
  },
  {
    q: 'A avaliação inicial tem algum custo?',
    a: 'Não, a nossa análise de viabilidade do seu CPF é totalmente gratuita. Só apresentamos uma proposta caso seu perfil se enquadre nos requisitos.',
  },
]

export function FAQSection() {
  const { ref, classes } = useReveal()

  return (
    <section id="faq" className="py-24 bg-white border-t-4 border-secondary">
      <div className="container px-4 mx-auto max-w-4xl" ref={ref}>
        <div className={`text-center mb-16 ${classes}`}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
            Dúvidas Frequentes
          </h2>
          <p className="text-black font-medium text-xl bg-secondary/20 inline-block px-6 py-2 rounded-full border border-secondary">
            Respondemos as principais perguntas sobre a reabilitação de crédito.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className={`w-full bg-white border-4 border-primary rounded-2xl p-6 md:p-8 shadow-xl ${classes}`}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b-2 border-primary/20 py-2 last:border-0"
            >
              <AccordionTrigger className="text-left text-xl font-extrabold text-primary hover:text-black transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-black font-medium leading-relaxed text-base pt-4 pb-6">
                <div className="bg-secondary/10 p-4 rounded-lg border-l-4 border-secondary">
                  {faq.a}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
