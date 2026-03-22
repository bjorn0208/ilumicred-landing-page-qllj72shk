import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Check, ChevronRight, Loader2, Lock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useReveal } from '@/hooks/use-reveal'
import { formatCPF, formatPhone, isValidCPF } from '@/lib/formatters'
import { createLead } from '@/services/leads'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'

const formSchema = z.object({
  name: z.string().min(3, 'Digite seu nome completo'),
  cpf: z.string().refine((val) => isValidCPF(val), { message: 'CPF inválido' }),
  phone: z.string().min(14, 'Telefone incompleto').max(15, 'Telefone inválido'),
  terms: z.boolean().refine((val) => val === true, { message: 'Você precisa aceitar os termos' }),
})

type FormData = z.infer<typeof formSchema>

export function LeadFormSection() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const { ref, classes } = useReveal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { terms: true },
  })

  const handleNextStep = async (fieldsToValidate: (keyof FormData)[]) => {
    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setStep((prev) => prev + 1)
    } else {
      // Trigger subtle shake on form container via ID or ref if needed
      document.getElementById('lead-form-card')?.classList.add('animate-shake')
      setTimeout(
        () => document.getElementById('lead-form-card')?.classList.remove('animate-shake'),
        500,
      )
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await createLead({
        name: data.name,
        cpf: data.cpf,
        phone: data.phone,
        source: 'landing_page_form',
      })
      setIsSuccess(true)
      toast({
        title: 'Sucesso!',
        description: 'Seus dados foram enviados. Um consultor entrará em contato.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao enviar seus dados. Tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentProgress = (step / 4) * 100

  return (
    <section id="consulta" className="py-24 bg-background relative z-10">
      <div className="container px-4 mx-auto max-w-4xl" ref={ref}>
        <div
          className={`grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-border ${classes}`}
        >
          {/* Info Side */}
          <div className="p-8 md:p-12 bg-primary text-primary-foreground flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-secondary/20 rounded-full blur-[50px]"></div>
            <h2 className="text-3xl font-bold mb-4 relative z-10">Consulta Gratuita</h2>
            <p className="text-white/80 mb-8 relative z-10 leading-relaxed">
              Descubra agora mesmo se o seu CPF pode ser limpo através do nosso processo legal. Não
              cobramos nada pela análise.
            </p>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">
                  1
                </div>
                <span>Preencha seus dados</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  2
                </div>
                <span>Análise de viabilidade</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  3
                </div>
                <span>Proposta de solução</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12" id="lead-form-card">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-success" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Dados Recebidos!</h3>
                <p className="text-muted-foreground mb-8">
                  Nossa equipe já está analisando seu CPF e te chamará no WhatsApp em instantes.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1)
                    setIsSuccess(false)
                    setValue('name', '')
                    setValue('cpf', '')
                    setValue('phone', '')
                  }}
                >
                  Fazer nova consulta
                </Button>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
                    <span>Passo {step} de 4</span>
                    <span>{Math.round(currentProgress)}%</span>
                  </div>
                  <Progress value={currentProgress} className="h-2" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
                  {step === 1 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-xl font-bold mb-6">Qual é o seu nome?</h3>
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          placeholder="Ex: João da Silva"
                          className={`h-12 text-lg ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                          {...register('name')}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), handleNextStep(['name']))
                          }
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive font-medium">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-xl font-bold mb-6">Para analisarmos, informe seu CPF</h3>
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          className={`h-12 text-lg ${errors.cpf ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                          {...register('cpf')}
                          onChange={(e) =>
                            setValue('cpf', formatCPF(e.target.value), { shouldValidate: true })
                          }
                          onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), handleNextStep(['cpf']))
                          }
                        />
                        {errors.cpf && (
                          <p className="text-sm text-destructive font-medium">
                            {errors.cpf.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-xl font-bold mb-6">Onde enviamos o resultado?</h3>
                      <div className="space-y-2">
                        <Label htmlFor="phone">WhatsApp</Label>
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          className={`h-12 text-lg ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                          {...register('phone')}
                          onChange={(e) =>
                            setValue('phone', formatPhone(e.target.value), { shouldValidate: true })
                          }
                          onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), handleNextStep(['phone']))
                          }
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive font-medium">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-xl font-bold mb-6">Confirme seus dados</h3>
                      <div className="bg-muted p-4 rounded-lg space-y-3 mb-6">
                        <div className="text-sm">
                          <span className="font-semibold text-muted-foreground">Nome:</span>{' '}
                          <span className="font-bold">{watch('name')}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-muted-foreground">CPF:</span>{' '}
                          <span className="font-bold">{watch('cpf')}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-muted-foreground">WhatsApp:</span>{' '}
                          <span className="font-bold">{watch('phone')}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={watch('terms')}
                          onCheckedChange={(c) =>
                            setValue('terms', c as boolean, { shouldValidate: true })
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Aceito os termos de uso e política de privacidade
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Concordo em ser contatado via WhatsApp. Seus dados estão seguros.
                          </p>
                        </div>
                      </div>
                      {errors.terms && (
                        <p className="text-sm text-destructive mt-2">{errors.terms.message}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-8 flex gap-3">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 px-6"
                        onClick={() => setStep(step - 1)}
                      >
                        Voltar
                      </Button>
                    )}

                    {step < 4 ? (
                      <Button
                        type="button"
                        className="h-12 flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold"
                        onClick={() => {
                          if (step === 1) handleNextStep(['name'])
                          if (step === 2) handleNextStep(['cpf'])
                          if (step === 3) handleNextStep(['phone'])
                        }}
                      >
                        Próximo <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 flex-1 bg-secondary text-primary hover:bg-secondary/90 text-lg font-bold btn-glow relative overflow-hidden group"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Quero Limpar Meu Nome
                            {/* Ripple effect span */}
                            <span className="absolute w-0 h-0 bg-white/30 rounded-full transition-all duration-500 ease-out group-hover:w-[300px] group-hover:h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
