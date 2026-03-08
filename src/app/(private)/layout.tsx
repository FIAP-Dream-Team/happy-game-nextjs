import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrivateNavbar } from "@privateComponents/PrivateNavbar";
import { PrivateAside } from "@privateComponents/PrivateAside";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <PrivateNavbar session={session} />
      <div className="mx-auto flex w-full flex-1 gap-10 pt-10 pb-[80px] px-4 md:px-[72px] ">
        <main className="flex-1 md:border-r border-border-primary md:pr-10">
          {children}
        </main>
        <PrivateAside />
      </div>
    </div>
  );
}
