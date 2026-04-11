export type UebaEventType = "login" | "post_create" | "post_view";

export type RiskBand = "low" | "medium" | "high";

/**
 * Evento comportamental fictício — substitui ingestão real até existirem actions na plataforma.
 */
export interface MockUebaEvent {
  id: string;
  /** `profiles.id` quando o evento está ligado a uma conta real no Supabase. */
  profileId?: string;
  userLabel: string;
  userEmail?: string | null;
  type: UebaEventType;
  /** ISO 8601 */
  occurredAt: string;
  countryLabel: string;
  isUsualCountry: boolean;
  isUsualDevice: boolean;
  isUsualHour: boolean;
  /** Ações agregadas na última hora (login + views + posts, conforme cenário). */
  actionsLastHour: number;
  /** Posts na sessão/hora (relevante para post_create). */
  postsInLastHour: number;
  /** Rótulo só para narrativa / legenda na dashboard (não usado no “modelo”). */
  scenarioNote?: string;
}

export interface ScoredUebaEvent extends MockUebaEvent {
  /** 0 = comportamento típico, 1 = altamente anômalo (simulado). */
  anomalyScore: number;
  band: RiskBand;
  /** Códigos legíveis para explicar o score simulado. */
  reasonCodes: string[];
}
