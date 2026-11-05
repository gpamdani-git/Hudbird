"use client";
import * as React from "react";
import { Grid, Card, CardBody, Heading, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading, LandingDemoNote } from "../LandingShared";

export function LandingIntegrations({ variant, content }: LandingSectionProps<"integrations">) {
  const item = (entry: (typeof content.items)[number]) => (
    <Card key={entry.id} variant="bordered" radius="none" className="hb-radius shadow-none">
      <CardBody>
        <Heading as="h3" size="h4">
          {entry.title}
        </Heading>
        <Text className="text-muted-foreground mt-3 leading-relaxed">{entry.description}</Text>
      </CardBody>
    </Card>
  );
  const groups = [...new Set(content.items.map((entry) => entry.category))];
  return (
    <LandingFrame id="integrations">
      <LandingHeading title={content.title} description={content.description} />
      {variant === "grid" ? (
        <Grid cols={3} gap="md">
          {content.items.map(item)}
        </Grid>
      ) : (
        <div className="space-y-10">
          {groups.map((group) => (
            <Grid key={group} cols={2} gap="lg">
              <Heading as="h3" size="h4">
                {group}
              </Heading>
              <div className="space-y-4">
                {content.items.filter((entry) => entry.category === group).map(item)}
              </div>
            </Grid>
          ))}
        </div>
      )}
      <LandingDemoNote>
        Integration concepts only. No external service is connected.
      </LandingDemoNote>
    </LandingFrame>
  );
}
