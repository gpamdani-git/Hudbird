"use client";
import * as React from "react";
import { Card, CardBody, Grid } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import {
  LandingFrame,
  LandingHeading,
  LandingCheckItem,
  LandingActionButton,
} from "../LandingShared";

export function LandingCta({ variant, content }: LandingSectionProps<"cta">) {
  const invitation = (
    <div className={variant === "centered" ? "text-center" : undefined}>
      <LandingHeading
        eyebrow="Get started"
        title={content.title}
        description={content.description}
        centered={variant === "centered"}
      />
      <div className={variant === "centered" ? "flex justify-center" : "flex items-center"}>
        <LandingActionButton action={content.action} />
      </div>
    </div>
  );
  return (
    <LandingFrame id="cta">
      {variant === "centered" ? (
        <Card
          variant="bordered"
          radius="lg"
          className="hb-radius bg-zinc-50/70 shadow-xs dark:bg-white/[0.02]"
        >
          <CardBody className="p-8 sm:p-14">{invitation}</CardBody>
        </Card>
      ) : variant === "banner" ? (
        <Card
          variant="bordered"
          radius="lg"
          className="hb-radius bg-zinc-50/70 shadow-xs dark:bg-white/[0.02]"
        >
          <CardBody className="space-y-8 p-8 sm:p-12">
            {invitation}
            <Grid
              as="ul"
              cols={3}
              gap="sm"
              className="hb-landing-list border-t border-zinc-200/70 pt-6 dark:border-white/[0.08]"
            >
              {content.benefits.map((benefit) => (
                <LandingCheckItem key={benefit}>{benefit}</LandingCheckItem>
              ))}
            </Grid>
          </CardBody>
        </Card>
      ) : (
        <Card
          variant="bordered"
          radius="lg"
          className="hb-radius bg-zinc-50/70 shadow-xs dark:bg-white/[0.02]"
        >
          <CardBody className="p-8 sm:p-12">
            <Grid cols={2} gap="xl" align="center">
              {invitation}
              <ul className="hb-landing-list space-y-4">
                {content.benefits.map((benefit) => (
                  <LandingCheckItem key={benefit}>{benefit}</LandingCheckItem>
                ))}
              </ul>
            </Grid>
          </CardBody>
        </Card>
      )}
    </LandingFrame>
  );
}
