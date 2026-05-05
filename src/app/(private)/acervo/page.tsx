import Link from "next/link";

import { games as mockGames } from "./_mock/games";
import { Badge } from "@/components/ui/Badge";
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
          {games.length} jogos encontrados — clique para ver detalhes
        </Paragraph>
      </div>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0"
        aria-label="Lista de jogos"
      >
        {games.slice(0, 20).map((game) => {
          const desc =
            game.description.length > 120
              ? `${game.description.slice(0, 120)}...`
              : game.description;

          return (
            <li key={game.id}>
              <article>
                <Link
                  href={`/acervo/${game.slug}`}
                  aria-label={`${game.name} — ver detalhes`}
                  className="group flex flex-col overflow-hidden rounded-lg h-full
                    bg-surface-neutral border border-border-primary
                    hover:ring-2 hover:ring-brand-purple-700 dark:hover:ring-brand-purple-400
                    hover:shadow-lg hover:shadow-brand-purple-700/10 dark:hover:shadow-brand-purple-400/10
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    transition-all duration-200"
                >
                  <div className="relative w-full h-[190px] overflow-hidden">
                    <img
                      src={game.background_image}
                      alt=""
                      loading="lazy"
                      width={600}
                      height={190}
                      className="absolute inset-0 h-full w-full object-cover
                        group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-3 p-4 flex-1">
                    <div className="flex flex-col gap-2">
                      <H4 className="text-text-primary">{game.name}</H4>
                      <div className="flex flex-wrap gap-2" aria-label="Gêneros">
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

                    {/* span styled como Button — não pode ser <button> pois já está dentro de <a> */}
                    <span
                      aria-hidden="true"
                      className="mt-auto inline-flex items-center justify-center rounded h-9 min-h-9 px-3 text-sm
                        bg-brand-purple-700 dark:bg-brand-purple-400
                        text-neutral-50
                        group-hover:bg-brand-purple-900 dark:group-hover:bg-brand-purple-300
                        transition-colors duration-300"
                    >
                      Ver mais informações
                    </span>
                  </div>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
