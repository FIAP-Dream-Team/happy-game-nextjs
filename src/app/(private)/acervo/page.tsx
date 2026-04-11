import Link from "next/link";

import { games as mockGames } from "./_mock/games";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { H1, H4, Paragraph } from "@/components/ui/Typography";
import { getGamesList } from "@/lib/rawg";

function buildListDescription(input: {
  released: string | null;
  metacritic: number | null;
}): string {
  const parts: string[] = [];
  if (input.released) parts.push(`Lançamento: ${input.released}`);
  if (typeof input.metacritic === "number") parts.push(`Metacritic: ${input.metacritic}`);
  return parts.join(" • ") || "Veja detalhes e informações do jogo.";
}

export default async function AcervoPage() {
  let games = mockGames.slice(0, 20).map((g) => ({
    id: g.id,
    name: g.name,
    slug: g.slug,
    background_image: g.background_image,
    genres: g.genres,
    description: g.short_description,
  }));

  try {
    const rawgGames = await getGamesList({ pageSize: 20 });
    games = rawgGames.map((g) => ({
      id: g.id,
      name: g.name,
      slug: g.slug,
      background_image:
        g.background_image ??
        `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(g.name)}`,
      genres: g.genres.map((genre) => ({ name: genre.name })),
      description: buildListDescription({
        released: g.released,
        metacritic: g.metacritic,
      }),
    }));
  } catch {
    // fallback para mock (sem RAWG_API_KEY ou erro na API)
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <H1 className="text-text-primary">Acervo de jogos</H1>
        <Paragraph className="text-text-tertiary mt-2">
          Procure informações sobre seus jogos favoritos
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.slice(0, 20).map((game) => {
          const desc =
            game.description.length > 120
              ? `${game.description.slice(0, 120)}...`
              : game.description;

          return (
            <div
              key={game.id}
              className="flex flex-col overflow-hidden rounded-lg bg-surface-primary"
            >
              <div className="relative w-full h-[190px]">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-3 p-4 flex-1">
                <div className="flex flex-col gap-2">
                  <H4 className="text-text-surface-primary">{game.name}</H4>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.slice(0, 3).map((genre) => (
                      <Badge key={genre.name} variant="default">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Paragraph className="text-text-tertiary line-clamp-3">
                  {desc}
                </Paragraph>

                <Button variant="default" size="medium" asChild className="mt-auto">
                  <Link href={`/acervo/${game.slug}`}>
                    Ver mais informações
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
