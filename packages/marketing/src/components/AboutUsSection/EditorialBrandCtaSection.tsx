"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container, Heading, Section, Text } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { AboutVideoDialog } from "./AboutUsSection";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "./shared";
import "./about-us-section.css";

export interface EditorialBrandCtaProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  videoCaptionLabel?: string;
  videoPromptLabel?: string;
  videoUrl?: string;
  videoTitle?: string;
  rating?: string;
  ratingSummary?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageFocalPoint?: string;
  avatars?: string[];
  wordmark?: string;
  editScope?: "editorial-cta" | "cta";
  className?: string;
}

export const DEFAULT_CTA_IMAGE =
  "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200";

export const DEFAULT_CTA_AVATARS = [
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
];

export const DEFAULT_CTA_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("h-3.5 w-3.5", filled ? "text-amber-400" : "text-zinc-300 dark:text-zinc-700")}
      aria-hidden="true"
    >
      <path d="M8 1.5l1.96 3.97 4.38.64-3.17 3.09.75 4.36L8 11.5l-3.92 2.06.75-4.36L1.66 6.11l4.38-.64L8 1.5z" />
    </svg>
  );
}

/**
 * Composable Editorial Brand CTA inner content shared between the LandingCta preset
 * and About Us EditorialBrandCtaSection.
 */
export function EditorialBrandCtaContent({
  title = "Ship Cleaner Interfaces in Half the Time",
  description = "Build with modular @hudbird/ui primitives, editorial typography, and instant theme tokens designed for modern product teams.",
  primaryLabel = "Start Building",
  primaryHref = "#pricing",
  videoCaptionLabel = "Play Video",
  videoPromptLabel = "See how Hudbird UI accelerates your workflow",
  videoUrl = DEFAULT_CTA_VIDEO,
  videoTitle = "How Hudbird UI accelerates your workflow",
  rating = "4.9",
  ratingSummary = "Trusted by 10k+ product engineers",
  imageSrc = DEFAULT_CTA_IMAGE,
  imageAlt = "Smiling creative enjoying a bright workspace moment",
  imageFocalPoint,
  avatars = DEFAULT_CTA_AVATARS,
  wordmark = "HUDBIRD",
  editScope = "editorial-cta",
  className,
}: EditorialBrandCtaProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const videoTriggerRef = React.useRef<HTMLButtonElement>(null);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const revealed = useSafeSectionReveal(rootRef);
  const prefersReducedMotion = useReducedMotion();

  const numericRating = Math.max(0, Math.min(5, Math.round(Number.parseFloat(rating) || 4)));
  const fieldPrefix = editScope === "cta" ? "editorial." : "";

  const initialFor = (yOffset: number, scale = 1) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset, scale };

  const targetFor = (yOffset: number, scale = 1) =>
    prefersReducedMotion || revealed
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: yOffset, scale };

  return (
    <div ref={rootRef} className={cn("hb-about-us mx-auto w-full max-w-6xl", className)}>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
        {/* Left Copy + Primary CTA + Video Trigger + Social Proof */}
        <div className="md:col-span-6">
          <motion.div
            initial={initialFor(14)}
            animate={targetFor(14)}
            transition={{ duration: 0.44, ease: ABOUT_EASE_OUT }}
          >
            <Heading
              as="h2"
              size="inherit"
              data-hb-node="heading"
              data-hb-edit={`${editScope}:title`}
              className="text-foreground max-w-[16ch] text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.85rem]"
            >
              {title}
            </Heading>
          </motion.div>

          <motion.div
            initial={initialFor(12)}
            animate={targetFor(12)}
            transition={{ duration: 0.44, delay: 0.06, ease: ABOUT_EASE_OUT }}
          >
            <Text
              data-hb-node="text"
              data-hb-edit={`${editScope}:description`}
              className="text-muted-foreground mt-4 max-w-[46ch] text-sm leading-[1.6] font-normal sm:text-base"
            >
              {description}
            </Text>
          </motion.div>

          <motion.div
            initial={initialFor(12)}
            animate={targetFor(12)}
            transition={{ duration: 0.44, delay: 0.12, ease: ABOUT_EASE_OUT }}
            className="mt-7 flex flex-wrap items-center gap-5 sm:gap-6"
          >
            <a
              href={primaryHref}
              data-hb-node="primary-button"
              data-hb-edit={editScope === "cta" ? "cta:action.label" : `${editScope}:primaryLabel`}
              className="hb-cta-primary-btn bg-foreground text-background inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-medium tracking-[-0.01em] shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"
            >
              <span data-hb-edit-text="">{primaryLabel}</span>
              <span aria-hidden="true" className="hb-cta-primary-arrow">
                &rarr;
              </span>
            </a>

            <button
              ref={videoTriggerRef}
              type="button"
              data-hb-node="secondary-button"
              data-hb-edit={editScope === "cta" ? "cta:videoUrl" : `${editScope}:videoUrl`}
              data-hb-edit-mode="popover"
              data-hb-video-trigger="true"
              onClick={() => setIsVideoOpen(true)}
              className="hb-cta-video-btn group inline-flex cursor-pointer items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="hb-cta-video-circle border-border text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  className="ml-0.5 h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <polygon points="5,3.5 12.5,8 5,12.5" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span
                  data-hb-edit={`${editScope}:${fieldPrefix}videoCaptionLabel`}
                  className="text-muted-foreground text-[11px] leading-tight"
                >
                  {videoCaptionLabel}
                </span>
                <span
                  data-hb-edit={`${editScope}:${fieldPrefix}videoPromptLabel`}
                  className="text-foreground text-xs leading-snug font-medium"
                >
                  {videoPromptLabel}
                </span>
              </span>
            </button>
          </motion.div>

          {/* Avatar Cluster + Star Rating Proof */}
          <motion.div
            initial={initialFor(10)}
            animate={targetFor(10)}
            transition={{ duration: 0.42, delay: 0.18, ease: ABOUT_EASE_OUT }}
            data-hb-node="items"
            className="mt-9 flex flex-wrap items-center gap-3.5 sm:mt-11"
          >
            <div className="flex -space-x-2.5">
              {avatars.slice(0, 6).map((src, idx) => (
                <img
                  key={`${src}-${idx}`}
                  src={src}
                  data-hb-node="media"
                  data-hb-item={idx}
                  data-hb-edit={
                    editScope === "cta" ? `cta:avatars.${idx}` : `${editScope}:avatars.${idx}`
                  }
                  data-hb-edit-mode="popover"
                  alt={`Verified community member ${idx + 1}`}
                  loading="lazy"
                  className="ring-background h-10 w-10 cursor-pointer rounded-full object-cover ring-2"
                />
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span
                  data-hb-edit={`${editScope}:${fieldPrefix}rating`}
                  className="text-foreground text-sm font-medium tabular-nums"
                >
                  {rating}
                </span>
                <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < numericRating} />
                  ))}
                </div>
              </div>
              <Text
                data-hb-edit={`${editScope}:${fieldPrefix}ratingSummary`}
                className="text-muted-foreground mt-0.5 text-xs"
              >
                {ratingSummary}
              </Text>
            </div>
          </motion.div>
        </div>

        {/* Right Rounded Square Lifestyle Portrait */}
        <motion.div
          initial={initialFor(16, 0.985)}
          animate={targetFor(16, 0.985)}
          transition={{ duration: 0.52, delay: 0.1, ease: ABOUT_EASE_OUT }}
          className="flex justify-start md:col-span-6 md:justify-end"
        >
          <div
            data-hb-node="media"
            data-hb-edit={editScope === "cta" ? "cta:imageSrc" : `${editScope}:imageSrc`}
            data-hb-edit-mode="popover"
            className="hb-cta-media bg-muted/40 aspect-square w-full max-w-[440px] cursor-pointer overflow-hidden rounded-[22px] sm:rounded-[26px]"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              style={
                imageFocalPoint ? { objectPosition: imageFocalPoint.replace("-", " ") } : undefined
              }
              className="hb-cta-photo h-full w-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>

      <AboutVideoDialog
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title={videoTitle}
        returnFocusRef={videoTriggerRef}
      />
    </div>
  );
}

export interface EditorialBrandCtaSectionProps extends EditorialBrandCtaProps {
  id?: string;
  sectionKey?: string;
}

export function EditorialBrandCtaSection({
  id = "editorial-cta",
  sectionKey = "editorial-cta",
  className,
  ...props
}: EditorialBrandCtaSectionProps) {
  return (
    <div data-landing-section={sectionKey} className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-about-us bg-background relative overflow-hidden py-16 sm:py-20 lg:py-24",
          className
        )}
      >
        <Container size="xl">
          <EditorialBrandCtaContent {...props} />
        </Container>
      </Section>
    </div>
  );
}
