# Arquitetura do Projeto — CQP Landing Page

> Documento de referência para LLMs e colaboradores humanos.
> Descreve a estrutura de diretórios, responsabilidade de cada arquivo e as decisões técnicas da modernização.

---

## Visão Geral

Este projeto é uma **landing page institucional** da CQP (Centro de Qualificação Profissional), uma escola privada que oferece cursos técnicos, profissionalizantes, treinamentos em NRs, graduações, tecnólogos, pós-graduações, idiomas e cursos kids, localizada em Macaé/RJ.

### Stack de Modernização (branch `feat/modernization`)

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | Astro 4.x | Output HTML estático, zero JS por padrão, componentes isolados |
| Estilização | Tailwind CSS v3 + CSS Custom Properties | Tokens da marca em variáveis nativas, utilitários Tailwind para composição |
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
│   │   ├── NavbarCQP.tsx    # Navbar fixa com scroll-aware, dark mode toggle, menu mobile
│   │   ├── HeroCQP.tsx      # Seção hero com contador de cursos animado e CTA WhatsApp
│   │   ├── CursosCQP.tsx    # Tabs por categoria + busca em tempo real + cards de cursos
│   │   ├── Instrutores.tsx  # Grid de instrutores com foto e especialidade
│   │   ├── Depoimentos.tsx  # Carrossel de depoimentos de alunos
│   │   ├── Contato.tsx      # Formulário de contato + mapa + CTA WhatsApp
│   │   └── FooterCQP.tsx    # Rodapé com links, redes sociais e copyright
│   │
│   ├── layouts/
│   │   └── Base.astro       # Layout base: <head>, fontes, dark mode, SEO
│   │
│   └── pages/
│       └── index.astro      # Página principal — compõe os componentes em ordem
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
├── tailwind.config.ts       # Tokens Tailwind da marca CQP
├── astro.config.mjs         # Configuração do Astro
├── tsconfig.json            # Configuração TypeScript
└── package.json
```

---

## Decisões Técnicas

### Por que Astro?

- **Output HTML puro**: sem JavaScript no cliente por padrão. Ideal para SEO e velocidade.
- **Componentes isolados**: cada seção da página é um componente independente, facilitando manutenção.
- **Content Collections**: suporte nativo a dados em `.ts`/`.json`/`.md` como fonte para componentes.
- **Compatível com React/Vue/Svelte**: se no futuro precisar de interatividade mais rica, os componentes existentes continuam funcionando.

### Por que os cursos saíram do HTML?

O `index.html` original tem **301 KB** porque contém os cursos como markup HTML estático. Isso torna:
- Qualquer adição de curso uma edição manual no HTML.
- A busca dependente de JavaScript que percorre o DOM.
- O arquivo ilegível para ferramentas de análise e LLMs.

Com `data/cursos.ts`, um curso novo é adicionado com 3 linhas de código. A busca opera sobre um array TypeScript tipado.

### Por que não remover Bootstrap completamente agora?

O protótipo usa classes Bootstrap em todo o HTML. A remoção completa seria uma reescrita total do markup. A estratégia adotada é:
1. Novos componentes usam **Tailwind** (sem Bootstrap).
2. O protótipo original permanece na branch `main` como referência.
3. A branch `feat/modernization` constrói a versão nova do zero.

### Número de WhatsApp

O número está centralizado em `data/cursos.ts`, na constante `WA_NUMBER`. **Altere apenas neste arquivo** — todos os botões WhatsApp do site usam `getCursoWhatsAppUrl()` e `getWhatsAppUrl()` que lêem essa constante.

---

## Fluxo de Dados

```
data/cursos.ts
    │
    ├──► CursosCQP.tsx       (tabs, busca, cards)
    ├──► HeroCQP.tsx         (TOTAL_CURSOS → contador animado)
    ├──► NavbarCQP.tsx       (pode exibir categorias no mega menu)
    └──► Contato.tsx         (pode pré-preencher curso no formulário)
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
| `feat/modernization` | Versão modernizada (Astro + Tailwind + TypeScript) |

Quando a modernização estiver completa e validada, `feat/modernization` será mergeada em `main`.
