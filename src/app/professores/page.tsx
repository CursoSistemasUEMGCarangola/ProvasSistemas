import { createClient } from '@/utils/supabase/server'
import { ProfessoresBoard } from '@/components/ProfessoresBoard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 0 // Dynamic page

export default async function ProfessoresPage() {
  const supabase = await createClient()

  // Buscar todas as provas futuras (a partir de hoje)
  const today = new Date()
  today.setUTCHours(0,0,0,0)

  const { data: rawExams } = await supabase
    .from('provas')
    .select('*, disciplinas(nome, professores(id, nome, email)), turmas(nome)')
    .gte('data_hora_inicio', today.toISOString())
    
  return (
    <div className="min-h-screen bg-muted/20 pb-12 transition-colors duration-300">
      {/* Header Institucional */}
      <header className="bg-white text-primary py-4 px-4 shadow-md transition-colors duration-300 border-b-4 border-secondary dark:bg-card">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <img src="/logosis03.png" alt="Logo Sistemas de Informação UEMG" className="h-16 sm:h-20 w-auto object-contain" />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary dark:text-primary">Agenda dos Professores</h1>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mt-1">Sistemas de Informação - UEMG Carangola</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button render={<Link href="/" />} variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 text-primary">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Calendário
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-8">
        <section>
          <ProfessoresBoard provas={rawExams || []} />
        </section>
      </main>
    </div>
  )
}
