import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  CATEGORIAS,
  CURSOS_POR_CATEGORIA,
  buscarCursos,
  getCursoWhatsAppUrl,
  getWhatsAppUrl,
  TOTAL_CURSOS,
  type Curso,
  type CategoriaSlug,
} from '../../data/cursos';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CoursesSectionProps {
  /** ID da seção para âncoras de navegação */
  sectionId?: string;
  /** Número WA para o CTA do empty-state (herda WA_NUMBER por padrão) */
  whatsappNumber?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const MODALIDADE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  presencial: { label: 'Presencial', color: '#0c6161', bg: 'rgba(51,184,184,0.12)' },
  ead:        { label: 'EAD',        color: '#0c6161', bg: 'rgba(122,238,238,0.18)' },
  flex:       { label: 'Flex',       color: '#004d4d', bg: 'rgba(51,184,184,0.22)' },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function PlaceholderImg({ nome }: { nome: string }) {
  const initials = nome
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, #001220 0%, #0c6161 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Boska', Georgia, serif",
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: 700,
        color: '#7aeeee',
        userSelect: 'none',
        borderRadius: '0.75rem 0.75rem 0 0',
        letterSpacing: '0.05em',
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function CourseCard({ curso, visible }: { curso: Curso; visible: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg, 0.75rem)',
        border: '1px solid oklch(from var(--cqp-teal, #33B8B8) l c h / 0.15)',
        boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08))',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Image */}
      {imgError ? (
        <PlaceholderImg nome={curso.nome} />
      ) : (
        <img
          src={curso.imagem}
          alt={`Curso ${curso.nome}`}
          width={400}
          height={225}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}

      {/* Body */}
      <div style={{ padding: '1rem 1.125rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {/* Modalidade badges */}
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {curso.modalidade.map((m) => {
            const cfg = MODALIDADE_CONFIG[m];
            return (
              <span
                key={m}
                style={{
                  fontSize: 'clamp(0.6875rem, 0.65rem + 0.2vw, 0.75rem)',
                  fontWeight: 600,
                  fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
                  color: cfg.color,
                  background: cfg.bg,
                  padding: '0.125rem 0.5rem',
                  borderRadius: '9999px',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                {cfg.label}
              </span>
            );
          })}
        </div>

        {/* Nome */}
        <h3
          style={{
            fontFamily: "'Boska', Georgia, serif",
            fontSize: 'clamp(0.9375rem, 0.85rem + 0.45vw, 1.125rem)',
            fontWeight: 600,
            color: '#001220',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {curso.nome}
        </h3>

        {/* Extra info */}
        {curso.extra && (
          <p
            style={{
              fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
              fontSize: 'clamp(0.8125rem, 0.78rem + 0.18vw, 0.875rem)',
              color: '#5a6a72',
              margin: 0,
            }}
          >
            {curso.extra}
          </p>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* CTA */}
        <a
          href={getCursoWhatsAppUrl(curso)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Tenho interesse no curso de ${curso.nome} — abrir WhatsApp`}
          style={{
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1rem',
            background: '#33B8B8',
            color: '#001220',
            fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
            fontSize: 'clamp(0.8125rem, 0.78rem + 0.18vw, 0.9rem)',
            fontWeight: 700,
            borderRadius: '9999px',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'background 180ms cubic-bezier(0.16,1,0.3,1), transform 180ms cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#0c6161';
            (e.currentTarget as HTMLAnchorElement).style.color = '#7aeeee';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#33B8B8';
            (e.currentTarget as HTMLAnchorElement).style.color = '#001220';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          }}
        >
          {/* WhatsApp icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Tenho interesse
        </a>
      </div>
    </article>
  );
}

function EmptyState({ query, whatsappUrl }: { query: string; whatsappUrl: string }) {
  return (
    <div
      style={{
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(2rem, 5vw, 4rem) 1rem',
        gap: '1rem',
      }}
      role="status"
      aria-live="polite"
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#33B8B8" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6" opacity="0.4"/>
      </svg>
      <p
        style={{
          fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
          fontSize: 'clamp(0.9375rem, 0.85rem + 0.45vw, 1.125rem)',
          color: '#001220',
          maxWidth: '42ch',
          margin: 0,
        }}
      >
        Nenhum curso encontrado para{' '}
        <strong style={{ color: '#0c6161' }}>"{query}"</strong>.
        <br />
        Tente outro termo ou fale conosco pelo WhatsApp.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: '0.625rem 1.5rem',
          background: '#33B8B8',
          color: '#001220',
          fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
          fontWeight: 700,
          fontSize: '0.9375rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        Falar pelo WhatsApp
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function CoursesSection({
  sectionId = 'cursos',
  whatsappNumber,
}: CoursesSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoriaSlug>('tecnicos');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isSearching = debouncedQuery.trim().length > 0;

  // Debounce busca
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery]);

  // Cursos exibidos
  const cursosExibidos: Curso[] = isSearching
    ? buscarCursos(debouncedQuery)
    : CURSOS_POR_CATEGORIA[activeTab];

  // IntersectionObserver para stagger de entrada
  const registerCard = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisibleCards(new Set(cursosExibidos.map((c) => c.id)));
      return;
    }

    setVisibleCards(new Set());

    if (observerRef.current) observerRef.current.disconnect();

    const timeout = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = (entry.target as HTMLElement).dataset.courseId;
              if (id) setVisibleCards((prev) => new Set([...prev, id]));
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      cardRefs.current.forEach((el) => observerRef.current?.observe(el));
    }, 60);

    return () => {
      clearTimeout(timeout);
      observerRef.current?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, debouncedQuery]);

  // WA url para empty state
  const waUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Não encontrei o curso que procuro. Podem me ajudar?')}`
    : getWhatsAppUrl();

  return (
    <section
      id={sectionId}
      aria-label="Cursos e treinamentos da CQP"
      style={{
        background: 'linear-gradient(180deg, #e8fafa 0%, #f5fffe 100%)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 2.5rem)',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .cqp-card { opacity: 1 !important; transform: none !important; }
        }
        .cqp-tab:focus-visible {
          outline: 2px solid #33B8B8;
          outline-offset: 2px;
          border-radius: 9999px;
        }
        .cqp-search:focus {
          outline: none;
          border-color: #33B8B8;
          box-shadow: 0 0 0 3px rgba(51,184,184,0.25);
        }
        .cqp-card-wrap { transition: transform 180ms cubic-bezier(0.16,1,0.3,1); }
        .cqp-card-wrap:hover { transform: translateY(-4px); }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
              fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
              fontWeight: 700,
              color: '#0c6161',
              background: 'rgba(51,184,184,0.15)',
              padding: '0.25rem 0.875rem',
              borderRadius: '9999px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            +{TOTAL_CURSOS} cursos disponíveis
          </span>
          <h2
            style={{
              fontFamily: "'Boska', Georgia, serif",
              fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)',
              fontWeight: 700,
              color: '#001220',
              lineHeight: 1.15,
              margin: '0 0 0.75rem',
            }}
          >
            Encontre seu curso
          </h2>
          <p
            style={{
              fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
              fontSize: 'clamp(1rem, 0.85rem + 0.75vw, 1.25rem)',
              color: '#2d4a52',
              maxWidth: '52ch',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Técnicos, profissionalizantes, NRs, graduações, idiomas e Kids —
            do jeito que cabe na sua rotina.
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            position: 'relative',
            maxWidth: '520px',
            margin: '0 auto clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#33B8B8"
            strokeWidth="2"
            aria-hidden="true"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="cqp-search"
            type="search"
            placeholder="Buscar curso (ex: NR-35, Excel, Enfermagem…)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar cursos"
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
              fontSize: 'clamp(0.875rem, 0.82rem + 0.28vw, 1rem)',
              color: '#001220',
              background: '#ffffff',
              border: '1.5px solid rgba(51,184,184,0.35)',
              borderRadius: '9999px',
              boxShadow: '0 2px 8px rgba(0,18,32,0.06)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Limpar busca"
              style={{
                position: 'absolute',
                right: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#5a6a72',
                padding: '0.25rem',
                lineHeight: 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Tabs — hidden while searching */}
        {!isSearching && (
          <div
            role="tablist"
            aria-label="Categorias de cursos"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            {CATEGORIAS.map((cat) => {
              const isActive = activeTab === cat.slug;
              const count = CURSOS_POR_CATEGORIA[cat.slug].length;
              return (
                <button
                  key={cat.slug}
                  role="tab"
                  id={`tab-${cat.slug}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.slug}`}
                  className="cqp-tab"
                  onClick={() => setActiveTab(cat.slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 1.125rem',
                    borderRadius: '9999px',
                    border: isActive ? '2px solid #33B8B8' : '1.5px solid rgba(51,184,184,0.3)',
                    background: isActive ? '#33B8B8' : '#ffffff',
                    color: isActive ? '#001220' : '#2d4a52',
                    fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
                    fontSize: 'clamp(0.8125rem, 0.78rem + 0.18vw, 0.9375rem)',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 180ms cubic-bezier(0.16,1,0.3,1)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.label}
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: isActive ? 'rgba(0,18,32,0.15)' : 'rgba(51,184,184,0.15)',
                      color: isActive ? '#001220' : '#0c6161',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '9999px',
                      minWidth: '1.5rem',
                      textAlign: 'center',
                    }}
                    aria-label={`${count} cursos`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Search results label */}
        {isSearching && (
          <p
            role="status"
            aria-live="polite"
            style={{
              textAlign: 'center',
              fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
              fontSize: '0.9375rem',
              color: '#2d4a52',
              marginBottom: '1.5rem',
            }}
          >
            {cursosExibidos.length > 0
              ? `${cursosExibidos.length} resultado${cursosExibidos.length > 1 ? 's' : ''} para "${debouncedQuery}"`
              : null}
          </p>
        )}

        {/* Grid / Panel */}
        <div
          role={!isSearching ? 'tabpanel' : undefined}
          id={!isSearching ? `panel-${activeTab}` : undefined}
          aria-labelledby={!isSearching ? `tab-${activeTab}` : undefined}
        >
          {cursosExibidos.length === 0 ? (
            <EmptyState query={debouncedQuery} whatsappUrl={waUrl} />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
              }}
            >
              {cursosExibidos.map((curso) => (
                <div
                  key={curso.id}
                  className="cqp-card-wrap"
                  data-course-id={curso.id}
                  ref={(el) => registerCard(curso.id, el)}
                >
                  <CourseCard
                    curso={curso}
                    visible={visibleCards.has(curso.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {!isSearching && (
          <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <p
              style={{
                fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(0.875rem, 0.82rem + 0.28vw, 1rem)',
                color: '#2d4a52',
                marginBottom: '1rem',
              }}
            >
              Não encontrou o que procura?
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 2rem',
                background: '#001220',
                color: '#7aeeee',
                fontFamily: "'Satoshi', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(0.875rem, 0.82rem + 0.28vw, 1rem)',
                fontWeight: 700,
                borderRadius: '9999px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'background 180ms cubic-bezier(0.16,1,0.3,1), color 180ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#0c6161';
                (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#001220';
                (e.currentTarget as HTMLAnchorElement).style.color = '#7aeeee';
              }}
              aria-label="Falar com a CQP pelo WhatsApp para tirar dúvidas sobre cursos"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Falar com a CQP
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default CoursesSection;
