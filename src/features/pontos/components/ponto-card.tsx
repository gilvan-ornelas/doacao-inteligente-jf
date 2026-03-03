"use client";

import type { Ponto, Necessidade } from "@/shared/db/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { MapPin, Clock, Phone, MessageCircle, Navigation } from "lucide-react";
import { googleMapsUrl, whatsappUrl, humanHoursAgo } from "@/shared/utils";
import { NeedsColumns } from "./needs-columns";
import { CopyableList } from "./copyable-list";

interface Props {
  ponto: Ponto;
  necessidades: Necessidade[];
}

export function PontoCard({ ponto, necessidades }: Props) {
  const lastUpdate = necessidades.length > 0 ? necessidades[0].updated_at : null;

  const urgentes = necessidades.filter((n) => n.status === "URGENTE");
  const precisa = necessidades.filter((n) => n.status === "PRECISA");
  const copyItems = [...urgentes, ...precisa];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{ponto.nome}</CardTitle>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {ponto.tipo}
              </Badge>
              {ponto.bairro !== "\u2014" && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {ponto.bairro}
                </span>
              )}
            </div>
          </div>
          {lastUpdate && (
            <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
              <Clock className="h-3 w-3" />
              {humanHoursAgo(lastUpdate)}
            </span>
          )}
        </div>

        {/* Address & hours */}
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          {ponto.endereco !== "\u2014" && <p>{ponto.endereco}</p>}
          {ponto.horario !== "\u2014" && (
            <p className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {ponto.horario}
            </p>
          )}
          {ponto.contato_nome !== "Oficial" && ponto.contato_nome && (
            <p className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {ponto.contato_nome}
            </p>
          )}
        </div>

        {/* Action buttons — full-width on mobile */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          {ponto.endereco !== "\u2014" && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full sm:w-auto min-h-[44px] gap-2"
            >
              <a
                href={googleMapsUrl(ponto.endereco)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" />
                Google Maps
              </a>
            </Button>
          )}
          {ponto.contato_whats && (
            <Button
              asChild
              size="sm"
              className="w-full sm:w-auto min-h-[44px] gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <a
                href={whatsappUrl(
                  ponto.contato_whats,
                  `Olá! Vi no Doação Inteligente JF que o ponto "${ponto.nome}" está recebendo doações.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          )}
        </div>
      </CardHeader>

      {necessidades.length > 0 && (
        <CardContent className="pt-0">
          <NeedsColumns necessidades={necessidades} />
          {copyItems.length > 0 && (
            <CopyableList items={copyItems} pontoNome={ponto.nome} />
          )}
        </CardContent>
      )}
    </Card>
  );
}
