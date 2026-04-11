import { NextResponse } from "next/server";

import { requireUebaAdmin } from "@/lib/ueba/authAdmin";
import { insertUebaEvent, listStoredUebaEvents } from "@/lib/ueba/db";
import type { UebaEventType } from "@/lib/ueba/types";

const EVENT_TYPES: UebaEventType[] = ["login", "post_create", "post_view"];

function isUuid(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    s,
  );
}

function isEventType(s: unknown): s is UebaEventType {
  return typeof s === "string" && EVENT_TYPES.includes(s as UebaEventType);
}

/**
 * GET: lista eventos UEBA (opcional `?profileId=` e `?limit=`).
 * POST: cria evento para um `profileId`; score recalculado no servidor.
 *
 * Header obrigatório: `x-ueba-admin-secret` = `UEBA_ADMIN_SECRET`
 */
export async function GET(request: Request) {
  const denied = requireUebaAdmin(request);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profileId") ?? undefined;
  const limitRaw = searchParams.get("limit");
  const limit = limitRaw ? parseInt(limitRaw, 10) : undefined;

  if (profileId && !isUuid(profileId)) {
    return NextResponse.json({ error: "profileId inválido" }, { status: 400 });
  }

  const rows = await listStoredUebaEvents({
    profileId,
    limit: Number.isFinite(limit) ? limit : undefined,
  });

  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const denied = requireUebaAdmin(request);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corpo obrigatório" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const profileId = o.profileId;
  const type = o.type;
  const occurredAt = o.occurredAt;

  if (typeof profileId !== "string" || !isUuid(profileId)) {
    return NextResponse.json(
      { error: "profileId (uuid) obrigatório" },
      { status: 400 },
    );
  }
  if (!isEventType(type)) {
    return NextResponse.json(
      { error: `type deve ser um de: ${EVENT_TYPES.join(", ")}` },
      { status: 400 },
    );
  }
  if (typeof occurredAt !== "string" || Number.isNaN(Date.parse(occurredAt))) {
    return NextResponse.json(
      { error: "occurredAt (ISO 8601) obrigatório" },
      { status: 400 },
    );
  }

  const { data, error } = await insertUebaEvent({
    profileId,
    type,
    occurredAt,
    countryLabel:
      typeof o.countryLabel === "string" ? o.countryLabel : undefined,
    isUsualCountry: typeof o.isUsualCountry === "boolean" ? o.isUsualCountry : undefined,
    isUsualDevice: typeof o.isUsualDevice === "boolean" ? o.isUsualDevice : undefined,
    isUsualHour: typeof o.isUsualHour === "boolean" ? o.isUsualHour : undefined,
    actionsLastHour:
      typeof o.actionsLastHour === "number" ? o.actionsLastHour : undefined,
    postsInLastHour:
      typeof o.postsInLastHour === "number" ? o.postsInLastHour : undefined,
    scenarioNote:
      o.scenarioNote === null
        ? null
        : typeof o.scenarioNote === "string"
          ? o.scenarioNote
          : undefined,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
