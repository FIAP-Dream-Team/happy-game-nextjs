"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FrameIcon } from "@/components/ui/FrameIcon";
import { MetacriticScore } from "@/components/ui/MetacriticScore";
import { H1, H3, Paragraph } from "@/components/ui/Typography";

import { getGameBySlug } from "../_mock/games";
import {
  fetchGameDetailsBySlugAction,
  type AcervoGameDetailsDTO,
} from "./actions";

function formatDatePtBR(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("pt-BR").format(parsed);
}

export default function AcervoGameDetailPage() {
  const router = useRouter();
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const normalizedSlug = (slug ?? "").trim();
  const mockFallback = normalizedSlug ? getGameBySlug(normalizedSlug) : null;

  const [game, setGame] = React.useState<AcervoGameDetailsDTO | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "loaded" | "fallback" | "not_found"
  >("idle");

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!normalizedSlug) return;

      setStatus("loading");

      try {
        const data = await fetchGameDetailsBySlugAction(normalizedSlug);
        if (cancelled) return;
        setGame(data);
        setStatus("loaded");
      } catch {
        if (cancelled) return;
        if (mockFallback) {
          setGame({
            name: mockFallback.name,
            background_image: mockFallback.background_image,
            metacritic: mockFallback.metacritic,
            released: mockFallback.released,
            playtime: mockFallback.playtime,
            platforms: mockFallback.platforms,
            description_raw: mockFallback.description_raw,
          });
          setStatus("fallback");
        } else {
          setStatus("not_found");
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [normalizedSlug, mockFallback]);

  if (!normalizedSlug) {
    return null;
  }

  if (status === "not_found") {
    router.replace("/_not-found");
    return null;
  }

  if (!game) {
    return (
      <div className="flex flex-col gap-10">
        <div className="h-10 w-[60%] rounded bg-bg-secondary animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[140px] rounded-lg bg-bg-secondary animate-pulse"
            />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="h-[260px] rounded-lg bg-bg-secondary animate-pulse" />
          <div className="h-[420px] rounded-lg bg-bg-secondary animate-pulse" />
        </div>
      </div>
    );
  }

  const paragraphs = game.description_raw
    ? game.description_raw
        .split(/\n\s*\n/g)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const gameplayText = paragraphs[0] ?? "Detalhes de gameplay em breve.";
  const valeAPenaText =
    paragraphs[1] ?? "Compartilhe sua opinião com a comunidade.";

  const releasedText = formatDatePtBR(game.released);
  const durationMin = Math.max(0, game.playtime || 0);
  const durationMax = durationMin ? durationMin + 2 : 0;
  const durationText =
    durationMin && durationMax ? `${durationMin} ~ ${durationMax} horas` : "—";

  return (
    <div className="flex flex-col gap-10">
      <H1 className="text-text-primary">{game.name}</H1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-primary rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FrameIcon name="Calendar" variant="primary" size="md" />
            <Paragraph
              variant="text3"
              weight="bold"
              className="text-text-surface-primary"
            >
              Data de lançamento
            </Paragraph>
          </div>
          <Paragraph className="text-text-surface-primary text-[20px] md:text-[22px] font-bold">
            {releasedText}
          </Paragraph>
        </div>

        <div className="bg-surface-primary rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FrameIcon name="Trophy" variant="primary" size="md" />
            <Paragraph
              variant="text3"
              weight="bold"
              className="text-text-surface-primary"
            >
              Nota no Metacritic
            </Paragraph>
          </div>
          <div className="flex justify-center">
            <MetacriticScore score={game.metacritic ?? 0} />
          </div>
        </div>

        <div className="bg-surface-primary rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FrameIcon name="Target" variant="primary" size="md" />
            <Paragraph
              variant="text3"
              weight="bold"
              className="text-text-surface-primary"
            >
              Duração
            </Paragraph>
          </div>
          <Paragraph className="text-text-surface-primary text-[20px] md:text-[22px] font-bold">
            {durationText}
          </Paragraph>
        </div>

        <div className="bg-surface-primary rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FrameIcon name="Gamepad2" variant="primary" size="md" />
            <Paragraph
              variant="text3"
              weight="bold"
              className="text-text-surface-primary"
            >
              Plataformas
            </Paragraph>
          </div>
          <div className="flex flex-wrap gap-2">
            {game.platforms
              .map((entry) => entry.platform.name)
              .filter(Boolean)
              .slice(0, 6)
              .map((platformName) => (
                <Badge key={platformName} variant="default">
                  {platformName}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-8">
          <div>
            <H3 className="text-text-primary">Gameplay e inovações</H3>
            <Paragraph className="text-text-tertiary mt-2">
              {gameplayText}
            </Paragraph>
          </div>

          <div>
            <H3 className="text-text-primary">Vale a Pena?</H3>
            <Paragraph className="text-text-tertiary mt-2">
              {valeAPenaText}
            </Paragraph>
          </div>
        </div>

        <div className="w-full">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-[320px] md:h-[420px] object-cover rounded-lg"
          />
        </div>
      </div>

      <section className="flex justify-center">
        <div className="w-full max-w-[720px] bg-surface-primary rounded-lg px-8 py-10 flex flex-col items-center gap-6">
          <Paragraph className="text-text-surface-primary text-center text-[18px] md:text-[20px] font-bold">
            Gostou desse post? Você também pode fazer o seu e interagir com
            outros jogadores!
          </Paragraph>
          <Button variant="default" size="medium" type="button">
            Interagir com a comunidade
          </Button>
        </div>
      </section>
    </div>
  );
}
