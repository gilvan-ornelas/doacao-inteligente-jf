export const CATEGORIAS = [
  "Água",
  "Alimentos",
  "Higiene",
  "Limpeza",
  "Roupas",
  "Fraldas",
  "Outros",
] as const;

export const STATUS_OPTIONS = ["URGENTE", "PRECISA", "OK"] as const;

export const TIPOS_PONTO = ["Ponto de arrecadação", "Abrigo"] as const;

export type Categoria = (typeof CATEGORIAS)[number];
export type Status = (typeof STATUS_OPTIONS)[number];
export type TipoPonto = (typeof TIPOS_PONTO)[number];
