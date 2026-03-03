import { isAdminLoggedIn } from "@/shared/auth";
import { listAllPontos } from "@/features/admin/queries";
import { LoginForm } from "@/features/admin/components/login-form";
import { AdminPanel } from "@/features/admin/components/admin-panel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-bold text-center mb-6">Área Admin</h1>
        <LoginForm />
      </div>
    );
  }

  const allPontos = await listAllPontos();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold md:text-3xl">Área Admin</h1>
      <AdminPanel pontos={allPontos} />
    </div>
  );
}
