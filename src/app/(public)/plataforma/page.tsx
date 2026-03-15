import {
  TeamMemberCard,
  type TeamMember,
} from "@/app/(public)/_components/TeamMemberCard";
import {
  CommitmentCard,
  type Commitment,
} from "@/app/(public)/_components/CommitmentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Gamepad2,
  TrendingUp,
  FileText,
  Users,
  Trophy,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { H1, H2, H3, Paragraph, Span } from "@/components/ui/Typography";
import { promises as fs } from "fs";
import path from "path";

interface PlatformResource {
  id: string;
  category: string;
  resource: string;
  description: string;
  icon: string;
}

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "team-members.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

async function getPlatformResources(): Promise<PlatformResource[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "platform-resources.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error fetching platform resources:", error);
    return [];
  }
}

async function getCommitments(): Promise<Commitment[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "commitments.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error fetching commitments:", error);
    return [];
  }
}

const iconMap: Record<string, LucideIcon> = {
  Gamepad2,
  TrendingUp,
  FileText,
  Users,
  Trophy,
};

export default async function Plataforma() {
  const members = await getTeamMembers();
  const resources = await getPlatformResources();
  const commitments = await getCommitments();

  return (
    <div className="min-h-screen bg-color-background mx-auto space-y-12">
      <section className="bg-background-secondary">
        <div className="p-8 max-w-[1320px] mx-auto">
          <div className="text-center mb-8">
            <H2 className="mb-4">Recursos da Plataforma</H2>
            <Paragraph
              variant="text1"
              weight="bold"
              className="text-color-text-muted max-w-2xl mx-auto p-3"
            >
              Descubra tudo que nossa plataforma oferece para gamers e
              desenvolvedores em uma experiência completa e inovadora.
            </Paragraph>
          </div>

          <div className="rounded-lg overflow-hidden border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                  <TableHead className="text-primary-foreground font-semibold">
                    Categoria
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold">
                    Recurso
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold">
                    Descrição
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => {
                  const Icon = iconMap[resource.icon] || Gamepad2;
                  return (
                    <TableRow
                      key={resource.id}
                      className="bg-background-primary"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary-green-base" />
                          <Span weight="bold">{resource.category}</Span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {resource.resource}
                      </TableCell>
                      <TableCell className="text-color-text-muted">
                        {resource.description}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="p-8 max-w-[1320px] mx-auto">
          <div className="text-center mb-12">
            <H1 className="mb-4">Nosso Compromisso com a Comunidade</H1>
            <Paragraph className="text-color-text-muted max-w-2xl mx-auto">
              Construímos uma plataforma sustentável, transparente e inclusiva
              para todos os gamers.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((commitment) => (
              <CommitmentCard key={commitment.id} commitment={commitment} />
            ))}
          </div>
        </div>

        <div className="bg-background p-8 max-w-[1320px] mx-auto">
          <div
            className="rounded-lg p-6 md:p-8"
            style={{ background: "var(--gradient-sustainability)" }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="shrink-0">
                <Leaf className="h-12 w-12 text-primary-green-base" />
              </div>
              <div className="flex-1">
                <H3 className="mb-2 text-neutral-50">
                  Sustentabilidade Digital:
                </H3>
                <Paragraph variant="text3" className="text-neutral-50">
                  Comprometidos com práticas de desenvolvimento sustentável,
                  otimização de recursos e redução de impacto ambiental em nossa
                  infraestrutura.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-primary">
        <div className="p-8 max-w-[1320px] mx-auto">
          <div className="text-center mb-8">
            <H2 className="mb-4">Conheça Nossa Equipe</H2>
            <Paragraph className="text-color-text-muted max-w-2xl mx-auto">
              Conheça nossa equipe de desenvolvedores e designers que trabalham
              para criar a melhor plataforma para gamers.
            </Paragraph>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
