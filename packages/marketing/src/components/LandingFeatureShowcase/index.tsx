"use client";
import * as React from "react";
import {
  Grid,
  Heading,
  IconBox,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Accordion,
  AccordionItem,
} from "@hudbird/ui";
import { LayoutDashboard, ListChecks, FileText } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingHeading, LandingCheckItem, LandingDemoNote } from "../LandingShared";

const featureIcons = [LayoutDashboard, ListChecks, FileText];
const featureBullets: Record<number, string[]> = {
  0: [
    "Keep brief, priority, and active status in one shared view",
    "Spot blockers early without switching across tools",
  ],
  1: [
    "Turn high-level goals into clear next steps for the team",
    "Track review milestones with lightweight context",
  ],
  2: [
    "Attach meeting decisions directly to the work item",
    "Preserve readable history as the project evolves",
  ],
};

export function LandingFeatureShowcase({ variant, content }: LandingSectionProps<"features">) {
  const [selected, setSelected] = React.useState(content.items[0]?.id ?? "");
  const active = content.items.find((item) => item.id === selected) ?? content.items[0];
  if (!active) return null;
  return (
    <LandingFrame id="features">
      <LandingHeading eyebrow="Features" title={content.title} description={content.description} />
      {variant === "tabs" ? (
        <Tabs selectedKey={active.id} onSelectionChange={setSelected} variant="solid" size="lg">
          <TabList
            aria-label="Product features"
            className="mb-10 w-fit max-w-full flex-wrap self-start"
          >
            {content.items.map((item) => (
              <Tab key={item.id} tabKey={item.id} className="px-4">
                {item.title}
              </Tab>
            ))}
          </TabList>
          {content.items.map((item, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            const bullets = featureBullets[index % 3] ?? featureBullets[0];
            return (
              <TabPanel key={item.id} tabKey={item.id}>
                <Grid cols={2} gap="xl" align="center">
                  <div>
                    <IconBox
                      size="md"
                      variant="double-ring"
                      icon={Icon}
                      showGlow={false}
                      className="mb-5"
                      aria-hidden="true"
                    />
                    <Heading as="h3" size="h3">
                      {item.title}
                    </Heading>
                    <Text className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                      {item.description}
                    </Text>
                    <ul className="hb-landing-list mt-6 space-y-3">
                      {bullets.map((bullet) => (
                        <LandingCheckItem key={bullet}>{bullet}</LandingCheckItem>
                      ))}
                    </ul>
                  </div>
                  <HeroImageView image={item.image} priority={false} />
                </Grid>
              </TabPanel>
            );
          })}
        </Tabs>
      ) : variant === "accordion" ? (
        <Grid cols={2} gap="xl" align="start">
          <Accordion
            selectedKeys={[active.id]}
            onSelectionChange={(keys) => {
              if (keys[0]) setSelected(keys[0]);
            }}
          >
            {content.items.map((item) => (
              <AccordionItem
                key={item.id}
                itemKey={item.id}
                title={item.title}
                classNames={{ title: "whitespace-normal overflow-visible text-clip" }}
              >
                {item.description}
              </AccordionItem>
            ))}
          </Accordion>
          <div aria-live="polite">
            <HeroImageView image={active.image} priority={false} />
          </div>
        </Grid>
      ) : (
        <div className="space-y-16 sm:space-y-24">
          {content.items.map((item, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            const bullets = featureBullets[index % 3] ?? featureBullets[0];
            return (
              <Grid key={item.id} cols={2} gap="xl" align="center">
                <div className={index % 2 ? "md:order-2" : undefined}>
                  <IconBox
                    size="md"
                    variant="double-ring"
                    icon={Icon}
                    showGlow={false}
                    className="mb-5"
                    aria-hidden="true"
                  />
                  <Heading as="h3" size="h3">
                    {item.title}
                  </Heading>
                  <Text className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                    {item.description}
                  </Text>
                  <ul className="hb-landing-list mt-6 space-y-3">
                    {bullets.map((bullet) => (
                      <LandingCheckItem key={bullet}>{bullet}</LandingCheckItem>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 ? "md:order-1" : undefined}>
                  <HeroImageView image={item.image} priority={false} />
                </div>
              </Grid>
            );
          })}
        </div>
      )}
      <LandingDemoNote>
        Sample product views. The feature controls change local preview content.
      </LandingDemoNote>
    </LandingFrame>
  );
}
