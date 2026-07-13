import { useEffect, useRef, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarCQPProps {
  /** Itens de navegação — padrão cobre as seções da landing */
  navItems?: NavItem[];
  /** ID do hero para detectar scroll e ativar fundo sólido */
  heroId?: string;
}

// ---------------------------------------------------------------------------
// Default nav items
// ---------------------------------------------------------------------------
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Cursos',      href: '#cursos' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Contato',     href: '#fale-conosco' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function NavbarCQP({
  navItems = DEFAULT_NAV_ITEMS,
  heroId = 'hero',
}: NavbarCQPProps) {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeHref, setActiveHref]   = useState('');
  const menuRef   = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Detect when the hero exits the viewport → activate solid navbar
  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  // Highlight active section
  useEffect(() => {
    const targets = navItems
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <style>{`
        :root {
          --cqp-teal:        #33B8B8;
          --cqp-teal-dark:   #0c6161;
          --cqp-teal-light:  #7aeeee;
          --cqp-navy:        #001220;
          --text-sm:   clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
          --text-lg:   clamp(1rem, 0.85rem + 0.75vw, 1.375rem);
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-skip {
          position: absolute; top: -100%; left: 1rem;
          padding: 0.5rem 1rem; background: var(--cqp-teal); color: #fff;
          font-weight: 700; font-size: var(--text-sm);
          border-radius: 0 0 0.5rem 0.5rem;
          text-decoration: none; z-index: 200;
          transition: top 0.2s var(--ease-out-expo);
        }
        .navbar-skip:focus { top: 0; }

        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 68px; display: flex; align-items: center;
          padding-inline: clamp(1rem, 4vw, 2.5rem); gap: 1.5rem;
          transition:
            background 350ms var(--ease-out-expo),
            box-shadow 350ms var(--ease-out-expo);
        }
        .navbar--transparent { background: transparent; box-shadow: none; }
        .navbar--solid {
          background: rgba(0,18,32,0.96);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          box-shadow: 0 1px 0 rgba(51,184,184,0.10);
        }

        /* Logo — usa a imagem real da marca */
        .navbar-logo {
          display: flex; align-items: center; gap: 0.625rem;
          text-decoration: none; flex-shrink: 0;
        }
        .navbar-logo-img {
          height: 36px;
          width: auto;
          display: block;
          /* Garante visibilidade sobre fundo escuro e claro */
          filter: brightness(0) invert(1);
          transition: opacity 200ms var(--ease-out-expo);
        }
        /* Quando nav está solid, mantém opacidade plena */
        .navbar--solid .navbar-logo-img,
        .navbar--transparent .navbar-logo-img {
          opacity: 1;
        }
        /* Fallback de texto caso a imagem falhe */
        .navbar-logo-fallback {
          font-family: 'Boska', Georgia, serif;
          font-size: 1.25rem; font-weight: 700;
          color: #ffffff; line-height: 1; letter-spacing: -0.02em;
          display: none;
        }
        .navbar-logo-img[data-failed] + .navbar-logo-fallback { display: block; }

        .navbar-links {
          display: flex; align-items: center; gap: 0.25rem;
          list-style: none; margin: 0; padding: 0;
          margin-inline-start: auto;
        }
        .navbar-links a {
          position: relative; display: inline-flex; align-items: center;
          padding: 0.4rem 0.75rem;
          font-size: var(--text-sm); font-weight: 500;
          color: rgba(255,255,255,0.75); text-decoration: none;
          border-radius: 0.375rem;
          transition: color 180ms var(--ease-out-expo), background 180ms var(--ease-out-expo);
        }
        .navbar-links a::after {
          content: ''; position: absolute; bottom: 2px;
          left: 0.75rem; right: 0.75rem; height: 2px;
          border-radius: 9999px; background: var(--cqp-teal);
          transform: scaleX(0); transform-origin: center;
          transition: transform 220ms var(--ease-out-expo);
        }
        .navbar-links a:hover,
        .navbar-links a:focus-visible { color: #fff; background: rgba(255,255,255,0.06); }
        .navbar-links a.active { color: var(--cqp-teal); }
        .navbar-links a.active::after,
        .navbar-links a:hover::after { transform: scaleX(1); }

        .navbar-cta {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.55rem 1.25rem;
          background: var(--cqp-teal); color: #fff;
          font-weight: 700; font-size: var(--text-sm);
          border-radius: 9999px; text-decoration: none; flex-shrink: 0;
          transition:
            background 180ms var(--ease-out-expo),
            box-shadow 180ms var(--ease-out-expo),
            transform 180ms var(--ease-out-expo);
          box-shadow: 0 2px 12px rgba(51,184,184,0.30);
        }
        .navbar-cta:hover, .navbar-cta:focus-visible {
          background: var(--cqp-teal-dark);
          box-shadow: 0 4px 20px rgba(51,184,184,0.45);
          transform: translateY(-1px);
        }
        .navbar-cta:active { transform: translateY(0); }

        .navbar-hamburger {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; width: 44px; height: 44px; padding: 0.5rem;
          background: none; border: none; cursor: pointer;
          margin-inline-start: auto; border-radius: 0.375rem;
          transition: background 180ms var(--ease-out-expo);
        }
        .navbar-hamburger:hover,
        .navbar-hamburger:focus-visible { background: rgba(255,255,255,0.08); }
        .navbar-hamburger span {
          display: block; width: 22px; height: 2px; border-radius: 9999px;
          background: #fff; transform-origin: center;
          transition: transform 280ms var(--ease-out-expo), opacity 180ms ease;
        }
        .navbar-hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar-hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .navbar-hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .navbar-mobile-menu {
          position: fixed; inset: 0; top: 68px; z-index: 99;
          background: rgba(0,18,32,0.97);
          backdrop-filter: blur(20px) saturate(1.2);
          -webkit-backdrop-filter: blur(20px) saturate(1.2);
          display: flex; flex-direction: column;
          padding: 2rem clamp(1rem, 5vw, 2.5rem);
          overflow-y: auto;
          transition:
            opacity 300ms var(--ease-out-expo),
            transform 300ms var(--ease-out-expo);
        }
        .navbar-mobile-menu--hidden  { opacity: 0; transform: translateY(-8px); pointer-events: none; }
        .navbar-mobile-menu--visible { opacity: 1; transform: translateY(0);    pointer-events: all; }

        .navbar-mobile-link {
          display: block; padding: 1rem 0;
          font-size: var(--text-lg); font-weight: 600;
          color: rgba(255,255,255,0.80); text-decoration: none;
          border-bottom: 1px solid rgba(51,184,184,0.10);
          transition: color 180ms var(--ease-out-expo), padding-left 180ms var(--ease-out-expo);
        }
        .navbar-mobile-link:hover,
        .navbar-mobile-link:focus-visible { color: var(--cqp-teal); padding-left: 0.5rem; }
        .navbar-mobile-link.active { color: var(--cqp-teal); }

        .navbar-mobile-cta {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 0.5rem; margin-top: 2rem; padding: 1rem 1.75rem;
          background: var(--cqp-teal); color: #fff;
          font-weight: 700; font-size: var(--text-sm);
          border-radius: 9999px; text-decoration: none;
          box-shadow: 0 4px 24px rgba(51,184,184,0.30);
          transition: background 180ms var(--ease-out-expo);
        }
        .navbar-mobile-cta:hover,
        .navbar-mobile-cta:focus-visible { background: var(--cqp-teal-dark); }

        @media (max-width: 768px) {
          .navbar-links, .navbar-cta { display: none; }
          .navbar-hamburger { display: flex; }
        }
        @media (min-width: 769px) {
          .navbar-mobile-menu { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .navbar, .navbar-links a, .navbar-links a::after,
          .navbar-cta, .navbar-hamburger span,
          .navbar-mobile-menu, .navbar-mobile-link, .navbar-mobile-cta {
            transition: none !important;
          }
        }
      `}</style>

      <a href="#main-content" className="navbar-skip">Pular para o conteúdo</a>

      <header
        role="banner"
        className={`navbar ${isScrolled ? 'navbar--solid' : 'navbar--transparent'}`}
      >
        <a
          href="#hero"
          className="navbar-logo"
          aria-label="CQP — Centro de Qualificação Profissional, ir para o início"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
        >
          {/*
            Logo real: logo-branca-cqp.webp (fundo transparente, tudo branco)
            filter: brightness(0) invert(1) garante que mesmo um .webp colorido
            fique branco sobre qualquer fundo escuro.
            onError marca data-failed e o CSS exibe o fallback de texto.
          */}
          <img
            src="/images/logo/logo-branca-cqp.webp"
            alt="CQP"
            className="navbar-logo-img"
            width="120"
            height="36"
            decoding="async"
            onError={(e) => {
              e.currentTarget.setAttribute('data-failed', 'true');
            }}
          />
          <span className="navbar-logo-fallback" aria-hidden="true">CQP</span>
        </a>

        <nav aria-label="Navegação principal">
          <ul className="navbar-links">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={activeHref === href ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  aria-current={activeHref === href ? 'true' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          className="navbar-hamburger"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          <span /><span /><span />
        </button>
      </header>

      <div
        id="mobile-nav-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`navbar-mobile-menu ${
          menuOpen ? 'navbar-mobile-menu--visible' : 'navbar-mobile-menu--hidden'
        }`}
      >
        <nav aria-label="Navegação mobile">
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar-mobile-link${activeHref === href ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              aria-current={activeHref === href ? 'true' : undefined}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
