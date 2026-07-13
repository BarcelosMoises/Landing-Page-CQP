import { useEffect, useRef, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Constantes hardcoded (removida dependência de @/data/cursos)
// ---------------------------------------------------------------------------
const TOTAL_CURSOS = 100;
const WHATSAPP_URL =
  'https://wa.me/5522998684334?text=Ol%C3%A1!+Tenho+interesse+em+saber+mais+sobre+os+cursos+do+CQP.';

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
interface Metrica {
  valor: number;
  sufixo: string;
  label: string;
  iconPath: string;
}

const METRICAS: Metrica[] = [
  {
    valor: TOTAL_CURSOS,
    sufixo: '+',
    label: 'Cursos disponíveis',
    iconPath:
      'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
  },
  {
    valor: 15000,
    sufixo: '+',
    label: 'Alunos formados',
    iconPath:
      'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    valor: 20,
    sufixo: '+',
    label: 'Anos de experiência',
    iconPath:
      'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    valor: 3,
    sufixo: '',
    label: 'Unidades em Macaé',
    iconPath:
      'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

// ---------------------------------------------------------------------------
// Hook — contagem animada com easing
// ---------------------------------------------------------------------------
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);

  return count;
}

// ---------------------------------------------------------------------------
// Sub-componente — card de métrica
// ---------------------------------------------------------------------------
function MetricaCard({ metrica, active }: { metrica: Metrica; active: boolean }) {
  const count = useCountUp(metrica.valor, 1800, active);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(51,184,184,0.20)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '0.75rem',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.25rem',
        minWidth: '130px',
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--cqp-teal)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ marginBottom: '0.2rem' }}
      >
        <path d={metrica.iconPath} />
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.75rem)',
          color: 'var(--cqp-teal)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count.toLocaleString('pt-BR')}
        {metrica.sufixo}
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.3,
        }}
      >
        {metrica.label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export default function HeroCQP() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [metricsActive, setMetricsActive] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleScrollDown = useCallback(() => {
    const next = document.getElementById('cursos');
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Animação de entrada inline
  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        @keyframes hero-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-scroll-icon { animation: none !important; }
          .hero-pulse-dot   { animation: none !important; }
        }
      `}</style>

      <section
        id="home"
        ref={sectionRef}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: '100dvh',
          backgroundColor: 'var(--cqp-navy)',
        }}
        aria-label="Seção principal — CQP"
      >
        {/* Vídeo de fundo com múltiplos codecs e poster mapeados no /public/videos/ */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/background-poster.jpg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/videos/background-video.webm" type="video/webm" />
          <source src="/videos/background-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay — gradiente navy */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,18,32,0.75) 0%, rgba(0,18,32,0.60) 50%, rgba(0,18,32,0.85) 100%)',
            zIndex: 1,
          }}
        />

        {/* Overlay — vinheta lateral */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,6,12,0.6) 100%)',
            zIndex: 2,
          }}
        />

        {/* Overlay — brilho teal */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '40vw',
            height: '40vw',
            background:
              'radial-gradient(circle, rgba(51,184,184,0.18) 0%, transparent 70%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Conteúdo */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2rem',
            maxWidth: '900px',
            marginInline: 'auto',
            paddingInline: 'clamp(1rem, 4vw, 2.5rem)',
            paddingBlock: 'clamp(5rem, 12vw, 8rem)',
          }}
        >
          {/* Badge eyebrow */}
          <div
            style={{
              ...fadeIn(0),
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--cqp-teal)',
              border: '1px solid rgba(51,184,184,0.35)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
              background: 'rgba(51,184,184,0.08)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span
              className="hero-pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--cqp-teal)',
                display: 'inline-block',
                animation: 'hero-pulse-dot 2s ease-in-out infinite',
              }}
            />
            Escola em Macaé · RJ
          </div>

          {/* H1 */}
          <h1
            style={{
              ...fadeIn(80),
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              color: '#ffffff',
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: '14ch',
              margin: 0,
            }}
          >
            Seu futuro começa aqui.
          </h1>

          {/* Subtítulo */}
          <p
            style={{
              ...fadeIn(160),
              fontSize: 'clamp(1rem, 0.85rem + 0.75vw, 1.375rem)',
              color: 'rgba(255,255,255,0.80)',
              maxWidth: '44ch',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Cursos técnicos, profissionalizantes, idiomas, graduações e
            pós-graduações — do ensino básico ao MBA, tudo em um só lugar.
          </p>

          {/* CTAs */}
          <div
            style={{
              ...fadeIn(240),
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a CQP pelo WhatsApp"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                background: 'var(--cqp-teal)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
                border: 'none',
                borderRadius: '9999px',
                textDecoration: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-cta)',
                transition:
                  'background 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms, transform 200ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  'var(--cqp-teal-dark)';
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  'var(--cqp-teal)';
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  'translateY(0)';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quero me matricular
            </a>

            <a
              href="#cursos"
              onClick={(e) => {
                e.preventDefault();
                handleScrollDown();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '9999px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 200ms, color 200ms, background 200ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'var(--cqp-teal)';
                (e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--cqp-teal)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(255,255,255,0.5)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
              }}
            >
              Ver cursos
            </a>
          </div>

          {/* Métricas */}
          <div
            style={{
              ...fadeIn(360),
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '1rem',
            }}
            aria-label="Números da escola"
          >
            {METRICAS.map((m) => (
              <MetricaCard key={m.label} metrica={m} active={metricsActive} />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScrollDown}
          aria-label="Rolar para os cursos"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
          }}
        >
          <svg
            className="hero-scroll-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ animation: 'hero-bounce 2s ease-in-out infinite' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </section>
    </>
  );
}