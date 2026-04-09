import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { H2, Paragraph, Span } from "@/components/ui/Typography";

const communities = [
  {
    image: "/img/game-together.png",
    category: "Inovação",
    title: "Um espaço para todos os gamers",
    description:
      "Compartilhe experiências, descubra novas histórias e faça parte de algo maior.",
    link: "/plataforma",
    linkText: "Explorar comunidade",
  },
  {
    image: "/img/fight.png",
    category: "Comunidade",
    title: "Descubra e compartilhe",
    description:
      "Participe de discussões, analise e deixe sua marca na história gamer",
    link: "/plataforma",
    linkText: "Explorar",
  },
  {
    image: "/img/setup.png",
    category: "Diversão",
    title: "Entre para o jogo",
    description: "Receba novidades e atualizações sobre a plataforma.",
    link: "/cadastro",
    linkText: "Inscreva-se",
  },
  {
    image: "/img/povos-originarios.png",
    category: "Diversidade",
    title: "Comunidade brasileira",
    description:
      "Das raízes ancestrais ao pixel art. Conecte-se com gamers que celebram a diversidade cultural brasileira e honram todas as suas histórias.",
    link: "/plataforma",
    linkText: "Começar jornada",
  },
];

export function CommunitiesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <H2 className="mb-4">Descubra sua comunidade gamer</H2>
          <Paragraph variant="text1">
            Nostálgico dos clássicos? Competitivo nas ranked? Ou só curte jogar?
            Aqui todo gamer tem seu espaço para brilhar e se conectar.
          </Paragraph>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community, index) => (
            <Card
              key={index}
              className="group relative h-full flex flex-col overflow-hidden border-neutral-700 hover:border-primary-green-base hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary-green-base/20 focus-within:border-primary-green-base focus-within:ring-2 focus-within:ring-primary-green-base focus-within:ring-offset-2 focus-within:ring-offset-neutral-900"
            >
              <Link
                href={community.link}
                className="absolute inset-0 z-10 focus:outline-none"
                aria-label={`${community.title} - ${community.linkText}`}
              >
                <span className="sr-only">{community.linkText}</span>
              </Link>
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={community.image}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                />
              </div>
              <CardHeader>
                <div className="text-sm text-primary-green-base mb-2 font-semibold">
                  {community.category}
                </div>
                <CardTitle className="text-xl">{community.title}</CardTitle>
              </CardHeader>
              <CardContent className="grow">
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  {community.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <span
                  className="text-primary-green-base group-hover:text-primary-green-darker-1 transition-colors font-semibold"
                  aria-hidden="true"
                >
                  {community.linkText}{" "}
                  <Span className="inline-block group-hover:translate-x-1 transition-transform">
                    →
                  </Span>
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
