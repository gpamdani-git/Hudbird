"use client";
import * as React from "react";
import {
  Badge,
  Card,
  CardBody,
  Grid,
  Accordion,
  AccordionItem,
  Heading,
  IconBox,
  Text,
} from "@hudbird/ui";
import { HelpCircle } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import {
  LandingFrame,
  LandingHeading,
  resolveLandingGridProps,
  useLandingAppearance,
} from "../LandingShared";
import { cn } from "../../utils/cn";

export function LandingFaq({ variant, content }: LandingSectionProps<"faq">) {
  const appearance = useLandingAppearance();
  const cardCfg = appearance?.card;
  const badgeCfg = appearance?.badgeStyle;
  const columnsGridProps = resolveLandingGridProps(appearance?.grid, { cols: 2, gap: "lg" });
  const indexedItems = content.items.map((item, idx) => ({ item, idx }));
  const list = (items: Array<{ item: (typeof content.items)[number]; idx: number }>) => (
    <Accordion data-hb-node="items">
      {items.map(({ item, idx }) => (
        <AccordionItem
          key={item.id}
          itemKey={item.id}
          title={
            <span
              data-hb-node="heading"
              data-hb-item={idx}
              data-hb-edit={`faq:items.${idx}.question`}
              data-hb-edit-text=""
            >
              {item.question}
            </span>
          }
          data-hb-node="items"
          data-hb-item={idx}
          classNames={{ title: "whitespace-normal overflow-visible text-clip" }}
        >
          <Text data-hb-node="text" data-hb-item={idx} data-hb-edit={`faq:items.${idx}.answer`}>
            {item.answer}
          </Text>
        </AccordionItem>
      ))}
    </Accordion>
  );
  return (
    <LandingFrame id="faq">
      {variant === "single" ? (
        <Grid cols={2} gap="xl">
          <LandingHeading
            eyebrow="Support & FAQ"
            title={content.title}
            description={content.description}
          />
          {list(indexedItems)}
        </Grid>
      ) : variant === "columns" ? (
        <>
          <LandingHeading
            eyebrow="Support & FAQ"
            title={content.title}
            description={content.description}
          />
          <Grid {...columnsGridProps}>
            {content.items.map((item, idx) => (
              <Card
                key={item.id}
                variant={cardCfg?.variant ?? "bordered"}
                radius={cardCfg?.radius ?? "lg"}
                data-hb-node="card"
                data-hb-item={idx}
                className={cn(!cardCfg?.radius && "hb-radius", "shadow-2xs")}
              >
                <CardBody className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <IconBox
                      size="sm"
                      variant="modern"
                      icon={HelpCircle}
                      showGlow={false}
                      aria-hidden="true"
                    />
                    <Badge
                      variant={badgeCfg?.variant ?? "modern"}
                      color={badgeCfg?.color}
                      size={badgeCfg?.size ?? "sm"}
                      data-hb-node="badge"
                      data-hb-item={idx}
                      data-hb-edit={`faq:items.${idx}.group`}
                    >
                      <span data-hb-edit-text="">{item.group}</span>
                    </Badge>
                  </div>
                  <Heading
                    as="h3"
                    size="h4"
                    data-hb-node="heading"
                    data-hb-item={idx}
                    data-hb-edit={`faq:items.${idx}.question`}
                  >
                    {item.question}
                  </Heading>
                  <Text
                    data-hb-node="text"
                    data-hb-item={idx}
                    data-hb-edit={`faq:items.${idx}.answer`}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {item.answer}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <LandingHeading
            eyebrow="Support & FAQ"
            title={content.title}
            description={content.description}
          />
          <div className="space-y-12">
            {[...new Set(content.items.map((item) => item.group))].map((group) => (
              <Grid key={group} cols={2} gap="xl">
                <div>
                  <Badge variant="modern" size="sm" className="mb-3" data-hb-node="badge">
                    Topic
                  </Badge>
                  <Heading as="h3" size="h4" data-hb-node="heading">
                    {group}
                  </Heading>
                </div>
                {list(indexedItems.filter(({ item }) => item.group === group))}
              </Grid>
            ))}
          </div>
        </>
      )}
    </LandingFrame>
  );
}
