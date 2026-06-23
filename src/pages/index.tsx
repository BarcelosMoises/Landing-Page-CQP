import React, { useEffect, useRef, useState } from 'react';
import '../styles/tokens.css';

import NavbarCQP        from '../components/NavbarCQP';
import HeroSection      from '../components/HeroSection';
import CoursesSection   from '../components/CoursesSection';
import BenefitsSection  from '../components/BenefitsSection';
import InstructorsSection from '../components/InstructorsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection   from '../components/ContactSection';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = '5522998684334';
const VIDEO_SRC       = '/video/background-video.mp4';

// ---------------------------------------------------------------------------
// Back-to-top button
// ---------------------------------------------------------------------------
function BackToTop() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel placed right below the hero — button appears after hero leaves */}
      <div ref={sentinelRef} style={{ position: 'absolute', top: '100dvh', height: 1, pointerEvents: 'none' }} aria-hidden="true" />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        style={{
          position:   'fixed',
          right:      'clamp(1rem, 2vw, 1.5rem)',
          bottom:     'calc(clamp(1rem, 2vw, 1.5rem) + 4.5rem)', // fica acima do botão flutuante do WhatsApp
          zIndex:     70,
          width:      '2.75rem',
          height:     '2.75rem',
          borderRadius: '9999px',
          background: 'rgba(0,18,32,0.80)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border:     '1px solid rgba(255,255,255,0.10)',
          color:      '#ffffff',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor:     'pointer',
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.9)',
          transition: 'opacity 280ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: visible ? 'auto' : 'none',
          boxShadow:  '0 4px 16px rgba(0,0,0,0.3)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function FooterCQP({ whatsappNumber }: { whatsappNumber: string }) {
  const year = new Date().getFullYear();
  const wa = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

  return (
    <footer
      style={{
        background:    '#001220',
        borderTop:     '1px solid rgba(51,184,184,0.12)',
        padding:       'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 4vw, 2.5rem)',
        color:         'rgba(255,255,255,0.55)',
        fontSize:      'clamp(0.8rem, 0.75rem + 0.2vw, 0.9rem)',
        lineHeight:    1.6,
      }}
    >
      <div
        style={{
          maxWidth:      '1200px',
          margin:        '0 auto',
          display:       'flex',
          flexWrap:      'wrap',
          alignItems:    'center',
          justifyContent: 'space-between',
          gap:           '1rem',
        }}
      >
        {/* Logotipo + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <svg
            width="32" height="32"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="CQP logo"
            role="img"
          >
            <polygon
              points="24,2 44,13 44,35 24,46 4,35 4,13"
              fill="#001220"
              stroke="#33B8B8"
              strokeWidth="2"
            />
            <text
              x="24" y="30"
              textAnchor="middle"
              fontFamily="'Boska',Georgia,serif"
              fontWeight="900"
              fontSize="14"
              fill="#33B8B8"
            >CQP</text>
          </svg>
          <span>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>CQP</strong>
            {' — '}Centro de Qualificação Profissional
          </span>
        </div>

        {/* Links e copyright */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1.5rem' }}>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#33B8B8', textDecoration: 'none', fontWeight: 600 }}
          >
            WhatsApp
          </a>
          <a href="#cursos" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Cursos</a>
          <a href="#contato" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Contato</a>
          <span style={{ color: 'rgba(255,255,255,0.28)' }}>|</span>
          <span>© {year} CQP — Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function IndexPage() {
  return (
    <>
      {/* Skip link — primeiro elemento focável da página */}
      <a
        href="#hero"
        style={{
          position:   'absolute',
          top:        '-999px',
          left:       '1rem',
          zIndex:     9999,
          background: '#33B8B8',
          color:      '#ffffff',
          padding:    '0.75rem 1.25rem',
          borderRadius: '0 0 0.5rem 0.5rem',
          fontWeight: 700,
          fontSize:   '0.9rem',
          textDecoration: 'none',
        }}
        onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.top = '0'; }}
        onBlur={(e)  => { (e.currentTarget as HTMLAnchorElement).style.top = '-999px'; }}
      >
        Pular para o conteúdo
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* 1. Navbar                                                        */}
      {/* ---------------------------------------------------------------- */}
      <NavbarCQP
        whatsappNumber={WHATSAPP_NUMBER}
        heroId="hero"
        navItems={[
          { label: 'Início',      href: '#hero' },
          { label: 'Cursos',      href: '#cursos' },
          { label: 'Por que CQP', href: '#modalidades' },
          { label: 'Instrutores', href: '#instrutores' },
          { label: 'Depoimentos', href: '#depoimentos' },
          { label: 'Contato',     href: '#contato' },
        ]}
      />

      <main id="main-content">
        {/* -------------------------------------------------------------- */}
        {/* 2. Hero                                                         */}
        {/* -------------------------------------------------------------- */}
        <HeroSection
          videoSrc={VIDEO_SRC}
          whatsappNumber={WHATSAPP_NUMBER}
          scrollTargetId="cursos"
        />

        {/* -------------------------------------------------------------- */}
        {/* 3. Cursos                                                       */}
        {/* -------------------------------------------------------------- */}
        <CoursesSection
          sectionId="cursos"
          whatsappNumber={WHATSAPP_NUMBER}
        />

        {/* -------------------------------------------------------------- */}
        {/* 4. Benefícios / Por que CQP                                    */}
        {/* -------------------------------------------------------------- */}
        <BenefitsSection sectionId="modalidades" />

        {/* -------------------------------------------------------------- */}
        {/* 5. Instrutores                                                  */}
        {/* -------------------------------------------------------------- */}
        <InstructorsSection sectionId="instrutores" />

        {/* -------------------------------------------------------------- */}
        {/* 6. Depoimentos                                                  */}
        {/* -------------------------------------------------------------- */}
        <TestimonialsSection
          sectionId="depoimentos"
          autoPlayInterval={5500}
        />

        {/* -------------------------------------------------------------- */}
        {/* 7. Contato                                                      */}
        {/* -------------------------------------------------------------- */}
        <ContactSection
          sectionId="contato"
          whatsappNumber={WHATSAPP_NUMBER}
          /*
           * TODO (aguardando resposta do cliente):
           * phoneNumber="(22) XXXXX-XXXX"
           * email="contato@cqp.edu.br"
           * address="Av. Rui Barbosa, 000 — Centro"
           * cityState="Macaé, RJ"
           * mapEmbedUrl="https://www.google.com/maps?q=..."
           * instagramUrl="https://instagram.com/cqpmacae"
           * facebookUrl="https://facebook.com/cqpmacae"
           * youtubeUrl="https://youtube.com/@cqpmacae"
           */
        />
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* 8. Footer                                                        */}
      {/* ---------------------------------------------------------------- */}
      <FooterCQP whatsappNumber={WHATSAPP_NUMBER} />

      {/* ---------------------------------------------------------------- */}
      {/* Utilitários globais                                              */}
      {/* ---------------------------------------------------------------- */}
      <BackToTop />
    </>
  );
}
