export type RawgGenre = {
  id: number;
  name: string;
  slug: string;
};

export type RawgPlatformEntry = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

export type RawgGameListItem = {
  id: number;
  name: string;
  slug: string;
  released: string | null;
  background_image: string | null;
  metacritic: number | null;
  genres: RawgGenre[];
};

export type RawgGamesListResponse = {
  results: RawgGameListItem[];
};

export type RawgGameDetails = RawgGameListItem & {
  description_raw: string;
  playtime: number;
  platforms: RawgPlatformEntry[];
};

const RAWG_BASE_URL = "https://api.rawg.io/api";

function getApiKey(): string | null {
  const key = process.env.RAWG_API_KEY?.trim();
  return key ? key : null;
}

async function rawgFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const key = getApiKey();
  if (!key) {
    throw new Error("RAWG_API_KEY is not set");
  }

  const url = new URL(`${RAWG_BASE_URL}${path}`);
  url.searchParams.set("key", key);

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`RAWG request failed: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as T;
}

export async function getGamesList(params?: {
  pageSize?: number;
}): Promise<RawgGameListItem[]> {
  const pageSize = params?.pageSize ?? 20;
  const data = await rawgFetch<RawgGamesListResponse>(
    `/games?page_size=${encodeURIComponent(String(pageSize))}`,
    { next: { revalidate: 3600 } }
  );
  return data.results ?? [];
}

export async function getGameDetailsBySlug(
  slug: string
): Promise<RawgGameDetails> {
  return await rawgFetch<RawgGameDetails>(`/games/${encodeURIComponent(slug)}`, {
    next: { revalidate: 3600 },
  });
}

