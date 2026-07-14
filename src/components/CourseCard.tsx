// CourseCard.tsx — Glassmorphism premium sobre fundo navy
// Usado por PosGraduacaoSection.tsx
import { useState, useRef } from 'react';
import { CursoPosGraduacao, CategoriaConfig, Modalidade } from './types';
import { WHATSAPP_NUMBER } from './helpers';

// ---------------------------------------------------------------------------
// ModalidadeBadge — teal glow premium
// ---------------------------------------------------------------------------
function ModalidadeBadge({ modalidade }: { modalidade: Modalidade }) {
  const label = modalidade === 'EAD' ? 'ONLINE / EAD' : 'SEMIPRESENCIAL';
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase"
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--cqp-teal-light)',
        background: 'rgba(51, 184, 184, 0.10)',
        border: '1px solid rgba(51, 184, 184, 0.20)',
        boxShadow: '0 0 12px rgba(51, 184, 184, 0.05)',
        lineHeight: 1.3,
      }}
    >
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// CategoriaBadge — teal glow premium
// ---------------------------------------------------------------------------
function CategoriaBadge({ config }: { config: CategoriaConfig }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase"
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--cqp-teal-light)',
        background: 'rgba(51, 184, 184, 0.10)',
        border: '1px solid rgba(51, 184, 184, 0.20)',
        boxShadow: '0 0 12px rgba(51, 184, 184, 0.05)',
        lineHeight: 1.3,
      }}
    >
      {config.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// CardHeader — gradiente da categoria com ícone central
// ---------------------------------------------------------------------------
function CardHeader({ config }: { config: CategoriaConfig }) {
  const Icon = config.icone;
  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        aspectRatio: '16 / 9',
        background: config.gradient,
      }}
    >
      {/* Orbes decorativos */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          top: '-15%',
          right: '-10%',
          width: '55%',
          height: '55%',
          background: 'rgba(255,255,255,0.25)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          bottom: '-20%',
          left: '-5%',
          width: '40%',
          height: '40%',
          background: 'rgba(255,255,255,0.18)',
        }}
      />

      {/* Ícone central */}
      <div
        className="relative z-10 rounded-full flex items-center justify-center"
        style={{
          width: '3rem',
          height: '3rem',
          background: '#ffffff',
          border: '1.5px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <span style={{ display: 'flex', color: 'var(--color-text)', opacity: 0.7 }}>
          <Icon size={20} strokeWidth={1.5} />
        </span>
      </div>

      {/* Overlay gradiente escuro na base — contraste para o texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0, 18, 32, 0.60) 0%, rgba(0, 18, 32, 0.10) 40%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// CourseCard — Glassmorphism premium
// ---------------------------------------------------------------------------
export function CourseCard({ curso, config }: { curso: CursoPosGraduacao; config: CategoriaConfig }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Tenho interesse na Pós-Graduação em *${curso.titulo}*. Poderia me enviar mais informações?`
  )}`;

  return (
    <a
      ref={cardRef}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      aria-label={`Saiba mais sobre ${curso.titulo}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: hovered
          ? '1px solid rgba(255, 255, 255, 0.18)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'box-shadow 280ms var(--ease-out-expo), transform 280ms var(--ease-out-expo), border-color 280ms var(--ease-out-expo), background 280ms var(--ease-out-expo)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(51, 184, 184, 0.15)'
          : '0 2px 8px rgba(0, 0, 0, 0.15)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        background: hovered ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.03)',
      }}
    >
      <CardHeader config={config} />

      {/* ── Corpo do card ── */}
      <div
        className="flex flex-col gap-2 flex-1"
        style={{ padding: '1rem 1.125rem 0.75rem' }}
      >
        <h3
          className="m-0"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.925rem',
            fontWeight: 700,
            color: 'var(--color-text-on-navy)',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {curso.titulo}
        </h3>

        {/* Badges com gap-2 — cada modalidade em sua própria badge */}
        <div className="flex flex-wrap gap-2">
          <ModalidadeBadge modalidade={curso.modalidade} />
          <CategoriaBadge config={config} />
        </div>
      </div>

      {/* ── Rodapé: "Saiba mais" ← → seta ── */}
      <div
        className="flex items-center justify-between w-full pt-4 border-t mt-auto"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.05)',
          padding: '1rem 1.125rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        <span
          className="text-sm font-medium transition-colors"
          style={{
            color: hovered ? 'var(--cqp-teal)' : 'rgba(255, 255, 255, 0.55)',
          }}
        >
          Saiba mais
        </span>
        <span
          className="inline-block transition-transform duration-300"
          style={{
            transform: hovered ? 'translateX(6px)' : 'translateX(0)',
            color: hovered ? 'var(--cqp-teal)' : 'rgba(255, 255, 255, 0.35)',
          }}
        >
          →
        </span>
      </div>
    </a>
  );
}