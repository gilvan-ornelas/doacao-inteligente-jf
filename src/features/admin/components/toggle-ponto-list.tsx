"use client";

import { useTransition } from "react";
import type { Ponto } from "@/shared/db/schema";
import { togglePontoAction } from "../actions";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface Props {
  pontos: Ponto[];
}

export function TogglePontoList({ pontos }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleToggle(pontoId: string, currentAtivo: number) {
    startTransition(async () => {
      await togglePontoAction(pontoId, currentAtivo === 1 ? 0 : 1);
    });
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Ativar / Desativar Pontos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {pontos.map((ponto) => (
            <li
              key={ponto.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{ponto.nome}</p>
                <p className="text-xs text-muted-foreground">{ponto.bairro}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  className={
                    ponto.ativo === 1
                      ? "bg-status-ok/20 text-status-ok border border-status-ok/30"
                      : "bg-muted text-muted-foreground border border-border"
                  }
                >
                  {ponto.ativo === 1 ? "Ativo" : "Inativo"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-[44px] min-w-[90px]"
                  disabled={isPending}
                  onClick={() => handleToggle(ponto.id, ponto.ativo)}
                >
                  {ponto.ativo === 1 ? "Desativar" : "Ativar"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
