import { Button } from "@/shared/components/ui/button";
import { Github } from "lucide-react";

export function DevBanner() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <h2 className="text-lg font-semibold">Projeto de Código Aberto</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Desenvolvido com carinho para ajudar Juiz de Fora. Contribua no GitHub!
        </p>
        <Button asChild variant="outline" className="mt-4 min-h-[44px]">
          <a
            href="https://github.com/gilvan-ornelas/doacao-inteligente-jf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            Contribuir no GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
