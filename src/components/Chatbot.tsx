import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { createLead } from '@/services/leads'

type Message = { id: string; role: 'bot' | 'user'; content: string }

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Olá! Sou o assistente da Ilumicred. Quer saber como limpar seu nome legalmente?',
    },
  ])
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)
  const [leadData, setLeadData] = useState({ name: '', phone: '' })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    setTimeout(async () => {
      let botResponse = ''
      if (step === 0) {
        setLeadData((prev) => ({ ...prev, name: input }))
        botResponse = `Prazer em te conhecer, ${input}! Qual o seu WhatsApp (com DDD) para um consultor especialista te chamar?`
        setStep(1)
      } else if (step === 1) {
        setLeadData((prev) => ({ ...prev, phone: input }))
        botResponse =
          'Perfeito! Já registrei seu contato. Um de nossos especialistas vai te enviar uma mensagem em instantes para analisar seu CPF sem compromisso.'
        setStep(2)
        try {
          await createLead({
            name: leadData.name || 'Via Chatbot',
            cpf: '000.000.000-00',
            phone: input,
            source: 'chatbot',
          })
        } catch (e) {
          console.error(e)
        }
      } else {
        botResponse =
          'Um consultor já está verificando seu caso. Aguarde nosso contato no WhatsApp!'
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'bot', content: botResponse },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[320px] h-[400px] bg-background border border-border rounded-xl shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-secondary" />
              <span className="font-semibold text-sm">Consultor Virtual</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-primary-foreground hover:bg-primary/80 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="flex flex-col gap-3">
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
                      'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                      msg.role === 'user'
                        ? 'bg-secondary text-primary'
                        : 'bg-muted text-muted-foreground',
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
                      'p-3 rounded-2xl text-sm',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted rounded-tl-sm',
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 bg-card border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="text-sm bg-muted/50"
              disabled={step >= 2}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={step >= 2 || !input.trim()}
              className="bg-secondary text-primary hover:bg-secondary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 animate-pulse-ring"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 text-secondary" />}
      </Button>
    </div>
  )
}
