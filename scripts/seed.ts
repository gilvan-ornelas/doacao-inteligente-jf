import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import * as schema from "../src/shared/db/schema";

const RAW = `
Prédio Sede da PJF – Av. Brasil, 2001 – térreo
Casa da Mulher – Av. Garibaldi Campinhos, 169 – Vitorino Braga
Escola Municipal Murilo Mendes – Rua Dr. Leonel Jaguaribe, 240 – Alto Grajaú
Escola Municipal Professor Nilo Camilo Ayupe – Rua Almirante Barroso, 155 – Paineiras
Shopping Jardim Norte – Av. Brasil, 6345 – Mariano Procópio
Unimed Juiz de Fora – Av. Rio Branco, 2540
Emcasa – Av. Sete de Setembro, 975 – Costa Carvalho
IF Sudeste MG – Rua Bernardo Mascarenhas, 1283 – Bairro Fábrica
Escola Municipal Paulo Rogério dos Santos – Rua Cel. Quintão, 136 – Monte Castelo
Supermercados Bahamas – todas as lojas
Sindicato dos Bancários – Rua Batista de Oliveira, 745
Igreja Metodista em Bela Aurora – Rua Dr. Costa Reis, 380 – Ipiranga
UniAcademia – Rua Halfeld, 1.179 – Centro
Independência Shopping – Av. Presidente Itamar Franco, 3600 – Cascatinha
AACI – Rua Doutor Dias da Cruz, 487 – Nova Era
Secretaria Especial de Igualdade Racial – Av. Rio Branco, 2234 – Centro
Loja Maçônica – Rua Cândido Tostes, 212 – São Mateus
Mister Shopping – Rua Mr. Moore, 70 – Centro
Souza Gomes Imóveis – Av. Presidente Itamar Franco, 2.800 – São Mateus
Trade Hotel – Av. Presidente Itamar Franco, 3800 – Cascatinha
Shopping Alameda - R. Morais e Castro, 300 - Passos, Juiz de Fora - MG
Salvaterra Restaurante - Avenida Deusdedith Salgado, 4735, Salvaterra
Praça de pedágio de Simão Pereira, km 819, BR-040
Sesc Mesa Brasil - Rua Carlos Chagas, 100, São Mateus

Escola Municipal Raymundo Hargreaves - Rua Luiz Fávero, 383, Bom Jardim
Escola Municipal Amélia Pires - Rua Itatiaia, 570, Monte Castelo
Escola Municipal Aurea Bicalho - Rua Odilon Braga, nº 119 - Linhares
Escola Municipal Dante Jaime Brochado - Rua Francisco Fontainha, 163, Santo Antônio
Escola Municipal Gabriel Gonçalves - Rua Gabriel Coimbra, nº 240, Ipiranga
Escola Municipal Belmira Duarte - Rua Adailton Garcia, nº 110, Bairro JK
Escola Estadual Padre Frederico - Rua Carlos Alves, 133, Bonfim
Escola Municipal Paulo Rogério - Rua Coronel Quintão, nº 136, Monte Castelo
Escola Municipal Henrique José de Souza - Rua Cidade do Sol, nº 370, Cidade do Sol
Escola Municipal Marlene Barros - Prolongamento da Rua Marumbi, nº 56 - Marumbi
Escola Municipal Adhemar Rezende - Av. Senhor dos Passos, 1596, São Pedro
Escola Municipal Professor Nilo Camilo Ayupe - R. Alm. Barroso, 155 - Paineiras
Escola Municipal Fernão Dias - Rua Gustavo Fernandes Barbosa, nº 155 - Bandeirantes
Escola Municipal Dilermando Cruz - Rua Dr. Altivo Halfeld, nº 44 - Vila Ideal
Escola Municipal Irineu Guimarães - Rua José Zacarias dos Santos, s/nº - São Benedito
Escola Estadual Antônio Carlos - Av. Cel. Vidal, 180 - Mariano Procópio
Escola Municipal Antônio Carlos Fagundes - Rua Antônio Lopes Júnior, 35 - Francisco Bernardino
Escola Municipal Amélia Mascarenhas - Rua Dr Maurício Guerra, 300, São Bernardo
`.trim();

function slugify(text: string): string {
  const ascii = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  return ascii.slice(0, 48);
}

function splitParts(line: string): string[] {
  const normalized = line.replace(/\u2014/g, "\u2013"); // em-dash → en-dash
  if (normalized.includes(" \u2013 ")) {
    return normalized
      .split("\u2013")
      .map((p) => p.trim())
      .filter(Boolean);
  }
  if (normalized.includes(" - ")) {
    return normalized
      .split("-")
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return [line.trim()];
}

function cleanBairro(raw: string): string {
  const b = raw.trim();
  if (b.includes(",")) {
    const first = b.split(",")[0].trim();
    if (first) return first;
  }
  const junk = new Set(["MG", "JUIZ DE FORA", "BR-040", "BR040", "BR 040"]);
  if (junk.has(b.toUpperCase())) return "\u2014";
  return b || "\u2014";
}

function parseLine(line: string): [string, string, string] {
  const parts = splitParts(line);

  // Special case: Praça de pedágio
  if (line.includes("Simão Pereira") && line.toLowerCase().includes("pedágio")) {
    return [line.trim(), "km 819, BR-040", "Simão Pereira"];
  }

  if (parts.length >= 3) {
    const nome = parts[0].trim();
    const rawBairro = parts[parts.length - 1].trim();
    const bairro = cleanBairro(rawBairro);
    const enderecoParts = parts.slice(1, -1);
    const endereco =
      enderecoParts
        .map((p) => p.trim())
        .filter(Boolean)
        .join(" - ") || "\u2014";
    return [nome, endereco, bairro];
  }

  if (parts.length === 2) {
    const nome = parts[0].trim();
    const enderecoOrNote = parts[1].trim();
    return [nome, enderecoOrNote, "\u2014"];
  }

  return [line.trim(), "\u2014", "\u2014"];
}

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL || "file:data/doacao.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const db = drizzle(client, { schema });

  // Push schema (create tables if not exist)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS pontos (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL,
      bairro TEXT NOT NULL,
      endereco TEXT NOT NULL,
      horario TEXT NOT NULL,
      contato_nome TEXT NOT NULL,
      contato_whats TEXT NOT NULL,
      ativo INTEGER NOT NULL DEFAULT 1
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS necessidades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ponto_id TEXT NOT NULL REFERENCES pontos(id),
      categoria TEXT NOT NULL,
      item TEXT NOT NULL,
      status TEXT NOT NULL,
      observacao TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL,
      updated_by TEXT NOT NULL DEFAULT ''
    )
  `);

  await client.execute(
    `CREATE INDEX IF NOT EXISTS idx_necessidades_ponto ON necessidades(ponto_id)`
  );
  await client.execute(
    `CREATE INDEX IF NOT EXISTS idx_necessidades_cat_status ON necessidades(categoria, status)`
  );

  const lines = RAW.split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let inserted = 0;

  for (const line of lines) {
    const [nome, endereco, bairro] = parseLine(line);
    const pontoId = `oficial_${slugify(nome)}`;

    const result = await db
      .insert(schema.pontos)
      .values({
        id: pontoId,
        nome,
        tipo: "Ponto de arrecadação",
        bairro,
        endereco,
        horario: "\u2014",
        contato_nome: "Oficial",
        contato_whats: "",
        ativo: 1,
      })
      .onConflictDoNothing();

    if (result.rowsAffected > 0) inserted++;
  }

  // Count total
  const countResult = await db.select({ count: sql<number>`count(*)` }).from(schema.pontos);
  const total = countResult[0].count;

  console.log(`Seed complete: ${inserted} new points inserted (${total} total in database)`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
