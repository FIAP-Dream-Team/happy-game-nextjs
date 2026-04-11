import { NextResponse } from "next/server";

import { requireUebaAdmin } from "@/lib/ueba/authAdmin";
import { deleteUebaEvent, updateUebaEvent } from "@/lib/ueba/db";
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

type RouteContext = { params: Promise<{ id: string }> };

/**
 * PATCH: atualiza campos do evento; score e faixa são recalculados.
 * DELETE: remove o evento.
 *
 * Header: `x-ueba-admin-secret`
 */
export async function PATCH(request: Request, context: RouteContext) {
  const denied = requireUebaAdmin(request);
  if (denied) return denied;

  const { id } = await context.params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  }

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
  const patch: Parameters<typeof updateUebaEvent>[1] = {};

  if (o.profileId !== undefined) {
    if (typeof o.profileId !== "string" || !isUuid(o.profileId)) {
      return NextResponse.json({ error: "profileId inválido" }, { status: 400 });
    }
    patch.profileId = o.profileId;
  }
  if (o.type !== undefined) {
    if (!isEventType(o.type)) {
      return NextResponse.json({ error: "type inválido" }, { status: 400 });
    }
    patch.type = o.type;
  }
  if (o.occurredAt !== undefined) {
    if (typeof o.occurredAt !== "string" || Number.isNaN(Date.parse(o.occurredAt))) {
      return NextResponse.json({ error: "occurredAt inválido" }, { status: 400 });
    }
    patch.occurredAt = o.occurredAt;
  }
  if (o.countryLabel !== undefined) {
    if (typeof o.countryLabel !== "string") {
      return NextResponse.json({ error: "countryLabel inválido" }, { status: 400 });
    }
    patch.countryLabel = o.countryLabel;
  }
  if (o.isUsualCountry !== undefined) {
    if (typeof o.isUsualCountry !== "boolean") {
      return NextResponse.json({ error: "isUsualCountry inválido" }, { status: 400 });
    }
    patch.isUsualCountry = o.isUsualCountry;
  }
  if (o.isUsualDevice !== undefined) {
    if (typeof o.isUsualDevice !== "boolean") {
      return NextResponse.json({ error: "isUsualDevice inválido" }, { status: 400 });
    }
    patch.isUsualDevice = o.isUsualDevice;
  }
  if (o.isUsualHour !== undefined) {
    if (typeof o.isUsualHour !== "boolean") {
      return NextResponse.json({ error: "isUsualHour inválido" }, { status: 400 });
    }
    patch.isUsualHour = o.isUsualHour;
  }
  if (o.actionsLastHour !== undefined) {
    if (typeof o.actionsLastHour !== "number") {
      return NextResponse.json({ error: "actionsLastHour inválido" }, { status: 400 });
    }
    patch.actionsLastHour = o.actionsLastHour;
  }
  if (o.postsInLastHour !== undefined) {
    if (typeof o.postsInLastHour !== "number") {
      return NextResponse.json({ error: "postsInLastHour inválido" }, { status: 400 });
    }
    patch.postsInLastHour = o.postsInLastHour;
  }
  if (o.scenarioNote !== undefined) {
    if (o.scenarioNote !== null && typeof o.scenarioNote !== "string") {
      return NextResponse.json({ error: "scenarioNote inválido" }, { status: 400 });
    }
    patch.scenarioNote = o.scenarioNote as string | null;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "Nenhum campo para atualizar" },
      { status: 400 },
    );
  }

  const { data, error } = await updateUebaEvent(id, patch);

  if (error) {
    const status = error.includes("não encontrado") ? 404 : 400;
    return NextResponse.json({ error }, { status });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: Request, context: RouteContext) {
  const denied = requireUebaAdmin(request);
  if (denied) return denied;

  const { id } = await context.params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  }

  const { ok, error } = await deleteUebaEvent(id);

  if (!ok) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
