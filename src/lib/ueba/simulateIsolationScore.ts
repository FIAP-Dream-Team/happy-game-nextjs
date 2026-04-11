import type { MockUebaEvent, RiskBand, ScoredUebaEvent } from "@/lib/ueba/types";

/**
 * Simula um score no estilo “anomalias são isoladas com poucas divisões” (ideia do Isolation Forest):
 * vários desvios empilham uma “massa de anomalia”; o resultado é normalizado para [0, 1].
 *
 * Isto não executa árvores nem scikit-learn — apenas reproduz faixas úteis para dashboard e estudo.
 */
export function simulateIsolationForestScore(
  event: MockUebaEvent,
): Pick<ScoredUebaEvent, "anomalyScore" | "band" | "reasonCodes"> {
  let mass = 0;
  const reasonCodes: string[] = [];

  if (!event.isUsualCountry) {
    mass += 0.32;
    reasonCodes.push("geo_atípico");
  }
  if (!event.isUsualDevice) {
    mass += 0.22;
    reasonCodes.push("dispositivo_atípico");
  }
  if (!event.isUsualHour) {
    mass += 0.18;
    reasonCodes.push("horário_atípico");
  }

  if (event.actionsLastHour > 80) {
    mass += 0.28;
    reasonCodes.push("volume_acoes_1h_extremo");
  } else if (event.actionsLastHour > 25) {
    mass += 0.18;
    reasonCodes.push("volume_acoes_1h_elevado");
  }

  if (event.type === "post_create" && event.postsInLastHour > 10) {
    mass += 0.26;
    reasonCodes.push("burst_posts");
  } else if (event.type === "post_create" && event.postsInLastHour > 5) {
    mass += 0.12;
    reasonCodes.push("posts_1h_acima_do_habitual");
  }

  if (event.type === "post_view" && event.actionsLastHour > 100) {
    mass += 0.2;
    reasonCodes.push("padrao_scraping_views");
  }

  // Pequena variação determinística por id (simula “ruído” de ensemble sem aleatorizar de verdade).
  const jitter =
    ((event.id.codePointAt(event.id.length - 1) ?? 0) % 7) * 0.008;
  const anomalyScore = Math.min(1, mass + jitter);

  const band: RiskBand =
    anomalyScore >= 0.55 ? "high" : anomalyScore >= 0.28 ? "medium" : "low";

  return { anomalyScore, band, reasonCodes };
}

export function scoreMockUebaEvent(event: MockUebaEvent): ScoredUebaEvent {
  const scored = simulateIsolationForestScore(event);
  return { ...event, ...scored };
}
