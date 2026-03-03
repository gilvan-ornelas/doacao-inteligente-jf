"use client";

import type { Ponto } from "@/shared/db/schema";
import { CATEGORIAS, STATUS_OPTIONS } from "@/shared/constants";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Slider } from "@/shared/components/ui/slider";
import { Badge } from "@/shared/components/ui/badge";
import { X } from "lucide-react";

interface Props {
  pontos: Ponto[];
  bairros: string[];
  selectedPontoIds: string[];
  onSelectedPontosChange: (ids: string[]) => void;
  categoria: string;
  onCategoriaChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  bairro: string;
  onBairroChange: (v: string) => void;
  maxHours: number;
  onMaxHoursChange: (v: number) => void;
}

export function PontoFilters({
  pontos,
  bairros,
  selectedPontoIds,
  onSelectedPontosChange,
  categoria,
  onCategoriaChange,
  status,
  onStatusChange,
  bairro,
  onBairroChange,
  maxHours,
  onMaxHoursChange,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Pontos multiselect */}
      <div className="space-y-2">
        <Label className="text-sm">Pontos</Label>
        <Select
          value=""
          onValueChange={(id) => {
            if (!selectedPontoIds.includes(id)) {
              onSelectedPontosChange([...selectedPontoIds, id]);
            }
          }}
        >
          <SelectTrigger className="w-full min-h-[44px]">
            <SelectValue placeholder="Todos os pontos" />
          </SelectTrigger>
          <SelectContent>
            {pontos.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedPontoIds.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selectedPontoIds.map((id) => {
              const ponto = pontos.find((p) => p.id === id);
              return (
                <Badge
                  key={id}
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer"
                  onClick={() =>
                    onSelectedPontosChange(
                      selectedPontoIds.filter((i) => i !== id)
                    )
                  }
                >
                  {ponto?.nome ?? id}
                  <X className="h-3 w-3" />
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label className="text-sm">Categoria</Label>
        <Select value={categoria} onValueChange={(v) => onCategoriaChange(v === "all" ? "" : v)}>
          <SelectTrigger className="w-full min-h-[44px]">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {CATEGORIAS.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label className="text-sm">Status</Label>
        <Select value={status} onValueChange={(v) => onStatusChange(v === "all" ? "" : v)}>
          <SelectTrigger className="w-full min-h-[44px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bairro */}
      <div className="space-y-2">
        <Label className="text-sm">Bairro / Região</Label>
        <Select value={bairro} onValueChange={(v) => onBairroChange(v === "all" ? "" : v)}>
          <SelectTrigger className="w-full min-h-[44px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {bairros.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Recency slider */}
      <div className="space-y-2">
        <Label className="text-sm">
          Atualizado nas últimas {maxHours}h
        </Label>
        <Slider
          value={[maxHours]}
          onValueChange={([v]) => onMaxHoursChange(v)}
          min={1}
          max={168}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}
