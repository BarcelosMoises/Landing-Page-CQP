// =============================================================================
// data/cursos.ts
// Fonte única de verdade para todos os cursos da CQP.
// Gerado a partir dos arquivos reais em /images — sem cursos inventados.
// =============================================================================

export type Modalidade = 'presencial' | 'online' | 'hibrido';

export interface Curso {
  id: string;
  nome: string;
  categoria: CategoriaSlug;
  imagem: string;          // caminho relativo a /public (Next.js)
  modalidades: Modalidade[];
  extra?: string;          // duração, carga horária, nível
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
    descricao: 'Inglês, LIBRAS e mais com metodologia moderna',
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
// Fonte: images/cursos-tecnicos/
// ---------------------------------------------------------------------------
export const CURSOS_TECNICOS: Curso[] = [
  { id: 'tec-adm',            nome: 'Administração',                      categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-administracao.png',                    modalidades: ['presencial', 'online'] },
  { id: 'tec-agropecuaria',   nome: 'Agropecuária',                       categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-agropecuaria.png',                     modalidades: ['presencial'] },
  { id: 'tec-comercio',       nome: 'Comércio',                           categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-comercio.png',                         modalidades: ['presencial', 'online'] },
  { id: 'tec-dev-sistemas',   nome: 'Desenvolvimento de Sistemas',        categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-desenvolvimento-de-sistema.png',       modalidades: ['presencial', 'online'] },
  { id: 'tec-edificacoes',    nome: 'Edificações',                        categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-edificacoes.png',                      modalidades: ['presencial'] },
  { id: 'tec-eletroeletronica', nome: 'Eletroeletrônica',                 categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-eletroeletronica.png',                 modalidades: ['presencial'] },
  { id: 'tec-eletrotecnica',  nome: 'Eletrotécnica',                      categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-eletrotecnica.png',                    modalidades: ['presencial'] },
  { id: 'tec-info-internet',  nome: 'Informática para Internet',          categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-informatica-para-internet.png',        modalidades: ['presencial', 'online'] },
  { id: 'tec-informatica',    nome: 'Informática',                        categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-informatica.png',                      modalidades: ['presencial', 'online'] },
  { id: 'tec-logistica',      nome: 'Logística',                          categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-logistica.png',                        modalidades: ['presencial', 'online'] },
  { id: 'tec-manut-info',     nome: 'Manutenção e Suporte em Informática',categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-manutencao-e-suporte-em-informatica.png', modalidades: ['presencial'] },
  { id: 'tec-meio-ambiente',  nome: 'Meio Ambiente',                      categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-meio-ambiente.png',                    modalidades: ['presencial'] },
  { id: 'tec-redes',          nome: 'Redes de Computadores',              categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-redes-de-computadores.png',            modalidades: ['presencial'] },
  { id: 'tec-secretariado',   nome: 'Secretariado',                       categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-secretariado.png',                     modalidades: ['presencial', 'online'] },
  { id: 'tec-seguranca',      nome: 'Segurança do Trabalho',              categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-seguranca-do-trabalho.png',            modalidades: ['presencial'] },
  { id: 'tec-servicos-pub',   nome: 'Serviços Públicos',                  categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-servicos-publicos.png',                modalidades: ['presencial', 'online'] },
  { id: 'tec-imobiliarias',   nome: 'Transações Imobiliárias',            categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-transacoes-imobiliarias.png',          modalidades: ['presencial'] },
  { id: 'tec-vendas',         nome: 'Vendas',                             categoria: 'tecnicos', imagem: '/images/cursos-tecnicos/capa-curso-vendas.png',                           modalidades: ['presencial', 'online'] },
];

// ---------------------------------------------------------------------------
// Cursos Profissionalizantes
// Fonte: images/cursos-profissionalizantes/
// ---------------------------------------------------------------------------
export const CURSOS_PROFISSIONALIZANTES: Curso[] = [
  { id: 'pro-agente-turismo',       nome: 'Agente de Turismo',                          categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/agente-de-turismo.png',                          modalidades: ['presencial', 'online'] },
  { id: 'pro-assist-adm',           nome: 'Assistente Administrativo',                  categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/assistente-administrativo.png',                  modalidades: ['presencial', 'online'] },
  { id: 'pro-assist-contabil',      nome: 'Assistente Contábil',                        categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/assistente-contabil.png',                        modalidades: ['presencial', 'online'] },
  { id: 'pro-assist-financeiro',    nome: 'Assistente Financeiro',                      categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/assistente-financeiro.png',                      modalidades: ['presencial', 'online'] },
  { id: 'pro-assist-marketing',     nome: 'Assistente de Marketing',                    categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/assistente-marketing.png',                       modalidades: ['presencial', 'online'] },
  { id: 'pro-assist-rh',            nome: 'Assistente de Recursos Humanos',             categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/assistente-recursos-humanos.png',                 modalidades: ['presencial', 'online'] },
  { id: 'pro-atend-farmacia',       nome: 'Atendente de Farmácia',                      categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/atendente-de-farmacia.png',                      modalidades: ['presencial'] },
  { id: 'pro-aux-bancario',         nome: 'Auxiliar Bancário',                          categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/auxiliar-bancario.png',                          modalidades: ['presencial', 'online'] },
  { id: 'pro-cabeleireiro',         nome: 'Cabeleireiro',                               categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/cabeleireiro.png',                               modalidades: ['presencial'] },
  { id: 'pro-conteudo-midias',      nome: 'Criação de Conteúdo para Mídias Sociais',    categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/criacao-de-conteudo-para-midias-sociais.png',    modalidades: ['presencial', 'online'] },
  { id: 'pro-edicao-video',         nome: 'Criação e Edição de Vídeos',                 categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/criacao-e-edicao-de-videos.png',                 modalidades: ['presencial', 'online'] },
  { id: 'pro-cuidador-idosos',      nome: 'Cuidador de Idosos',                         categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/cuidador-de-idosos.png',                         modalidades: ['presencial'] },
  { id: 'pro-empreendedorismo',     nome: 'Empreendedorismo Digital',                   categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/empreendedorismo-digital.png',                   modalidades: ['presencial', 'online'] },
  { id: 'pro-estetica',             nome: 'Estética',                                   categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/estetica.png',                                   modalidades: ['presencial'] },
  { id: 'pro-fotografia',           nome: 'Fotografia',                                 categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/fotografia.png',                                 modalidades: ['presencial', 'online'] },
  { id: 'pro-manutencao-celular',   nome: 'Manutenção de Celular',                      categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/manutencao-de-celular.png',                      modalidades: ['presencial'] },
  { id: 'pro-manicure',             nome: 'Manicure e Pedicure',                        categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/manicure-e-pedicure.png',                        modalidades: ['presencial'] },
  { id: 'pro-mecanica-auto',        nome: 'Mecânica Automotiva',                        categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/mecanica-automotiva.png',                        modalidades: ['presencial'] },
  { id: 'pro-power-bi',             nome: 'Power BI',                                   categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/power-bi.png',                                   modalidades: ['presencial', 'online'] },
  { id: 'pro-programacao',          nome: 'Programação',                                categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/programacao.png',                                modalidades: ['presencial', 'online'] },
  { id: 'pro-redes-computadores',   nome: 'Redes de Computadores',                      categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/redes-de-computadores.png',                      modalidades: ['presencial'] },
  { id: 'pro-secretariado',         nome: 'Secretariado',                               categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/secretariado.png',                               modalidades: ['presencial', 'online'] },
  { id: 'pro-youtuber',             nome: 'Youtuber',                                   categoria: 'profissionalizantes', imagem: '/images/cursos-profissionalizantes/youtuber.png',                                   modalidades: ['presencial', 'online'] },
];

// ---------------------------------------------------------------------------
// Treinamentos e NRs
// Fonte: images/nrs/
// ---------------------------------------------------------------------------
export const CURSOS_TREINAMENTOS: Curso[] = [
  // NRs numeradas
  { id: 'nr-01',                nome: 'NR-01 – Disposições Gerais e GRO',                   categoria: 'treinamentos', imagem: '/images/nrs/nr-1-disposicoes-gerais-e-gerenciamentos-de-riscos-ocupacionais-gro.webp',                                                                                      modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'nr-05-gr1',            nome: 'NR-05 – CIPA Grau de Risco 1',                        categoria: 'treinamentos', imagem: '/images/nrs/nr-5-comissao-interna-de-prevencao-de-acidentes-cipa-grau-de-risco-1.webp',                                                                               modalidades: ['presencial', 'online'], extra: '20h' },
  { id: 'nr-05-gr2',            nome: 'NR-05 – CIPA Grau de Risco 2',                        categoria: 'treinamentos', imagem: '/images/nrs/nr-5-comissao-interna-de-prevencao-de-acidentes-cipa-grau-de-risco-2.webp',                                                                               modalidades: ['presencial', 'online'], extra: '20h' },
  { id: 'nr-05-gr3',            nome: 'NR-05 – CIPA Grau de Risco 3',                        categoria: 'treinamentos', imagem: '/images/nrs/nr-5-risco-3.webp',                                                                                                                                   modalidades: ['presencial', 'online'], extra: '20h' },
  { id: 'nr-05-gr4',            nome: 'NR-05 – CIPA Grau de Risco 4',                        categoria: 'treinamentos', imagem: '/images/nrs/nr-5-risco-4.webp',                                                                                                                                   modalidades: ['presencial', 'online'], extra: '20h' },
  { id: 'nr-06',                nome: 'NR-06 – EPI',                                         categoria: 'treinamentos', imagem: '/images/nrs/nr-6.webp',                                                                                                                                           modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'nr-10-basico',         nome: 'NR-10 – Segurança em Eletricidade (Básico)',          categoria: 'treinamentos', imagem: '/images/nrs/nr-10-curso-basico-seguranca-e-saude-em-trabalhos-com-eletricidade.webp',                                                                              modalidades: ['presencial'], extra: '40h' },
  { id: 'nr-10-sep',            nome: 'NR-10 SEP – Alta Tensão',                             categoria: 'treinamentos', imagem: '/images/nrs/nr-10-curso-sep-seguranca-e-saude-em-servicos-eletricos-de-potencia.webp',                                                                           modalidades: ['presencial'], extra: '40h' },
  { id: 'nr-10-reciclagem',     nome: 'NR-10 – Reciclagem',                                  categoria: 'treinamentos', imagem: '/images/nrs/reciclagem-nr-10-curso-basico-seguranca-e-saude-em-trabalhos-com-eletricidade.webp',                                                                   modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-11-empilhadeira',   nome: 'NR-11 – Operador de Empilhadeira',                    categoria: 'treinamentos', imagem: '/images/nrs/nr-11-operador-de-empilhadeira.webp',                                                                                                                   modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-11-guindauto',      nome: 'NR-11 – Operador de Guindauto',                       categoria: 'treinamentos', imagem: '/images/nrs/nr-11-operador-de-guindauto.webp',                                                                                                                      modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-11-mini-carreg',    nome: 'NR-11 – Operador de Mini Carregadeira',               categoria: 'treinamentos', imagem: '/images/nrs/nr-11-operador-de-mini-carregadeira.webp',                                                                                                              modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-11-plataforma',     nome: 'NR-11 – Operador de Plataforma Elevatória',           categoria: 'treinamentos', imagem: '/images/nrs/nr-11-operador-de-plataforma-elevatoria.webp',                                                                                                          modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-11-ponte-rolante',  nome: 'NR-11 – Operador de Ponte Rolante',                   categoria: 'treinamentos', imagem: '/images/nrs/nr-11-operador-de-ponte-rolante.webp',                                                                                                                  modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-11-retroescav',     nome: 'NR-11 – Operador de Retroescavadeira',                categoria: 'treinamentos', imagem: '/images/nrs/nr-11-operador-de-retroescavadeira.webp',                                                                                                              modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-12',                nome: 'NR-12 – Máquinas e Equipamentos',                     categoria: 'treinamentos', imagem: '/images/nrs/nr-12-seguranca-com-maquinas-e-equipamentos-no-geral.webp',                                                                                           modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-17-adm',            nome: 'NR-17 – Ergonomia para Atividades Administrativas',  categoria: 'treinamentos', imagem: '/images/nrs/nr-17-ergonomia-para-atividades-administrativas.webp',                                                                                                  modalidades: ['presencial', 'online'], extra: '8h' },
  { id: 'nr-17-checkout',       nome: 'NR-17 – Ergonomia para Operador de Check-out',       categoria: 'treinamentos', imagem: '/images/nrs/nr-17-ergonomia-para-operador-de-check-out.webp',                                                                                                      modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-17-transporte',     nome: 'NR-17 – Ergonomia para Transporte Manual de Peso',   categoria: 'treinamentos', imagem: '/images/nrs/nr-17-ergonomia-para-transporte-manual-de-peso.webp',                                                                                                  modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-18',                nome: 'NR-18 – Construção Civil',                            categoria: 'treinamentos', imagem: '/images/nrs/nr-18-seguranca-e-saude-no-trabalho-de-construcao-civil.webp',                                                                                       modalidades: ['presencial'], extra: '6h' },
  { id: 'nr-20-basico',         nome: 'NR-20 – Inflamáveis e Combustíveis (Básico)',         categoria: 'treinamentos', imagem: '/images/nrs/nr-20-curso-basico.webp',                                                                                                                               modalidades: ['presencial'], extra: '4h' },
  { id: 'nr-20-especifico',     nome: 'NR-20 – Inflamáveis e Combustíveis (Específico)',     categoria: 'treinamentos', imagem: '/images/nrs/nr-20-curso-especifico.webp',                                                                                                                           modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-20-intermediario',  nome: 'NR-20 – Inflamáveis e Combustíveis (Intermediário)',  categoria: 'treinamentos', imagem: '/images/nrs/nr-20-curso-intermediario.webp',                                                                                                                       modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-20-avancado-i',     nome: 'NR-20 – Inflamáveis e Combustíveis (Avançado I)',     categoria: 'treinamentos', imagem: '/images/nrs/nr-20-curso-avancado-i.webp',                                                                                                                          modalidades: ['presencial'], extra: '20h' },
  { id: 'nr-20-avancado-ii',    nome: 'NR-20 – Inflamáveis e Combustíveis (Avançado II)',    categoria: 'treinamentos', imagem: '/images/nrs/nr-20-avancado-ii.webp',                                                                                                                               modalidades: ['presencial'], extra: '20h' },
  { id: 'nr-20-iniciacao',      nome: 'NR-20 – Iniciação sobre Inflamáveis e Combustíveis', categoria: 'treinamentos', imagem: '/images/nrs/nr-20-iniciacao-sobre-inflamaveis-e-combustiveis.webp',                                                                                               modalidades: ['presencial'], extra: '4h' },
  { id: 'nr-22-cipamin',        nome: 'NR-22 – CIPAMIN',                                     categoria: 'treinamentos', imagem: '/images/nrs/nr-22-cipamin.webp',                                                                                                                                   modalidades: ['presencial'], extra: '20h' },
  { id: 'nr-23',                nome: 'NR-23 – Combate a Incêndio',                          categoria: 'treinamentos', imagem: '/images/nrs/nr-23-protecao-contra-incendio.webp',                                                                                                                  modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-26-geral',          nome: 'NR-26 – Sinalização de Segurança',                    categoria: 'treinamentos', imagem: '/images/nrs/nr-26-sinalizacao-de-seguranca-no-geral.webp',                                                                                                        modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'nr-26-laboratorio',    nome: 'NR-26 – Sinalização de Segurança para Laboratório',  categoria: 'treinamentos', imagem: '/images/nrs/nr-26-sinalizacao-de-seguranca-para-laboratorio.webp',                                                                                                modalidades: ['presencial'], extra: '4h' },
  { id: 'nr-29-cpatp',          nome: 'NR-29 – CPATP',                                       categoria: 'treinamentos', imagem: '/images/nrs/nr-29-cpatp.webp',                                                                                                                                   modalidades: ['presencial'], extra: '20h' },
  { id: 'nr-29-portuario',      nome: 'NR-29 – Segurança no Trabalho Portuário',             categoria: 'treinamentos', imagem: '/images/nrs/nr-29-seguranca-e-saude-no-trabalho-portuario.webp',                                                                                                  modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-29-sinaleiro',      nome: 'NR-29 – Trabalho de Sinaleiro',                       categoria: 'treinamentos', imagem: '/images/nrs/nr-29-seguranca-e-saude-para-o-trabalho-de-sinaleiro.webp',                                                                                           modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-31-cipatr',         nome: 'NR-31 – CIPATR',                                      categoria: 'treinamentos', imagem: '/images/nrs/nr-31-cipatr.webp',                                                                                                                                   modalidades: ['presencial'], extra: '20h' },
  { id: 'nr-31-agrotoxicos',    nome: 'NR-31 – Uso de Agrotóxicos',                          categoria: 'treinamentos', imagem: '/images/nrs/nr-31-seguranca-e-saude-com-o-uso-de-agrotoxicos.webp',                                                                                               modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-31-rural-inicial',  nome: 'NR-31 – Trabalho Rural (Inicial)',                    categoria: 'treinamentos', imagem: '/images/nrs/nr-31-seguranca-e-saude-no-trabalho-rural-inicial.webp',                                                                                             modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-31-rural-periodico',nome: 'NR-31 – Trabalho Rural (Periódico)',                  categoria: 'treinamentos', imagem: '/images/nrs/nr-31-seguranca-e-saude-no-trabalho-rural-periodico.webp',                                                                                           modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-32',                nome: 'NR-32 – Segurança em Serviços de Saúde',              categoria: 'treinamentos', imagem: '/images/nrs/nr-32-seguranca-em-servicos-de-saude.webp',                                                                                                              modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-33-supervisor',     nome: 'NR-33 – Supervisor para Espaço Confinado',            categoria: 'treinamentos', imagem: '/images/nrs/nr-33-formacao-supervisor-para-espaco-confinado.webp',                                                                                                  modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-33-trabalhador',    nome: 'NR-33 – Trabalhador Autorizado e Vigias',             categoria: 'treinamentos', imagem: '/images/nrs/nr-33-formacao-trabalhador-autorizado-e-vigias-para-espaco-confinadoformacao-nr-33-trabalhador-autorizado-e-vigias-para-espaco-confinado.webp',      modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-33-rec-supervisor', nome: 'NR-33 – Reciclagem Supervisor',                       categoria: 'treinamentos', imagem: '/images/nrs/nr-33-supervisor-para-espaco-confinado-reciclagem.webp',                                                                                              modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-33-rec-trabalhador',nome: 'NR-33 – Reciclagem Trabalhador Autorizado',           categoria: 'treinamentos', imagem: '/images/nrs/nr-33-trabalhador-autorizado-e-vigias-para-espaco-confinado-reciclagem.webp',                                                                          modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-34-admissional',    nome: 'NR-34 – Trabalho Naval (Admissional)',                categoria: 'treinamentos', imagem: '/images/nrs/nr-34-admissional-seguranca-e-saude-no-trabalho-naval.webp',                                                                                            modalidades: ['presencial'], extra: '16h' },
  { id: 'nr-34-periodico',      nome: 'NR-34 – Trabalho Naval (Periódico)',                  categoria: 'treinamentos', imagem: '/images/nrs/nr-34-periodico-seguranca-e-saude-no-trabalho-naval.webp',                                                                                              modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-35-formacao',       nome: 'NR-35 – Trabalho em Altura (Formação)',               categoria: 'treinamentos', imagem: '/images/nrs/formacao-nr-35-trabalho-em-altura.webp',                                                                                                               modalidades: ['presencial'], extra: '8h' },
  { id: 'nr-35-reciclagem',     nome: 'NR-35 – Trabalho em Altura (Reciclagem)',             categoria: 'treinamentos', imagem: '/images/nrs/reciclagem-nr-35-trabalho-em-altura.webp',                                                                                                              modalidades: ['presencial'], extra: '4h' },
  { id: 'nr-36',                nome: 'NR-36 – Frigoríficos',                                categoria: 'treinamentos', imagem: '/images/nrs/nr-36-seguranca-e-saude-nos-trabalhos-frigorificos.webp',                                                                                             modalidades: ['presencial'], extra: '8h' },
  // Treinamentos avulsos
  { id: 'tr-brigada',           nome: 'Brigada Voluntária',                                  categoria: 'treinamentos', imagem: '/images/nrs/brigada-voluntaria.webp',                                                                                                                               modalidades: ['presencial'], extra: '16h' },
  { id: 'tr-direcao-def',       nome: 'Direção Defensiva',                                   categoria: 'treinamentos', imagem: '/images/nrs/direcao-defensiva.webp',                                                                                                                               modalidades: ['presencial', 'online'], extra: '8h' },
  { id: 'tr-ginastica-laboral', nome: 'Ginástica Laboral',                                   categoria: 'treinamentos', imagem: '/images/nrs/importancia-da-ginastica-laboral.webp',                                                                                                              modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'tr-normas-nrs',        nome: 'Normas e NRs (visão geral)',                          categoria: 'treinamentos', imagem: '/images/nrs/normas-nrs.webp',                                                                                                                                    modalidades: ['presencial', 'online'], extra: '4h' },
  { id: 'tr-primeiros-socorros',nome: 'Primeiros Socorros',                                  categoria: 'treinamentos', imagem: '/images/nrs/primeiros-socorros.webp',                                                                                                                            modalidades: ['presencial'], extra: '8h' },
  { id: 'tr-conserv-auditiva',  nome: 'Programa de Conservação Auditiva',                    categoria: 'treinamentos', imagem: '/images/nrs/sobre-programa-de-conservacao-auditiva.webp',                                                                                                       modalidades: ['presencial'], extra: '4h' },
  { id: 'tr-prot-respiratoria', nome: 'Programa de Proteção Respiratória',                   categoria: 'treinamentos', imagem: '/images/nrs/sobre-programa-de-protecao-respiratoria.webp',                                                                                                      modalidades: ['presencial'], extra: '4h' },
  { id: 'tr-telemarketing',     nome: 'Telemarketing',                                       categoria: 'treinamentos', imagem: '/images/nrs/telemarketing.webp',                                                                                                                                modalidades: ['presencial', 'online'], extra: '20h' },
];

// ---------------------------------------------------------------------------
// Graduações, Tecnólogos e Pós-Graduações
// Fonte: images/graduacoes/
// ---------------------------------------------------------------------------
export const CURSOS_GRADUACOES: Curso[] = [
  { id: 'grad-adm',                  nome: 'Administração',                            categoria: 'graduacoes', imagem: '/images/graduacoes/administracao.png',                        modalidades: ['presencial', 'online'], extra: '4 anos' },
  { id: 'grad-analise-sistemas',     nome: 'Análise e Desenvolvimento de Sistemas',    categoria: 'graduacoes', imagem: '/images/graduacoes/analise-e-desenvolvimento-de-sistemas.png', modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-arquitetura',          nome: 'Arquitetura e Urbanismo',                  categoria: 'graduacoes', imagem: '/images/graduacoes/arquitetura-e-urbanismo.png',              modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-ciencias-biologicas',  nome: 'Ciências Biológicas',                      categoria: 'graduacoes', imagem: '/images/graduacoes/ciencias-biologicas.png',                  modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-contabeis',            nome: 'Ciências Contábeis',                       categoria: 'graduacoes', imagem: '/images/graduacoes/ciencias-contabeis.png',                   modalidades: ['presencial', 'online'], extra: '4 anos' },
  { id: 'grad-ciencias-economicas',  nome: 'Ciências Econômicas',                      categoria: 'graduacoes', imagem: '/images/graduacoes/ciencias-economicas.png',                  modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-ciencias-politicas',   nome: 'Ciências Políticas',                       categoria: 'graduacoes', imagem: '/images/graduacoes/ciencias-politicas.png',                   modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-coaching-digital',     nome: 'Coaching Digital',                         categoria: 'graduacoes', imagem: '/images/graduacoes/coaching-digital.jpg',                     modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'grad-computacao-nuvem',     nome: 'Computação em Nuvem',                      categoria: 'graduacoes', imagem: '/images/graduacoes/computacao-em-nuvem.png',                  modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-ciencia-dados',        nome: 'Ciência de Dados',                         categoria: 'graduacoes', imagem: '/images/graduacoes/data-science.png',                         modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-educacao-especial',    nome: 'Educação Especial e Inclusiva',            categoria: 'graduacoes', imagem: '/images/graduacoes/educacao-especial.png',                    modalidades: ['presencial', 'online'], extra: '4 anos' },
  { id: 'grad-empreendedorismo',     nome: 'Empreendedorismo Digital',                 categoria: 'graduacoes', imagem: '/images/graduacoes/empreendedorismo-digital.png',             modalidades: ['presencial', 'online'], extra: '2 anos' },
  { id: 'grad-enfermagem',           nome: 'Enfermagem',                               categoria: 'graduacoes', imagem: '/images/graduacoes/enfermagem.png',                           modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-eng-producao',         nome: 'Engenharia de Produção',                   categoria: 'graduacoes', imagem: '/images/graduacoes/engenharia-de-producao.png',               modalidades: ['presencial'], extra: '5 anos' },
  { id: 'grad-gestao-ambiental',     nome: 'Gestão Ambiental',                         categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-ambiental.png',                     modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-comercial',     nome: 'Gestão Comercial',                         categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-comercial.png',                     modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-qualidade',     nome: 'Gestão da Qualidade',                      categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-de-qualidade.png',                  modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-jur',           nome: 'Gestão de Serviços Jurídicos',             categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-de-servicos-juridicos.png',         modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-transito',      nome: 'Gestão de Trânsito',                       categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-de-transito.png',                   modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-financeira',    nome: 'Gestão Financeira',                        categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-financeira.png',                    modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-hospitalar',    nome: 'Gestão Hospitalar',                        categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-hospitalar.png',                    modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-publica',       nome: 'Gestão Pública',                           categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-publica.png',                       modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-rh',            nome: 'Gestão de Recursos Humanos',               categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-rh.png',                            modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-gestao-ti',            nome: 'Gestão de TI',                             categoria: 'graduacoes', imagem: '/images/graduacoes/gestao-ti.png',                            modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-lic-espanhol',         nome: 'Licenciatura em Língua Espanhola',         categoria: 'graduacoes', imagem: '/images/graduacoes/licenciatura-espanhol.png',                modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-lic-ingles',           nome: 'Licenciatura em Língua Inglesa',           categoria: 'graduacoes', imagem: '/images/graduacoes/licenciatura-ingles.png',                  modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-lic-lingua-pt',        nome: 'Licenciatura em Língua Portuguesa',        categoria: 'graduacoes', imagem: '/images/graduacoes/licenciatura-lingua-portuguesa.png',       modalidades: ['presencial'], extra: '4 anos' },
  { id: 'grad-logistica',            nome: 'Logística',                                categoria: 'graduacoes', imagem: '/images/graduacoes/logistica.png',                            modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-marketing',            nome: 'Marketing',                                categoria: 'graduacoes', imagem: '/images/graduacoes/marketing.png',                            modalidades: ['presencial', 'online'], extra: '2,5 anos' },
  { id: 'grad-pedagogia',            nome: 'Pedagogia',                                categoria: 'graduacoes', imagem: '/images/graduacoes/pedagogia.png',                            modalidades: ['presencial', 'online'], extra: '4 anos' },
  { id: 'grad-seguranca-publica',    nome: 'Segurança Pública',                        categoria: 'graduacoes', imagem: '/images/graduacoes/seguranca-publica.png',                    modalidades: ['presencial'], extra: '4 anos' },
];

// ---------------------------------------------------------------------------
// Idiomas
// Fonte: images/idiomas/
// ATENÇÃO: renomear ingles-avançado.png → ingles-avancado.png localmente
// ---------------------------------------------------------------------------
export const CURSOS_IDIOMAS: Curso[] = [
  { id: 'id-ingles-basico',        nome: 'Inglês Básico',        categoria: 'idiomas', imagem: '/images/idiomas/ingles-basico.png',        modalidades: ['presencial', 'online'], extra: 'Básico' },
  { id: 'id-ingles-intermediario', nome: 'Inglês Intermediário', categoria: 'idiomas', imagem: '/images/idiomas/ingles-intermediario.png',  modalidades: ['presencial', 'online'], extra: 'Intermediário' },
  { id: 'id-ingles-avancado',      nome: 'Inglês Avançado',      categoria: 'idiomas', imagem: '/images/idiomas/ingles-avancado.png',       modalidades: ['presencial', 'online'], extra: 'Avançado' },
  { id: 'id-libras',               nome: 'LIBRAS',               categoria: 'idiomas', imagem: '/images/idiomas/libras.png',                modalidades: ['presencial', 'online'], extra: '60h' },
];

// ---------------------------------------------------------------------------
// Kids
// Fonte: images/kids/
// ---------------------------------------------------------------------------
export const CURSOS_KIDS: Curso[] = [
  { id: 'kids-games',      nome: 'Games Kids',       categoria: 'kids', imagem: '/images/kids/games-kids.png',       modalidades: ['presencial'] },
  { id: 'kids-informatica',nome: 'Informática Kids', categoria: 'kids', imagem: '/images/kids/informatica-kids.jpg', modalidades: ['presencial'] },
  { id: 'kids-ingles',     nome: 'Inglês Kids',      categoria: 'kids', imagem: '/images/kids/ingles-kids.png',      modalidades: ['presencial'] },
  { id: 'kids-robotica',   nome: 'Robótica Kids',    categoria: 'kids', imagem: '/images/kids/robotica-kids.png',    modalidades: ['presencial'] },
];

// ---------------------------------------------------------------------------
// Agregado — todos os cursos em um único array
// ---------------------------------------------------------------------------
export const TODOS_OS_CURSOS: Curso[] = [
  ...CURSOS_TECNICOS,
  ...CURSOS_PROFISSIONALIZANTES,
  ...CURSOS_TREINAMENTOS,
  ...CURSOS_GRADUACOES,
  ...CURSOS_IDIOMAS,
  ...CURSOS_KIDS,
];

// Contagem total de cursos — usado pelo BenefitsSection para o contador animado
export const TOTAL_CURSOS: number = TODOS_OS_CURSOS.length;

// ---------------------------------------------------------------------------
// CURSOS_POR_CATEGORIA — Record<CategoriaSlug, Curso[]>
// Usado pelo CoursesSection para filtrar por aba.
// ---------------------------------------------------------------------------
export const CURSOS_POR_CATEGORIA: Record<CategoriaSlug, Curso[]> = {
  tecnicos:            CURSOS_TECNICOS,
  profissionalizantes: CURSOS_PROFISSIONALIZANTES,
  treinamentos:        CURSOS_TREINAMENTOS,
  graduacoes:          CURSOS_GRADUACOES,
  idiomas:             CURSOS_IDIOMAS,
  kids:                CURSOS_KIDS,
};

// ---------------------------------------------------------------------------
// buscarCursos — busca case-insensitive no nome e id do curso
// ---------------------------------------------------------------------------
export function buscarCursos(query: string): Curso[] {
  const q = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return TODOS_OS_CURSOS.filter((c) => {
    const nome = c.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const id = c.id.toLowerCase();
    return nome.includes(q) || id.includes(q);
  });
}

// ---------------------------------------------------------------------------
// WhatsApp helpers
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = '5522998684334';

export function getWhatsAppUrl(mensagem?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!mensagem) return base;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

export function getCursoWhatsAppUrl(curso: Curso): string {
  if (curso.whatsapp) {
    return getWhatsAppUrl(curso.whatsapp);
  }
  const mensagem = `Olá! Tenho interesse no curso de *${curso.nome}* e gostaria de mais informações.`;
  return getWhatsAppUrl(mensagem);
}
