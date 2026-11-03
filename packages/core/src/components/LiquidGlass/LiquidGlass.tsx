// packages/core/src/components/LiquidGlass/LiquidGlass.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Container, type ContainerSize } from "../Container";

export type LiquidGlassMode = "glass" | "dark" | "light";
export type LiquidGlassBlurPreset = "none" | "sm" | "md" | "golden-gate" | "lg" | "xl";
export type LiquidGlassSpecular = "none" | "subtle" | "crisp" | "refractive";
export type LiquidGlassTint = "neutral" | "warm-gold" | "cool-mist" | "obsidian";
export type LiquidGlassKeylineTint =
  "none" | "emerald" | "indigo" | "amber" | "rose" | "sky" | "purple";
export type LiquidGlassTone = "auto" | "dark" | "light";
export type LiquidGlassRadius = "none" | "md" | "lg" | "full" | "island" | "capsule";
export type LiquidGlassBodyPadding =
  "default" | "compact" | "island" | "compactPill" | "minimal" | "capsule" | "none";
export type LiquidGlassStageWallpaper = "golden-gate" | "coastal-dusk" | "architectural" | "none";

const BLUR_PRESET_PX: Record<LiquidGlassBlurPreset, number> = {
  none: 0,
  sm: 8,
  md: 14,
  "golden-gate": 22,
  lg: 28,
  xl: 40,
};

const STAGE_WALLPAPERS: Record<
  Exclude<LiquidGlassStageWallpaper, "architectural" | "none">,
  string
> = {
  "golden-gate":
    "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "coastal-dusk":
    "https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

function clampNumber(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function resolveLiquidGlassBlurPx(blur: LiquidGlassBlurPreset | number | undefined): number {
  if (blur === undefined) return BLUR_PRESET_PX["golden-gate"];
  if (typeof blur === "number") return clampNumber(blur, 0, 64);
  return BLUR_PRESET_PX[blur];
}

const liquidGlassVariants = cva(
  "relative flex flex-col justify-between overflow-hidden box-border transition-[transform,box-shadow,border-color,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
  {
    variants: {
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-3xl",
        island: "rounded-[36px]",
        capsule: "rounded-full",
      },
      isHoverable: {
        true: "hover:-translate-y-0.5 cursor-pointer",
        false: "",
      },
      isPressable: {
        true: "cursor-pointer active:scale-[0.985] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      radius: "lg",
      isHoverable: false,
      isPressable: false,
    },
  }
);

export interface LiquidGlassProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidGlassVariants> {
  /** Surface rendering mode: refractive Liquid Glass, Obsidian Dark, or Daylight Light */
  mode?: LiquidGlassMode;
  /** Optical blur radius preset or exact pixel value (0-64), modeled on macOS Golden Gate */
  blur?: LiquidGlassBlurPreset | number;
  /** Frost / tint opacity percentage (0-100), modeled on macOS Golden Gate Liquid Glass slider */
  intensity?: number;
  /** Color diffusion saturation percentage (100-220) */
  saturation?: number;
  /** Specular rim highlight & darkened outer edge separation */
  specular?: LiquidGlassSpecular;
  /** Subtle chromatic tint when mode="glass" */
  tint?: LiquidGlassTint;
  /** WidgetKit .keylineTint(_:) semantic 1px outer perimeter border tint for Live Activities */
  keylineTint?: LiquidGlassKeylineTint;
  /** Foreground contrast tone override ("auto" selects dark text on light mode and crisp light text on dark/glass) */
  tone?: LiquidGlassTone;
  /** Concentric corner radius matching CardRadius and DynamicIsland (island = 36px, capsule = rounded-full) */
  radius?: LiquidGlassRadius;
  /** Interactive hover lift */
  isHoverable?: boolean;
  /** Tactile press & keyboard activation */
  isPressable?: boolean;
}

const KEYLINE_TINT_DARK: Record<
  Exclude<LiquidGlassKeylineTint, "none">,
  { border: string; ring: string }
> = {
  emerald: { border: "rgba(52, 211, 153, 0.45)", ring: "0 0 0 0.5px rgba(16, 185, 129, 0.28)" },
  indigo: { border: "rgba(129, 140, 248, 0.48)", ring: "0 0 0 0.5px rgba(99, 102, 241, 0.28)" },
  amber: { border: "rgba(251, 191, 36, 0.45)", ring: "0 0 0 0.5px rgba(245, 158, 11, 0.28)" },
  rose: { border: "rgba(251, 113, 133, 0.46)", ring: "0 0 0 0.5px rgba(244, 63, 94, 0.28)" },
  sky: { border: "rgba(56, 189, 248, 0.46)", ring: "0 0 0 0.5px rgba(14, 165, 233, 0.28)" },
  purple: { border: "rgba(192, 132, 252, 0.46)", ring: "0 0 0 0.5px rgba(168, 85, 247, 0.28)" },
};

const KEYLINE_TINT_LIGHT: Record<
  Exclude<LiquidGlassKeylineTint, "none">,
  { border: string; ring: string }
> = {
  emerald: { border: "rgba(16, 185, 129, 0.38)", ring: "0 0 0 0.5px rgba(16, 185, 129, 0.16)" },
  indigo: { border: "rgba(99, 102, 241, 0.38)", ring: "0 0 0 0.5px rgba(99, 102, 241, 0.16)" },
  amber: { border: "rgba(245, 158, 11, 0.4)", ring: "0 0 0 0.5px rgba(245, 158, 11, 0.16)" },
  rose: { border: "rgba(244, 63, 94, 0.38)", ring: "0 0 0 0.5px rgba(244, 63, 94, 0.16)" },
  sky: { border: "rgba(14, 165, 233, 0.38)", ring: "0 0 0 0.5px rgba(14, 165, 233, 0.16)" },
  purple: { border: "rgba(168, 85, 247, 0.38)", ring: "0 0 0 0.5px rgba(168, 85, 247, 0.16)" },
};

function applyKeylineTint(
  baseStyles: React.CSSProperties,
  keylineTint: LiquidGlassKeylineTint,
  resolvedTone: "dark" | "light"
): React.CSSProperties {
  if (keylineTint === "none") return baseStyles;
  const palette =
    resolvedTone === "light" ? KEYLINE_TINT_LIGHT[keylineTint] : KEYLINE_TINT_DARK[keylineTint];
  return {
    ...baseStyles,
    border: `1px solid ${palette.border}`,
    boxShadow: baseStyles.boxShadow ? `${palette.ring}, ${baseStyles.boxShadow}` : palette.ring,
  };
}

function computeGlassSurfaceStyles({
  mode,
  blurPx,
  intensity,
  saturation,
  specular,
  tint,
  resolvedTone,
}: {
  mode: LiquidGlassMode;
  blurPx: number;
  intensity?: number;
  saturation: number;
  specular: LiquidGlassSpecular;
  tint: LiquidGlassTint;
  resolvedTone: "dark" | "light";
}): React.CSSProperties {
  const sat = clampNumber(saturation, 100, 220);

  if (mode === "dark") {
    const rawIntensity = intensity ?? 92;
    const alpha = Number((0.8 + (clampNumber(rawIntensity, 0, 100) / 100) * 0.18).toFixed(3));
    const activeBlur = blurPx > 0 ? Math.min(blurPx, 28) : 0;
    const rimMap: Record<LiquidGlassSpecular, string> = {
      none: "0 8px 24px -8px rgba(0,0,0,0.45)",
      subtle: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 10px 28px -8px rgba(0,0,0,0.5)",
      crisp:
        "inset 0 1px 0 0 rgba(255,255,255,0.16), inset 0 -1px 0 0 rgba(0,0,0,0.45), 0 0 0 0.5px rgba(0,0,0,0.55), 0 16px 36px -10px rgba(0,0,0,0.55)",
      refractive:
        "inset 0 1.5px 0 0 rgba(255,255,255,0.24), inset 1px 0 0 0 rgba(255,255,255,0.1), inset 0 -1px 0 0 rgba(255,255,255,0.06), 0 18px 42px -10px rgba(0,0,0,0.62)",
    };

    return {
      backgroundColor: `rgba(20, 20, 23, ${alpha})`,
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: rimMap[specular],
      backdropFilter: activeBlur > 0 ? `blur(${activeBlur}px) saturate(130%)` : undefined,
      WebkitBackdropFilter: activeBlur > 0 ? `blur(${activeBlur}px) saturate(130%)` : undefined,
    };
  }

  if (mode === "light") {
    const rawIntensity = intensity ?? 94;
    const alpha = Number((0.84 + (clampNumber(rawIntensity, 0, 100) / 100) * 0.15).toFixed(3));
    const activeBlur = blurPx > 0 ? Math.min(blurPx, 28) : 0;
    const rimMap: Record<LiquidGlassSpecular, string> = {
      none: "0 4px 16px -4px rgba(0,0,0,0.06)",
      subtle: "inset 0 1px 0 0 rgba(255,255,255,0.85), 0 6px 20px -6px rgba(0,0,0,0.08)",
      crisp:
        "inset 0 1px 0 0 rgba(255,255,255,0.95), 0 1px 2px 0 rgba(0,0,0,0.04), 0 12px 30px -8px rgba(0,0,0,0.1)",
      refractive:
        "inset 0 1.5px 0 0 rgba(255,255,255,1), inset 0 -1px 0 0 rgba(0,0,0,0.04), 0 16px 36px -10px rgba(0,0,0,0.12)",
    };

    return {
      backgroundColor: `rgba(255, 255, 255, ${alpha})`,
      border: "1px solid rgba(24, 24, 27, 0.09)",
      boxShadow: rimMap[specular],
      backdropFilter: activeBlur > 0 ? `blur(${activeBlur}px) saturate(140%)` : undefined,
      WebkitBackdropFilter: activeBlur > 0 ? `blur(${activeBlur}px) saturate(140%)` : undefined,
    };
  }

  // mode === "glass" (macOS Golden Gate Liquid Glass optical refraction + WCAG 2.2 AA/AAA legibility floor)
  const clampedIntensity = clampNumber(intensity ?? 56, 8, 92);
  const normalizedIntensity = (clampedIntensity - 8) / 84;
  const alpha =
    resolvedTone === "light"
      ? Number((0.72 + normalizedIntensity * 0.23).toFixed(3))
      : Number((0.56 + normalizedIntensity * 0.32).toFixed(3));

  const rgbByTint: Record<LiquidGlassTint, string> =
    resolvedTone === "light"
      ? {
          neutral: "255, 255, 255",
          "warm-gold": "255, 248, 240",
          "cool-mist": "244, 250, 255",
          obsidian: "242, 242, 246",
        }
      : {
          neutral: "15, 17, 23",
          "warm-gold": "26, 19, 15",
          "cool-mist": "13, 20, 30",
          obsidian: "12, 12, 16",
        };

  const baseRgb = rgbByTint[tint];
  const sheenGradient =
    resolvedTone === "light"
      ? "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.12) 52%, rgba(255,255,255,0.22) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 48%, rgba(0,0,0,0.2) 100%)";

  const borderColor =
    resolvedTone === "light"
      ? "rgba(255, 255, 255, 0.72)"
      : specular === "refractive"
        ? "rgba(255, 255, 255, 0.38)"
        : "rgba(255, 255, 255, 0.28)";

  const shadowMap: Record<LiquidGlassSpecular, string> =
    resolvedTone === "light"
      ? {
          none: "0 8px 24px -8px rgba(15, 23, 42, 0.12)",
          subtle:
            "inset 0 1px 0 0 rgba(255,255,255,0.75), 0 12px 30px -10px rgba(15, 23, 42, 0.14)",
          crisp:
            "inset 0 1px 0 0 rgba(255,255,255,0.92), inset 0 -1px 0 0 rgba(15,23,42,0.08), 0 16px 38px -10px rgba(15, 23, 42, 0.18)",
          refractive:
            "inset 0 1.5px 0 0 rgba(255,255,255,0.98), inset 1px 0 0 0 rgba(255,255,255,0.55), inset 0 -1px 0 0 rgba(255,255,255,0.35), 0 20px 44px -12px rgba(15, 23, 42, 0.22)",
        }
      : {
          none: "0 12px 32px -10px rgba(0, 0, 0, 0.42)",
          subtle: "inset 0 1px 0 0 rgba(255,255,255,0.22), 0 16px 36px -10px rgba(0, 0, 0, 0.44)",
          crisp:
            "inset 0 1px 0 0 rgba(255,255,255,0.42), inset 0 -1px 0 0 rgba(255,255,255,0.1), 0 18px 42px -12px rgba(0, 0, 0, 0.48)",
          refractive:
            "inset 0 1.5px 0 0 rgba(255,255,255,0.56), inset 1px 0 0 0 rgba(255,255,255,0.24), inset 0 -1px 0 0 rgba(255,255,255,0.16), 0 22px 48px -12px rgba(0, 0, 0, 0.54)",
        };

  const filterValue = blurPx > 0 ? `blur(${blurPx}px) saturate(${sat}%)` : `saturate(${sat}%)`;

  return {
    backgroundColor: `rgba(${baseRgb}, ${alpha})`,
    backgroundImage: specular === "none" ? undefined : sheenGradient,
    border: `1px solid ${borderColor}`,
    boxShadow: shadowMap[specular],
    backdropFilter: filterValue,
    WebkitBackdropFilter: filterValue,
  };
}

const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      className,
      style,
      mode = "glass",
      blur = "golden-gate",
      intensity,
      saturation = 175,
      specular = "crisp",
      tint = "neutral",
      keylineTint = "none",
      tone = "auto",
      radius = "lg",
      isHoverable = false,
      isPressable = false,
      children,
      tabIndex,
      role,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const blurPx = resolveLiquidGlassBlurPx(blur);
    const resolvedTone: "dark" | "light" =
      tone !== "auto" ? tone : mode === "light" ? "light" : "dark";

    const computedStyle = applyKeylineTint(
      computeGlassSurfaceStyles({
        mode,
        blurPx,
        intensity,
        saturation,
        specular,
        tint,
        resolvedTone,
      }),
      keylineTint,
      resolvedTone
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (isPressable && onClick && !e.defaultPrevented && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <div
        ref={ref}
        data-glass-mode={mode}
        data-hb-theme={resolvedTone}
        data-keyline-tint={keylineTint !== "none" ? keylineTint : undefined}
        role={isPressable ? (role ?? "button") : role}
        tabIndex={isPressable ? (tabIndex ?? 0) : tabIndex}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          resolvedTone === "dark" ? "dark text-white" : "text-zinc-900",
          liquidGlassVariants({
            radius,
            isHoverable,
            isPressable,
          }),
          className
        )}
        style={{
          ...computedStyle,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
LiquidGlass.displayName = "LiquidGlass";

export interface LiquidGlassHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const LiquidGlassHeader = React.forwardRef<HTMLDivElement, LiquidGlassHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-10 flex w-full shrink-0 items-center justify-between gap-3 px-6 pt-5 pb-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LiquidGlassHeader.displayName = "LiquidGlassHeader";

const liquidGlassBodyPaddingClasses: Record<LiquidGlassBodyPadding, string> = {
  default: "px-6 py-4 leading-relaxed",
  compact: "px-4 py-3 leading-normal",
  island: "p-5 leading-normal",
  compactPill: "px-3.5 py-1.5 min-h-[42px] flex items-center leading-none",
  minimal: "p-0 flex h-[44px] w-[44px] items-center justify-center leading-none",
  capsule: "p-2.5 leading-none",
  none: "p-0",
};

export interface LiquidGlassBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: LiquidGlassBodyPadding;
}

const LiquidGlassBody = React.forwardRef<HTMLDivElement, LiquidGlassBodyProps>(
  ({ className, padding = "default", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-auto w-full flex-1 overflow-visible text-left text-sm font-normal break-words text-zinc-700 dark:text-zinc-200 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100",
        liquidGlassBodyPaddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LiquidGlassBody.displayName = "LiquidGlassBody";

export interface LiquidGlassFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  isBlurred?: boolean;
}

const LiquidGlassFooter = React.forwardRef<HTMLDivElement, LiquidGlassFooterProps>(
  ({ className, isBlurred = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-10 flex w-full shrink-0 items-center justify-between gap-3 px-6 pt-2 pb-5 text-xs font-medium text-zinc-600 dark:text-zinc-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100/95",
        isBlurred &&
          "border-t border-black/[0.08] bg-white/40 py-3.5 backdrop-blur-xl dark:border-white/10 dark:bg-black/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LiquidGlassFooter.displayName = "LiquidGlassFooter";

export interface LiquidGlassStageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Synchronizes the backdrop stage with the active LiquidGlass mode */
  mode?: LiquidGlassMode;
  /** Ambient backdrop preset used when mode="glass" so refractive blur is genuinely visible */
  wallpaper?: LiquidGlassStageWallpaper;
  /** Custom image URL override when mode="glass" */
  wallpaperUrl?: string;
  /** Internal stage padding */
  padding?: "sm" | "md" | "lg";
  /** Macro layout Container width constraint inside the stage (@default "fluid") */
  containerSize?: ContainerSize;
}

const stagePaddingClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "p-5 sm:p-6",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
};

const LiquidGlassStage = React.forwardRef<HTMLDivElement, LiquidGlassStageProps>(
  (
    {
      className,
      mode = "glass",
      wallpaper = "golden-gate",
      wallpaperUrl,
      padding = "lg",
      containerSize = "fluid",
      children,
      ...props
    },
    ref
  ) => {
    const isLightStage = mode === "light";
    const resolvedImage =
      mode === "glass"
        ? (wallpaperUrl ??
          (wallpaper === "golden-gate" || wallpaper === "coastal-dusk"
            ? STAGE_WALLPAPERS[wallpaper]
            : undefined))
        : undefined;

    return (
      <div
        ref={ref}
        data-stage-mode={mode}
        data-hb-theme={isLightStage ? "light" : "dark"}
        className={cn(
          "relative isolate w-full overflow-hidden rounded-[22px] border transition-colors duration-300",
          isLightStage
            ? "border-zinc-200/90 bg-zinc-100/90 text-zinc-900"
            : mode === "dark"
              ? "dark border-white/[0.08] bg-[#121215] text-zinc-100"
              : "dark border-white/15 bg-[#1a1618] text-white",
          stagePaddingClasses[padding],
          className
        )}
        {...props}
      >
        {mode === "glass" && wallpaper !== "none" && (
          <>
            {/* Warm Golden Gate coastal dusk base layer for instant zero-CLS optical refraction */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,#2b1816_0%,#5c2c24_28%,#a8553a_56%,#27384c_84%,#141c27_100%)]"
            />
            {resolvedImage && (
              <img
                src={resolvedImage}
                alt=""
                aria-hidden="true"
                width={1400}
                height={800}
                loading="lazy"
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center select-none"
              />
            )}
            {/* Apple HIG Deference Scrim: ensures busy photography defers to foreground UI & captions */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-slate-950/28 bg-gradient-to-b from-slate-950/30 via-slate-950/16 to-slate-950/58"
            />
          </>
        )}

        <Container size={containerSize} gutter="none" className="relative z-10">
          {children}
        </Container>
      </div>
    );
  }
);
LiquidGlassStage.displayName = "LiquidGlassStage";

export interface LiquidGlassSensorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optical geometry matching Compact vs Expanded Dynamic Island hardware aperture */
  size?: "compact" | "expanded";
}

const LiquidGlassSensor = React.forwardRef<HTMLDivElement, LiquidGlassSensorProps>(
  ({ className, size = "compact", ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      data-slot="dynamic-island-sensor"
      className={cn(
        "pointer-events-none shrink-0 select-none",
        size === "compact" ? "h-[22px] w-[66px] sm:w-[76px]" : "h-[20px] w-[72px] sm:w-[84px]",
        className
      )}
      {...props}
    />
  )
);
LiquidGlassSensor.displayName = "LiquidGlassSensor";

export interface LiquidGlassIslandCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  /** WidgetKit compactLeading region (left of the TrueDepth sensor) */
  leading: React.ReactNode;
  /** WidgetKit compactTrailing region (right of the TrueDepth sensor; optional for Minimal attached pill) */
  trailing?: React.ReactNode;
  /** Whether to render the centered TrueDepth sensor hardware aperture (@default true) */
  showSensor?: boolean;
}

const LiquidGlassIslandCompact = React.forwardRef<HTMLDivElement, LiquidGlassIslandCompactProps>(
  ({ className, leading, trailing, showSensor = true, ...props }, ref) => {
    if (!trailing) {
      return (
        <div
          ref={ref}
          data-slot="dynamic-island-minimal-attached"
          className={cn("flex w-full items-center justify-between gap-2.5", className)}
          {...props}
        >
          <div className="flex min-w-0 items-center justify-start gap-2 leading-none">
            {leading}
          </div>
          {showSensor && <LiquidGlassSensor size="compact" />}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="dynamic-island-compact"
        className={cn(
          "grid w-full items-center gap-3",
          showSensor ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[1fr_auto]",
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 items-center justify-start gap-2 leading-none">{leading}</div>
        {showSensor && <LiquidGlassSensor size="compact" />}
        <div className="flex min-w-0 items-center justify-end gap-2 leading-none">{trailing}</div>
      </div>
    );
  }
);
LiquidGlassIslandCompact.displayName = "LiquidGlassIslandCompact";

export interface LiquidGlassIslandExpandedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** WidgetKit DynamicIslandExpandedRegion.leading (top-left flanking the TrueDepth sensor) */
  leading?: React.ReactNode;
  /** WidgetKit DynamicIslandExpandedRegion.trailing (top-right flanking the TrueDepth sensor) */
  trailing?: React.ReactNode;
  /** WidgetKit DynamicIslandExpandedRegion.center (.belowIfTooWide unobstructed region below sensor) */
  center?: React.ReactNode;
  /** WidgetKit DynamicIslandExpandedRegion.bottom (full-width lower region for scrubbers & 44pt actions) */
  bottom?: React.ReactNode;
  /** Whether to render the centered TrueDepth sensor hardware aperture (@default true) */
  showSensor?: boolean;
}

const LiquidGlassIslandExpanded = React.forwardRef<HTMLDivElement, LiquidGlassIslandExpandedProps>(
  ({ className, leading, trailing, center, bottom, showSensor = true, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dynamic-island-expanded"
      className={cn("flex w-full flex-col gap-3.5", className)}
      {...props}
    >
      {(leading || trailing || showSensor) && (
        <div
          className={cn(
            "grid w-full items-center gap-3",
            showSensor ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[1fr_auto]"
          )}
        >
          <div className="flex min-w-0 items-center justify-start gap-2.5">{leading}</div>
          {showSensor && <LiquidGlassSensor size="expanded" />}
          <div className="flex min-w-0 items-center justify-end gap-2">{trailing}</div>
        </div>
      )}

      {center && (
        <div data-region="center" className="w-full min-w-0">
          {center}
        </div>
      )}

      {bottom && (
        <div data-region="bottom" className="flex w-full flex-col gap-3.5">
          {bottom}
        </div>
      )}
    </div>
  )
);
LiquidGlassIslandExpanded.displayName = "LiquidGlassIslandExpanded";

export {
  LiquidGlass,
  LiquidGlassHeader,
  LiquidGlassBody,
  LiquidGlassFooter,
  LiquidGlassStage,
  LiquidGlassSensor,
  LiquidGlassIslandCompact,
  LiquidGlassIslandExpanded,
  liquidGlassVariants,
};
