// =============================================================================
// components/NavPrimaria.tsx
// Navegação principal da landing page CQP.
//
// Comportamentos:
//  - Sticky no topo com backdrop-blur ao rolar
//  - Menu mobile com drawer lateral (sem dependência de lib)
//  - Toggle claro/escuro sincronizado com data-theme no <html>
//  - Logo SVG inline (funciona em qualquer cor de fundo)
//  - CTA flutuante "Fale pelo WhatsApp" sempre visível no mobile
//
// Âncoras esperadas no documento:
//  #inicio  #cursos  #sobre  #depoimentos  #contato
// =============================================================================

import { useState, useEffect, useCallback } from 'react';
import { getWhatsAppUrl } from '../data/cursos';

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Início',       href: '#inicio'       },
  { label: 'Cursos',       href: '#cursos'       },
  { label: 'Sobre nós',    href: '#sobre'        },
  { label: 'Depoimentos',  href: '#depoimentos'  },
  { label: 'Contato',      href: '#contato'      },
];

// ---------------------------------------------------------------------------
// Logo SVG inline
// Símbolo: quadrado teal com "C" recortado + wordmark "CQP"
// ---------------------------------------------------------------------------
function LogoCQP({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-label="CQP – Centro de Qualificação Profissional"
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={32}
      width={120}
    >
      {/* Símbolo — quadrado com C recortado */}
      <rect width="32" height="32" rx="6" fill="var(--color-primary)" />
      <path
        d="M22 10a9 9 0 1 0 0 12"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wordmark */}
      <text
        x="40"
        y="22"
        fontFamily="var(--font-display, 'Boska', Georgia, serif)"
        fontWeight="700"
        fontSize="18"
        fill="var(--color-text)"
        letterSpacing="0.5"
      >
        CQP
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Ícones inline (evita dep. de lucide-react no componente)
// ---------------------------------------------------------------------------
function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Hook: detecta tema atual do documento
// ---------------------------------------------------------------------------
function useTheme() {
  const getTheme = () =>
    (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}

// ---------------------------------------------------------------------------
// Hook: detecta scroll para ativar blur na nav
// ---------------------------------------------------------------------------
function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export default function NavPrimaria() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const scrolled = useScrolled();

  // Fecha menu ao clicar em link
  const fecharMenu = () => setMenuAberto(false);

  // Trava o scroll do body quando drawer está aberto
  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuAberto]);

  const waUrl = getWhatsAppUrl();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Barra de navegação                                                  */}
      {/* ------------------------------------------------------------------ */}
      <header
        role="banner"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: scrolled
            ? '1px solid oklch(from var(--color-text) l c h / 0.08)'
            : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
          backgroundColor: scrolled
            ? 'oklch(from var(--color-bg) l c h / 0.85)'
            : 'var(--color-bg)',
          transition: 'background-color 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--content-wide)',
            margin: '0 auto',
            padding: '0 var(--space-6)',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          {/* Logo */}
          <a
            href="#inicio"
            aria-label="CQP – ir para o início"
            style={{ flexShrink: 0, lineHeight: 0 }}
          >
            <LogoCQP />
          </a>

          {/* Links — desktop */}
          <nav
            aria-label="Navegação principal"
            style={{
              display: 'flex',
              gap: 'var(--space-1)',
              alignItems: 'center',
            }}
            className="nav-desktop"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-interactive), background var(--transition-interactive)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-surface-offset)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Ações à direita */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            {/* Toggle tema */}
            <button
              onClick={toggleTheme}
              aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color var(--transition-interactive), background var(--transition-interactive)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-offset)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
              }}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>

            {/* CTA WhatsApp — desktop */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fale conosco pelo WhatsApp"
              className="nav-cta-desktop"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'white',
                background: 'var(--color-primary)',
                textDecoration: 'none',
                transition: 'background var(--transition-interactive)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-primary-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-primary)';
              }}
            >
              <IconWhatsApp />
              Fale conosco
            </a>

            {/* Botão hamburguer — mobile */}
            <button
              onClick={() => setMenuAberto((v) => !v)}
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuAberto}
              aria-controls="nav-drawer"
              className="nav-hamburger"
              style={{
                display: 'none', // visível via CSS media query abaixo
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {menuAberto ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Overlay + Drawer mobile                                             */}
      {/* ------------------------------------------------------------------ */}
      {menuAberto && (
        <div
          aria-hidden="true"
          onClick={fecharMenu}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'oklch(0 0 0 / 0.4)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <nav
        id="nav-drawer"
        aria-label="Menu mobile"
        aria-hidden={!menuAberto}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          width: 'min(280px, 80vw)',
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-6)',
          gap: 'var(--space-2)',
          transform: menuAberto ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto',
        }}
      >
        {/* Cabeçalho do drawer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-4)',
          }}
        >
          <LogoCQP />
          <button
            onClick={fecharMenu}
            aria-label="Fechar menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <IconClose />
          </button>
        </div>

        {/* Links do drawer */}
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={fecharMenu}
            style={{
              display: 'block',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-base)',
              fontWeight: 500,
              color: 'var(--color-text)',
              textDecoration: 'none',
              transition: 'background var(--transition-interactive)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-surface-offset)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            {link.label}
          </a>
        ))}

        {/* Divisor */}
        <hr
          style={{
            margin: 'var(--space-2) 0',
            border: 'none',
            borderTop: '1px solid var(--color-divider)',
          }}
        />

        {/* CTA WhatsApp no drawer */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={fecharMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'white',
            background: 'var(--color-primary)',
            textDecoration: 'none',
            marginTop: 'auto',
          }}
        >
          <IconWhatsApp />
          Fale pelo WhatsApp
        </a>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* Botão flutuante WhatsApp — fixo no mobile                           */}
      {/* ------------------------------------------------------------------ */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="wa-fab"
        style={{
          position: 'fixed',
          bottom: 'var(--space-6)',
          right: 'var(--space-6)',
          zIndex: 45,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-full)',
          background: '#25D366',
          color: 'white',
          boxShadow: 'var(--shadow-lg)',
          textDecoration: 'none',
          transition: 'transform 180ms ease, box-shadow 180ms ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>

      {/* ------------------------------------------------------------------ */}
      {/* Estilos responsivos via <style> scoped                               */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        /* Desktop: mostra links e CTA, oculta hamburguer */
        @media (min-width: 768px) {
          .nav-desktop    { display: flex !important; }
          .nav-cta-desktop { display: flex !important; }
          .nav-hamburger  { display: none !important; }
          .wa-fab         { display: none !important; }
        }

        /* Mobile: oculta links e CTA desktop, mostra hamburguer e FAB */
        @media (max-width: 767px) {
          .nav-desktop     { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger   { display: flex !important; }
          .wa-fab          { display: flex !important; }
        }
      `}</style>
    </>
  );
}
