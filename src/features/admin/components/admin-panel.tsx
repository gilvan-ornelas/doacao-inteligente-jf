"use client";

import type { Ponto } from "@/shared/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import { PontoForm } from "./ponto-form";
import { NeedsForm } from "./needs-form";
import { TogglePontoList } from "./toggle-ponto-list";
import { logoutAction } from "../actions";
import { LogOut } from "lucide-react";

interface Props {
  pontos: Ponto[];
}

export function AdminPanel({ pontos }: Props) {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-end">
        <form action={logoutAction}>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </form>
      </div>

      <Tabs defaultValue="ponto" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="ponto" className="text-xs sm:text-sm">
            Cadastrar Ponto
          </TabsTrigger>
          <TabsTrigger value="needs" className="text-xs sm:text-sm">
            Necessidades
          </TabsTrigger>
          <TabsTrigger value="toggle" className="text-xs sm:text-sm">
            Ativar/Desativar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ponto" className="mt-4">
          <PontoForm />
        </TabsContent>

        <TabsContent value="needs" className="mt-4">
          <NeedsForm pontos={pontos} />
        </TabsContent>

        <TabsContent value="toggle" className="mt-4">
          <TogglePontoList pontos={pontos} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
