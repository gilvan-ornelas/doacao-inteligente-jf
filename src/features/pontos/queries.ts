import { eq, and, inArray, desc, sql, asc } from "drizzle-orm";
import { db } from "@/shared/db";
import { pontos, necessidades } from "@/shared/db/schema";

export async function listActivePontos() {
  return db
    .select()
    .from(pontos)
    .where(eq(pontos.ativo, 1))
    .orderBy(asc(pontos.bairro), asc(pontos.nome));
}

export async function listNecessidades(filters?: {
  pontoIds?: string[];
  categoria?: string;
  status?: string;
}) {
  const conditions = [];

  if (filters?.pontoIds && filters.pontoIds.length > 0) {
    conditions.push(inArray(necessidades.ponto_id, filters.pontoIds));
  }
  if (filters?.categoria) {
    conditions.push(eq(necessidades.categoria, filters.categoria));
  }
  if (filters?.status) {
    conditions.push(eq(necessidades.status, filters.status));
  }

  return db
    .select()
    .from(necessidades)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(necessidades.updated_at));
}

export async function lastUpdateForPonto(pontoId: string) {
  const result = await db
    .select({ maxDate: sql<string>`MAX(${necessidades.updated_at})` })
    .from(necessidades)
    .where(eq(necessidades.ponto_id, pontoId));
  return result[0]?.maxDate ?? null;
}

export async function getPonto(id: string) {
  const result = await db
    .select()
    .from(pontos)
    .where(eq(pontos.id, id))
    .limit(1);
  return result[0] ?? null;
}
