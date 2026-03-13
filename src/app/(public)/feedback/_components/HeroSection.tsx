"use client";

import { Check } from "lucide-react";
import { H1, Paragraph, Span } from "@/components/ui/Typography";
import type { Platform } from "@cadastro/types";

interface HeroSectionProps {
  fullName: string;
  platform: Platform;
}

// Get platform-specific description using switch/case
function getPlatformDescription(platform: Platform): string {
  switch (platform) {
    case "pc":
      return "Prepare-se para uma experiência épica no mundo dos games para PC!";
    case "console":
      return "Relaxe e aproveite os melhores jogos no conforto do seu sofá!";
    case "mobile":
      return "Jogue onde estiver e conecte-se com gamers do mundo todo!";
    case "retro":
      return "Reviva os clássicos que marcaram gerações de jogadores!";
    default:
      return "Parabéns! Você agora faz parte da nossa comunidade de gamers.";
  }
}

export function HeroSection({ fullName, platform }: HeroSectionProps) {
  const description = getPlatformDescription(platform);

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-20 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary-green-base/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary-pink-base/20 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Success Icon */}
          <div className="mb-8 inline-flex animate-bounce-slow">
            <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-primary text-primary-foreground shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />

              {/* Icon */}
              <Check className="relative h-12 w-12" strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <H1 className="mb-6 animate-fadeIn">
            Bem-vindo(a),{" "}
            <Span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-green-base to-primary-green-lighter-1">
              {fullName}!
            </Span>
          </H1>

          {/* Description */}
          <Paragraph
            variant="text1"
            className="text-text-muted mb-8 animate-fadeIn"
            style={{
              animationDelay: "0.2s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            {description}
          </Paragraph>

          {/* Success Badge */}
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 animate-fadeIn"
            style={{
              animationDelay: "0.4s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <Check className="h-5 w-5 text-primary" />
            <Span weight="bold" className="text-primary">
              Cadastro realizado com sucesso!
            </Span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
