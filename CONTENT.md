# Inventário de Conteúdo — CQP Landing Page

> Mapa de todas as seções da landing page, copy existente e CTA de cada bloco.
> Use este arquivo para entender o que existe antes de editar qualquer componente.

---

## Estrutura de Seções (ordem na página)

| # | ID / Seção | Componente | Fundo | CTA principal |
|---|---|---|---|---|
| 1 | Navbar | `NavbarCQP.tsx` | Transparente → sólido no scroll | Menu de navegação |
| 2 | Hero | `HeroSection.tsx` | Vídeo com overlay escuro | "Conheça nossos cursos" |
| 3 | Cursos (`#cursos`) | `CoursesSection.tsx` | `var(--color-surface-offset)` | "Tenho interesse" por card |
| 4 | Benefícios (`#modalidades`) | `BenefitsSection.tsx` | `#001220` (navy) | — |
| 5 | Depoimentos (`#depoimentos`) | `TestimonialsSection.tsx` | `var(--color-surface-offset)` | — |
| 6 | Contato (`#contato`) | `ContactSection.tsx` | `#001220` (navy) | Formulário + WhatsApp |
| 7 | Footer | `FooterCQP` (inline) | `#001220` (navy) | Redes sociais |

---

## Seção 1 — Navbar

**Comportamento**: fundo transparente quando no topo; adiciona `navbar-scrolled` (sombra preta) ao rolar.

**Links de navegação**:
- Início
- Cursos
- Contato

**Outros elementos**:
- Logo da CQP (imagem .webp, altura 36px)
- Menu mobile com drawer lateral

---

## Seção 2 — Hero

**Tipo**: Vídeo de fundo (`/videos/background-video.webm` + `.mp4` fallback) com overlay navy.

**Copy atual**:

```
Badge: Matrículas abertas 2026
Título: Centro de Qualificação Profissional
Subtítulo: Do técnico à pós-graduação — cursos presenciais, semipresenciais e
          EAD com mensalidades acessíveis, plataforma exclusiva e certificação
          reconhecida pelo mercado.
CTA primário: Fale pelo WhatsApp
CTA secundário: Conheça os cursos →
Stats: +150 Cursos | EAD & Presencial | R$150 A partir de | CREA Certificado
```

---

## Seção 3 — Cursos

**Categorias e contagem atual** (fonte: `data/cursos.ts`):

| Categoria | Slug | Cursos |
|---|---|---|
| Cursos Técnicos | `tecnicos` | 18 |
| Profissionalizantes | `profissionalizantes` | 25 |
| Treinamentos e NRs | `treinamentos` | 54 |
| Graduações e Tecnólogos | `graduacoes` | 44 |
| Idiomas | `idiomas` | 6 |
| Kids | `kids` | 3 |
| **Total** | — | **150** |

**Busca**: campo de texto que filtra `TODOS_OS_CURSOS` usando `buscarCursos(query)` de `data/cursos.ts`. Normaliza acentos antes de comparar.

**Card de curso contém**:
- Imagem do curso
- Nome do curso
- Informação extra (duração / certificação / faixa etária)
- Botão "Tenho interesse" → link WhatsApp com mensagem pré-preenchida por curso

**Estado vazio**: quando a busca não retorna resultados, exibir mensagem `"Nenhum curso encontrado para '[query]'. Tente outro termo ou fale conosco pelo WhatsApp."`

---

## Seção 4 — Benefícios (Modalidades)

**Fundo**: navy (`#001220`).

**Itens**:
1. **Estude como e onde preferir** — Presencial · EAD · Híbrido
2. **Mensalidades que cabem no seu bolso** — A partir de R$150 por mês
3. **Plataforma exclusiva de aprendizado** — Certificado reconhecido pelo mercado

**Stats row**: +2.000 Alunos formados | 17 Cursos técnicos com diploma | +50 NRs e treinamentos | 6 anos De experiência em Carapebus (dinâmico: `new Date().getFullYear() - 2020`)

---

## Seção 5 — Depoimentos

**Fundo**: `var(--color-surface-offset)`.

**Estrutura de cada depoimento**:
- Foto circular com borda teal
- Texto do depoimento com aspas decorativas
- Nome do aluno
- Curso realizado

**Implementação**: componente `TestimonialsSection.tsx` com carrossel CSS puro + `IntersectionObserver` para animação de entrada.

---

## Seção 6 — Contato

**Fundo**: navy.

**Elementos**:
- Mapa do Google (`<iframe>`)
- Informações de contato: WhatsApp, E-mail, Endereço
- Formulário com campos: Nome, E-mail, Telefone, Mensagem
- Botão de envio via WhatsApp
- WhatsApp flutuante (botão fixo no canto inferior direito)

**Endereço**: Rua Prata Mancebo nº148 — Centro, Carapebus — RJ, Brazil

---

## Seção 7 — Footer

**Fundo**: navy (`#001220`).

**Conteúdo**:
- Copyright: `© CQP [ano] — Todos os direitos reservados`
- Links: WhatsApp, Cursos, Contato
- Logo SVG inline com símbolo teal

---

## Informações de Contato

Botão circular com backdrop-blur que aparece após o hero sair da viewport:
- Fundo: `rgba(0,18,32,0.80)` com `backdrop-filter: blur(8px)`
- Ícone: seta para cima (SVG inline)
- Posição: `fixed bottom-6 right-6` (acima do botão WhatsApp flutuante)
- Animação: fade + scale via `IntersectionObserver`

---

## Informações de Contato

```ts
// Em src/pages/index.tsx
const WHATSAPP_NUMBER = '5522998684334';

// Em src/components/ContactSection.tsx
const DEFAULT_WHATSAPP_DISPLAY = '(22) 99868-4334';
const DEFAULT_EMAIL = 'contato@cqp.edu.br';
const DEFAULT_ADDRESS = 'Rua Prata Mancebo nº148 — Centro';
const DEFAULT_CITY_STATE = 'Carapebus — RJ, Brazil';
```
