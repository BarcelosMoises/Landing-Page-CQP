import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface ContactSectionProps {
  sectionId?: string;
  whatsappNumber?: string;
  whatsappDisplay?: string;
  email?: string;
  address?: string;
  cityState?: string;
  mapEmbedUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const DEFAULT_WHATSAPP = '5522998684334';
const DEFAULT_WHATSAPP_DISPLAY = '(22) 99868-4334';
const DEFAULT_EMAIL = 'contato@cqp.edu.br';
const DEFAULT_ADDRESS = 'Rua Prata Mancebo nº148 — Centro';
const DEFAULT_CITY_STATE = 'Carapebus — RJ, Brazil';
const DEFAULT_MAP_EMBED = 'https://www.google.com/maps?q=Rua+Prata+Mancebo+148+Carapebus+RJ+Brazil&z=15&output=embed';

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) {
    const isMobile = digits.length === 11;
    return isMobile
      ? `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
      : `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return value;
}

function buildWhatsAppUrl(whatsappNumber: string, data?: Partial<ContactFormData>) {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const text = data
    ? `Olá! Meu nome é ${data.name || '[nome]'}. Tenho interesse no CQP e gostaria de mais informações.${data.phone ? ` Meu telefone é ${data.phone}.` : ''}${data.email ? ` Meu e-mail é ${data.email}.` : ''}${data.message ? ` Mensagem: ${data.message}` : ''}`
    : 'Olá! Gostaria de mais informações sobre os cursos do CQP.';

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

function useRevealOnIntersect<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 680ms cubic-bezier(0.16,1,0.3,1), transform 680ms cubic-bezier(0.16,1,0.3,1)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return <span className="contact-icon" aria-hidden="true">{children}</span>;
}

function SocialLink({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="contact-social-link"
    >
      {children}
    </a>
  );
}

export default function ContactSection({
  sectionId = 'contato',
  whatsappNumber = DEFAULT_WHATSAPP,
  whatsappDisplay = DEFAULT_WHATSAPP_DISPLAY,
  email = DEFAULT_EMAIL,
  address = DEFAULT_ADDRESS,
  cityState = DEFAULT_CITY_STATE,
  mapEmbedUrl = DEFAULT_MAP_EMBED,
  instagramUrl,
  facebookUrl,
  youtubeUrl,
}: ContactSectionProps) {
  const sectionRef = useRevealOnIntersect<HTMLElement>();
  const infoRef = useRevealOnIntersect<HTMLDivElement>();
  const formRef = useRevealOnIntersect<HTMLDivElement>();
  const mapRef = useRevealOnIntersect<HTMLDivElement>();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const whatsappHref = useMemo(
    () => buildWhatsAppUrl(whatsappNumber, formData),
    [whatsappNumber, formData]
  );

  const floatingWhatsappHref = useMemo(
    () => buildWhatsAppUrl(whatsappNumber),
    [whatsappNumber]
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? formatPhoneNumber(value) : value,
    }));
  };

  return (
    <>
      <style>{`
        .contact-section {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 2rem);
          background:
            radial-gradient(circle at top right, rgba(51, 184, 184, 0.18), transparent 28%),
            radial-gradient(circle at bottom left, rgba(122, 238, 238, 0.08), transparent 35%),
            linear-gradient(180deg, rgba(0, 18, 32, 0.98), rgba(0, 18, 32, 1));
          color: #ffffff;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 36px 36px;
          opacity: 0.22;
          pointer-events: none;
          z-index: -1;
        }

        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: clamp(1.5rem, 3vw, 2.5rem);
        }

        .contact-header {
          max-width: 760px;
        }

        .contact-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7aeeee;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .contact-eyebrow::before {
          content: '';
          display: inline-block;
          width: 26px;
          height: 2px;
          border-radius: 999px;
          background: #33B8B8;
        }

        .contact-title {
          margin: 0;
          font-family: 'Boska', Georgia, serif;
          font-size: clamp(2rem, 1rem + 3.8vw, 4.5rem);
          line-height: 1.04;
          letter-spacing: -0.03em;
          text-wrap: balance;
        }

        .contact-title strong {
          color: #33B8B8;
          font-weight: 700;
        }

        .contact-description {
          margin: 1rem 0 0;
          max-width: 62ch;
          color: rgba(255,255,255,0.72);
          font-size: clamp(0.95rem, 0.88rem + 0.28vw, 1.05rem);
          line-height: 1.72;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: clamp(1.5rem, 3vw, 2rem);
          align-items: stretch;
        }

        .contact-card,
        .contact-form-card,
        .contact-map-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid oklch(from #33B8B8 l c h / 0.15);
          border-radius: 1rem;
          box-shadow: 0 16px 36px rgba(0,0,0,0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .contact-info-stack {
          display: grid;
          gap: 1rem;
          height: 100%;
        }

        .contact-card {
          padding: clamp(1.25rem, 2vw, 1.5rem);
        }

        .contact-card h3,
        .contact-form-card h3,
        .contact-map-card h3 {
          margin: 0 0 0.35rem;
          font-family: 'Boska', Georgia, serif;
          font-size: clamp(1.2rem, 1rem + 0.9vw, 1.75rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .contact-card p,
        .contact-form-card p,
        .contact-map-card p {
          margin: 0;
          color: rgba(255,255,255,0.68);
          line-height: 1.65;
          font-size: 0.95rem;
        }

        .contact-list {
          display: grid;
          gap: 0.85rem;
          margin-top: 1.25rem;
        }

        .contact-list-item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.85rem;
          align-items: start;
        }

        .contact-icon {
          width: 2.5rem;
          height: 2.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          flex-shrink: 0;
          color: #33B8B8;
          background: rgba(51,184,184,0.1);
          border: 1px solid rgba(51,184,184,0.18);
        }

        .contact-list-item-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
          margin-bottom: 0.2rem;
          display: block;
          font-weight: 700;
        }

        .contact-list-item a,
        .contact-list-item span {
          color: #ffffff;
          text-decoration: none;
          line-height: 1.5;
        }

        .contact-list-item a:hover,
        .contact-list-item a:focus-visible {
          color: #7aeeee;
        }

        .contact-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }

        .contact-social-link {
          width: 2.75rem;
          height: 2.75rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #ffffff;
          text-decoration: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform 180ms cubic-bezier(0.16,1,0.3,1), background 180ms cubic-bezier(0.16,1,0.3,1), border-color 180ms cubic-bezier(0.16,1,0.3,1);
        }

        .contact-social-link:hover,
        .contact-social-link:focus-visible {
          transform: translateY(-2px);
          background: rgba(51,184,184,0.12);
          border-color: rgba(51,184,184,0.24);
          color: #7aeeee;
        }

        .contact-map-card {
          overflow: hidden;
        }

        .contact-map-card-head {
          padding: 1.25rem 1.25rem 1rem;
        }

        .contact-map-frame {
          position: relative;
          width: 100%;
          min-height: 320px;
          aspect-ratio: 16 / 11;
          border: 0;
          display: block;
          filter: saturate(0.9) contrast(1.04);
        }

        .contact-map-fallback {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.9rem;
          color: #7aeeee;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .contact-form-card {
          padding: clamp(1.25rem, 2vw, 1.75rem);
          display: grid;
          gap: 1.1rem;
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .contact-field {
          display: grid;
          gap: 0.45rem;
        }

        .contact-field--full {
          grid-column: 1 / -1;
        }

        .contact-field label {
          font-size: 0.76rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.54);
          font-weight: 700;
        }

        .contact-field input,
        .contact-field textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #ffffff;
          border-radius: 0.875rem;
          padding: 0.95rem 1rem;
          min-height: 3.1rem;
          outline: none;
          resize: vertical;
          transition: border-color 180ms cubic-bezier(0.16,1,0.3,1), box-shadow 180ms cubic-bezier(0.16,1,0.3,1), background 180ms cubic-bezier(0.16,1,0.3,1);
        }

        .contact-field textarea {
          min-height: 8rem;
        }

        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: rgba(255,255,255,0.32);
        }

        .contact-field input:focus-visible,
        .contact-field textarea:focus-visible {
          border-color: rgba(51,184,184,0.45);
          box-shadow: 0 0 0 3px rgba(51,184,184,0.12);
          background: rgba(255,255,255,0.06);
        }

        .contact-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          align-items: center;
          justify-content: space-between;
        }

        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-width: 14rem;
          padding: 0.95rem 1.45rem;
          border-radius: 999px;
          border: 0;
          background: #33B8B8;
          color: #ffffff;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 6px 22px rgba(51,184,184,0.32);
          transition: transform 180ms cubic-bezier(0.16,1,0.3,1), background 180ms cubic-bezier(0.16,1,0.3,1), box-shadow 180ms cubic-bezier(0.16,1,0.3,1);
        }

        .contact-submit:hover,
        .contact-submit:focus-visible {
          background: #0c6161;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(51,184,184,0.38);
        }

        .contact-whatsapp-float {
          position: fixed;
          right: clamp(1rem, 2vw, 1.5rem);
          bottom: clamp(1rem, 2vw, 1.5rem);
          z-index: 70;
          width: 3.6rem;
          height: 3.6rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #33B8B8;
          color: #ffffff;
          text-decoration: none;
          box-shadow: 0 12px 30px rgba(51,184,184,0.35);
          transition: transform 180ms cubic-bezier(0.16,1,0.3,1), background 180ms cubic-bezier(0.16,1,0.3,1), box-shadow 180ms cubic-bezier(0.16,1,0.3,1);
        }

        .contact-whatsapp-float:hover,
        .contact-whatsapp-float:focus-visible {
          transform: translateY(-3px) scale(1.02);
          background: #0c6161;
          box-shadow: 0 16px 36px rgba(51,184,184,0.45);
        }

        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
          }

          .contact-actions {
            align-items: stretch;
          }

          .contact-submit {
            width: 100%;
            min-width: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-social-link,
          .contact-submit,
          .contact-whatsapp-float {
            transition: none !important;
          }
        }
      `}</style>

      <section id={sectionId} className="contact-section" ref={sectionRef} aria-labelledby="contact-title">
        <div className="contact-inner">
          <header className="contact-header">
            <span className="contact-eyebrow">Fale com o CQP</span>
            <h2 id="contact-title" className="contact-title">
              Tire suas dúvidas e comece a estudar com a gente <strong>ainda hoje</strong>
            </h2>
            <p className="contact-description">
              Atendimento rápido por WhatsApp, suporte para escolher o curso ideal e informações sobre modalidades,
              mensalidades e matrículas. Se preferir, use o formulário abaixo e já envie sua mensagem pronta para nossa equipe.
            </p>
          </header>

          <div className="contact-grid">
            <div className="contact-info-stack" ref={infoRef}>
              <article className="contact-card" aria-labelledby="contact-info-title">
                <h3 id="contact-info-title">Informações de contato</h3>

                <div className="contact-list">
                  <div className="contact-list-item">
                    <ContactIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </ContactIcon>
                    <div>
                      <span className="contact-list-item-label">WhatsApp</span>
                      <a href={floatingWhatsappHref} target="_blank" rel="noopener noreferrer">{whatsappDisplay}</a>
                    </div>
                  </div>

                  <div className="contact-list-item">
                    <ContactIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                    </ContactIcon>
                    <div>
                      <span className="contact-list-item-label">E-mail</span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                  </div>

                  <div className="contact-list-item">
                    <ContactIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-4.35-6-11a6 6 0 1 1 12 0c0 6.65-6 11-6 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                    </ContactIcon>
                    <div>
                      <span className="contact-list-item-label">Endereço</span>
                      <span>{address}<br />{cityState}</span>
                    </div>
                  </div>
                </div>

                <div className="contact-socials" aria-label="Redes sociais">
                  <SocialLink href={instagramUrl} label="Instagram do CQP">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37a4 4 0 1 1-7.91 1.2 4 4 0 0 1 7.91-1.2Z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </SocialLink>
                  <SocialLink href={facebookUrl} label="Facebook do CQP">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15 8h3V4h-3c-3 0-5 2-5 5v3H7v4h3v8h4v-8h3l1-4h-4V9c0-.8.2-1 1-1z"/></svg>
                  </SocialLink>
                  <SocialLink href={youtubeUrl} label="YouTube do CQP">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.8 15.5v-7L16 12l-6.2 3.5Z"/></svg>
                  </SocialLink>
                </div>

              </article>

              <article className="contact-map-card" ref={mapRef} aria-labelledby="contact-map-title">
                <div className="contact-map-card-head">
                  <h3 id="contact-map-title">Onde estamos</h3>
                  <a
                    className="contact-map-fallback"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${cityState}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v7h-7"/><path d="M3 10 14 21"/></svg>
                    Abrir no Google Maps
                  </a>
                </div>
                <iframe
                  className="contact-map-frame"
                  title="Mapa do CQP"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </article>
            </div>

            <article className="contact-form-card" ref={formRef} aria-labelledby="contact-form-title">
              <div>
                <h3 id="contact-form-title">Envie sua mensagem</h3>
                <p>Preencha os campos e abra a conversa no WhatsApp já com a mensagem pronta para atendimento.</p>
              </div>

              <div className="contact-form-grid">
                <div className="contact-field">
                  <label htmlFor="contact-name">Nome</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-phone">Telefone</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="(22) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field contact-field--full">
                  <label htmlFor="contact-email">E-mail</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field contact-field--full">
                  <label htmlFor="contact-message">Mensagem</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Conte qual curso você procura, sua modalidade preferida e qualquer dúvida sobre matrícula."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-actions">

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-submit"
                  aria-label="Enviar mensagem pelo WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Falar no WhatsApp
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <a
        href={floatingWhatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-whatsapp-float"
        aria-label="Abrir conversa no WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}
