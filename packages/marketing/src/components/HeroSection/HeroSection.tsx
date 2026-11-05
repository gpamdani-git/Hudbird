"use client";
import * as React from "react";
import { Section, Container, Grid, Button, Heading, Text } from "@hudbird/ui";
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
    <div className="mt-8 flex flex-wrap gap-3">
      <Button href={content.primaryAction.href} className="hb-primary hb-radius" size="md">
        {content.primaryAction.label}
      </Button>
      {content.secondaryAction && (
        <Button
          href={content.secondaryAction.href}
          variant="outline"
          className="hb-secondary hb-radius"
          size="md"
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
}: {
  content: HeroContent;
  headingLevel?: HeroSectionProps["headingLevel"];
}) {
  return (
    <div className="min-w-0">
      <Heading as={headingLevel} className="hb-heading max-w-[18ch] text-balance">
        {content.title}
      </Heading>
      <Text className="text-muted-foreground mt-6 max-w-[52ch] text-base leading-relaxed sm:text-lg">
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
          className="hb-media hb-radius"
        />
      )}
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
            <HeroCopy content={content} headingLevel={headingLevel} />
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
