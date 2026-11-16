"use client";
import * as React from "react";
import {
  Section,
  Container,
  Heading,
  Text,
  Button,
  Badge,
  IconBox,
  MotionReveal,
} from "@hudbird/ui";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import type {
  LandingAction,
  LandingMotionProfile,
  LandingSectionType,
  SectionAppearanceSettings,
  SectionGridSettings,
} from "@hudbird/schemas";
import { cn } from "../../utils/cn";
import "./landing.css";
export { BrandScope } from "../HeroSection/BrandScope";
export * from "./FullscreenVideoPlayer";

export const landingSectionTypes: LandingSectionType[] = [
  "navbar",
  "hero",
  "logos",
  "benefits",
  "features",
  "how-it-works",
  "integrations",
  "testimonials",
  "pricing",
  "faq",
  "cta",
  "footer",
];
export const LandingNavigationContext = React.createContext({
  visible: landingSectionTypes,
  hrefFor: (href: string) => href,
});
export const useLandingNavigation = () => React.useContext(LandingNavigationContext);

export const LandingSectionIdContext = React.createContext<{
  sectionId?: string;
  badge?: string;
  appearance?: SectionAppearanceSettings;
}>({});
export const useLandingSectionId = () => React.useContext(LandingSectionIdContext);
export const useLandingAppearance = () => React.useContext(LandingSectionIdContext).appearance;

const defaultMotion: LandingMotionProfile = {
  reveal: "subtle",
  autoplay: true,
  smoothScroll: true,
};
export const LandingMotionContext = React.createContext(defaultMotion);
export const useLandingMotion = () => React.useContext(LandingMotionContext);

export function LandingReveal({ children }: { children: React.ReactNode }) {
  const profile = useLandingMotion();
  return profile.reveal === "subtle" ? <MotionReveal>{children}</MotionReveal> : children;
}

function subscribeMode(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
export function useLandingMode(): "light" | "dark" {
  return React.useSyncExternalStore(
    subscribeMode,
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => "light"
  );
}

const alternatingSections = new Set<string>(["benefits", "how-it-works", "testimonials", "faq"]);

export function LandingFrame({
  id,
  as,
  children,
  compact = false,
}: {
  id: LandingSectionType | string;
  as?: "header" | "footer";
  children: React.ReactNode;
  compact?: boolean;
}) {
  const isAlt = alternatingSections.has(id);
  const isNavbar = id === "navbar";
  const existingCtx = useLandingSectionId();
  const resolvedId = existingCtx.appearance?.anchorId?.trim() || id;
  return (
    <LandingSectionIdContext.Provider
      value={{
        sectionId: existingCtx.sectionId ?? id,
        badge: existingCtx.badge,
        appearance: existingCtx.appearance,
      }}
    >
      <Section
        as={as}
        id={resolvedId}
        data-landing-section={id}
        spacing={isNavbar ? "none" : compact ? "sm" : "lg"}
        bordered={isNavbar ? false : "top"}
        className={
          isNavbar
            ? "hb-navbar-frame z-50 bg-transparent"
            : compact
              ? undefined
              : isAlt
                ? "hb-section bg-zinc-50/55 dark:bg-white/[0.015]"
                : "hb-section"
        }
      >
        <Container
          size={isNavbar ? "fluid" : "xl"}
          gutter={isNavbar ? "none" : "lg"}
          className={isNavbar ? undefined : "hb-frame-container"}
        >
          {id === "navbar" || id === "footer" ? (
            children
          ) : (
            <LandingReveal>{children}</LandingReveal>
          )}
        </Container>
      </Section>
    </LandingSectionIdContext.Provider>
  );
}

export function LandingHeading({
  title,
  description,
  eyebrow,
  centered = false,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  centered?: boolean;
}) {
  const { sectionId, badge, appearance } = useLandingSectionId();
  const resolvedEyebrow = badge?.trim() ? badge : eyebrow;
  const headingCfg = appearance?.heading;
  const textCfg = appearance?.text;
  const badgeCfg = appearance?.badgeStyle;
  return (
    <div
      className={
        centered
          ? "hb-heading-wrap mb-12 text-center sm:mb-16 [&>h2]:mx-auto [&>p]:mx-auto"
          : "hb-heading-wrap mb-12 max-w-3xl sm:mb-16"
      }
    >
      {resolvedEyebrow && (
        <div className={centered ? "mb-3.5 flex justify-center" : "mb-3.5 flex items-center"}>
          <Badge
            variant={badgeCfg?.variant ?? "modern"}
            color={badgeCfg?.color}
            size={badgeCfg?.size ?? "sm"}
            data-hb-node="badge"
            data-hb-edit={sectionId ? `${sectionId}:badge` : undefined}
            className={cn("gap-2", !badgeCfg?.size && "px-3.5 py-1.5 text-xs font-medium")}
          >
            {badgeCfg?.showPulseDot ? (
              <span
                data-hb-pulse-dot="true"
                className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
            )}
            <span data-hb-edit-text="">{resolvedEyebrow}</span>
          </Badge>
        </div>
      )}
      <Heading
        as="h2"
        size={headingCfg?.size}
        tracking={headingCfg?.tracking}
        color={headingCfg?.color}
        withDivider={headingCfg?.withDivider}
        data-hb-node="heading"
        data-hb-edit={sectionId ? `${sectionId}:title` : undefined}
        className={cn(
          !headingCfg?.size && "hb-subheading font-semibold",
          "max-w-[26ch] text-balance"
        )}
      >
        {title}
      </Heading>
      {description && (
        <Text
          variant={textCfg?.variant}
          weight={textCfg?.weight}
          align={textCfg?.align}
          data-hb-node="text"
          data-hb-edit={sectionId ? `${sectionId}:description` : undefined}
          className={cn(
            "text-muted-foreground mt-4 max-w-[56ch] sm:mt-5",
            !textCfg?.variant && "text-base leading-[1.65] sm:text-[17px]",
            !textCfg?.weight && "font-normal"
          )}
        >
          {description}
        </Text>
      )}
    </div>
  );
}

export function LandingCheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <IconBox
        size="xs"
        variant="double-ring"
        icon={Check}
        showGlow={false}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />
      <Text as="span" className="text-muted-foreground text-sm leading-relaxed sm:text-base">
        {children}
      </Text>
    </li>
  );
}

export function LandingActionButton({
  action,
  secondary = false,
  fullWidth = false,
  size,
  className = "",
  onClick,
  editField,
}: {
  action: LandingAction;
  secondary?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  editField?: string;
}) {
  const { hrefFor } = useLandingNavigation();
  const { sectionId, appearance } = useLandingSectionId();
  const resolvedEditField =
    editField ?? (sectionId === "navbar" ? "navbar:action.label" : undefined);
  const href = hrefFor(action.href);
  const btnCfg = secondary ? appearance?.secondaryButton : appearance?.button;
  const hasCustomButtonProps = Boolean(
    btnCfg && (btnCfg.variant || btnCfg.color || btnCfg.size || btnCfg.radius)
  );

  if (secondary || hasCustomButtonProps) {
    const resolvedVariant = btnCfg?.variant ?? (secondary ? "outline" : "solid");
    const resolvedColor = btnCfg?.color ?? (secondary ? undefined : "primary");
    return (
      <Button
        href={href}
        variant={resolvedVariant}
        color={resolvedColor}
        size={btnCfg?.size ?? size}
        radius={btnCfg?.radius}
        onClick={onClick}
        data-hb-node={secondary ? "secondary-button" : "primary-button"}
        data-hb-edit={resolvedEditField}
        className={cn(
          !btnCfg?.variant && !btnCfg?.color && (secondary ? "hb-secondary" : "hb-primary"),
          !btnCfg?.radius && "hb-radius",
          fullWidth && "w-full",
          className
        )}
      >
        <span data-hb-edit-text="">{action.label}</span>
      </Button>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      data-hb-node="primary-button"
      data-hb-edit={resolvedEditField}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--hb-accent,var(--primary,#2457d6))] px-5 py-2.5 text-sm font-semibold tracking-tight text-[var(--hb-on-accent,var(--primary-foreground,#ffffff))] shadow-xs transition-all hover:opacity-95 hover:shadow-md active:scale-95 sm:px-6 sm:py-2.5",
        "hb-primary hb-cta",
        fullWidth && "w-full",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span data-hb-edit-text="">{action.label}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
    </a>
  );
}

export function LandingDemoNote({
  children = "Illustrative content. Not a live service.",
}: {
  children?: React.ReactNode;
}) {
  return (
    <Text variant="small" className="text-muted-foreground mt-8 opacity-80">
      {children}
    </Text>
  );
}

export function resolveLandingGridProps(
  grid?: SectionGridSettings,
  defaults: {
    cols?: 1 | 2 | 3 | 4;
    gap?: "sm" | "md" | "lg" | "xl";
    align?: "start" | "center" | "stretch";
  } = {}
): {
  cols: 1 | 2 | 3 | 4;
  gap: "sm" | "md" | "lg" | "xl";
  align: "start" | "center" | "stretch";
  "data-hb-node": "grid";
  "data-hb-grid": string;
} {
  const cols = !grid?.columns || grid.columns === "auto" ? (defaults.cols ?? 3) : grid.columns;
  const gap =
    grid?.gap === "tight"
      ? "sm"
      : grid?.gap === "relaxed"
        ? "lg"
        : grid?.gap === "normal"
          ? "md"
          : (defaults.gap ?? "md");
  const align = grid?.align ?? defaults.align ?? "stretch";
  return {
    cols,
    gap,
    align,
    "data-hb-node": "grid",
    "data-hb-grid": `${cols}:${gap}:${align}`,
  };
}

export { resolveMarketingIcon, MARKETING_ICON_REGISTRY } from "./marketingIcons";

export function renderInlineFormattedText(text: string): React.ReactNode {
  if (!text || !text.includes("*")) return text;
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={index} data-hb-italic="true" className="font-serif font-normal italic">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
