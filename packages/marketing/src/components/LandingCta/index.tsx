"use client";
import * as React from "react";
import { Grid, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading, LandingActionButton } from "../LandingShared";

export function LandingCta({ variant, content }: LandingSectionProps<"cta">) {
  const invitation = (
    <div className={variant === "centered" ? "text-center" : undefined}>
      <LandingHeading
        title={content.title}
        description={content.description}
        centered={variant === "centered"}
      />
      <LandingActionButton action={content.action} />
    </div>
  );
  return (
    <LandingFrame id="cta">
      {variant === "centered" ? (
        invitation
      ) : (
        <Grid cols={2} gap="xl" align="center">
          {invitation}
          <ul className="hb-landing-list space-y-5">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="border-border border-t pt-5">
                <Text>{benefit}</Text>
              </li>
            ))}
          </ul>
        </Grid>
      )}
    </LandingFrame>
  );
}
