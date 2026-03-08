"use client";

import { useState, useCallback } from "react";
import { useKonamiCode } from "@home/_components/hooks/useKonamiCode";
import { FloatingBalloon } from "@home/_components/FloatingBalloon";
import { AchievementModal } from "@home/_components/AchievementModal";

export function KonamiCodeEasterEgg() {
  const [showBalloon, setShowBalloon] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleKonamiActivated = useCallback(() => {
    setShowBalloon(false);
    setShowModal(true);
  }, []);

  useKonamiCode(handleKonamiActivated);

  return (
    <>
      {showBalloon && <FloatingBalloon />}
      <AchievementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
