"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Span } from "@/components/ui/Typography";

type FeedTab = "popular" | "seguindo";

const tabs: { id: FeedTab; label: string }[] = [
  { id: "popular", label: "Popular" },
  { id: "seguindo", label: "Seguindo" },
];

export function FeedHeader() {
  const [activeTab, setActiveTab] = React.useState<FeedTab>("popular");
  const tabRefs = React.useRef<Map<FeedTab, HTMLButtonElement>>(new Map());

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex: number | null = null;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        break;
      case "ArrowRight":
        e.preventDefault();
        newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
    }

    if (newIndex !== null) {
      const newTab = tabs[newIndex];
      setActiveTab(newTab.id);
      tabRefs.current.get(newTab.id)?.focus();
    }
  };

  return (
    <header className="flex w-full items-center justify-between border-b border-border-primary bg-bg-primary px-4 pb-6 md:px-0">
      <div
        className="flex items-center gap-6"
        role="tablist"
        aria-label="Filtrar feed"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
              }}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "rounded px-1 py-1.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "text-text-highlight-purple"
                  : "text-text-primary hover:text-text-secondary",
              )}
            >
              <Span
                variant="text2"
                weight={isActive ? "bold" : "regular"}
              >
                {tab.label}
              </Span>
            </button>
          );
        })}
      </div>
      <Button variant="default" size="medium" asChild>
        <Link href="/feed/create">Criar post</Link>
      </Button>
    </header>
  );
}

// Nota: O componente pai (FeedPage) deve renderizar o conteúdo com:
// <div id="tabpanel-popular" role="tabpanel" aria-labelledby="tab-popular" tabIndex={0}>
//   {/* conteúdo */}
// </div>
