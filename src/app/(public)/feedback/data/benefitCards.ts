import type { BenefitCard } from "@feedback/types";
import type { Genre } from "@cadastro/types";

// Fixed cards that appear for everyone
export const fixedCards: BenefitCard[] = [
  {
    icon: "Users",
    title: "Comunidade Ativa",
    description:
      "Conecte-se com gamers do mundo todo e compartilhe suas experiências",
  },
  {
    icon: "Trophy",
    title: "Conquistas Exclusivas",
    description:
      "Desbloqueie badges e recompensas especiais participando da comunidade",
  },
  {
    icon: "Calendar",
    title: "Eventos Especiais",
    description:
      "Acesso prioritário a torneios, lives e encontros com outros gamers",
  },
];

// Genre-specific cards
export const cardsByGenre: Record<Genre, BenefitCard> = {
  rpg: {
    icon: "Sword",
    title: "Mundo RPG",
    description:
      "Explore mundos épicos e compartilhe suas aventuras com outros fãs de RPG",
  },
  indie: {
    icon: "Sparkles",
    title: "Indie Lovers",
    description:
      "Descubra joias escondidas e apoie desenvolvedores independentes",
  },
  fps: {
    icon: "Target",
    title: "FPS Arena",
    description:
      "Entre em partidas competitivas e melhore suas habilidades em FPS",
  },
  sports: {
    icon: "Medal",
    title: "Sports Champions",
    description:
      "Participe de campeonatos virtuais e mostre suas habilidades esportivas",
  },
  moba: {
    icon: "Swords",
    title: "MOBA Masters",
    description:
      "Forme times estratégicos e domine a arena com outros jogadores",
  },
  other: {
    icon: "Gamepad2",
    title: "Gamer Versátil",
    description:
      "Explore todos os gêneros e descubra novas experiências de jogo",
  },
};
