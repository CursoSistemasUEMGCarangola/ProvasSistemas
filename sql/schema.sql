-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.semestres (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nome text NOT NULL,
  ativo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT semestres_pkey PRIMARY KEY (id)
);
CREATE TABLE public.professores (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nome text NOT NULL,
  email text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT professores_pkey PRIMARY KEY (id)
);
CREATE TABLE public.disciplinas (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nome text NOT NULL,
  carga_horaria integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  turma_id uuid,
  professor_id uuid,
  CONSTRAINT disciplinas_pkey PRIMARY KEY (id),
  CONSTRAINT disciplinas_turma_id_fkey FOREIGN KEY (turma_id) REFERENCES public.turmas(id),
  CONSTRAINT disciplinas_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.professores(id)
);
CREATE TABLE public.turmas (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nome text NOT NULL,
  semestre_id uuid,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT turmas_pkey PRIMARY KEY (id),
  CONSTRAINT turmas_semestre_id_fkey FOREIGN KEY (semestre_id) REFERENCES public.semestres(id)
);
CREATE TABLE public.provas (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  disciplina_id uuid NOT NULL,
  turma_id uuid NOT NULL,
  data_hora_inicio timestamp with time zone NOT NULL,
  tipo_avaliacao text NOT NULL,
  observacoes text,
  status text DEFAULT 'Agendada'::text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT provas_pkey PRIMARY KEY (id),
  CONSTRAINT provas_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id),
  CONSTRAINT provas_turma_id_fkey FOREIGN KEY (turma_id) REFERENCES public.turmas(id)
);
CREATE TABLE public.documentos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  url text NOT NULL,
  ativo boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT documentos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracoes (
  id text NOT NULL,
  vedacao_eleitoral boolean NOT NULL DEFAULT false,
  CONSTRAINT configuracoes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tipos_avaliacao (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nome text NOT NULL UNIQUE,
  CONSTRAINT tipos_avaliacao_pkey PRIMARY KEY (id)
);
CREATE TABLE public.keepalive (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  pinged_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT keepalive_pkey PRIMARY KEY (id)
);