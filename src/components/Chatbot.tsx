import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type Message = { id: string; role: 'bot' | 'user'; content: React.ReactNode }

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content:
        'Olá! Sou o Dominic, assistente da Ilumicred. Quer saber como limpar seu nome legalmente? 👉 Tem mais alguma dúvida?',
    },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      const lower = userMsg.content?.toString().toLowerCase() || ''
      let text = ''
      let isFinal = false

      if (lower.includes('como funciona') || lower.includes('processo')) {
        text =
          'Nosso processo começa com uma análise do seu CPF. Depois, encaminhamos seu CPF para os representantes legais realizarem a baixa por irregularidades (como falta de notificação).'
      } else if (
        lower.includes('tempo') ||
        lower.includes('prazo') ||
        lower.includes('demora') ||
        lower.includes('dias')
      ) {
        text =
          'Leva de 15 a 45 dias úteis para a baixa. Geralmente 5 dias para sair dos órgãos e 30 dias para os bancos atualizarem. Seu score recupera entre 7 e 15 dias.'
      } else if (lower.includes('valor') || lower.includes('preço') || lower.includes('custa')) {
        text = 'Nossos serviços começam em R$ 597,00, mas varia conforme o caso.'
      } else if (lower.includes('garantia') || lower.includes('garante')) {
        text =
          'Oferecemos 6 meses de garantia! Se o apontamento voltar nesse período (com pagamentos em dia), refazemos de graça.'
      } else if (
        lower.includes('sim') ||
        lower.includes('quero') ||
        lower.includes('formulário') ||
        lower.includes('contato')
      ) {
        text =
          'Excelente! Por favor, preencha nosso formulário para entrarmos em contato com você. Assim, podemos falar com mais clareza ou até marcar uma reunião ao vivo.'
        isFinal = true
      } else {
        text =
          'Posso te explicar sobre nossos prazos, garantias, valores ou como funciona o serviço. O que deseja saber?'
      }

      if (!isFinal) {
        text += ' 👉 Tem mais alguma dúvida?'
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: isFinal ? (
          <span>
            {text} <br />
            <br />
            <a
              href="#consulta"
              className="bg-secondary text-black font-bold px-4 py-2 rounded mt-2 inline-block"
              onClick={() => setIsOpen(false)}
            >
              Preencher Formulário
            </a>
          </span>
        ) : (
          text
        ),
      }

      setMessages((prev) => [...prev, botResponse])
    }, 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[340px] h-[450px] bg-white border-2 border-primary rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="bg-secondary p-1 rounded-full">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="font-bold text-sm">Dominic</div>
                <div className="text-xs text-white/80">Especialista Ilumicred</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4 bg-white" ref={scrollRef}>
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start gap-2 max-w-[85%]',
                    msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start',
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2',
                      msg.role === 'user'
                        ? 'bg-secondary border-secondary text-black'
                        : 'bg-primary border-primary text-white',
                    )}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'p-3 rounded-2xl text-sm font-medium text-black shadow-sm border',
                      msg.role === 'user'
                        ? 'bg-secondary/20 border-secondary rounded-tr-sm'
                        : 'bg-white border-primary rounded-tl-sm',
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 bg-white border-t border-primary flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="text-sm border-primary text-black"
            />
            <Button
              size="icon"
              onClick={handleSend}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-2xl bg-secondary hover:bg-secondary/90 animate-pulse-ring border-2 border-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageCircle className="w-8 h-8 text-black" />
        )}
      </Button>
    </div>
  )
}
