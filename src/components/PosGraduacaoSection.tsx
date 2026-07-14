// PosGraduacaoSection.tsx
import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { Search, BookOpen, X } from 'lucide-react';
import { CategoriaSlug, CursoPosGraduacao } from './types';
import {
  CONFIG_CATEGORIAS,
  TABS,
  TODOS_OS_CURSOS_POS,
  PAGE_SIZE,
  DEBOUNCE_MS,
  WHATSAPP_NUMBER,
  normalize,
} from './helpers';
import { CourseCard } from './CourseCard';

export default function PosGraduacaoSection() {
  const [activeTab, setActiveTab] = useState<CategoriaSlug>('educacao');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset pagination when tab or search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTab, debouncedQuery]);

  // Filtered & sorted courses
  const filteredCourses = useMemo<CursoPosGraduacao[]>(() => {
    let list: CursoPosGraduacao[];

    if (debouncedQuery.trim()) {
      const q = normalize(debouncedQuery);
      list = TODOS_OS_CURSOS_POS.filter((c) =>
        normalize(c.titulo).includes(q)
      );
    } else {
      list = TODOS_OS_CURSOS_POS.filter((c) => c.categoria === activeTab);
    }

    // Sort alphabetically
    return list.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
  }, [activeTab, debouncedQuery]);

  const visibleCourses = useMemo(
    () => filteredCourses.slice(0, visibleCount),
    [filteredCourses, visibleCount]
  );

  const hasMore = visibleCount < filteredCourses.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  const handleTabChange = useCallback((slug: CategoriaSlug) => {
    setActiveTab(slug);
    setSearchQuery('');
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    inputRef.current?.focus();
  }, []);

  // Count per tab
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tab of TABS) {
      counts[tab.slug] = TODOS_OS_CURSOS_POS.filter(
        (c) => c.categoria === tab.slug
      ).length;
    }
    return counts;
  }, []);

  return (
    <section
      id="pos-graduacao"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
        {/* Section Header */}
        <header style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--cqp-teal-dark)',
              background: 'oklch(from var(--cqp-teal) l c h / 0.10)',
              padding: '0.3rem 0.9rem',
              borderRadius: '9999px',
              marginBottom: '0.75rem',
            }}
          >
            Pós-Graduação
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: 'var(--color-text)',
              margin: '0 0 0.5rem',
              lineHeight: 1.15,
            }}
          >
            Especialize-se com quem entende de futuro
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Mais de {TODOS_OS_CURSOS_POS.length} cursos de pós-graduação EAD e semipresenciais com certificação reconhecida pelo MEC.
          </p>
        </header>

        {/* Search */}
        <div
          style={{
            position: 'relative',
            maxWidth: '480px',
            margin: '0 auto clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          <Search
            size={18}
            strokeWidth={1.5}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-faint)',
              pointerEvents: 'none',
            }}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar curso de pós-graduação..."
            aria-label="Buscar curso de pós-graduação"
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '9999px',
              padding: '0.75rem 2.75rem 0.75rem 2.75rem',
              outline: 'none',
              transition: 'border-color 200ms var(--ease-out-expo), box-shadow 200ms var(--ease-out-expo)',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--cqp-teal)';
              e.currentTarget.style.boxShadow = '0 0 0 3px oklch(from var(--cqp-teal) l c h / 0.12)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              aria-label="Limpar busca"
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-faint)',
                transition: 'color 150ms var(--ease-out-expo)',
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Tabs */}
        {!debouncedQuery.trim() && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.4rem',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
            role="tablist"
            aria-label="Categorias de pós-graduação"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.slug;
              const Icon = tab.icone;
              const count = tabCounts[tab.slug] ?? 0;
              return (
                <button
                  key={tab.slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(tab.slug)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--cqp-teal-dark)' : 'var(--color-text-muted)',
                    background: isActive
                      ? 'oklch(from var(--cqp-teal) l c h / 0.10)'
                      : 'var(--color-surface)',
                    border: isActive
                      ? '1px solid oklch(from var(--cqp-teal) l c h / 0.30)'
                      : '1px solid var(--color-border)',
                    borderRadius: '9999px',
                    padding: '0.45rem 0.9rem',
                    cursor: 'pointer',
                    transition: 'all 200ms var(--ease-out-expo)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--cqp-teal-dark)' : 'var(--color-text-faint)',
                      background: isActive
                        ? 'rgba(12, 97, 97, 0.10)'
                        : 'rgba(0, 18, 32, 0.05)',
                      borderRadius: '9999px',
                      padding: '0.1rem 0.45rem',
                      minWidth: '1.2rem',
                      textAlign: 'center',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results summary */}
        {debouncedQuery.trim() && (
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            {filteredCourses.length === 0
              ? `Nenhum curso encontrado para "${debouncedQuery}".`
              : `${filteredCourses.length} curso${filteredCourses.length > 1 ? 's' : ''} encontrado${filteredCourses.length > 1 ? 's' : ''} para "${debouncedQuery}".`}
          </p>
        )}

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: 'clamp(2rem, 4vw, 4rem) 1rem',
            }}
          >
            <BookOpen
              size={40}
              strokeWidth={1}
              style={{ color: 'var(--color-text-faint)', marginBottom: '1rem' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                margin: '0 0 0.5rem',
              }}
            >
              Nenhum curso encontrado para "{debouncedQuery}".
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-faint)',
                margin: 0,
              }}
            >
              Tente outro termo ou fale conosco pelo WhatsApp.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Olá! Gostaria de saber mais sobre os cursos de pós-graduação disponíveis.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1.25rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: '#ffffff',
                background: '#25D366',
                padding: '0.7rem 1.5rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                transition: 'opacity 200ms var(--ease-out-expo)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Fale pelo WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
              }}
            >
              {visibleCourses.map((curso) => (
                <CourseCard
                  key={curso.id}
                  curso={curso}
                  config={CONFIG_CATEGORIAS[curso.categoria]}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
                <button
                  onClick={handleLoadMore}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--cqp-teal-dark)',
                    background: 'var(--color-surface)',
                    border: '1px solid oklch(from var(--cqp-teal) l c h / 0.25)',
                    borderRadius: '9999px',
                    padding: '0.75rem 2rem',
                    cursor: 'pointer',
                    transition: 'all 200ms var(--ease-out-expo)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'oklch(from var(--cqp-teal) l c h / 0.06)';
                    e.currentTarget.style.borderColor = 'var(--cqp-teal)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface)';
                    e.currentTarget.style.borderColor = 'oklch(from var(--cqp-teal) l c h / 0.25)';
                  }}
                >
                  Ver mais cursos ({filteredCourses.length - visibleCount} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}