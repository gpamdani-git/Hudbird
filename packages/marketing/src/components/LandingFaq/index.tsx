"use client";
import * as React from "react";
import { Grid, Accordion, AccordionItem, Heading, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading } from "../LandingShared";

export function LandingFaq({ variant, content }: LandingSectionProps<"faq">) {
  const list = (items: typeof content.items) => (
    <Accordion>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          itemKey={item.id}
          title={item.question}
          classNames={{ title: "whitespace-normal overflow-visible text-clip" }}
        >
          <Text>{item.answer}</Text>
        </AccordionItem>
      ))}
    </Accordion>
  );
  return (
    <LandingFrame id="faq">
      {variant === "single" ? (
        <Grid cols={2} gap="xl">
          <LandingHeading title={content.title} description={content.description} />
          {list(content.items)}
        </Grid>
      ) : (
        <>
          <LandingHeading title={content.title} description={content.description} />
          <div className="space-y-10">
            {[...new Set(content.items.map((item) => item.group))].map((group) => (
              <Grid key={group} cols={2} gap="xl">
                <Heading as="h3" size="h4">
                  {group}
                </Heading>
                {list(content.items.filter((item) => item.group === group))}
              </Grid>
            ))}
          </div>
        </>
      )}
    </LandingFrame>
  );
}
