"use client";

import { useActionState } from "react";
import { savePontoAction } from "../actions";
import { TIPOS_PONTO } from "@/shared/constants";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function PontoForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      return savePontoAction(formData);
    },
    null
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Cadastrar / Editar Ponto</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pf-id">ID</Label>
              <Input id="pf-id" name="id" placeholder="ex: meu_ponto_01" required className="min-h-[44px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-nome">Nome</Label>
              <Input id="pf-nome" name="nome" placeholder="Nome do ponto" required className="min-h-[44px]" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pf-tipo">Tipo</Label>
            <Select name="tipo" defaultValue="Ponto de arrecadação">
              <SelectTrigger className="min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_PONTO.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pf-bairro">Bairro</Label>
              <Input id="pf-bairro" name="bairro" placeholder="Centro" required className="min-h-[44px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-endereco">Endereço</Label>
              <Input id="pf-endereco" name="endereco" placeholder="Rua ..." required className="min-h-[44px]" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pf-horario">Horário</Label>
              <Input id="pf-horario" name="horario" placeholder="09:00–18:00" required className="min-h-[44px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-contato-nome">Contato (nome)</Label>
              <Input id="pf-contato-nome" name="contato_nome" placeholder="João" required className="min-h-[44px]" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pf-contato-whats">Contato (WhatsApp)</Label>
            <Input id="pf-contato-whats" name="contato_whats" placeholder="32999999999" className="min-h-[44px]" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="pf-ativo" name="ativo" defaultChecked className="h-4 w-4" />
            <Label htmlFor="pf-ativo">Ativo</Label>
          </div>

          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-status-ok">Ponto salvo com sucesso!</p>
          )}

          <Button type="submit" className="w-full min-h-[44px]" disabled={pending}>
            {pending ? "Salvando..." : "Salvar Ponto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
