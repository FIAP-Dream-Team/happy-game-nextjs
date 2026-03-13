import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { H3, Paragraph } from "@/components/ui/Typography";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-border hover:transition-transform hover:scale-[1.02] cursor-pointer">
      <div className="relative w-full aspect-square">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 bg-background-secondary space-y-3 h-full  ">
        <H3 className="text-center">{member.name}</H3>

        <div className="flex justify-center">
          <Badge variant="default">{member.role}</Badge>
        </div>

        <Paragraph
          variant="text3"
          className="text-color-text-muted text-center"
        >
          {member.bio}
        </Paragraph>
      </div>
    </div>
  );
}
