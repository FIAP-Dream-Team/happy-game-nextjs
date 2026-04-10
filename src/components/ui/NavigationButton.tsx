"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Span } from "@/components/ui/Typography";
import { Button } from "@components/ui/Button";

export interface NavigationButtonProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href: string;
  icon: IconName;
  name: string;
  isActive: boolean;
}

const NavigationButton = React.forwardRef<
  HTMLAnchorElement,
  NavigationButtonProps
>(({ href, icon, name, isActive, ...props }, ref) => {
  return (
    <Button
      className="flex flex-col gap-0"
      variant={isActive ? "default" : "tertiary"}
      size="large"
      asChild
    >
      <Link
        ref={ref}
        href={href}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        <Icon name={icon} />
        <Span variant="text4">{name}</Span>
      </Link>
    </Button>
  );
});

NavigationButton.displayName = "NavigationButton";

export { NavigationButton };
