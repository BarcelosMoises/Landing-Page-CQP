'use client';

/**
 * HeroCQP.tsx
 * Hero section com vídeo de fundo, overlay gradiente navy, métricas animadas
 * e CTA principal para WhatsApp.
 *
 * Dependências:
 *   npm install lucide-react
 *
 * Imports necessários em layout.tsx:
 *   import '@/styles/globals.css'
 *
 * Dados vindos de:
 *   @/data/cursos  →  TOTAL_CURSOS, getWhatsAppUrl
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, GraduationCap, Users, Award, MapPin } from 'lucide-react';
import { TOTAL_CURSOS, getWhatsAppUrl } from '@/data/cursos';

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
interface Metrica {
  icone: React.ElementType;
  valor: number;
  sufixo: string;
  label: string;
}

const METRICAS: Metrica[] = [
  { icone: GraduationCap, valor: TOTAL_CURSOS, sufixo: '+', label: 'Cursos disponíveis' },
  { icone: Users,         valor: 15000,        sufixo: '+', label: 'Alunos formados'    },
  { icone: Award,         valor: 20,           sufixo: '+', label: 'Anos de experiência' },
  { icone: MapPin,        valor: 3,            sufixo: '',  label: 'Unidades em Macaé'  },
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
  const Icone = metrica.icone;
  const count = useCountUp(metrica.valor, 1800, active);

  return (
    <div className="glass rounded-xl px-5 py-4 flex flex-col items-center text-center gap-1 min-w-[130px]">
      <Icone
        size={22}
        className="mb-1"
        style={{ color: 'var(--color-primary)' }}
        aria-hidden="true"
      />
      <span
        className="font-display font-bold tabular-nums"
        style={{
          fontSize: 'var(--text-xl)',
          color: 'var(--color-primary)',
          lineHeight: 1,
        }}
      >
        {count.toLocaleString('pt-BR')}{metrica.sufixo}
      </span>
      <span
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-inverse)',
          opacity: 0.8,
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
  const videoRef    = useRef<HTMLVideoElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const [metricsActive, setMetricsActive]   = useState(false);
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

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
      aria-label="Seção principal — CQP"
    >
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/video/background-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <source src="/video/background-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay camada 1 — gradiente navy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, oklch(0.07 0.04 220 / 0.92) 0%, oklch(0.07 0.04 220 / 0.75) 55%, oklch(0.07 0.04 220 / 0.85) 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {/* Overlay camada 2 — vinheta lateral */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, oklch(0.05 0.03 220 / 0.6) 100%)',
          zIndex: 2,
        }}
        aria-hidden="true"
      />
      {/* Overlay camada 3 — brilho teal */}
      <div
        className="absolute"
        style={{
          top: '-10%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          background:
            'radial-gradient(circle, oklch(0.7 0.15 192 / 0.18) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div
        className="container-cqp relative flex flex-col items-center text-center gap-8"
        style={{ zIndex: 3, paddingBlock: 'clamp(var(--space-20), 12vw, var(--space-32))' }}
      >
        <div
          className={`badge badge-primary reveal ${contentVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: '0ms', color: 'var(--color-primary)' }}
        >
          <MapPin size={13} aria-hidden="true" />
          Escola em Macaé · RJ
        </div>

        <h1
          className={`font-display reveal ${contentVisible ? 'revealed' : ''}`}
          style={{
            fontSize: 'var(--text-hero)',
            color: '#ffffff',
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: '14ch',
            transitionDelay: '80ms',
          }}
        >
          Seu futuro começa aqui.
        </h1>

        <p
          className={`reveal ${contentVisible ? 'revealed' : ''}`}
          style={{
            fontSize: 'var(--text-lg)',
            color: 'rgba(255,255,255,0.80)',
            maxWidth: '44ch',
            lineHeight: 1.6,
            transitionDelay: '160ms',
          }}
        >
          Cursos técnicos, profissionalizantes, idiomas, graduações e pós-graduações
          — do ensino básico ao MBA, tudo em um só lugar.
        </p>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 reveal ${contentVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: '240ms' }}
        >
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            aria-label="Falar com a CQP pelo WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero me matricular
          </a>

          <a
            href="#cursos"
            className="btn btn-outline"
            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}
            onClick={(e) => { e.preventDefault(); handleScrollDown(); }}
          >
            Ver cursos
          </a>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-3 mt-4 reveal ${contentVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: '360ms' }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3, color: 'rgba(255,255,255,0.5)' }}
        aria-label="Rolar para os cursos"
      >
        <ChevronDown
          size={28}
          style={{ animation: 'bounce 2s ease-in-out infinite' }}
          aria-hidden="true"
        />
      </button>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
