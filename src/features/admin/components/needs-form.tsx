"use client";

import { useActionState } from "react";
import { addNeedAction } from "../actions";
import type { Ponto } from "@/shared/db/schema";
import { CATEGORIAS, STATUS_OPTIONS } from "@/shared/constants";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface Props {
  pontos: Ponto[];
}

export function NeedsForm({ pontos }: Props) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      return addNeedAction(formData);
    },
    null
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Atualizar Necessidades</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nf-ponto">Ponto</Label>
            <Select name="ponto_id" required>
              <SelectTrigger className="min-h-[44px]">
                <SelectValue placeholder="Selecione um ponto" />
              </SelectTrigger>
              <SelectContent>
                {pontos.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.nome} {p.ativo === 0 ? "(inativo)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nf-categoria">Categoria</Label>
              <Select name="categoria" required>
                <SelectTrigger className="min-h-[44px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nf-status">Status</Label>
              <Select name="status" required>
                <SelectTrigger className="min-h-[44px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nf-item">Item</Label>
            <Input id="nf-item" name="item" placeholder="Ex: Água mineral 1,5L" required className="min-h-[44px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nf-obs">Observação</Label>
            <Textarea id="nf-obs" name="observacao" placeholder="Opcional..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nf-by">Atualizado por</Label>
            <Input id="nf-by" name="updated_by" placeholder="Seu nome" className="min-h-[44px]" />
          </div>

          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-status-ok">Necessidade adicionada!</p>
          )}

          <Button type="submit" className="w-full min-h-[44px]" disabled={pending}>
            {pending ? "Salvando..." : "Adicionar Necessidade"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
