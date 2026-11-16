"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge, Container, Heading, Section, Text } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "./shared";
import "./about-us-section.css";

export interface ExpertSocialLinks {
  facebook?: string;
  x?: string;
  linkedin?: string;
}

export interface ExpertMember {
  id: string;
  name: string;
  specialty: string;
  imageSrc: string;
  imageAlt?: string;
  socials?: ExpertSocialLinks;
}

export interface MeetOurExpertSectionProps {
  id?: string;
  badgeLabel?: string;
  title?: string;
  description?: string;
  experts?: ExpertMember[];
  className?: string;
}

export const DEFAULT_EXPERTS: ExpertMember[] = [
  {
    id: "sarah-thompson",
    name: "Sarah Thompson",
    specialty: "Principal Design Systems Architect, Tokens & React Primitives",
    imageSrc:
      "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
  {
    id: "john-ramirez",
    name: "John Ramirez",
    specialty: "Staff Frontend Engineer, Multi-Page Builder & Schema Engine",
    imageSrc:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
  {
    id: "emily-chen",
    name: "Emily Chen",
    specialty: "Lead Motion Engineer, Framer Motion & Spring Physics",
    imageSrc:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
  {
    id: "michael-patel",
    name: "Michael Patel",
    specialty: "Accessibility Lead, Keyboard Navigation & WCAG Compliance",
    imageSrc:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
  {
    id: "liam-carter",
    name: "Liam Carter",
    specialty: "Core UI Engineer, Tailwind v4 & CSS Architecture",
    imageSrc:
      "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
  {
    id: "sophia-hughes",
    name: "Sophia Hughes",
    specialty: "Developer Experience Lead, CLI & Export Pipelines",
    imageSrc:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    specialty: "Performance Engineer, Tree-Shaking & Zero-Runtime Tokens",
    imageSrc:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
  {
    id: "isabella-collins",
    name: "Isabella Collins",
    specialty: "Product Designer, Editorial Typography & Layout Systems",
    imageSrc:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200",
    socials: { facebook: "#facebook", x: "#x", linkedin: "#linkedin" },
  },
];

function StethoscopeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 2.5v4a3 3 0 0 0 6 0v-4" />
      <path d="M3.5 2.5h1.5m5 0h1.5" />
      <path d="M7.5 9.5v2a2.5 2.5 0 0 0 5 0v-1.25" />
      <circle cx="12.5" cy="8.75" r="1.25" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M9.35 14V8.53h1.84l.27-2.13H9.35V5.04c0-.62.17-1.04 1.06-1.04h1.13V2.1c-.2-.03-.87-.09-1.65-.09-1.63 0-2.75 1-2.75 2.83V6.4H5.3v2.13h1.84V14h2.21Z" />
    </svg>
  );
}

function XMark() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M12.36 2.5h1.9l-4.15 4.74L15 13.5h-3.83L8.17 9.65 4.82 13.5H2.92l4.44-5.07L2.6 2.5h3.92l2.7 3.53L12.36 2.5Zm-.67 9.88h1.05L5.88 3.56H4.75l6.94 8.82Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M4.2 5.95H2.18V12.8H4.2V5.95ZM3.19 2.75a1.18 1.18 0 1 0 0 2.36 1.18 1.18 0 0 0 0-2.36Zm9.61 5.69c0-1.9-1.01-2.79-2.37-2.79-1.09 0-1.58.6-1.85 1.02v-.72H6.57c.03.6 0 6.85 0 6.85h2.01V8.97c0-.2.01-.41.07-.56.17-.41.55-.84 1.19-.84.84 0 1.18.63 1.18 1.56v3.67h2.01V8.44Z" />
    </svg>
  );
}

export function MeetOurExpertSection({
  id = "meet-our-expert",
  badgeLabel = "Core Engineering",
  title = "Meet the Engineers Behind Hudbird UI",
  description = "Frontend architects, design-system engineers, accessibility specialists, and motion developers working together to craft fast, composable React primitives.",
  experts = DEFAULT_EXPERTS,
  className,
}: MeetOurExpertSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const revealed = useSafeSectionReveal(sectionRef);
  const prefersReducedMotion = useReducedMotion();

  const initialFor = (yOffset: number) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset };

  const targetFor = (yOffset: number) =>
    prefersReducedMotion || revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset };

  return (
    <div ref={sectionRef} data-landing-section="meet-our-expert" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-about-us bg-background relative overflow-hidden py-16 sm:py-20 lg:py-24",
          className
        )}
      >
        <Container size="xl">
          <div className="mx-auto w-full max-w-6xl">
            <motion.div
              initial={initialFor(10)}
              animate={targetFor(10)}
              transition={{ duration: 0.36, ease: ABOUT_EASE_OUT }}
              className="flex justify-start"
            >
              <Badge
                variant="modern"
                size="md"
                data-hb-node="badge"
                data-hb-edit="meet-our-expert:badgeLabel"
                className="gap-2 px-3.5 py-1.5 text-xs font-medium"
              >
                <StethoscopeIcon className="text-muted-foreground h-3.5 w-3.5" />
                <span data-hb-edit-text="">{badgeLabel}</span>
              </Badge>
            </motion.div>

            <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-10 lg:gap-12">
              <motion.div
                initial={initialFor(14)}
                animate={targetFor(14)}
                transition={{ duration: 0.42, delay: 0.05, ease: ABOUT_EASE_OUT }}
                className="md:col-span-5"
              >
                <Heading
                  as="h2"
                  size="inherit"
                  data-hb-node="heading"
                  data-hb-edit="meet-our-expert:title"
                  className="text-foreground max-w-[16ch] text-3xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]"
                >
                  {title}
                </Heading>
              </motion.div>

              <motion.div
                initial={initialFor(14)}
                animate={targetFor(14)}
                transition={{ duration: 0.44, delay: 0.09, ease: ABOUT_EASE_OUT }}
                className="md:col-span-6 md:col-start-7"
              >
                <Text
                  data-hb-node="text"
                  data-hb-edit="meet-our-expert:description"
                  className="text-muted-foreground max-w-[54ch] text-base leading-[1.65] font-normal sm:text-[17px]"
                >
                  {description}
                </Text>
              </motion.div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2 md:grid-cols-4 lg:mt-16">
              {experts.map((expert, index) => {
                const socialItems = [
                  expert.socials?.facebook
                    ? {
                        key: "facebook",
                        href: expert.socials.facebook,
                        label: `${expert.name} on Facebook`,
                        icon: <FacebookMark />,
                      }
                    : null,
                  expert.socials?.x
                    ? {
                        key: "x",
                        href: expert.socials.x,
                        label: `${expert.name} on X`,
                        icon: <XMark />,
                      }
                    : null,
                  expert.socials?.linkedin
                    ? {
                        key: "linkedin",
                        href: expert.socials.linkedin,
                        label: `${expert.name} on LinkedIn`,
                        icon: <LinkedInMark />,
                      }
                    : null,
                ].filter((item): item is NonNullable<typeof item> => item !== null);

                return (
                  <motion.article
                    key={expert.id}
                    data-hb-node="card"
                    data-hb-item={index}
                    initial={initialFor(16)}
                    animate={targetFor(16)}
                    transition={{
                      duration: 0.42,
                      delay: 0.1 + Math.min(index, 7) * 0.04,
                      ease: ABOUT_EASE_OUT,
                    }}
                    className="hb-expert-card flex flex-col"
                  >
                    <div
                      data-hb-node="media"
                      data-hb-item={index}
                      data-hb-edit={`meet-our-expert:experts.${index}.imageSrc`}
                      data-hb-edit-mode="popover"
                      className="bg-muted/40 relative aspect-[3/4] w-full overflow-hidden rounded-[20px]"
                    >
                      <img
                        src={expert.imageSrc}
                        alt={expert.imageAlt ?? `${expert.name} — ${expert.specialty}`}
                        loading="lazy"
                        className="hb-expert-photo h-full w-full object-cover object-top"
                      />

                      {socialItems.length > 0 && (
                        <>
                          <div
                            aria-hidden="true"
                            className="hb-expert-scrim pointer-events-none absolute inset-0 bg-zinc-950/32"
                          />
                          <div className="hb-expert-socials absolute inset-0 flex items-center justify-center gap-3 px-4">
                            {socialItems.map((social) => (
                              <a
                                key={social.key}
                                href={social.href}
                                aria-label={social.label}
                                onClick={(e) => {
                                  if (social.href.startsWith("#")) e.preventDefault();
                                }}
                                className="hb-expert-social-btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-md ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                              >
                                {social.icon}
                              </a>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-4 px-1 text-center">
                      <Text
                        as="h3"
                        data-hb-node="heading"
                        data-hb-item={index}
                        data-hb-edit={`meet-our-expert:experts.${index}.name`}
                        className="text-foreground text-[16px] leading-snug font-medium tracking-[-0.015em]"
                      >
                        {expert.name}
                      </Text>
                      <Text
                        data-hb-node="text"
                        data-hb-item={index}
                        data-hb-edit={`meet-our-expert:experts.${index}.specialty`}
                        className="text-muted-foreground mx-auto mt-1.5 max-w-[26ch] text-xs leading-[1.45] font-normal"
                      >
                        {expert.specialty}
                      </Text>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
