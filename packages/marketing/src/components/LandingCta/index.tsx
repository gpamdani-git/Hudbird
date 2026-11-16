"use client";
import * as React from "react";
import { Card, CardBody, Grid } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import {
  LandingFrame,
  LandingHeading,
  LandingCheckItem,
  LandingActionButton,
  resolveLandingGridProps,
  useLandingAppearance,
  useLandingNavigation,
} from "../LandingShared";
import { EditorialBrandCtaContent } from "../AboutUsSection";
import { cn } from "../../utils/cn";

export function LandingCta({ variant, content }: LandingSectionProps<"cta">) {
  const { hrefFor } = useLandingNavigation();
  const appearance = useLandingAppearance();
  const cardCfg = appearance?.card;
  const bannerGridProps = resolveLandingGridProps(appearance?.grid, { cols: 3, gap: "sm" });
  const splitGridProps = resolveLandingGridProps(appearance?.grid, {
    cols: 2,
    gap: "xl",
    align: "center",
  });

  if (variant === "editorial-showcase") {
    const ed = content.editorial;
    return (
      <LandingFrame id="cta">
        <EditorialBrandCtaContent
          editScope="cta"
          title={content.title}
          description={content.description}
          primaryLabel={content.action.label}
          primaryHref={hrefFor(content.action.href)}
          videoCaptionLabel={ed?.videoCaptionLabel}
          videoPromptLabel={ed?.videoPromptLabel}
          videoUrl={ed?.videoUrl}
          videoTitle={ed?.videoTitle}
          rating={ed?.rating}
          ratingSummary={ed?.ratingSummary}
          imageSrc={ed?.image?.src}
          imageAlt={ed?.image?.alt}
          imageFocalPoint={ed?.image?.focalPoint}
          avatars={ed?.avatars && ed.avatars.length > 0 ? ed.avatars : undefined}
        />
      </LandingFrame>
    );
  }

  const invitation = (
    <div className={variant === "centered" ? "text-center" : undefined}>
      <LandingHeading
        eyebrow={content.eyebrow ?? "Get started"}
        title={content.title}
        description={content.description}
        centered={variant === "centered"}
      />
      <div
        className={
          variant === "centered"
            ? "flex flex-wrap items-center justify-center gap-3"
            : "flex flex-wrap items-center gap-3"
        }
      >
        <LandingActionButton action={content.action} editField="cta:action.label" />
        {content.secondaryAction?.label && (
          <LandingActionButton
            action={content.secondaryAction}
            secondary
            editField="cta:secondaryAction.label"
          />
        )}
      </div>
    </div>
  );
  return (
    <LandingFrame id="cta">
      {variant === "centered" ? (
        <Card
          variant={cardCfg?.variant ?? "bordered"}
          radius={cardCfg?.radius ?? "lg"}
          data-hb-node="card"
          className={cn(
            !cardCfg?.radius && "hb-radius",
            "bg-zinc-50/70 shadow-xs dark:bg-white/[0.02]"
          )}
        >
          <CardBody className="p-8 sm:p-14">{invitation}</CardBody>
        </Card>
      ) : variant === "banner" ? (
        <Card
          variant={cardCfg?.variant ?? "bordered"}
          radius={cardCfg?.radius ?? "lg"}
          data-hb-node="card"
          className={cn(
            !cardCfg?.radius && "hb-radius",
            "bg-zinc-50/70 shadow-xs dark:bg-white/[0.02]"
          )}
        >
          <CardBody className="space-y-8 p-8 sm:p-12">
            {invitation}
            <Grid
              as="ul"
              {...bannerGridProps}
              className="hb-landing-list border-t border-zinc-200/70 pt-6 dark:border-white/[0.08]"
            >
              {content.benefits.map((benefit, idx) => (
                <LandingCheckItem key={benefit}>
                  <span
                    data-hb-node="items"
                    data-hb-item={idx}
                    data-hb-edit={`cta:benefits.${idx}`}
                  >
                    {benefit}
                  </span>
                </LandingCheckItem>
              ))}
            </Grid>
          </CardBody>
        </Card>
      ) : (
        <Card
          variant={cardCfg?.variant ?? "bordered"}
          radius={cardCfg?.radius ?? "lg"}
          data-hb-node="card"
          className={cn(
            !cardCfg?.radius && "hb-radius",
            "bg-zinc-50/70 shadow-xs dark:bg-white/[0.02]"
          )}
        >
          <CardBody className="p-8 sm:p-12">
            <Grid {...splitGridProps}>
              {invitation}
              <ul className="hb-landing-list space-y-4">
                {content.benefits.map((benefit, idx) => (
                  <LandingCheckItem key={benefit}>
                    <span
                      data-hb-node="items"
                      data-hb-item={idx}
                      data-hb-edit={`cta:benefits.${idx}`}
                    >
                      {benefit}
                    </span>
                  </LandingCheckItem>
                ))}
              </ul>
            </Grid>
          </CardBody>
        </Card>
      )}
    </LandingFrame>
  );
}
