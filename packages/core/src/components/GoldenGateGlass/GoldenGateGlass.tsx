// packages/core/src/components/GoldenGateGlass/GoldenGateGlass.tsx
// macOS 27 "Golden Gate" glassmorphism: 22px backdrop blur, translucent
// frosted surface, 1px hairline border, subtle specular sheen and soft shadow.
"use client";

import * as React from "react";
import { cn } from "../../utils/cn";
import { LiquidGlass } from "../LiquidGlass";

type GoldenGateGlassSize = "sm" | "md" | "lg" | "full";
type GoldenGateGlassTone = "auto" | "light" | "dark";
const GOLDEN_GATE_BLUR_PX = 22;
const GOLDEN_GATE_INTENSITY = 56;
const GOLDEN_GATE_SATURATION = 175;

export interface GoldenGateGlassProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "blur" | "intensity" | "saturation" | "tone"
> {
  /** Border radius: sm, md, lg or full (macOS island/capsule style) */
  size?: GoldenGateGlassSize;
  /** Foreground contrast tone override */
  tone?: GoldenGateGlassTone;
  /** Whether the surface lifts slightly on hover */
  isHoverable?: boolean;
  /** Whether the surface is pressable (tactile) */
  isPressable?: boolean;
  children?: React.ReactNode;
}

const RADIUS_BY_SIZE: Record<GoldenGateGlassSize, string> = {
  sm: "rounded-2xl",
  md: "rounded-3xl",
  lg: "rounded-[36px]",
  full: "rounded-full",
};

export const GoldenGateGlass = React.forwardRef<HTMLDivElement, GoldenGateGlassProps>(
  (
    {
      className,
      size = "lg",
      tone = "auto",
      isHoverable = false,
      isPressable = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <LiquidGlass
        ref={ref}
        mode="glass"
        blur={GOLDEN_GATE_BLUR_PX}
        intensity={GOLDEN_GATE_INTENSITY}
        saturation={GOLDEN_GATE_SATURATION}
        specular="crisp"
        tint="neutral"
        tone={tone}
        radius={size as any}
        isHoverable={isHoverable}
        isPressable={isPressable}
        className={cn(
          RADIUS_BY_SIZE[size],
          "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          className
        )}
        {...props}
      >
        {children}
      </LiquidGlass>
    );
  }
);

GoldenGateGlass.displayName = "GoldenGateGlass";

export type { GoldenGateGlassSize, GoldenGateGlassTone };
