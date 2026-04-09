export type RawgGameGenre = {
  name: string;
};

export type RawgGamePlatform = {
  platform: {
    name: string;
  };
};

export type RawgGame = {
  id: number;
  name: string;
  slug: string;
  genres: RawgGameGenre[];
  short_description: string;
  description_raw: string;
  background_image: string;
  metacritic: number | null;
  released: string; // YYYY-MM-DD
  playtime: number; // hours base (mock)
  platforms: RawgGamePlatform[];
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const games: RawgGame[] = [
  {
    id: 3498,
    name: "Resident Evil Requiem",
    slug: slugify("Resident Evil Requiem"),
    genres: [{ name: "Survival Horror" }, { name: "Aventura" }],
    short_description:
      "Sobrevivência em estado puro: recursos escassos, tensão constante e decisões que mudam o destino no universo de Requiem.",
    description_raw:
      "A exploração ganha um ritmo mais tenso e estratégico, com corredores que exigem leitura do ambiente e gerenciamento preciso de recursos. Cada área revela novas pistas, forçando o jogador a adaptar rotas e estratégias.\n\nA experiência acerta ao entregar um clima pesado e narrativas conectadas, mas também oferece espaço para quem busca desafios consistentes. O resultado é um jogo que prende pela atmosfera e recompensas de progressão, fazendo valer cada sessão.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Resident+Evil+Requiem",
    metacritic: 89,
    released: "2026-02-27",
    playtime: 13,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Xbox Series X" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3499,
    name: "Resident Evil: The Aftermath",
    slug: slugify("Resident Evil: The Aftermath"),
    genres: [{ name: "Survival Horror" }, { name: "Ação" }],
    short_description:
      "Uma nova ameaça surge enquanto antigas decisões ecoam. Sobreviva, investigue e avance em cenários interligados.",
    description_raw:
      "A progressão se apoia em exploração e revisitas, com pistas que afunilam o que realmente importa. O combate é mais cuidadoso e recompensa quem planeja antes de agir.\n\nVale a pena pela sensação de descoberta contínua e pela forma como a história se revela aos poucos. É aquele tipo de jogo que dá vontade de recomeçar para notar detalhes que passaram.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Resident+Evil+Aftermath",
    metacritic: 76,
    released: "2025-10-15",
    playtime: 11,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "Xbox Series X" } },
      { platform: { name: "PlayStation 5" } },
    ],
  },
  {
    id: 3500,
    name: "Elden Ring: Nightfall",
    slug: slugify("Elden Ring: Nightfall"),
    genres: [{ name: "RPG" }, { name: "Aventura" }],
    short_description:
      "Um mundo que não perdoa: novas rotas, chefes lendários e uma progressão que exige paciência e domínio.",
    description_raw:
      "O combate continua fluido, mas agora o jogo incentiva apostas inteligentes: recuos, leituras de padrão e controle de ritmo. Novas áreas ampliam a liberdade para construir seu caminho.\n\nA história é densa, mas recompensa curiosidade. Quem curte desafios consistentes vai encontrar horas de exploração que se conectam com a narrativa de forma orgânica.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Elden+Ring+Nightfall",
    metacritic: 92,
    released: "2026-01-08",
    playtime: 20,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Xbox Series X" } },
    ],
  },
  {
    id: 3501,
    name: "Baldur's Gate 3: Shadows",
    slug: slugify("Baldur's Gate 3: Shadows"),
    genres: [{ name: "RPG" }, { name: "Aventura" }],
    short_description:
      "Novas companhias, intrigas sombrias e decisões morais que mudam tudo. Escreva sua lenda em Faerun.",
    description_raw:
      "As quests reforçam a sensação de agência, com consequências claras e combinações de história que variam de acordo com o estilo de jogo. O ritmo é ágil e a exploração é recompensadora.\n\nÉ um jogo para quem gosta de conversas e estratégias. A narrativa se sustenta em encontros memoráveis e no modo como o mundo reage ao jogador.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Baldur%27s+Gate+3+Shadows",
    metacritic: 90,
    released: "2025-09-22",
    playtime: 18,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Xbox Series X" } },
    ],
  },
  {
    id: 3502,
    name: "Hades II: Deep Underworld",
    slug: slugify("Hades II: Deep Underworld"),
    genres: [{ name: "Roguelike" }, { name: "Aventura" }],
    short_description:
      "Morte, recomeço e evolução. Explore um submundo ainda mais profundo com builds personalizadas.",
    description_raw:
      "Os runs ficam cada vez mais estratégicos, com decisões de rota que afetam o estilo do combate. O jogo recompensa consistência sem matar a diversão com repetição.\n\nVale pela progressão satisfatória e pelo humor: cada novo encontro parece um convite para dominar melhor o sistema. É viciante do começo ao fim.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Hades+II+Deep+Underworld",
    metacritic: 86,
    released: "2025-11-30",
    playtime: 16,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3503,
    name: "Cyberpunk 2077: Neon Skyline",
    slug: slugify("Cyberpunk 2077: Neon Skyline"),
    genres: [{ name: "Ação" }, { name: "RPG" }],
    short_description:
      "Um novo horizonte na Night City. Personagens mais profundos e missões que deixam marcas permanentes.",
    description_raw:
      "A cidade ganha vida com novas áreas e rotas alternativas, reforçando a exploração e o planejamento. As missões se destacam por escolhas que alteram o desfecho.\n\nA experiência brilha pelo ritmo cinematográfico e pelo cuidado com detalhes. Para quem gosta de narrativa e combate responsivo, é uma adição forte à franquia.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Cyberpunk+Neon+Skyline",
    metacritic: 83,
    released: "2025-08-05",
    playtime: 14,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Xbox Series X" } },
    ],
  },
  {
    id: 3504,
    name: "The Witcher 3: Wild Reborn",
    slug: slugify("The Witcher 3: Wild Reborn"),
    genres: [{ name: "RPG" }, { name: "Aventura" }],
    short_description:
      "Um renascimento na jornada do caçador. O mundo volta com gráficos e missões que expandem a lenda.",
    description_raw:
      "A exploração segue recompensando com contratos bem desenhados e encontros que desviam do esperado. O combate permanece fluido e melhora com novas ferramentas.\n\nVale a pena pelo conjunto: histórias profundas e atmosfera impecável. É um retorno que faz sentido tanto para novos jogadores quanto para veteranos.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=The+Witcher+3+Wild+Reborn",
    metacritic: 91,
    released: "2026-03-04",
    playtime: 19,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3505,
    name: "Marvel's Spider-Man: Web of Fate",
    slug: slugify("Marvel's Spider-Man: Web of Fate"),
    genres: [{ name: "Ação" }, { name: "Aventura" }],
    short_description:
      "Balançar entre realidades e enfrentar ameaças impossíveis. Uma história com estilo e impacto.",
    description_raw:
      "As missões conectam traversal e combate com fluidez, deixando o ritmo sempre interessante. As habilidades novas criam variedade e mantêm o desafio.\n\nÉ um jogo que funciona por carisma e ritmo. As cenas quebras de tensão e o modo como o mundo reage ao jogador deixam a experiência leve, mas memorável.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Spider-Man+Web+of+Fate",
    metacritic: 85,
    released: "2026-02-02",
    playtime: 12,
    platforms: [
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "PC" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3506,
    name: "Doom Eternal: Inferno Protocol",
    slug: slugify("Doom Eternal: Inferno Protocol"),
    genres: [{ name: "Ação" }, { name: "Tiro" }],
    short_description:
      "Velocidade, glória e caos. Rasgue o inferno com armas futuristas e movimentos ainda mais agressivos.",
    description_raw:
      "O jogo mantém o foco em fluxo: acertar, se reposicionar e avançar sem perder ritmo. As arenas pedem domínio de movimento e leitura de alvos.\n\nVale pela intensidade constante e pela variedade de encontros. É perfeito para quem busca sessões curtas e explosivas com sensação de poder.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Doom+Inferno+Protocol",
    metacritic: 88,
    released: "2025-12-01",
    playtime: 10,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "Xbox Series X" } },
      { platform: { name: "PlayStation 5" } },
    ],
  },
  {
    id: 3507,
    name: "Dead Space: Axiom Remake",
    slug: slugify("Dead Space: Axiom Remake"),
    genres: [{ name: "Survival Horror" }, { name: "Sci-Fi" }],
    short_description:
      "No vazio, cada ruído custa caro. Horror no espaço com leitura de risco e tensão permanente.",
    description_raw:
      "A atmosfera é um personagem à parte: sons, iluminação e progressão criam momentos de pânico calculado. O jogo incentiva exploração para fortalecer defesas.\n\nVale a pena pela coragem de manter o medo em cada fase. A narrativa é coesa e a sensação de vulnerabilidade é constante.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Dead+Space+Axiom+Remake",
    metacritic: 84,
    released: "2025-07-18",
    playtime: 14,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
    ],
  },
  {
    id: 3508,
    name: "Forza Horizon 5: Aurora Circuit",
    slug: slugify("Forza Horizon 5: Aurora Circuit"),
    genres: [{ name: "Corrida" }, { name: "Aventura" }],
    short_description:
      "Corridas para celebrar a estrada: rotas novas, eventos sazonais e uma progressão que desafia estilos diferentes.",
    description_raw:
      "Os eventos combinam direção e estratégia, permitindo escolhas de rota que mudam o resultado. O jogo incentiva testar carros e configurações para dominar pistas.\n\nVale pelas horas de diversão com sensação de descoberta constante. É ideal para quem gosta de progresso rápido e evolução contínua.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Forza+Horizon+Aurora+Circuit",
    metacritic: 82,
    released: "2025-06-10",
    playtime: 15,
    platforms: [
      { platform: { name: "Xbox Series X" } },
      { platform: { name: "PC" } },
    ],
  },
  {
    id: 3509,
    name: "God of War Ragnarok: Valhalla's Wake",
    slug: slugify("God of War Ragnarok: Valhalla's Wake"),
    genres: [{ name: "Ação" }, { name: "Aventura" }],
    short_description:
      "Mitologia em chamas: combates mais pesados, momentos emocionais e exploração com propósito.",
    description_raw:
      "As batalhas são pensadas para alternar agressividade e precisão, com armas e golpes que exigem timing. A história se desenvolve com peso e presença.\n\nVale pela construção narrativa e por como o jogo alterna tensão e descoberta. É um título para quem quer espetáculo com profundidade.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=God+of+War+Ragnarok+Valhalla%27s+Wake",
    metacritic: 93,
    released: "2026-02-20",
    playtime: 21,
    platforms: [
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "PC" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3510,
    name: "Hollow Knight: Silk & Ash",
    slug: slugify("Hollow Knight: Silk & Ash"),
    genres: [{ name: "Metroidvania" }, { name: "Aventura" }],
    short_description:
      "Uma jornada delicada e sombria: novos desafios, combate refinado e segredos escondidos em cada esquina.",
    description_raw:
      "O mapa se expande com possibilidades e rotas que incentivam explorar ao máximo. O combate é responsivo e a progressão desbloqueia estilos diferentes de abordagem.\n\nVale a pena pela sensação de domínio e pela beleza do mundo. É perfeito para quem gosta de descobrir, melhorar e enfrentar chefes com calma.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Hollow+Knight+Silk+%26+Ash",
    metacritic: 87,
    released: "2025-05-25",
    playtime: 12,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "Nintendo Switch 2" } },
      { platform: { name: "PlayStation 5" } },
    ],
  },
  {
    id: 3511,
    name: "Ghost of Tsushima: Dawn Isles",
    slug: slugify("Ghost of Tsushima: Dawn Isles"),
    genres: [{ name: "Ação" }, { name: "Aventura" }],
    short_description:
      "Tradição e desfecho: novas ilhas, técnicas aprimoradas e um roteiro que aprofunda a guerra interior do protagonista.",
    description_raw:
      "A exploração se apoia em histórias menores que se conectam com o tema central. O combate é variado e recompensa estratégias que misturam velocidade e precisão.\n\nVale a pena pela direção de arte e pelos momentos de narrativa. Quem quer uma aventura com alma vai gostar do que foi construído.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Ghost+of+Tsushima+Dawn+Isles",
    metacritic: 86,
    released: "2026-01-26",
    playtime: 17,
    platforms: [
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "PC" } },
    ],
  },
  {
    id: 3512,
    name: "Overwatch 2: Prism Arena",
    slug: slugify("Overwatch 2: Prism Arena"),
    genres: [{ name: "Multijogador" }, { name: "Ação" }],
    short_description:
      "Combinações novas, mapas mais intensos e suporte para estilos variados de jogo. Prepare-se para rounds rápidos e táticos.",
    description_raw:
      "Os mapas trazem oportunidades para leitura de posicionamento e combos de time. O jogo mantém a sensação de controle com balanceamentos que ajudam na diversão.\n\nVale pela longevidade: é aquele tipo de multiplayer que rende por conta da variedade de heróis e estratégias. Se você curte jogar com amigos, é uma compra segura.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Overwatch+2+Prism+Arena",
    metacritic: 80,
    released: "2025-04-30",
    playtime: 9,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Xbox Series X" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3513,
    name: "Starfield: Deep Horizons",
    slug: slugify("Starfield: Deep Horizons"),
    genres: [{ name: "RPG" }, { name: "Sci-Fi" }],
    short_description:
      "Exploração espacial com liberdade: missões, tripulações e descobertas que mudam seu jeito de jogar.",
    description_raw:
      "As rotas e escolhas reforçam um sentimento de escala, com exploração que alterna ação e descoberta. O jogo incentiva planejar antes de partir.\n\nVale pela sensação de construir histórias próprias. É uma aventura lenta e recompensadora, feita para quem gosta de mergulhar em sistemas e ambientes.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Starfield+Deep+Horizons",
    metacritic: 84,
    released: "2025-03-12",
    playtime: 22,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "Xbox Series X" } },
    ],
  },
  {
    id: 3514,
    name: "Hogwarts Legacy: Legacy of Light",
    slug: slugify("Hogwarts Legacy: Legacy of Light"),
    genres: [{ name: "Aventura" }, { name: "RPG" }],
    short_description:
      "Feitiços, segredos e um mundo que convida à exploração. Ajuste sua magia e descubra o que foi deixado para trás.",
    description_raw:
      "A progressão abre novas possibilidades de combate e exploração, criando um ciclo de curiosidade. As missões são variadas e o clima do universo é constante.\n\nVale a pena pela sensação de presença em Hogwarts. A experiência tem ritmo equilibrado e recompensas que reforçam a imersão.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Hogwarts+Legacy+Legacy+of+Light",
    metacritic: 81,
    released: "2025-11-09",
    playtime: 16,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3515,
    name: "Minecraft Legends: Overgrown",
    slug: slugify("Minecraft Legends: Overgrown"),
    genres: [{ name: "Estratégia" }, { name: "Aventura" }],
    short_description:
      "Defenda seu mundo em batalhas estratégicas e explore áreas tomadas pelo crescimento selvagem.",
    description_raw:
      "O jogo mistura construção e estratégia com objetivos claros, incentivando decisões rápidas. As batalhas pedem posicionamento e adaptação ao terreno.\n\nVale pela leveza e pela profundidade o suficiente para manter engajamento. É um título ótimo para jogar em sessões variadas sem perder o objetivo.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Minecraft+Legends+Overgrown",
    metacritic: 77,
    released: "2025-02-14",
    playtime: 10,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "Xbox Series X" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3516,
    name: "Assassin's Creed Valhalla: Rune Storm",
    slug: slugify("Assassin's Creed Valhalla: Rune Storm"),
    genres: [{ name: "Ação" }, { name: "Aventura" }],
    short_description:
      "Caçadas maiores e enigmas antigos. Uma tempestade de runas altera o destino das terras do norte.",
    description_raw:
      "O combate e a exploração continuam sendo o centro, com novas mecânicas para encadear golpes e explorar pontos de interesse. O mundo fica mais vivo com eventos locais.\n\nVale pela sensação de progressão e pela história que conecta o passado ao presente do jogador. É uma aventura longa para quem gosta de detalhes.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=AC+Valhalla+Rune+Storm",
    metacritic: 79,
    released: "2025-01-19",
    playtime: 17,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Xbox Series X" } },
    ],
  },
  {
    id: 3517,
    name: "Resident Evil: Code Veronica X",
    slug: slugify("Resident Evil: Code Veronica X"),
    genres: [{ name: "Survival Horror" }, { name: "Clássicos" }],
    short_description:
      "Um terror reimaginado com foco na tensão psicológica, exploração e decisão sob pressão.",
    description_raw:
      "A exploração é premiada com conteúdo que expande a história e cria atalhos estratégicos. O jogo valoriza leitura do ambiente e planejamento de recursos.\n\nVale pela forma como preserva o medo, mas moderniza o ritmo. Para quem curte esse gênero, é um retorno que agrada muito.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Code+Veronica+X",
    metacritic: 82,
    released: "2025-10-01",
    playtime: 13,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Nintendo Switch 2" } },
    ],
  },
  {
    id: 3518,
    name: "Terraria: Calamity Echo",
    slug: slugify("Terraria: Calamity Echo"),
    genres: [{ name: "Aventura" }, { name: "Sandbox" }],
    short_description:
      "Expanda seu mundo com biomas perigosos e chefes que testam sua criatividade e build.",
    description_raw:
      "A sandbox vira ferramenta de estratégia: construir, preparar e adaptar faz parte do charme. Os biomas trazem ameaças diferentes que pedem mudanças de abordagem.\n\nVale pela liberdade total e pela sensação de descoberta contínua. É um daqueles jogos que você sempre encontra algo novo para fazer.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Terraria+Calamity+Echo",
    metacritic: 78,
    released: "2025-09-01",
    playtime: 15,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "Nintendo Switch 2" } },
      { platform: { name: "Xbox Series X" } },
    ],
  },
  {
    id: 3519,
    name: "Rocket League: Hyperspace Drift",
    slug: slugify("Rocket League: Hyperspace Drift"),
    genres: [{ name: "Esportes" }, { name: "Multijogador" }],
    short_description:
      "Partidas rápidas, jogadas impossíveis e uma evolução constante para quem busca dominar cada rota.",
    description_raw:
      "O jogo continua premiando precisão e leitura de jogo, com estilos diferentes de ataque e defesa. O matchmaking mantém a variedade de partidas.\n\nVale pela competitividade saudável e pela infinidade de possibilidades. Se você curte jogar online, é viciante.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Rocket+League+Hyperspace+Drift",
    metacritic: 81,
    released: "2025-08-22",
    playtime: 8,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
      { platform: { name: "Xbox Series X" } },
    ],
  },
  {
    id: 3520,
    name: "Dead Rising: Zombie Nightfall",
    slug: slugify("Dead Rising: Zombie Nightfall"),
    genres: [{ name: "Ação" }, { name: "Horror" }],
    short_description:
      "Desespero em cada esquina: combos, improviso e sobrevivência em uma cidade que não para.",
    description_raw:
      "O combate encoraja improviso e criatividade, com mecânicas que incentivam experimentar builds e armas. As rotas de sobrevivência criam tensão constante.\n\nVale pela sensação de caos divertido e pelos momentos de descoberta. É perfeito para quem curte ação rápida com temática de zumbis.",
    background_image:
      "https://via.placeholder.com/600x400.png?text=Dead+Rising+Zombie+Nightfall",
    metacritic: 74,
    released: "2025-07-01",
    playtime: 10,
    platforms: [
      { platform: { name: "PC" } },
      { platform: { name: "PlayStation 5" } },
    ],
  },
];

export function getGameBySlug(slug: string): RawgGame | null {
  return games.find((game) => game.slug === slug) ?? null;
}

