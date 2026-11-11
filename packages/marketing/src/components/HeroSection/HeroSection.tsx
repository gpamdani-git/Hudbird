"use client";
import * as React from "react";
import { Section, Container, Grid, Button, Badge, Heading, Text } from "@hudbird/ui";
import { ArrowRight } from "lucide-react";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { ProductDemo } from "./ProductDemo";
import { useBrandMode } from "./BrandScope";
import { SplitIntroductionHero, renderEditorialTitle } from "./SplitIntroductionHero";
import { HeroSplitProduct } from "./HeroSplitProduct";
import { HeroCenterCanvas, HeroCenterVideo } from "./HeroCenterCanvas";
import { HeroEditorialPhoto } from "./HeroEditorialPhoto";
import { cn } from "../../utils/cn";

export { SplitIntroductionHero, renderEditorialTitle } from "./SplitIntroductionHero";
export { HeroCenterVideo, HeroEditorialPhoto };

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
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
      <Button href={content.primaryAction.href} className="hb-primary hb-radius" size="lg">
        {content.primaryAction.label}
      </Button>
      {content.secondaryAction && (
        <Button
          href={content.secondaryAction.href}
          variant="outline"
          className={cn(
            "hb-secondary hb-radius",
            darkSecondary
              ? "!border-white !bg-white font-medium !text-zinc-950 hover:!bg-zinc-100"
              : "bg-white/80 dark:bg-white/[0.03]"
          )}
          size="lg"
        >
          {content.secondaryAction.label}
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
  return (
    <div className="min-w-0">
      <div className={centered ? "mb-5 flex justify-center" : "mb-5 flex items-center"}>
        <div className="hb-video-badge inline-flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200/90 bg-zinc-50/90 p-1 pr-3 text-xs font-medium text-zinc-700 shadow-2xs dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-300">
          <Badge variant="modern" size="sm" className="gap-1.5 px-2 py-0.5 text-xs font-semibold">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--hb-accent)" }}
              aria-hidden="true"
            />
            New release
          </Badge>
          <span className="inline-flex items-center gap-1 font-medium">
            Interactive workspace &amp; blueprint system
            <ArrowRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          </span>
        </div>
      </div>
      <Heading
        as={headingLevel}
        className={cn(
          "hb-heading text-4xl font-bold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl lg:text-[3.75rem] lg:leading-[1.08] xl:text-[4.25rem]",
          centered && "mx-auto text-center"
        )}
      >
        {renderEditorialTitle(content.title)}
      </Heading>
      <Text className="text-muted-foreground mt-5 max-w-[54ch] text-lg leading-relaxed sm:mt-6 sm:text-xl">
        {content.description}
      </Text>
      <HeroActions content={content} darkSecondary={darkSecondary} />
    </div>
  );
}

export function HeroImageView({
  image,
  priority = true,
}: {
  image: HeroImage;
  priority?: boolean;
}) {
  const mode = useBrandMode();
  const src = mode === "dark" ? (image.darkSrc ?? image.src) : image.src;
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => setFailed(false), [src]);
  return (
    <figure className="m-0 min-w-0">
      <div className="rounded-2xl border border-zinc-200/85 bg-zinc-950/[0.025] p-1.5 shadow-[0_20px_48px_-12px_rgba(16,24,40,0.12)] sm:p-2.5 dark:border-white/[0.09] dark:bg-white/[0.03]">
        {failed || !src ? (
          <div
            role="img"
            aria-label={image.alt}
            className="hb-media hb-radius bg-card text-muted-foreground border-border flex items-center justify-center border p-8 text-center"
          >
            Image unavailable. Add your brand image.
          </div>
        ) : (
          <img
            src={src}
            alt={image.alt}
            width={1440}
            height={900}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onError={() => setFailed(true)}
            className="hb-media hb-radius border border-zinc-200/60 dark:border-white/[0.06]"
          />
        )}
      </div>
      {image.caption && (
        <figcaption className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Slideshow({ slides }: { slides: HeroImage[] }) {
  const [index, setIndex] = React.useState(0);
  const current = Math.min(index, Math.max(0, slides.length - 1));
  if (!slides.length)
    return <Text role="status">Add at least one slide to show your product.</Text>;
  return (
    <div
      role="region"
      aria-label="Product slideshow"
      aria-roledescription="carousel"
      className="min-w-0"
    >
      <div aria-live="polite">
        <HeroImageView image={slides[current]} />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Text variant="small" className="text-muted-foreground" role="status">
          Slide {current + 1} of {slides.length}
        </Text>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="hb-secondary hb-radius"
            disabled={slides.length < 2}
            aria-label="Previous slide"
            onClick={() => setIndex((current - 1 + slides.length) % slides.length)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="hb-secondary hb-radius"
            disabled={slides.length < 2}
            aria-label="Next slide"
            onClick={() => setIndex((current + 1) % slides.length)}
          >
            Next
          </Button>
        </div>
      </div>
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
  const poster = mode === "dark" ? (video.poster.darkSrc ?? video.poster.src) : video.poster.src;
  const ref = React.useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = React.useState(false);

  // Support YouTube monochrome background loop fallback
  const ytMatch = video.src.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  const isYouTube = Boolean(ytMatch);

  React.useEffect(() => {
    setFailed(false);
    if (isYouTube) return;
    const el = ref.current;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
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
    }
  }, [video.src, isYouTube]);

  return (
    <Section
      id={id}
      spacing="none"
      data-hero-variant="video"
      className="hb-section hb-video-section relative isolate flex min-h-[var(--hb-viewport-h,100dvh)] w-full flex-col justify-center overflow-hidden bg-zinc-950"
      style={{ backgroundColor: "#09090b", minHeight: "var(--hb-viewport-h, 100vh)" }}
    >
      <div
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
          className="absolute inset-0 h-full w-full object-cover brightness-85 contrast-110 grayscale filter"
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
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover brightness-95 contrast-110 grayscale filter"
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
            src={`https://www.youtube-nocookie.com/embed/${ytMatch![1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch![1]}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1`}
            title="Monochrome background video"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-[140%] w-[140%] -translate-x-[20%] -translate-y-[20%] object-cover brightness-80 contrast-125 grayscale filter"
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
  if (config.variant === "split-product")
    return (
      <HeroSplitProduct content={content} config={config} id={id} headingLevel={headingLevel} />
    );
  if (config.variant === "center-canvas" || config.variant === "center-video")
    return (
      <HeroCenterCanvas content={content} config={config} id={id} headingLevel={headingLevel} />
    );
  if (config.variant === "editorial-photo")
    return (
      <HeroEditorialPhoto content={content} config={config} id={id} headingLevel={headingLevel} />
    );
  if (config.variant === "video")
    return (
      <VideoHero
        key={config.video.src}
        content={content}
        video={config.video}
        id={id}
        headingLevel={headingLevel}
      />
    );
  if (config.variant === "centered")
    return (
      <Section id={id} spacing="lg" className="hb-section">
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
        id={id}
        headingLevel={headingLevel}
      />
    );
  }
  if (config.variant === "interactive") {
    return (
      <Section id={id} spacing="lg" className="hb-section">
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
      <Section id={id} spacing="lg" className="hb-section">
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
