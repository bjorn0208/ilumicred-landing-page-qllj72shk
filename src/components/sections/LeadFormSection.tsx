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
    <section id="consulta" className="py-24 bg-white relative z-10">
      <div className="container px-4 mx-auto max-w-5xl" ref={ref}>
        <div
          className={`grid md:grid-cols-2 gap-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-primary ${classes}`}
        >
          {/* Info Side - Yellow */}
          <div className="p-8 md:p-12 bg-secondary text-black flex flex-col justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-primary">
            <h2 className="text-4xl font-extrabold mb-6 text-primary">Consulta Gratuita</h2>
            <p className="text-black font-bold text-lg mb-10 leading-relaxed bg-white/40 p-4 rounded-xl border border-primary/20">
              Descubra agora mesmo se o seu CPF pode ser limpo através do nosso processo legal. Não
              cobramos nada pela análise.
            </p>
            <div className="space-y-6">
              {[
                { n: '1', t: 'Preencha seus dados', active: step >= 1 },
                { n: '2', t: 'Análise de viabilidade', active: step >= 2 },
                { n: '3', t: 'Proposta de solução', active: step >= 4 },
              ].map((s) => (
                <div
                  key={s.n}
                  className={`flex items-center gap-4 ${s.active ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold border-2 ${s.active ? 'bg-primary text-white border-primary' : 'bg-transparent border-primary text-primary'}`}
                  >
                    {s.n}
                  </div>
                  <span className="font-bold text-lg">{s.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side - White */}
          <div className="p-8 md:p-12 bg-white" id="lead-form-card">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8 border-4 border-primary shadow-lg">
                  <Check className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-extrabold mb-4 text-primary">Dados Recebidos!</h3>
                <p className="text-black font-medium text-lg mb-8 bg-secondary/10 p-4 rounded-xl border border-secondary">
                  O Dominic e nossa equipe já estão analisando seu CPF e te chamarão no WhatsApp em
                  instantes.
                </p>
                <Button
                  variant="outline"
                  className="h-14 px-8 font-bold border-2 border-primary text-primary hover:bg-secondary hover:text-black"
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
                <div className="mb-10">
                  <div className="flex justify-between text-sm font-extrabold text-primary mb-3">
                    <span>Passo {step} de 4</span>
                    <span>{Math.round(currentProgress)}%</span>
                  </div>
                  <Progress value={currentProgress} className="h-3 border border-primary/20" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
                  {step === 1 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-2xl font-extrabold mb-6 text-primary">
                        Qual é o seu nome?
                      </h3>
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-base font-bold text-black">
                          Nome Completo
                        </Label>
                        <Input
                          id="name"
                          placeholder="Ex: João da Silva"
                          className={`h-14 text-lg border-2 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-primary'}`}
                          {...register('name')}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), handleNextStep(['name']))
                          }
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive font-bold">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-2xl font-extrabold mb-6 text-primary">
                        Informe seu CPF para análise
                      </h3>
                      <div className="space-y-3">
                        <Label htmlFor="cpf" className="text-base font-bold text-black">
                          CPF
                        </Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          className={`h-14 text-lg border-2 ${errors.cpf ? 'border-destructive focus-visible:ring-destructive' : 'border-primary'}`}
                          {...register('cpf')}
                          onChange={(e) =>
                            setValue('cpf', formatCPF(e.target.value), { shouldValidate: true })
                          }
                          onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), handleNextStep(['cpf']))
                          }
                        />
                        {errors.cpf && (
                          <p className="text-sm text-destructive font-bold">{errors.cpf.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-2xl font-extrabold mb-6 text-primary">
                        Onde enviamos o resultado?
                      </h3>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-base font-bold text-black">
                          WhatsApp com DDD
                        </Label>
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          className={`h-14 text-lg border-2 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : 'border-primary'}`}
                          {...register('phone')}
                          onChange={(e) =>
                            setValue('phone', formatPhone(e.target.value), { shouldValidate: true })
                          }
                          onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), handleNextStep(['phone']))
                          }
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive font-bold">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                      <h3 className="text-2xl font-extrabold mb-6 text-primary">
                        Confirme seus dados
                      </h3>
                      <div className="bg-secondary/20 p-6 rounded-xl space-y-4 mb-6 border-2 border-secondary">
                        <div className="text-base">
                          <span className="font-bold text-black">Nome:</span>{' '}
                          <span className="font-extrabold text-primary">{watch('name')}</span>
                        </div>
                        <div className="text-base">
                          <span className="font-bold text-black">CPF:</span>{' '}
                          <span className="font-extrabold text-primary">{watch('cpf')}</span>
                        </div>
                        <div className="text-base">
                          <span className="font-bold text-black">WhatsApp:</span>{' '}
                          <span className="font-extrabold text-primary">{watch('phone')}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border-2 border-primary/20">
                        <Checkbox
                          id="terms"
                          checked={watch('terms')}
                          onCheckedChange={(c) =>
                            setValue('terms', c as boolean, { shouldValidate: true })
                          }
                          className="border-primary data-[state=checked]:bg-primary mt-1"
                        />
                        <div className="grid gap-2 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-bold text-black cursor-pointer"
                          >
                            Aceito os termos de uso e política de privacidade
                          </label>
                          <p className="text-xs font-medium text-black/70">
                            Concordo em ser contatado via WhatsApp. Seus dados estão seguros.
                          </p>
                        </div>
                      </div>
                      {errors.terms && (
                        <p className="text-sm text-destructive font-bold mt-2">
                          {errors.terms.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-10 flex gap-4">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-14 px-8 font-bold border-2 border-primary text-black hover:bg-secondary/20"
                        onClick={() => setStep(step - 1)}
                      >
                        Voltar
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button
                        type="button"
                        className="h-14 flex-1 bg-primary text-white hover:bg-primary/90 text-lg font-bold"
                        onClick={() => {
                          if (step === 1) handleNextStep(['name'])
                          if (step === 2) handleNextStep(['cpf'])
                          if (step === 3) handleNextStep(['phone'])
                        }}
                      >
                        Próximo <ChevronRight className="w-6 h-6 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 flex-1 bg-secondary text-black hover:bg-secondary/90 text-lg font-bold btn-glow border-2 border-primary"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                          <>
                            <Lock className="w-5 h-5 mr-2" /> Quero Limpar Meu Nome
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
