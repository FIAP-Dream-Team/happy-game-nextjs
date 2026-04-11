"use client";

import { PrivateAside } from "@privateComponents/PrivateAside";
import { HeroBanner } from "@privateComponents/HeroBanner";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ClientPrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFeedPage = pathname === "/feed";
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {isFeedPage && <HeroBanner />}
      <div className="mx-auto flex w-full flex-1 gap-10 pt-10 pb-[80px] px-4 md:px-[72px] ">
        <main
          className={cn(
            "flex-1 min-w-0",
            !isAdminPage && "md:border-r border-border-primary md:pr-10",
          )}
        >
          {children}
        </main>
        {!isAdminPage && <PrivateAside />}
      </div>
    </>
  );
}
