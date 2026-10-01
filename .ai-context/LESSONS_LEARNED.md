# Lições Aprendidas (Lessons Learned)

Este documento atua como um registro cumulativo de decisões arquiteturais, vulnerabilidades resolvidas e otimizações implementadas, garantindo evolução técnica livre de regressões.

## Segurança e Zero Trust

* **[Segurança] Server Actions Públicas no App Router**: O uso do `middleware.ts` para proteger rotas da interface (ex: `/admin/*`) **não bloqueia invocações diretas às Server Actions** caso a assinatura do endpoint seja descoberta.
  * *Resolução*: Foi criado o helper `requireAuth()` dentro do utilitário Supabase (`src/utils/supabase/server.ts`) para garantir o princípio de Confiança Zero. Qualquer ação que modifique o banco (`actions.ts`) agora deve invocar a checagem imperativa da sessão (`const { supabase, user } = await requireAuth()`), bloqueando ataques CSRF/Direct-call.

## Funcionalidade e Regras de Negócio

* **[Provas] Checagem de Choque de Horário**: A regra de impedir que uma turma tenha provas sobrepostas ou na mesma data exigiu manipulação de Timezones via JS para construir os limiares `startOfDay` e `endOfDay` (UTC) antes de delegar a filtragem `gte` e `lte` para o Supabase.

* **[BUG/TIMEZONE] Falso Início de Dia via UTC (setUTCHours)**: O uso direto de `today.setUTCHours(0, 0, 0, 0)` para filtrar avaliações futuras (`gte`) gera o timestamp `YYYY-MM-DDT00:00:00.000Z`, que no fuso de Brasília (`America/Sao_Paulo`, UTC-3) corresponde às **21:00 do dia anterior**. Isso fazia com que avaliações noturnas realizadas na véspera continuassem sendo retornadas pelo Supabase e ocupassem indevidamente o card "Fique Atento: Próxima Prova".
  * *Resolução*: Centralizou-se em `src/lib/utils.ts` as funções `getBrasiliaStartOfToday()` e `getBrasiliaDayBounds()`, utilizando a API nativa `Intl.DateTimeFormat` ancorada em `America/Sao_Paulo`. O início do dia brasileiro (00:00:00-03:00) converte-se precisamente para `03:00:00.000Z` em UTC, expurgando em definitivo qualquer avaliação ocorrida na noite anterior tanto na página pública quanto na agenda docente e na verificação de choque no admin.

## Infraestrutura e Vercel Build

* **[Build] Conflito Turbopack vs PWA Plugins**: O build Vercel quebra (Deprecation/Plugin Error) com bibliotecas como `@serwist/next` devido à imposição do Turbopack nas versões recentes do Next.js.
  * *Resolução*: No `package.json`, usar `next build --webpack` em vez de apenas `next build`.
* **[TypeScript] Escopo do Service Worker**: Um arquivo `sw.ts` customizado falhará no build de tipagem pois o Next.js não carrega o objeto `ServiceWorkerGlobalScope`.
  * *Resolução*: Inserir a diretiva `/// <reference lib="webworker" />` na primeira linha do `sw.ts`.

## Regras de Negócio de Interface (UI/UX)

* **[UX/Regra de Negócio] Representação de Horários EaD**: Provas na modalidade EaD que possuam o horário base de banco de dados gravado como "00:00" devem ser formatadas no front-end para exibir o texto "EaD" em vez da hora zerada.
  * *Resolução*: Implementado `const displayTime = formattedTime === '00:00' ? 'EaD' : formattedTime` na tabela da "Agenda dos Professores" (`ProfessoresBoard.tsx`) para traduzir a informação visualmente ao aluno/professor sem afetar as queries.

* **[UX/Design Pattern] Tabelas com Overflow em Mobile**: Sempre que utilizar a classe `overflow-x-auto` em tabelas (`<Table>`) encapsuladas por `div` no shadcn/ui, deve-se incluir uma dica visual explícita para dispositivos móveis (`md:hidden`), pois a quebra reta da borda não deixa evidente a capacidade de rolagem horizontal para o usuário.

* **[BUG/UI] Omissão de Provas Simultâneas no Alerta da Próxima Prova**: O componente `NextExamAlert` recebia apenas o primeiro índice do array filtrado (`filteredExams[0]`), ocultando outras avaliações marcadas para o mesmo dia e horário (ex.: turmas distintas realizando provas no mesmo horário).
  * *Resolução*: No `ExamBoard.tsx`, foi implementado o agrupamento `nextExams` via `useMemo` filtrando todos os exames com o mesmo timestamp de `data_hora_inicio` do primeiro registro. O `NextExamAlert.tsx` foi refatorado para suportar `exams: Prova[]`, renderizando o cabeçalho de data/horário unificado e a listagem de todas as disciplinas/turmas daquele horário.

## Segurança de Banco de Dados

* **[SEC] RLS Desabilitado em Tabelas de Domínio e Configuração**: O Supabase alerta como falha crítica a criação de tabelas (`configuracoes`, `tipos_avaliacao`) sem a ativação explícita do RLS (Row Level Security). Caso não seja habilitado, atacantes anônimos podem inserir, apagar ou modificar registros estruturais do sistema usando a API exposta.
  * *Resolução*: Foi ativado o `ENABLE ROW LEVEL SECURITY` para as tabelas. Adotou-se o padrão Zero Trust do projeto, criando policies de `SELECT USING (true)` (garantindo o SSR no Front-end público) e policies `FOR ALL USING (auth.role() = 'authenticated')` (blindando a mutação apenas para o Coordenador autenticado). Qualquer nova tabela de metadados deve nascer com esse mesmo padrão.
