'use server'

import { requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const turmaSchema = z.object({
  nome: z.string().min(1, { message: "O nome é obrigatório." }),
  semestre_nome: z.string().min(1, { message: "O semestre é obrigatório." })
})

// Função auxiliar (DRY) para buscar ou criar o semestre
async function findOrCreateSemestre(supabase: any, semestre_nome: string) {
  let { data: semestre } = await supabase
    .from('semestres')
    .select('id')
    .eq('nome', semestre_nome)
    .maybeSingle()

  if (semestre?.id) {
    return semestre.id
  }

  const { data: newSemestre, error: createError } = await supabase
    .from('semestres')
    .insert({ nome: semestre_nome, ativo: true })
    .select('id')
    .single()
      
  if (createError) {
    throw new Error('Erro ao criar o semestre: ' + createError.message)
  }
  
  return newSemestre.id
}

export async function addTurma(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const result = turmaSchema.safeParse({
    nome: formData.get('nome'),
    semestre_nome: formData.get('semestre_nome')
  })

  if (!result.success) return { error: result.error.issues[0].message }
  const { nome, semestre_nome } = result.data

  let semestre_id;
  try {
    semestre_id = await findOrCreateSemestre(supabase, semestre_nome)
  } catch (err: any) {
    return { error: err.message }
  }

  const { error } = await supabase.from('turmas').insert({ nome, semestre_id })
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/turmas')
  return { success: true }
}

export async function editTurma(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const id = formData.get('id') as string
  if (!id) return { error: 'ID da turma obrigatório.' }

  const result = turmaSchema.safeParse({
    nome: formData.get('nome'),
    semestre_nome: formData.get('semestre_nome')
  })

  if (!result.success) return { error: result.error.issues[0].message }
  const { nome, semestre_nome } = result.data

  let semestre_id;
  try {
    semestre_id = await findOrCreateSemestre(supabase, semestre_nome)
  } catch (err: any) {
    return { error: err.message }
  }

  const { error } = await supabase.from('turmas').update({ nome, semestre_id }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/turmas')
  return { success: true }
}

export async function deleteTurma(id: string) {
  const { supabase } = await requireAuth()
  const { error } = await supabase.from('turmas').delete().eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/turmas')
  return { success: true }
}
