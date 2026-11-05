"use client";
import * as React from "react";
import {
  Grid,
  Card,
  CardBody,
  Heading,
  Text,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import {
  LandingFrame,
  LandingHeading,
  LandingActionButton,
  LandingDemoNote,
} from "../LandingShared";

export function LandingPricing({ variant, content }: LandingSectionProps<"pricing">) {
  return (
    <LandingFrame id="pricing">
      <LandingHeading title={content.title} description={content.description} />
      {variant === "cards" ? (
        <Grid cols={3} gap="md">
          {content.plans.map((plan) => (
            <Card key={plan.id} variant="bordered" radius="none" className="hb-radius shadow-none">
              <CardBody className="flex flex-col gap-5 p-6 sm:p-8">
                <Heading as="h3" size="h4">
                  {plan.name}
                </Heading>
                <Text className="text-muted-foreground">{plan.description}</Text>
                <Text className="hb-landing-title text-3xl font-medium tabular-nums">
                  {plan.price}
                  <span className="ml-2 text-sm font-normal">{plan.period}</span>
                </Text>
                <ul className="hb-landing-list flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="border-border border-t pt-3 text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
                <LandingActionButton action={plan.action} secondary />
              </CardBody>
            </Card>
          ))}
        </Grid>
      ) : (
        <>
          <Text variant="small" className="mb-4">
            Scroll horizontally on smaller screens to compare all plans.
          </Text>
          <Table
            density="relaxed"
            wrapperClassName="max-w-full overflow-x-auto"
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
                {content.plans.map((plan) => (
                  <TableHead key={plan.id} scope="col">
                    <Text className="font-medium">{plan.name}</Text>
                    <Text className="tabular-nums">
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
                {content.plans.map((plan) => (
                  <TableCell key={plan.id}>
                    <LandingActionButton action={plan.action} secondary />
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
