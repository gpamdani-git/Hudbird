"use client";
import * as React from "react";
import {
  Grid,
  Heading,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Accordion,
  AccordionItem,
} from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingHeading, LandingDemoNote } from "../LandingShared";

export function LandingFeatureShowcase({ variant, content }: LandingSectionProps<"features">) {
  const [selected, setSelected] = React.useState(content.items[0]?.id ?? "");
  const active = content.items.find((item) => item.id === selected) ?? content.items[0];
  if (!active) return null;
  return (
    <LandingFrame id="features">
      <LandingHeading title={content.title} description={content.description} />
      {variant === "tabs" ? (
        <Tabs selectedKey={active.id} onSelectionChange={setSelected} variant="solid" size="lg">
          <TabList
            aria-label="Product features"
            className="mb-8 w-fit max-w-full flex-wrap self-start"
          >
            {content.items.map((item) => (
              <Tab key={item.id} tabKey={item.id} className="px-4">
                {item.title}
              </Tab>
            ))}
          </TabList>
          {content.items.map((item) => (
            <TabPanel key={item.id} tabKey={item.id}>
              <Grid cols={2} gap="xl" align="center">
                <div>
                  <Heading as="h3" size="h3">
                    {item.title}
                  </Heading>
                  <Text className="text-muted-foreground mt-4 leading-relaxed">
                    {item.description}
                  </Text>
                </div>
                <HeroImageView image={item.image} priority={false} />
              </Grid>
            </TabPanel>
          ))}
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
        <div className="space-y-16">
          {content.items.map((item, index) => (
            <Grid key={item.id} cols={2} gap="xl" align="center">
              <div className={index % 2 ? "md:order-2" : undefined}>
                <Heading as="h3" size="h3">
                  {item.title}
                </Heading>
                <Text className="text-muted-foreground mt-4 leading-relaxed">
                  {item.description}
                </Text>
              </div>
              <div className={index % 2 ? "md:order-1" : undefined}>
                <HeroImageView image={item.image} priority={false} />
              </div>
            </Grid>
          ))}
        </div>
      )}
      <LandingDemoNote>
        Sample product views. The feature controls change local preview content.
      </LandingDemoNote>
    </LandingFrame>
  );
}
