import { Badge } from "@/shared/components/ui/badge";
import { MapPin, AlertTriangle } from "lucide-react";

interface Props {
  pontosCount: number;
  urgenteCount: number;
}

export function StatsBar({ pontosCount, urgenteCount }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
        <MapPin className="h-3.5 w-3.5" />
        {pontosCount} ponto{pontosCount !== 1 ? "s" : ""} exibido
        {pontosCount !== 1 ? "s" : ""}
      </Badge>
      {urgenteCount > 0 && (
        <Badge className="gap-1.5 px-3 py-1.5 bg-status-urgente/20 text-status-urgente border border-status-urgente/30">
          <AlertTriangle className="h-3.5 w-3.5" />
          {urgenteCount} ite{urgenteCount !== 1 ? "ns" : "m"} URGENTE
          {urgenteCount !== 1 ? "S" : ""}
        </Badge>
      )}
    </div>
  );
}
