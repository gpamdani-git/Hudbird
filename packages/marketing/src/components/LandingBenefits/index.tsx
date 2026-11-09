"use client";
import * as React from "react";
import { Badge, Card, CardBody, Grid, Heading, IconBox, Text } from "@hudbird/ui";
import { Zap, ShieldCheck, Sparkles, Layers } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingHeading } from "../LandingShared";

const benefitIcons = [Zap, Layers, ShieldCheck, Sparkles];

export function LandingBenefits({ variant, content }: LandingSectionProps<"benefits">) {
  const items = content.items.map((item, index) => {
    const Icon = benefitIcons[index % benefitIcons.length];
    return (
      <div key={item.id} className="flex min-w-0 flex-col items-start">
        <IconBox
          size="md"
          variant="modern"
          icon={Icon}
          showGlow={false}
          className="mb-5"
          aria-hidden="true"
        />
        <Heading as="h3" size="h4">
          {item.title}
        </Heading>
        <Text className="text-muted-foreground mt-2.5 leading-relaxed">{item.description}</Text>
      </div>
    );
  });
  return (
    <LandingFrame id="benefits">
      <LandingHeading
        eyebrow="Why teams switch"
        title={content.title}
        description={content.description}
      />
      {variant === "columns" ? (
        <Grid cols={content.items.length === 4 ? 4 : 3} gap="lg">
          {items}
        </Grid>
      ) : variant === "cards" ? (
        <Grid cols={content.items.length === 4 ? 4 : 3} gap="md">
          {content.items.map((item, idx) => {
            const Icon = benefitIcons[idx % benefitIcons.length];
            return (
              <Card key={item.id} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
                <CardBody className="space-y-4 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2">
                    <IconBox
                      size="md"
                      variant="modern"
                      icon={Icon}
                      showGlow={false}
                      aria-hidden="true"
                    />
                    <Badge variant="modern" size="sm" className="hb-landing-number">
                      0{idx + 1}
                    </Badge>
                  </div>
                  <Heading as="h3" size="h4">
                    {item.title}
                  </Heading>
                  <Text className="text-muted-foreground leading-relaxed">{item.description}</Text>
                </CardBody>
              </Card>
            );
          })}
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
