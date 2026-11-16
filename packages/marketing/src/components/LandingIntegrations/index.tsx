"use client";
import * as React from "react";
import { Badge, Grid, Card, CardBody, Heading, IconBox, Text } from "@hudbird/ui";
import { MessageSquare, Video, GitPullRequest, Layers, Calendar, FileText } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import {
  LandingFrame,
  LandingHeading,
  LandingDemoNote,
  resolveLandingGridProps,
  resolveMarketingIcon,
  useLandingAppearance,
} from "../LandingShared";
import { cn } from "../../utils/cn";

const integrationIcons = [MessageSquare, Video, GitPullRequest, Layers, Calendar, FileText];

export function LandingIntegrations({ variant, content }: LandingSectionProps<"integrations">) {
  const appearance = useLandingAppearance();
  const cardCfg = appearance?.card;
  const badgeCfg = appearance?.badgeStyle;
  const item = (entry: (typeof content.items)[number], index: number) => {
    const Icon = resolveMarketingIcon(
      entry.icon,
      integrationIcons[index % integrationIcons.length]
    );
    return (
      <Card
        key={entry.id}
        variant={cardCfg?.variant ?? "bordered"}
        radius={cardCfg?.radius ?? "lg"}
        data-hb-node="card"
        data-hb-item={index}
        className={cn(!cardCfg?.radius && "hb-radius", "shadow-2xs")}
      >
        <CardBody className="flex flex-col justify-between gap-4 p-6">
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <div
                data-hb-node="badge"
                data-hb-item={index}
                data-hb-edit={`integrations:items.${index}.icon`}
                data-hb-edit-mode="popover"
                className="inline-flex cursor-pointer rounded-xl"
              >
                <IconBox
                  size="md"
                  variant="modern"
                  icon={Icon}
                  showGlow={false}
                  aria-hidden="true"
                />
              </div>
              <Badge
                variant={badgeCfg?.variant ?? "modern"}
                color={badgeCfg?.color}
                size={badgeCfg?.size ?? "sm"}
                data-hb-node="badge"
                data-hb-item={index}
                data-hb-edit={`integrations:items.${index}.category`}
              >
                <span data-hb-edit-text="">{entry.category}</span>
              </Badge>
            </div>
            <Heading
              as="h3"
              size="h4"
              data-hb-node="heading"
              data-hb-item={index}
              data-hb-edit={`integrations:items.${index}.title`}
            >
              {entry.title}
            </Heading>
            <Text
              data-hb-node="text"
              data-hb-item={index}
              data-hb-edit={`integrations:items.${index}.description`}
              className="text-muted-foreground mt-2.5 leading-relaxed"
            >
              {entry.description}
            </Text>
          </div>
        </CardBody>
      </Card>
    );
  };
  const groups = [...new Set(content.items.map((entry) => entry.category))];
  const gridProps = resolveLandingGridProps(appearance?.grid, { cols: 3, gap: "md" });
  return (
    <LandingFrame id="integrations">
      <LandingHeading
        eyebrow="Integrations"
        title={content.title}
        description={content.description}
      />
      {variant === "grid" ? (
        <Grid {...gridProps}>{content.items.map((entry, idx) => item(entry, idx))}</Grid>
      ) : (
        <div className="space-y-12" data-hb-node="items">
          {groups.map((group) => (
            <Grid key={group} cols={2} gap="lg">
              <div>
                <Badge variant="modern" size="sm" className="mb-3" data-hb-node="badge">
                  Category
                </Badge>
                <Heading as="h3" size="h4" data-hb-node="heading">
                  {group}
                </Heading>
              </div>
              <div className="space-y-4">
                {content.items
                  .map((entry, idx) => ({ entry, idx }))
                  .filter(({ entry }) => entry.category === group)
                  .map(({ entry, idx }) => item(entry, idx))}
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
