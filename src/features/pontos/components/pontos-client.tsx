"use client";

import { useState, useMemo } from "react";
import type { Ponto, Necessidade } from "@/shared/db/schema";
import { PontoFilters } from "./ponto-filters";
import { StatsBar } from "./stats-bar";
import { PontoCard } from "./ponto-card";
import { isWithinHours } from "../utils";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/shared/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  pontos: Ponto[];
  necessidades: Necessidade[];
}

export function PontosClient({ pontos, necessidades }: Props) {
  const [selectedPontoIds, setSelectedPontoIds] = useState<string[]>([]);
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState("");
  const [bairro, setBairro] = useState("");
  const [maxHours, setMaxHours] = useState(72);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const bairros = useMemo(
    () => [...new Set(pontos.map((p) => p.bairro).filter((b) => b !== "\u2014"))].sort(),
    [pontos]
  );

  const filteredNecessidades = useMemo(() => {
    return necessidades.filter((n) => {
      if (selectedPontoIds.length > 0 && !selectedPontoIds.includes(n.ponto_id))
        return false;
      if (categoria && n.categoria !== categoria) return false;
      if (status && n.status !== status) return false;
      if (!isWithinHours(n.updated_at, maxHours)) return false;
      return true;
    });
  }, [necessidades, selectedPontoIds, categoria, status, maxHours]);

  const filteredPontos = useMemo(() => {
    let result = pontos;
    if (bairro) {
      result = result.filter((p) => p.bairro === bairro);
    }
    if (selectedPontoIds.length > 0) {
      result = result.filter((p) => selectedPontoIds.includes(p.id));
    }
    return result;
  }, [pontos, bairro, selectedPontoIds]);

  const needsByPonto = useMemo(() => {
    const map = new Map<string, Necessidade[]>();
    for (const n of filteredNecessidades) {
      const arr = map.get(n.ponto_id) || [];
      arr.push(n);
      map.set(n.ponto_id, arr);
    }
    return map;
  }, [filteredNecessidades]);

  const urgenteCount = filteredNecessidades.filter(
    (n) => n.status === "URGENTE"
  ).length;

  const filterControls = (
    <PontoFilters
      pontos={pontos}
      bairros={bairros}
      selectedPontoIds={selectedPontoIds}
      onSelectedPontosChange={setSelectedPontoIds}
      categoria={categoria}
      onCategoriaChange={setCategoria}
      status={status}
      onStatusChange={setStatus}
      bairro={bairro}
      onBairroChange={setBairro}
      maxHours={maxHours}
      onMaxHoursChange={setMaxHours}
    />
  );

  return (
    <div className="mt-4 flex flex-col gap-4 lg:flex-row">
      {/* Mobile: floating filter button + sheet */}
      <div className="lg:hidden">
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-6 right-6 z-40 h-12 gap-2 rounded-full px-5 shadow-lg"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] overflow-y-auto bg-background">
            <SheetTitle className="text-lg font-semibold">Filtros</SheetTitle>
            <div className="mt-4">{filterControls}</div>
            <Button
              className="mt-6 w-full min-h-[44px]"
              onClick={() => setFiltersOpen(false)}
            >
              Aplicar
            </Button>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: sidebar filters */}
      <aside className="hidden lg:block lg:w-72 lg:shrink-0">
        <div className="sticky top-20 space-y-4 rounded-lg border border-border bg-card p-4">
          <h2 className="font-semibold">Filtros</h2>
          {filterControls}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-4">
        <StatsBar pontosCount={filteredPontos.length} urgenteCount={urgenteCount} />

        {filteredPontos.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nenhum ponto encontrado com os filtros selecionados.
          </p>
        ) : (
          filteredPontos.map((ponto) => (
            <PontoCard
              key={ponto.id}
              ponto={ponto}
              necessidades={needsByPonto.get(ponto.id) || []}
            />
          ))
        )}
      </div>
    </div>
  );
}
