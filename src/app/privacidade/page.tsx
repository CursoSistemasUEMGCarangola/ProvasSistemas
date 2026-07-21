import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-muted/20 pb-12 transition-colors duration-300">
      <header className="bg-white text-primary py-4 px-4 shadow-md border-b-4 border-secondary dark:bg-card">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <img src="/logosis03.png" alt="Logo Sistemas de Informação UEMG" className="h-16 sm:h-20 w-auto object-contain" />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Política de Privacidade</h1>
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
          <h2>Privacidade & LGPD em Primeiro Lugar</h2>
          <p>
            No Calendário de Provas - SI UEMG Carangola, sua privacidade não é apenas um recurso, é uma premissa 
            arquitetural fundamental do projeto. Em estrito cumprimento com a LGPD (Lei Geral de Proteção de Dados), 
            <strong>nós não coletamos nenhuma informação de identificação pessoal (PII) dos alunos</strong>.
          </p>

          <h2>Acesso Anônimo e Livre</h2>
          <p>
            A consulta ao calendário, acesso a filtros e download dos PDFs do cronograma de provas não requer 
            NENHUM tipo de cadastro, fornecimento de e-mail ou criação de conta. O acesso é totalmente anônimo e livre de rastreadores pesados.
          </p>

          <h2>Sem Cookie Banners</h2>
          <p>
            Graças à nossa decisão arquitetural de não utilizar ferramentas invasivas de terceiros ou coletar
            dados pessoais para campanhas, você não verá "Cookie Banners" ou pedidos complexos de rastreamento de dados de marketing em nossa aplicação.
          </p>

          <h2>Dados Operacionais (Analytics)</h2>
          <p>
            Utilizamos apenas serviços essenciais (Vercel Analytics) para obter métricas anonimizadas de uso, 
            garantindo a melhoria contínua da experiência de carregamento e navegação (como medir páginas mais acessadas), 
            sem que seja possível identificar qualquer estudante individualmente.
          </p>
          
          <h2>Equipe Coordenadora</h2>
          <p>
            Informações sobre professores (nome e disciplinas) são dados públicos e operacionais da instituição,
            sendo gerenciados pelos administradores autenticados sob severas diretrizes de "Zero Trust" com RLS (Row Level Security).
          </p>
        </section>
      </main>
    </div>
  )
}
