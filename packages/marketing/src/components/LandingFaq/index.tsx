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
          <LandingHeading
            eyebrow="Support & FAQ"
            title={content.title}
            description={content.description}
          />
          {list(content.items)}
        </Grid>
      ) : variant === "columns" ? (
        <>
          <LandingHeading
            eyebrow="Support & FAQ"
            title={content.title}
            description={content.description}
          />
          <Grid cols={2} gap="lg">
            {content.items.map((item) => (
              <Card key={item.id} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
                <CardBody className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <IconBox
                      size="sm"
                      variant="modern"
                      icon={HelpCircle}
                      showGlow={false}
                      aria-hidden="true"
                    />
                    <Badge variant="modern" size="sm">
                      {item.group}
                    </Badge>
                  </div>
                  <Heading as="h3" size="h4">
                    {item.question}
                  </Heading>
                  <Text className="text-muted-foreground leading-relaxed">{item.answer}</Text>
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
                  <Badge variant="modern" size="sm" className="mb-3">
                    Topic
                  </Badge>
                  <Heading as="h3" size="h4">
                    {group}
                  </Heading>
                </div>
                {list(content.items.filter((item) => item.group === group))}
              </Grid>
            ))}
          </div>
        </>
      )}
    </LandingFrame>
  );
}
