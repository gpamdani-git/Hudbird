"use client";
import * as React from "react";
import {
  Badge,
  Grid,
  Card,
  CardBody,
  Heading,
  IconBox,
  Text,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hudbird/ui";
import { Zap, Layers, Building2 } from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import {
  LandingFrame,
  LandingHeading,
  LandingCheckItem,
  LandingActionButton,
  LandingDemoNote,
} from "../LandingShared";

const planIcons = [Zap, Layers, Building2];

export function LandingPricing({ variant, content }: LandingSectionProps<"pricing">) {
  return (
    <LandingFrame id="pricing">
      <LandingHeading eyebrow="Pricing" title={content.title} description={content.description} />
      {variant === "cards" ? (
        <Grid cols={3} gap="md">
          {content.plans.map((plan, idx) => {
            const isPopular = idx === 1;
            const Icon = planIcons[idx % planIcons.length];
            return (
              <Card
                key={plan.id}
                variant="bordered"
                radius="lg"
                className={`hb-radius ${
                  isPopular
                    ? "shadow-lg ring-2 ring-[var(--hb-accent)]/35 dark:ring-[var(--hb-accent)]/45"
                    : "shadow-2xs"
                }`}
              >
                <CardBody className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <IconBox
                        size="md"
                        variant={isPopular ? "double-ring" : "modern"}
                        icon={Icon}
                        showGlow={false}
                        aria-hidden="true"
                      />
                      {isPopular && (
                        <Badge variant="modern" size="sm">
                          Most popular
                        </Badge>
                      )}
                    </div>
                    <div>
                      <Heading as="h3" size="h4">
                        {plan.name}
                      </Heading>
                      <Text className="text-muted-foreground mt-1.5 text-sm">
                        {plan.description}
                      </Text>
                    </div>
                    <div className="border-y border-zinc-200/70 py-5 dark:border-white/[0.08]">
                      <Text className="hb-landing-title text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                        {plan.price}
                        <span className="text-muted-foreground ml-1.5 text-sm font-medium tracking-normal">
                          {plan.period}
                        </span>
                      </Text>
                    </div>
                    <div className="space-y-3 pt-1">
                      <Text
                        variant="small"
                        className="font-semibold tracking-wider uppercase opacity-75"
                      >
                        Included features
                      </Text>
                      <ul className="hb-landing-list space-y-3">
                        {plan.features.map((feature) => (
                          <LandingCheckItem key={feature}>{feature}</LandingCheckItem>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-2">
                    <LandingActionButton action={plan.action} secondary={!isPopular} fullWidth />
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </Grid>
      ) : variant === "highlight" ? (
        <Grid cols={2} gap="xl" align="start">
          {content.plans[1] && (
            <Card
              variant="bordered"
              radius="lg"
              className="hb-radius shadow-lg ring-2 ring-[var(--hb-accent)]/35"
            >
              <CardBody className="flex flex-col gap-6 p-7 sm:p-9">
                <div className="flex items-center justify-between gap-2">
                  <IconBox
                    size="md"
                    variant="double-ring"
                    icon={Layers}
                    showGlow={false}
                    aria-hidden="true"
                  />
                  <Badge variant="modern" size="sm">
                    Recommended Plan
                  </Badge>
                </div>
                <div>
                  <Heading as="h3" size="h3">
                    {content.plans[1].name}
                  </Heading>
                  <Text className="text-muted-foreground mt-2">{content.plans[1].description}</Text>
                </div>
                <Text className="hb-landing-title text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                  {content.plans[1].price}
                  <span className="text-muted-foreground ml-2 text-base font-normal">
                    {content.plans[1].period}
                  </span>
                </Text>
                <ul className="hb-landing-list space-y-3 border-t border-zinc-200/70 pt-5 dark:border-white/[0.08]">
                  {content.plans[1].features.map((feature) => (
                    <LandingCheckItem key={feature}>{feature}</LandingCheckItem>
                  ))}
                </ul>
                <LandingActionButton action={content.plans[1].action} fullWidth />
              </CardBody>
            </Card>
          )}
          <div className="space-y-4">
            {content.plans
              .filter((_, idx) => idx !== 1)
              .map((plan, idx) => {
                const Icon = idx === 0 ? Zap : Building2;
                return (
                  <Card
                    key={plan.id}
                    variant="bordered"
                    radius="lg"
                    className="hb-radius shadow-2xs"
                  >
                    <CardBody className="space-y-4 p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <IconBox
                            size="sm"
                            variant="modern"
                            icon={Icon}
                            showGlow={false}
                            aria-hidden="true"
                          />
                          <Heading as="h3" size="h4">
                            {plan.name}
                          </Heading>
                        </div>
                        <Text className="hb-landing-title text-2xl font-semibold tabular-nums">
                          {plan.price}{" "}
                          <span className="text-muted-foreground text-xs font-normal">
                            {plan.period}
                          </span>
                        </Text>
                      </div>
                      <Text className="text-muted-foreground">{plan.description}</Text>
                      <LandingActionButton action={plan.action} secondary />
                    </CardBody>
                  </Card>
                );
              })}
          </div>
        </Grid>
      ) : (
        <>
          <Text variant="small" className="mb-4">
            Scroll horizontally on smaller screens to compare all plans.
          </Text>
          <Table
            density="relaxed"
            className="min-w-[640px]"
            wrapperClassName="max-w-full overflow-x-auto rounded-2xl border border-zinc-200/80 dark:border-white/[0.08]"
            aria-label="Compare demo plans"
            wrapperProps={{
              tabIndex: 0,
              role: "region",
              "aria-label": "Plan comparison, horizontally scrollable",
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Included</TableHead>
                {content.plans.map((plan, idx) => (
                  <TableHead key={plan.id} scope="col">
                    <div className="flex items-center gap-2">
                      <Text className="font-semibold">{plan.name}</Text>
                      {idx === 1 && (
                        <Badge variant="modern" size="sm">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <Text className="mt-1 font-semibold tabular-nums">
                      {plan.price} {plan.period}
                    </Text>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.comparisons.map((row) => (
                <TableRow key={row.label}>
                  <TableHead scope="row">{row.label}</TableHead>
                  {content.plans.map((plan, index) => (
                    <TableCell key={plan.id}>{row.values[index] ?? "Not included"}</TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableHead scope="row">Next step</TableHead>
                {content.plans.map((plan, idx) => (
                  <TableCell key={plan.id}>
                    <LandingActionButton action={plan.action} secondary={idx !== 1} />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
      <LandingDemoNote>
        Example prices in USD. No purchase, subscription, or billing service is connected.
      </LandingDemoNote>
    </LandingFrame>
  );
}
