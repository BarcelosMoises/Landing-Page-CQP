import { useEffect, useRef, useState, useCallback } from 'react';
import { DEPOIMENTOS, type Depoimento } from '../../data/depoimentos';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface TestimonialsSectionProps {
  sectionId?: string;
  depoimentos?: Depoimento[];
  /** Intervalo do auto-play em ms. 0 = desativado. */
  autoPlayInterval?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function nameToHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h) % 360;
}
function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------
function Avatar({ dep, size = 72 }: { dep: Depoimento; size?: number }) {
  const [err, setErr] = useState(false);
  const hue = nameToHue(dep.nome);
  if (dep.foto && !err) {
    return (
      <img
        src={dep.foto}
        alt={dep.nome}
        width={size} height={size}
        loading="lazy" decoding="async"
        onError={() => setErr(true)}
        style={{
          width: size, height: size,
          borderRadius: '50%', objectFit: 'cover',
          border: `3px solid var(--cqp-teal)`, flexShrink: 0,
        }}
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Foto de ${dep.nome} (placeholder)`}
      style={{ borderRadius: '50%', flexShrink: 0, border: '3px solid var(--cqp-teal)' }}
    >
      <circle cx="36" cy="36" r="36" fill={`hsl(${hue} 35% 22%)`} />
      <circle cx="36" cy="27" r="11" fill={`hsl(${hue} 45% 55% / 0.3)`} />
      <ellipse cx="36" cy="58" rx="17" ry="11" fill={`hsl(${hue} 45% 55% / 0.22)`} />
      <text x="36" y="41" textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-display)" fontWeight="800" fontSize="17"
        fill={`hsl(${hue} 65% 72%)`}>{getInitials(dep.nome)}</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Star rating
// ---------------------------------------------------------------------------
function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="test-stars" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
          fill={i < rating ? 'var(--cqp-teal)' : 'rgba(255, 255, 255, 0.2)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single testimonial slide
// ---------------------------------------------------------------------------
function TestimonialSlide({ dep, active }: { dep: Depoimento; active: boolean }) {
  return (
    <div
      className={`test-slide${active ? ' test-slide--active' : ''}`}
      role="group"
      aria-label={`Depoimento de ${dep.nome}`}
      aria-hidden={!active}
    >
      <span className="test-quote" aria-hidden="true">&ldquo;</span>

      <blockquote className="test-blockquote">
        <p className="test-text">{dep.texto}</p>
      </blockquote>

      <div className="test-author">
        <Avatar dep={dep} size={64} />
        <div className="test-author-info">
          {dep.rating && <Stars rating={dep.rating} />}
          <p className="test-author-name">{dep.nome}</p>
          <p className="test-author-course">{dep.curso}</p>
          {dep.detalhe && <p className="test-author-detail">{dep.detalhe}</p>}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function TestimonialsSection({
  sectionId = 'depoimentos',
  depoimentos = DEPOIMENTOS,
  autoPlayInterval = 5500,
}: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = depoimentos.length;

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(((index % total) + total) % total);
    setTimeout(() => setAnimating(false), 420);
  }, [animating, total]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (autoPlayInterval <= 0 || reduced) return;
    if (paused) { timerRef.current && clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setCurrent(c => ((c + 1) % total));
    }, autoPlayInterval);
    return () => { timerRef.current && clearInterval(timerRef.current); };
  }, [paused, autoPlayInterval, total]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }, [prev, next]);

  // Section entrance animation
  useEffect(() => {
    const el = sectionRef.current?.querySelector('.test-inner') as HTMLElement | null;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .test-section {
          position: relative;
          background: #001220; /* Mantém o fundo marinho escuro padrão das seções */
          padding-block: clamp(4rem, 7vw, 7rem);
          padding-inline: clamp(1rem, 4vw, 2.5rem);
          overflow: hidden;
        }

        .test-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }

        .test-section::after {
          content: '';
          position: absolute;
          bottom: -160px;
          right: -100px;
          width: 460px;
          height: 460px;
          background: radial-gradient(circle, oklch(from var(--cqp-teal) l c h / 0.12) 0%, transparent 65%);
          pointer-events: none;
        }

        .test-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin-inline: auto;
        }

        .test-header {
          text-align: center;
          margin-bottom: clamp(2.5rem, 4vw, 4rem);
        }

        .test-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5); /* Cor clara com opacidade para fundo escuro */
          margin-bottom: 0.75rem;
        }

        .test-eyebrow-line {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--cqp-teal);
          border-radius: 9999px;
        }

        .test-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 1rem + 3vw, 3.25rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-text-inverse); /* CORRIGIDO: Agora legível em branco */
          text-wrap: balance;
          margin: 0;
        }

        .test-carousel {
          position: relative;
          padding: clamp(1rem, 2vw, 2rem) 0;
          overflow: hidden;
        }

        .test-slide {
          display: none;
          flex-direction: column;
          gap: 1.5rem;
          animation: test-fade-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        .test-slide--active { display: flex; }

        @keyframes test-fade-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .test-quote {
          font-family: var(--font-display);
          font-size: clamp(4rem, 6vw, 7rem);
          font-weight: 900;
          line-height: 0.6;
          color: var(--cqp-teal);
          opacity: 0.45;
          display: block;
          height: clamp(2rem, 3vw, 3rem);
          user-select: none;
        }

        .test-blockquote { margin: 0; }

        .test-text {
          font-family: var(--font-display);
          font-size: clamp(1.15rem, 0.95rem + 1vw, 1.55rem);
          font-weight: 500;
          line-height: 1.65;
          color: var(--color-text-inverse); /* CORRIGIDO: Texto do depoimento em alto contraste */
          margin: 0;
          font-style: italic;
          text-wrap: pretty;
          max-width: 64ch;
        }

        .test-author { display: flex; align-items: center; gap: 1.25rem; }

        .test-author-info { display: flex; flex-direction: column; gap: 0.2rem; }

        .test-stars { display: flex; gap: 0.15rem; margin-bottom: 0.1rem; }

        .test-author-name {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 0.85rem + 0.4vw, 1.1rem);
          font-weight: 700;
          color: var(--color-text-inverse); /* CORRIGIDO */
          margin: 0;
          line-height: 1.2;
        }

        .test-author-course {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--cqp-teal); /* Destaca a formação do aluno */
          margin: 0;
        }

        .test-author-detail {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
          margin-top: 0.1rem;
        }

        .test-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: clamp(2rem, 3vw, 3rem);
          gap: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1.5rem;
        }

        .test-dots { display: flex; gap: 0.5rem; align-items: center; }

        .test-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 200ms, width 200ms cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }

        .test-dot--active { background: var(--cqp-teal); width: 24px; }
        .test-dot:hover:not(.test-dot--active) { background: rgba(255, 255, 255, 0.4); }
        .test-dot:focus-visible { outline: 2px solid var(--cqp-teal); outline-offset: 3px; }

        .test-arrows { display: flex; gap: 0.6rem; }

        .test-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--color-text-inverse);
          cursor: pointer;
          transition: background 180ms, border-color 180ms, transform 180ms cubic-bezier(0.16,1,0.3,1);
        }

        .test-arrow:hover { background: rgba(255, 255, 255, 0.05); border-color: var(--cqp-teal); color: var(--cqp-teal); transform: scale(1.05); }
        .test-arrow:focus-visible { outline: 2px solid var(--cqp-teal); outline-offset: 3px; }
        .test-arrow:active { transform: scale(0.95); }

        .test-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .test-progress-bar {
          height: 100%;
          background: var(--cqp-teal);
          border-radius: 0 9999px 9999px 0;
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
        }

        .test-proof-strip {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.75rem 2.5rem;
          margin-top: clamp(3rem, 5vw, 4.5rem);
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 1.5rem 2rem;
          border-radius: 1rem;
        }

        .test-proof-item { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }

        .test-proof-value {
          font-family: var(--font-display);
          font-size: clamp(1.65rem, 1.2rem + 1.5vw, 2.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--color-text-inverse); /* CORRIGIDO */
        }

        .test-proof-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .test-proof-divider { width: 1px; height: 36px; background: rgba(255, 255, 255, 0.08); flex-shrink: 0; }

        @media (max-width: 580px) {
          .test-author { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .test-proof-divider { display: none; }
          .test-proof-strip { flex-direction: column; gap: 1.5rem; align-items: center; }
          .test-controls { flex-direction: column; items: flex-start; gap: 1.25rem; }
          .test-arrows { width: 100%; justify-content: space-between; }
          .test-arrow { flex: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .test-slide { animation: none !important; }
          .test-dot, .test-arrow, .test-progress-bar { transition: none !important; }
          .test-arrow:hover { transform: none; }
        }

        .test-todo {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ff9e64;
          background: rgba(255, 158, 100, 0.1);
          border: 1px solid rgba(255, 158, 100, 0.2);
          border-radius: 9999px;
          padding: 0.25rem 0.8rem;
          margin-top: 0.75rem;
        }
      `}</style>

      <section
        id={sectionId}
        ref={sectionRef}
        className="test-section"
        aria-labelledby="test-section-title"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="test-inner">

          <header className="test-header">
            <div className="test-eyebrow" aria-hidden="true">
              <span className="test-eyebrow-line" />
              Depoimentos
              <span className="test-eyebrow-line" />
            </div>
            <h2 id="test-section-title" className="test-title">
              Quem estudou no CQP conta
            </h2>
            <div>
              <span className="test-todo" aria-label="Dados pendentes de atualização">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5a1 1 0 011 1v5a1 1 0 01-2 0V8a1 1 0 011-1zm0 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                </svg>
                Depoimentos reais pendentes — substituir antes do deploy
              </span>
            </div>
          </header>

          <div
            className="test-carousel"
            role="region"
            aria-label="Carrossel de depoimentos"
            aria-live="polite"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            {depoimentos.map((dep, i) => (
              <TestimonialSlide key={dep.id} dep={dep} active={i === current} />
            ))}

          </div>

          <div className="test-controls">
            <nav className="test-dots" aria-label="Navegação dos depoimentos">
              {depoimentos.map((dep, i) => (
                <button
                  key={dep.id}
                  className={`test-dot${i === current ? ' test-dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Depoimento ${i + 1} de ${total}: ${dep.nome}`}
                  aria-current={i === current ? 'true' : undefined}
                />
              ))}
            </nav>

            <div className="test-arrows" role="group" aria-label="Controles do carrossel">
              <button className="test-arrow" onClick={prev} aria-label="Depoimento anterior">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="test-arrow" onClick={next} aria-label="Próximo depoimento">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {autoPlayInterval > 0 && (
            <div className="test-progress" aria-hidden="true">
              <div
                className="test-progress-bar"
                style={{ width: `${((current + 1) / total) * 100}%` }}
              />
            </div>
          )}

          <div className="test-proof-strip" aria-label="Números de satisfação do CQP">
            {[
              { value: '4.9★', label: 'Avaliação média' },
              null,
              { value: '+2.000', label: 'Alunos formados' },
              null,
              { value: '98%', label: 'Recomendam o CQP' },
            ].map((item, i) =>
              item === null
                ? <div key={`div-${i}`} className="test-proof-divider" aria-hidden="true" />
                : (
                  <div key={item.label} className="test-proof-item">
                    <span className="test-proof-value">{item.value}</span>
                    <span className="test-proof-label">{item.label}</span>
                  </div>
                )
            )}
          </div>

        </div>
      </section>
    </>
  );
}