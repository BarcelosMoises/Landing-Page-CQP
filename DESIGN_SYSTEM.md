# Design System — CQP

> Referência de tokens de design, tipografia, paleta de cores e padrões de componentes.
> Todo código CSS e Tailwind deve referenciar estes tokens — nunca valores hexadecimais hardcoded.

---

## Identidade Visual

A CQP usa uma paleta **teal + navy** que transmite confiança, profissionalismo e modernidade — adequada para uma escola técnica que atende tanto estudantes jovens quanto profissionais de indústria e saúde.

| Elemento | Valor original (protótipo) | Valor modernizado |
|---|---|---|
| Cor primária | `#33B8B8` (teal) | `var(--color-primary)` → `#01696f` |
| Cor primária clara | `#7aeeee` | `var(--color-primary-highlight)` |
| Fundo escuro | `#001220` (navy) | `navy-800` no Tailwind |
| Fundo seções | `#7aeeee` | Substituído por `var(--color-surface)` |
| Sombra de card | `5px 5px 10px #33B8B8` | `shadow-card` → sombra com OKLCH |

> ⚠️ **Problema do protótipo original**: sombra teal em **todos** os cards cria ruído visual.
> Na versão modernizada, a sombra teal é reservada para elementos de destaque (CTAs, card em hover).

---

## Paleta de Cores (CSS Custom Properties)

Definidas em `src/styles/globals.css`. O `tailwind.config.ts` mapeia estas variáveis para classes utilitárias.

### Modo Claro (`:root, [data-theme="light"]`)

```css
/* Superfícies */
--color-bg:               #f7f6f2;   /* fundo da página */
--color-surface:          #f9f8f5;   /* cards padrão */
--color-surface-2:        #fbfbf9;   /* cards elevados */
--color-surface-offset:   #f3f0ec;   /* fundos de seção alternada */
--color-surface-dynamic:  #e6e4df;   /* skeleton shimmer */
--color-divider:          #dcd9d5;   /* linhas divisórias */
--color-border:           #d4d1ca;   /* bordas de input */

/* Texto */
--color-text:             #28251d;   /* texto principal */
--color-text-muted:       #7a7974;   /* texto secundário */
--color-text-faint:       #bab9b4;   /* placeholders, labels terciários */
--color-text-inverse:     #f9f8f4;   /* texto sobre fundo escuro */

/* Primária — teal CQP */
--color-primary:          #01696f;
--color-primary-hover:    #0c4e54;
--color-primary-active:   #0f3638;
--color-primary-highlight:#cedcd8;

/* Semânticos */
--color-success:          #437a22;
--color-warning:          #964219;
--color-error:            #a12c7b;
--color-notification:     #a13544;
```

### Modo Escuro (`[data-theme="dark"]`)

```css
--color-bg:               #171614;
--color-surface:          #1c1b19;
--color-text:             #cdccca;
--color-primary:          #4f98a3;   /* teal mais claro para contraste em fundo escuro */
--color-primary-hover:    #227f8b;
```

> O dark mode é ativado pelo toggle (ícone sol/lua) na NavbarCQP. A preferência do sistema (`prefers-color-scheme`) é respeitada como padrão.

---

## Tipografia

### Famílias de Fonte

| Papel | Família | Fonte CDN | Uso |
|---|---|---|---|
| Display | Boska | Fontshare | Títulos `--text-xl` e acima |
| Body / UI | Satoshi | Fontshare | Todo texto de corpo, botões, labels |

**Substitui**: Poppins (única fonte do protótipo original — pouco contraste display/body).

```html
<!-- Carregar no <head> de Base.astro -->
<link href="https://api.fontshare.com/v2/css?f[]=boska@400,500,700&f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet">
```

### Escala Tipográfica Fluida

Todos os tamanhos usam `clamp()` — a fonte cresce suavemente com a viewport, sem quebras bruscas.

| Token CSS | Tailwind | Resolução | Uso |
|---|---|---|---|
| `--text-xs` | `text-fluid-xs` | 12–14px | Labels, badges, metadata |
| `--text-sm` | `text-fluid-sm` | 14–16px | Botões, links de nav |
| `--text-base` | `text-fluid-base` | 16–18px | **Padrão para corpo de texto** |
| `--text-lg` | `text-fluid-lg` | 18–24px | Subtítulos, headings de seção |
| `--text-xl` | `text-fluid-xl` | 24–36px | Títulos de página (Boska) |
| `--text-2xl` | `text-fluid-2xl` | 32–56px | Hero heading |
| `--text-hero` | `text-fluid-hero` | 48–128px | Momento hero máximo |

**Regra**: fonte **Boska** apenas em `--text-xl` (24px) e acima. Abaixo disso, sempre **Satoshi**.

---

## Espaçamento

Sistema de 4px. Todos os `margin`, `padding` e `gap` referenciam tokens — nunca pixels arbitrários.

```css
--space-1:  0.25rem;  /*  4px */
--space-2:  0.5rem;   /*  8px */
--space-4:  1rem;     /* 16px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

No Tailwind, use as classes nativas (`p-4`, `gap-6`, `mb-8`) — elas já seguem esta escala.

---

## Sombras

| Token Tailwind | Uso |
|---|---|
| `shadow-sm` | Cards em repouso |
| `shadow-md` | Dropdowns, popovers |
| `shadow-lg` | Modais, painéis flutuantes |
| `shadow-teal` | CTAs primários, card em hover state |
| `shadow-wa` | Botão WhatsApp flutuante |
| `shadow-card` | Todos os cards de curso (substitui `5px 5px 10px #33B8B8`) |
| `shadow-card-hover` | Card de curso no estado `:hover` |

> **Diferença do protótipo**: a sombra teal era aplicada a **todos** os cards indiscriminadamente. Agora `shadow-teal` é reservada para o estado hover e para CTAs de destaque.

---

## Componentes — Padrões

### Botão Primário

```tsx
<button className="bg-primary hover:bg-primary-hover text-text-inverse font-body font-medium text-fluid-sm px-6 py-3 rounded-lg transition-interactive">
  Saiba mais
</button>
```

### Botão WhatsApp

```tsx
<a
  href={getWhatsAppUrl()}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-whatsapp hover:brightness-110 text-white font-medium flex items-center gap-2 px-6 py-3 rounded-full shadow-wa transition-interactive"
>
  <WhatsAppIcon /> Fale conosco
</a>
```

### Card de Curso

```tsx
<article className="bg-surface rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
  <img src={curso.imagem} alt={curso.nome} className="w-full aspect-video object-cover" loading="lazy" />
  <div className="p-4">
    <h3 className="font-display text-fluid-lg font-semibold text-text">{curso.nome}</h3>
    {curso.extra && <p className="text-fluid-sm text-text-muted mt-1">{curso.extra}</p>}
    <a href={getCursoWhatsAppUrl(curso)} className="mt-4 card-button ...">
      Tenho interesse
    </a>
  </div>
</article>
```

---

## Anti-padrões a Evitar

| Anti-padrão | Encontrado no protótipo | Solução |
|---|---|---|
| Sombra teal em todos os cards | `box-shadow: 5px 5px 10px #33B8B8` em `.card`, `.single-item`, `.card-search` | Usar `shadow-card`; sombra teal só em hover |
| `min-height` hardcoded | `min-height: 96px`, `192px`, `72px` nos cards | CSS Grid com `align-items: start` |
| Valores mágicos | `margin-top: -460px`, `padding-top: 150px` | Tokens de espaçamento com `clamp()` |
| Fonte única | Poppins para tudo | Boska (display) + Satoshi (body) |
| Paleta sem sistema | `#33B8B8`, `#7aeeee`, `#0c6161`, `#001220` espalhados | CSS Custom Properties semânticas |
| Bootstrap acoplado ao HTML | Classes `col-md-4`, `d-flex` no markup | Tailwind + CSS Grid nativos |
