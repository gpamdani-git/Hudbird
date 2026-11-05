"use client";
import * as React from "react";
import {
  Button,
  Card,
  Grid,
  Heading,
  MotionCrossfade,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@hudbird/ui";
import { Check, Circle } from "lucide-react";
import type { BrandProfile, HeroContent, HeroSectionConfig } from "@hudbird/schemas";
import { BrandScope, HeroSection } from "../HeroSection";
import { LandingFrame } from "../LandingShared";
import "./showcase.css";

export interface LandingBuilderVariant {
  id: string;
  label: string;
  description: string;
  config: HeroSectionConfig;
}

export interface LandingBuilderShowcaseProps {
  brand: BrandProfile;
  content: HeroContent;
  variants: LandingBuilderVariant[];
  initialVariant?: string;
  builderHref: string;
}

function LayoutThumbnail({
  config,
  content,
  mode,
}: {
  config: HeroSectionConfig;
  content: HeroContent;
  mode: BrandProfile["mode"];
}) {
  const image =
    "image" in config
      ? config.image
      : config.variant === "video"
        ? config.video.poster
        : config.variant === "slideshow"
          ? config.slides[0]
          : undefined;
  const src = mode === "dark" ? image?.darkSrc || image?.src : image?.src;
  const demo = config.variant === "interactive" ? config.tabs[0] : undefined;
  return (
    <div aria-hidden="true" className="hb-layout-art">
      <div className="hb-layout-sheet" data-layout={config.variant}>
        <div className="hb-layout-type">{content.title}</div>
        {src && <img src={src} alt="" loading="lazy" className="hb-layout-media" />}
        {demo && (
          <div className="hb-layout-demo">
            <strong>{demo.label}</strong>
            {demo.items.slice(0, 3).map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function LandingBuilderShowcase({
  brand,
  content,
  variants,
  initialVariant,
  builderHref,
}: LandingBuilderShowcaseProps) {
  const fallback = variants[0];
  const initial = variants.some((variant) => variant.id === initialVariant)
    ? initialVariant!
    : (fallback?.id ?? "");
  const [selected, setSelected] = React.useState(initial);
  const active = variants.find((variant) => variant.id === selected) ?? fallback;

  return (
    <LandingFrame id="builder">
      <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <Heading
          as="h2"
          size="inherit"
          className="hb-subheading text-[clamp(3.25rem,7vw,6.75rem)] leading-[0.94] font-medium tracking-[-0.055em]"
        >
          Change the layout. <span className="text-muted-foreground block">Keep the system.</span>
        </Heading>
        <Text className="text-muted-foreground mx-auto mt-6 max-w-[54ch] text-lg leading-relaxed text-balance sm:text-xl lg:text-2xl">
          Choose a hero composition and watch the same brand, content, spacing, and controls move
          with it.
        </Text>
      </header>
      {active ? (
        <Tabs selectedKey={active.id} onSelectionChange={setSelected} variant="light">
          <TabList aria-label="Hero layout" className="w-full">
            <BrandScope brand={brand}>
              <Grid cols={3} gap="sm" className="hb-layout-gallery">
                {variants.map((variant) => (
                  <Card
                    key={variant.id}
                    variant="bordered"
                    className="hb-layout-choice"
                    data-selected={variant.id === active.id}
                  >
                    <LayoutThumbnail config={variant.config} content={content} mode={brand.mode} />
                    <Tab tabKey={variant.id} className="hb-layout-tab">
                      <span>{variant.label}</span>
                      {variant.id === active.id ? (
                        <Check aria-hidden="true" size={16} />
                      ) : (
                        <Circle aria-hidden="true" size={14} />
                      )}
                    </Tab>
                  </Card>
                ))}
              </Grid>
            </BrandScope>
          </TabList>
          <Text role="status" aria-live="polite" className="sr-only">
            {active.label} preview selected.
          </Text>
          {variants.map((variant) => (
            <TabPanel key={variant.id} tabKey={variant.id} className="mt-5 min-w-0 sm:mt-8">
              <Text className="text-muted-foreground mx-auto mb-5 max-w-[58ch] text-center leading-relaxed">
                {variant.description}
              </Text>
              <MotionCrossfade transitionKey={variant.id}>
                <BrandScope
                  brand={brand}
                  data-builder-preview={variant.id}
                  className="hb-builder-showcase hb-radius border-border overflow-hidden border"
                >
                  <HeroSection content={content} config={variant.config} headingLevel="h3" />
                </BrandScope>
              </MotionCrossfade>
            </TabPanel>
          ))}
        </Tabs>
      ) : (
        <Text role="status">Add at least one hero variant to show the builder preview.</Text>
      )}
      <Button href={builderHref} className="hb-primary hb-radius mx-auto mt-8 flex w-fit">
        Open the full page builder
      </Button>
    </LandingFrame>
  );
}
