import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded px-2 py-1 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-action-primary-default text-action-white",
        secondary: "bg-surface-secondary text-action-white",
        tertiary: "bg-surface-tertiary text-action-white",
        neutral: "bg-surface-neutral text-text-primary",
        error: "bg-surface-error text-action-white",
        warning: "bg-surface-warning text-action-white",
        success: "bg-surface-success text-action-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
