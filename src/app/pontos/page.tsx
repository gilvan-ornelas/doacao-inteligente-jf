import { listActivePontos, listNecessidades } from "@/features/pontos/queries";
import { PontosClient } from "@/features/pontos/components/pontos-client";

export const dynamic = "force-dynamic";

export default async function PontosPage() {
  const [pontosData, necessidadesData] = await Promise.all([
    listActivePontos(),
    listNecessidades(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-bold md:text-3xl">
        Pontos de doação e necessidades
      </h1>
      <PontosClient pontos={pontosData} necessidades={necessidadesData} />
    </div>
  );
}
