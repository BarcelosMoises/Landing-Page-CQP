// types.ts
export type CategoriaSlug =
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

export type Modalidade = 'EAD' | 'SEMIPRESENCIAL';

export interface CursoPosGraduacao {
  id: string;
  titulo: string;
  categoria: CategoriaSlug;
  modalidade: Modalidade;
}

export interface CategoriaConfig {
  slug: CategoriaSlug;
  label: string;
  icone: React.ComponentType<{ size?: number | string; strokeWidth?: number | string }>;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  keywords: string[];
}