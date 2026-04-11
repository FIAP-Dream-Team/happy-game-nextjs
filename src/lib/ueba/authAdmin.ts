import { NextResponse } from "next/server";

/**
 * Falha de autenticação da API UEBA (header `x-ueba-admin-secret`).
 * Retorna `null` se autorizado.
 */
export function requireUebaAdmin(request: Request): NextResponse | null {
  const secret = process.env.UEBA_ADMIN_SECRET;
  if (!secret || secret.length < 8) {
    return NextResponse.json(
      {
        error:
          "Defina UEBA_ADMIN_SECRET no servidor (mín. 8 caracteres) para usar a API UEBA.",
      },
      { status: 503 },
    );
  }
  const sent = request.headers.get("x-ueba-admin-secret");
  if (sent !== secret) {
    return NextResponse.json(
      {
        error:
          "Não autorizado. Envie o header x-ueba-admin-secret igual a UEBA_ADMIN_SECRET.",
      },
      { status: 401 },
    );
  }
  return null;
}
