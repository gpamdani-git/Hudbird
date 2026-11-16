"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container, Heading, Section, Text } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "./shared";
import "./about-us-section.css";

export interface OurTeamSectionProps {
  id?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const DEFAULT_TEAM_IMAGE =
  "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1600";

export function OurTeamSection({
  id = "our-team",
  title = "Our Team",
  description = "Our engineering and design systems team builds every component with strict accessibility, predictable motion, and clean TypeScript ergonomics—working together to help product teams ship faster.",
  imageSrc = DEFAULT_TEAM_IMAGE,
  imageAlt = "Hudbird UI software engineering and design systems team collaborating",
  className,
}: OurTeamSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const revealed = useSafeSectionReveal(sectionRef);
  const prefersReducedMotion = useReducedMotion();

  const initialFor = (yOffset: number, scale = 1) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset, scale };

  const targetFor = (yOffset: number, scale = 1) =>
    prefersReducedMotion || revealed
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: yOffset, scale };

  return (
    <div ref={sectionRef} data-landing-section="our-team" className="w-full">
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
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-10 lg:gap-12">
              <motion.div
                initial={initialFor(14)}
                animate={targetFor(14)}
                transition={{ duration: 0.42, ease: ABOUT_EASE_OUT }}
                className="md:col-span-5"
              >
                <Heading
                  as="h2"
                  size="inherit"
                  data-hb-node="heading"
                  data-hb-edit="our-team:title"
                  className="text-foreground text-3xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]"
                >
                  {title}
                </Heading>
              </motion.div>

              <motion.div
                initial={initialFor(14)}
                animate={targetFor(14)}
                transition={{ duration: 0.44, delay: 0.06, ease: ABOUT_EASE_OUT }}
                className="md:col-span-6 md:col-start-7"
              >
                <Text
                  data-hb-node="text"
                  data-hb-edit="our-team:description"
                  className="text-muted-foreground max-w-[54ch] text-base leading-[1.65] font-normal sm:text-[17px]"
                >
                  {description}
                </Text>
              </motion.div>
            </div>

            <motion.div
              initial={initialFor(18, 0.985)}
              animate={targetFor(18, 0.985)}
              transition={{ duration: 0.52, delay: 0.12, ease: ABOUT_EASE_OUT }}
              data-hb-node="media"
              data-hb-edit="our-team:imageSrc"
              data-hb-edit-mode="popover"
              className="hb-team-media bg-muted/40 mt-10 aspect-[16/9] w-full overflow-hidden rounded-[22px] sm:mt-12 sm:rounded-[26px] lg:mt-14"
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                className="hb-team-photo h-full w-full object-cover object-center"
              />
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
