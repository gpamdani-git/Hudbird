"use client";
import * as React from "react";
import {
  Section,
  Container,
  Grid,
  Button,
  Badge,
  Heading,
  Text,
  EditorialImage,
} from "@hudbird/ui";
import { ArrowRight, Sparkles } from "lucide-react";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { ProductDemo } from "./ProductDemo";
import { useBrandMode } from "./BrandScope";
import { useLandingAppearance, useLandingNavigation } from "../LandingShared";
import { SplitIntroductionHero, renderEditorialTitle } from "./SplitIntroductionHero";
import { HeroSplitProduct } from "./HeroSplitProduct";
import { HeroCenterCanvas, HeroCenterVideo } from "./HeroCenterCanvas";
import { HeroEditorialPhoto } from "./HeroEditorialPhoto";
import { HeroRemitGrid } from "./HeroRemitGrid";
import { cn } from "../../utils/cn";

export { SplitIntroductionHero, renderEditorialTitle } from "./SplitIntroductionHero";
export { HeroCenterVideo, HeroEditorialPhoto, HeroRemitGrid };

export interface HeroSectionProps {
  content: HeroContent;
  config: HeroSectionConfig;
  id?: string;
  headingLevel?: "h1" | "h2" | "h3";
}

function HeroActions({
  content,
  darkSecondary = false,
}: {
  content: HeroContent;
  darkSecondary?: boolean;
}) {
  const appearance = useLandingAppearance();
  const { hrefFor } = useLandingNavigation();
  const primaryCfg = appearance?.button;
  const secondaryCfg = appearance?.secondaryButton;
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
      <Button
        href={hrefFor(content.primaryAction.href)}
        data-hb-node="primary-button"
        data-hb-edit="hero:primaryAction.label"
        variant={primaryCfg?.variant}
        color={primaryCfg?.color}
        size={primaryCfg?.size ?? "lg"}
        radius={primaryCfg?.radius}
        className={cn(
          !primaryCfg?.variant && !primaryCfg?.color && "hb-primary",
          !primaryCfg?.radius && "hb-radius"
        )}
      >
        <span data-hb-edit-text="">{content.primaryAction.label}</span>
      </Button>
      {content.secondaryAction && (
        <Button
          href={hrefFor(content.secondaryAction.href)}
          variant={secondaryCfg?.variant ?? "outline"}
          color={secondaryCfg?.color}
          size={secondaryCfg?.size ?? "lg"}
          radius={secondaryCfg?.radius}
          data-hb-node="secondary-button"
          data-hb-edit="hero:secondaryAction.label"
          className={cn(
            !secondaryCfg?.variant && !secondaryCfg?.color && "hb-secondary",
            !secondaryCfg?.radius && "hb-radius",
            !secondaryCfg?.variant &&
              !secondaryCfg?.color &&
              (darkSecondary
                ? "!border-white !bg-white font-medium !text-zinc-950 hover:!bg-zinc-100"
                : "bg-white/80 dark:bg-white/[0.03]")
          )}
        >
          <span data-hb-edit-text="">{content.secondaryAction.label}</span>
        </Button>
      )}
    </div>
  );
}

function HeroCopy({
  content,
  headingLevel = "h1",
  centered = false,
  darkSecondary = false,
}: {
  content: HeroContent;
  headingLevel?: HeroSectionProps["headingLevel"];
  centered?: boolean;
  darkSecondary?: boolean;
}) {
  const appearance = useLandingAppearance();
  const badgeCfg = appearance?.badgeStyle;
  const headingCfg = appearance?.heading;
  const textCfg = appearance?.text;
  return (
    <div className="min-w-0">
      <div className={centered ? "mb-5 flex justify-center" : "mb-5 flex items-center"}>
        <div
          data-hb-node="badge"
          data-hb-edit="hero:eyebrow"
          className="hb-video-badge inline-flex flex-wrap items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50/90 p-1 pr-3 text-xs font-medium text-zinc-700 shadow-2xs dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-300"
        >
          <Badge
            variant={badgeCfg?.variant ?? "modern"}
            color={badgeCfg?.color}
            size={badgeCfg?.size ?? "sm"}
            className={cn("gap-1.5", !badgeCfg?.size && "px-2.5 py-1 text-xs font-medium")}
          >
            <Sparkles
              className="h-3 w-3 shrink-0 text-zinc-500 dark:text-zinc-400"
              aria-hidden="true"
            />
            <span data-hb-edit-text="">
              {content.eyebrow?.trim() ? content.eyebrow : "New release"}
            </span>
          </Badge>
          {!content.eyebrow?.trim() && (
            <span className="inline-flex items-center gap-1 font-medium">
              Interactive workspace &amp; blueprint system
              <ArrowRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
      <Heading
        as={headingLevel}
        size={headingCfg?.size}
        tracking={headingCfg?.tracking}
        color={headingCfg?.color}
        withDivider={headingCfg?.withDivider}
        data-hb-node="heading"
        data-hb-edit="hero:title"
        className={cn(
          !headingCfg?.size &&
            "hb-heading text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[3.75rem] lg:leading-[1.08] xl:text-[4.25rem]",
          "text-balance",
          centered && "mx-auto text-center"
        )}
      >
        {renderEditorialTitle(content.title)}
      </Heading>
      <Text
        variant={textCfg?.variant}
        weight={textCfg?.weight}
        align={textCfg?.align}
        data-hb-node="text"
        data-hb-edit="hero:description"
        className={cn(
          "text-muted-foreground mt-5 max-w-[54ch] sm:mt-6",
          !textCfg?.variant && "text-lg leading-relaxed sm:text-xl",
          centered && !textCfg?.align && "mx-auto"
        )}
      >
        {content.description}
      </Text>
      <HeroActions content={content} darkSecondary={darkSecondary} />
    </div>
  );
}

export function HeroImageView({
  image,
  priority = true,
  editPrefix,
  itemIndex,
  aspectRatioOverride,
}: {
  image: HeroImage;
  priority?: boolean;
  editPrefix?: string;
  itemIndex?: number;
  aspectRatioOverride?: "auto" | "16/9" | "4/3" | "21/9";
}) {
  const mode = useBrandMode();
  const appearance = useLandingAppearance();
  const mediaCfg = appearance?.media;
  const resolvedAspect =
    aspectRatioOverride && aspectRatioOverride !== "auto"
      ? aspectRatioOverride
      : mediaCfg?.aspectRatio;
  const resolvedFocal = image.focalPoint ?? mediaCfg?.focalPoint;
  const hasMediaOverrides = Boolean(
    mediaCfg || resolvedFocal || (resolvedAspect && resolvedAspect !== "auto")
  );
  const focalStyle = resolvedFocal
    ? ({ objectPosition: resolvedFocal.replace("-", " ") } as React.CSSProperties)
    : undefined;
  const src = mode === "dark" ? (image.darkSrc ?? image.src) : image.src;
  const mobileSrc = mode === "dark" ? (image.darkMobileSrc ?? image.mobileSrc) : image.mobileSrc;
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => setFailed(false), [src]);
  const hasOverlayContent = Boolean(image.title || image.subtitle || image.action?.label);
  return (
    <figure
      className="m-0 min-w-0"
      data-hb-node="media"
      data-hb-item={itemIndex}
      data-hb-edit={editPrefix ? `${editPrefix}.src` : "hero:media.src"}
      data-hb-edit-mode="popover"
    >
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/85 bg-zinc-950/[0.025] p-1.5 shadow-[0_20px_48px_-12px_rgba(16,24,40,0.12)] sm:p-2.5 dark:border-white/[0.09] dark:bg-white/[0.03]">
        {failed || !src ? (
          <div
            role="img"
            aria-label={image.alt}
            className="hb-media hb-radius bg-card text-muted-foreground border-border flex items-center justify-center border p-8 text-center"
          >
            Image unavailable. Add your brand image.
          </div>
        ) : hasMediaOverrides ? (
          <EditorialImage
            src={src}
            alt={image.alt}
            aspectRatio={resolvedAspect ?? "auto"}
            radius={mediaCfg?.radius ?? "lg"}
            hasBorder={mediaCfg?.hasBorder ?? false}
            overlayGradient={mediaCfg?.overlayGradient ?? hasOverlayContent}
            isZoomable={mediaCfg?.isZoomable ?? false}
            style={focalStyle}
            className="w-full"
          />
        ) : mobileSrc ? (
          <picture className="block w-full">
            <source media="(max-width: 639px)" srcSet={mobileSrc} />
            <img
              src={src}
              alt={image.alt}
              width={1440}
              height={900}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              onError={() => setFailed(true)}
              style={focalStyle}
              className="hb-media hb-radius border border-zinc-200/60 dark:border-white/[0.06]"
            />
          </picture>
        ) : (
          <img
            src={src}
            alt={image.alt}
            width={1440}
            height={900}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onError={() => setFailed(true)}
            style={focalStyle}
            className="hb-media hb-radius border border-zinc-200/60 dark:border-white/[0.06]"
          />
        )}
        {hasOverlayContent && (
          <div className="pointer-events-auto absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 rounded-xl border border-white/15 bg-zinc-950/75 px-4 py-3 text-white backdrop-blur-md">
            <div className="min-w-0 flex-1 space-y-0.5">
              {image.title && (
                <div
                  data-hb-edit={editPrefix ? `${editPrefix}.title` : undefined}
                  className="text-sm font-semibold tracking-tight sm:text-base"
                >
                  {image.title}
                </div>
              )}
              {image.subtitle && (
                <div
                  data-hb-edit={editPrefix ? `${editPrefix}.subtitle` : undefined}
                  className="text-xs text-zinc-300 sm:text-[13px]"
                >
                  {image.subtitle}
                </div>
              )}
            </div>
            {image.action?.label && (
              <Button
                asChild
                size="sm"
                color="primary"
                data-hb-edit={editPrefix ? `${editPrefix}.action.label` : undefined}
              >
                <a href={image.action.href}>
                  <span data-hb-edit-text="">{image.action.label}</span>
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
      {image.caption && (
        <figcaption
          data-hb-node="text"
          data-hb-edit={editPrefix ? `${editPrefix}.caption` : "hero:media.caption"}
          className="text-muted-foreground mt-3 text-sm leading-relaxed"
        >
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Slideshow({ slides }: { slides: HeroImage[] }) {
  const appearance = useLandingAppearance();
  const slideshowCfg = appearance?.slideshow;
  const loop = slideshowCfg?.loop ?? true;
  const pauseOnHover = slideshowCfg?.pauseOnHover ?? true;
  const showIndicators = slideshowCfg?.showIndicators ?? true;
  const showArrows = slideshowCfg?.showArrows ?? true;
  const transitionMode = slideshowCfg?.transition ?? "slide";
  const aspectRatio = slideshowCfg?.aspectRatio;
  const regionRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const current = Math.min(index, Math.max(0, slides.length - 1));

  // Notify builder when active slide changes & listen for external slide jumps from builder panel
  React.useEffect(() => {
    const doc = regionRef.current?.ownerDocument;
    if (!doc) return;
    const onExternalSelect = (evt: Event) => {
      const detail = (evt as CustomEvent<{ index?: number }>).detail;
      if (typeof detail?.index === "number" && detail.index >= 0 && detail.index < slides.length) {
        setIndex(detail.index);
      }
    };
    doc.addEventListener("hb:hero-select-slide", onExternalSelect);
    return () => doc.removeEventListener("hb:hero-select-slide", onExternalSelect);
  }, [slides.length]);

  React.useEffect(() => {
    const doc = regionRef.current?.ownerDocument;
    if (!doc) return;
    doc.dispatchEvent(new CustomEvent("hb:hero-slide-changed", { detail: { index: current } }));
  }, [current]);

  React.useEffect(() => {
    const intervalMs = slideshowCfg?.autoplayMs;
    if (!intervalMs || intervalMs <= 0 || slides.length < 2) return;
    if (pauseOnHover && isHovered) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 < slides.length) return prev + 1;
        return loop ? 0 : prev;
      });
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [slideshowCfg?.autoplayMs, slides.length, loop, pauseOnHover, isHovered]);

  if (!slides.length)
    return <Text role="status">Add at least one slide to show your product.</Text>;

  const canPrev = slides.length > 1 && (loop || current > 0);
  const canNext = slides.length > 1 && (loop || current < slides.length - 1);
  const transitionClass =
    transitionMode === "fade"
      ? "transition-opacity duration-300"
      : transitionMode === "zoom"
        ? "transition-transform duration-300"
        : "transition-all duration-300";

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Product slideshow"
      aria-roledescription="carousel"
      data-hb-slideshow-transition={transitionMode}
      data-hb-active-slide={current}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="min-w-0"
    >
      <div aria-live="polite" key={current} className={transitionClass}>
        <HeroImageView
          image={slides[current]}
          editPrefix={`hero:slides.${current}`}
          itemIndex={current}
          aspectRatioOverride={aspectRatio}
        />
      </div>
      {(showIndicators || showArrows || slides.length > 1) && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Text variant="small" className="text-muted-foreground" role="status">
              Slide {current + 1} of {slides.length}
            </Text>
            {showIndicators && slides.length > 1 && (
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose slide">
                {slides.map((s, sIdx) => {
                  const isActive = sIdx === current;
                  return (
                    <button
                      key={`${s.src}-${sIdx}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to slide ${sIdx + 1}`}
                      onClick={() => setIndex(sIdx)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-200",
                        isActive
                          ? "bg-foreground w-5"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/60 w-2"
                      )}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {showArrows && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="hb-secondary hb-radius"
                disabled={!canPrev}
                aria-label="Previous slide"
                onClick={() =>
                  setIndex(current === 0 ? (loop ? slides.length - 1 : 0) : current - 1)
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="hb-secondary hb-radius"
                disabled={!canNext}
                aria-label="Next slide"
                onClick={() =>
                  setIndex(current === slides.length - 1 ? (loop ? 0 : current) : current + 1)
                }
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function VideoHero({
  content,
  video,
  id,
  headingLevel,
}: {
  content: HeroContent;
  video: Extract<HeroSectionConfig, { variant: "video" }>["video"];
  id?: string;
  headingLevel?: HeroSectionProps["headingLevel"];
}) {
  const mode = useBrandMode();
  const appearance = useLandingAppearance();
  const videoCfg = appearance?.video;
  const colorCfg = appearance?.color;
  const poster = mode === "dark" ? (video.poster.darkSrc ?? video.poster.src) : video.poster.src;
  const ref = React.useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = React.useState(false);

  // Support YouTube monochrome background loop fallback
  const ytMatch = video.src.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  const isYouTube = Boolean(ytMatch);
  const autoplay = videoCfg?.autoplay ?? true;
  const muted = videoCfg?.muted ?? true;
  const loop = videoCfg?.loop ?? true;
  const controls = videoCfg?.controls ?? false;
  const grayscale = videoCfg?.grayscale ?? true;

  React.useEffect(() => {
    setFailed(false);
    if (isYouTube) return;
    const el = ref.current;
    if (el) {
      el.defaultMuted = muted;
      el.muted = muted;
      if (autoplay) {
        try {
          const playPromise = el.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              /* jsdom or policy fallback */
            });
          }
        } catch {
          /* jsdom or policy fallback */
        }
      } else {
        try {
          el.pause();
        } catch {
          /* ignore */
        }
      }
    }
  }, [video.src, isYouTube, autoplay, muted]);

  return (
    <Section
      id={id}
      spacing="none"
      data-hero-variant="video"
      className="hb-section hb-video-section relative isolate flex min-h-[var(--hb-viewport-h,100dvh)] w-full flex-col justify-start overflow-hidden bg-zinc-950 pt-12 pb-16 sm:pt-16 lg:pt-20"
      style={{
        backgroundColor: colorCfg?.background || "#09090b",
        minHeight: "var(--hb-viewport-h, 100vh)",
      }}
    >
      <div
        data-hb-node="media"
        data-hb-edit="hero:video.src"
        data-hb-edit-mode="popover"
        className="hb-video-media-wrap pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-zinc-950"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <img
          src={poster}
          alt={video.poster.alt}
          width={1440}
          height={900}
          className={`absolute inset-0 h-full w-full object-cover brightness-85 contrast-110 ${grayscale ? "grayscale filter" : ""}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          fetchPriority="high"
        />
        {!failed && !isYouTube && (
          <video
            key={video.src}
            ref={ref}
            poster={poster}
            autoPlay={autoplay}
            muted={muted}
            playsInline
            loop={loop}
            controls={controls}
            preload="auto"
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover brightness-95 contrast-110 ${grayscale ? "grayscale filter" : ""}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={() => {
              setFailed(true);
            }}
          >
            <source src={video.src} type="video/mp4" />
            <source src="/assets/hero-video/animate_hero_agency720p.mp4" type="video/mp4" />
          </video>
        )}
        {!failed && isYouTube && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytMatch![1]}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${ytMatch![1]}&controls=${controls ? 1 : 0}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1`}
            title="Monochrome background video"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-[140%] w-[140%] -translate-x-[20%] -translate-y-[20%] object-cover brightness-80 contrast-125 ${grayscale ? "grayscale filter" : ""}`}
            style={{
              position: "absolute",
              width: "140%",
              height: "140%",
            }}
          />
        )}
        {/* Dark cinematic gradient scrim: keeps video visible while ensuring white typography is crisp and legible */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/35 to-black/55"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            ...(colorCfg?.scrimOpacity !== undefined
              ? {
                  background: `rgba(9, 9, 11, ${Math.min(0.95, Math.max(0, colorCfg.scrimOpacity / 100))})`,
                }
              : {}),
          }}
          aria-hidden="true"
        />
      </div>
      <Container
        size="xl"
        gutter="lg"
        className="hb-video-copy relative z-10 py-16 sm:py-24 lg:py-32"
      >
        <HeroCopy content={content} headingLevel={headingLevel} darkSecondary />
      </Container>
    </Section>
  );
}

export function HeroSection({ content, config, id, headingLevel = "h1" }: HeroSectionProps) {
  const appearance = useLandingAppearance();
  const resolvedId = appearance?.anchorId?.trim() || id;
  if (config.variant === "split-product")
    return (
      <HeroSplitProduct
        content={content}
        config={config}
        id={resolvedId}
        headingLevel={headingLevel}
      />
    );
  if (config.variant === "center-canvas" || config.variant === "center-video")
    return (
      <HeroCenterCanvas
        content={content}
        config={config}
        id={resolvedId}
        headingLevel={headingLevel}
      />
    );
  if (config.variant === "editorial-photo")
    return (
      <HeroEditorialPhoto
        content={content}
        config={config}
        id={resolvedId}
        headingLevel={headingLevel}
      />
    );
  if (config.variant === "remit-grid" || config.variant === "fintech-remit")
    return (
      <HeroRemitGrid
        content={content}
        config={config}
        id={resolvedId}
        headingLevel={headingLevel}
      />
    );
  if (config.variant === "video")
    return (
      <VideoHero
        key={config.video.src}
        content={content}
        video={config.video}
        id={resolvedId}
        headingLevel={headingLevel}
      />
    );
  if (config.variant === "centered")
    return (
      <Section id={resolvedId} spacing="lg" className="hb-section">
        <Container size="xl" gutter="lg">
          <div className="mx-auto max-w-3xl text-center [&_div>div]:justify-center [&_h1]:mx-auto [&_p]:mx-auto">
            <HeroCopy content={content} headingLevel={headingLevel} centered />
          </div>
          <div className="mt-12 sm:mt-16">
            <HeroImageView image={config.image} />
          </div>
        </Container>
      </Section>
    );
  if (config.variant === "split") {
    return (
      <SplitIntroductionHero
        content={content}
        config={config}
        id={resolvedId}
        headingLevel={headingLevel}
      />
    );
  }
  if (config.variant === "interactive") {
    return (
      <Section id={resolvedId} spacing="lg" className="hb-section">
        <Container size="xl" gutter="lg">
          <Grid cols={2} gap="xl" align="center" className="[&>*]:min-w-0">
            <HeroCopy content={content} headingLevel={headingLevel} />
            <ProductDemo tabs={config.tabs} />
          </Grid>
        </Container>
      </Section>
    );
  }
  if (config.variant === "slideshow") {
    return (
      <Section id={resolvedId} spacing="lg" className="hb-section">
        <Container size="xl" gutter="lg">
          <Grid cols={2} gap="xl" align="center" className="[&>*]:min-w-0">
            <HeroCopy content={content} headingLevel={headingLevel} />
            <Slideshow slides={config.slides} />
          </Grid>
        </Container>
      </Section>
    );
  }
  return null;
}
