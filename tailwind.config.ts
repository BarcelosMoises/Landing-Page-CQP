// =============================================================================
// tailwind.config.ts
// Tokens de design da CQP mapeados para classes Tailwind v3.
// Para migrar para Tailwind v4, mova os tokens para @theme em globals.css.
// =============================================================================

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,astro,html}',
    './data/**/*.ts',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    // ------------------------------------------------------------------
    // Container
    // ------------------------------------------------------------------
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },

    // ------------------------------------------------------------------
    // Extend — adiciona tokens sem remover os padrões do Tailwind
    // ------------------------------------------------------------------
    extend: {
      // ----------------------------------------------------------------
      // Paleta de cores CQP
      // Paleta base: teal institucional + navy + superfícies aquecidas
      // ----------------------------------------------------------------
      colors: {
        // Superfícies
        bg:               'var(--color-bg)',
        surface:          'var(--color-surface)',
        'surface-2':      'var(--color-surface-2)',
        'surface-offset': 'var(--color-surface-offset)',
        'surface-dynamic':'var(--color-surface-dynamic)',
        divider:          'var(--color-divider)',
        border:           'var(--color-border)',

        // Texto
        text:             'var(--color-text)',
        'text-muted':     'var(--color-text-muted)',
        'text-faint':     'var(--color-text-faint)',
        'text-inverse':   'var(--color-text-inverse)',

        // Institucional — teal CQP
        primary: {
          DEFAULT:   'var(--color-primary)',
          hover:     'var(--color-primary-hover)',
          active:    'var(--color-primary-active)',
          highlight: 'var(--color-primary-highlight)',
        },

        // Navy — cor de fundo escura do protótipo original
        navy: {
          DEFAULT: '#001220',
          '900':   '#000d18',
          '800':   '#001220',
          '700':   '#012033',
          '600':   '#0c3050',
        },

        // Teal explícito (para uso direto sem var CSS)
        teal: {
          DEFAULT: '#33B8B8',
          light:   '#7aeeee',
          dark:    '#0c6161',
          '50':    '#f0fdfd',
          '100':   '#ccf7f7',
          '200':   '#99efef',
          '300':   '#5ce0e0',
          '400':   '#33B8B8',
          '500':   '#229090',
          '600':   '#0c6161',
          '700':   '#094d4d',
          '800':   '#073a3a',
          '900':   '#042828',
        },

        // Semânticos
        success:      'var(--color-success)',
        warning:      'var(--color-warning)',
        error:        'var(--color-error)',
        notification: 'var(--color-notification)',
        whatsapp:     '#25D366',
      },

      // ----------------------------------------------------------------
      // Tipografia
      // ----------------------------------------------------------------
      fontFamily: {
        display: ['Boska', 'Georgia', 'serif'],
        body:    ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        sans:    ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },

      // Escala tipográfica fluida com clamp()
      fontSize: {
        'fluid-xs':   ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',   { lineHeight: '1.5' }],
        'fluid-sm':   ['clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',      { lineHeight: '1.5' }],
        'fluid-base': ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',     { lineHeight: '1.6' }],
        'fluid-lg':   ['clamp(1.125rem, 1rem + 0.75vw, 1.5rem)',      { lineHeight: '1.4' }],
        'fluid-xl':   ['clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)',     { lineHeight: '1.25' }],
        'fluid-2xl':  ['clamp(2rem, 1.2rem + 2.5vw, 3.5rem)',         { lineHeight: '1.15' }],
        'fluid-3xl':  ['clamp(2.5rem, 1rem + 4vw, 5rem)',             { lineHeight: '1.1' }],
        'fluid-hero': ['clamp(3rem, 0.5rem + 7vw, 8rem)',             { lineHeight: '1.05' }],
      },

      // ----------------------------------------------------------------
      // Espaçamento (complementa a escala 4px do Tailwind)
      // ----------------------------------------------------------------
      spacing: {
        // Os valores abaixo complementam o sistema nativo do Tailwind
        // (Tailwind já inclui 1=4px, 2=8px, etc)
        '13': '3.25rem',  // 52px
        '15': '3.75rem',  // 60px
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        // Altura da navbar para padding-top de seções
        'nav': '4.5rem',  // 72px — altura padrão da NavbarCQP
      },

      // ----------------------------------------------------------------
      // Larguras de conteúdo
      // ----------------------------------------------------------------
      maxWidth: {
        narrow:  '640px',
        default: '960px',
        wide:    '1200px',
        full:    '100%',
      },

      // ----------------------------------------------------------------
      // Alturas
      // ----------------------------------------------------------------
      height: {
        nav: '4.5rem', // 72px — uso: h-nav, pt-nav
      },

      // ----------------------------------------------------------------
      // Border Radius
      // ----------------------------------------------------------------
      borderRadius: {
        sm:   '0.375rem',  // 6px
        md:   '0.5rem',    // 8px
        lg:   '0.75rem',   // 12px
        xl:   '1rem',      // 16px
        '2xl':'1.5rem',    // 24px
        full: '9999px',
      },

      // ----------------------------------------------------------------
      // Sombras (tone-matched à paleta teal/navy)
      // ----------------------------------------------------------------
      boxShadow: {
        sm:    '0 1px 2px oklch(0.2 0.04 192 / 0.06)',
        md:    '0 4px 12px oklch(0.2 0.04 192 / 0.08)',
        lg:    '0 12px 32px oklch(0.2 0.04 192 / 0.12)',
        teal:  '0 4px 20px oklch(0.55 0.12 192 / 0.3)',  // sombra teal para CTAs
        wa:    '0 4px 20px rgba(37, 211, 102, 0.35)',     // sombra WhatsApp
        card:  '0 1px 3px oklch(0.2 0.04 192 / 0.06), 0 4px 16px oklch(0.2 0.04 192 / 0.04)',
        'card-hover': '0 2px 6px oklch(0.2 0.04 192 / 0.08), 0 12px 32px oklch(0.2 0.04 192 / 0.08)',
      },

      // ----------------------------------------------------------------
      // Animações e Keyframes
      // ----------------------------------------------------------------
      keyframes: {
        // Shimmer — skeleton loader
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Reveal up — scroll reveal
        'reveal-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Fade in simples
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Count up (para o número de cursos no Hero)
        'count-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        shimmer:    'shimmer 1.5s ease-in-out infinite',
        'reveal-up':'reveal-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':  'fade-in 0.4s ease forwards',
        'count-up': 'count-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },

      // ----------------------------------------------------------------
      // Transições
      // ----------------------------------------------------------------
      transitionTimingFunction: {
        'interactive': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '180': '180ms',
      },

      // ----------------------------------------------------------------
      // Background — gradientes e grain
      // ----------------------------------------------------------------
      backgroundImage: {
        // Gradiente hero — navy profundo com toque teal
        'hero-gradient':
          'linear-gradient(135deg, #001220 0%, #012033 50%, #0c3050 100%)',
        // Gradiente teal para botões de destaque
        'teal-gradient':
          'linear-gradient(135deg, #33B8B8 0%, #0c6161 100%)',
        // Shimmer para skeleton
        'shimmer-gradient':
          'linear-gradient(90deg, var(--color-surface-offset) 25%, var(--color-surface-dynamic) 50%, var(--color-surface-offset) 75%)',
      },
    },
  },

  plugins: [
    // Adicione plugins conforme necessário:
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/container-queries'),
  ],
};

export default config;
