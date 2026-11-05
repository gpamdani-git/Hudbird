"use client";
import * as React from "react";
import { Grid, Card, CardBody, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading, LandingDemoNote } from "../LandingShared";

export function LandingTestimonials({ variant, content }: LandingSectionProps<"testimonials">) {
  const quote = (item: (typeof content.items)[number], featured = false) => (
    <figure className="m-0 min-w-0">
      <Text
        as="blockquote"
        className={
          featured
            ? "hb-landing-quote hb-landing-title m-0"
            : "hb-landing-title m-0 text-lg leading-relaxed"
        }
      >
        “{item.quote}”
      </Text>
      <figcaption className="mt-6">
        <Text className="font-medium">{item.source}</Text>
        <Text variant="small" className="text-muted-foreground mt-1">
          {item.context}
        </Text>
      </figcaption>
    </figure>
  );
  return (
    <LandingFrame id="testimonials">
      <LandingHeading title={content.title} description={content.description} />
      {variant === "featured" ? (
        <Grid cols={2} gap="xl" align="start">
          {content.items[0] && quote(content.items[0], true)}
          <div className="space-y-10">
            {content.items.slice(1).map((item) => (
              <div key={item.id} className="border-border border-t pt-6">
                {quote(item)}
              </div>
            ))}
          </div>
        </Grid>
      ) : (
        <Grid cols={3} gap="md">
          {content.items.map((item) => (
            <Card key={item.id} variant="bordered" radius="none" className="hb-radius shadow-none">
              <CardBody>{quote(item)}</CardBody>
            </Card>
          ))}
        </Grid>
      )}
      <LandingDemoNote>
        Quotation placeholders, not customer endorsements. Replace with verified feedback.
      </LandingDemoNote>
    </LandingFrame>
  );
}
