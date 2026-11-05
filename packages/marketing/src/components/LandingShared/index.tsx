"use client";
import * as React from "react";
import { Section, Container, Heading, Text, Button, MotionReveal } from "@hudbird/ui";
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
  return (
    <Section
      as={as}
      id={id}
      data-landing-section={id}
      spacing={compact ? "sm" : "lg"}
      bordered={id === "navbar" ? "bottom" : "top"}
      className={compact ? undefined : "hb-section"}
    >
      <Container size="xl" gutter="lg">
        {id === "navbar" || id === "footer" ? children : <LandingReveal>{children}</LandingReveal>}
      </Container>
    </Section>
  );
}

export function LandingHeading({
  title,
  description,
  centered = false,
}: {
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={centered ? "mb-14 text-center [&>h2]:mx-auto [&>p]:mx-auto" : "mb-14 max-w-3xl"}
    >
      <Heading as="h2" className="hb-subheading max-w-[25ch] text-balance">
        {title}
      </Heading>
      {description && (
        <Text className="text-muted-foreground mt-5 max-w-[58ch] leading-relaxed">
          {description}
        </Text>
      )}
    </div>
  );
}

export function LandingActionButton({
  action,
  secondary = false,
}: {
  action: LandingAction;
  secondary?: boolean;
}) {
  const { hrefFor } = useLandingNavigation();
  return (
    <Button
      href={hrefFor(action.href)}
      variant={secondary ? "outline" : "solid"}
      className={secondary ? "hb-secondary hb-radius" : "hb-primary hb-radius"}
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
    <Text variant="small" className="text-muted-foreground mt-6">
      {children}
    </Text>
  );
}
