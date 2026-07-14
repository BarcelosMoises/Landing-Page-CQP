import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  Search,
  GraduationCap,
  Scale,
  Heart,
  Briefcase,
  Cog,
  Brain,
  Leaf,
  Monitor,
  Shield,
  BookOpen,
  ChevronRight,
  X,
} from 'lucide-react';
import { DADOS_POS_GRADUACAO } from './dadosPosGraduacao';

// =============================================================================
// Types
// =============================================================================

type CategoriaSlug =
  | 'educacao'
  | 'direito'
  | 'saude'
  | 'gestao'
  | 'engenharia'
  | 'psicologia'
  | 'meio-ambiente'
  | 'tecnologia'
  | 'seguranca'
  | 'outros';

type Modalidade = 'EAD' | 'SEMIPRESENCIAL';

interface CursoPosGraduacao {
  id: string;
  titulo: string;
  categoria: CategoriaSlug;
  modalidade: Modalidade;
}

interface CategoriaConfig {
  slug: CategoriaSlug;
  label: string;
  icone: React.ComponentType<{ size?: number | string; strokeWidth?: number | string }>;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  keywords: string[];
}

// =============================================================================
// Constants
// =============================================================================

const WHATSAPP_NUMBER = '5522998684334';
const PAGE_SIZE = 12;
const DEBOUNCE_MS = 250;

// =============================================================================
// Category Configuration
// =============================================================================

const CONFIG_CATEGORIAS: Record<CategoriaSlug, CategoriaConfig> = {
  educacao: {
    slug: 'educacao',
    label: 'Educação',
    icone: GraduationCap,
    gradient: 'linear-gradient(135deg, #E8F0FE 0%, #D4E4FC 50%, #C5D9F8 100%)',
    badgeBg: '#E8F0FE',
    badgeText: '#1A4A7A',
    keywords: [
      'educação', 'educacional', 'ensino', 'docência', 'docente', 'pedagogia',
      'alfabetização', 'letramento', 'escolar', 'infantil', 'aprendizagem',
      'tutoria', 'ead', 'metodologia', 'didática', 'libras', 'braille',
      'coordenação', 'supervisão', 'orientação', 'inspeção', 'andragogia',
      'professor', 'aee', 'atendimento educacional', 'psicopedagogia',
      'psicomotricidade', 'ludopedagogia', 'neuropsicopedagogia',
      'gestão educacional', 'gestão escolar', 'gestão educacional',
      'história da educação', 'filosofia', 'sociologia', 'educação física',
      'matemática', 'geografia', 'ciências', 'biologia', 'química', 'física',
      'língua', 'linguística', 'literatura', 'letras', 'redação', 'oratória',
      'arte-educação', 'arte e cultura', 'música', 'religioso',
      'informática na educação', 'tecnologias educacionais',
      'gamificação', 'inovação pedagógica', 'educação 5.0',
      'mundo digital', 'educação a distância', 'mediação',
      'educação inclusiva', 'educação especial', 'diversidade',
      'educação ambiental', 'educação financeira', 'educação socioemocional',
      'educação em tempo integral', 'educação de jovens e adultos',
      'serviço social na educação', 'pedagogia empresarial',
      'educação corporativa', 'formação', 'profissão docente',
      'produção cultural', 'arte', 'cultura', 'história',
      'literatura infantojuvenil', 'contação de história',
      'arte de contar', 'arteterapia', 'psicologia da educação',
      'psicologia educacional', 'neurociência e aprendizagem',
      'tdah', 'transtornos globais', 'tea', 'autismo',
      'especialização em metodologia', 'especialização em educ',
      'educação matemática', 'educação musical',
      'educação física escolar', 'educação física adaptada',
      'educação infantil', 'educação básica',
      'supervisão e orientação', 'inspeção escolar',
      'gestão, supervisão', 'coordenação pedagógica',
      'administração e supervisão escolar',
      'educação em unidades de saúde',
      'educação e movimentos sociais',
      'educação em foco',
      'educação para a diversidade',
      'educação: geografia humana',
      'ciências sociais e ensino',
      'ciências naturais e sustentabilidade',
      'ciências e meio ambiente',
      'estatística aplicada',
      'matemática financeira e estatística',
      'matemática e cultura africana',
      'leitura e produção textual',
      'língua e literatura brasileira',
      'linguística e o estudo',
      'literacia e comunicação',
      'comunicação e oratória',
      'especialização em comunicação',
    ],
  },
  direito: {
    slug: 'direito',
    label: 'Direito',
    icone: Scale,
    gradient: 'linear-gradient(135deg, #FEF3E2 0%, #FDE6C8 50%, #FCD9AE 100%)',
    badgeBg: '#FEF3E2',
    badgeText: '#7A4A1A',
    keywords: [
      'direito', 'jurídico', 'processual', 'penal', 'civil', 'tributário',
      'constitucional', 'eleitoral', 'previdenciário', 'arbitragem',
      'mediação de conflitos', 'criminologia', 'perícia criminal',
      'direitos humanos', 'imobiliário', 'empresarial', 'administrativo',
      'trabalho', 'trânsito', 'família', 'militar', 'público',
      'compliance', 'lgpd', 'proteção de dados',
    ],
  },
  saude: {
    slug: 'saude',
    label: 'Saúde',
    icone: Heart,
    gradient: 'linear-gradient(135deg, #FDE8EC 0%, #FCD5DD 50%, #FAC2CD 100%)',
    badgeBg: '#FDE8EC',
    badgeText: '#7A1A3A',
    keywords: [
      'enfermagem', 'saúde', 'farmácia', 'nutrição', 'biomedicina',
      'hospitalar', 'clínica', 'estética', 'emergência', 'oncologia',
      'pediátrica', 'odontológica', 'cuidados paliativos',
      'instrumentação cirúrgica', 'gerontologia', 'idoso',
      'microbiologia', 'cosmetologia', 'estética e cosmetologia',
      'biomedicina estética', 'farmácia estética', 'farmácia clínica',
      'saúde estética', 'prescrição estética',
      'saúde pública', 'saúde da família', 'saúde ocupacional',
      'gestão em qualidade em serviço de saúde',
      'gestão de clínicas', 'gestão de consultórios',
      'auditoria em saúde', 'administração hospitalar',
      'gestão hospitalar', 'gestão da saúde física',
      'nutrição esportiva', 'enfermagem do trabalho',
      'enfermagem em urgência', 'emergências pediátricas',
      'enfermagem em oncologia', 'atendimento na unidade básica',
      'diagnóstico', 'avaliação psicológica', 'psicodiagnóstico',
      'psicologia clínica', 'psicologia hospitalar',
      'neuropsicologia', 'terapia cognitivo-comportamental',
      'terapia familiar', 'terapia da constelação',
      'psicologia organizacional', 'avaliação psicológica',
      'cuidados paliativos',
    ],
  },
  gestao: {
    slug: 'gestao',
    label: 'Gestão & Negócios',
    icone: Briefcase,
    gradient: 'linear-gradient(135deg, #E0F5F5 0%, #CCEEEE 50%, #B8E6E6 100%)',
    badgeBg: '#E0F5F5',
    badgeText: '#0C6161',
    keywords: [
      'gestão', 'mba', 'administração', 'compliance', 'marketing',
      'logística', 'recursos humanos', 'finanças', 'controladoria',
      'auditoria', 'liderança', 'coaching', 'startups', 'e-commerce',
      'vendas', 'negócios', 'turismo', 'eventos', 'agronegócios',
      'cooperativas', 'comércio exterior', 'supply chain',
      'departamento pessoal', 'gestão de pessoas', 'gestão empresarial',
      'gestão comercial', 'gestão da produção', 'gestão de projetos',
      'gestão de custos', 'gestão fiscal', 'gestão tributária',
      'gestão pública', 'gestão de seguros', 'gestão de serviços',
      'gestão estratégica', 'gestão de processos', 'planejamento',
      'controladoria financeira', 'contabilidade gerencial',
      'perícia contábil', 'perícia econômica', 'auditoria contábil',
      'gestão bancária', 'gestão de investimento',
      'gestão de marketing digital', 'marketing estratégico',
      'marketing de varejo', 'marketing político',
      'comunicação eleitoral', 'assessoria de comunicação',
      'jornalismo digital', 'relações internacionais',
      'gestão de negócios imobiliários', 'gestão de negócios inovadores',
      'gestão de negócios internacionais', 'gestão do agronegócio',
      'gestão de turismo', 'gestão de eventos',
      'gestão de drogaria', 'gestão de clínicas e consultórios',
      'gestão de clínicas odontológicas', 'gestão de clínicas de psicologia',
      'gestão de clínicas e consultórios veterinários',
      'gestão em logística', 'gestão de obras',
      'gestão de processos de produção', 'gestão da qualidade',
      'gestão da tecnologia de informação',
      'planejamento e gestão de trânsito',
      'gestão e planejamento de projetos sociais',
      'gestão, licenciamento e auditoria ambiental',
      'gestão ambiental sustentável',
      'gestão de segurança pública', 'segurança pública',
      'administração pública', 'gestão em saúde pública',
      'gestão de recursos humanos', 'gestão em recursos humanos',
      'liderança e desenvolvimento de equipes',
      'gestão estratégica de pessoas',
      'gestão do desenvolvimento do colaborador',
      'gestão do retorno financeiro',
      'planejamento para abertura de negócio',
      'inteligência comercial',
      'esg', 'environmental, social',
      'gestão estratégica em esg',
      'mba em esg',
      'gestão aplicada à engenharia',
      'mba em gestão ambiental',
      'mba em gestão de',
      'mba em administração',
      'mba em auditoria',
      'mba em coaching',
      'mba em comunicação',
      'mba em contabilidade',
      'mba em controladoria',
      'mba em e-commerce',
      'mba em educação financeira',
      'mba em gestão',
      'mba em inteligência',
      'mba em jornalismo',
      'mba em logística',
      'mba em marketing',
      'mba em mediação',
      'mba em planejamento',
      'mba em prescrição',
      'mba em relações',
      'mba em segurança',
      'mba em startups',
      'pós-graduação em gestão',
      'pós-graduação em liderança',
      'pós-graduação em serviço social',
      'serviço social e convivência',
      'gestão de conflitos',
      'mediação e gestão de conflitos',
      'arbitragem, conciliação e mediação',
      'comércio exterior',
      'supply chain',
    ],
  },
  engenharia: {
    slug: 'engenharia',
    label: 'Engenharia',
    icone: Cog,
    gradient: 'linear-gradient(135deg, #E8EAF6 0%, #D1D5EE 50%, #BCC1E6 100%)',
    badgeBg: '#E8EAF6',
    badgeText: '#2A2A7A',
    keywords: [
      'engenharia', 'produção', 'manutenção', 'suprimentos',
      'energia', 'solar', 'saneamento', 'qualidade',
      'instalação de sistemas', 'segurança do trabalho',
      'engenharia sanitária', 'engenharia ambiental',
      'engenharia da qualidade', 'engenharia de segurança',
      'engenharia de manutenção', 'engenharia de suprimentos',
      'engenharia de produção',
    ],
  },
  psicologia: {
    slug: 'psicologia',
    label: 'Psicologia',
    icone: Brain,
    gradient: 'linear-gradient(135deg, #F3E8F8 0%, #E8D5F2 50%, #DCC2EC 100%)',
    badgeBg: '#F3E8F8',
    badgeText: '#5A1A7A',
    keywords: [
      'psicologia', 'neurociência', 'neuropsicologia', 'neuropsicopedagogia',
      'psicomotricidade', 'psicopedagogia', 'tdah', 'tea', 'autismo',
      'comportamento', 'terapia cognitivo', 'terapia familiar',
      'terapia da constelação', 'psicanálise', 'aba',
      'análise do comportamento', 'psicologia clínica',
      'psicologia hospitalar', 'psicologia organizacional',
      'psicologia da aprendizagem', 'psicologia educacional',
      'neuropsicologia clínica', 'neuropsicopedagogia clínica',
      'psicologia clínica e institucional', 'psicodiagnóstico',
      'avaliação psicológica', 'diagnóstico e avaliação',
      'comportamento humano e neurociência',
      'transtorno do espectro autista', 'transtornos globais',
      'transtorno de déficit', 'psicologia dos contos',
      'psicomotricidade e letramento', 'psicomotricidade na educação',
      'psicopedagogia clínica', 'psicopedagogia educação especial',
      'psicopedagogia - pós',
    ],
  },
  'meio-ambiente': {
    slug: 'meio-ambiente',
    label: 'Meio Ambiente',
    icone: Leaf,
    gradient: 'linear-gradient(135deg, #E8F5E9 0%, #D0EBD2 50%, #B9E0BC 100%)',
    badgeBg: '#E8F5E9',
    badgeText: '#1A5A2A',
    keywords: [
      'ambiental', 'sustentabilidade', 'esg', 'meio ambiente',
      'ecologia', 'saneamento', 'energias renováveis',
      'gestão ambiental', 'educação ambiental',
      'sustentabilidade, responsabilidade social',
      'engenharia ambiental e energias',
      'engenharia ambiental e saneamento',
      'gestão ambiental sustentável',
      'gestão, licenciamento e auditoria ambiental',
      'ciências e meio ambiente',
    ],
  },
  tecnologia: {
    slug: 'tecnologia',
    label: 'Tecnologia',
    icone: Monitor,
    gradient: 'linear-gradient(135deg, #E0F2F7 0%, #C8E6F0 50%, #B0DAE8 100%)',
    badgeBg: '#E0F2F7',
    badgeText: '#1A4A6A',
    keywords: [
      'tecnologia', 'informática', 'inteligência artificial',
      'digital', 'gamificação', 'inovação', 'ti',
      'tecnologias educacionais', 'mundo digital',
      'inovação pedagógica com tecnologias',
      'tecnologias educacionais na prática',
      'tecnologias educacionais - pós',
      'inteligência artificial',
      'gestão da tecnologia de informação',
      'pós-graduação em gestão da tecnologia',
      'mba em gestão de negócios inovadores',
      'mba em startups e inovação',
      'mba em e-commerce',
      'mba em inteligência comercial',
      'mba em marketing estratégico digital',
      'mba em gestão de marketing digital',
      'mba em jornalismo digital',
      'marketing digital',
      'gestão de marketing digital',
      'marketing estratégico digital',
      'marketing de varejo, gestão, estratégias e negócios',
      'mba em marketing de varejo',
      'mba em comunicação eleitoral e marketing político',
      'mba em assessoria de comunicação',
      'mba em gestão de negócios internacionais',
      'mba em relações internacionais',
      'mba em logística e supply chain',
      'mba em gestão de projetos',
      'mba em gestão de processos',
      'mba em gestão da produção',
      'mba em engenharia de produção',
      'mba em controladoria e finanças',
      'mba em controladoria financeira',
      'mba em contabilidade gerencial',
      'mba em auditoria',
      'mba em auditoria contábil',
      'mba em auditoria e perícia contábil',
      'mba em gestão fiscal e tributária',
      'mba em gestão de custos e finanças',
      'mba em administração financeira e orçamentária',
      'mba em gestão de seguros e previdência privada',
      'mba em gestão de investimento',
      'mba em gestão bancária e negócios',
      'mba em gestão comercial',
      'mba em gestão de vendas',
      'mba em gestão de serviços',
      'mba em gestão de turismo e hospitalidade',
      'mba em gestão de eventos',
      'mba em gestão do agronegócio',
      'mba em gestão de negócios imobiliários',
      'mba em gestão estratégica de cooperativas',
      'mba em gestão estratégica em compras',
      'mba em gestão estratégica em esg',
      'mba em gestão de obras, qualidade e desempenho',
      'mba em gestão aplicada à engenharia',
      'mba em gestão ambiental',
      'mba em gestão de drogaria e farmácia',
      'mba em gestão de clínicas e consultórios veterinários',
      'mba em gestão de clínicas de psicologia',
      'mba em gestão de clínicas e consultórios',
      'mba em gestão de clínicas odontológicas',
      'mba em gestão hospitalar',
      'mba em administração hospitalar',
      'mba em auditoria em saúde',
      'mba em gestão da saúde física e mental',
      'mba em gestão de pessoas e liderança',
      'mba em gestão empresarial',
      'mba em gestão do desenvolvimento do colaborador',
      'mba em gestão do retorno financeiro de talentos',
      'mba em gestão de departamento pessoal',
      'mba em compliance e gestão de riscos',
      'mba em segurança pública',
      'mba em gestão pública',
      'mba em planejamento para abertura de negócio',
      'mba em prescrição estética',
      'mba em educação financeira',
      'mba em arbitragem, conciliação e mediação',
      'mba em mediação e gestão de conflitos',
      'mba em gestão de projetos de aprendizagem',
      'pós-graduação em gestão da qualidade',
      'pós-graduação em gestão de recursos humanos',
      'pós-graduação em gestão de riscos e ciber segurança',
      'pós-graduação em gestão estratégica de pessoas',
      'pós-graduação em liderança e desenvolvimento de equipes',
      'pós-graduação em segurança pública',
      'pós-graduação em serviço social e convivência familiar',
      'pós-graduação em gerontologia e gestão da assistência ao idoso',
      'pós-graduação em direitos humanos',
      'pós-graduação em direito administrativo',
      'pós-graduação em direito constitucional',
      'pós-graduação em direito tributário',
      'especialização em engenharia da qualidade',
      'especialização em engenharia sanitária e ambiental',
      'especialização em instrumentação cirúrgica',
      'especialização em metodologia do ensino de história',
      'especialização em metodologia do ensino de língua portuguesa',
      'especialização em comunicação e oratória',
      'especialização em educ. especial inclusiva e transtorno do espectro autista (tea)',
      'especialização em análise do comportamento aplicada ao autismo (aba)',
      'compliance',
      'compliance e gestão de riscos',
      'gestão de riscos e cibersegurança',
      'pós-graduação em gestão de riscos e ciber segurança',
    ],
  },
  seguranca: {
    slug: 'seguranca',
    label: 'Segurança',
    icone: Shield,
    gradient: 'linear-gradient(135deg, #FBE9E7 0%, #F8D7D3 50%, #F4C5BF 100%)',
    badgeBg: '#FBE9E7',
    badgeText: '#7A2A1A',
    keywords: [
      'segurança pública', 'segurança do trabalho', 'perícia criminal',
      'criminologia', 'segurança e cidadania', 'defesa civil',
      'gestão de segurança', 'segurança patrimonial',
      'engenharia de segurança do trabalho',
      'pós-graduação em segurança pública',
      'mba em segurança pública',
      'direito humanos e perícia criminal',
      'perícia e auditoria',
      'perícia econômica financeira',
      'perícia contábil',
      'auditoria e perícia contábil',
      'mba em auditoria e perícia',
      'mba em perícia',
    ],
  },
  outros: {
    slug: 'outros',
    label: 'Outros',
    icone: BookOpen,
    gradient: 'linear-gradient(135deg, #F0F0F0 0%, #E5E5E5 50%, #DADADA 100%)',
    badgeBg: '#F0F0F0',
    badgeText: '#444444',
    keywords: [],
  },
};

// Ordered tabs
const TABS: CategoriaConfig[] = [
  CONFIG_CATEGORIAS.educacao,
  CONFIG_CATEGORIAS.direito,
  CONFIG_CATEGORIAS.saude,
  CONFIG_CATEGORIAS.gestao,
  CONFIG_CATEGORIAS.engenharia,
  CONFIG_CATEGORIAS.psicologia,
  CONFIG_CATEGORIAS['meio-ambiente'],
  CONFIG_CATEGORIAS.tecnologia,
  CONFIG_CATEGORIAS.seguranca,
  CONFIG_CATEGORIAS.outros,
];

// =============================================================================
// Helpers
// =============================================================================

function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Categoriza um curso de pós-graduação com base no título.
 * Função pura — sem efeitos colaterais.
 */
function categorizarCurso(titulo: string): CategoriaSlug {
  const norm = normalize(titulo);

  // Check each category's keywords (skip "outros")
  const categorias = TABS.filter((c) => c.slug !== 'outros');

  let bestMatch: CategoriaSlug = 'outros';
  let bestScore = 0;

  for (const cat of categorias) {
    let score = 0;
    for (const kw of cat.keywords) {
      const kwNorm = normalize(kw);
      if (norm.includes(kwNorm)) {
        // Longer keyword matches are stronger
        score += kwNorm.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = cat.slug;
    }
  }

  return bestMatch;
}

/**
 * Determina a modalidade com base no título do curso.
 */
function getModalidade(titulo: string): Modalidade {
  const semipresencialKeywords = [
    'enfermagem', 'farmácia', 'biomedicina', 'instrumentação',
    'cirúrgica', 'emergência', 'odontológica', 'solar',
    'nutrição esportiva', 'estética e cosmetologia',
    'biomedicina estética', 'farmácia estética',
    'saúde estética com injetáveis', 'prescrição estética',
    'engenharia de segurança', 'engenharia de manutenção',
    'engenharia de suprimentos', 'instalação de sistemas',
    'microbiologia',
  ];
  const norm = normalize(titulo);
  return semipresencialKeywords.some((k) => norm.includes(normalize(k)))
    ? 'SEMIPRESENCIAL'
    : 'EAD';
}

// =============================================================================
// Build course objects from external data
// =============================================================================

function buildCursos(): CursoPosGraduacao[] {
  return DADOS_POS_GRADUACAO.map((titulo, i) => ({
    id: `pos-${i}`,
    titulo: titulo.trim(),
    categoria: categorizarCurso(titulo),
    modalidade: getModalidade(titulo),
  }));
}

const TODOS_OS_CURSOS_POS: CursoPosGraduacao[] = buildCursos();

// =============================================================================
// Sub-components
// =============================================================================

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
      {/* Subtle decorative circles */}
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
      {/* Icon circle */}
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

function CourseCard({ curso, config }: { curso: CursoPosGraduacao; config: CategoriaConfig }) {
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

// =============================================================================
// Main Component
// =============================================================================

export default function PosGraduacaoSection() {
  const [activeTab, setActiveTab] = useState<CategoriaSlug>('educacao');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset pagination when tab or search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTab, debouncedQuery]);

  // Filtered & sorted courses
  const filteredCourses = useMemo<CursoPosGraduacao[]>(() => {
    let list: CursoPosGraduacao[];

    if (debouncedQuery.trim()) {
      const q = normalize(debouncedQuery);
      list = TODOS_OS_CURSOS_POS.filter((c) =>
        normalize(c.titulo).includes(q)
      );
    } else {
      list = TODOS_OS_CURSOS_POS.filter((c) => c.categoria === activeTab);
    }

    // Sort alphabetically
    return list.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
  }, [activeTab, debouncedQuery]);

  const visibleCourses = useMemo(
    () => filteredCourses.slice(0, visibleCount),
    [filteredCourses, visibleCount]
  );

  const hasMore = visibleCount < filteredCourses.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  const handleTabChange = useCallback((slug: CategoriaSlug) => {
    setActiveTab(slug);
    setSearchQuery('');
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    inputRef.current?.focus();
  }, []);

  // Count per tab
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tab of TABS) {
      counts[tab.slug] = TODOS_OS_CURSOS_POS.filter(
        (c) => c.categoria === tab.slug
      ).length;
    }
    return counts;
  }, []);

  return (
    <section
      id="pos-graduacao"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
        {/* Section Header */}
        <header style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--cqp-teal-dark)',
              background: 'oklch(from var(--cqp-teal) l c h / 0.10)',
              padding: '0.3rem 0.9rem',
              borderRadius: '9999px',
              marginBottom: '0.75rem',
            }}
          >
            Pós-Graduação
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: 'var(--color-text)',
              margin: '0 0 0.5rem',
              lineHeight: 1.15,
            }}
          >
            Especialize-se com quem entende de futuro
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Mais de {TODOS_OS_CURSOS_POS.length} cursos de pós-graduação EAD e semipresenciais
            com certificação reconhecida pelo MEC.
          </p>
        </header>

        {/* Search */}
        <div
          style={{
            position: 'relative',
            maxWidth: '480px',
            margin: '0 auto clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          <Search
            size={18}
            strokeWidth={1.5}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-faint)',
              pointerEvents: 'none',
            }}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar curso de pós-graduação..."
            aria-label="Buscar curso de pós-graduação"
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '9999px',
              padding: '0.75rem 2.75rem 0.75rem 2.75rem',
              outline: 'none',
              transition: 'border-color 200ms var(--ease-out-expo), box-shadow 200ms var(--ease-out-expo)',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--cqp-teal)';
              e.currentTarget.style.boxShadow = '0 0 0 3px oklch(from var(--cqp-teal) l c h / 0.12)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              aria-label="Limpar busca"
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-faint)',
                transition: 'color 150ms var(--ease-out-expo)',
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Tabs */}
        {!debouncedQuery.trim() && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.4rem',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
            role="tablist"
            aria-label="Categorias de pós-graduação"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.slug;
              const Icon = tab.icone;
              const count = tabCounts[tab.slug] ?? 0;
              return (
                <button
                  key={tab.slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(tab.slug)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--cqp-teal-dark)' : 'var(--color-text-muted)',
                    background: isActive
                      ? 'oklch(from var(--cqp-teal) l c h / 0.10)'
                      : 'var(--color-surface)',
                    border: isActive
                      ? '1px solid oklch(from var(--cqp-teal) l c h / 0.30)'
                      : '1px solid var(--color-border)',
                    borderRadius: '9999px',
                    padding: '0.45rem 0.9rem',
                    cursor: 'pointer',
                    transition: 'all 200ms var(--ease-out-expo)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--cqp-teal-dark)' : 'var(--color-text-faint)',
                      background: isActive
                        ? 'rgba(12, 97, 97, 0.10)'
                        : 'rgba(0, 18, 32, 0.05)',
                      borderRadius: '9999px',
                      padding: '0.1rem 0.45rem',
                      minWidth: '1.2rem',
                      textAlign: 'center',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results summary */}
        {debouncedQuery.trim() && (
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            {filteredCourses.length === 0
              ? `Nenhum curso encontrado para "${debouncedQuery}".`
              : `${filteredCourses.length} curso${filteredCourses.length > 1 ? 's' : ''} encontrado${filteredCourses.length > 1 ? 's' : ''} para "${debouncedQuery}".`}
          </p>
        )}

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: 'clamp(2rem, 4vw, 4rem) 1rem',
            }}
          >
            <BookOpen
              size={40}
              strokeWidth={1}
              style={{ color: 'var(--color-text-faint)', marginBottom: '1rem' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                margin: '0 0 0.5rem',
              }}
            >
              Nenhum curso encontrado para "{debouncedQuery}".
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-faint)',
                margin: 0,
              }}
            >
              Tente outro termo ou fale conosco pelo WhatsApp.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Olá! Gostaria de saber mais sobre os cursos de pós-graduação disponíveis.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1.25rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: '#ffffff',
                background: '#25D366',
                padding: '0.7rem 1.5rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                transition: 'opacity 200ms var(--ease-out-expo)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Fale pelo WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
              }}
            >
              {visibleCourses.map((curso) => (
                <CourseCard
                  key={curso.id}
                  curso={curso}
                  config={CONFIG_CATEGORIAS[curso.categoria]}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
                <button
                  onClick={handleLoadMore}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--cqp-teal-dark)',
                    background: 'var(--color-surface)',
                    border: '1px solid oklch(from var(--cqp-teal) l c h / 0.25)',
                    borderRadius: '9999px',
                    padding: '0.75rem 2rem',
                    cursor: 'pointer',
                    transition: 'all 200ms var(--ease-out-expo)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'oklch(from var(--cqp-teal) l c h / 0.06)';
                    e.currentTarget.style.borderColor = 'var(--cqp-teal)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface)';
                    e.currentTarget.style.borderColor = 'oklch(from var(--cqp-teal) l c h / 0.25)';
                  }}
                >
                  Ver mais cursos ({filteredCourses.length - visibleCount} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}