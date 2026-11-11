"use client";
import * as React from "react";
import { Badge, Grid, Text, Heading, Button } from "@hudbird/ui";
import type { BrandProfile, LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, useLandingNavigation } from "../LandingShared";
import { FooterLocaleStatus, type FooterLocaleStatusProps } from "./FooterLocaleStatus";
import { FooterContactAction, type FooterContactActionProps } from "./FooterContactAction";

export { FooterLocaleStatus, FooterContactAction };
export type { FooterLocaleStatusProps, FooterContactActionProps };

export function LandingFooter({
  variant,
  content,
  brand,
}: LandingSectionProps<"footer"> & { brand: BrandProfile }) {
  if (variant === "locale-status") {
    return <FooterLocaleStatus content={content} brand={brand} />;
  }

  if (variant === "contact-action") {
    return <FooterContactAction content={content} brand={brand} />;
  }

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

  // Compact links for minimal & simple footer (keeps menu concise like before)
  const compactLinks = React.useMemo(() => {
    const firstGroupLinks = links[0]?.links ?? [];
    if (firstGroupLinks.length >= 4 && firstGroupLinks.length <= 8) {
      return firstGroupLinks;
    }
    const all = links.flatMap((group) => group.links);
    if (all.length <= 6) return all;
    const coreTargets = ["features", "benefits", "how-it-works", "integrations", "pricing", "faq"];
    const matched = all.filter(
      (l) => "target" in l && typeof l.target === "string" && coreTargets.includes(l.target)
    );
    if (matched.length >= 4) return matched.slice(0, 6);
    return all.slice(0, 6);
  }, [links]);

  return (
    <LandingFrame id="footer" as="footer">
      {variant === "simple" ? (
        <div className="flex flex-wrap items-start justify-between gap-8">
          {signature}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {compactLinks.map((link) => (
              <a
                key={linkKey(link)}
                href={linkHref(link)}
                className="hb-footer-nav-link text-muted-foreground hover:text-foreground text-sm decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
              >
                {link.label}
              </a>
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
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {compactLinks.map((link) => (
              <a
                key={linkKey(link)}
                href={linkHref(link)}
                className="hb-footer-nav-link text-muted-foreground hover:text-foreground text-sm decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : (
        <Grid cols={12} gap="lg">
          {/* Left Column: Brand signature */}
          <div className="col-span-12 lg:col-span-4">{signature}</div>

          {/* Right Section: Navigation columns grid where row 2 aligns under menu 1, not under signature */}
          <div className="col-span-12 lg:col-span-8">
            <Grid cols={3} gap="lg">
              {links.map((group) => (
                <nav
                  key={group.title}
                  aria-label={group.title}
                  className="flex flex-col items-start"
                >
                  <Heading
                    as="h2"
                    size="h6"
                    className="text-muted-foreground mb-3.5 text-xs font-semibold tracking-wider uppercase"
                  >
                    {group.title}
                  </Heading>
                  <div className="flex flex-col items-start gap-2.5">
                    {group.links.map((link) => (
                      <a
                        key={linkKey(link)}
                        href={linkHref(link)}
                        className="hb-footer-nav-link text-muted-foreground hover:text-foreground text-sm decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </nav>
              ))}
            </Grid>
          </div>
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
