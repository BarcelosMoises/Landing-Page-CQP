// ---------------------------------------------------------------------------
// data/instrutores.ts
// Fonte de verdade para os instrutores da InstructorsSection.
// TODO: substituir os placeholders pelos dados reais fornecidos pelo cliente.
// ---------------------------------------------------------------------------

export type AreaId =
  | 'tecnico'
  | 'profissionalizante'
  | 'nrs'
  | 'graduacao'
  | 'idiomas'
  | 'kids';

export interface Instrutor {
  id: string;
  nome: string;
  especialidade: string;
  area: AreaId;
  bio: string;
  /** Caminho relativo à raiz do projeto, ex.: './images/instrutores/joao.webp' */
  foto?: string;
  /** LinkedIn, Instagram, etc. — opcional */
  linkedin?: string;
}

// ---------------------------------------------------------------------------
// Placeholders — aguardando dados reais do cliente
// ---------------------------------------------------------------------------
export const INSTRUTORES: Instrutor[] = [
  {
    id: 'instrutor-1',
    nome: 'Ana Paula Ferreira',
    especialidade: 'Segurança do Trabalho',
    area: 'nrs',
    bio: 'Especialista em normas regulamentadoras com mais de 12 anos de atuação na indústria de óleo e gás em Macaé. Coordena os treinamentos de NR-10, NR-35 e NR-33 no CQP.',
    foto: undefined, // TODO: './images/instrutores/ana-paula.webp'
  },
  {
    id: 'instrutor-2',
    nome: 'Carlos Eduardo Lima',
    especialidade: 'Técnico em Enfermagem',
    area: 'tecnico',
    bio: 'Enfermeiro com pós-graduação em Urgência e Emergência. Atua como docente do curso Técnico em Enfermagem há 8 anos, formando profissionais para o mercado de saúde fluminense.',
    foto: undefined,
  },
  {
    id: 'instrutor-3',
    nome: 'Renata Souza',
    especialidade: 'Idiomas — Inglês & Espanhol',
    area: 'idiomas',
    bio: 'Formada em Letras pela UENF com intercâmbio nos EUA. Desenvolve metodologia comunicativa adaptada para profissionais do setor de petróleo que precisam de inglês técnico.',
    foto: undefined,
  },
  {
    id: 'instrutor-4',
    nome: 'Marcos Andrade',
    especialidade: 'Informática & Tecnologia',
    area: 'profissionalizante',
    bio: 'Técnico em Redes e graduado em Sistemas de Informação. Ministra os cursos de Informática Básica, Excel Avançado e Montagem de Computadores com foco em empregabilidade.',
    foto: undefined,
  },
  {
    id: 'instrutor-5',
    nome: 'Juliana Costa',
    especialidade: 'Administração & Gestão',
    area: 'graduacao',
    bio: 'MBA em Gestão de Pessoas e Processos. Leciona nas graduações de Administração e Gestão Comercial, com experiência prática em RH e consultoria para empresas locais.',
    foto: undefined,
  },
  {
    id: 'instrutor-6',
    nome: 'Diego Martins',
    especialidade: 'Educação Infantil — Kids',
    area: 'kids',
    bio: 'Pedagogo e especialista em neuroeducação. Responsável pela linha CQP Kids, desenvolvendo programas de robótica educacional e lógica computacional para crianças a partir de 6 anos.',
    foto: undefined,
  },
];

// Mapeamento de cor por área (usado nos badges)
export const AREA_LABELS: Record<AreaId, string> = {
  tecnico:          'Técnico',
  profissionalizante: 'Profissionalizante',
  nrs:              'NRs & Treinamentos',
  graduacao:        'Graduação',
  idiomas:          'Idiomas',
  kids:             'Kids',
};
