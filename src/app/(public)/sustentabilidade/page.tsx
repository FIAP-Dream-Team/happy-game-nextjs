import { EnergyCalculator } from "./_components/EnergyCalculator";
import { H1, H2, Paragraph } from "@/components/ui/Typography";
import { Leaf } from "lucide-react";

export const metadata = {
  title: "Sustentabilidade & ESG | Happy Game",
  description:
    "Conheça os objetivos ESG da Happy Game, analise o impacto digital do gaming e calcule sua pegada de carbono como gamer.",
};

const DIGITAL_FACTS = [
  {
    value: "3,5%",
    label: "da eletricidade mundial é consumida por data centers",
  },
  { value: "~100W", label: "consome um PC gamer em sessão de jogo pesado" },
  { value: "83%", label: "da matriz elétrica brasileira é renovável" },
  {
    value: "1 árvore",
    label: "absorve ~22 kg de CO₂/ano — equivale a ~297 horas de PC gamer",
  },
];

export default function SustentabilidadePage() {
  return (
    <div className="min-h-screen bg-background space-y-16 pb-16">
      {/* Hero */}
      <section
        aria-labelledby="esg-hero-title"
        className="bg-background-secondary pt-24 pb-12"
        style={{ background: "var(--gradient-sustainability)" }}
      >
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-neutral-50" aria-hidden />
          </div>
          <H1 id="esg-hero-title" className="text-neutral-50 mb-4">
            Sustentabilidade & ESG
          </H1>
          <Paragraph
            variant="text1"
            className="text-neutral-100 max-w-2xl mx-auto"
          >
            A Happy Game acredita que gaming responsável começa com uma
            plataforma que respeita pessoas e o planeta. Conheça nossos
            objetivos, nossa análise crítica e calcule seu impacto digital.
          </Paragraph>
        </div>
      </section>

      {/* Fatos sobre impacto digital */}
      <section
        aria-labelledby="digital-facts-title"
        className="max-w-[1320px] mx-auto px-6"
      >
        <H2 id="digital-facts-title" className="text-center mb-8">
          O Impacto Digital do Gaming
        </H2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {DIGITAL_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-border-primary bg-surface-neutral p-6 text-center"
            >
              <p className="font-heading text-3xl font-bold text-text-highlight-purple mb-2">
                {fact.value}
              </p>
              <p className="text-sm text-text-tertiary">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculadora */}
      <section className="max-w-[1320px] mx-auto px-6">
        <EnergyCalculator />
      </section>

      {/* CTA educacional */}
      <section
        aria-labelledby="tips-title"
        className="max-w-[1320px] mx-auto px-6"
      >
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{ background: "var(--gradient-sustainability)" }}
        >
          <H2 id="tips-title" className="text-neutral-50 mb-6 text-center">
            Como Jogar de Forma Mais Sustentável
          </H2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Ative o modo de economia de energia no seu console ou PC",
              "Use o modo escuro — economiza energia em telas OLED/AMOLED",
              "Configure o desligamento automático após inatividade",
              "Prefira jogos digitais — elimina emissões de fabricação e transporte",
              "Compartilhe sessões de jogo em vez de manter múltiplos dispositivos ligados",
              "Atualize drivers e SO — versões otimizadas consomem menos recursos",
            ].map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-3 bg-white/10 rounded-xl p-4"
              >
                <Leaf
                  className="h-4 w-4 text-neutral-50 shrink-0 mt-0.5"
                  aria-hidden
                />
                <p className="text-sm text-neutral-100">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
