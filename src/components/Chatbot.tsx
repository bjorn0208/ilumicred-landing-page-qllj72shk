import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = { id: string; role: 'bot' | 'user'; content: React.ReactNode }

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content:
        'Olá! Sou o Dominic, assistente da Ilumicred. Posso te explicar sobre nossos prazos, fundamentação legal ou valores.\n\n👉 Tem mais alguma dúvida?',
    },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      const lower = userMsg.content?.toString().toLowerCase() || ''
      let text = ''
      let isFinal = false

      if (
        lower.includes('sim') ||
        lower.includes('quero') ||
        lower.includes('formulario') ||
        lower.includes('contato')
      ) {
        text =
          'Por favor, preencha nosso formulário para entrarmos em contato com você. Assim, podemos falar com mais clareza ou até marcar uma reunião ao vivo.'
        isFinal = true
      } else if (lower.includes('legal') || lower.includes('lei') || lower.includes('funciona')) {
        text =
          'Trabalhamos fundamentados no Código de Defesa do Consumidor (Art. 42 e 43). Encaminhamos seu CPF para os representantes legais realizarem a baixa por irregularidades (como falta de notificação prévia).'
      } else if (
        lower.includes('tempo') ||
        lower.includes('prazo') ||
        lower.includes('demora') ||
        lower.includes('dias')
      ) {
        text =
          'O prazo é de 15 a 45 dias úteis para a remoção dos apontamentos. Seu score começa a atualizar entre 7 e 15 dias após a baixa.'
      } else if (lower.includes('valor') || lower.includes('preco') || lower.includes('custa')) {
        text =
          'Nossos serviços começam em R$ 597,00, mas o valor exato depende da complexidade e análise do seu caso.'
      } else {
        text =
          'Posso te explicar sobre nossos prazos, fundamentação legal (Art. 42 e 43) ou valores. O que deseja saber?'
      }

      if (!isFinal) {
        text += '\n\n👉 Tem mais alguma dúvida?'
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: isFinal ? (
          <div className="flex flex-col gap-3">
            <span>{text}</span>
            <a
              href="#consulta"
              className="bg-primary text-white text-center font-bold px-4 py-2 rounded-lg border border-white/20 hover:bg-primary/80 transition-colors text-sm shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Preencher Formulário
            </a>
          </div>
        ) : (
          <span className="whitespace-pre-wrap">{text}</span>
        ),
      }

      setMessages((prev) => [...prev, botResponse])
    }, 600)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[340px] h-[480px] glass-panel bg-black/60 rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-white/10 border-b border-white/10 p-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full border border-primary/30">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Dominic</div>
                <div className="text-xs text-white/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>{' '}
                  Online
                </div>
              </div>
            </div>
            <button
              className="text-white/50 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin"
            ref={scrollRef}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex items-end gap-2 max-w-[85%]',
                  msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start',
                )}
              >
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  {msg.role === 'user' ? (
                    <User className="w-3 h-3 text-white/70" />
                  ) : (
                    <Bot className="w-3 h-3 text-primary" />
                  )}
                </div>
                <div
                  className={cn(
                    'p-3 rounded-2xl text-sm font-medium shadow-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm border border-primary/50'
                      : 'bg-white/10 text-white/90 rounded-bl-sm border border-white/10 backdrop-blur-sm',
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white/5 border-t border-white/10 flex gap-2 backdrop-blur-md">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.4)] hover:scale-110 transition-transform z-50 border border-white/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
