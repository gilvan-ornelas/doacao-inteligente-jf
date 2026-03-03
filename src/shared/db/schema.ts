import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import type { InferSelectModel } from "drizzle-orm";

export const pontos = sqliteTable("pontos", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  tipo: text("tipo").notNull(),
  bairro: text("bairro").notNull(),
  endereco: text("endereco").notNull(),
  horario: text("horario").notNull(),
  contato_nome: text("contato_nome").notNull(),
  contato_whats: text("contato_whats").notNull(),
  ativo: integer("ativo").notNull().default(1),
});

export const necessidades = sqliteTable(
  "necessidades",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    ponto_id: text("ponto_id")
      .notNull()
      .references(() => pontos.id),
    categoria: text("categoria").notNull(),
    item: text("item").notNull(),
    status: text("status").notNull(),
    observacao: text("observacao").notNull().default(""),
    updated_at: text("updated_at").notNull(),
    updated_by: text("updated_by").notNull().default(""),
  },
  (table) => [
    index("idx_necessidades_ponto").on(table.ponto_id),
    index("idx_necessidades_cat_status").on(table.categoria, table.status),
  ]
);

export type Ponto = InferSelectModel<typeof pontos>;
export type Necessidade = InferSelectModel<typeof necessidades>;
