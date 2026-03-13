import * as React from "react";

import { cn } from "@/lib/utils";

export type TypographyVariant =
  | "text1"
  | "text2"
  | "text3"
  | "text4"
  | "text5"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "display1"
  | "display2"
  | "display3"
  | "display4";

export type TypographyWeight = "regular" | "bold";

export type TypographyColor = "default";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  component?: React.ElementType;
}

const variantToClasses: Record<TypographyVariant, string> = {
  text1: "text-[16px] md:text-[18px]",
  text2: "text-[14px] md:text-[16px]",
  text3: "text-[12px] md:text-[14px]",
  text4: "text-[10px] md:text-[12px]",
  text5: "text-[8px] md:text-[10px]",
  heading1: "text-[28px] md:text-[40px] font-bold",
  heading2: "text-[24px] md:text-[32px] font-bold",
  heading3: "text-[20px] md:text-[24px] font-bold",
  heading4: "text-[18px] md:text-[20px] font-bold",
  display1: "font-heading text-[48px] md:text-[80px] font-bold",
  display2: "font-heading text-[44px] md:text-[64px] font-bold",
  display3: "font-heading text-[40px] md:text-[56px] font-bold",
  display4: "font-heading text-[32px] md:text-[48px] font-bold",
};

const colorToClasses: Record<TypographyColor, string> = {
  default: "",
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      className = "",
      variant = "text2",
      weight = "regular",
      color = "default",
      component,
      ...rest
    },
    ref,
  ) => {
    const isTextVariant = variant.startsWith("text");
    const isHeadingVariant = variant.startsWith("heading");
    const defaultComponent: React.ElementType = isHeadingVariant
      ? (`h${variant.replace("heading", "")}` as React.ElementType)
      : "p";

    const Component = component ?? defaultComponent;
    const variantClass = variantToClasses[variant];
    const colorClass = colorToClasses[color];
    const weightClass =
      isTextVariant && weight === "bold"
        ? "font-bold"
        : isTextVariant
          ? "font-normal"
          : "";

    const classes = cn(
      "leading-auto",
      variantClass,
      weightClass,
      colorClass,
      className,
    );

    return (
      <Component
        className={classes}
        ref={ref as React.Ref<HTMLElement>}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

const createTypographyComponent = <T extends HTMLElement>(
  variant: TypographyVariant,
  component?: React.ElementType,
) => {
  const Component = React.forwardRef<T, TypographyProps>(
    ({ children, className, ...rest }, ref) => (
      <Typography
        variant={variant}
        component={component}
        className={className}
        ref={ref}
        {...rest}
      >
        {children}
      </Typography>
    ),
  );
  Component.displayName = `Typography.${variant}`;
  return Component;
};

const Display1 = createTypographyComponent<HTMLHeadingElement>(
  "display1",
  "h1",
);
const Display2 = createTypographyComponent<HTMLHeadingElement>(
  "display2",
  "h1",
);
const Display3 = createTypographyComponent<HTMLHeadingElement>(
  "display3",
  "h1",
);
const H1 = createTypographyComponent<HTMLHeadingElement>("heading1", "h1");
const H2 = createTypographyComponent<HTMLHeadingElement>("heading2", "h2");
const H3 = createTypographyComponent<HTMLHeadingElement>("heading3", "h3");
const H4 = createTypographyComponent<HTMLHeadingElement>("heading4", "h4");
const Paragraph = createTypographyComponent<HTMLParagraphElement>("text2", "p");
const Span = createTypographyComponent<HTMLSpanElement>("text2", "span");

export { H1, H2, H3, H4, Paragraph, Span, Display1, Display2, Display3 };
