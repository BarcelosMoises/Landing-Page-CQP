import { useEffect, useRef } from 'react';
import { TOTAL_CURSOS, getWhatsAppUrl } from '../../data/cursos';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface BenefitsSectionProps {
  sectionId?: string;
}

interface BenefitItemProps {
  number: string;
  title: string;
  description: string;
  detail: string;
  delay?: number;
}

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------
function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = String(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    el.textContent = '0';
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}

// ---------------------------------------------------------------------------
// Single open-column benefit item
// ---------------------------------------------------------------------------
function BenefitItem({ number, title, description, detail, delay = 0 }: BenefitItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={itemRef} className="benefit-item">
      <span className="benefit-number" aria-hidden="true">{number}</span>
      <div className="benefit-body">
        <h3 className="benefit-title">{title}</h3>
        <p className="benefit-desc">{description}</p>
        <p className="benefit-detail">{detail}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function BenefitsSection({ sectionId = 'modalidades' }: BenefitsSectionProps) {
  const countRef = useCountUp(TOTAL_CURSOS, 1600);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current?.querySelector('.benefits-header') as HTMLElement | null;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .benefits-section {
          position: relative;
          background: var(--cqp-navy);
          padding-block: clamp(4rem, 7vw, 7rem);
          padding-inline: clamp(1rem, 4vw, 2.5rem);
          overflow: hidden;
        }

        .benefits-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        }

        .benefits-section::after {
          content: '';
          position: absolute;
          top: -120px;
          right: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(51,184,184,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        .benefits-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin-inline: auto;
        }

        .benefits-header {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: clamp(2.5rem, 4vw, 4rem);
        }

        .benefits-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cqp-teal);
          margin-bottom: 0.75rem;
        }

        .benefits-eyebrow-line {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--cqp-teal);
          border-radius: 9999px;
        }

        .benefits-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-wrap: balance;
          margin: 0;
        }

        .benefits-title-accent {
          color: var(--cqp-teal);
        }

        .benefits-header-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.15rem;
          flex-shrink: 0;
        }

        .benefits-stat-number {
          font-family: var(--font-display);
          font-size: clamp(3rem, 2rem + 3vw, 5.5rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--cqp-teal);
        }

        .benefits-stat-label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-align: right;
        }

        /* Open columns layout */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
        }

        .benefit-item {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid oklch(from var(--cqp-teal) l c h / 0.18);
        }

        .benefit-number {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 2rem + 2vw, 4rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--cqp-teal);
          opacity: 0.35;
        }

        .benefit-body {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .benefit-title {
          font-family: var(--font-display);
          font-size: clamp(1.125rem, 0.9rem + 1vw, 1.5rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          text-wrap: balance;
        }

        .benefit-desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          margin: 0;
          max-width: 42ch;
        }

        .benefit-detail {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--cqp-teal);
          margin: 0;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .benefit-detail::before {
          content: '';
          display: block;
          width: 16px;
          height: 2px;
          background: var(--cqp-teal);
          border-radius: 9999px;
          flex-shrink: 0;
        }

        .benefits-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1px;
          background: oklch(from var(--cqp-teal) l c h / 0.12);
          border: 1px solid oklch(from var(--cqp-teal) l c h / 0.12);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-top: clamp(2rem, 3.5vw, 3.5rem);
        }

        .benefits-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.25rem;
          padding: clamp(1rem, 2vw, 1.75rem);
          background: rgba(255,255,255,0.03);
          transition: background 200ms var(--ease-out-expo);
        }

        .benefits-stat-item:hover {
          background: rgba(255,255,255,0.06);
        }

        .benefits-stat-item-value {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 1rem + 1.5vw, 2.5rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--cqp-teal);
        }

        .benefits-stat-item-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.3;
        }

        .benefits-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: clamp(2.5rem, 4vw, 4rem);
          text-align: center;
        }

        .benefits-cta-text {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.55);
          max-width: 42ch;
          line-height: 1.55;
        }

        .benefits-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.875rem;
          font-family: var(--font-body);
          background: var(--cqp-teal);
          color: #ffffff;
          font-weight: 700;
          font-size: var(--text-sm);
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(51,184,184,0.35);
          transition:
            background 180ms var(--ease-out-expo),
            box-shadow 180ms var(--ease-out-expo),
            transform 180ms var(--ease-out-expo);
        }

        .benefits-cta-btn:hover,
        .benefits-cta-btn:focus-visible {
          background: var(--cqp-teal-dark);
          box-shadow: 0 6px 32px rgba(51,184,184,0.50);
          transform: translateY(-2px);
        }

        @media (max-width: 960px) {
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          .benefit-item {
            padding-top: 1.25rem;
          }
          .benefits-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .benefits-header-stat {
            align-items: flex-start;
          }
          .benefits-stat-label {
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .benefit-item,
          .benefits-cta-btn,
          .benefits-stat-item {
            transition: none !important;
          }
        }
      `}</style>

      <section
        id={sectionId}
        ref={sectionRef}
        className="benefits-section"
        aria-labelledby="benefits-section-title"
      >
        <div className="benefits-inner">

          <header className="benefits-header">
            <div className="benefits-header-left">
              <div className="benefits-eyebrow" aria-hidden="true">
                <span className="benefits-eyebrow-line" />
                Por que estudar no CQP
              </div>
              <h2 id="benefits-section-title" className="benefits-title">
                A forma mais{' '}
                <span className="benefits-title-accent">flexível</span>
                <br />
                de se qualificar
              </h2>
            </div>

            <div className="benefits-header-stat" aria-label={`Mais de ${TOTAL_CURSOS} cursos disponíveis`}>
              <span className="benefits-stat-number" aria-hidden="true">
                <span ref={countRef}>0</span>
              </span>
              <span className="benefits-stat-label">cursos disponíveis</span>
            </div>
          </header>

          <div className="benefits-grid">
            <BenefitItem
              number="01"
              title="Estude como e onde preferir"
              description="Escolha entre presencial, EAD ou o modelo flexível que combina os dois. Cada curso indica as modalidades disponíveis para que você encaixe o aprendizado na sua rotina."
              detail="Presencial · EAD · Híbrido"
              delay={0}
            />
            <BenefitItem
              number="02"
              title="Mensalidades que cabem no seu bolso"
              description="Planos a partir de R$\u00a0150/mês com parcelamento facilitado. Sem taxa de matrícula oculta e com bolsas de estudo para quem se qualificar."
              detail="A partir de R$\u00a0150 por mês"
              delay={120}
            />
            <BenefitItem
              number="03"
              title="Plataforma exclusiva de aprendizado"
              description="Acesse aulas gravadas, materiais didáticos e acompanhe seu progresso em qualquer dispositivo. Certificado digital emitido automaticamente ao concluir."
              detail="Certificado reconhecido pelo mercado"
              delay={220}
            />
          </div>

          <div className="benefits-stats" role="list" aria-label="Números do CQP">
            {[
              { value: '+2.000', label: 'Alunos formados' },
              { value: '17', label: 'Cursos técnicos com diploma' },
              { value: '+50', label: 'NRs e treinamentos' },
              { value: '10\u00a0anos', label: 'De experiência em Macaé' },
            ].map(({ value, label }) => (
              <div key={label} className="benefits-stat-item" role="listitem">
                <span className="benefits-stat-item-value">{value}</span>
                <span className="benefits-stat-item-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="benefits-cta-row">
            <p className="benefits-cta-text">
              Dúvidas sobre qual curso escolher? Nossa equipe orienta você gratuitamente.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="benefits-cta-btn"
              aria-label="Fale com nossa equipe pelo WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com a equipe
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
