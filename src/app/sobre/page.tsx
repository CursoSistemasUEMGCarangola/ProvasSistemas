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
            O projeto de extensão "Calendário de Provas Digital: Integração e Acessibilidade Acadêmica", registrado no sistema SIGA sob o número 26408 e proposto pelo professor Nilton Freitas Junior, consiste no desenvolvimento e implementação de uma aplicação móvel voltada para os discentes do curso de Sistemas de Informação da UEMG Unidade Carangola. O objetivo central é facilitar o acesso ao cronograma de avaliações, centralizando informações que, embora definidas institucionalmente, muitas vezes carecem de um canal de consulta ágil e portátil.
          </p>
          <p>
            Desenvolvido sob o paradigma No-Code através da plataforma Glide, o aplicativo prioriza a usabilidade e a eficiência, permitindo que os estudantes consultem datas e horários de provas de forma instantânea. Além do calendário, a ferramenta atua como um repositório de informações essenciais, disponibilizando os regulamentos que regem as avaliações da UEMG e a relação dos docentes que atuam em cada período letivo.
          </p>
          <p>
            A iniciativa busca promover a organização acadêmica e a democratização da informação no ambiente universitário. Ao utilizar uma tecnologia de rápido desenvolvimento e baixo custo de manutenção, o projeto demonstra como soluções tecnológicas simplificadas podem resolver problemas logísticos cotidianos, melhorando a comunicação interna e o planejamento dos estudantes ao longo do semestre.
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
