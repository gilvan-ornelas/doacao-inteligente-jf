"use client";

import type { Necessidade } from "@/shared/db/schema";
import { Badge } from "@/shared/components/ui/badge";
import { statusConfig } from "../utils";

interface Props {
  necessidades: Necessidade[];
}

export function NeedsColumns({ necessidades }: Props) {
  const urgente = necessidades.filter((n) => n.status === "URGENTE");
  const precisa = necessidades.filter((n) => n.status === "PRECISA");
  const ok = necessidades.filter((n) => n.status === "OK");

  const columns = [
    { status: "URGENTE" as const, items: urgente },
    { status: "PRECISA" as const, items: precisa },
    { status: "OK" as const, items: ok },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {columns.map(({ status, items }) => {
        if (items.length === 0) return null;
        const config = statusConfig(status);
        return (
          <div key={status} className="space-y-2">
            <Badge className={`${config.colorClass} border`}>
              {config.label} ({items.length})
            </Badge>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id} className="text-sm">
                  <span className="font-medium">{item.categoria}:</span>{" "}
                  {item.item}
                  {item.observacao && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({item.observacao})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
