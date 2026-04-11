import { createSupabaseAdmin } from "@/lib/supabase/admin";

export type FeedPostListItem = {
  id: string;
  title: string;
  authorName: string;
  authorAvatarSrc: string | null;
  dateAndComments: string;
  href: string;
};

/** Primeira linha útil do markdown/texto, para exibir no card do feed. */
function previewTitle(content: string, maxLen = 120): string {
  const line =
    content.split(/\r?\n/).find((l) => l.trim().length > 0) ?? content;
  let t = line.replace(/^#+\s*/, "").trim();
  if (t.length > maxLen) {
    t = `${t.slice(0, maxLen - 1)}…`;
  }
  return t || "Post";
}

function formatFeedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Lista posts mais recentes com dados do autor para o feed.
 */
export async function listPostsForFeed(
  limit = 50,
): Promise<FeedPostListItem[]> {
  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch {
    return [];
  }

  const { data: rows, error } = await supabase
    .from("posts")
    .select("id, content, created_at, author_id")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !rows?.length) {
    if (error) {
      console.error("[listPostsForFeed]", error.message);
    }
    return [];
  }

  const authorIds = [...new Set(rows.map((r) => r.author_id))];

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .in("id", authorIds);

  if (profilesError) {
    console.error("[listPostsForFeed] profiles", profilesError.message);
    return [];
  }

  const byAuthor = new Map(
    (profiles ?? []).map((p) => [
      p.id,
      {
        name: p.full_name?.trim() || "Usuário",
        avatar: p.avatar_url ?? null,
      },
    ]),
  );

  return rows.map((row) => {
    const author = byAuthor.get(row.author_id);
    return {
      id: row.id,
      title: previewTitle(row.content),
      authorName: author?.name ?? "Usuário",
      authorAvatarSrc: author?.avatar ?? null,
      dateAndComments: formatFeedDate(row.created_at),
      href: `/feed/${row.id}`,
    };
  });
}
