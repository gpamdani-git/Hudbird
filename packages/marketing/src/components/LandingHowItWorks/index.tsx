"use client";
import * as React from "react";
import { Grid, Heading, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingHeading } from "../LandingShared";

export function LandingHowItWorks({ variant, content }: LandingSectionProps<"how-it-works">) {
  const step = (item: (typeof content.items)[number], index: number) => (
    <div className="min-w-0">
      <Text className="hb-landing-number mb-5 text-sm">Step {index + 1}</Text>
      <Heading as="h3" size="h4">
        {item.title}
      </Heading>
      <Text className="text-muted-foreground mt-3 leading-relaxed">{item.description}</Text>
    </div>
  );
  return (
    <LandingFrame id="how-it-works">
      <LandingHeading title={content.title} description={content.description} />
      {variant === "horizontal" ? (
        <>
          <Grid cols={3} gap="lg">
            {content.items.map((item, index) => (
              <div key={item.id} className="border-border border-t pt-6">
                {step(item, index)}
              </div>
            ))}
          </Grid>
          {content.items[0] && (
            <div className="mt-12">
              <HeroImageView image={content.items[0].image} priority={false} />
            </div>
          )}
        </>
      ) : (
        <div className="space-y-16">
          {content.items.map((item, index) => (
            <Grid key={item.id} cols={2} gap="xl" align="center">
              {step(item, index)}
              <HeroImageView image={item.image} priority={false} />
            </Grid>
          ))}
        </div>
      )}
    </LandingFrame>
  );
}
