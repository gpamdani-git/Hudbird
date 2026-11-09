"use client";
import * as React from "react";
import { Card, CardBody, Grid, MotionTicker, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading, LandingDemoNote, useLandingMotion } from "../LandingShared";

function LogoItem({ name, src }: { name: string; src?: string }) {
  return (
    <div
      className="hb-logo-item inline-flex shrink-0 items-center gap-3 rounded-xl border border-zinc-200/70 bg-zinc-50/70 px-4 py-2.5 shadow-2xs dark:border-white/[0.07] dark:bg-white/[0.02]"
      aria-label={name}
    >
      {src && <img src={src} alt="" aria-hidden="true" className="h-5 w-4 object-contain" />}
      <Text className="text-base font-semibold tracking-[-0.02em]">{name}</Text>
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
        <LandingHeading
          eyebrow="Social proof"
          title={content.title}
          description={content.description}
          centered
        />
        <MotionTicker
          className="hb-logo-ticker relative overflow-hidden py-3"
          aria-label="Hudbird example logo ticker"
          items={items.map((item, index) => (
            <div key={index} className="pr-8">
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
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {content.items.map((item) => (
          <LogoItem key={item} name={item} src={content.logo?.src} />
        ))}
      </div>
    ) : (
      <Grid cols={2} gap="md">
        {content.items.map((item) => (
          <Card key={item} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
            <CardBody className="flex items-center gap-3 p-5">
              {content.logo?.src && (
                <img
                  src={content.logo.src}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-4 object-contain opacity-80"
                />
              )}
              <Text className="text-base font-semibold">{item}</Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    );
  return (
    <LandingFrame id="logos" compact>
      {variant === "row" ? (
        <>
          <LandingHeading
            eyebrow="Social proof"
            title={content.title}
            description={content.description}
            centered
          />
          {logos}
        </>
      ) : (
        <Grid cols={2} gap="xl" align="center">
          <LandingHeading
            eyebrow="Social proof"
            title={content.title}
            description={content.description}
          />
          {logos}
        </Grid>
      )}
      <LandingDemoNote>
        Logo placeholders. Replace with approved customer or partner assets.
      </LandingDemoNote>
    </LandingFrame>
  );
}
