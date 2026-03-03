import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-6 mt-12">
      <div className="mx-auto max-w-5xl px-4 flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <p>
          Idealizado por{" "}
          <span className="font-medium text-foreground">
            Thais Salzer Procópio
          </span>
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/gilvan-ornelas/doacao-inteligente-jf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            Código aberto
          </a>
        </div>
      </div>
    </footer>
  );
}
