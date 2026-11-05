"use client";
import * as React from "react";
import { Grid, Text, Heading, Button } from "@hudbird/ui";
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
      <Text className="hb-landing-title text-xl font-semibold">{brand.name}</Text>
      <Text className="text-muted-foreground mt-4 max-w-[36ch]">{content.description}</Text>
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
      ) : (
        <Grid cols={4} gap="lg">
          {signature}
          {links.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <Heading as="h2" size="h5">
                {group.title}
              </Heading>
              <div className="mt-4 flex flex-col items-start gap-1">
                {group.links.map((link) => (
                  <Button
                    key={linkKey(link)}
                    href={linkHref(link)}
                    variant="plain"
                    className="hb-secondary px-0"
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </nav>
          ))}
        </Grid>
      )}
      <Text variant="small" className="text-muted-foreground border-border mt-12 border-t pt-6">
        {content.note}
      </Text>
    </LandingFrame>
  );
}
