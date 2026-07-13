# Arquitetura do Projeto — CQP Landing Page

> Documento de referência para LLMs e colaboradores humanos.
> Descreve a estrutura de diretórios, responsabilidade de cada arquivo e as decisões técnicas da modernização.

---

## Visão Geral

Este projeto é uma **landing page institucional** da CQP (Centro de Qualificação Profissional), uma escola privada que oferece cursos técnicos, profissionalizantes, treinamentos em NRs, graduações, tecnólogos, pós-graduações, idiomas e cursos kids, localizada em Carapebus/RJ.

### Stack de Modernização (branch `feat/modernization`)

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | Vite + React | Build rápido, HMR, componentes React com TypeScript |
| Estilização | CSS Custom Properties + estilos inline | Tokens da marca em variáveis nativas, sem dependência de frameworks CSS |
| Linguagem | TypeScript | Tipagem dos dados de cursos, segurança em refatorações |
| Fonte de dados | `data/cursos.ts` | Única fonte de verdade; elimina o HTML de 301 KB com cursos estáticos |
| Deploy | Vercel / Netlify (recomendado) | CI/CD automático a partir do GitHub |

### Stack Original (branch `main`)

HTML + Bootstrap 5 + CSS (`main.css`) + JavaScript vanilla (`script.js`). O `index.html` de 301 KB contém todos os cursos como markup estático.

---

## Estrutura de Diretórios

```
landing-page-cqp/
├── data/
│   └── cursos.ts           # Todos os cursos tipados. EDITE AQUI para adicionar/remover cursos.
│
├── src/
│   ├── components/
│   │   ├── NavbarCQP.tsx        # Navbar fixa com scroll-aware, menu mobile
│   │   ├── HeroSection.tsx      # Seção hero com vídeo de fundo e CTA
│   │   ├── CoursesSection.tsx   # Tabs por categoria + busca em tempo real + cards de cursos
│   │   ├── BenefitsSection.tsx  # Seção de benefícios/modalidades
│   │   ├── TestimonialsSection.tsx  # Carrossel de depoimentos de alunos
│   │   └── ContactSection.tsx   # Formulário de contato + mapa + informações
│   │
│   ├── styles/
│   │   ├── globals.css          # Estilos globais e tokens CSS
│   │   └── tokens.css           # CSS Custom Properties (cores, tipografia, espaçamento)
│   │
│   └── pages/
│       └── index.tsx            # Página principal — compõe os componentes em ordem
│
├── public/
│   ├── images/              # Imagens dos cursos (migradas de /images no protótipo)
│   ├── video/               # Vídeos (migrados de /video no protótipo)
│   └── favicon.ico
│
├── ARCHITECTURE.md          # Este arquivo
├── DESIGN_SYSTEM.md         # Tokens de design, paleta, tipografia
├── CONTENT.md               # Inventário de seções e copy
├── CONTRIBUTING.md          # Como adicionar cursos, fazer deploy
├── data/cursos.ts           # Fonte de dados dos cursos
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração TypeScript
└── package.json
```

---

## Decisões Técnicas

### Por que Vite + React?

- **Build rápido**: Vite oferece HMR instantâneo e build otimizado com esbuild/rollup.
- **Componentes isolados**: cada seção da página é um componente React independente, facilitando manutenção.
- **TypeScript nativo**: suporte first-class a TypeScript sem configuração adicional.
- **CSS Custom Properties**: sistema de design tokens sem dependência de frameworks CSS.

### Por que os cursos saíram do HTML?

O `index.html` original tem **301 KB** porque contém os cursos como markup HTML estático. Isso torna:
- Qualquer adição de curso uma edição manual no HTML.
- A busca dependente de JavaScript que percorre o DOM.
- O arquivo ilegível para ferramentas de análise e LLMs.

Com `data/cursos.ts`, um curso novo é adicionado com 3 linhas de código. A busca opera sobre um array TypeScript tipado.

### Número de WhatsApp

O número está centralizado em `src/pages/index.tsx`, na constante `WHATSAPP_NUMBER`. **Altere apenas neste arquivo** — todos os componentes que usam WhatsApp recebem o número via prop.

---

## Fluxo de Dados

```
data/cursos.ts
    │
    ├──► CoursesSection.tsx   (tabs, busca, cards)
    └──► ContactSection.tsx   (pode pré-preencher curso no formulário)
```

---

## Configuração Local

```bash
# 1. Clone o repositório
git clone https://github.com/BarcelosMoises/Landing-Page-CQP.git
cd Landing-Page-CQP

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Build de produção
npm run build

# 5. Pré-visualizar o build
npm run preview
```

---

## Branches

| Branch | Conteúdo |
|---|---|
| `main` | Protótipo original (HTML + Bootstrap + CSS + JS) |
| `feat/modernization` | Versão modernizada (Vite + React + TypeScript) |

Quando a modernização estiver completa e validada, `feat/modernization` será mergeada em `main`.
