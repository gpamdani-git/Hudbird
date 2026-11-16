"use client";
import * as React from "react";
import { Button, Container, EditorialImage, Heading, Section, Text } from "@hudbird/ui";
import { Play } from "lucide-react";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { useBrandMode } from "./BrandScope";
import {
  renderInlineFormattedText,
  useLandingAppearance,
  useLandingMotion,
  useLandingNavigation,
  FullscreenVideoPlayer,
} from "../LandingShared";
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
  return Boolean(
    value && /^(website-page:|https?:\/\/|mailto:|tel:|\/|#[^\s]+)/i.test(value.trim())
  );
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
  const appearance = useLandingAppearance();
  const mediaCfg = appearance?.media;
  const illustrationCfg = appearance?.illustration;
  const effectiveImage =
    illustrationCfg?.mode === "custom-image" && illustrationCfg.customImage?.src
      ? illustrationCfg.customImage
      : image;
  const hasMediaOverrides = Boolean(
    mediaCfg &&
    (mediaCfg.aspectRatio ||
      mediaCfg.radius ||
      mediaCfg.hasBorder !== undefined ||
      mediaCfg.overlayGradient !== undefined ||
      mediaCfg.isZoomable !== undefined)
  );
  const [failed, setFailed] = React.useState(false);
  const [captionVisible, setCaptionVisible] = React.useState(motion.reveal === "off");
  const mediaRef = React.useRef<HTMLDivElement>(null);

  // Active theme assets
  const desktopSrc =
    mode === "dark" ? effectiveImage.darkSrc || effectiveImage.src : effectiveImage.src;
  const mobileSrc =
    mode === "dark"
      ? effectiveImage.darkMobileSrc || effectiveImage.mobileSrc
      : effectiveImage.mobileSrc;

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
        data-hb-node="media"
        data-hb-edit={hasVideo ? "hero:video.src" : "hero:illustration"}
        data-hb-visual="code-illustration"
        data-hb-edit-mode="popover"
        data-hb-video-trigger={hasVideo ? "true" : undefined}
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
          ) : hasMediaOverrides ? (
            <EditorialImage
              src={desktopSrc}
              alt={image.alt}
              aspectRatio={mediaCfg?.aspectRatio ?? "auto"}
              radius={mediaCfg?.radius ?? "lg"}
              hasBorder={mediaCfg?.hasBorder ?? false}
              overlayGradient={mediaCfg?.overlayGradient ?? false}
              isZoomable={mediaCfg?.isZoomable ?? false}
              className="h-full w-full"
            />
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

          {illustrationCfg?.showFloatingCallout &&
            (illustrationCfg.badgeText ||
              illustrationCfg.titleText ||
              illustrationCfg.metricValue) && (
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 max-w-[260px] rounded-xl border border-white/15 bg-zinc-950/80 px-3.5 py-2.5 text-left text-white shadow-lg backdrop-blur-md">
                {illustrationCfg.badgeText && (
                  <div className="text-[10px] font-semibold tracking-wider text-indigo-300 uppercase">
                    {illustrationCfg.badgeText}
                  </div>
                )}
                {illustrationCfg.titleText && (
                  <div className="mt-0.5 text-xs font-semibold text-white">
                    {illustrationCfg.titleText}
                  </div>
                )}
                {illustrationCfg.metricValue && (
                  <div className="mt-0.5 font-mono text-sm font-bold text-emerald-400">
                    {illustrationCfg.metricValue}
                  </div>
                )}
              </div>
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
  const appearance = useLandingAppearance();
  const { hrefFor } = useLandingNavigation();
  const headingCfg = appearance?.heading;
  const textCfg = appearance?.text;
  const primaryCfg = appearance?.button;
  const secondaryCfg = appearance?.secondaryButton;
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
          <Heading
            as={headingLevel}
            size={headingCfg?.size}
            tracking={headingCfg?.tracking}
            color={headingCfg?.color}
            withDivider={headingCfg?.withDivider}
            data-hb-node="heading"
            data-hb-edit="hero:title"
            className={cn(!headingCfg?.size && "hb-center-canvas-title")}
          >
            {renderInlineFormattedText(content.title)}
          </Heading>
          {content.description && (
            <Text
              variant={textCfg?.variant}
              weight={textCfg?.weight}
              align={textCfg?.align}
              data-hb-node="text"
              data-hb-edit="hero:description"
              className="hb-center-canvas-description"
            >
              {content.description}
            </Text>
          )}

          {(hasPrimary || hasSecondary) && (
            <div className="hb-center-canvas-actions">
              {hasPrimary && (
                <Button
                  href={hrefFor(content.primaryAction.href)}
                  data-hb-node="primary-button"
                  data-hb-edit="hero:primaryAction.label"
                  variant={primaryCfg?.variant}
                  color={primaryCfg?.color}
                  radius={primaryCfg?.radius}
                  size={primaryCfg?.size ?? "lg"}
                  className={cn(
                    "hb-center-canvas-cta",
                    !primaryCfg?.variant && !primaryCfg?.color && "hb-primary",
                    !primaryCfg?.radius && "hb-radius"
                  )}
                >
                  <span data-hb-edit-text="">{content.primaryAction.label}</span>
                </Button>
              )}
              {hasSecondary && content.secondaryAction && (
                <Button
                  href={hrefFor(content.secondaryAction.href)}
                  variant={secondaryCfg?.variant ?? "outline"}
                  color={secondaryCfg?.color}
                  radius={secondaryCfg?.radius}
                  size={secondaryCfg?.size ?? "lg"}
                  data-hb-node="secondary-button"
                  data-hb-edit="hero:secondaryAction.label"
                  className={cn(
                    !secondaryCfg?.variant && !secondaryCfg?.color && "hb-secondary",
                    !secondaryCfg?.radius && "hb-radius"
                  )}
                >
                  <span data-hb-edit-text="">{content.secondaryAction.label}</span>
                </Button>
              )}
            </div>
          )}
        </div>

        {hasMedia && image && (
          <div data-hb-node="media">
            <ProductCanvas
              image={image}
              hasVideo={hasVideo}
              onPlayVideo={() => setIsVideoModalOpen(true)}
            />
          </div>
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
