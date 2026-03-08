import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { H1, H2, H3 } from "@components/ui/Typography";
import { LogoutButton } from "@perfil/_components/LogoutButton";

export default async function Perfil() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-color-background text-neutral-950 dark:text-neutral-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <H1 className="text-neutral-950 dark:text-white mb-8">Meu Perfil</H1>

        <div className="bg-background-primary dark:bg-neutral-900 rounded-lg border border-border p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {user.image && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary-green-base">
                <Image
                  src={user.image}
                  alt={user.name || "Avatar"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <H2 className="text-neutral-950 dark:text-white mb-2">
                  {user.name || "Usuário"}
                </H2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <LogoutButton />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <H3 className="text-neutral-950 dark:text-white mb-4">
              Informações da Conta
            </H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-neutral-600 dark:text-neutral-400">
                  ID do Usuário
                </label>
                <div className="text-neutral-950 dark:text-white font-mono text-sm bg-background-secondary dark:bg-neutral-800 p-2 rounded">
                  {user.id}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-600 dark:text-neutral-400">
                  Nome
                </label>
                <div className="text-neutral-950 dark:text-white p-2 bg-background-secondary dark:bg-neutral-800 rounded">
                  {user.name || "Não informado"}
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-neutral-600 dark:text-neutral-400">
                  Email
                </label>
                <div className="text-neutral-950 dark:text-white p-2 bg-background-secondary dark:bg-neutral-800 rounded">
                  {user.email || "Não informado"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
