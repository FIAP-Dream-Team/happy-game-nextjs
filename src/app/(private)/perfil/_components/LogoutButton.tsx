"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Button onClick={handleLogout} variant="secondary">
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
}
