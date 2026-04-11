import { PublicNavbar } from "@/app/(public)/_components/PublicNavbar";
import Footer from "@/app/(public)/_components/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Link de acessibilidade: permite pular a navegação e ir direto ao conteúdo */}
      <a href="#main-content" className="skip-nav-link">
        Pular para o conteúdo principal
      </a>
      <div className="mx-auto w-full flex-1 h-[calc(100vh-72px-330px)]">
        <PublicNavbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
