import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { scoreMockUebaEvent } from "@/lib/ueba/simulateIsolationScore";
import type { MockUebaEvent, RiskBand, ScoredUebaEvent, UebaEventType } from "@/lib/ueba/types";

type ProfileRow = { id: string; full_name: string | null; email: string | null };

function displayName(p: ProfileRow | undefined, profileId: string): string {
  const n = p?.full_name?.trim();
  if (n) return n;
  if (p?.email) return p.email.split("@")[0] ?? p.email;
  return `Usuário ${profileId.slice(0, 8)}`;
}

type UebaEventRow = {
  id: string;
  profile_id: string;
  event_type: string;
  occurred_at: string;
  country_label: string;
  is_usual_country: boolean;
  is_usual_device: boolean;
  is_usual_hour: boolean;
  actions_last_hour: number;
  posts_in_last_hour: number;
  scenario_note: string | null;
  anomaly_score: number;
  risk_band: string;
  reason_codes: string[] | null;
};

export function rowToScoredUebaEvent(
  row: UebaEventRow,
  profile?: ProfileRow,
): ScoredUebaEvent {
  return {
    id: row.id,
    profileId: row.profile_id,
    userLabel: displayName(profile, row.profile_id),
    userEmail: profile?.email ?? null,
    type: row.event_type as UebaEventType,
    occurredAt: row.occurred_at,
    countryLabel: row.country_label,
    isUsualCountry: row.is_usual_country,
    isUsualDevice: row.is_usual_device,
    isUsualHour: row.is_usual_hour,
    actionsLastHour: row.actions_last_hour,
    postsInLastHour: row.posts_in_last_hour,
    scenarioNote: row.scenario_note ?? undefined,
    anomalyScore: row.anomaly_score,
    band: row.risk_band as RiskBand,
    reasonCodes: row.reason_codes ?? [],
  };
}

async function profilesByIds(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  ids: string[],
): Promise<Map<string, ProfileRow>> {
  if (ids.length === 0) return new Map();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("id", ids);
  if (error || !data) {
    if (error) console.error("[ueba] profilesByIds", error.message);
    return new Map();
  }
  return new Map(data.map((p) => [p.id, p as ProfileRow]));
}

export type ListUebaEventsOptions = {
  profileId?: string;
  limit?: number;
};

/** Lista eventos UEBA armazenados, com dados do perfil (nome/e-mail). */
export async function listStoredUebaEvents(
  options: ListUebaEventsOptions = {},
): Promise<ScoredUebaEvent[]> {
  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch {
    return [];
  }

  const limit = Math.min(Math.max(options.limit ?? 200, 1), 500);

  let query = supabase
    .from("ueba_events")
    .select(
      `
      id,
      profile_id,
      event_type,
      occurred_at,
      country_label,
      is_usual_country,
      is_usual_device,
      is_usual_hour,
      actions_last_hour,
      posts_in_last_hour,
      scenario_note,
      anomaly_score,
      risk_band,
      reason_codes
    `,
    )
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (options.profileId) {
    query = query.eq("profile_id", options.profileId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[ueba] listStoredUebaEvents", error.message);
    return [];
  }

  const rows = (data ?? []) as UebaEventRow[];
  const profileIds = [...new Set(rows.map((r) => r.profile_id))];
  const profMap = await profilesByIds(supabase, profileIds);

  return rows.map((row) =>
    rowToScoredUebaEvent(row, profMap.get(row.profile_id)),
  );
}

export type InsertUebaEventInput = {
  profileId: string;
  type: UebaEventType;
  occurredAt: string;
  countryLabel?: string;
  isUsualCountry?: boolean;
  isUsualDevice?: boolean;
  isUsualHour?: boolean;
  actionsLastHour?: number;
  postsInLastHour?: number;
  scenarioNote?: string | null;
};

export async function insertUebaEvent(
  input: InsertUebaEventInput,
): Promise<{ data: ScoredUebaEvent | null; error: string | null }> {
  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch (e) {
    return { data: null, error: String(e) };
  }

  const provisionalId = crypto.randomUUID();
  const mock: MockUebaEvent = {
    id: provisionalId,
    profileId: input.profileId,
    userLabel: "",
    userEmail: null,
    type: input.type,
    occurredAt: input.occurredAt,
    countryLabel: input.countryLabel ?? "N/D (sim.)",
    isUsualCountry: input.isUsualCountry ?? true,
    isUsualDevice: input.isUsualDevice ?? true,
    isUsualHour: input.isUsualHour ?? true,
    actionsLastHour: input.actionsLastHour ?? 0,
    postsInLastHour: input.postsInLastHour ?? 0,
    scenarioNote: input.scenarioNote ?? undefined,
  };

  const scored = scoreMockUebaEvent(mock);

  const { data: row, error } = await supabase
    .from("ueba_events")
    .insert({
      profile_id: input.profileId,
      event_type: input.type,
      occurred_at: input.occurredAt,
      country_label: scored.countryLabel,
      is_usual_country: scored.isUsualCountry,
      is_usual_device: scored.isUsualDevice,
      is_usual_hour: scored.isUsualHour,
      actions_last_hour: scored.actionsLastHour,
      posts_in_last_hour: scored.postsInLastHour,
      scenario_note: scored.scenarioNote ?? null,
      anomaly_score: scored.anomalyScore,
      risk_band: scored.band,
      reason_codes: scored.reasonCodes,
      updated_at: new Date().toISOString(),
    })
    .select(
      `
      id,
      profile_id,
      event_type,
      occurred_at,
      country_label,
      is_usual_country,
      is_usual_device,
      is_usual_hour,
      actions_last_hour,
      posts_in_last_hour,
      scenario_note,
      anomaly_score,
      risk_band,
      reason_codes
    `,
    )
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  const profMap = await profilesByIds(supabase, [input.profileId]);
  return {
    data: rowToScoredUebaEvent(row as UebaEventRow, profMap.get(input.profileId)),
    error: null,
  };
}

export type UpdateUebaEventInput = Partial<{
  profileId: string;
  type: UebaEventType;
  occurredAt: string;
  countryLabel: string;
  isUsualCountry: boolean;
  isUsualDevice: boolean;
  isUsualHour: boolean;
  actionsLastHour: number;
  postsInLastHour: number;
  scenarioNote: string | null;
}>;

export async function updateUebaEvent(
  id: string,
  patch: UpdateUebaEventInput,
): Promise<{ data: ScoredUebaEvent | null; error: string | null }> {
  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch (e) {
    return { data: null, error: String(e) };
  }

  const { data: existing, error: fetchError } = await supabase
    .from("ueba_events")
    .select(
      `
      id,
      profile_id,
      event_type,
      occurred_at,
      country_label,
      is_usual_country,
      is_usual_device,
      is_usual_hour,
      actions_last_hour,
      posts_in_last_hour,
      scenario_note,
      anomaly_score,
      risk_band,
      reason_codes
    `,
    )
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return { data: null, error: fetchError?.message ?? "Evento não encontrado" };
  }

  const e = existing as UebaEventRow;

  const merged: MockUebaEvent = {
    id: e.id,
    profileId: patch.profileId ?? e.profile_id,
    userLabel: "",
    userEmail: null,
    type: (patch.type ?? e.event_type) as UebaEventType,
    occurredAt: patch.occurredAt ?? e.occurred_at,
    countryLabel: patch.countryLabel ?? e.country_label,
    isUsualCountry: patch.isUsualCountry ?? e.is_usual_country,
    isUsualDevice: patch.isUsualDevice ?? e.is_usual_device,
    isUsualHour: patch.isUsualHour ?? e.is_usual_hour,
    actionsLastHour: patch.actionsLastHour ?? e.actions_last_hour,
    postsInLastHour: patch.postsInLastHour ?? e.posts_in_last_hour,
    scenarioNote:
      patch.scenarioNote !== undefined
        ? patch.scenarioNote ?? undefined
        : e.scenario_note ?? undefined,
  };

  const scored = scoreMockUebaEvent(merged);

  const { data: row, error } = await supabase
    .from("ueba_events")
    .update({
      profile_id: scored.profileId,
      event_type: scored.type,
      occurred_at: scored.occurredAt,
      country_label: scored.countryLabel,
      is_usual_country: scored.isUsualCountry,
      is_usual_device: scored.isUsualDevice,
      is_usual_hour: scored.isUsualHour,
      actions_last_hour: scored.actionsLastHour,
      posts_in_last_hour: scored.postsInLastHour,
      scenario_note: scored.scenarioNote ?? null,
      anomaly_score: scored.anomalyScore,
      risk_band: scored.band,
      reason_codes: scored.reasonCodes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      `
      id,
      profile_id,
      event_type,
      occurred_at,
      country_label,
      is_usual_country,
      is_usual_device,
      is_usual_hour,
      actions_last_hour,
      posts_in_last_hour,
      scenario_note,
      anomaly_score,
      risk_band,
      reason_codes
    `,
    )
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  const r = row as UebaEventRow;
  const profMap = await profilesByIds(supabase, [r.profile_id]);
  return {
    data: rowToScoredUebaEvent(r, profMap.get(r.profile_id)),
    error: null,
  };
}

export async function deleteUebaEvent(
  id: string,
): Promise<{ ok: boolean; error: string | null }> {
  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch (e) {
    return { ok: false, error: String(e) };
  }

  const { error } = await supabase.from("ueba_events").delete().eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, error: null };
}
