"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { H1, Paragraph } from "@/components/ui/Typography";
import { Mail } from "lucide-react";

export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-primary p-[50px] rounded-md flex flex-col gap-6">
        <div className="text-center flex flex-col gap-4">
          <H1 className="text-text-surface-primary">Bem-vindo de volta!</H1>
          <Paragraph className="text-text-surface-secondary">
            Entre na sua conta e continue explorando a comunidade gamer.
          </Paragraph>
        </div>

        <Button
          onClick={() => signIn("google", { callbackUrl: "/feed" })}
          className="w-full"
          size="large"
        >
          <Mail className="h-5 w-5" />
          Continuar com Google
        </Button>
      </div>
    </div>
  );
}
