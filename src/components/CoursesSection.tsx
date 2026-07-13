import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  CATEGORIAS,
  CURSOS_POR_CATEGORIA,
  TODOS_OS_CURSOS,
  getCursoWhatsAppUrl,
  getWhatsAppUrl,
  buscarCursos,
  type CategoriaSlug,
  type Curso,
} from '../../data/cursos';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface CoursesSectionProps {
  /** Número do WhatsApp sobrescreve o padrão do data/cursos.ts */
  whatsappNumber?: string;
  /** ID da seção, referenciado pelo scroll da navbar */
  sectionId?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PAGE_SIZE = 12;
const DEBOUNCE_MS = 300;
const ALL_SLUG = '__all__' as const;

// Ícones SVG inline (Lucide-compatible) por slug
const CATEGORY_ICONS: Record<string, string> = {
  tecnicos: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
  profissionalizantes: `<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  treinamentos: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  graduacoes: `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`,
  idiomas: `<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>`,
  kids: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function ModalidadeBadge({ m }: { m: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    presencial: { label: 'Presencial', color: 'var(--cqp-teal-dark)', bg: 'oklch(from var(--cqp-teal) l c h / 0.10)' },
    online: { label: 'EAD', color: '#1a4a7a', bg: 'rgba(26, 74, 122, 0.10)' },
    hibrido: { label: 'Híbrido', color: '#5a3d8a', bg: 'rgba(90, 61, 138, 0.10)' },
  };
  const info = map[m] ?? { label: m, color: '#444', bg: 'rgba(68,68,68,0.10)' };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: info.color,
        background: info.bg,
        border: `1px solid ${info.color}30`,
        borderRadius: '9999px',
        padding: '0.15rem 0.55rem',
      }}
    >
      {info.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Course Card — transparent card with letterbox image and hover elevation
// ---------------------------------------------------------------------------
function CourseCard({ curso, visible }: { curso: Curso; visible: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <a
      ref={cardRef}
      href={getCursoWhatsAppUrl(curso)}
      target="_blank"
      rel="noopener noreferrer"
      className="course-card"
      aria-label={`Saiba mais sobre o curso de ${curso.nome}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        border: '1px solid var(--color-divider)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'box-shadow 280ms var(--ease-out-expo), transform 280ms var(--ease-out-expo), border-color 280ms var(--ease-out-expo)',
        boxShadow: hovered ? 'var(--shadow-teal)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: hovered ? 'oklch(from var(--cqp-teal) l c h / 0.35)' : 'var(--color-divider)',
      }}
    >
      {/* Letterbox image container */}
      <div
        className="course-card-img-wrap"
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          background: 'rgba(15, 23, 42, 0.9)',
          overflow: 'hidden',
        }}
      >
        {/* Blurred background fill */}
        <img
          src={curso.imagem}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(8px)',
            opacity: 0.3,
            transform: 'scale(1.1)',
            pointerEvents: 'none',
          }}
        />
        {/* Actual image contained */}
        <img
          src={curso.imagem}
          alt={curso.nome}
          loading="lazy"
          decoding="async"
          className="course-card-img"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = 'none';
            const fallback = t.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 500ms var(--ease-out-expo)',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
          }}
        />
        <div
          className="course-card-img-fallback"
          aria-hidden="true"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #e0f5f5 0%, #f0fafa 100%)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cqp-teal)" strokeWidth="1.25">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="m21 15-5-5L5 21"/>
          </svg>
        </div>
      </div>

      <div
        className="course-card-body"
        style={{
          padding: '0.875rem 1rem 0.625rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
        <h3
          className="course-card-title"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: 1.3,
            textWrap: 'balance',
            margin: 0,
          }}
        >
          {curso.nome}
        </h3>
        {curso.extra && (
          <p
            className="course-card-extra"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              margin: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {curso.extra}
          </p>
        )}
        <div
          className="course-card-badges"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3rem',
            marginTop: '0.2rem',
          }}
        >
          {curso.modalidades.map((m) => (
            <ModalidadeBadge key={m} m={m} />
          ))}
        </div>
      </div>

      <div
        className="course-card-link"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem 0.875rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: hovered ? 'var(--cqp-teal-dark)' : 'var(--color-text-muted)',
          transition: 'color 200ms var(--ease-out-expo)',
        }}
      >
        <span>Saiba mais</span>
        <span style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 200ms var(--ease-out-expo)' }}>→</span>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function CoursesSection({
  sectionId = 'cursos',
}: CoursesSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoriaSlug | typeof ALL_SLUG>(ALL_SLUG);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const searchRef = useRef<HTMLInputElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTab, debouncedQuery]);

  const filteredCourses = useMemo<Curso[]>(() => {
    let list: Curso[];
    if (debouncedQuery.trim()) {
      list = buscarCursos(debouncedQuery);
    } else if (activeTab === ALL_SLUG) {
      list = TODOS_OS_CURSOS;
    } else {
      list = CURSOS_POR_CATEGORIA[activeTab] ?? [];
    }
    return list;
  }, [activeTab, debouncedQuery]);

  const visibleCourses = filteredCourses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCourses.length;

  const handleTabClick = useCallback((slug: CategoriaSlug | typeof ALL_SLUG) => {
    setActiveTab(slug);
    setSearchQuery('');
  }, []);

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const tabs = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      if (!tabs) return;
      let next = index;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== index) {
        e.preventDefault();
        tabs[next].focus();
        tabs[next].click();
      }
    },
    []
  );

  const allTabs = [{ slug: ALL_SLUG, label: 'Todos', icone: 'grid' }, ...CATEGORIAS.map(c => ({ slug: c.slug, label: c.label, icone: c.slug }))];

  return (
    <>
      <style>{`
        .courses-section { background: var(--color-bg); padding-block: clamp(4rem, 7vw, 7rem); padding-inline: clamp(1rem, 4vw, 2.5rem); }
        .courses-inner { max-width: 1200px; margin-inline: auto; }
        .courses-header { margin-bottom: clamp(2rem, 3.5vw, 3.5rem); }
        .courses-eyebrow { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-body); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cqp-teal-dark); margin-bottom: 0.75rem; }
        .courses-eyebrow-line { display: block; width: 24px; height: 2px; background: var(--cqp-teal); border-radius: 9999px; }
        .courses-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; color: var(--color-text); margin-bottom: 0.75rem; text-wrap: balance; }
        .courses-title-accent { color: var(--cqp-teal-dark); }
        .courses-subtitle { font-family: var(--font-body); font-size: var(--text-sm); color: var(--color-text-muted); max-width: 56ch; line-height: 1.65; }
        .courses-search-wrap { position: relative; max-width: 480px; margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem); }
        .courses-search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-faint); pointer-events: none; flex-shrink: 0; }
        .courses-search-input { width: 100%; padding: 0.75rem 2.75rem 0.75rem 2.75rem; font-family: var(--font-body); font-size: var(--text-sm); color: var(--color-text); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); outline: none; transition: border-color 180ms var(--ease-out-expo), box-shadow 180ms var(--ease-out-expo); }
        .courses-search-input::placeholder { color: var(--color-text-faint); }
        .courses-search-input:focus { border-color: var(--cqp-teal); box-shadow: 0 0 0 3px oklch(from var(--cqp-teal) l c h / 0.15); }
        .courses-search-clear { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: var(--color-surface-2); border: none; border-radius: 50%; cursor: pointer; color: var(--color-text-muted); transition: background 150ms, color 150ms; padding: 0; }
        .courses-search-clear:hover { background: var(--color-border); color: var(--color-text); }
        .courses-tabs { display: flex; gap: 0.375rem; flex-wrap: wrap; margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem); }
        .courses-tab { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; font-family: var(--font-body); font-size: 0.8125rem; font-weight: 600; color: var(--color-text-muted); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: color 160ms var(--ease-out-expo), background 160ms var(--ease-out-expo), border-color 160ms var(--ease-out-expo), box-shadow 160ms var(--ease-out-expo); white-space: nowrap; line-height: 1; }
        .courses-tab:hover { color: var(--cqp-teal-dark); border-color: var(--cqp-teal); background: oklch(from var(--cqp-teal) l c h / 0.04); }
        .courses-tab[aria-selected="true"] { color: #ffffff; background: var(--cqp-teal-dark); border-color: var(--cqp-teal-dark); box-shadow: 0 2px 8px rgba(12,97,97,0.25); }
        .courses-tab-icon { width: 14px; height: 14px; flex-shrink: 0; }
        .courses-count { font-family: var(--font-body); font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 1.25rem; font-weight: 500; }
        .courses-count strong { color: var(--cqp-teal-dark); }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr)); gap: clamp(0.875rem, 1.5vw, 1.25rem); margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem); }
        .courses-load-more { display: flex; justify-content: center; margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem); }
        .courses-load-more-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 2rem; font-family: var(--font-body); background: var(--color-surface); color: var(--cqp-teal-dark); font-weight: 700; font-size: var(--text-sm); border: 1.5px solid var(--cqp-teal); border-radius: 9999px; cursor: pointer; transition: background 180ms var(--ease-out-expo), color 180ms var(--ease-out-expo), box-shadow 180ms var(--ease-out-expo); }
        .courses-load-more-btn:hover, .courses-load-more-btn:focus-visible { background: var(--cqp-teal); color: #ffffff; box-shadow: 0 4px 16px rgba(51,184,184,0.30); }
        .courses-empty { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4rem 1.5rem; color: var(--color-text-muted); }
        .courses-empty-icon { width: 48px; height: 48px; margin-bottom: 1rem; color: var(--color-text-faint); }
        .courses-empty h3 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; color: var(--color-text); margin-bottom: 0.5rem; }
        .courses-empty p { font-family: var(--font-body); font-size: var(--text-sm); max-width: 36ch; line-height: 1.6; }
        .courses-empty-reset { margin-top: 1.25rem; padding: 0.55rem 1.25rem; font-family: var(--font-body); background: var(--cqp-teal); color: #ffffff; font-weight: 700; font-size: var(--text-sm); border: none; border-radius: 9999px; cursor: pointer; transition: background 180ms var(--ease-out-expo); }
        .courses-empty-reset:hover { background: var(--cqp-teal-dark); }
        .courses-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem; padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 3vw, 2.5rem); background: var(--cqp-navy); border-radius: var(--radius-lg); margin-top: clamp(1.5rem, 3vw, 2.5rem); }
        .courses-footer-text h3 { font-family: var(--font-display); font-size: clamp(1.1rem, 0.9rem + 1vw, 1.6rem); font-weight: 800; color: #ffffff; margin-bottom: 0.35rem; line-height: 1.2; }
        .courses-footer-text p { font-family: var(--font-body); font-size: var(--text-sm); color: rgba(255,255,255,0.60); max-width: 44ch; line-height: 1.55; }
        .courses-footer-cta { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.75rem; font-family: var(--font-body); background: var(--cqp-teal); color: #ffffff; font-weight: 700; font-size: var(--text-sm); border-radius: 9999px; text-decoration: none; flex-shrink: 0; transition: background 180ms var(--ease-out-expo), box-shadow 180ms var(--ease-out-expo), transform 180ms var(--ease-out-expo); box-shadow: 0 4px 20px rgba(51,184,184,0.35); }
        .courses-footer-cta:hover, .courses-footer-cta:focus-visible { background: var(--cqp-teal-dark); box-shadow: 0 6px 28px rgba(51,184,184,0.50); transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) { .course-card, .course-card-img, .courses-tab, .courses-footer-cta, .courses-load-more-btn { transition: none !important; } .course-card:hover { transform: none; } .course-card:hover .course-card-img { transform: none; } }
        @media (max-width: 480px) { .courses-tabs { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; } .courses-tabs::-webkit-scrollbar { display: none; } .courses-tab { flex-shrink: 0; } .courses-footer { flex-direction: column; align-items: flex-start; } .courses-footer-cta { width: 100%; justify-content: center; } }
      `}</style>

      <section
        id={sectionId}
        className="courses-section"
        aria-labelledby="courses-section-title"
      >
        <div className="courses-inner">
          <header className="courses-header">
            <div className="courses-eyebrow" aria-hidden="true">
              <span className="courses-eyebrow-line" />
              Grade de Cursos
            </div>
            <h2 id="courses-section-title" className="courses-title">
              Encontre o curso{' '}
              <span className="courses-title-accent">ideal para você</span>
            </h2>
            <p className="courses-subtitle">
              Mais de {TODOS_OS_CURSOS.length} cursos em modalidades presenciais, EAD e híbridas.
              Use a busca ou navegue pelas categorias abaixo.
            </p>
          </header>

          <div className="courses-search-wrap">
            <svg className="courses-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              className="courses-search-input"
              placeholder="Buscar curso (ex: NR-35, Excel, Inglês...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar curso"
              autoComplete="off"
              spellCheck="false"
            />
            {searchQuery && (
              <button
                className="courses-search-clear"
                onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                aria-label="Limpar busca"
                type="button"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div ref={tabListRef} role="tablist" aria-label="Categorias de cursos" className="courses-tabs">
            {allTabs.map(({ slug, label, icone }, index) => (
              <button
                key={slug}
                role="tab"
                aria-selected={activeTab === slug && !debouncedQuery}
                className="courses-tab"
                onClick={() => handleTabClick(slug as CategoriaSlug | typeof ALL_SLUG)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                tabIndex={activeTab === slug ? 0 : -1}
                type="button"
              >
                {icone === 'grid' ? (
                  <svg className="courses-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                ) : (
                  <svg className="courses-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[icone] ?? '' }}
                  />
                )}
                {label}
              </button>
            ))}
          </div>

          <p className="courses-count" aria-live="polite" aria-atomic="true">
            {debouncedQuery
              ? <><strong>{filteredCourses.length}</strong> resultado{filteredCourses.length !== 1 ? 's' : ''} para "{debouncedQuery}"</>
              : <><strong>{filteredCourses.length}</strong> curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}</>}
          </p>

          {filteredCourses.length === 0 ? (
            <div className="courses-empty" role="status">
              <svg className="courses-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                <path d="M8 11h6M11 8v6" opacity=".4"/>
              </svg>
              <h3>Nenhum curso encontrado</h3>
              <p>Tente outros termos ou fale com a gente pelo WhatsApp — podemos ter o que você precisa.</p>
              <button className="courses-empty-reset" onClick={() => { setSearchQuery(''); setActiveTab(ALL_SLUG); }} type="button">
                Ver todos os cursos
              </button>
            </div>
          ) : (
            <div className="courses-grid" role="tabpanel"
              aria-label={debouncedQuery ? `Resultados para "${debouncedQuery}"` : `Cursos de ${allTabs.find(t => t.slug === activeTab)?.label ?? 'todos'}`}
            >
              {visibleCourses.map((curso) => (
                <CourseCard key={curso.id} curso={curso} visible />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="courses-load-more">
              <button className="courses-load-more-btn" onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)} type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
                Ver mais {Math.min(PAGE_SIZE, filteredCourses.length - visibleCount)} cursos
              </button>
            </div>
          )}

          <div className="courses-footer">
            <div className="courses-footer-text">
              <h3>Não encontrou o curso?</h3>
              <p>Nossa equipe pode ajudar a escolher o melhor caminho para você. Fale com um consultor agora mesmo.</p>
            </div>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="courses-footer-cta" aria-label="Fale com um consultor pelo WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com consultor
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
