# Inventário de Conteúdo — CQP Landing Page

> Mapa de todas as seções da landing page, copy existente e CTA de cada bloco.
> Use este arquivo para entender o que existe antes de editar qualquer componente.

---

## Estrutura de Seções (ordem na página)

| # | ID / Seção | Componente | Fundo | CTA principal |
|---|---|---|---|---|
| 1 | Navbar | `NavbarCQP.tsx` | Transparente → sólido no scroll | Menu de navegação |
| 2 | Hero (Carrossel) | `HeroCQP.tsx` | Imagem com overlay escuro | "Conheça nossos cursos" |
| 3 | Cursos (`#cardapio`) | `CursosCQP.tsx` | `#7aeeee` → `var(--color-surface-offset)` | "Tenho interesse" por card |
| 4 | Instrutores (`#instrutores`) | `Instrutores.tsx` | `#001220` (navy) | — |
| 5 | Depoimentos (`#depoimentos`) | `Depoimentos.tsx` | `#7aeeee` → `var(--color-surface-offset)` | — |
| 6 | Contato (`#fale-conosco`) | `Contato.tsx` | `#001220` (navy) | Formulário + WhatsApp |
| 7 | Footer | `FooterCQP.tsx` | `#7aeeee` → teal escuro | Redes sociais |

---

## Seção 1 — Navbar

**Comportamento**: fundo transparente quando no topo; adiciona `navbar-scrolled` (sombra preta) ao rolar.

**Links de navegação**:
- Início
- Cursos
- Instrutores
- Depoimentos
- Fale Conosco

**Outros elementos**:
- Logo da CQP (`max-height: 90px`)
- Botão toggle dark mode (a adicionar na modernização)

---

## Seção 2 — Hero (Carrossel)

**Tipo**: Bootstrap Carousel com 3 slides.

Cada slide tem:
- Imagem de fundo (com overlay `rgba(0,0,0,0.8)`)
- Título `<h1>` em peso 900
- Parágrafo descritivo (oculto em mobile)
- CTA botão

**Copy sugerido para modernização**:

```
Título: Construa sua carreira em Macaé
Subtítulo: Mais de 150 cursos técnicos, profissionalizantes, graduações e NRs para sua formação.
CTA: Ver todos os cursos →
CTA secundário: Falar pelo WhatsApp
```

**Elemento de destaque a manter**: contador animado com o número total de cursos (`TOTAL_CURSOS` de `data/cursos.ts`).

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

## Seção 4 — Instrutores

**Fundo**: navy (`#001220`).

**Estrutura de cada instrutor**:
- Foto (card sem padding)
- Nome (`<h3>`)
- Especialidade (`<span>`, `font-size: 0.9em`)
- Breve bio (`<p>` com padding lateral)

> 📌 **Ação pendente**: os instrutores ainda estão como HTML estático no `index.html`. Para a modernização, criar `data/instrutores.ts` com a mesma estrutura de `cursos.ts`.

---

## Seção 5 — Depoimentos

**Fundo**: teal claro (`#7aeeee`).

**Estrutura de cada depoimento**:
- Foto circular (200×200px, borda teal 7px)
- Texto do depoimento com aspas decorativas (caractere `"`, `font-size: 48px`, cor teal)
- Nome do aluno
- Curso realizado

**Implementação atual**: Bootstrap Carousel com setas teal.

**Modernização**: substituir pelo componente `Depoimentos.tsx` com carrossel CSS puro + `IntersectionObserver` para animação de entrada.

---

## Seção 6 — Contato

**Fundo**: navy.

**Elementos**:
- Mapa do Google (`<iframe>` com `padding-bottom: 50%` para aspect ratio responsivo)
- Formulário com campos: Nome, E-mail, Telefone, Mensagem
- Botão de envio (cor `#7aeeee` no protótipo → `bg-primary` na modernização)

**CTA WhatsApp**: presente como botão flutuante em toda a página.

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

> 📌 **Ação pendente**: preencher com os dados reais da escola antes do deploy.

```ts
// Em data/escola.ts (a criar)
export const ESCOLA = {
  nome: 'CQP — Centro de Qualificação Profissional',
  cidade: 'Macaé',
  estado: 'RJ',
  whatsapp: '5522999999999',  // TODO: número real
  email: 'contato@cqp.com.br', // TODO: e-mail real
  instagram: 'https://instagram.com/cqpmacae', // TODO: verificar
  facebook: 'https://facebook.com/cqpmacae',   // TODO: verificar
};
```
