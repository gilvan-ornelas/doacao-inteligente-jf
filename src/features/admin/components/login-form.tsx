"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Lock } from "lucide-react";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return loginAction(formData);
    },
    null
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader className="text-center">
        <Lock className="h-8 w-8 mx-auto text-primary mb-2" />
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite a senha de admin"
              required
              className="min-h-[44px]"
            />
          </div>
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <Button type="submit" className="w-full min-h-[44px]" disabled={pending}>
            {pending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
