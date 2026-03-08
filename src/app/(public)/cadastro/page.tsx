import Link from "next/link";
import { H1, Paragraph, Span } from "@/components/ui/Typography";
import { SignupForm } from "@cadastro/_components/SignupForm";
import { ArrowLeft } from "lucide-react";

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-background text-neutral-950 dark:text-neutral-50">
      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className=" absolute -top-1/2 -right-1/4 w-[800px] h-[800px]
          rounded-full bg-primary-green-base/10 dark:bg-primary-green-base/5
            blur-3xl"
        />
        <div
          className=" absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px]
            rounded-full bg-secondary-pink-base/10 dark:bg-secondary-pink-base/5
            blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium
              text-text-muted hover:text-neutral-950 dark:hover:text-neutral-50
              transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para home
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-12 animate-fadeIn">
          <H1 className="mb-4">
            Garanta seu lugar no{" "}
            <Span
              className="
                bg-clip-text text-transparent
                bg-linear-to-r from-primary-green-base to-primary-green-lighter-1
              "
            >
              Happy Game
            </Span>
          </H1>
          <Paragraph
            variant="text1"
            className="text-text-muted max-w-2xl mx-auto"
          >
            Junte-se à lista de espera e seja um dos primeiros a explorar a nova
            comunidade gamer
          </Paragraph>
        </header>

        {/* Form Card */}
        <div
          className="
            max-w-3xl mx-auto p-6 md:p-10 rounded-2xl
            bg-background-primary/50 dark:bg-background-primary/30 backdrop-blur-sm
            border border-border shadow-x animate-fadeIn
          "
          style={{
            animationDelay: "0.1s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <SignupForm />
        </div>

        {/* Ja tem uma conta*/}
        <div
          className="text-center mt-8 animate-fadeIn"
          style={{
            animationDelay: "0.2s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <Paragraph className="text-text-muted">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-green-lighter-1
              transition-colors duration-200
              "
            >
              Entre aqui
            </Link>
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
