"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";
import { H3, Paragraph, Span } from "@/components/ui/Typography";

export interface TimelineItemData {
  period: string;
  title: string;
  description: string;
  games: string[];
  icon: LucideIcon;
}

interface TimelineItemProps {
  item: TimelineItemData;
  isLast?: boolean;
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  const { period, title, description, games, icon: Icon } = item;

  const formatDescription = (text: string, gameList: string[]) => {
    let processedText = text.replace(/\*\*/g, "");

    const gamePattern = new RegExp(`(${gameList.join("|")})`, "gi");

    const parts = processedText.split(gamePattern);

    return parts.map((part, index) => {
      const isGame = gameList.some(
        (game) => part.toLowerCase() === game.toLowerCase(),
      );
      if (isGame) {
        return (
          <strong key={index} className=" font-semibold">
            {part}
          </strong>
        );
      }
      return <Span key={index}>{part}</Span>;
    });
  };

  return (
    <div className="group relative flex gap-8 pb-16">
      <div className="relative flex flex-col items-center min-w-16">
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full   border-2 border-border-primary  group-hover:border-primary-green-base transition-colors">
          <Icon className="h-8 w-8 " />
        </div>

        {!isLast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 h-full w-0.5 bg-border-primary group-hover:bg-primary-green-base transition-colors" />
        )}
      </div>

      <div className="flex-1 pt-2">
        <div className="text-primary-green-base text-sm font-medium mb-2">
          {period}
        </div>
        <H3 className=" mb-4">{title}</H3>
        <Paragraph className=" leading-relaxed">
          {formatDescription(description, games)}
        </Paragraph>
      </div>
    </div>
  );
}
