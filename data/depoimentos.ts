// ---------------------------------------------------------------------------
// data/depoimentos.ts
// Fonte de verdade para os depoimentos da TestimonialsSection.
// TODO: substituir pelos depoimentos reais fornecidos pelo cliente.
// ---------------------------------------------------------------------------

export interface Depoimento {
  id: string;
  nome: string;
  curso: string;
  texto: string;
  /** Caminho relativo, ex.: './images/depoimentos/maria.webp' */
  foto?: string;
  /** 1–5 */
  rating?: number;
  /** Ex.: 'Formada em 2024' */
  detalhe?: string;
}

export const DEPOIMENTOS: Depoimento[] = [
  {
    id: 'dep-1',
    nome: 'Maria Clara Oliveira',
    curso: 'Técnico em Enfermagem',
    texto: 'O CQP mudou completamente minha trajetória profissional. Os professores são experientes e o material didático é excelente. Consegui emprego antes mesmo de concluir o curso!',
    foto: undefined,
    rating: 5,
    detalhe: 'Formada em 2024',
  },
  {
    id: 'dep-2',
    nome: 'Rafael Mendonça',
    curso: 'NR-35 — Trabalho em Altura',
    texto: 'Fiz o treinamento de NR-35 para atender a uma exigência da plataforma onde trabalho. A didática é clara, o certificado foi reconhecido de imediato pela empresa.',
    foto: undefined,
    rating: 5,
    detalhe: 'Profissional de O&G',
  },
  {
    id: 'dep-3',
    nome: 'Isabela Torres',
    curso: 'Inglês Técnico para Petróleo',
    texto: 'Eu precisava de inglês técnico para uma promoção e o CQP tinha exatamente o curso certo. A metodologia é focada no mercado de Macaé — nada genérico.',
    foto: undefined,
    rating: 5,
    detalhe: 'Analista em multinacional',
  },
  {
    id: 'dep-4',
    nome: 'Bruno Carvalho',
    curso: 'Informática Básica',
    texto: 'Voltei a estudar depois de muitos anos e tinha medo de não conseguir acompanhar. A equipe do CQP foi muito paciente e o ritmo das aulas é perfeito para quem está recomeçando.',
    foto: undefined,
    rating: 5,
    detalhe: 'Recolocado no mercado em 2025',
  },
  {
    id: 'dep-5',
    nome: 'Camila Nascimento',
    curso: 'Graduação em Administração',
    texto: 'A modalidade EAD do CQP é muito bem estruturada. Consigo estudar no meu horário, sem abrir mão da qualidade. Já indiquei para três colegas de trabalho.',
    foto: undefined,
    rating: 5,
    detalhe: 'Aluna EAD desde 2023',
  },
];
