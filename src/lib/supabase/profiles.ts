import type { User } from "next-auth";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

type OAuthAccountLike = {
  provider: string;
  providerAccountId: string;
};

export async function upsertProfileFromOAuth(
  user: User,
  account: OAuthAccountLike,
) {
  const supabase = createSupabaseAdmin();

  const { error } = await supabase.from("profiles").upsert(
    {
      provider: account.provider,
      provider_account_id: account.providerAccountId,
      email: user.email ?? null,
      full_name: user.name ?? null,
      avatar_url: user.image ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "provider,provider_account_id" },
  );

  if (error) {
    console.error("[supabase] upsertProfileFromOAuth:", error.message);
  }
}

export async function getProfileIdForOAuthUser(
  provider: string,
  providerAccountId: string,
): Promise<string | null> {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("provider", provider)
    .eq("provider_account_id", providerAccountId)
    .maybeSingle();

  if (error) {
    console.error("[supabase] getProfileIdForOAuthUser:", error.message);
    return null;
  }

  return data?.id ?? null;
}
