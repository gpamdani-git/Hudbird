"use client";
import * as React from "react";
import {
  Button,
  Container,
  EditorialImage,
  Grid,
  GridItem,
  Heading,
  MotionReveal,
  Section,
  Text,
} from "@hudbird/ui";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { useBrandMode } from "./BrandScope";
import {
  renderInlineFormattedText,
  useLandingAppearance,
  useLandingMotion,
  useLandingNavigation,
} from "../LandingShared";
import { cn } from "../../utils/cn";
import "./hero-split-product.css";

export interface HeroSplitProductProps extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  content: HeroContent;
  config: Extract<HeroSectionConfig, { variant: "split-product" }>;
  headingLevel?: "h1" | "h2" | "h3";
}

// Only navigable destinations become links; incomplete editor data stays non-interactive.
function hasDestination(value?: string) {
  return Boolean(
    value && /^(website-page:|https?:\/\/|mailto:|tel:|\/|#[^\s]+)/i.test(value.trim())
  );
}

function ProductImage({ image, src }: { image: HeroImage; src: string }) {
  const [failed, setFailed] = React.useState(false);
  const [decoded, setDecoded] = React.useState(false);
  const mounted = React.useRef(true);
  const motion = useLandingMotion();
  const appearance = useLandingAppearance();
  const mediaCfg = appearance?.media;
  const hasMediaOverrides = Boolean(
    mediaCfg &&
    (mediaCfg.aspectRatio ||
      mediaCfg.radius ||
      mediaCfg.hasBorder !== undefined ||
      mediaCfg.overlayGradient !== undefined ||
      mediaCfg.isZoomable !== undefined)
  );
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
        ) : hasMediaOverrides ? (
          <EditorialImage
            src={src}
            alt={image.alt}
            aspectRatio={mediaCfg?.aspectRatio ?? "auto"}
            radius={mediaCfg?.radius ?? "lg"}
            hasBorder={mediaCfg?.hasBorder ?? false}
            overlayGradient={mediaCfg?.overlayGradient ?? false}
            isZoomable={mediaCfg?.isZoomable ?? false}
            className="h-full w-full"
          />
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
  const appearance = useLandingAppearance();
  const { hrefFor } = useLandingNavigation();
  const headingCfg = appearance?.heading;
  const textCfg = appearance?.text;
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
            <Heading
              as={headingLevel}
              size={headingCfg?.size}
              tracking={headingCfg?.tracking}
              color={headingCfg?.color}
              withDivider={headingCfg?.withDivider}
              data-hb-node="heading"
              data-hb-edit="hero:title"
              className={cn(!headingCfg?.size && "hb-split-product-title")}
            >
              {renderInlineFormattedText(content.title)}
            </Heading>
            <Text
              variant={textCfg?.variant}
              weight={textCfg?.weight}
              align={textCfg?.align}
              data-hb-node="text"
              data-hb-edit="hero:description"
              className={cn(
                "hb-split-product-description",
                !hasMedia && !textCfg?.align && "mx-auto"
              )}
            >
              {content.description}
            </Text>
            {actions.some((action) => action?.label.trim() && hasDestination(action.href)) && (
              <div className={cn("hb-split-product-actions", !hasMedia && "justify-center")}>
                {actions.map((action, index) => {
                  if (!action?.label.trim() || !hasDestination(action.href)) return null;
                  const btnCfg = index === 0 ? appearance?.button : appearance?.secondaryButton;
                  return (
                    <Button
                      key={index}
                      href={hrefFor(action.href.trim())}
                      size={btnCfg?.size ?? "lg"}
                      variant={btnCfg?.variant ?? (index === 0 ? "solid" : "outline")}
                      color={btnCfg?.color}
                      radius={btnCfg?.radius}
                      data-hb-node={index === 0 ? "primary-button" : "secondary-button"}
                      data-hb-edit={
                        index === 0 ? "hero:primaryAction.label" : "hero:secondaryAction.label"
                      }
                      className={cn(
                        !btnCfg?.radius && "hb-radius",
                        !btnCfg?.variant &&
                          !btnCfg?.color &&
                          (index === 0 ? "hb-primary" : "hb-secondary")
                      )}
                    >
                      <span data-hb-edit-text="">{action.label}</span>
                    </Button>
                  );
                })}
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
            <GridItem
              className="min-w-0 cursor-pointer lg:col-span-7"
              data-hb-node="media"
              data-hb-edit="hero:media.src"
              data-hb-edit-mode="popover"
            >
              <ProductImage key={src} image={image} src={src} />
            </GridItem>
          )}
        </Grid>
      </Container>
    </Section>
  );
}
