'use server'

import { requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const professorSchema = z.object({
  nome: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "E-mail inválido." }).or(z.literal(''))
})

export async function addProfessor(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const result = professorSchema.safeParse({
    nome: formData.get('nome'),
    email: formData.get('email') || ''
  })

  if (!result.success) return { error: result.error.issues[0].message }
  const data = result.data

  const { error } = await supabase.from('professores').insert(data)
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/professores')
  return { success: true }
}

export async function editProfessor(formData: FormData) {
  const { supabase } = await requireAuth()
  
  const id = formData.get('id') as string
  if (!id) return { error: 'ID do professor obrigatório.' }

  const result = professorSchema.safeParse({
    nome: formData.get('nome'),
    email: formData.get('email') || ''
  })

  if (!result.success) return { error: result.error.issues[0].message }
  const data = result.data

  const { error } = await supabase.from('professores').update(data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/professores')
  return { success: true }
}

export async function deleteProfessor(id: string) {
  const { supabase } = await requireAuth()
  const { error } = await supabase.from('professores').delete().eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/provas-si-admin/professores')
  return { success: true }
}
