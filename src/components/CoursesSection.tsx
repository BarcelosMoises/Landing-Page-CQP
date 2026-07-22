// CoursesSection.tsx — CQP · Refatoração total · Design System v2
// Regras: Preto/Carbono premium, tipografia Boska/Satoshi, CTAs WhatsApp de alta conversão.
// Lógica original 100% preservada: tabs, busca com debounce, estado vazio, cards com imagem e text-first.

import { useState, useEffect, useCallback } from 'react';
import { TODOS_OS_CURSOS, buscarCursos, CATEGORIAS, type Curso } from '../../data/cursos';

// ---------------------------------------------------------------------------
// Tipos locais
// ---------------------------------------------------------------------------
interface CoursesSectionProps {
  whatsappNumber: string;
  sectionId?: string;
}

// ---------------------------------------------------------------------------
// Ícone WhatsApp (SVG inline — sem dependência de lib de ícones)
// ---------------------------------------------------------------------------
const IconWhatsApp = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Ícone Lupa
// ---------------------------------------------------------------------------
const IconSearch = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// ---------------------------------------------------------------------------
// Ícone X (limpar busca)
// ---------------------------------------------------------------------------
const IconX = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// ---------------------------------------------------------------------------
// Hook: debounce
// ---------------------------------------------------------------------------
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ---------------------------------------------------------------------------
// CourseCard — Design System v2
// ---------------------------------------------------------------------------
interface CourseCardProps {
  curso: Curso;
  whatsappNumber: string;
}

function CourseCard({ curso, whatsappNumber }: CourseCardProps) {
  const isPosGrad = curso.categoria === 'pos-graduacoes';
  const hasImage = Boolean(curso.imagem);
  const categoriaLabel =
    CATEGORIAS.find((cat) => cat.slug === curso.categoria)?.label ?? 'Curso';

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no curso: ${curso.nome}. Gostaria de mais informações.`
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  // Estilos base do card
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--cqp-carbon)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease, transform 0.2s ease',
    fontFamily: 'var(--font-body)',
  };

  return (
    <article
      style={cardStyle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(51,184,184,0.35)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* ── Imagem (cursos com foto) ou painel tipográfico (pós-graduação, sem imagem) ── */}
      {hasImage ? (
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={curso.imagem}
            alt={curso.nome}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      ) : (
        // Painel tipográfico — substitui o placeholder vazio das pós-graduações.
        // Sem ícones genéricos (chapéu de formatura etc.); a categoria vira uma
        // letra-fantasma em Boska com opacidade baixa + textura radial sutil,
        // dando profundidade ao card sem recorrer a glassmorphism/blur.
        <div
          aria-hidden="true"
          style={{
            position: 'relative',
            padding: '1.5rem 1.25rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '7.5rem',
            overflow: 'hidden',
            background:
              'radial-gradient(120% 140% at 100% 0%, rgba(51,184,184,0.10) 0%, transparent 55%), var(--cqp-carbon)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              right: '-0.35rem',
              bottom: '-1.1rem',
              fontFamily: 'var(--font-display)',
              fontSize: '4.5rem',
              fontWeight: 700,
              lineHeight: 1,
              color: 'rgba(51,184,184,0.07)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {curso.nome.charAt(0)}
          </span>
          <span
            style={{
              position: 'relative',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--color-text-muted-on-dark)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {categoriaLabel}
          </span>
          {isPosGrad && (
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignSelf: 'flex-start',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                background: 'rgba(51,184,184,0.12)',
                border: '1px solid rgba(51,184,184,0.3)',
                color: 'var(--cqp-teal)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
              }}
            >
              EAD
            </span>
          )}
        </div>
      )}

      {/* ── Corpo do card ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '1.125rem 1.25rem 1.25rem',
          gap: '0.75rem',
        }}
      >
        {/* Título */}
        <h3
          style={{
            margin: 0,
            fontSize: '0.975rem',
            fontWeight: 600,
            lineHeight: 1.35,
            color: 'var(--color-text-inverse)',
            fontFamily: 'var(--font-body)',
            textWrap: 'pretty' as React.CSSProperties['textWrap'],
          }}
        >
          {curso.nome}
        </h3>

        {/* Info extra */}
        {curso.extra && (
          <p
            style={{
              margin: 0,
              fontSize: '0.8rem',
              color: 'var(--color-text-muted-on-dark)',
              lineHeight: 1.45,
              fontFamily: 'var(--font-body)',
            }}
          >
            {curso.extra}
          </p>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* CTA WhatsApp */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Tenho interesse no curso ${curso.nome} — falar pelo WhatsApp`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            background: 'var(--cqp-teal)',
            color: 'var(--cqp-black)',
            fontSize: '0.82rem',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            transition: 'background 0.18s ease',
            width: '100%',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal-dark)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal)')
          }
          onFocus={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal-dark)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              '0 0 0 3px rgba(51,184,184,0.35)';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
          }}
        >
          <IconWhatsApp />
          Tenho interesse
        </a>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// CoursesSection — Principal
// ---------------------------------------------------------------------------
export default function CoursesSection({ whatsappNumber, sectionId = 'cursos' }: CoursesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('todos');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 280);

  // Filtragem
  const filteredCourses: Curso[] = useCallback(() => {
    const base =
      debouncedQuery.trim().length > 0
        ? buscarCursos(debouncedQuery)
        : activeTab === 'todos'
        ? TODOS_OS_CURSOS
        : TODOS_OS_CURSOS.filter((c) => c.categoria === activeTab);
    return base;
  }, [debouncedQuery, activeTab])();

  // Limpar busca redefine tab
  const handleClear = () => {
    setQuery('');
  };

  // Tabs — "Todos" + categorias dinâmicas
  const tabs = [
    { slug: 'todos', label: 'Todos', count: TODOS_OS_CURSOS.length },
    ...CATEGORIAS.map((cat) => ({
      slug: cat.slug,
      label: cat.label,
      count: TODOS_OS_CURSOS.filter((c) => c.categoria === cat.slug).length,
    })),
  ];

  // WhatsApp CTA genérico (estado vazio)
  const whatsappVazioHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Olá! Não encontrei o curso que procuro. Podem me ajudar?'
  )}`;

  return (
    <section
      id={sectionId}
      aria-label="Catálogo de Cursos CQP"
      style={{
        position: 'relative',
        background:
          'radial-gradient(70% 60% at 15% 0%, rgba(51,184,184,0.06) 0%, transparent 60%), var(--cqp-black)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 2rem)',
        overflow: 'hidden',
      }}
    >
      {/* ── Máximo de largura ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* ── Cabeçalho da Seção ── */}
        <header style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <p
            style={{
              margin: '0 0 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--cqp-teal)',
              fontFamily: 'var(--font-body)',
            }}
          >
            +150 opções disponíveis
          </p>
          <h2
            style={{
              margin: '0 0 0.875rem',
              fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--color-text-inverse)',
              fontFamily: 'var(--font-display)',
              textWrap: 'balance' as React.CSSProperties['textWrap'],
            }}
          >
            Encontre o curso<br />
            <span style={{ color: 'var(--cqp-teal)' }}>certo para você</span>
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: '520px',
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              color: 'var(--color-text-muted-on-dark)',
              lineHeight: 1.65,
              fontFamily: 'var(--font-body)',
              textWrap: 'pretty' as React.CSSProperties['textWrap'],
            }}
          >
            Do técnico à pós-graduação — presencial, EAD e híbrido.
            Certificação reconhecida pelo mercado, mensalidades a partir de R$150.
          </p>
        </header>

        {/* ── Barra de Busca ── */}
        <div
          style={{
            position: 'relative',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            maxWidth: '560px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted-on-dark)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconSearch />
          </span>
          <input
            type="search"
            placeholder="Buscar por curso, área ou palavra-chave…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar cursos"
            style={{
              width: '100%',
              padding: '0.8rem 2.75rem 0.8rem 2.75rem',
              background: 'var(--cqp-carbon)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              color: 'var(--color-text-inverse)',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-body)',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.18s ease',
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'rgba(51,184,184,0.5)';
              (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(51,184,184,0.25)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--color-border)';
              (e.target as HTMLInputElement).style.boxShadow = 'none';
            }}
          />
          {query && (
            <button
              onClick={handleClear}
              aria-label="Limpar busca"
              style={{
                position: 'absolute',
                right: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted-on-dark)',
                display: 'flex',
                alignItems: 'center',
                padding: '0.25rem',
              }}
            >
              <IconX />
            </button>
          )}
        </div>

        {/* ── Tabs de Categoria ── */}
        {!debouncedQuery && (
          <nav
            role="tablist"
            aria-label="Categorias de cursos"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)',
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.slug)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '6px',
                    border: isActive
                      ? '1px solid var(--cqp-teal)'
                      : '1px solid var(--color-border)',
                    background: isActive ? 'var(--cqp-teal)' : 'var(--cqp-carbon)',
                    color: isActive ? 'var(--cqp-black)' : 'var(--color-text-muted-on-dark)',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    transition: 'all 0.16s ease',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        'rgba(51,184,184,0.4)';
                      (e.currentTarget as HTMLButtonElement).style.color =
                        'var(--color-text-inverse)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        'var(--color-border)';
                      (e.currentTarget as HTMLButtonElement).style.color =
                        'var(--color-text-muted-on-dark)';
                    }
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      '0 0 0 3px rgba(51,184,184,0.35)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {tab.label}
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      opacity: 0.75,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </nav>
        )}

        {/* ── Contador de resultados ── */}
        <p
          style={{
            margin: '0 0 1.5rem',
            fontSize: '0.82rem',
            color: 'var(--color-text-muted-on-dark)',
            fontFamily: 'var(--font-body)',
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {debouncedQuery ? (
            <>
              <strong style={{ color: 'var(--color-text-inverse)', fontVariantNumeric: 'tabular-nums' }}>
                {filteredCourses.length}
              </strong>{' '}
              resultado{filteredCourses.length !== 1 ? 's' : ''} para{' '}
              <strong style={{ color: 'var(--cqp-teal)' }}>"{debouncedQuery}"</strong>
            </>
          ) : (
            <>
              <strong style={{ color: 'var(--color-text-inverse)', fontVariantNumeric: 'tabular-nums' }}>
                {filteredCourses.length}
              </strong>{' '}
              curso{filteredCourses.length !== 1 ? 's' : ''} encontrado
              {filteredCourses.length !== 1 ? 's' : ''}
            </>
          )}
        </p>

        {/* ── Grade de Cursos ── */}
        {filteredCourses.length > 0 ? (
          <div
            role="list"
            aria-label="Lista de cursos"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            {filteredCourses.map((curso) => (
              <div key={`${curso.categoria}-${curso.nome}`} role="listitem">
                <CourseCard curso={curso} whatsappNumber={whatsappNumber} />
              </div>
            ))}
          </div>
        ) : (
          /* ── Estado Vazio ── */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1.25rem',
              padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
              background: 'var(--cqp-carbon)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              maxWidth: '520px',
            }}
          >
            <div>
              <h3
                style={{
                  margin: '0 0 0.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Nenhum curso encontrado para "{debouncedQuery}"
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted-on-dark)',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Tente outros termos ou fale com a gente pelo WhatsApp —
                podemos ter exatamente o que você precisa.
              </p>
            </div>
            <a
              href={whatsappVazioHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                background: 'var(--cqp-teal)',
                color: 'var(--cqp-black)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'background 0.18s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal-dark)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal)')
              }
              onFocus={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  '0 0 0 3px rgba(51,184,184,0.35)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <IconWhatsApp />
              Falar com um consultor
            </a>
          </div>
        )}

        {/* ── Rodapé da seção — CTA de conversão geral ── */}
        <div
          style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 0.3rem',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                fontWeight: 600,
                color: 'var(--color-text-inverse)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Não sabe qual curso escolher?
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '0.875rem',
                color: 'var(--color-text-muted-on-dark)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Nossa equipe pode ajudar você a encontrar o melhor caminho.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              'Olá! Preciso de ajuda para escolher o curso ideal para mim.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'var(--cqp-teal)',
              color: 'var(--cqp-black)',
              borderRadius: '8px',
              fontSize: '0.925rem',
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              alignSelf: 'flex-start',
              transition: 'background 0.18s ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal-dark)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--cqp-teal)')
            }
            onFocus={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 0 0 3px rgba(51,184,184,0.35)';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            <IconWhatsApp />
            Falar com um consultor agora
          </a>
        </div>
      </div>
    </section>
  );
}