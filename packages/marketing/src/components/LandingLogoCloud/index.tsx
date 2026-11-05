"use client";
import * as React from "react";
import { Grid, MotionTicker, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading, LandingDemoNote, useLandingMotion } from "../LandingShared";

function LogoItem({ name, src }: { name: string; src?: string }) {
  return (
    <div className="hb-logo-item flex shrink-0 items-center gap-3" aria-label={name}>
      {src && <img src={src} alt="" aria-hidden="true" className="h-7 w-5 object-contain" />}
      <Text className="text-lg font-medium tracking-[-0.02em]">{name}</Text>
    </div>
  );
}

export function LandingLogoCloud({ variant, content }: LandingSectionProps<"logos">) {
  const { autoplay } = useLandingMotion();
  if (variant === "ticker") {
    const items = content.items.map((item) => (
      <LogoItem key={item} name={item} src={content.logo?.src} />
    ));
    return (
      <LandingFrame id="logos" compact>
        <LandingHeading title={content.title} description={content.description} centered />
        <MotionTicker
          className="hb-logo-ticker relative overflow-hidden py-3"
          aria-label="Hudbird example logo ticker"
          items={items.map((item, index) => (
            <div key={index} className="pr-14">
              {item}
            </div>
          ))}
          paused={!autoplay}
        />
        <LandingDemoNote>
          Hudbird demo marks. Replace with approved customer assets.
        </LandingDemoNote>
      </LandingFrame>
    );
  }
  const logos =
    variant === "row" ? (
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-7">
        {content.items.map((item) => (
          <LogoItem key={item} name={item} src={content.logo?.src} />
        ))}
      </div>
    ) : (
      <Grid cols={2} gap="md">
        {content.items.map((item) => (
          <Text key={item} className="border-border border-b py-5 text-lg font-semibold">
            {item}
          </Text>
        ))}
      </Grid>
    );
  return (
    <LandingFrame id="logos" compact>
      {variant === "row" ? (
        <>
          <LandingHeading title={content.title} description={content.description} centered />
          {logos}
        </>
      ) : (
        <Grid cols={2} gap="xl" align="center">
          <LandingHeading title={content.title} description={content.description} />
          {logos}
        </Grid>
      )}
      <LandingDemoNote>
        Logo placeholders. Replace with approved customer or partner assets.
      </LandingDemoNote>
    </LandingFrame>
  );
}
