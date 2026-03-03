import { asc } from "drizzle-orm";
import { db } from "@/shared/db";
import { pontos } from "@/shared/db/schema";

export async function listAllPontos() {
  return db.select().from(pontos).orderBy(asc(pontos.bairro), asc(pontos.nome));
}
