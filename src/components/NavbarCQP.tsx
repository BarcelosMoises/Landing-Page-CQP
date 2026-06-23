import { useEffect, useRef, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarCQPProps {
  /** Número do WhatsApp no formato internacional sem o + */
  whatsappNumber?: string;
  /** Itens de navegação — padrão cobre as 7 seções da landing */
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
  { label: 'Instrutores', href: '#instrutores' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato',     href: '#fale-conosco' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function NavbarCQP({
  whatsappNumber = '5522998684334',
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

  const whatsappHref = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Ol%C3%A1!+Tenho+interesse+em+saber+mais+sobre+os+cursos+do+CQP.&type=phone_number&app_absent=0`;

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

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-cta"
          aria-label="Fale conosco pelo WhatsApp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>

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
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-mobile-cta"
          aria-label="Fale conosco pelo WhatsApp"
          tabIndex={menuOpen ? 0 : -1}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Falar pelo WhatsApp
        </a>
      </div>
    </>
  );
}
