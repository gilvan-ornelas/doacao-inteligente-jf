import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Compass, Eye, Zap } from "lucide-react";

const CARDS = [
  {
    icon: Compass,
    title: "Direcionamento",
    description:
      "Saiba exatamente onde ir e o que levar. Cada ponto mostra os itens que realmente precisa.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description:
      "Informações atualizadas por voluntários em campo. Veja o status de cada necessidade.",
  },
  {
    icon: Zap,
    title: "Praticidade",
    description:
      "Links diretos para WhatsApp e Google Maps. Doe com poucos toques no celular.",
  },
];

export function HighlightCards() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((card) => (
          <Card key={card.title} className="bg-card border-border">
            <CardHeader>
              <card.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
