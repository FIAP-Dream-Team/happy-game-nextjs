"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Gamepad2,
  Headphones,
  Home,
  Leaf,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Medal,
  Menu,
  Moon,
  Rocket,
  Shield,
  Sparkles,
  Sun,
  Sword,
  Swords,
  Target,
  Trophy,
  TrendingUp,
  User,
  Users,
  X,
  type LucideIcon,
  GalleryHorizontalEnd,
  PanelsTopLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap = {
  ArrowLeft,
  ArrowRight,
  Box,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Gamepad2,
  Headphones,
  Home,
  Leaf,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Medal,
  Menu,
  Moon,
  Rocket,
  Shield,
  Sparkles,
  Sun,
  Sword,
  Swords,
  Target,
  Trophy,
  TrendingUp,
  User,
  Users,
  X,
  GalleryHorizontalEnd,
  PanelsTopLeft,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  "ref"
> {
  name: IconName;
  size?: number;
  className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 24, className, ...props }, ref) => {
    const LucideIcon = iconMap[name];
    if (!LucideIcon) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Icon] Ícone não encontrado: "${name}". Adicione em src/components/ui/Icon.tsx`,
        );
      }
      return null;
    }
    return (
      <LucideIcon
        ref={ref}
        size={size}
        className={cn("shrink-0", className)}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

export { Icon, iconMap };
