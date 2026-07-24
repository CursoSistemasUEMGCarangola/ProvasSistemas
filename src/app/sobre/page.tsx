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
          <h2>Sobre o Projeto</h2>
          <p>
            O projeto de extensão "Calendário de Provas Digital: Integração e Acessibilidade Acadêmica", registrado no sistema SIGA sob o número 26408 e proposto pelo professor Nilton Freitas Junior, consiste no desenvolvimento e implementação de um sistema institucional voltado para a organização, divulgação e consulta das datas de avaliações do curso de Sistemas de Informação da UEMG Unidade Carangola.
          </p>
          <p>
            O objetivo central é facilitar o acesso ao cronograma de avaliações, centralizando informações que muitas vezes carecem de um canal de consulta ágil. A plataforma evita choques de horário entre disciplinas, ajuda na organização dos professores e garante que nenhum aluno perca as datas de suas avaliações.
          </p>

          <h2>O Aplicativo na Palma da Mão</h2>
          <p>
            Construído priorizando dispositivos móveis (<strong>Mobile-first</strong>), o sistema permite instalação como um aplicativo nativo (PWA - Progressive Web App). Dessa forma, os alunos podem acessar as datas e documentos institucionais com um único clique direto da tela inicial, com maior velocidade e usabilidade.
          </p>
          
          <h2>Tecnologia de Ponta</h2>
          <p>
            Substituindo versões e plataformas anteriores, o projeto atual é apoiado em uma arquitetura <em>Serverless</em> através da Vercel. O sistema utiliza tecnologias modernas do ecossistema JavaScript/TypeScript, como Next.js (App Router), React 19, Tailwind CSS e banco de dados relacional PostgreSQL via Supabase. 
            O projeto também conta com segurança reforçada e adaptação inteligente de temas para suportar os períodos de "Vedação Eleitoral" da instituição.
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
