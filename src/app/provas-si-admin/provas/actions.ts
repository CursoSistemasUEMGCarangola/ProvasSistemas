'use server'

import { requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const provaSchema = z.object({
  disciplina_id: z.string().uuid({ message: "Disciplina inválida" }),
  turma_id: z.string().uuid({ message: "Turma inválida" }),
  data_hora_inicio: z.string().datetime({ message: "Data e hora inválidas" }),
  tipo_avaliacao: z.string().min(1, { message: "Tipo de avaliação obrigatório" }),
  observacoes: z.string().optional(),
})

// Função auxiliar (DRY) para checar se a turma já tem prova naquele dia
async function checkTurmaConflict(supabase: any, turmaId: string, dataHoraInicioIso: string, idToExclude?: string) {
  const startOfDay = new Date(dataHoraInicioIso)
  startOfDay.setUTCHours(0, 0, 0, 0)
  
  const endOfDay = new Date(dataHoraInicioIso)
  endOfDay.setUTCHours(23, 59, 59, 999)

  let query = supabase
    .from('provas')
    .select('id, data_hora_inicio')
    .eq('turma_id', turmaId)
    .gte('data_hora_inicio', startOfDay.toISOString())
    .lte('data_hora_inicio', endOfDay.toISOString())

  if (idToExclude) {
    query = query.neq('id', idToExclude)
  }

  const { data: conflitos, error } = await query

  if (error) {
    throw new Error('Erro ao verificar disponibilidade de horário')
  }

  return conflitos && conflitos.length > 0
}

export async function addProva(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const rawData = {
    disciplina_id: formData.get('disciplina_id'),
    turma_id: formData.get('turma_id'),
    // Força timezone BRT (-03:00) para garantir que 19:00 seja 19:00 no Brasil
    data_hora_inicio: new Date(`${formData.get('data_hora_inicio')}:00-03:00`).toISOString(),
    tipo_avaliacao: formData.get('tipo_avaliacao'),
    observacoes: formData.get('observacoes') || '',
  }

  const result = provaSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }
  const data = result.data

  let hasConflict = false;
  try {
    hasConflict = await checkTurmaConflict(supabase, data.turma_id, data.data_hora_inicio)
  } catch (err: any) {
    return { error: err.message }
  }

  const { error } = await supabase.from('provas').insert({
    ...data,
    status: 'Agendada'
  })
  
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/provas')
  return { 
    success: true, 
    warning: hasConflict ? 'Atenção: A turma selecionada já possui uma avaliação agendada para esta mesma data.' : undefined 
  }
}

export async function editProva(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const id = formData.get('id') as string
  if (!id) return { error: 'ID da prova obrigatório para edição.' }

  const rawData = {
    disciplina_id: formData.get('disciplina_id'),
    turma_id: formData.get('turma_id'),
    data_hora_inicio: new Date(`${formData.get('data_hora_inicio')}:00-03:00`).toISOString(),
    tipo_avaliacao: formData.get('tipo_avaliacao'),
    observacoes: formData.get('observacoes') || '',
  }

  const result = provaSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }
  const data = result.data

  let hasConflict = false;
  try {
    hasConflict = await checkTurmaConflict(supabase, data.turma_id, data.data_hora_inicio, id)
  } catch (err: any) {
    return { error: err.message }
  }

  const { error } = await supabase.from('provas').update({
    ...data,
  }).eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/provas')
  return { 
    success: true, 
    warning: hasConflict ? 'Atenção: A turma selecionada já possui uma avaliação agendada para esta mesma data.' : undefined 
  }
}

export async function deleteProva(id: string) {
  const { supabase } = await requireAuth()
  const { error } = await supabase.from('provas').delete().eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/provas')
  return { success: true }
}
