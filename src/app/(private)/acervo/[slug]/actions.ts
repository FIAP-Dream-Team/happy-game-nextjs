"use server";

import { getGameDetailsBySlug } from "@/lib/rawg";

export type AcervoGameDetailsDTO = {
  name: string;
  background_image: string;
  metacritic: number | null;
  released: string;
  playtime: number;
  platforms: { platform: { name: string } }[];
  description_raw: string;
};

export async function fetchGameDetailsBySlugAction(
  slug: string
): Promise<AcervoGameDetailsDTO> {
  const trimmed = slug.trim();
  const rawgGame = await getGameDetailsBySlug(trimmed);

  return {
    name: rawgGame.name,
    background_image:
      rawgGame.background_image ??
      `https://via.placeholder.com/900x600.png?text=${encodeURIComponent(rawgGame.name)}`,
    metacritic: rawgGame.metacritic,
    released: rawgGame.released ?? "",
    playtime: rawgGame.playtime ?? 0,
    platforms: rawgGame.platforms ?? [],
    description_raw: rawgGame.description_raw ?? "",
  };
}

