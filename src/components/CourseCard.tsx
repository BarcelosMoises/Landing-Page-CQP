// CourseCard.tsx
import { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { CursoPosGraduacao, CategoriaConfig, Modalidade } from './types';
import { WHATSAPP_NUMBER } from './helpers';

function ModalidadeBadge({ modalidade }: { modalidade: Modalidade }) {
  const isEAD = modalidade === 'EAD';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '0.65rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: isEAD ? '#1A4A7A' : '#5A3D8A',
        background: isEAD ? 'rgba(26, 74, 122, 0.08)' : 'rgba(90, 61, 138, 0.08)',
        border: isEAD ? '1px solid rgba(26, 74, 122, 0.18)' : '1px solid rgba(90, 61, 138, 0.18)',
        borderRadius: '9999px',
        padding: '0.15rem 0.55rem',
        lineHeight: 1.4,
      }}
    >
      {isEAD ? 'ONLINE / EAD' : 'SEMIPRESENCIAL'}
    </span>
  );
}

function CategoriaBadge({ config }: { config: CategoriaConfig }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '0.65rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: config.badgeText,
        background: config.badgeBg,
        border: `1px solid ${config.badgeText}20`,
        borderRadius: '9999px',
        padding: '0.15rem 0.55rem',
        lineHeight: 1.4,
      }}
    >
      {config.label}
    </span>
  );
}

function CardHeader({ config }: { config: CategoriaConfig }) {
  const Icon = config.icone;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        background: config.gradient,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '55%',
          height: '55%',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-5%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          background: '#ffffff',
          border: '1.5px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <span style={{ display: 'flex', color: 'var(--color-text)', opacity: 0.7 }}>
          <Icon size={20} strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}

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
      aria-label={`Saiba mais sobre ${curso.titulo}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'box-shadow 280ms var(--ease-out-expo), transform 280ms var(--ease-out-expo), border-color 280ms var(--ease-out-expo)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: hovered ? 'oklch(from var(--cqp-teal) l c h / 0.35)' : 'var(--color-border)',
      }}
    >
      <CardHeader config={config} />

      <div
        style={{
          padding: '1rem 1.125rem 0.5rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.925rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: 1.35,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {curso.titulo}
        </h3>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <ModalidadeBadge modalidade={curso.modalidade} />
          <CategoriaBadge config={config} />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1.125rem 1rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: hovered ? 'var(--cqp-teal-dark)' : 'var(--color-text-muted)',
          transition: 'color 200ms var(--ease-out-expo)',
        }}
      >
        <span>Saiba mais</span>
        <span
          style={{
            display: 'inline-flex',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 200ms var(--ease-out-expo)',
          }}
        >
          <ChevronRight size={16} strokeWidth={2} />
        </span>
      </div>
    </a>
  );
}