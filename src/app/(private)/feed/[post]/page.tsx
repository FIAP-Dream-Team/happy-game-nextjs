import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@privateComponents/MarkdownRenderer";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function PostPage({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post: postId } = await params;
  if (!UUID_RE.test(postId)) {
    notFound();
  }

  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch {
    notFound();
  }

  const { data: row, error } = await supabase
    .from("posts")
    .select("content, created_at, author_id")
    .eq("id", postId)
    .maybeSingle();

  if (error || !row) {
    notFound();
  }

  const { data: author } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", row.author_id)
    .maybeSingle();

  return (
    <article className="flex flex-col gap-4">
      {author?.full_name ? (
        <p className="text-sm text-text-tertiary">
          Por {author.full_name}
          {row.created_at
            ? ` · ${new Date(row.created_at).toLocaleDateString("pt-BR")}`
            : null}
        </p>
      ) : null}
      <MarkdownRenderer content={row.content} />
    </article>
  );
}
