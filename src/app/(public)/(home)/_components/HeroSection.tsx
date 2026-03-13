import Link from "next/link";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Display3, H1, Paragraph } from "@/components/ui/Typography";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-6 animate-fadeIn">
            <H1 className="leading-tight">
              Descubra a primeira comunidade feita para{" "}
              <Display3 className="text-text-highlight-purple whitespace-nowrap">
                gamers
              </Display3>
            </H1>
            <Paragraph variant="text1">
              Conecte-se com outros jogadores, compartilhe suas conquistas,
              reviva os melhores momentos e descubra novas aventuras em uma
              comunidade feita para quem ama gamers.
            </Paragraph>
            <Link href="/login">
              <Button size="large" className="px-8">
                <Rocket className="h-5 w-5" />
                Acesse
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 animate-fadeIn">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src="/img/sonic.png"
                alt="Mario, Minecraft, Sonic"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
