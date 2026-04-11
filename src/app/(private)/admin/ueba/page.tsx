import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Paragraph, Span } from "@/components/ui/Typography";
import { listStoredUebaEvents } from "@/lib/ueba";
import type { RiskBand, UebaEventType } from "@/lib/ueba/types";
import { cn } from "@/lib/utils";

function eventTypeLabel(type: UebaEventType): string {
  switch (type) {
    case "login":
      return "Login";
    case "post_create":
      return "Criação de post";
    case "post_view":
      return "Visualização";
    default:
      return type;
  }
}

function bandBadgeVariant(band: RiskBand): "error" | "warning" | "success" {
  switch (band) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    default:
      return "success";
  }
}

function bandLabel(band: RiskBand): string {
  switch (band) {
    case "high":
      return "Alto";
    case "medium":
      return "Médio";
    default:
      return "Baixo";
  }
}

export default async function UebaDashboardPage() {
  const rows = await listStoredUebaEvents();
  const avgScore =
    rows.reduce((acc, r) => acc + r.anomalyScore, 0) / Math.max(rows.length, 1);
  const highCount = rows.filter((r) => r.band === "high").length;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2 border-b border-border-primary pb-6">
        <Paragraph className="text-text-surface-primary text-xl font-semibold">
          Dashboard UEBA (simulação)
        </Paragraph>
        <Paragraph className="text-text-tertiary text-sm max-w-3xl">
          Dados lidos da tabela{" "}
          <code className="text-text-primary text-xs">ueba_events</code> no
          Supabase, vinculados a{" "}
          <strong className="text-text-secondary">profiles</strong>. Inclusão,
          edição e remoção via API. O score é recalculado no servidor (simulação
          estilo Isolation Forest).
        </Paragraph>
        <div className="flex flex-wrap gap-4 pt-2 text-sm text-text-tertiary">
          <Span>
            Eventos na amostra:{" "}
            <Span className="text-text-primary">{rows.length}</Span>
          </Span>
          {rows.length > 0 ? (
            <>
              <Span>
                Score médio:{" "}
                <Span className="text-text-primary">{avgScore.toFixed(2)}</Span>
              </Span>
              <Span>
                Alertas altos:{" "}
                <Span className="text-text-primary">{highCount}</Span>
              </Span>
            </>
          ) : null}
        </div>
      </header>

      {rows.length === 0 ? (
        <p className="rounded border border-border-primary p-6 text-center text-text-tertiary">
          Nenhum evento em{" "}
          <code className="text-text-primary text-xs">ueba_events</code>. Crie
          registros pela API (POST{" "}
          <code className="text-text-primary text-xs">
            /api/admin/ueba/events
          </code>
          ) com o <code className="text-text-primary text-xs">profileId</code>{" "}
          de um usuário existente em{" "}
          <code className="text-text-primary text-xs">profiles</code>, ou
          verifique o Supabase / variáveis de ambiente.
        </p>
      ) : (
        <div className="rounded border border-border-primary ">
          <Table>
            <TableHeader>
              <TableRow className="border-border-primary hover:bg-transparent">
                <TableHead className="text-text-secondary">Quando</TableHead>
                <TableHead className="text-text-secondary">Conta</TableHead>
                <TableHead className="text-text-secondary">Evento</TableHead>
                <TableHead className="text-text-secondary">Contexto</TableHead>
                <TableHead className="text-text-secondary">Score</TableHead>
                <TableHead className="text-text-secondary">Risco</TableHead>
                <TableHead className="text-text-secondary">
                  Motivos (sim.)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-border-primary hover:bg-bg-secondary/60"
                >
                  <TableCell className="whitespace-nowrap text-text-primary">
                    {new Date(row.occurredAt).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-text-primary">
                    <span className="block font-medium">{row.userLabel}</span>
                    {row.userEmail ? (
                      <span className="block text-xs text-text-tertiary truncate max-w-[200px]">
                        {row.userEmail}
                      </span>
                    ) : null}
                    {row.profileId ? (
                      <span className="block text-[10px] text-text-tertiary/80 font-mono truncate max-w-[200px]">
                        {row.profileId}
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-text-primary">
                    {eventTypeLabel(row.type)}
                  </TableCell>
                  <TableCell className="max-w-[220px] text-text-tertiary text-xs">
                    {row.countryLabel}
                    {!row.isUsualCountry && " · geo atípico"}
                    {!row.isUsualDevice && " · device atípico"}
                    {!row.isUsualHour && " · hora atípica"}
                    <span className="block text-text-tertiary/80 mt-1">
                      ações/1h: {row.actionsLastHour}
                      {row.type === "post_create"
                        ? ` · posts/1h: ${row.postsInLastHour}`
                        : ""}
                    </span>
                    {row.scenarioNote ? (
                      <span className="block mt-1 text-text-tertiary/90 italic">
                        {row.scenarioNote}
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell className="font-mono text-text-primary">
                    {row.anomalyScore.toFixed(3)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={bandBadgeVariant(row.band)}>
                      {bandLabel(row.band)}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "max-w-[220px] text-xs text-text-tertiary",
                      row.reasonCodes.length === 0 && "italic",
                    )}
                  >
                    {row.reasonCodes.length > 0
                      ? row.reasonCodes.join(", ")
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
