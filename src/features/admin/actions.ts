"use server";

import { revalidatePath } from "next/cache";
import { verifyPassword, setAdminSession, clearAdminSession } from "@/shared/auth";
import { upsertPonto, addNecessidade, setPontoAtivo } from "@/shared/db/mutations";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  if (!password || !verifyPassword(password)) {
    return { error: "Senha incorreta." };
  }
  await setAdminSession();
  revalidatePath("/admin");
  return { success: true };
}

export async function logoutAction() {
  await clearAdminSession();
  revalidatePath("/admin");
}

export async function savePontoAction(formData: FormData) {
  const data = {
    id: formData.get("id") as string,
    nome: formData.get("nome") as string,
    tipo: formData.get("tipo") as string,
    bairro: formData.get("bairro") as string,
    endereco: formData.get("endereco") as string,
    horario: formData.get("horario") as string,
    contato_nome: formData.get("contato_nome") as string,
    contato_whats: formData.get("contato_whats") as string,
    ativo: formData.get("ativo") === "on" ? 1 : 0,
  };

  if (!data.id || !data.nome) {
    return { error: "ID e Nome são obrigatórios." };
  }

  await upsertPonto(data);
  revalidatePath("/pontos");
  revalidatePath("/admin");
  return { success: true };
}

export async function addNeedAction(formData: FormData) {
  const data = {
    ponto_id: formData.get("ponto_id") as string,
    categoria: formData.get("categoria") as string,
    item: formData.get("item") as string,
    status: formData.get("status") as string,
    observacao: (formData.get("observacao") as string) || "",
    updated_by: (formData.get("updated_by") as string) || "",
  };

  if (!data.ponto_id || !data.categoria || !data.item || !data.status) {
    return { error: "Ponto, Categoria, Item e Status são obrigatórios." };
  }

  await addNecessidade(data);
  revalidatePath("/pontos");
  revalidatePath("/admin");
  return { success: true };
}

export async function togglePontoAction(pontoId: string, ativo: number) {
  await setPontoAtivo(pontoId, ativo);
  revalidatePath("/pontos");
  revalidatePath("/admin");
  return { success: true };
}
