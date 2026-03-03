"use client";

import { useState } from "react";
import type { Necessidade } from "@/shared/db/schema";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Copy, Check } from "lucide-react";

interface Props {
  items: Necessidade[];
  pontoNome: string;
}

export function CopyableList({ items, pontoNome }: Props) {
  const [copied, setCopied] = useState(false);

  const text = items
    .map((n) => {
      const emoji = n.status === "URGENTE" ? "\u{1F534}" : "\u{1F7E1}";
      return `${emoji} ${n.status} \u2022 ${n.categoria}: ${n.item}`;
    })
    .join("\n");

  const fullText = `${pontoNome}\n${"=".repeat(pontoNome.length)}\n${text}`;

  function handleCopy() {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-3 space-y-2">
      <Textarea
        readOnly
        value={fullText}
        rows={Math.min(items.length + 2, 8)}
        className="text-xs font-mono resize-none bg-muted/50"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="w-full sm:w-auto min-h-[44px] gap-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copiar lista
          </>
        )}
      </Button>
    </div>
  );
}
