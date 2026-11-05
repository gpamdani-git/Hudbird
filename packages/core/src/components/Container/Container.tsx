// packages/core/src/components/Container/Container.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type ContainerSize = "sm" | "md" | "prose" | "lg" | "xl" | "2xl" | "fluid";
export type ContainerGutter = "none" | "sm" | "md" | "lg";

const containerVariants = cva("w-full transition-all duration-150", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      prose: "max-w-3xl",
      lg: "max-w-screen-lg",
      xl: "max-w-7xl",
      "2xl": "max-w-[1440px]",
      fluid: "max-w-none",
    },
    gutter: {
      none: "px-0",
      sm: "px-4",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
    centered: {
      true: "mx-auto",
      false: "",
    },
  },
  defaultVariants: {
    size: "xl",
    gutter: "md",
    centered: true,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  /**
   * The underlying semantic HTML tag to render.
   * @default "div"
   */
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = "div",
      size = "xl",
      gutter = "md",
      centered = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return React.createElement(
      Component,
      {
        ref,
        className: cn(containerVariants({ size, gutter, centered }), className),
        ...props,
      },
      children
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
