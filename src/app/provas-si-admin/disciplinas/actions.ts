'use server'

import { requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const disciplinaSchema = z.object({
  nome: z.string().min(1, { message: "O nome é obrigatório." }),
  professor_id: z.string().uuid({ message: "O professor é obrigatório." }),
  turma_id: z.string().uuid({ message: "A turma é obrigatória." })
})

export async function addDisciplina(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const result = disciplinaSchema.safeParse({
    nome: formData.get('nome'),
    professor_id: formData.get('professor_id'),
    turma_id: formData.get('turma_id')
  })

  if (!result.success) return { error: result.error.issues[0].message }
  const data = result.data

  const { error } = await supabase.from('disciplinas').insert(data)
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/disciplinas')
  return { success: true }
}

export async function editDisciplina(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const id = formData.get('id') as string
  if (!id) return { error: 'ID da disciplina obrigatório.' }

  const result = disciplinaSchema.safeParse({
    nome: formData.get('nome'),
    professor_id: formData.get('professor_id'),
    turma_id: formData.get('turma_id')
  })

  if (!result.success) return { error: result.error.issues[0].message }
  const data = result.data

  const { error } = await supabase.from('disciplinas').update(data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/disciplinas')
  return { success: true }
}

export async function deleteDisciplina(id: string) {
  const { supabase } = await requireAuth()
  const { error } = await supabase.from('disciplinas').delete().eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/disciplinas')
  return { success: true }
}
