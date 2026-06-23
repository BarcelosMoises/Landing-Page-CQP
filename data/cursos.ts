// =============================================================================
// data/cursos.ts
// Fonte única de verdade para todos os cursos da CQP.
// Gerado a partir do index.html original (301 KB).
// =============================================================================

export type Modalidade = 'presencial' | 'online' | 'hibrido';

export interface Curso {
  id: string;
  nome: string;
  categoria: CategoriaSlug;
  imagem: string;          // caminho relativo a /public
  modalidades: Modalidade[];
  extra?: string;          // duração, certificação, carga horária
  whatsapp?: string;       // mensagem pré-preenchida para o link
}

export type CategoriaSlug =
  | 'tecnicos'
  | 'profissionalizantes'
  | 'treinamentos'
  | 'graduacoes'
  | 'idiomas'
  | 'kids';

export interface Categoria {
  slug: CategoriaSlug;
  label: string;
  descricao: string;
  icone: string; // nome do ícone Lucide
}

// ---------------------------------------------------------------------------
// Categorias
// ---------------------------------------------------------------------------
export const CATEGORIAS: Categoria[] = [
  {
    slug: 'tecnicos',
    label: 'Cursos Técnicos',
    descricao: 'Formação técnica profissional reconhecida pelo MEC',
    icone: 'Wrench',
  },
  {
    slug: 'profissionalizantes',
    label: 'Profissionalizantes',
    descricao: 'Qualificação rápida para o mercado de trabalho',
    icone: 'Briefcase',
  },
  {
    slug: 'treinamentos',
    label: 'Treinamentos e NRs',
    descricao: 'Normas Regulamentadoras e treinamentos de segurança',
    icone: 'ShieldCheck',
  },
  {
    slug: 'graduacoes',
    label: 'Graduações e Tecnólogos',
    descricao: 'Cursos superiores presenciais e EAD',
    icone: 'GraduationCap',
  },
  {
    slug: 'idiomas',
    label: 'Idiomas',
    descricao: 'Inglês, Espanhol e mais com metodologia moderna',
    icone: 'Languages',
  },
  {
    slug: 'kids',
    label: 'Kids',
    descricao: 'Cursos especiais para crianças e adolescentes',
    icone: 'Star',
  },
];

// ---------------------------------------------------------------------------
// Cursos Técnicos
// ---------------------------------------------------------------------------
export const CURSOS_TECNICOS: Curso[] = [
  { id: 'tec-adm', nome: 'Administração', categoria: 'tecnicos', imagem: '/images/adm.jpg', modalidades: ['presencial', 'online'] },
  { id: 'tec-contab', nome: 'Contabilidade', categoria: 'tecnicos', imagem: '/images/contabilidade.jpg', modalidades: ['presencial', 'online'] },
  { id: 'tec-rh', nome: 'Recursos Humanos', categoria: 'tecnicos', imagem: '/images/rh.jpg', modalidades: ['presencial', 'online'] },
  { id: 'tec-logistica', nome: 'Logística', categoria: 'tecnicos', imagem: '/images/logistica.jpg', modalidades: ['presencial', 'online'] },
  { id: 'tec-informatica', nome: 'Informática', categoria: 'tecnicos', imagem: '/images/informatica.jpg', modalidades: ['presencial', 'online'] },
  { id: 'tec-seguranca', nome: 'Segurança do Trabalho', categoria: 'tecnicos', imagem: '/images/seguranca.jpg', modalidades: ['presencial'] },
  { id: 'tec-enfermagem', nome: 'Enfermagem', categoria: 'tecnicos', imagem: '/images/enfermagem.jpg', modalidades: ['presencial'] },
  { id: 'tec-farmacia', nome: 'Farmácia', categoria: 'tecnicos', imagem: '/images/farmacia.jpg', modalidades: ['presencial'] },
  { id: 'tec-radiologia', nome: 'Radiologia', categoria: 'tecnicos', imagem: '/images/radiologia.jpg', modalidades: ['presencial'] },
  { id: 'tec-analises', nome: 'Análises Clínicas', categoria: 'tecnicos', imagem: '/images/analises.jpg', modalidades: ['presencial'] },
  { id: 'tec-quimica', nome: 'Química', categoria: 'tecnicos', imagem: '/images/quimica.jpg', modalidades: ['presencial'] },
  { id: 'tec-petroleo', nome: 'Petróleo e Gás', categoria: 'tecnicos', imagem: '/images/petroleo.jpg', modalidades: ['presencial'] },
  { id: 'tec-eletrotecnica', nome: 'Eletrotécnica', categoria: 'tecnicos', imagem: '/images/eletrotecnica.jpg', modalidades: ['presencial'] },
  { id: 'tec-mecanica', nome: 'Mecânica', categoria: 'tecnicos', imagem: '/images/mecanica.jpg', modalidades: ['presencial'] },
  { id: 'tec-edificacoes', nome: 'Edificações', categoria: 'tecnicos', imagem: '/images/edificacoes.jpg', modalidades: ['presencial'] },
  { id: 'tec-design', nome: 'Design Gráfico', categoria: 'tecnicos', imagem: '/images/design.jpg', modalidades: ['presencial', 'online'] },
  { id: 'tec-marketing', nome: 'Marketing', categoria: 'tecnicos', imagem: '/images/marketing.jpg', modalidades: ['presencial', 'online'] },
  { id: 'tec-turismo', nome: 'Guia de Turismo', categoria: 'tecnicos', imagem: '/images/turismo.jpg', modalidades: ['presencial'] },
];

// ---------------------------------------------------------------------------
// Cursos Profissionalizantes
// ---------------------------------------------------------------------------
export const CURSOS_PROFISSIONALIZANTES: Curso[] = [
  { id: 'pro-excel', nome: 'Excel Avançado', categoria: 'profissionalizantes', imagem: '/images/excel.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-word', nome: 'Word e PowerPoint', categoria: 'profissionalizantes', imagem: '/images/word.jpg', modalidades: ['presencial', 'online'], extra: '30h' },
  { id: 'pro-autocad', nome: 'AutoCAD', categoria: 'profissionalizantes', imagem: '/images/autocad.jpg', modalidades: ['presencial'], extra: '60h' },
  { id: 'pro-photoshop', nome: 'Photoshop', categoria: 'profissionalizantes', imagem: '/images/photoshop.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-corel', nome: 'CorelDRAW', categoria: 'profissionalizantes', imagem: '/images/corel.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-contab-basica', nome: 'Contabilidade Básica', categoria: 'profissionalizantes', imagem: '/images/contabilidade-basica.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-dp', nome: 'Departamento Pessoal', categoria: 'profissionalizantes', imagem: '/images/dp.jpg', modalidades: ['presencial', 'online'], extra: '60h' },
  { id: 'pro-fiscal', nome: 'Rotinas Fiscais', categoria: 'profissionalizantes', imagem: '/images/fiscal.jpg', modalidades: ['presencial', 'online'], extra: '60h' },
  { id: 'pro-bpo', nome: 'BPO Financeiro', categoria: 'profissionalizantes', imagem: '/images/bpo.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-vendas', nome: 'Técnicas de Vendas', categoria: 'profissionalizantes', imagem: '/images/vendas.jpg', modalidades: ['presencial', 'online'], extra: '30h' },
  { id: 'pro-atendimento', nome: 'Atendimento ao Cliente', categoria: 'profissionalizantes', imagem: '/images/atendimento.jpg', modalidades: ['presencial', 'online'], extra: '30h' },
  { id: 'pro-recepcao', nome: 'Recepcionista', categoria: 'profissionalizantes', imagem: '/images/recepcao.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-secretariado', nome: 'Secretariado', categoria: 'profissionalizantes', imagem: '/images/secretariado.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-cuidador', nome: 'Cuidador de Idosos', categoria: 'profissionalizantes', imagem: '/images/cuidador.jpg', modalidades: ['presencial'], extra: '40h' },
  { id: 'pro-auxiliar-adm', nome: 'Auxiliar Administrativo', categoria: 'profissionalizantes', imagem: '/images/aux-adm.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-almoxarife', nome: 'Almoxarife e Estoque', categoria: 'profissionalizantes', imagem: '/images/almoxarife.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-compras', nome: 'Compras e Suprimentos', categoria: 'profissionalizantes', imagem: '/images/compras.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-pcp', nome: 'PCP - Planejamento e Controle', categoria: 'profissionalizantes', imagem: '/images/pcp.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-qualidade', nome: 'Qualidade (ISO 9001)', categoria: 'profissionalizantes', imagem: '/images/qualidade.jpg', modalidades: ['presencial', 'online'], extra: '30h' },
  { id: 'pro-manut-ind', nome: 'Manutenção Industrial', categoria: 'profissionalizantes', imagem: '/images/manutencao.jpg', modalidades: ['presencial'], extra: '60h' },
  { id: 'pro-assist-cont', nome: 'Assistente Contábil', categoria: 'profissionalizantes', imagem: '/images/assist-cont.jpg', modalidades: ['presencial', 'online'], extra: '60h' },
  { id: 'pro-financeiro', nome: 'Auxiliar Financeiro', categoria: 'profissionalizantes', imagem: '/images/financeiro.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-lideranca', nome: 'Liderança e Gestão de Pessoas', categoria: 'profissionalizantes', imagem: '/images/lideranca.jpg', modalidades: ['presencial', 'online'], extra: '30h' },
  { id: 'pro-projeto', nome: 'Gestão de Projetos (PMI)', categoria: 'profissionalizantes', imagem: '/images/projetos.jpg', modalidades: ['presencial', 'online'], extra: '40h' },
  { id: 'pro-libras', nome: 'LIBRAS', categoria: 'profissionalizantes', imagem: '/images/libras.jpg', modalidades: ['presencial', 'online'], extra: '60h' },
];

// ---------------------------------------------------------------------------
// Treinamentos e NRs
// ---------------------------------------------------------------------------
export const CURSOS_TREINAMENTOS: Curso[] = [
  { id: 'nr-01', nome: 'NR-01 – Disposições Gerais', categoria: 'treinamentos', imagem: '/images/nr01.jpg', modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'nr-05', nome: 'NR-05 – CIPA', categoria: 'treinamentos', imagem: '/images/nr05.jpg', modalidades: ['presencial', 'online'], extra: '20h' },
  { id: 'nr-06', nome: 'NR-06 – EPI', categoria: 'treinamentos', imagem: '/images/nr06.jpg', modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'nr-07', nome: 'NR-07 – PCMSO', categoria: 'treinamentos', imagem: '/images/nr07.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-10', nome: 'NR-10 – Segurança em Eletricidade', categoria: 'treinamentos', imagem: '/images/nr10.jpg', modalidades: ['presencial'], extra: '40h' },
  { id: 'nr-11', nome: 'NR-11 – Operação de Empilhadeira', categoria: 'treinamentos', imagem: '/images/nr11.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-12', nome: 'NR-12 – Máquinas e Equipamentos', categoria: 'treinamentos', imagem: '/images/nr12.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-13', nome: 'NR-13 – Caldeiras e Vasos de Pressão', categoria: 'treinamentos', imagem: '/images/nr13.jpg', modalidades: ['presencial'], extra: '40h' },
  { id: 'nr-15', nome: 'NR-15 – Atividades Insalubres', categoria: 'treinamentos', imagem: '/images/nr15.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-16', nome: 'NR-16 – Atividades Perigosas', categoria: 'treinamentos', imagem: '/images/nr16.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-17', nome: 'NR-17 – Ergonomia', categoria: 'treinamentos', imagem: '/images/nr17.jpg', modalidades: ['presencial', 'online'], extra: '8h' },
  { id: 'nr-18', nome: 'NR-18 – Construção Civil', categoria: 'treinamentos', imagem: '/images/nr18.jpg', modalidades: ['presencial'], extra: '6h' },
  { id: 'nr-20', nome: 'NR-20 – Inflamáveis e Combustíveis', categoria: 'treinamentos', imagem: '/images/nr20.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-21', nome: 'NR-21 – Trabalho a Céu Aberto', categoria: 'treinamentos', imagem: '/images/nr21.jpg', modalidades: ['presencial'], extra: '4h' },
  { id: 'nr-23', nome: 'NR-23 – Combate a Incêndio', categoria: 'treinamentos', imagem: '/images/nr23.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-25', nome: 'NR-25 – Resíduos Industriais', categoria: 'treinamentos', imagem: '/images/nr25.jpg', modalidades: ['presencial'], extra: '4h' },
  { id: 'nr-26', nome: 'NR-26 – Sinalização de Segurança', categoria: 'treinamentos', imagem: '/images/nr26.jpg', modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'nr-33', nome: 'NR-33 – Espaço Confinado', categoria: 'treinamentos', imagem: '/images/nr33.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-35', nome: 'NR-35 – Trabalho em Altura', categoria: 'treinamentos', imagem: '/images/nr35.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-36', nome: 'NR-36 – Frigoríficos', categoria: 'treinamentos', imagem: '/images/nr36.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-37', nome: 'NR-37 – Plataformas de Petróleo', categoria: 'treinamentos', imagem: '/images/nr37.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-primeiros-socorros', nome: 'Primeiros Socorros', categoria: 'treinamentos', imagem: '/images/primeiros-socorros.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'tr-brigada', nome: 'Brigada de Incêndio', categoria: 'treinamentos', imagem: '/images/brigada.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-rcp', nome: 'RCP e DEA', categoria: 'treinamentos', imagem: '/images/rcp.jpg', modalidades: ['presencial'], extra: '4h' },
  { id: 'tr-dds', nome: 'DDS – Diálogo Diário de Segurança', categoria: 'treinamentos', imagem: '/images/dds.jpg', modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'tr-perigo-quimico', nome: 'Perigo Químico', categoria: 'treinamentos', imagem: '/images/quimico.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'tr-direcao-defensiva', nome: 'Direção Defensiva', categoria: 'treinamentos', imagem: '/images/direcao.jpg', modalidades: ['presencial', 'online'], extra: '8h' },
  { id: 'tr-integracao', nome: 'Integração de Segurança', categoria: 'treinamentos', imagem: '/images/integracao.jpg', modalidades: ['presencial'], extra: '4h' },
  { id: 'tr-iso-45001', nome: 'ISO 45001 – SST', categoria: 'treinamentos', imagem: '/images/iso45001.jpg', modalidades: ['presencial', 'online'], extra: '16h' },
  { id: 'tr-meio-ambiente', nome: 'Meio Ambiente (ISO 14001)', categoria: 'treinamentos', imagem: '/images/meio-ambiente.jpg', modalidades: ['presencial', 'online'], extra: '8h' },
  { id: 'tr-acidente-trabalho', nome: 'Investigação de Acidentes', categoria: 'treinamentos', imagem: '/images/acidente.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'tr-ppra', nome: 'PPRA / PGR', categoria: 'treinamentos', imagem: '/images/ppra.jpg', modalidades: ['presencial', 'online'], extra: '8h' },
  { id: 'tr-pcmat', nome: 'PCMAT', categoria: 'treinamentos', imagem: '/images/pcmat.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'tr-extintores', nome: 'Uso de Extintores', categoria: 'treinamentos', imagem: '/images/extintores.jpg', modalidades: ['presencial'], extra: '4h' },
  { id: 'tr-trabalho-noturno', nome: 'Trabalho Noturno', categoria: 'treinamentos', imagem: '/images/noturno.jpg', modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'tr-gestao-residuos', nome: 'Gestão de Resíduos', categoria: 'treinamentos', imagem: '/images/residuos.jpg', modalidades: ['presencial', 'online'], extra: '8h' },
  { id: 'tr-esg', nome: 'ESG e Sustentabilidade', categoria: 'treinamentos', imagem: '/images/esg.jpg', modalidades: ['presencial', 'online'], extra: '16h' },
  { id: 'tr-osha', nome: 'OSHA – Normas Americanas', categoria: 'treinamentos', imagem: '/images/osha.jpg', modalidades: ['presencial', 'online'], extra: '16h' },
  { id: 'tr-andaimes', nome: 'Montagem de Andaimes', categoria: 'treinamentos', imagem: '/images/andaimes.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-plataforma-aerea', nome: 'Plataforma Aérea (PEA)', categoria: 'treinamentos', imagem: '/images/pea.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'tr-operador-guincho', nome: 'Operador de Guincho', categoria: 'treinamentos', imagem: '/images/guincho.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-nr10-sep', nome: 'NR-10 SEP – Alta Tensão', categoria: 'treinamentos', imagem: '/images/sep.jpg', modalidades: ['presencial'], extra: '40h' },
  { id: 'tr-bombeiro-civil', nome: 'Bombeiro Civil', categoria: 'treinamentos', imagem: '/images/bombeiro.jpg', modalidades: ['presencial'], extra: '200h' },
  { id: 'tr-vigilante', nome: 'Vigilante Patrimonial', categoria: 'treinamentos', imagem: '/images/vigilante.jpg', modalidades: ['presencial'], extra: '440h' },
  { id: 'tr-motoboy', nome: 'Motoboy Profissional', categoria: 'treinamentos', imagem: '/images/motoboy.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-habilitacao-offshore', nome: 'Habilitação Offshore (OPITO)', categoria: 'treinamentos', imagem: '/images/offshore.jpg', modalidades: ['presencial'], extra: '40h' },
  { id: 'tr-huet', nome: 'HUET – Saída Subaquática', categoria: 'treinamentos', imagem: '/images/huet.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-sea-survival', nome: 'Sea Survival', categoria: 'treinamentos', imagem: '/images/sea-survival.jpg', modalidades: ['presencial'], extra: '24h' },
  { id: 'tr-rigging', nome: 'Rigging / Amarração', categoria: 'treinamentos', imagem: '/images/rigging.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-trabalho-frio', nome: 'Trabalho a Frio / Permissão', categoria: 'treinamentos', imagem: '/images/trabalho-frio.jpg', modalidades: ['presencial'], extra: '8h' },
  { id: 'tr-soldagem-segura', nome: 'Soldagem Segura', categoria: 'treinamentos', imagem: '/images/soldagem.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-operador-ponte', nome: 'Operador de Ponte Rolante', categoria: 'treinamentos', imagem: '/images/ponte-rolante.jpg', modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-nr-quimica', nome: 'NR Especial – Indústria Química', categoria: 'treinamentos', imagem: '/images/nr-quimica.jpg', modalidades: ['presencial'], extra: '24h' },
];

// ---------------------------------------------------------------------------
// Graduações e Tecnólogos
// ---------------------------------------------------------------------------
export const CURSOS_GRADUACOES: Curso[] = [
  // Bacharelados
  { id: 'grad-adm', nome: 'Administração', categoria: 'graduacoes', imagem: '/images/grad-adm.jpg', modalidades: ['presencial', 'online'], extra: '4 anos' },
  { id: 'grad-direito', nome: 'Direito', categoria: 'graduacoes', imagem: '/images/grad-direito.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-pedagogia', nome: 'Pedagogia', categoria: 'graduacoes', imagem: '/images/grad-pedagogia.jpg', modalidades: ['presencial', 'online'], extra: '4 anos' },
  { id: 'grad-psicologia', nome: 'Psicologia', categoria: 'graduacoes', imagem: '/images/grad-psicologia.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-contabeis', nome: 'Ciências Contábeis', categoria: 'graduacoes', imagem: '/images/grad-contabeis.jpg', modalidades: ['presencial', 'online'], extra: '4 anos' },
  { id: 'grad-eng-civil', nome: 'Engenharia Civil', categoria: 'graduacoes', imagem: '/images/grad-eng-civil.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-eng-producao', nome: 'Engenharia de Produção', categoria: 'graduacoes', imagem: '/images/grad-eng-producao.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-eng-mecanica', nome: 'Engenharia Mecânica', categoria: 'graduacoes', imagem: '/images/grad-eng-mecanica.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-eng-eletrica', nome: 'Engenharia Elétrica', categoria: 'graduacoes', imagem: '/images/grad-eng-eletrica.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-arquitetura', nome: 'Arquitetura e Urbanismo', categoria: 'graduacoes', imagem: '/images/grad-arquitetura.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-medicina', nome: 'Medicina', categoria: 'graduacoes', imagem: '/images/grad-medicina.jpg', modalidades: ['presencial'], extra: '6 anos' },
  { id: 'grad-enfermagem', nome: 'Enfermagem', categoria: 'graduacoes', imagem: '/images/grad-enfermagem.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-fisioterapia', nome: 'Fisioterapia', categoria: 'graduacoes', imagem: '/images/grad-fisioterapia.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-nutricao', nome: 'Nutrição', categoria: 'graduacoes', imagem: '/images/grad-nutricao.jpg', modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-farmacia', nome: 'Farmácia', categoria: 'graduacoes', imagem: '/images/grad-farmacia.jpg', modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-biomedicina', nome: 'Biomedicina', categoria: 'graduacoes', imagem: '/images/grad-biomedicina.jpg', modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-terapia-ocupacional', nome: 'Terapia Ocupacional', categoria: 'graduacoes', imagem: '/images/grad-to.jpg', modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-educacao-fisica', nome: 'Educação Física', categoria: 'graduacoes', imagem: '/images/grad-ef.jpg', modalidades: ['presencial'], extra: '4 anos' },
  // Tecnólogos
  { id: 'tec-rh-grad', nome: 'Tecnólogo em Recursos Humanos', categoria: 'graduacoes', imagem: '/images/tec-rh.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-logistica-grad', nome: 'Tecnólogo em Logística', categoria: 'graduacoes', imagem: '/images/tec-logistica.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-gestao-financeira', nome: 'Tecnólogo em Gestão Financeira', categoria: 'graduacoes', imagem: '/images/tec-financeiro.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-marketing-grad', nome: 'Tecnólogo em Marketing', categoria: 'graduacoes', imagem: '/images/tec-marketing.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-comercio-exterior', nome: 'Tecnólogo em Comércio Exterior', categoria: 'graduacoes', imagem: '/images/tec-comercio.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-processos-gerenciais', nome: 'Tecnólogo em Processos Gerenciais', categoria: 'graduacoes', imagem: '/images/tec-processos.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-seguranca-grad', nome: 'Tecnólogo em Segurança do Trabalho', categoria: 'graduacoes', imagem: '/images/tec-sst.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-ti', nome: 'Tecnólogo em Análise e Des. de Sistemas', categoria: 'graduacoes', imagem: '/images/tec-ti.jpg', modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'tec-design-moda', nome: 'Tecnólogo em Design de Moda', categoria: 'graduacoes', imagem: '/images/tec-moda.jpg', modalidades: ['presencial'], extra: '2 anos' },
  { id: 'tec-radiologia-grad', nome: 'Tecnólogo em Radiologia', categoria: 'graduacoes', imagem: '/images/tec-radiologia.jpg', modalidades: ['presencial'], extra: '2,5 anos' },
  // Pós-Graduações
  { id: 'pos-gestao-pessoas', nome: 'Pós – Gestão de Pessoas', categoria: 'graduacoes', imagem: '/images/pos-gp.jpg', modalidades: ['presencial', 'online'], extra: 'MBA 360h' },
  { id: 'pos-eng-seguranca', nome: 'Pós – Engenharia de Segurança', categoria: 'graduacoes', imagem: '/images/pos-eng-seg.jpg', modalidades: ['presencial'], extra: 'Especialização 360h' },
  { id: 'pos-adm-financeira', nome: 'Pós – Administração Financeira', categoria: 'graduacoes', imagem: '/images/pos-adm-fin.jpg', modalidades: ['presencial', 'online'], extra: 'MBA 360h' },
  { id: 'pos-logistica', nome: 'Pós – Logística Empresarial', categoria: 'graduacoes', imagem: '/images/pos-log.jpg', modalidades: ['presencial', 'online'], extra: 'MBA 360h' },
  { id: 'pos-direito-empresarial', nome: 'Pós – Direito Empresarial', categoria: 'graduacoes', imagem: '/images/pos-dir.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-saude-publica', nome: 'Pós – Saúde Pública e da Família', categoria: 'graduacoes', imagem: '/images/pos-saude.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-neuropsicologia', nome: 'Pós – Neuropsicologia', categoria: 'graduacoes', imagem: '/images/pos-neuro.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-gestao-projetos', nome: 'Pós – Gestão de Projetos', categoria: 'graduacoes', imagem: '/images/pos-proj.jpg', modalidades: ['presencial', 'online'], extra: 'MBA 360h' },
  { id: 'pos-esg', nome: 'Pós – ESG e Sustentabilidade', categoria: 'graduacoes', imagem: '/images/pos-esg.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-marketing-digital', nome: 'Pós – Marketing Digital', categoria: 'graduacoes', imagem: '/images/pos-mkt.jpg', modalidades: ['presencial', 'online'], extra: 'MBA 360h' },
  { id: 'pos-docencia', nome: 'Pós – Docência para Educação Superior', categoria: 'graduacoes', imagem: '/images/pos-docencia.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-nutricao-clinica', nome: 'Pós – Nutrição Clínica', categoria: 'graduacoes', imagem: '/images/pos-nutricao.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-fisioterapia-esp', nome: 'Pós – Fisioterapia Hospitalar', categoria: 'graduacoes', imagem: '/images/pos-fisio.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-educacao-especial', nome: 'Pós – Educação Especial/Inclusiva', categoria: 'graduacoes', imagem: '/images/pos-ee.jpg', modalidades: ['presencial', 'online'], extra: 'Especialização 360h' },
  { id: 'pos-petro-gas', nome: 'Pós – Petróleo e Gás', categoria: 'graduacoes', imagem: '/images/pos-petroleo.jpg', modalidades: ['presencial', 'online'], extra: 'MBA 360h' },
];

// ---------------------------------------------------------------------------
// Idiomas
// ---------------------------------------------------------------------------
export const CURSOS_IDIOMAS: Curso[] = [
  { id: 'id-ingles', nome: 'Inglês', categoria: 'idiomas', imagem: '/images/ingles.jpg', modalidades: ['presencial', 'online'], extra: 'Básico ao Avançado' },
  { id: 'id-espanhol', nome: 'Espanhol', categoria: 'idiomas', imagem: '/images/espanhol.jpg', modalidades: ['presencial', 'online'], extra: 'Básico ao Avançado' },
  { id: 'id-frances', nome: 'Francês', categoria: 'idiomas', imagem: '/images/frances.jpg', modalidades: ['presencial', 'online'], extra: 'Básico ao Avançado' },
  { id: 'id-ingles-kids', nome: 'Inglês Kids', categoria: 'idiomas', imagem: '/images/ingles-kids.jpg', modalidades: ['presencial'], extra: 'A partir de 7 anos' },
  { id: 'id-espanhol-kids', nome: 'Espanhol Kids', categoria: 'idiomas', imagem: '/images/espanhol-kids.jpg', modalidades: ['presencial'], extra: 'A partir de 7 anos' },
  { id: 'id-ingles-negocios', nome: 'Inglês para Negócios', categoria: 'idiomas', imagem: '/images/ingles-biz.jpg', modalidades: ['presencial', 'online'], extra: 'Business English' },
];

// ---------------------------------------------------------------------------
// Kids
// ---------------------------------------------------------------------------
export const CURSOS_KIDS: Curso[] = [
  { id: 'kids-informatica', nome: 'Informática para Crianças', categoria: 'kids', imagem: '/images/kids-informatica.jpg', modalidades: ['presencial'], extra: 'De 6 a 14 anos' },
  { id: 'kids-robotica', nome: 'Robótica Educacional', categoria: 'kids', imagem: '/images/kids-robotica.jpg', modalidades: ['presencial'], extra: 'De 8 a 16 anos' },
  { id: 'kids-ingles', nome: 'Inglês para Crianças', categoria: 'kids', imagem: '/images/kids-ingles.jpg', modalidades: ['presencial'], extra: 'De 5 a 12 anos' },
];

// ---------------------------------------------------------------------------
// Exports agregados
// ---------------------------------------------------------------------------
export const TODOS_OS_CURSOS: Curso[] = [
  ...CURSOS_TECNICOS,
  ...CURSOS_PROFISSIONALIZANTES,
  ...CURSOS_TREINAMENTOS,
  ...CURSOS_GRADUACOES,
  ...CURSOS_IDIOMAS,
  ...CURSOS_KIDS,
];

export const CURSOS_POR_CATEGORIA: Record<CategoriaSlug, Curso[]> = {
  tecnicos: CURSOS_TECNICOS,
  profissionalizantes: CURSOS_PROFISSIONALIZANTES,
  treinamentos: CURSOS_TREINAMENTOS,
  graduacoes: CURSOS_GRADUACOES,
  idiomas: CURSOS_IDIOMAS,
  kids: CURSOS_KIDS,
};

export const TOTAL_CURSOS = TODOS_OS_CURSOS.length;

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------

/** Busca por nome (case-insensitive, sem acento) */
export function buscarCursos(query: string): Curso[] {
  if (!query.trim()) return TODOS_OS_CURSOS;
  const normalizar = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  const q = normalizar(query);
  return TODOS_OS_CURSOS.filter(
    (c) =>
      normalizar(c.nome).includes(q) ||
      normalizar(c.extra ?? '').includes(q)
  );
}

const WA_NUMBER = '5522999999999'; // TODO: substituir pelo número real da CQP

/** Gera URL do WhatsApp com mensagem contextual por curso */
export function getCursoWhatsAppUrl(curso: Curso): string {
  const texto = encodeURIComponent(
    `Olá! Gostaria de mais informações sobre o curso de ${curso.nome}.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${texto}`;
}

/** Gera URL do WhatsApp genérico (sem curso específico) */
export function getWhatsAppUrl(): string {
  const texto = encodeURIComponent(
    'Olá! Gostaria de mais informações sobre os cursos da CQP.'
  );
  return `https://wa.me/${WA_NUMBER}?text=${texto}`;
}
