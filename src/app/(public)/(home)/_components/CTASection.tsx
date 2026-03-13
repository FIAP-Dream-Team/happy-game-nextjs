import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { H2, Paragraph } from "@/components/ui/Typography";

export function CTASection() {
  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <H2>Junte-se à nossa comunidade gamer</H2>
          <Paragraph variant="text1">
            Seja um dos pioneiros a construir a comunidade que vai preservar o
            passado, viver o presente e criar o futuro dos videogames.
          </Paragraph>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/cadastro">
              <Button size="large" className="px-8">
                Inscreva-se
              </Button>
            </Link>
            <Link href="/plataforma">
              <Button variant="secondary" size="large" className="px-8">
                Saiba mais
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
