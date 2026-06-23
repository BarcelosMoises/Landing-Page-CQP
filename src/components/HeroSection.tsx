import { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface HeroSectionProps {
  /** Caminho relativo ou URL do vídeo de fundo */
  videoSrc?: string;
  /** Número do WhatsApp no formato internacional sem o + (ex: 5522998684334) */
  whatsappNumber?: string;
  /** Âncora de destino do botão "scroll down" */
  scrollTargetId?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HeroSection({
  videoSrc = './video/background-video.mp4',
  whatsappNumber = '5522998684334',
  scrollTargetId = 'sobre',
}: HeroSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Entrance animation via IntersectionObserver — no dependency on animate.css
  useEffect(() => {
    const elements = [
      { el: headingRef.current, delay: 0 },
      { el: subRef.current, delay: 120 },
      { el: ctaRef.current, delay: 240 },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            const item = elements.find((e) => e.el === target);
            setTimeout(() => {
              (target as HTMLElement).style.opacity = '1';
              (target as HTMLElement).style.transform = 'translateY(0)';
            }, item?.delay ?? 0);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(({ el }) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const whatsappHref = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Ol%C3%A1!+Tenho+interesse+em+saber+mais+sobre+os+cursos+do+CQP.&type=phone_number&app_absent=0`;

  const handleScrollDown = () => {
    const target = document.getElementById(scrollTargetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        /* Design tokens — CQP brand */
        :root {
          --cqp-teal:        #33B8B8;
          --cqp-teal-dark:   #0c6161;
          --cqp-navy:        #001220;
          --cqp-teal-light:  #7aeeee;

          /* Fluid type scale */
          --text-hero: clamp(2.25rem, 1rem + 5vw, 5.5rem);
          --text-2xl:  clamp(1.5rem,  0.8rem + 2.5vw, 3rem);
          --text-lg:   clamp(1rem,    0.85rem + 0.75vw, 1.375rem);
          --text-sm:   clamp(0.875rem, 0.8rem + 0.35vw, 1rem);

          /* Spacing */
          --space-4:  1rem;
          --space-6:  1.5rem;
          --space-8:  2rem;
          --space-12: 3rem;
          --space-16: 4rem;

          /* Transitions */
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-heading,
          .hero-sub,
          .hero-cta {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Hero wrapper */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--cqp-navy);
        }

        /* Background video */
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        /* Dark overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 18, 32, 0.75) 0%,
            rgba(0, 18, 32, 0.60) 50%,
            rgba(0, 18, 32, 0.85) 100%
          );
        }

        /* Content */
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--space-16) var(--space-6);
          max-width: 900px;
          margin-inline: auto;
        }

        /* Eyebrow badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--cqp-teal);
          border: 1px solid oklch(from var(--cqp-teal) l c h / 0.35);
          border-radius: 9999px;
          padding: 0.3rem 0.9rem;
          margin-bottom: var(--space-6);
          background: rgba(51, 184, 184, 0.08);
          backdrop-filter: blur(4px);
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cqp-teal);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Heading */
        .hero-heading {
          font-size: var(--text-hero);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-wrap: balance;
          margin-bottom: var(--space-6);
        }

        .hero-heading-accent {
          color: var(--cqp-teal);
          position: relative;
          white-space: nowrap;
        }

        /* Separator line under accent */
        .hero-heading-accent::after {
          content: '';
          position: absolute;
          bottom: 0.05em;
          left: 0;
          width: 100%;
          height: 0.06em;
          background: var(--cqp-teal);
          border-radius: 9999px;
          opacity: 0.5;
        }

        /* Subheading */
        .hero-sub {
          font-size: var(--text-lg);
          font-weight: 400;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.72);
          max-width: 62ch;
          text-wrap: pretty;
          margin-bottom: var(--space-8);
        }

        /* CTA group */
        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          justify-content: center;
          align-items: center;
        }

        /* Primary CTA — WhatsApp */
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: var(--cqp-teal);
          color: #fff;
          font-weight: 700;
          font-size: var(--text-sm);
          border: none;
          border-radius: 9999px;
          text-decoration: none;
          cursor: pointer;
          transition: background 200ms var(--ease-out-expo),
                      box-shadow 200ms var(--ease-out-expo),
                      transform 200ms var(--ease-out-expo);
          box-shadow: 0 4px 24px rgba(51, 184, 184, 0.35);
        }

        .hero-btn-primary:hover,
        .hero-btn-primary:focus-visible {
          background: var(--cqp-teal-dark);
          box-shadow: 0 8px 32px rgba(51, 184, 184, 0.5);
          transform: translateY(-2px);
        }

        .hero-btn-primary:active {
          transform: translateY(0);
        }

        /* WhatsApp icon inline SVG */
        .hero-btn-primary svg {
          flex-shrink: 0;
        }

        /* Secondary CTA — ghost */
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: transparent;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
          font-size: var(--text-sm);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 9999px;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 200ms var(--ease-out-expo),
                      color 200ms var(--ease-out-expo),
                      background 200ms var(--ease-out-expo);
        }

        .hero-btn-secondary:hover,
        .hero-btn-secondary:focus-visible {
          border-color: var(--cqp-teal);
          color: var(--cqp-teal);
          background: rgba(51, 184, 184, 0.08);
        }

        /* Stats row */
        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-8);
          justify-content: center;
          margin-top: var(--space-12);
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .hero-stat-value {
          font-size: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
          font-weight: 800;
          color: var(--cqp-teal);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .hero-stat-label {
          font-size: var(--text-sm);
          color: rgba(255, 255, 255, 0.55);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        .hero-stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.12);
          align-self: center;
        }

        /* Scroll arrow */
        .hero-scroll-btn {
          position: absolute;
          bottom: var(--space-8);
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          transition: color 200ms var(--ease-out-expo);
          padding: var(--space-4);
        }

        .hero-scroll-btn:hover,
        .hero-scroll-btn:focus-visible {
          color: var(--cqp-teal);
        }

        .hero-scroll-btn svg {
          animation: bounce-arrow 1.8s ease-in-out infinite;
        }

        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-badge-dot { animation: none; }
          .hero-scroll-btn svg { animation: none; }
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .hero-content {
            padding: var(--space-16) var(--space-4);
          }
          .hero-stats {
            gap: var(--space-4);
          }
          .hero-stat-divider {
            display: none;
          }
        }
      `}</style>

      <section
        id="hero"
        className="hero-section"
        aria-label="Seção principal — Centro de Qualificação Profissional"
      >
        {/* Background video */}
        <video
          className="hero-video"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          preload="metadata"
        />

        {/* Gradient overlay */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* Main content */}
        <div className="hero-content">
          {/* Eyebrow badge */}
          <div className="hero-badge" aria-hidden="true">
            <span className="hero-badge-dot" />
            Matrículas abertas 2026
          </div>

          {/* H1 — one per page */}
          <h1 ref={headingRef} className="hero-heading">
            Centro de{' '}
            <span className="hero-heading-accent">Qualificação</span>
            <br />
            Profissional
          </h1>

          {/* Subheading */}
          <p ref={subRef} className="hero-sub">
            Do técnico à pós-graduação — cursos presenciais, semipresenciais e
            EAD com mensalidades acessíveis, plataforma exclusiva e certificação
            reconhecida pelo mercado.
          </p>

          {/* CTA group */}
          <div ref={ctaRef} className="hero-cta">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-primary"
              aria-label="Entre em contato pelo WhatsApp"
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
              Fale pelo WhatsApp
            </a>

            <a href={`#${scrollTargetId}`} className="hero-btn-secondary">
              Conheça os cursos
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Stats row */}
          <div className="hero-stats" role="list" aria-label="Números do CQP">
            <div className="hero-stat" role="listitem">
              <span className="hero-stat-value">+100</span>
              <span className="hero-stat-label">Cursos</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat" role="listitem">
              <span className="hero-stat-value">EAD</span>
              <span className="hero-stat-label">& Presencial</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat" role="listitem">
              <span className="hero-stat-value">R$150</span>
              <span className="hero-stat-label">A partir de</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat" role="listitem">
              <span className="hero-stat-value">CRECI</span>
              <span className="hero-stat-label">Certificado</span>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <button
          className="hero-scroll-btn"
          onClick={handleScrollDown}
          aria-label={`Rolar para a próxima seção`}
          type="button"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </section>
    </>
  );
}
