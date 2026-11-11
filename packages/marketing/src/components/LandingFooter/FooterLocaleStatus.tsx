"use client";
import * as React from "react";
import { Container, Section, Heading, Text, Button } from "@hudbird/ui";
import { Globe, ChevronDown, ArrowUpRight } from "lucide-react";
import type { BrandProfile, LandingSectionProps } from "@hudbird/schemas";
import { useLandingNavigation, useLandingMotion } from "../LandingShared";
import { cn } from "../../utils/cn";
import "./footer-locale-status.css";

export interface FooterLocaleStatusProps {
  content: LandingSectionProps<"footer">["content"];
  brand: BrandProfile;
  className?: string;
  id?: string;
}

export function FooterLocaleStatus({
  content,
  brand,
  className,
  id = "footer",
}: FooterLocaleStatusProps) {
  const { visible, hrefFor } = useLandingNavigation();
  const motion = useLandingMotion();

  // Locales list and active selection state
  const rawLocales = content.locales ?? [
    { code: "en", label: "English (US)", href: "/en" },
    { code: "id", label: "Bahasa Indonesia", href: "/id" },
    { code: "ja", label: "日本語", href: "/ja" },
    { code: "de", label: "Deutsch", href: "/de" },
  ];
  const [selectedLocale, setSelectedLocale] = React.useState(
    content.activeLocale ?? rawLocales[0]?.code ?? "en"
  );

  // Specification: "Jika hanya satu bahasa atau locale aktif tidak memiliki URL tujuan lain, sembunyikan kontrol"
  const hasMultipleLocales =
    rawLocales.length > 1 && rawLocales.some((l) => l.href && l.href !== rawLocales[0]?.href);

  // Status data handling with evidence rule: "Tidak ada klaim 'normal' tanpa bukti"
  const status = content.status;
  const hasStatusHref = Boolean(status?.href?.trim());
  const statusLabel = status?.label?.trim() || (hasStatusHref ? "Service status" : undefined);
  const statusState = status?.label?.toLowerCase().includes("operational")
    ? "operational"
    : status?.label?.toLowerCase().includes("degraded")
      ? "degraded"
      : status?.label?.toLowerCase().includes("outage")
        ? "outage"
        : "unknown";

  // Filter groups
  const groups = content.groups
    .map((group) => ({
      ...group,
      links: group.links.filter((link) => "href" in link || visible.includes(link.target)),
    }))
    .filter((group) => group.links.length);

  const linkHref = (link: (typeof groups)[number]["links"][number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);
  const linkKey = (link: (typeof groups)[number]["links"][number]) =>
    "href" in link ? link.href : link.target;

  // Handle locale switch button
  const handleLocaleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const targetLocale = rawLocales.find((l) => l.code === selectedLocale);
    if (targetLocale?.href && typeof window !== "undefined") {
      window.location.href = targetLocale.href;
    }
  };

  return (
    <Section
      as="footer"
      id={id}
      spacing="none"
      data-landing-section="footer"
      data-footer-variant="locale-status"
      data-motion={motion.reveal === "off" ? "off" : undefined}
      className={cn("hb-footer-locale-status", className)}
    >
      <Container size="xl" gutter="lg">
        {/* Main 4/3/3/2 Grid */}
        <div className="hb-footer-locale-status-grid grid grid-cols-1 gap-8">
          {/* Column 1 (4fr): Brand signature, description, and verified service status */}
          <div className="flex flex-col items-start gap-4">
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

            <Text className="text-muted-foreground max-w-[34ch] text-sm leading-relaxed">
              {content.description}
            </Text>

            {/* Service status indicator */}
            {hasStatusHref && statusLabel && (
              <div className="mt-1 flex flex-col gap-1.5">
                <a
                  href={status?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hb-footer-status-pill group/status"
                  aria-label={`${statusLabel}${status?.summary ? ` — ${status.summary}` : ""}`}
                >
                  <span
                    className="hb-footer-status-dot"
                    data-status={statusState}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium">{statusLabel}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover/status:translate-x-0.5 group-hover/status:-translate-y-0.5" />
                </a>
                {(status?.summary || status?.checkedAt) && (
                  <Text className="text-muted-foreground text-[11px] leading-tight">
                    {status.summary}
                    {status.summary && status.checkedAt ? " · " : ""}
                    {status.checkedAt}
                  </Text>
                )}
              </div>
            )}
          </div>

          {/* Column 2 & Column 3: Navigation Groups from sitemap */}
          {groups.slice(0, 2).map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col items-start">
              <Heading
                as="h2"
                size="h6"
                className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
              >
                {group.title}
              </Heading>
              <div className="mt-4 flex flex-col items-start gap-2.5">
                {group.links.map((link) => (
                  <a
                    key={linkKey(link)}
                    href={linkHref(link)}
                    className="hb-footer-nav-link text-muted-foreground hover:text-foreground inline-flex min-h-[36px] items-center py-0.5 text-sm decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}

          {/* If there's only 1 group, add an empty placeholder or secondary links */}
          {groups.length < 2 && (
            <nav aria-label="Support & Resources" className="flex flex-col items-start">
              <Heading
                as="h2"
                size="h6"
                className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
              >
                Resources
              </Heading>
              <div className="mt-4 flex flex-col items-start gap-2.5">
                <a
                  href="#features"
                  className="hb-footer-nav-link text-muted-foreground hover:text-foreground inline-flex min-h-[36px] items-center py-0.5 text-sm decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
                >
                  Documentation
                </a>
                <a
                  href="#faq"
                  className="hb-footer-nav-link text-muted-foreground hover:text-foreground inline-flex min-h-[36px] items-center py-0.5 text-sm decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
                >
                  Help center
                </a>
              </div>
            </nav>
          )}

          {/* Column 4 (2fr): Language selector (Native Select + Optional Confirm button) */}
          <div className="flex flex-col items-start">
            {hasMultipleLocales && (
              <form onSubmit={handleLocaleChange} className="w-full">
                <label
                  htmlFor="hb-footer-locale-select"
                  className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase"
                >
                  Bahasa situs
                </label>

                <div className="hb-locale-select-wrap">
                  <Globe className="hb-locale-select-icon" aria-hidden="true" />
                  <select
                    id="hb-footer-locale-select"
                    name="locale"
                    aria-label="Bahasa situs"
                    value={selectedLocale}
                    onChange={(e) => setSelectedLocale(e.target.value)}
                    className="hb-locale-select"
                  >
                    {rawLocales.map((locale) => (
                      <option key={locale.code} value={locale.code} lang={locale.code}>
                        {locale.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="hb-locale-select-chevron" aria-hidden="true" />
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="hb-secondary h-8 px-3 text-xs"
                  >
                    Ganti bahasa
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip: Legal links, copyright, and platform badge */}
        <div className="border-border mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
            <span>{content.note}</span>
            {content.legalLinks?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hb-footer-nav-link text-muted-foreground hover:text-foreground text-xs decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-mono text-xs">
              © {new Date().getFullYear()} {brand.name}
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
