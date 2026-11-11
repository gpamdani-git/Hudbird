"use client";
import * as React from "react";
import {
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  MotionReveal,
  Section,
  Text,
} from "@hudbird/ui";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { useBrandMode } from "./BrandScope";
import { useLandingMotion } from "../LandingShared";
import { cn } from "../../utils/cn";
import "./hero-split-product.css";

export interface HeroSplitProductProps extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  content: HeroContent;
  config: Extract<HeroSectionConfig, { variant: "split-product" }>;
  headingLevel?: "h1" | "h2" | "h3";
}

// Only navigable destinations become links; incomplete editor data stays non-interactive.
function hasDestination(value?: string) {
  return Boolean(value && /^(https?:\/\/|mailto:|tel:|\/|#[^\s]+)/i.test(value.trim()));
}

function ProductImage({ image, src }: { image: HeroImage; src: string }) {
  const [failed, setFailed] = React.useState(false);
  const [decoded, setDecoded] = React.useState(false);
  const mounted = React.useRef(true);
  const motion = useLandingMotion();
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  async function ready(element: HTMLImageElement) {
    try {
      await element.decode?.();
    } catch {
      /* Load succeeded; decoding may be unavailable. */
    }
    if (mounted.current) setDecoded(true);
  }
  return (
    <figure className="m-0 min-w-0">
      <div className="hb-split-product-media">
        {failed ? (
          <Text role="status" className="px-5 text-center">
            Product preview unavailable. {image.alt}
          </Text>
        ) : (
          <img
            src={src}
            alt={image.alt}
            width={1200}
            height={900}
            loading="eager"
            fetchPriority="high"
            onLoad={(event) => void ready(event.currentTarget)}
            onError={() => setFailed(true)}
            className="h-full w-full object-contain"
          />
        )}
        {decoded && !failed && motion.reveal === "subtle" && (
          <MotionReveal
            aria-hidden="true"
            distance={0}
            viewport={{ once: true, amount: 0.2 }}
            className="hb-split-product-accent"
          />
        )}
      </div>
      {image.caption && (
        <figcaption className="hb-split-product-caption">{image.caption}</figcaption>
      )}
    </figure>
  );
}

/** Obsidian 02-01: static product proof, immediate copy, and a responsive 5/7 composition. */
export function HeroSplitProduct({
  content,
  config,
  headingLevel = "h1",
  className,
  ...props
}: HeroSplitProductProps) {
  const mode = useBrandMode();
  const motion = useLandingMotion();
  const image = config.image;
  const src = mode === "dark" ? image?.darkSrc || image?.src : image?.src;
  const hasMedia = Boolean(src?.trim());
  const actions = [content.primaryAction, content.secondaryAction];
  const proof = config.proof;
  return (
    <Section
      {...props}
      spacing="none"
      className={cn("hb-split-product", className)}
      data-hero-variant="split-product"
      data-motion={motion.reveal}
      data-has-media={hasMedia}
    >
      <Container size="xl" gutter="md" className="max-w-[1200px]">
        <Grid
          cols={1}
          gap="none"
          align="center"
          className={cn("gap-y-8 sm:gap-y-9", hasMedia && "lg:grid-cols-12 lg:gap-x-6")}
        >
          <GridItem
            className={cn(
              "min-w-0",
              hasMedia
                ? "max-w-[640px] lg:col-span-5 lg:max-w-[510px]"
                : "mx-auto w-full max-w-[720px] text-center"
            )}
          >
            <Heading as={headingLevel} className="hb-split-product-title">
              {content.title}
            </Heading>
            <Text className={cn("hb-split-product-description", !hasMedia && "mx-auto")}>
              {content.description}
            </Text>
            {actions.some((action) => action?.label.trim() && hasDestination(action.href)) && (
              <div className={cn("hb-split-product-actions", !hasMedia && "justify-center")}>
                {actions.map((action, index) =>
                  action?.label.trim() && hasDestination(action.href) ? (
                    <Button
                      key={index}
                      href={action.href.trim()}
                      size="lg"
                      variant={index === 0 ? "solid" : "outline"}
                      className={cn("hb-radius", index === 0 ? "hb-primary" : "hb-secondary")}
                    >
                      {action.label}
                    </Button>
                  ) : null
                )}
              </div>
            )}
            {proof?.label.trim() && /^https?:\/\//i.test(proof.sourceUrl.trim()) && (
              <Button
                href={proof.sourceUrl.trim()}
                variant="plain"
                className="hb-split-product-proof mt-3 h-auto min-h-11 max-w-full text-sm whitespace-normal underline underline-offset-4"
              >
                {proof.label}
              </Button>
            )}
          </GridItem>
          {hasMedia && image && src && (
            <GridItem className="min-w-0 lg:col-span-7">
              <ProductImage key={src} image={image} src={src} />
            </GridItem>
          )}
        </Grid>
      </Container>
    </Section>
  );
}
