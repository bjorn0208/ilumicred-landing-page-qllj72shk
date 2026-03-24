import pb from '@/lib/pocketbase/client'

export interface CreateLeadPayload {
  name: string
  cpf: string
  phone: string
  debt_range?: string
  time_negativated?: string
  source?: string
}

export const createLead = async (data: CreateLeadPayload) => {
  return pb.collection('leads').create({
    ...data,
    status: 'new',
    source: data.source || 'landing_page',
  })
}
