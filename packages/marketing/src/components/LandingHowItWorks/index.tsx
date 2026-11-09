"use client";
import * as React from "react";
import { Badge, Card, CardBody, Grid, Heading, IconBox, Text } from "@hudbird/ui";
import { PenTool, GitBranch, CheckCircle2 } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingHeading } from "../LandingShared";

const stepIcons = [PenTool, GitBranch, CheckCircle2];

export function LandingHowItWorks({ variant, content }: LandingSectionProps<"how-it-works">) {
  const step = (item: (typeof content.items)[number], index: number) => {
    const Icon = stepIcons[index % stepIcons.length];
    return (
      <div className="min-w-0">
        <div className="mb-5 flex items-center gap-3">
          <IconBox size="md" variant="modern" icon={Icon} showGlow={false} aria-hidden="true" />
          <Badge variant="modern" size="sm" className="hb-landing-number">
            Step {index + 1}
          </Badge>
        </div>
        <Heading as="h3" size="h4">
          {item.title}
        </Heading>
        <Text className="text-muted-foreground mt-3 leading-relaxed">{item.description}</Text>
      </div>
    );
  };
  return (
    <LandingFrame id="how-it-works">
      <LandingHeading
        eyebrow="How it works"
        title={content.title}
        description={content.description}
      />
      {variant === "horizontal" ? (
        <>
          <Grid cols={3} gap="lg">
            {content.items.map((item, index) => (
              <Card key={item.id} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
                <CardBody className="p-6 sm:p-7">{step(item, index)}</CardBody>
              </Card>
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
