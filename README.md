# Happy Game - Plataforma Next.js

## Sobre o Projeto

O **Happy Game** é uma plataforma web moderna desenvolvida com Next.js para conectar gamers e entusiastas de videogames. A plataforma oferece comunidade virtual, acervo de jogos, feed de posts, painel administrativo com análise comportamental (UEBA) e conteúdo sobre sustentabilidade no gaming.

Projeto desenvolvido como parte da Graduação da FIAP em Sistemas de Informação.

---

## Funcionalidades

### Publicas (sem autenticacao)

- **Home (`/`)** — Hero, comunidades, estatísticas, easter egg Konami Code, balão flutuante e modal de conquistas
- **Historia (`/historia`)** — Timeline interativa da evolução dos videogames (1970–presente)
- **Plataforma (`/plataforma`)** — Tabela de recursos, equipe, valores e práticas da plataforma
- **Cadastro (`/cadastro`)** — Formulário com validação customizada (nome, nickname, email, telefone, plataforma favorita, gêneros)
- **Feedback (`/feedback`)** — Confirmação personalizada após cadastro
- **Login (`/login`)** — Autenticação via email/senha ou Google OAuth
- **Dashboard (`/dashboard`)** — Projeção e visualização de dados públicos
- **Sustentabilidade (`/sustentabilidade`)** — Conteúdo ESG, impacto digital do gaming e calculadora de pegada de carbono

### Privadas (requerem autenticacao)

- **Feed (`/feed`)** — Lista de posts da comunidade carregados do Supabase
- **Post (`/feed/[post]`)** — Visualização individual de post com renderização Markdown
- **Criar Post (`/feed/create`)** — Editor para publicar novo post
- **Acervo (`/acervo`)** — Catálogo de jogos via RAWG API (fallback para mock local)
- **Detalhe do Jogo (`/acervo/[slug]`)** — Informações detalhadas do jogo (Metacritic, plataformas, descrição)
- **Perfil (`/perfil`)** — Dados do usuário autenticado
- **Admin UEBA (`/admin/ueba`)** — Dashboard de análise comportamental com scores de anomalia

---

## Tecnologias

### Core

- **Next.js 16.0.10** — Framework React com App Router
- **React 19.2.0** — Biblioteca de interface
- **TypeScript 5.x** — Tipagem estática
- **NextAuth 4.24.13** — Autenticação (Credentials + Google OAuth)

### Backend / Dados

- **Supabase (`@supabase/supabase-js`)** — Banco de dados PostgreSQL para posts, profiles e eventos UEBA
- **RAWG API** — API externa para catálogo de jogos (com mock de fallback)

### Styling

- **Tailwind CSS 4.x** — Utility-first
- **tw-animate-css** — Animações
- **class-variance-authority / clsx / tailwind-merge** — Utilitários de classe

### UI (Radix UI / shadcn-style)

- `@radix-ui/react-checkbox`, `react-dialog`, `react-label`, `react-select`, `react-slot`
- **lucide-react** — Ícones
- **embla-carousel-react** — Carrossel com autoplay

### Conteudo

- **react-markdown** + **remark-gfm** + **remark-breaks** — Renderização de Markdown nos posts
- **chart.js** — Gráficos no dashboard

### Testes / Dev

- **Storybook 10** — Documentação e desenvolvimento de componentes
- **Vitest 4 + Playwright** — Testes unitários e de componente
- **ESLint** — Linter

---

## Sistema de Design

### Paleta de Cores

```css
/* Neutros */
--neutral-black: #0D0D0D
--neutral-dark-grey: #1A1A1A
--neutral-medium-grey: #2D2D2D
--neutral-light-grey: #B0B0B0
--neutral-white: #FFFFFF

/* Destaque */
--primary-green-base: #00FF88
--primary-green-darker: #00CC6D
--primary-pink-accent: #FF2E63
```

### Tokens Tailwind

- `bg-background`, `bg-background-secondary`, `bg-surface-primary`, `bg-surface-neutral`
- `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-text-highlight-purple`
- `border-border-primary`
- Suporte a variantes `dark:`

---

## Estrutura do Projeto

```
happy-game-nextjs/
├── public/
│   ├── data/
│   │   ├── commitments.json
│   │   ├── platform-resources.json
│   │   └── team-members.json
│   └── img/                        # Imagens, logos e fotos da equipe
├── src/
│   ├── app/
│   │   ├── (public)/               # Rotas públicas
│   │   │   ├── (home)/             # /
│   │   │   ├── cadastro/           # /cadastro
│   │   │   ├── feedback/           # /feedback
│   │   │   ├── historia/           # /historia
│   │   │   ├── login/              # /login
│   │   │   ├── plataforma/         # /plataforma
│   │   │   ├── dashboard/          # /dashboard
│   │   │   └── sustentabilidade/   # /sustentabilidade
│   │   ├── (private)/              # Rotas privadas (requerem login)
│   │   │   ├── feed/               # /feed, /feed/[post], /feed/create
│   │   │   ├── acervo/             # /acervo, /acervo/[slug]
│   │   │   ├── perfil/             # /perfil
│   │   │   └── admin/ueba/         # /admin/ueba
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ # NextAuth endpoints
│   │   │   └── admin/ueba/events/  # GET/POST/PATCH/DELETE eventos UEBA
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                     # Badge, Button, Card, Carousel, Avatar,
│   │   │   │                       # Checkbox, FrameIcon, Icon, Input, Label,
│   │   │   │                       # MetacriticScore, NavigationButton, Select,
│   │   │   │                       # Sheet, Table, Textarea, Typography
│   │   ├── Logo.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── auth.ts                 # Configuração NextAuth
│   │   ├── posts.ts                # Listagem de posts (Supabase)
│   │   ├── rawg.ts                 # Cliente RAWG API
│   │   ├── utils.ts                # cn()
│   │   ├── supabase/
│   │   │   ├── admin.ts            # Cliente Supabase com service_role
│   │   │   └── profiles.ts         # Operações na tabela profiles
│   │   └── ueba/
│   │       ├── index.ts            # Exportações do módulo
│   │       ├── db.ts               # CRUD na tabela ueba_events
│   │       ├── types.ts            # UebaEventType, RiskBand, etc.
│   │       ├── simulateIsolationScore.ts  # Algoritmo estilo Isolation Forest
│   │       └── authAdmin.ts        # Validação do header x-ueba-admin-secret
│   ├── providers/
│   │   └── SessionProvider.tsx
│   ├── types/
│   │   └── next-auth.d.ts
│   └── middleware.ts               # Proteção de rotas privadas
├── .storybook/                     # Configuração do Storybook
├── components.json                 # Configuração shadcn/ui
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Rotas da Aplicacao

### Publicas

| Rota | Descricao |
|---|---|
| `/` | Pagina inicial |
| `/historia` | Timeline da historia dos videogames |
| `/plataforma` | Recursos, equipe e valores |
| `/cadastro` | Formulario de cadastro |
| `/login` | Login (email/senha ou Google) |
| `/feedback` | Confirmacao pos-cadastro |
| `/dashboard` | Dashboard publico de projecoes |
| `/sustentabilidade` | ESG e calculadora de carbono |

### Privadas

| Rota | Descricao |
|---|---|
| `/feed` | Feed de posts da comunidade |
| `/feed/[post]` | Visualizacao de post individual |
| `/feed/create` | Criacao de novo post |
| `/acervo` | Catalogo de jogos (RAWG API) |
| `/acervo/[slug]` | Detalhes de um jogo |
| `/perfil` | Perfil do usuario autenticado |
| `/admin/ueba` | Dashboard UEBA (análise comportamental) |

### API

| Endpoint | Metodo | Descricao |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | Endpoints NextAuth |
| `/api/admin/ueba/events` | GET | Lista eventos UEBA |
| `/api/admin/ueba/events` | POST | Cria evento UEBA |
| `/api/admin/ueba/events/[id]` | PATCH/DELETE | Edita ou remove evento |

---

## Sistema UEBA

O módulo **UEBA (User and Entity Behavior Analytics)** monitora e pontua comportamentos anômalos dos usuários.

### Funcionamento

1. Eventos são registrados na tabela `ueba_events` no Supabase, vinculados a `profiles`.
2. Ao inserir um evento, o servidor recalcula o **anomaly score** com uma simulação estilo **Isolation Forest**, considerando:
   - País/localização incomum (`isUsualCountry`)
   - Dispositivo incomum (`isUsualDevice`)
   - Horário atípico (`isUsualHour`)
   - Volume de ações na última hora (`actionsLastHour`)
   - Frequência de posts (`postsInLastHour`)
3. O score determina a **band de risco**: `low`, `medium` ou `high`.
4. O dashboard `/admin/ueba` exibe todos os eventos com score, risco e motivos.

### Tipos de evento

- `login` — Acesso à plataforma
- `post_create` — Criação de post
- `post_view` — Visualização de post

### Autenticacao da API UEBA

Todas as rotas `/api/admin/ueba/*` exigem o header:

```
x-ueba-admin-secret: <UEBA_ADMIN_SECRET>
```

---

## Supabase — Tabelas

| Tabela | Descricao |
|---|---|
| `profiles` | Dados do usuario (full_name, avatar_url, email) |
| `posts` | Posts do feed (content, author_id, created_at) |
| `ueba_events` | Eventos comportamentais com scores de anomalia |

---

## Como Executar

### Pre-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

### 1. Clone o repositorio

```bash
git clone <URL_DO_REPOSITORIO>
cd happy-game-nextjs
```

### 2. Instale as dependencias

```bash
npm install
```

### 3. Configure as variaveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<gere com: openssl rand -base64 32>

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=<seu-google-client-id>
GOOGLE_CLIENT_SECRET=<seu-google-client-secret>

# Supabase
NEXT_PUBLIC_SUPABASE_URL=<url-do-projeto-supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# RAWG API (opcional — usa mock se ausente)
RAWG_API_KEY=<sua-rawg-api-key>

# UEBA Admin (protege as rotas /api/admin/ueba/*)
UEBA_ADMIN_SECRET=<segredo-aleatorio>
```

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:3000`.

### 5. Build para producao

```bash
npm run build
npm run start
```

---

## Scripts Disponiveis

| Script | Descricao |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build otimizado para producao |
| `npm run start` | Servidor de producao |
| `npm run lint` | ESLint |
| `npm run storybook` | Storybook na porta 6006 |
| `npm run build-storybook` | Build estático do Storybook |

---

## Autenticacao

O projeto usa **NextAuth.js** com:

- **Credentials Provider** — email e senha
- **Google Provider** — OAuth 2.0
- **JWT Session** — sessoes sem banco de sessoes
- **Middleware** — redireciona usuarios nao autenticados nas rotas privadas

```typescript
// src/middleware.ts
export const config = {
  matcher: ["/feed/:path*", "/acervo/:path*", "/perfil/:path*", "/admin/:path*"],
};
```

---

## Storybook

Componentes documentados com Storybook + addon de acessibilidade:

```bash
npm run storybook   # http://localhost:6006
```

Arquivos `.stories.tsx` existentes: `Avatar`, `Badge`, `Button`, `FrameIcon`, `Icon`, `Input`, `MetacriticScore`, `NavigationButton`, `Select`, `Textarea`, `Typography`, `Navbar`, `PostItem`.

---

## Boas Praticas

- TypeScript em todo o projeto
- App Router com Server Components por padrao
- Client Components apenas onde ha interatividade
- Colocation de componentes (`_components/` junto a cada rota)
- Hooks customizados extraidos em `hooks/`
- Tipos TypeScript em `types.ts` por dominio
- Route Groups `(public)` e `(private)` com layouts distintos
- Fallback para mock quando APIs externas nao estao configuradas

---

## Equipe de Desenvolvimento

| Nome | Funcao | GitHub |
|---|---|---|
| Ana Larissa Mendes | Frontend Developer | [annalare](https://github.com/annalare/) |
| Joao Pedro Thethe Andrade | Frontend Developer | [jaoshtt](https://github.com/jaoshtt/) |
| John Vitor Silverio Pereira | Backend/Frontend Developer | [johnsilverio](https://github.com/johnsilverio/) |
| Lyniker Vinicius Santos de Oliveira | Conteudo/Frontend Developer | [lynikerrr](https://github.com/lynikerrr/) |
| Vinicius Cardoso Junqueira | Frontend Developer | [vinikrdoso](https://github.com/vinikrdoso/) |

---

## Referencias

- [Documentacao Next.js](https://nextjs.org/docs)
- [Documentacao NextAuth.js](https://next-auth.js.org/)
- [Documentacao Supabase](https://supabase.com/docs)
- [RAWG API](https://rawg.io/apidocs)
- [Documentacao Tailwind CSS](https://tailwindcss.com/docs)
- [Documentacao Radix UI](https://www.radix-ui.com/)
- [Storybook](https://storybook.js.org/)

---

## Deploy

### Vercel (recomendado)

```bash
npm i -g vercel
vercel
```

Configure todas as variaveis de ambiente listadas acima no painel da Vercel.

---

## Licenca

Projeto desenvolvido como parte da Graduacao da FIAP em Sistemas de Informacao.
