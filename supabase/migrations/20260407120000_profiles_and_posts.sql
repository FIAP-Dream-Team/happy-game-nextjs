-- Perfis vinculados ao OAuth (NextAuth): provider + id da conta no provedor (ex.: sub do Google)
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_account_id text not null,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_account_id)
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index posts_author_id_idx on public.posts (author_id);
create index posts_created_at_idx on public.posts (created_at desc);

-- RLS: acesso via service role (Next.js server) ignora RLS; anon sem políticas = sem acesso direto
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
