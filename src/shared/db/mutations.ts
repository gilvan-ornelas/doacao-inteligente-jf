import { eq } from "drizzle-orm";
import { db } from ".";
import { pontos, necessidades } from "./schema";

function nowIso(): string {
  return new Date().toISOString();
}

export async function upsertPonto(data: {
  id: string;
  nome: string;
  tipo: string;
  bairro: string;
  endereco: string;
  horario: string;
  contato_nome: string;
  contato_whats: string;
  ativo: number;
}) {
  await db
    .insert(pontos)
    .values(data)
    .onConflictDoUpdate({
      target: pontos.id,
      set: {
        nome: data.nome,
        tipo: data.tipo,
        bairro: data.bairro,
        endereco: data.endereco,
        horario: data.horario,
        contato_nome: data.contato_nome,
        contato_whats: data.contato_whats,
        ativo: data.ativo,
      },
    });
}

export async function insertPontoIfMissing(data: {
  id: string;
  nome: string;
  tipo: string;
  bairro: string;
  endereco: string;
  horario: string;
  contato_nome: string;
  contato_whats: string;
  ativo: number;
}) {
  await db.insert(pontos).values(data).onConflictDoNothing();
}

export async function addNecessidade(data: {
  ponto_id: string;
  categoria: string;
  item: string;
  status: string;
  observacao?: string;
  updated_by?: string;
}) {
  await db.insert(necessidades).values({
    ...data,
    observacao: data.observacao ?? "",
    updated_by: data.updated_by ?? "",
    updated_at: nowIso(),
  });
}

export async function setPontoAtivo(id: string, ativo: number) {
  await db.update(pontos).set({ ativo }).where(eq(pontos.id, id));
}
