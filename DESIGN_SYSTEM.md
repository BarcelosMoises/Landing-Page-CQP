# Design System — CQP

> Referência de tokens de design, tipografia, paleta de cores e padrões de componentes.
> Todo código deve referenciar estes tokens — nunca valores hexadecimais hardcoded.

---

## Identidade Visual

A CQP usa uma paleta **teal + navy** que transmite confiança, profissionalismo e modernidade — adequada para uma escola técnica que atende tanto estudantes jovens quanto profissionais de indústria e saúde.

| Elemento | Valor | Uso |
|---|---|---|
| Cor primária | `--cqp-teal` → `#33B8B8` | CTAs, links, ícones ativos |
| Cor primária escura | `--cqp-teal-dark` → `#0c6161` | Hover states, tabs ativas |
| Cor primária clara | `--cqp-teal-light` → `#7aeeee` | Destaques sutis, badges |
| Fundo escuro | `--cqp-navy` → `#001220` | Hero, Benefícios, Contato, Footer |
| Fundo navy suave | `--cqp-navy-soft` → `#061a2a` | Variação de seções escuras |

> ⚠️ **Regra**: nunca use hexadecimais hardcoded nos componentes. Sempre referencie `var(--cqp-teal)`, `var(--cqp-navy)`, etc.

---

## Paleta de Cores (CSS Custom Properties)

Definidas em `src/styles/tokens.css`.

### Cores da Marca

```css
--cqp-teal:        #33B8B8;   /* primária */
--cqp-teal-dark:   #0c6161;   /* hover / active */
--cqp-teal-light:  #7aeeee;   /* highlight */
--cqp-navy:        #001220;   /* fundo escuro */
--cqp-navy-soft:   #061a2a;   /* fundo escuro alternativo */
```

### Superfícies (modo claro)

```css
--color-bg:             #f7f6f2;   /* fundo da página */
--color-surface:        #ffffff;   /* cards */
--color-surface-2:      #f3f0ec;   /* fundos alternados */
--color-border:         oklch(from #33B8B8 l c h / 0.15);
--color-border-strong:  oklch(from #33B8B8 l c h / 0.30);
```

### Texto

```css
--color-text:                #001220;
--color-text-muted:          rgba(0, 18, 32, 0.62);
--color-text-faint:          rgba(0, 18, 32, 0.38);
--color-text-inverse:        #ffffff;
--color-text-on-navy:        #ffffff;
--color-text-muted-on-navy:  rgba(255, 255, 255, 0.62);
--color-text-faint-on-navy:  rgba(255, 255, 255, 0.38);
```

---

## Tipografia

### Famílias de Fonte

| Papel | Família | Fonte CDN | Uso |
|---|---|---|---|
| Display | Boska | Fontshare | Títulos `--text-xl` e acima |
| Body / UI | Satoshi | Fontshare | Todo texto de corpo, botões, labels |

**Substitui**: Poppins (única fonte do protótipo original — pouco contraste display/body).

```html
<!-- Carregar no <head> do index.html -->
<link href="https://api.fontshare.com/v2/css?f[]=boska@400,500,700&f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet">
```

### Escala Tipográfica Fluida

Todos os tamanhos usam `clamp()` — a fonte cresce suavemente com a viewport.

| Token CSS | Resolução | Uso |
|---|---|---|
| `--text-xs` | 12–14px | Labels, badges, metadata |
| `--text-sm` | 14–16px | Botões, links de nav |
| `--text-base` | 16–18px | **Padrão para corpo de texto** |
| `--text-lg` | 16–22px | Subtítulos |
| `--text-xl` | 20–28px | Títulos de seção |
| `--text-2xl` | 24–48px | Títulos de página (Boska) |
| `--text-3xl` | 32–72px | Headings grandes |
| `--text-hero` | 36–88px | Hero heading máximo |

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

Use `clamp()` para espaçamento responsivo entre seções.

---

## Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,18,32,0.06)` | Cards em repouso |
| `--shadow-md` | `0 4px 12px rgba(0,18,32,0.10)` | Dropdowns |
| `--shadow-lg` | `0 12px 32px rgba(0,18,32,0.14)` | Modais |
| `--shadow-xl` | `0 24px 64px rgba(0,18,32,0.18)` | Painéis flutuantes |
| `--shadow-cta` | `0 4px 24px rgba(51,184,184,0.35)` | Botão primário do hero (teal glow) |

---

## Componentes — Padrões

### Botão Primário

```tsx
<button style={{
  background: 'var(--cqp-teal)',
  color: '#ffffff',
  fontWeight: 700,
  padding: '0.875rem 1.75rem',
  borderRadius: '9999px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-cta)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
}}>
  Saiba mais
</button>
```

### Botão WhatsApp

```tsx
<a
  href={`https://wa.me/${WHATSAPP_NUMBER}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    background: '#25D366',
    color: '#fff',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.75rem',
    borderRadius: '9999px',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
  }}
>
  <WhatsAppIcon /> Fale conosco
</a>
```

### Card de Curso

```tsx
<article style={{
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  border: '1px solid var(--color-border)',
  transition: 'box-shadow 280ms var(--ease-out-expo), transform 280ms var(--ease-out-expo)',
}}>
  <img src={curso.imagem} alt={curso.nome} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} loading="lazy" />
  <div style={{ padding: '1rem' }}>
    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem' }}>{curso.nome}</h3>
    {curso.extra && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{curso.extra}</p>}
    <span style={{ color: 'var(--cqp-teal-dark)', fontWeight: 600 }}>Saiba mais →</span>
  </div>
</article>
```

---

## Anti-padrões a Evitar

| Anti-padrão | Solução |
|---|---|
| Hexadecimais hardcoded (`#33B8B8`, `#001220`) | Usar `var(--cqp-teal)`, `var(--cqp-navy)` |
| `min-height` fixo em cards | CSS Grid com `align-items: start` |
| Valores mágicos de margin/padding | Tokens de espaçamento com `clamp()` |
| Fonte única (Poppins) | Boska (display) + Satoshi (body) |
| Bootstrap acoplado ao HTML | CSS Grid + estilos inline |
