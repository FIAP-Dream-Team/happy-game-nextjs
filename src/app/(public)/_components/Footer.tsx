import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Instagram, Youtube, Gamepad2, Twitter } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Gamepad2, href: "#", label: "Discord" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const legalLinks = [
    { href: "#", label: "Termos de Uso" },
    { href: "#", label: "Política de Privacidade" },
    { href: "#", label: "Cookies" },
  ];

  return (
    <footer className="bg-bg-primary py-8 px-4 h-[330px] flex flex-col justify-between">
      <div className="flex flex-col items-center gap-6">
        <Logo variant="black" size="lg" className="dark:hidden" />
        <Logo variant="white" size="lg" className="hidden dark:block" />

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Button key={social.label} aria-label={social.label} asChild>
                <Link href={social.href}>
                  <Icon />
                </Link>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-color-border" />

      <nav aria-label="Links legais" className="flex justify-center items-center gap-6 flex-wrap">
        {legalLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="text-center text-sm text-color-text-muted">
        © 2025 Happy Game. Todos os direitos reservados.
      </div>
    </footer>
  );
}
