"use client";

import {
  Users,
  Trophy,
  Calendar,
  Sword,
  Sparkles,
  Target,
  Medal,
  Swords,
  Gamepad2,
} from "lucide-react";
import { H2, H3, Paragraph } from "@/components/ui/Typography";
import type { BenefitCard } from "@feedback/types";
import type { Genre } from "@cadastro/types";
import { fixedCards, cardsByGenre } from "@feedback/data/benefitCards";

interface BenefitsSectionProps {
  genres: Genre[];
}

// Map icon strings to Lucide components
const iconMap = {
  Users,
  Trophy,
  Calendar,
  Sword,
  Sparkles,
  Target,
  Medal,
  Swords,
  Gamepad2,
};

function BenefitCardComponent({
  card,
  index,
}: {
  card: BenefitCard;
  index: number;
}) {
  const IconComponent = iconMap[card.icon as keyof typeof iconMap];

  return (
    <div
      className="group p-6 rounded-2xl border border-border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 animate-fadeIn"
      style={{
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      {/* Icon */}
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
        {IconComponent && (
          <IconComponent className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
        )}
      </div>

      {/* Title */}
      <H3 className="mb-3">{card.title}</H3>

      {/* Description */}
      <Paragraph className="text-text-muted leading-relaxed">
        {card.description}
      </Paragraph>
    </div>
  );
}

export function BenefitsSection({ genres }: BenefitsSectionProps) {
  // Combine fixed cards with genre-specific cards
  const allCards: BenefitCard[] = [...fixedCards];

  genres.forEach((genre) => {
    const genreCard = cardsByGenre[genre];
    if (genreCard) {
      allCards.push(genreCard);
    }
  });

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider text-primary">
              Benefícios Exclusivos
            </div>

            <H2 className="mb-4">O que te aguarda na comunidade</H2>

            <Paragraph
              variant="text1"
              className="text-text-muted max-w-2xl mx-auto"
            >
              Seja um dos pioneiros a construir a comunidade que vai preservar o
              passado, viver o presente e criar o futuro dos videogames.
            </Paragraph>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCards.map((card, index) => (
              <BenefitCardComponent key={index} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
