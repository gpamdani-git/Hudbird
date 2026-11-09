"use client";
import * as React from "react";
import { Section, Container, Grid, Button, Badge, Heading, Text } from "@hudbird/ui";
import { ArrowRight } from "lucide-react";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { ProductDemo } from "./ProductDemo";
import { useBrandMode } from "./BrandScope";

export interface HeroSectionProps {
  content: HeroContent;
  config: HeroSectionConfig;
  id?: string;
  headingLevel?: "h1" | "h2" | "h3";
}

function HeroActions({ content }: { content: HeroContent }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
      <Button href={content.primaryAction.href} className="hb-primary hb-radius" size="lg">
        {content.primaryAction.label}
      </Button>
      {content.secondaryAction && (
        <Button
          href={content.secondaryAction.href}
          variant="outline"
          className="hb-secondary hb-radius bg-white/80 dark:bg-white/[0.03]"
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
}: {
  content: HeroContent;
  headingLevel?: HeroSectionProps["headingLevel"];
  centered?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className={centered ? "mb-5 flex justify-center" : "mb-5 flex items-center"}>
        <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200/90 bg-zinc-50/90 p-1 pr-3 text-xs font-medium text-zinc-700 shadow-2xs dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-300">
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
      <Heading as={headingLevel} className="hb-heading max-w-[18ch] text-balance">
        {content.title}
      </Heading>
      <Text className="text-muted-foreground mt-5 max-w-[54ch] text-lg leading-relaxed sm:mt-6 sm:text-xl">
        {content.description}
      </Text>
      <HeroActions content={content} />
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
  const [playing, setPlaying] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    setPlaying(false);
    setFailed(false);
  }, [video.src]);
  async function toggle() {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else {
      try {
        await ref.current.play();
      } catch {
        setFailed(true);
      }
    }
  }
  return (
    <Section id={id} spacing="lg" className="hb-section relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-zinc-950">
        <img
          src={poster}
          alt={video.poster.alt}
          width={1440}
          height={900}
          className="absolute h-full w-full object-cover"
          fetchPriority="high"
        />
        {!failed && (
          <video
            key={video.src}
            ref={ref}
            src={video.src}
            poster={poster}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            className="absolute h-full w-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setFailed(true);
              setPlaying(false);
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <Container size="xl" gutter="lg" className="hb-video-copy relative py-10 sm:py-16">
        <HeroCopy content={content} headingLevel={headingLevel} />
        <div className="mt-10">
          {!failed ? (
            <Button variant="outline" className="hb-secondary hb-radius" onClick={toggle}>
              {playing ? "Pause background video" : "Play background video"}
            </Button>
          ) : (
            <Text role="status">Video unavailable. Showing the cover image.</Text>
          )}
        </div>
      </Container>
    </Section>
  );
}

export function HeroSection({ content, config, id, headingLevel = "h1" }: HeroSectionProps) {
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
  return (
    <Section id={id} spacing="lg" className="hb-section">
      <Container size="xl" gutter="lg">
        <Grid cols={2} gap="xl" align="center" className="[&>*]:min-w-0">
          <HeroCopy content={content} headingLevel={headingLevel} />
          {config.variant === "interactive" ? (
            <ProductDemo tabs={config.tabs} />
          ) : config.variant === "slideshow" ? (
            <Slideshow slides={config.slides} />
          ) : (
            <HeroImageView image={config.image} />
          )}
        </Grid>
      </Container>
    </Section>
  );
}
