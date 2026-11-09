"use client";
import * as React from "react";
import { Avatar, Grid, Card, CardBody, Text } from "@hudbird/ui";
import { Star } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading, LandingDemoNote } from "../LandingShared";

export function LandingTestimonials({ variant, content }: LandingSectionProps<"testimonials">) {
  const quote = (item: (typeof content.items)[number], featured = false) => (
    <figure className="m-0 flex h-full min-w-0 flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center gap-1 text-amber-400" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star key={star} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <Text
          as="blockquote"
          className={
            featured
              ? "hb-landing-quote hb-landing-title m-0 font-medium"
              : "hb-landing-title m-0 text-base leading-relaxed font-medium sm:text-lg"
          }
        >
          “{item.quote}”
        </Text>
      </div>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-zinc-200/70 pt-5 dark:border-white/[0.08]">
        <Avatar name={item.source} size="md" />
        <div className="min-w-0">
          <Text className="font-semibold">{item.source}</Text>
          <Text variant="small" className="text-muted-foreground mt-0.5">
            {item.context}
          </Text>
        </div>
      </figcaption>
    </figure>
  );
  return (
    <LandingFrame id="testimonials">
      <LandingHeading
        eyebrow="Testimonials"
        title={content.title}
        description={content.description}
      />
      {variant === "featured" ? (
        <Grid cols={2} gap="xl" align="start">
          {content.items[0] && (
            <Card variant="bordered" radius="lg" className="hb-radius shadow-2xs">
              <CardBody className="p-7 sm:p-9">{quote(content.items[0], true)}</CardBody>
            </Card>
          )}
          <div className="space-y-6">
            {content.items.slice(1).map((item) => (
              <Card key={item.id} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
                <CardBody className="p-6">{quote(item)}</CardBody>
              </Card>
            ))}
          </div>
        </Grid>
      ) : (
        <Grid cols={3} gap="md">
          {content.items.map((item) => (
            <Card key={item.id} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
              <CardBody className="p-6 sm:p-7">{quote(item)}</CardBody>
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
