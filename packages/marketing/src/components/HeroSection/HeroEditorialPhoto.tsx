"use client";
import * as React from "react";
import { Button, Container, Heading, Section, Text } from "@hudbird/ui";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { useBrandMode } from "./BrandScope";
import { useLandingMotion } from "../LandingShared";
import { renderEditorialTitle } from "./SplitIntroductionHero";
import { cn } from "../../utils/cn";
import "./hero-editorial-photo.css";

export interface HeroEditorialPhotoProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "content"
> {
  content: HeroContent;
  config: Extract<HeroSectionConfig, { variant: "editorial-photo" }>;
  headingLevel?: "h1" | "h2" | "h3";
}

function hasDestination(value?: string) {
  return Boolean(value && /^(https?:\/\/|mailto:|tel:|\/|#[^\s]+)/i.test(value.trim()));
}

interface EditorialCopyProps {
  content: HeroContent;
  headingLevel?: "h1" | "h2" | "h3";
  credit?: { label: string; href?: string };
}

function EditorialCopy({ content, headingLevel = "h1", credit }: EditorialCopyProps) {
  const actions = [content.primaryAction, content.secondaryAction];
  const primaryAction = actions[0];
  const secondaryAction = actions[1];

  return (
    <div className="flex flex-col space-y-5 text-left">
      <Heading as={headingLevel} className="hb-editorial-photo-title">
        {renderEditorialTitle(content.title)}
      </Heading>

      <Text className="hb-editorial-photo-description">{content.description}</Text>

      {/* Primary CTA and optional secondary CTA */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {primaryAction?.label?.trim() && hasDestination(primaryAction.href) && (
          <Button
            href={primaryAction.href.trim()}
            size="lg"
            variant="solid"
            className="hb-editorial-cta hb-radius hb-primary font-medium"
          >
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction?.label?.trim() && hasDestination(secondaryAction.href) && (
          <Button
            href={secondaryAction.href.trim()}
            size="lg"
            variant="outline"
            className="hb-editorial-cta hb-radius hb-secondary font-medium"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>

      {/* Optional Photo Credit link or notice */}
      {credit?.label && (
        <div className="pt-2">
          {credit.href && hasDestination(credit.href) ? (
            <a
              href={credit.href}
              target="_blank"
              rel="noreferrer"
              className="hb-editorial-photo-credit"
            >
              {credit.label}
            </a>
          ) : (
            <span className="hb-editorial-photo-credit-text">{credit.label}</span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Obsidian 02-03: Hero Editorial dengan Foto Penuh
 * Full-bleed photo layout with solid surface copy panel ensuring contrast.
 * Responsive:
 * - <640px: Solid copy block (16px gutter, 40px vertical padding) + full-width 4:5 photo
 * - 640-1023px: 3:2 photo with bottom-left floating panel (max 460px, 24px inset, 24px padding)
 * - >=1024px: 16:9 photo (max height 720px) with 6/12 col floating panel (48px inset, 32px padding, 16px radius)
 * - Missing image: Graceful fallback to text-only mode max 680px with standard section padding.
 */
export function HeroEditorialPhoto({
  content,
  config,
  headingLevel = "h1",
  className,
  ...props
}: HeroEditorialPhotoProps) {
  const mode = useBrandMode();
  const motion = useLandingMotion();
  const image = config.image;
  const credit = config.credit;

  const desktopSrc = mode === "dark" ? image?.darkSrc || image?.src : image?.src;
  const portraitSrc = image?.portraitSrc || desktopSrc;
  const hasMedia = Boolean(desktopSrc?.trim());
  const focalPoint = image?.focalPoint || "center";

  // Fallback: If no image is provided, render clean text-only layout max 680px per Obsidian 02-03
  if (!hasMedia || !desktopSrc) {
    return (
      <Section
        {...props}
        spacing="lg"
        className={cn("hb-editorial-photo hb-editorial-photo-fallback", className)}
        data-hero-variant="editorial-photo"
        data-has-media={false}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto max-w-[680px] space-y-6">
            <EditorialCopy content={content} headingLevel={headingLevel} credit={credit} />
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      {...props}
      spacing="none"
      className={cn("hb-editorial-photo py-4 sm:py-8 lg:py-12", className)}
      data-hero-variant="editorial-photo"
      data-motion={motion.reveal}
      data-has-media={true}
    >
      <Container size="xl" gutter="md" className="max-w-[1360px]">
        {/* Single DOM layout: Mobile stacked, Tablet/Desktop floating, avoiding duplicate H1 nodes */}
        <div className="hb-editorial-container">
          {/* 1. DOM order: H1, summary, CTA, credit */}
          <div className="hb-editorial-copy-panel">
            <EditorialCopy content={content} headingLevel={headingLevel} credit={credit} />
          </div>

          {/* 2. Photo asset: 4:5 on mobile, background cover on >=640px */}
          <div className="hb-editorial-photo-wrap bg-muted">
            <picture className="h-full w-full">
              <source media="(max-width: 639px)" srcSet={portraitSrc} />
              <source media="(min-width: 640px)" srcSet={desktopSrc} />
              <img
                src={desktopSrc}
                alt={image?.alt || ""}
                fetchPriority="high"
                loading="eager"
                className="h-full w-full object-cover"
                style={{ objectPosition: focalPoint }}
              />
            </picture>

            {/* Subtle gradient to assist contrast edge on large screens */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-black/40 via-black/10 to-transparent sm:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
