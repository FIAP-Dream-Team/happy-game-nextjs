"use client";

import { useEffect, useState } from "react";
import { Paragraph, Span } from "@/components/ui/Typography";

export function FloatingBalloon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay antes de mostrar o balão
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed bottom-8 right-8 z-40
        transform transition-all duration-1000 ease-out
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
      `}
    >
      <div className="relative bg-linear-to-br from-purple-600 via-pink-500 to-red-500 rounded-xl shadow-2xl p-3 max-w-[200px] animate-float hover:scale-105 transition-transform duration-300 cursor-default">
        {/* Brilho animado */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />

        {/* Conteúdo */}
        <div className="relative z-10 text-center">
          <Paragraph variant="text4" weight="bold" className="text-white leading-relaxed drop-shadow-lg">
            Pressione{" "}
            <Span className="inline-block animate-bounce mx-1">↑</Span>
            <Span
              className="inline-block animate-bounce mx-1"
              style={{ animationDelay: "0.1s" }}
            >
              ↑
            </Span>
            <Span
              className="inline-block animate-bounce mx-1"
              style={{ animationDelay: "0.2s" }}
            >
              ↓
            </Span>
            <Span
              className="inline-block animate-bounce mx-1"
              style={{ animationDelay: "0.3s" }}
            >
              ↓
            </Span>
            <Span
              className="inline-block animate-bounce mx-1"
              style={{ animationDelay: "0.4s" }}
            >
              ←
            </Span>
            <Span
              className="inline-block animate-bounce mx-1"
              style={{ animationDelay: "0.5s" }}
            >
              →
            </Span>
            <br />
            <Span variant="text3" className="text-yellow-300">🎮</Span> e descubra uma
            surpresa!
          </Paragraph>
        </div>

        <div className="absolute bottom-0 right-8 transform translate-y-full">
          <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-red-500" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
