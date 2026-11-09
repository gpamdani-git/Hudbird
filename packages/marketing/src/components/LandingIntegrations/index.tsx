"use client";
import * as React from "react";
import { Badge, Grid, Card, CardBody, Heading, IconBox, Text } from "@hudbird/ui";
import { MessageSquare, Video, GitPullRequest, Layers, Calendar, FileText } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading, LandingDemoNote } from "../LandingShared";

const integrationIcons = [MessageSquare, Video, GitPullRequest, Layers, Calendar, FileText];

export function LandingIntegrations({ variant, content }: LandingSectionProps<"integrations">) {
  const item = (entry: (typeof content.items)[number], index: number) => {
    const Icon = integrationIcons[index % integrationIcons.length];
    return (
      <Card key={entry.id} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
        <CardBody className="flex flex-col justify-between gap-4 p-6">
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <IconBox size="md" variant="modern" icon={Icon} showGlow={false} aria-hidden="true" />
              <Badge variant="modern" size="sm">
                {entry.category}
              </Badge>
            </div>
            <Heading as="h3" size="h4">
              {entry.title}
            </Heading>
            <Text className="text-muted-foreground mt-2.5 leading-relaxed">
              {entry.description}
            </Text>
          </div>
        </CardBody>
      </Card>
    );
  };
  const groups = [...new Set(content.items.map((entry) => entry.category))];
  return (
    <LandingFrame id="integrations">
      <LandingHeading
        eyebrow="Integrations"
        title={content.title}
        description={content.description}
      />
      {variant === "grid" ? (
        <Grid cols={3} gap="md">
          {content.items.map((entry, idx) => item(entry, idx))}
        </Grid>
      ) : (
        <div className="space-y-12">
          {groups.map((group) => (
            <Grid key={group} cols={2} gap="lg">
              <div>
                <Badge variant="modern" size="sm" className="mb-3">
                  Category
                </Badge>
                <Heading as="h3" size="h4">
                  {group}
                </Heading>
              </div>
              <div className="space-y-4">
                {content.items
                  .filter((entry) => entry.category === group)
                  .map((entry, idx) => item(entry, idx))}
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
