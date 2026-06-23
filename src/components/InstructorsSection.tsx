import { useEffect, useRef, useState, useCallback } from 'react';
import { INSTRUTORES, AREA_LABELS, type Instrutor, type AreaId } from '../../data/instrutores';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface InstructorsSectionProps {
  sectionId?: string;
  instrutores?: Instrutor[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Gera uma cor HSL determinística a partir do nome (para o avatar placeholder) */
function nameToHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/** Mapeamento visual de área → cor do badge */
const AREA_COLORS: Record<AreaId, { bg: string; text: string; border: string }> = {
  tecnico:            { bg: 'rgba(51,184,184,0.12)',  text: '#33B8B8', border: 'rgba(51,184,184,0.25)' },
  profissionalizante: { bg: 'rgba(122,238,238,0.12)', text: '#7aeeee', border: 'rgba(122,238,238,0.25)' },
  nrs:                { bg: 'rgba(255,163,82,0.12)',  text: '#FFA352', border: 'rgba(255,163,82,0.25)' },
  graduacao:          { bg: 'rgba(130,180,255,0.12)', text: '#82B4FF', border: 'rgba(130,180,255,0.25)' },
  idiomas:            { bg: 'rgba(180,130,255,0.12)', text: '#B482FF', border: 'rgba(180,130,255,0.25)' },
  kids:               { bg: 'rgba(255,200,80,0.12)',  text: '#FFC850', border: 'rgba(255,200,80,0.25)' },
};

// ---------------------------------------------------------------------------
// Avatar — foto real ou placeholder SVG com iniciais
// ---------------------------------------------------------------------------
function Avatar({ instrutor, size = 96 }: { instrutor: Instrutor; size?: number }) {
  const [imgError, setImgError] = useState(false);
  const hue = nameToHue(instrutor.nome);
  const initials = getInitials(instrutor.nome);

  if (instrutor.foto && !imgError) {
    return (
      <img
        src={instrutor.foto}
        alt={instrutor.nome}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
          border: '3px solid rgba(51,184,184,0.35)',
        }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Foto de ${instrutor.nome} (placeholder)`}
      style={{ borderRadius: '50%', flexShrink: 0 }}
    >
      <circle cx="48" cy="48" r="48" fill={`hsl(${hue} 40% 18%)`} />
      <circle cx="48" cy="48" r="47" fill="none" stroke={`hsl(${hue} 60% 50% / 0.35)`} strokeWidth="2" />
      <circle cx="48" cy="36" r="14" fill={`hsl(${hue} 50% 55% / 0.25)`} />
      <ellipse cx="48" cy="76" rx="22" ry="14" fill={`hsl(${hue} 50% 55% / 0.18)`} />
      <text
        x="48"
        y="54"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Boska', Georgia, serif"
        fontWeight="800"
        fontSize="22"
        fill={`hsl(${hue} 70% 72%)`}
      >
        {initials}
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Bio Modal
// ---------------------------------------------------------------------------
function BioModal({ instrutor, onClose }: { instrutor: Instrutor; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const colors = AREA_COLORS[instrutor.area];

  useEffect(() => {
    const prev = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="instr-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Bio de ${instrutor.nome}`}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="instr-modal-card">
        <button
          ref={closeRef}
          className="instr-modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="instr-modal-avatar">
          <Avatar instrutor={instrutor} size={80} />
        </div>

        <div className="instr-modal-body">
          <span
            className="instr-badge"
            style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
          >
            {AREA_LABELS[instrutor.area]}
          </span>
          <h3 className="instr-modal-name">{instrutor.nome}</h3>
          <p className="instr-modal-spec">{instrutor.especialidade}</p>
          <p className="instr-modal-bio">{instrutor.bio}</p>
          {instrutor.linkedin && (
            <a
              href={instrutor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="instr-modal-link"
              aria-label={`LinkedIn de ${instrutor.nome}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              Ver LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Instructor Card
// ---------------------------------------------------------------------------
function InstructorCard({ instrutor, delay, onExpand }: {
  instrutor: Instrutor;
  delay: number;
  onExpand: (i: Instrutor) => void;
}) {
  // fix: HTMLArticElement não existe — usar HTMLElement
  const cardRef = useRef<HTMLElement>(null);
  const colors = AREA_COLORS[instrutor.area];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <article ref={cardRef} className="instr-card">
      <div className="instr-card-avatar">
        <Avatar instrutor={instrutor} size={96} />
      </div>

      <div className="instr-card-body">
        <span
          className="instr-badge"
          style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
        >
          {AREA_LABELS[instrutor.area]}
        </span>
        <h3 className="instr-card-name">{instrutor.nome}</h3>
        <p className="instr-card-spec">{instrutor.especialidade}</p>
        <p className="instr-card-bio-preview">{instrutor.bio.slice(0, 90)}&hellip;</p>
        <button
          className="instr-card-btn"
          onClick={() => onExpand(instrutor)}
          aria-label={`Ver bio completa de ${instrutor.nome}`}
        >
          Ver bio
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function InstructorsSection({
  sectionId = 'instrutores',
  instrutores = INSTRUTORES,
}: InstructorsSectionProps) {
  const [activeInstrutor, setActiveInstrutor] = useState<Instrutor | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setActiveInstrutor(null), []);

  useEffect(() => {
    const el = headerRef.current;
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
        .instr-section {
          position: relative;
          background: #001220;
          padding-block: clamp(4rem, 7vw, 7rem);
          padding-inline: clamp(1rem, 4vw, 2.5rem);
          overflow: hidden;
        }

        .instr-section::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 60px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C360,60 1080,0 1440,40 L1440,0 Z' fill='%23001220'/%3E%3C/svg%3E") no-repeat center / cover;
          pointer-events: none;
          z-index: 1;
        }

        .instr-section-glow {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(51,184,184,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .instr-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin-inline: auto;
        }

        .instr-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: clamp(2.5rem, 4vw, 4rem);
        }

        .instr-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #33B8B8;
        }

        .instr-eyebrow-line {
          display: block;
          width: 24px;
          height: 2px;
          background: #33B8B8;
          border-radius: 9999px;
        }

        .instr-title {
          font-family: 'Boska', Georgia, serif;
          font-size: clamp(1.75rem, 1rem + 3vw, 3.25rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-wrap: balance;
          margin: 0;
        }

        .instr-subtitle {
          font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
          color: rgba(255,255,255,0.5);
          max-width: 52ch;
          line-height: 1.65;
          margin: 0;
        }

        .instr-todo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FFA352;
          background: rgba(255,163,82,0.10);
          border: 1px solid rgba(255,163,82,0.20);
          border-radius: 9999px;
          padding: 0.2rem 0.7rem;
          margin-top: 0.25rem;
        }

        .instr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .instr-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.25rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid oklch(from #33B8B8 l c h / 0.12);
          border-radius: 0.75rem;
          padding: clamp(1.25rem, 2vw, 1.875rem);
          transition:
            background 220ms cubic-bezier(0.16,1,0.3,1),
            border-color 220ms cubic-bezier(0.16,1,0.3,1),
            transform 220ms cubic-bezier(0.16,1,0.3,1);
        }

        .instr-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: oklch(from #33B8B8 l c h / 0.28);
          transform: translateY(-3px);
        }

        .instr-card-avatar { flex-shrink: 0; }

        .instr-card-body {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
          align-self: stretch;
        }

        .instr-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.675rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          border-radius: 9999px;
          border-width: 1px;
          border-style: solid;
          padding: 0.15rem 0.6rem;
          align-self: flex-start;
          margin-bottom: 0.1rem;
        }

        .instr-card-name {
          font-family: 'Boska', Georgia, serif;
          font-size: clamp(1.05rem, 0.9rem + 0.5vw, 1.3rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .instr-card-spec {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #33B8B8;
          margin: 0;
        }

        .instr-card-bio-preview {
          font-size: clamp(0.8125rem, 0.75rem + 0.25vw, 0.9375rem);
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin: 0.25rem 0 0;
          flex: 1;
        }

        .instr-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.75rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #33B8B8;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: gap 180ms cubic-bezier(0.16,1,0.3,1), color 180ms cubic-bezier(0.16,1,0.3,1);
        }

        .instr-card-btn:hover,
        .instr-card-btn:focus-visible {
          color: #7aeeee;
          gap: 0.55rem;
        }

        .instr-card-btn:focus-visible {
          outline: 2px solid #33B8B8;
          outline-offset: 3px;
          border-radius: 3px;
        }

        .instr-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(0,18,32,0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: instr-overlay-in 220ms cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes instr-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .instr-modal-card {
          position: relative;
          display: flex;
          gap: 1.5rem;
          background: #061a2a;
          border: 1px solid rgba(51,184,184,0.20);
          border-radius: 1rem;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          max-width: 540px;
          width: 100%;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
          animation: instr-card-in 280ms cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes instr-card-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .instr-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 50%;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: background 180ms, color 180ms;
        }

        .instr-modal-close:hover { background: rgba(255,255,255,0.12); color: #ffffff; }
        .instr-modal-close:focus-visible { outline: 2px solid #33B8B8; outline-offset: 3px; }
        .instr-modal-avatar { flex-shrink: 0; }

        .instr-modal-body {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }

        .instr-modal-name {
          font-family: 'Boska', Georgia, serif;
          font-size: clamp(1.125rem, 0.9rem + 0.8vw, 1.5rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          margin-top: 0.25rem;
        }

        .instr-modal-spec { font-size: 0.875rem; font-weight: 600; color: #33B8B8; margin: 0; }

        .instr-modal-bio {
          font-size: clamp(0.875rem, 0.82rem + 0.2vw, 0.9375rem);
          line-height: 1.7;
          color: rgba(255,255,255,0.65);
          margin: 0.5rem 0 0;
        }

        .instr-modal-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.75rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #33B8B8;
          text-decoration: none;
          transition: color 180ms;
        }

        .instr-modal-link:hover { color: #7aeeee; }

        @media (max-width: 480px) {
          .instr-modal-card { flex-direction: column; align-items: center; text-align: center; }
          .instr-badge, .instr-modal-link { align-self: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .instr-card, .instr-card-btn, .instr-modal-overlay, .instr-modal-card {
            transition: none !important;
            animation: none !important;
          }
          .instr-card:hover { transform: none; }
        }

        .instr-note {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(255,163,82,0.07);
          border: 1px solid rgba(255,163,82,0.18);
          border-radius: 0.625rem;
          padding: 1rem 1.25rem;
          margin-top: clamp(2rem, 3vw, 3rem);
        }

        .instr-note-icon { color: #FFA352; flex-shrink: 0; margin-top: 1px; }

        .instr-note-text {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin: 0;
        }

        .instr-note-text strong { color: #FFA352; font-weight: 700; }
      `}</style>

      <section
        id={sectionId}
        className="instr-section"
        aria-labelledby="instr-section-title"
      >
        <div className="instr-section-glow" aria-hidden="true" />

        <div className="instr-inner">
          <header ref={headerRef} className="instr-header">
            <div className="instr-eyebrow" aria-hidden="true">
              <span className="instr-eyebrow-line" />
              Corpo docente
            </div>
            <h2 id="instr-section-title" className="instr-title">
              Aprenda com quem vive o mercado
            </h2>
            <p className="instr-subtitle">
              Nossos instrutores são profissionais ativos nas suas áreas —
              trazem para a sala de aula os desafios reais do mercado de Macaé e região.
            </p>
            <span className="instr-todo-badge" aria-label="Dados pendentes de atualização pelo cliente">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5a1 1 0 011 1v5a1 1 0 01-2 0V8a1 1 0 011-1zm0 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              </svg>
              Fotos e bios pendentes — substituir antes do deploy
            </span>
          </header>

          <div
            className="instr-grid"
            role="list"
            aria-label="Lista de instrutores"
          >
            {instrutores.map((instrutor, index) => (
              <div key={instrutor.id} role="listitem">
                <InstructorCard
                  instrutor={instrutor}
                  delay={index * 80}
                  onExpand={setActiveInstrutor}
                />
              </div>
            ))}
          </div>

          <aside className="instr-note" aria-label="Nota de desenvolvimento">
            <svg className="instr-note-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5a1 1 0 011 1v5a1 1 0 01-2 0V8a1 1 0 011-1zm0 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
            <p className="instr-note-text">
              <strong>Ação pendente:</strong> os dados acima são placeholders estruturais.
              Adicione as fotos em <code>images/instrutores/</code> e atualize{' '}
              <code>data/instrutores.ts</code> com os campos <code>foto</code>,{' '}
              <code>linkedin</code> e as bios reais antes do deploy.
            </p>
          </aside>
        </div>
      </section>

      {activeInstrutor && (
        <BioModal instrutor={activeInstrutor} onClose={handleClose} />
      )}
    </>
  );
}
