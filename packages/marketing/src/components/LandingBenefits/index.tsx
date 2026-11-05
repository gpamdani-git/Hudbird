"use client";
import * as React from "react";
import { Grid, Heading, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingHeading } from "../LandingShared";

export function LandingBenefits({ variant, content }: LandingSectionProps<"benefits">) {
  const items = content.items.map((item) => (
    <div key={item.id} className="border-border min-w-0 border-t pt-6">
      <Heading as="h3" size="h4">
        {item.title}
      </Heading>
      <Text className="text-muted-foreground mt-3 leading-relaxed">{item.description}</Text>
    </div>
  ));
  return (
    <LandingFrame id="benefits">
      <LandingHeading title={content.title} description={content.description} />
      {variant === "columns" ? (
        <Grid cols={content.items.length === 4 ? 4 : 3} gap="lg">
          {items}
        </Grid>
      ) : (
        <Grid cols={2} gap="xl" align="center">
          <HeroImageView image={content.image} priority={false} />
          <div className="space-y-8">{items}</div>
        </Grid>
      )}
    </LandingFrame>
  );
}
