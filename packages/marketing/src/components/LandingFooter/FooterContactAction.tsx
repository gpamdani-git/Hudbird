"use client";
import * as React from "react";
import { Container, Section, Heading, Text, Button } from "@hudbird/ui";
import { Mail, Phone, Calendar, Clock, ArrowUpRight } from "lucide-react";
import type { BrandProfile, LandingSectionProps } from "@hudbird/schemas";
import { useLandingNavigation, useLandingMotion } from "../LandingShared";
import { cn } from "../../utils/cn";
import "./footer-contact-action.css";

export interface FooterContactActionProps {
  content: LandingSectionProps<"footer">["content"];
  brand: BrandProfile;
  className?: string;
  id?: string;
}

function isNavigable(href?: string) {
  return Boolean(href && /^(mailto:|tel:|\/|#[^\s]+|https?:\/\/)/i.test(href.trim()));
}

export function FooterContactAction({
  content,
  brand,
  className,
  id = "footer",
}: FooterContactActionProps) {
  const { visible, hrefFor } = useLandingNavigation();
  const motion = useLandingMotion();

  const headingText = content.heading ?? "Bicarakan kebutuhan project Anda.";
  const descriptionText =
    content.description ??
    "Jadwalkan sesi konsultasi atau hubungi tim teknis kami langsung. Kami merespons dalam 1 hari kerja.";

  // Fallback rule: "Matikan URL booking, pastikan email valid mendapat posisi aksi tanpa duplikasi"
  const rawContactAction = content.contactAction;
  const isBookingValid = isNavigable(rawContactAction?.href);

  // Raw contact links
  const rawChannels = content.contactLinks ?? [];

  // If booking is not valid, promote email to primary action if available
  const emailChannel = rawChannels.find((c) => c.type === "email" || c.href.startsWith("mailto:"));

  const effectivePrimaryAction = isBookingValid
    ? rawContactAction
    : emailChannel
      ? { label: `Email ${emailChannel.label}`, href: emailChannel.href }
      : undefined;

  // Filter channels so the promoted email isn't duplicated in the list
  const displayChannels = isBookingValid
    ? rawChannels
    : rawChannels.filter((c) => c !== emailChannel);

  // Fallback rule: "Bila semua kanal kosong, hilangkan panel kontak"
  const hasContactPanel = Boolean(
    effectivePrimaryAction || displayChannels.length > 0 || content.officeHours
  );

  // Filter sitemap groups (render all groups without truncation)
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

  const legalLinks = content.legalLinks ?? [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Security & Trust", href: "#security" },
  ];

  return (
    <Section
      as="footer"
      id={id}
      spacing="none"
      data-landing-section="footer"
      data-footer-variant="contact-action"
      data-motion={motion.reveal === "off" ? "off" : undefined}
      className={cn("hb-footer-contact-action", className)}
    >
      <Container size="xl" gutter="lg">
        {/* Top: 7/5 Contact & Next Action Panel - full width matching Container */}
        {hasContactPanel && (
          <div className="hb-contact-action-panel">
            <div className="hb-contact-panel-inner">
              {/* Left Column (7fr): Heading, description & primary CTA */}
              <div className="flex flex-col items-start justify-between gap-6">
                <div>
                  <Heading as="h2" className="hb-footer-contact-heading">
                    {headingText}
                  </Heading>
                  <Text className="hb-footer-contact-desc">{descriptionText}</Text>
                </div>

                {effectivePrimaryAction && isNavigable(effectivePrimaryAction.href) && (
                  <Button
                    href={effectivePrimaryAction.href}
                    target={effectivePrimaryAction.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      effectivePrimaryAction.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="hb-primary hb-radius hb-footer-contact-cta group/cta"
                    size="lg"
                  >
                    <span>{effectivePrimaryAction.label}</span>
                    {effectivePrimaryAction.href.startsWith("http") && (
                      <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    )}
                  </Button>
                )}
              </div>

              {/* Right Column (5fr): Address channels & office hours */}
              {(displayChannels.length > 0 || content.officeHours) && (
                <div className="flex flex-col justify-between gap-6 border-zinc-200/80 pt-6 sm:border-l sm:pt-0 sm:pl-8 dark:border-white/[0.08]">
                  {displayChannels.length > 0 && (
                    <address className="flex flex-col gap-2.5 not-italic">
                      <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-wider uppercase">
                        Jalur komunikasi
                      </span>

                      {displayChannels.map((channel, i) => {
                        const isExternal = channel.href.startsWith("http");
                        const Icon =
                          channel.type === "email" || channel.href.startsWith("mailto:")
                            ? Mail
                            : channel.type === "phone" || channel.href.startsWith("tel:")
                              ? Phone
                              : Calendar;

                        return (
                          <a
                            key={`${channel.href}-${i}`}
                            href={channel.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="hb-contact-channel-link group/channel"
                          >
                            <Icon className="hb-channel-icon" aria-hidden="true" />
                            <span className="truncate">{channel.label}</span>
                            {isExternal && (
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover/channel:translate-x-0.5 group-hover/channel:-translate-y-0.5" />
                            )}
                          </a>
                        );
                      })}
                    </address>
                  )}

                  {/* Office hours with timezone */}
                  {content.officeHours && (
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <Clock
                        className="text-muted-foreground h-3.5 w-3.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{content.officeHours}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Secondary Sitemap row (spacing matches top padding via CSS variable) */}
        {groups.length > 0 && (
          <div className="hb-contact-action-nav-row grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Brand Signature Column */}
            <div className="flex flex-col gap-3 pr-4 lg:col-span-4 xl:col-span-4">
              <div className="flex items-center gap-2.5">
                {brand.logo && (
                  <img
                    src={brand.logo.src}
                    alt={brand.logo.alt}
                    width={22}
                    height={22}
                    className="h-5.5 w-5.5 object-contain"
                  />
                )}
                <Text className="text-foreground text-sm font-semibold tracking-tight">
                  {brand.name}
                </Text>
              </div>
              <Text className="text-muted-foreground max-w-[32ch] text-xs leading-relaxed">
                {content.description}
              </Text>
            </div>

            {/* Navigation Groups Grid: Row 2 aligns directly with menu 1, never under brand signature */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5 xl:col-span-8">
              {groups.map((group) => (
                <nav
                  key={group.title}
                  aria-label={group.title}
                  className="flex flex-col items-start"
                >
                  <Heading
                    as="h3"
                    size="h6"
                    className="text-muted-foreground mb-3.5 text-xs font-semibold tracking-wider uppercase"
                  >
                    {group.title}
                  </Heading>
                  <div className="flex w-full flex-col gap-2.5">
                    {group.links.map((link) => (
                      <a
                        key={linkKey(link)}
                        href={linkHref(link)}
                        className="hb-footer-nav-link text-muted-foreground hover:text-foreground inline-flex items-center py-0.5 text-sm decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </nav>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Strip: Legal policies, copyright */}
        <div className="border-border text-muted-foreground mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hb-footer-nav-link text-muted-foreground hover:text-foreground text-xs decoration-current/40 underline-offset-4 transition-colors duration-150 hover:underline hover:decoration-current"
              >
                {link.label}
              </a>
            ))}
            <span>{content.note}</span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span>
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
