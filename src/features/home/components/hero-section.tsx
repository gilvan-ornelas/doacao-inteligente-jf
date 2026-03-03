import { Badge } from "@/shared/components/ui/badge";
import { MapPin, Clock, AlertCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          Doação Inteligente{" "}
          <span className="text-primary">para JF</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Conectando quem quer ajudar com quem precisa de ajuda em Juiz de Fora
        </p>
        <p className="mt-3 text-base text-muted-foreground">
          Saiba exatamente o que doar e onde entregar. Informações atualizadas
          em tempo real por voluntários e coordenadores.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
            <MapPin className="h-3.5 w-3.5" />
            Pontos de coleta mapeados
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
            <Clock className="h-3.5 w-3.5" />
            Atualização em tempo real
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
            <AlertCircle className="h-3.5 w-3.5" />
            Prioridade por urgência
          </Badge>
        </div>
      </div>
    </section>
  );
}
