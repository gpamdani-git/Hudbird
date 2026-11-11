"use client";
import * as React from "react";
import { Button, Container, Heading, Section, Text } from "@hudbird/ui";
import { Play } from "lucide-react";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { useBrandMode } from "./BrandScope";
import { useLandingMotion, FullscreenVideoPlayer } from "../LandingShared";
import { cn } from "../../utils/cn";
import "./hero-center-canvas.css";

export const DEFAULT_HERO_CENTER_CANVAS_VIDEO_URL =
  "https://youtu.be/blxEtDtn31U?si=uhi3uiFfDPVIv57Z";
export const DEFAULT_HERO_CENTER_VIDEO_URL = DEFAULT_HERO_CENTER_CANVAS_VIDEO_URL;

export interface HeroCenterCanvasProps extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  content: HeroContent;
  config: Extract<HeroSectionConfig, { variant: "center-canvas" | "center-video" }>;
  headingLevel?: "h1" | "h2" | "h3";
}

export type HeroCenterVideoProps = HeroCenterCanvasProps;

// Only navigable destinations become links; incomplete editor data stays non-interactive.
function hasDestination(value?: string) {
  return Boolean(value && /^(https?:\/\/|mailto:|tel:|\/|#[^\s]+)/i.test(value.trim()));
}

function ProductCanvas({
  image,
  onPlayVideo,
  hasVideo = false,
}: {
  image: HeroImage;
  onPlayVideo?: () => void;
  hasVideo?: boolean;
}) {
  const mode = useBrandMode();
  const motion = useLandingMotion();
  const [failed, setFailed] = React.useState(false);
  const [captionVisible, setCaptionVisible] = React.useState(motion.reveal === "off");
  const mediaRef = React.useRef<HTMLDivElement>(null);

  // Active theme assets
  const desktopSrc = mode === "dark" ? image.darkSrc || image.src : image.src;
  const mobileSrc = mode === "dark" ? image.darkMobileSrc || image.mobileSrc : image.mobileSrc;

  // R01: Caption reveal trigger after 30% of media enters viewport
  React.useEffect(() => {
    if (captionVisible || motion.reveal === "off") return;
    if (typeof IntersectionObserver === "undefined") {
      setCaptionVisible(true);
      return;
    }
    const element = mediaRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setCaptionVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: [0.3] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [captionVisible, motion.reveal]);

  return (
    <figure className="hb-center-canvas-figure">
      <div
        ref={mediaRef}
        className={cn("hb-center-canvas-chassis group/canvas", hasVideo && "cursor-pointer")}
        onClick={hasVideo ? onPlayVideo : undefined}
        role={hasVideo ? "button" : undefined}
        tabIndex={hasVideo ? 0 : undefined}
        aria-label={hasVideo ? "Watch video walkthrough" : undefined}
        onKeyDown={
          hasVideo
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPlayVideo?.();
                }
              }
            : undefined
        }
      >
        <div className="hb-center-canvas-media">
          {failed ? (
            <Text role="status" className="px-5 text-center">
              Product preview unavailable. {image.alt}
            </Text>
          ) : mobileSrc ? (
            <picture>
              <source media="(max-width: 639px)" srcSet={mobileSrc} />
              <img
                src={desktopSrc}
                alt={image.alt}
                width={1024}
                height={576}
                loading="eager"
                fetchPriority="high"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover"
              />
            </picture>
          ) : (
            <img
              src={desktopSrc}
              alt={image.alt}
              width={1024}
              height={576}
              loading="eager"
              fetchPriority="high"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
            />
          )}

          {hasVideo && !failed && (
            <div className="hb-center-canvas-play-wrapper">
              <button
                type="button"
                className="hb-center-canvas-play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayVideo?.();
                }}
                aria-label="Play video walkthrough"
              >
                {/* Optical alignment: triangle center of mass compensated +1.5px to right */}
                <Play className="h-6 w-6 translate-x-[1.5px] fill-current text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      {image.caption && (
        <figcaption
          className="hb-center-canvas-caption"
          data-visible={motion.reveal === "off" || captionVisible ? "true" : "false"}
        >
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Obsidian 02-02: Centered headline, focused primary action, wide 16:10 product canvas, and video popup player. */
export function HeroCenterCanvas({
  content,
  config,
  headingLevel = "h1",
  className,
  ...props
}: HeroCenterCanvasProps) {
  const motion = useLandingMotion();
  const image = config.image;
  const hasMedia = Boolean(image?.src?.trim());

  // Interactive video player state
  const videoUrl =
    config.videoUrl !== undefined ? config.videoUrl : DEFAULT_HERO_CENTER_CANVAS_VIDEO_URL;
  const hasVideo = Boolean(videoUrl && videoUrl.trim());
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  const hasPrimary = hasDestination(content.primaryAction?.href);
  const hasSecondary = hasDestination(content.secondaryAction?.href);

  return (
    <Section
      as="section"
      spacing="none"
      className={cn("hb-center-canvas", className)}
      data-has-media={hasMedia ? "true" : "false"}
      data-has-video={hasVideo ? "true" : "false"}
      data-motion={motion.reveal === "off" ? "off" : undefined}
      {...props}
    >
      <Container size="xl" gutter="md" className="hb-center-canvas-container">
        <div className="hb-center-canvas-header">
          <Heading as={headingLevel} className="hb-center-canvas-title">
            {content.title}
          </Heading>
          {content.description && (
            <Text className="hb-center-canvas-description">{content.description}</Text>
          )}

          {(hasPrimary || hasSecondary) && (
            <div className="hb-center-canvas-actions">
              {hasPrimary && (
                <Button
                  href={content.primaryAction.href}
                  className="hb-primary hb-radius hb-center-canvas-cta"
                  size="lg"
                >
                  {content.primaryAction.label}
                </Button>
              )}
              {hasSecondary && content.secondaryAction && (
                <Button
                  href={content.secondaryAction.href}
                  variant="outline"
                  className="hb-secondary hb-radius"
                  size="lg"
                >
                  {content.secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>

        {hasMedia && image && (
          <ProductCanvas
            image={image}
            hasVideo={hasVideo}
            onPlayVideo={() => setIsVideoModalOpen(true)}
          />
        )}
      </Container>

      {hasVideo && (
        <FullscreenVideoPlayer
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={videoUrl}
          title={content.title}
          subtitle={content.description}
        />
      )}
    </Section>
  );
}

/** Alias for HeroCenterCanvas renamed to HeroCenterVideo */
export const HeroCenterVideo = HeroCenterCanvas;
