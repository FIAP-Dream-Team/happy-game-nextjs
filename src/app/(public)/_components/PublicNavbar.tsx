"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { NavigationButton } from "@/components/ui/NavigationButton";

const ROUTES = [
  { href: "/", name: "Início", icon: "Home" as const },
  {
    href: "/historia",
    name: "História",
    icon: "GalleryHorizontalEnd" as const,
  },
  { href: "/plataforma", name: "Plataforma", icon: "PanelsTopLeft" as const },
];

export function PublicNavbar() {
  const pathname = usePathname();

  return (
    <Navbar
      className={cn("fixed top-0 left-0 right-0 z-50")}
      containerClassName="container mx-auto p-4 md:p-6"
      logo={
        <Link href="/">
          <Logo variant="black" className="dark:hidden" />
          <Logo variant="white" className="hidden dark:block" />
        </Link>
      }
      navItems={
        <>
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
        </>
      }
      rightActions={
        <>
          <Button size="large" variant="default" asChild>
            <Link href="/cadastro">Inscreva-se</Link>
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
                <Button variant="default" className="w-full" asChild>
                  <Link href="/cadastro">Inscreva-se</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </>
      }
    />
  );
}
