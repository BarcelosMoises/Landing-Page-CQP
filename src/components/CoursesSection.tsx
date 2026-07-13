// ---------------------------------------------------------------------------
// Course Card — Clean 16:9 layout with smart image crop
// ---------------------------------------------------------------------------
function CourseCard({ curso, visible }: { curso: Curso; visible: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <a
      ref={cardRef}
      href={getCursoWhatsAppUrl(curso)}
      target="_blank"
      rel="noopener noreferrer"
      className="course-card"
      aria-label={`Saiba mais sobre o curso de ${curso.nome}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface)', // Usa o token de superfície correto
        border: '1px solid var(--color-divider)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'box-shadow 280ms var(--ease-out-expo), transform 280ms var(--ease-out-expo), border-color 280ms var(--ease-out-expo)',
        boxShadow: hovered ? 'var(--shadow-teal)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: hovered ? 'oklch(from var(--cqp-teal) l c h / 0.35)' : 'var(--color-divider)',
      }}
    >
      {/* Imagem em Proporção de Cinema (16:9) com Corte Inteligente */}
      <div
        className="course-card-img-wrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9', // Proporção padrão do Design System
          background: 'var(--color-surface-2)',
          overflow: 'hidden',
        }}
      >
        <img
          src={curso.imagem}
          alt={curso.nome}
          loading="lazy"
          decoding="async"
          className="course-card-img"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = 'none';
            const fallback = t.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Preenche e corta as rebarbas escuras dos panfletos
            objectPosition: 'center 25%', // Foca um pouco mais acima do centro para tentar preservar títulos de panfletos se existirem
            transition: 'transform 500ms var(--ease-out-expo)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Fallback caso a imagem quebre */}
        <div
          className="course-card-img-fallback"
          aria-hidden="true"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #e0f5f5 0%, #f0fafa 100%)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cqp-teal)" strokeWidth="1.25">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="m21 15-5-5L5 21"/>
          </svg>
        </div>
      </div>

      <div
        className="course-card-body"
        style={{
          padding: '1rem 1.125rem 0.75rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
        }}
      >
        <h3
          className="course-card-title"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {curso.nome}
        </h3>
        {curso.extra && (
          <p
            className="course-card-extra"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              margin: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {curso.extra}
          </p>
        )}
        <div
          className="course-card-badges"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3rem',
            marginTop: '0.15rem',
          }}
        >
          {curso.modalidades.map((m) => (
            <ModalidadeBadge key={m} m={m} />
          ))}
        </div>
      </div>

      <div
        className="course-card-link"
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
        <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 200ms var(--ease-out-expo)' }}>→</span>
      </div>
    </a>
  );
}