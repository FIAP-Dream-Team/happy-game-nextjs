"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { getProfileIdForOAuthUser } from "@/lib/supabase/profiles";

export type CreatePostState = {
  error: string | null;
};

export async function createPost(
  _prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Você precisa estar logado." };
  }

  const provider = session.user.provider ?? "google";
  const authorId = await getProfileIdForOAuthUser(
    provider,
    session.user.id,
  );

  if (!authorId) {
    return {
      error:
        "Perfil não encontrado no banco. Verifique o Supabase e faça login de novo.",
    };
  }

  const raw = formData.get("content");
  const content = typeof raw === "string" ? raw.trim() : "";
  if (!content) {
    return { error: "Escreva algo antes de publicar." };
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("posts")
    .insert({ author_id: authorId, content })
    .select("id")
    .single();

  if (error) {
    console.error("[createPost]", error.message);
    return { error: "Não foi possível publicar. Tente de novo." };
  }

  redirect(`/feed/${data.id}`);
}
