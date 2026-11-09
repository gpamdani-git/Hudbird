"use client";
import * as React from "react";
import { Badge, Grid, Text, Heading, Button } from "@hudbird/ui";
import type { BrandProfile, LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, useLandingNavigation } from "../LandingShared";

export function LandingFooter({
  variant,
  content,
  brand,
}: LandingSectionProps<"footer"> & { brand: BrandProfile }) {
  const { visible, hrefFor } = useLandingNavigation();
  const signature = (
    <div>
      <div className="flex items-center gap-2.5">
        {brand.logo && (
          <img
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        )}
        <Text className="hb-landing-title text-xl font-semibold tracking-tight">{brand.name}</Text>
      </div>
      <Text className="text-muted-foreground mt-3 max-w-[36ch] leading-relaxed">
        {content.description}
      </Text>
    </div>
  );
  const links = content.groups
    .map((group) => ({
      ...group,
      links: group.links.filter((link) => "href" in link || visible.includes(link.target)),
    }))
    .filter((group) => group.links.length);
  const linkHref = (link: (typeof links)[number]["links"][number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);
  const linkKey = (link: (typeof links)[number]["links"][number]) =>
    "href" in link ? link.href : link.target;
  return (
    <LandingFrame id="footer" as="footer">
      {variant === "simple" ? (
        <div className="flex flex-wrap items-start justify-between gap-8">
          {signature}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-2">
            {links
              .flatMap((group) => group.links)
              .map((link) => (
                <Button
                  key={linkKey(link)}
                  href={linkHref(link)}
                  variant="plain"
                  className="hb-secondary"
                >
                  {link.label}
                </Button>
              ))}
          </nav>
        </div>
      ) : variant === "centered" ? (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2.5">
              {brand.logo && (
                <img
                  src={brand.logo.src}
                  alt={brand.logo.alt}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              )}
              <Text className="hb-landing-title text-xl font-semibold tracking-tight">
                {brand.name}
              </Text>
            </div>
            <Text className="text-muted-foreground mt-3 max-w-[42ch] leading-relaxed">
              {content.description}
            </Text>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-2">
            {links
              .flatMap((group) => group.links)
              .map((link) => (
                <Button
                  key={linkKey(link)}
                  href={linkHref(link)}
                  variant="plain"
                  className="hb-secondary"
                >
                  {link.label}
                </Button>
              ))}
          </nav>
        </div>
      ) : (
        <Grid cols={4} gap="lg">
          {signature}
          {links.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <Heading as="h2" size="h6" className="text-muted-foreground tracking-wider uppercase">
                {group.title}
              </Heading>
              <div className="mt-4 flex flex-col items-start gap-1">
                {group.links.map((link) => (
                  <Button
                    key={linkKey(link)}
                    href={linkHref(link)}
                    variant="plain"
                    className="hb-secondary px-0 font-medium"
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </nav>
          ))}
        </Grid>
      )}
      <div className="border-border mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <Text variant="small" className="text-muted-foreground">
          {content.note}
        </Text>
        <Badge variant="modern" size="sm">
          Built with @hudbird/ui
        </Badge>
      </div>
    </LandingFrame>
  );
}
