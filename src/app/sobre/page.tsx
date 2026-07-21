import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-muted/20 pb-12 transition-colors duration-300">
      <header className="bg-white text-primary py-4 px-4 shadow-md border-b-4 border-secondary dark:bg-card">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <img src="/logosis03.png" alt="Logo Sistemas de Informação UEMG" className="h-16 sm:h-20 w-auto object-contain" />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Sobre o Projeto</h1>
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
          <h2>Sobre o Sistema</h2>
          <p>
            O "Calendário de Provas - SI UEMG Carangola" é um sistema institucional voltado para a organização,
            divulgação e consulta das datas de avaliações do curso de Sistemas de Informação. 
          </p>

          <h2>O Problema que Resolvemos</h2>
          <p>
            Desenvolvido sob medida para solucionar desafios de comunicação acadêmica, a plataforma evita 
            choques de horário entre disciplinas, ajuda na organização dos professores e garante que nenhum 
            aluno perca as datas de suas avaliações.
          </p>

          <h2>PWA: O Aplicativo na Palma da Mão</h2>
          <p>
            Construímos o sistema priorizando dispositivos móveis (<strong>Mobile-first</strong>). Ao utilizar a plataforma 
            em seu celular, é possível instalá-la como um aplicativo nativo (PWA - Progressive Web App).
            Dessa forma, os alunos podem acessar as datas com um único clique direto da tela inicial, com maior
            velocidade e resiliência a oscilações de internet.
          </p>
          
          <h2>Tecnologia de Ponta</h2>
          <p>
            Apoiado na arquitetura <em>Serverless</em> através da Vercel, o sistema utiliza frameworks de ponta
            como Next.js (App Router), React 19, e banco de dados relacional Supabase com PostgreSQL. 
            O projeto também conta com adaptação inteligente de temas para suportar períodos de "Vedação Eleitoral" institucionalmente.
          </p>

          <hr />
          
          <p className="text-sm text-center text-muted-foreground">
            <em>Desenvolvido como projeto institucional para o curso de Sistemas de Informação - UEMG (Unidade Carangola).</em>
          </p>
        </section>
      </main>
    </div>
  )
}
