"use client";

import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { H3, Paragraph } from "@/components/ui/Typography";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-background to-background-primary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Title */}
          <H3 className="mb-6 animate-fadeIn">
            Siga nossa jornada nas redes sociais
          </H3>

          {/* Description */}
          <Paragraph
            variant="text1"
            className="text-text-muted mb-8 animate-fadeIn"
            style={{
              animationDelay: "0.1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Fique por dentro de todas as novidades, lançamentos e eventos
            exclusivos da nossa comunidade gamer. Acompanhe nosso conteúdo e
            faça parte dessa história épica!
          </Paragraph>

          {/* CTA Button */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn"
            style={{
              animationDelay: "0.2s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <Button size="large" asChild>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" inline-flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                Seguir no Instagram
              </a>
            </Button>

            <Button size="large" variant="secondary" asChild>
              <Link href="/">Voltar para Home</Link>
            </Button>
          </div>

          {/* Success Message */}
          <div
            className=" mt-12 p-6 rounded-2xl border border-border animate-fadeIn"
            style={{
              animationDelay: "0.3s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <Paragraph className="text-text-muted">
              📧 <strong>Fique atento!</strong> Em breve você receberá um e-mail
              com mais informações sobre como participar da nossa comunidade.
            </Paragraph>
          </div>
        </div>
      </div>
    </section>
  );
}
