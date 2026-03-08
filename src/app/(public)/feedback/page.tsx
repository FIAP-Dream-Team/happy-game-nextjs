"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@feedback/_components/HeroSection";
import { BenefitsSection } from "@feedback/_components/BenefitsSection";
import { CTASection } from "@feedback/_components/CTASection";
import { Paragraph } from "@/components/ui/Typography";
import type { UserFeedbackData } from "@feedback/types";
import { Loader2 } from "lucide-react";

export default function FeedbackPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserFeedbackData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Get user data from sessionStorage (only runs on client)
    const storedData = sessionStorage.getItem("userFeedbackData");

    if (!storedData) {
      // Redirect to signup if no data found
      router.push("/cadastro");
      return;
    }

    try {
      const data: UserFeedbackData = JSON.parse(storedData);
      setUserData(data);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/cadastro");
    }
  }, [router]);

  // Prevent SSR/hydration issues
  if (!isMounted || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <Paragraph className="text-text-muted">Carregando...</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection fullName={userData.fullName} platform={userData.platform} />
      <BenefitsSection genres={userData.genres} />
      <CTASection />
    </div>
  );
}
