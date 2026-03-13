import { Shield, Eye, Users, type LucideIcon } from "lucide-react";
import { H3, Paragraph, Span } from "@/components/ui/Typography";

export interface Commitment {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: string[];
}

interface CommitmentCardProps {
  commitment: Commitment;
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Eye,
  Users,
};

export function CommitmentCard({ commitment }: CommitmentCardProps) {
  const Icon = iconMap[commitment.icon] || Shield;

  return (
    <div className="rounded-lg bg-background-primary p-6 space-y-4 cursor-pointer hover:transition-transform hover:scale-[1.02] border border-border">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary-green-base p-4">
          <Icon className="h-8 w-8 " />
        </div>
      </div>

      <H3 className="text-center">{commitment.title}</H3>

      <Paragraph variant="text3" className="text-color-text-muted text-center">
        {commitment.description}
      </Paragraph>

      <ul className="space-y-2">
        {commitment.points.map((point, index) => (
          <li key={index}>
            {index > 0 && <div className="border-t border-border mb-2 mt-2" />}
            <Span variant="text3">{point}</Span>
          </li>
        ))}
      </ul>
    </div>
  );
}
