import { HeroSection } from "@home/_components/HeroSection";
import { CommunitiesSection } from "@home/_components/CommunitiesSection";
import { StatsSection } from "@home/_components/StatsSection";
import { CTASection } from "@home/_components/CTASection";
import { GameGodImage } from "@home/_components/GameGodImage";
import { KonamiCodeEasterEgg } from "@home/_components/KonamiCodeEasterEgg";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CommunitiesSection />
      <StatsSection />
      <GameGodImage />
      <CTASection />
      <KonamiCodeEasterEgg />
    </div>
  );
}
