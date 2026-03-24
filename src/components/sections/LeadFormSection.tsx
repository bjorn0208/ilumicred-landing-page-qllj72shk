import { useState } from 'react'
import { Check, ChevronRight, Loader2, Lock, Shield } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { formatCPF, formatPhone, isValidCPF } from '@/lib/formatters'
import { createLead } from '@/services/leads'
import { Confetti } from '@/components/Confetti'
import { MagneticButton } from '@/components/MagneticButton'
import { cn } from '@/lib/utils'

export function LeadFormSection() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [debtRange, setDebtRange] = useState('')
  const [timeNegativated, setTimeNegativated] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { ref, classes } = useReveal()

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (name.length < 3) newErrors.name = 'Nome muito curto'
      if (!isValidCPF(cpf)) newErrors.cpf = 'CPF inválido'
    } else if (currentStep === 2) {
      if (phone.length < 14) newErrors.phone = 'WhatsApp inválido'
    } else if (currentStep === 3) {
      if (!debtRange) newErrors.debtRange = 'Selecione uma opção'
      if (!timeNegativated) newErrors.timeNegativated = 'Selecione uma opção'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1)
    } else {
      const formContainer = document.getElementById('form-container')
      formContainer?.classList.remove('animate-shake')
      void formContainer?.offsetWidth // trigger reflow
      formContainer?.classList.add('animate-shake')
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)
    try {
      await createLead({
        name,
        cpf,
        phone,
        debt_range: debtRange,
        time_negativated: timeNegativated,
      })
      setStep(4)
    } catch (error) {
      setErrors({ submit: 'Erro ao enviar. Tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const debtOptions = ['Até R$ 2.000', 'R$ 2.000 a R$ 10.000', 'Acima de R$ 10.000']
  const timeOptions = ['Menos de 1 ano', '1 a 3 anos', 'Mais de 3 anos']

  return (
    <section id="consulta" className="py-24 relative z-20">
      <div className="container px-4 mx-auto max-w-4xl" ref={ref}>
        <div
          id="form-container"
          className={`glass-panel rounded-[2rem] overflow-hidden ${classes}`}
        >
          <div className="grid md:grid-cols-5">
            {/* Info Sidebar */}
            <div className="md:col-span-2 bg-white/5 p-8 border-r border-white/10 flex flex-col justify-between hidden md:flex relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <div>
                <Shield className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-display font-bold text-2xl text-white mb-4">Análise Segura</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  Seus dados são criptografados e usados exclusivamente para consulta de viabilidade
                  jurídica.
                </p>
              </div>
              <div className="space-y-4 relative z-10">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'flex items-center gap-3 transition-opacity duration-300',
                      step >= s ? 'opacity-100' : 'opacity-30',
                    )}
                  >
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                        step >= s ? 'bg-primary text-white' : 'border border-white/30 text-white',
                      )}
                    >
                      {step > s ? <Check className="w-3 h-3" /> : s}
                    </div>
                    <span className="text-sm font-medium text-white">
                      {s === 1 ? 'Dados Iniciais' : s === 2 ? 'Contato' : 'Situação'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Area */}
            <div className="md:col-span-3 p-8 md:p-12 relative min-h-[450px] flex flex-col justify-center">
              {step === 4 && <Confetti />}

              {step === 4 ? (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/50 neon-glow">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Tudo Certo!</h3>
                  <p className="text-white/70 mb-8 leading-relaxed">
                    Recebemos seus dados. Nossa equipe jurídica já vai iniciar a análise do seu CPF
                    e chamaremos no WhatsApp em breve.
                  </p>
                  <MagneticButton
                    onClick={() => {
                      setStep(1)
                      setName('')
                      setCpf('')
                      setPhone('')
                    }}
                    className="w-full py-4 rounded-xl bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10"
                  >
                    Nova Consulta
                  </MagneticButton>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-display font-bold text-white mb-8">
                    {step === 1
                      ? 'Vamos começar'
                      : step === 2
                        ? 'Onde enviamos?'
                        : 'Detalhes da Dívida'}
                  </h3>

                  <div className="flex-1 space-y-5">
                    {step === 1 && (
                      <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                        <div className="space-y-4">
                          <div>
                            <input
                              type="text"
                              placeholder="Nome Completo"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={cn(
                                'w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors',
                                errors.name ? 'border-destructive' : 'border-white/10',
                              )}
                            />
                            {errors.name && (
                              <p className="text-destructive text-xs mt-1 ml-1">{errors.name}</p>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="CPF (000.000.000-00)"
                              value={cpf}
                              onChange={(e) => setCpf(formatCPF(e.target.value))}
                              maxLength={14}
                              className={cn(
                                'w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors',
                                errors.cpf ? 'border-destructive' : 'border-white/10',
                              )}
                            />
                            {errors.cpf && (
                              <p className="text-destructive text-xs mt-1 ml-1">{errors.cpf}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                        <div>
                          <input
                            type="tel"
                            placeholder="WhatsApp (DD) 00000-0000"
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            maxLength={15}
                            className={cn(
                              'w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors',
                              errors.phone ? 'border-destructive' : 'border-white/10',
                            )}
                          />
                          {errors.phone && (
                            <p className="text-destructive text-xs mt-1 ml-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-6">
                        <div>
                          <label className="text-sm font-medium text-white/70 mb-3 block">
                            Qual o valor aproximado das restrições?
                          </label>
                          <div className="grid gap-3">
                            {debtOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setDebtRange(opt)}
                                className={cn(
                                  'text-left px-5 py-3 rounded-xl border transition-all text-sm font-medium',
                                  debtRange === opt
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30',
                                )}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {errors.debtRange && (
                            <p className="text-destructive text-xs mt-1 ml-1">{errors.debtRange}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white/70 mb-3 block">
                            Há quanto tempo está negativado?
                          </label>
                          <div className="grid gap-3">
                            {timeOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setTimeNegativated(opt)}
                                className={cn(
                                  'text-left px-5 py-3 rounded-xl border transition-all text-sm font-medium',
                                  timeNegativated === opt
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30',
                                )}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {errors.timeNegativated && (
                            <p className="text-destructive text-xs mt-1 ml-1">
                              {errors.timeNegativated}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex gap-4">
                    {step > 1 && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        className="px-6 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold"
                      >
                        Voltar
                      </button>
                    )}

                    <MagneticButton
                      onClick={step === 3 ? handleSubmit : handleNext}
                      disabled={isSubmitting}
                      className="flex-1 py-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 border border-white/20 shadow-lg hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : step === 3 ? (
                        <>
                          <Lock className="w-4 h-4" /> Concluir
                        </>
                      ) : (
                        <>
                          Próximo <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                  {errors.submit && (
                    <p className="text-destructive text-center text-sm mt-4">{errors.submit}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
