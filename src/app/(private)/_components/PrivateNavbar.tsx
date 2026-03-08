"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Session } from "next-auth";

import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { NavigationButton } from "@/components/ui/NavigationButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Span } from "@/components/ui/Typography";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { Icon } from "@/components/ui/Icon";

const ROUTES = [
  { href: "/feed", icon: "Home" as const, name: "Feed" },
  { href: "/acervo", icon: "Gamepad2" as const, name: "Acervo" },
];

export interface PrivateNavbarProps {
  session: Session | null;
}

export function PrivateNavbar({ session }: PrivateNavbarProps) {
  const pathname = usePathname();
  const user = session?.user;

  return (
    <Navbar
      logo={
        <Link href="/">
          <Logo variant="black" className="dark:hidden" />
          <Logo variant="white" className="hidden dark:block" />
        </Link>
      }
      navItems={
        <>
          {ROUTES.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavigationButton
                isActive={isActive}
                key={item.href}
                href={item.href}
                icon={item.icon}
                name={item.name}
              />
            );
          })}
        </>
      }
      rightActions={
        <>
          <Button variant="secondary" size="large" asChild>
            <Link href="/perfil" className="flex items-center gap-2">
              <Avatar
                src={user?.image ?? undefined}
                alt={user?.name ?? ""}
                size={24}
                className="h-6 w-6"
              />
              <Span className="truncate max-w-[120px]">
                {user?.name ?? "Perfil"}
              </Span>
            </Link>
          </Button>
          <ThemeToggle />
        </>
      }
      mobileRightActions={
        <>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="large" aria-label="Abrir menu">
                <Icon name="Menu" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-bg-primary dark:bg-bg-primary"
            >
              <nav className="flex flex-col items-center gap-6 mt-8">
                {ROUTES.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <NavigationButton
                      isActive={isActive}
                      key={link.href}
                      href={link.href}
                      icon={link.icon}
                      name={link.name}
                    />
                  );
                })}
                <>
                  <Button variant="secondary" size="large" asChild>
                    <Link href="/perfil" className="flex items-center gap-2">
                      <Avatar
                        src={user?.image ?? undefined}
                        alt={user?.name ?? ""}
                        size={24}
                        className="h-6 w-6"
                      />
                      <Span className="truncate max-w-[120px]">
                        {user?.name ?? "Perfil"}
                      </Span>
                    </Link>
                  </Button>
                </>
              </nav>
            </SheetContent>
          </Sheet>
        </>
      }
    />
  );
}
