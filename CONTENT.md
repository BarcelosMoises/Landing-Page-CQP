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
- Logo da CQP (`max-height: 90px`)

---

## Seção 2 — Hero

**Tipo**: Vídeo de fundo com overlay escuro.

**Copy**:

```
Título: Construa sua carreira em Macaé
Subtítulo: Mais de 150 cursos técnicos, profissionalizantes, graduações e NRs para sua formação.
CTA: Ver todos os cursos →
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

**Conteúdo**: cards com ícones destacando as modalidades de ensino (presencial, online, híbrido) e diferenciais da escola.

---

## Seção 5 — Depoimentos

**Fundo**: teal claro (`#7aeeee`).

**Estrutura de cada depoimento**:
- Foto circular (200×200px, borda teal 7px)
- Texto do depoimento com aspas decorativas (caractere `"`, `font-size: 48px`, cor teal)
- Nome do aluno
- Curso realizado

**Implementação atual**: Bootstrap Carousel com setas teal.

**Modernização**: componente `TestimonialsSection.tsx` com carrossel CSS puro + `IntersectionObserver` para animação de entrada.

---

## Seção 6 — Contato

**Fundo**: navy.

**Elementos**:
- Mapa do Google (`<iframe>`)
- Informações de contato: WhatsApp, E-mail, Endereço
- Formulário com campos: Nome, E-mail, Telefone, Mensagem
- Botão de envio via WhatsApp

**Endereço**: Rua Prata Mancebo nº148 — Centro, Carapebus — RJ, Brazil

---

## Seção 7 — Footer

**Fundo**: teal (`#7aeeee`) → modernização usa teal escuro (`navy-700`).

**Conteúdo**:
- Copyright: `© CQP [ano] — Todos os direitos reservados`
- Links de redes sociais (ícones inline)
- Altura fixa de `80px` no protótipo → modernização usa `padding-block` variável

---

## SVG Divisores de Seção

O protótipo usa 6 SVGs (`layer1.svg` a `layer6.svg`) como divisores de ondas entre seções. Ficam em `images/SVGs/`.

Na modernização, esses divisores são mantidos mas referenciados via `<img>` com `loading="lazy"` e `aria-hidden="true"`.

---

## Botão "Voltar ao Topo"

O protótipo tem `.btn-3` (botão circular preto que expande para "Back to Top" em hover). Na modernização, manter o comportamento mas com tokens da marca:
- Fundo: `bg-primary`
- Hover: expansão + texto "Voltar ao topo"
- Posição: `fixed bottom-6 right-6`

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
