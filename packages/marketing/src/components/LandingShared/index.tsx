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
import { Check } from "lucide-react";
import type { LandingAction, LandingMotionProfile, LandingSectionType } from "@hudbird/schemas";
import "./landing.css";
export { BrandScope } from "../HeroSection";

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
  return (
    <Section
      as={as}
      id={id}
      data-landing-section={id}
      spacing={isNavbar ? "none" : compact ? "sm" : "lg"}
      bordered={isNavbar ? false : "top"}
      className={
        isNavbar
          ? "hb-navbar-frame z-40 bg-transparent"
          : compact
            ? undefined
            : isAlt
              ? "hb-section bg-zinc-50/55 dark:bg-white/[0.015]"
              : "hb-section"
      }
    >
      <Container size={isNavbar ? "fluid" : "xl"} gutter={isNavbar ? "none" : "lg"}>
        {id === "navbar" || id === "footer" ? children : <LandingReveal>{children}</LandingReveal>}
      </Container>
    </Section>
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
  return (
    <div
      className={
        centered
          ? "mb-12 text-center sm:mb-16 [&>h2]:mx-auto [&>p]:mx-auto"
          : "mb-12 max-w-3xl sm:mb-16"
      }
    >
      {eyebrow && (
        <div className={centered ? "mb-3.5 flex justify-center" : "mb-3.5 flex items-center"}>
          <Badge variant="modern" size="sm" className="gap-1.5 px-2.5 py-1 text-xs font-semibold">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--hb-accent)" }}
              aria-hidden="true"
            />
            {eyebrow}
          </Badge>
        </div>
      )}
      <Heading as="h2" className="hb-subheading max-w-[26ch] text-balance">
        {title}
      </Heading>
      {description && (
        <Text className="text-muted-foreground mt-4 max-w-[60ch] text-base leading-relaxed sm:mt-5 sm:text-lg">
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
}: {
  action: LandingAction;
  secondary?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { hrefFor } = useLandingNavigation();
  return (
    <Button
      href={hrefFor(action.href)}
      variant={secondary ? "outline" : "solid"}
      size={size}
      className={`${secondary ? "hb-secondary hb-radius" : "hb-primary hb-radius"}${fullWidth ? "w-full" : ""}${className ? ` ${className}` : ""}`}
    >
      {action.label}
    </Button>
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
