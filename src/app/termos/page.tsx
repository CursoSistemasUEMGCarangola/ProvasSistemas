import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-muted/20 pb-12 transition-colors duration-300">
      <header className="bg-white text-primary py-4 px-4 shadow-md border-b-4 border-secondary dark:bg-card">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <img src="/logosis03.png" alt="Logo Sistemas de Informação UEMG" className="h-16 sm:h-20 w-auto object-contain" />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Termos de Uso</h1>
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

      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-8 bg-white p-8 rounded-lg shadow-sm border border-border">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            O uso da plataforma "Calendário de Provas - SI UEMG Carangola" é regido por estes Termos de Uso.
            Ao acessar ou usar a plataforma, você concorda em cumprir estes termos e todas as leis e regulamentos aplicáveis.
          </p>

          <h2>2. Finalidade da Plataforma</h2>
          <p>
            O Calendário de Provas é um sistema institucional gratuito (Custo zero absoluto) focado
            exclusivamente no curso de Sistemas de Informação da UEMG Carangola, visando a redução de 
            atrito na comunicação acadêmica entre a coordenação e os alunos.
          </p>
          
          <h2>3. Responsabilidades do Usuário</h2>
          <p>
            A visualização das provas agendadas e eventos acadêmicos é de acesso público (read-only anônimo). 
            Os alunos são encorajados a verificar a plataforma regularmente. O uso não autorizado de 
            credenciais de administrador (coordenadores) ou tentativas de burla dos mecanismos de segurança 
            estão estritamente proibidos e sujeitos às políticas da UEMG.
          </p>

          <h2>4. Alterações nos Agendamentos</h2>
          <p>
            A coordenação tem a autonomia de remarcar, adiar ou cancelar provas (Tracking de Status) 
            diretamente no painel administrativo. Recomenda-se aos alunos manter o calendário exportado (PDF)
            ou o PWA frequentemente sincronizado.
          </p>
        </section>
      </main>
    </div>
  )
}
