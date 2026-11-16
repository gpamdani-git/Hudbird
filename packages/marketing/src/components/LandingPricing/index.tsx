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
  resolveLandingGridProps,
  resolveMarketingIcon,
  useLandingAppearance,
} from "../LandingShared";
import { cn } from "../../utils/cn";

const planIcons = [Zap, Layers, Building2];

export function LandingPricing({ variant, content }: LandingSectionProps<"pricing">) {
  const appearance = useLandingAppearance();
  const cardCfg = appearance?.card;
  const badgeCfg = appearance?.badgeStyle;
  const cardsGridProps = resolveLandingGridProps(appearance?.grid, { cols: 3, gap: "md" });
  const highlightGridProps = resolveLandingGridProps(appearance?.grid, {
    cols: 2,
    gap: "xl",
    align: "start",
  });
  return (
    <LandingFrame id="pricing">
      <LandingHeading eyebrow="Pricing" title={content.title} description={content.description} />
      {variant === "cards" ? (
        <Grid {...cardsGridProps}>
          {content.plans.map((plan, idx) => {
            const isPopular = idx === 1;
            const Icon = resolveMarketingIcon(plan.icon, planIcons[idx % planIcons.length]);
            return (
              <Card
                key={plan.id}
                variant={cardCfg?.variant ?? "bordered"}
                radius={cardCfg?.radius ?? "lg"}
                data-hb-node="card"
                data-hb-item={idx}
                className={cn(
                  !cardCfg?.radius && "hb-radius",
                  isPopular
                    ? "shadow-lg ring-2 ring-[var(--hb-accent)]/35 dark:ring-[var(--hb-accent)]/45"
                    : "shadow-2xs"
                )}
              >
                <CardBody className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div
                        data-hb-node="badge"
                        data-hb-item={idx}
                        data-hb-edit={`pricing:plans.${idx}.icon`}
                        data-hb-edit-mode="popover"
                        className="inline-flex cursor-pointer rounded-xl"
                      >
                        <IconBox
                          size="md"
                          variant={isPopular ? "double-ring" : "modern"}
                          icon={Icon}
                          showGlow={false}
                          aria-hidden="true"
                        />
                      </div>
                      {(isPopular || plan.badge) && (
                        <Badge
                          variant={badgeCfg?.variant ?? "modern"}
                          color={badgeCfg?.color}
                          size={badgeCfg?.size ?? "sm"}
                          data-hb-node="badge"
                          data-hb-item={idx}
                          data-hb-edit={`pricing:plans.${idx}.badge`}
                        >
                          <span data-hb-edit-text="">{plan.badge || "Most popular"}</span>
                        </Badge>
                      )}
                    </div>
                    <div>
                      <Heading
                        as="h3"
                        size="h4"
                        data-hb-node="heading"
                        data-hb-item={idx}
                        data-hb-edit={`pricing:plans.${idx}.name`}
                      >
                        {plan.name}
                      </Heading>
                      <Text
                        data-hb-node="text"
                        data-hb-item={idx}
                        data-hb-edit={`pricing:plans.${idx}.description`}
                        className="text-muted-foreground mt-1.5 text-sm"
                      >
                        {plan.description}
                      </Text>
                    </div>
                    <div className="border-y border-zinc-200/70 py-5 dark:border-white/[0.08]">
                      <Text className="hb-landing-title text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                        <span
                          data-hb-node="text"
                          data-hb-item={idx}
                          data-hb-edit={`pricing:plans.${idx}.price`}
                        >
                          {plan.price}
                        </span>
                        <span
                          data-hb-node="text"
                          data-hb-item={idx}
                          data-hb-edit={`pricing:plans.${idx}.period`}
                          className="text-muted-foreground ml-1.5 text-sm font-medium tracking-normal"
                        >
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
                        {plan.features.map((feature, featureIdx) => (
                          <LandingCheckItem key={featureIdx}>
                            <span
                              data-hb-node="items"
                              data-hb-item={idx}
                              data-hb-edit={`pricing:plans.${idx}.features.${featureIdx}`}
                            >
                              {feature}
                            </span>
                          </LandingCheckItem>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-2" data-hb-item={idx}>
                    <LandingActionButton
                      action={plan.action}
                      secondary={!isPopular}
                      fullWidth
                      editField={`pricing:plans.${idx}.action.label`}
                    />
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </Grid>
      ) : variant === "highlight" ? (
        <Grid {...highlightGridProps}>
          {content.plans[1] && (
            <Card
              variant={cardCfg?.variant ?? "bordered"}
              radius={cardCfg?.radius ?? "lg"}
              data-hb-node="card"
              data-hb-item={1}
              className={cn(
                !cardCfg?.radius && "hb-radius",
                "shadow-lg ring-2 ring-[var(--hb-accent)]/35"
              )}
            >
              <CardBody className="flex flex-col gap-6 p-7 sm:p-9">
                <div className="flex items-center justify-between gap-2">
                  <div
                    data-hb-node="badge"
                    data-hb-item={1}
                    data-hb-edit="pricing:plans.1.icon"
                    data-hb-edit-mode="popover"
                    className="inline-flex cursor-pointer rounded-xl"
                  >
                    <IconBox
                      size="md"
                      variant="double-ring"
                      icon={resolveMarketingIcon(content.plans[1]?.icon, Layers)}
                      showGlow={false}
                      aria-hidden="true"
                    />
                  </div>
                  <Badge
                    variant={badgeCfg?.variant ?? "modern"}
                    color={badgeCfg?.color}
                    size={badgeCfg?.size ?? "sm"}
                    data-hb-node="badge"
                    data-hb-item={1}
                    data-hb-edit="pricing:plans.1.badge"
                  >
                    <span data-hb-edit-text="">
                      {content.plans[1]?.badge || "Recommended Plan"}
                    </span>
                  </Badge>
                </div>
                <div>
                  <Heading
                    as="h3"
                    size="h3"
                    data-hb-node="heading"
                    data-hb-item={1}
                    data-hb-edit="pricing:plans.1.name"
                  >
                    {content.plans[1].name}
                  </Heading>
                  <Text
                    data-hb-node="text"
                    data-hb-item={1}
                    data-hb-edit="pricing:plans.1.description"
                    className="text-muted-foreground mt-2"
                  >
                    {content.plans[1].description}
                  </Text>
                </div>
                <Text className="hb-landing-title text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                  <span data-hb-node="text" data-hb-item={1} data-hb-edit="pricing:plans.1.price">
                    {content.plans[1].price}
                  </span>
                  <span
                    data-hb-node="text"
                    data-hb-item={1}
                    data-hb-edit="pricing:plans.1.period"
                    className="text-muted-foreground ml-2 text-base font-normal"
                  >
                    {content.plans[1].period}
                  </span>
                </Text>
                <ul className="hb-landing-list space-y-3 border-t border-zinc-200/70 pt-5 dark:border-white/[0.08]">
                  {content.plans[1].features.map((feature, featureIdx) => (
                    <LandingCheckItem key={featureIdx}>
                      <span
                        data-hb-node="items"
                        data-hb-item={1}
                        data-hb-edit={`pricing:plans.1.features.${featureIdx}`}
                      >
                        {feature}
                      </span>
                    </LandingCheckItem>
                  ))}
                </ul>
                <div data-hb-item={1}>
                  <LandingActionButton
                    action={content.plans[1].action}
                    fullWidth
                    editField="pricing:plans.1.action.label"
                  />
                </div>
              </CardBody>
            </Card>
          )}
          <div className="space-y-4">
            {content.plans
              .map((plan, planIdx) => ({ plan, planIdx }))
              .filter(({ planIdx }) => planIdx !== 1)
              .map(({ plan, planIdx }, idx) => {
                const Icon = resolveMarketingIcon(plan.icon, idx === 0 ? Zap : Building2);
                return (
                  <Card
                    key={plan.id}
                    variant={cardCfg?.variant ?? "bordered"}
                    radius={cardCfg?.radius ?? "lg"}
                    data-hb-node="card"
                    data-hb-item={planIdx}
                    className={cn(!cardCfg?.radius && "hb-radius", "shadow-2xs")}
                  >
                    <CardBody className="space-y-4 p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            data-hb-node="badge"
                            data-hb-item={planIdx}
                            data-hb-edit={`pricing:plans.${planIdx}.icon`}
                            data-hb-edit-mode="popover"
                            className="inline-flex cursor-pointer rounded-xl"
                          >
                            <IconBox
                              size="sm"
                              variant="modern"
                              icon={Icon}
                              showGlow={false}
                              aria-hidden="true"
                            />
                          </div>
                          <Heading
                            as="h3"
                            size="h4"
                            data-hb-node="heading"
                            data-hb-item={planIdx}
                            data-hb-edit={`pricing:plans.${planIdx}.name`}
                          >
                            {plan.name}
                          </Heading>
                        </div>
                        <Text className="hb-landing-title text-2xl font-semibold tabular-nums">
                          <span
                            data-hb-node="text"
                            data-hb-item={planIdx}
                            data-hb-edit={`pricing:plans.${planIdx}.price`}
                          >
                            {plan.price}
                          </span>{" "}
                          <span
                            data-hb-node="text"
                            data-hb-item={planIdx}
                            data-hb-edit={`pricing:plans.${planIdx}.period`}
                            className="text-muted-foreground text-xs font-normal"
                          >
                            {plan.period}
                          </span>
                        </Text>
                      </div>
                      <Text
                        data-hb-node="text"
                        data-hb-item={planIdx}
                        data-hb-edit={`pricing:plans.${planIdx}.description`}
                        className="text-muted-foreground"
                      >
                        {plan.description}
                      </Text>
                      <div data-hb-item={planIdx}>
                        <LandingActionButton
                          action={plan.action}
                          secondary
                          editField={`pricing:plans.${planIdx}.action.label`}
                        />
                      </div>
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
                      <Text
                        data-hb-node="heading"
                        data-hb-item={idx}
                        data-hb-edit={`pricing:plans.${idx}.name`}
                        className="font-semibold"
                      >
                        {plan.name}
                      </Text>
                      {(idx === 1 || plan.badge) && (
                        <Badge
                          variant="modern"
                          size="sm"
                          data-hb-node="badge"
                          data-hb-item={idx}
                          data-hb-edit={`pricing:plans.${idx}.badge`}
                        >
                          <span data-hb-edit-text="">{plan.badge || "Popular"}</span>
                        </Badge>
                      )}
                    </div>
                    <Text className="mt-1 font-semibold tabular-nums">
                      <span
                        data-hb-node="text"
                        data-hb-item={idx}
                        data-hb-edit={`pricing:plans.${idx}.price`}
                      >
                        {plan.price}
                      </span>{" "}
                      <span
                        data-hb-node="text"
                        data-hb-item={idx}
                        data-hb-edit={`pricing:plans.${idx}.period`}
                      >
                        {plan.period}
                      </span>
                    </Text>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.comparisons.map((row, rowIdx) => (
                <TableRow key={`${row.label}-${rowIdx}`}>
                  <TableHead scope="row">
                    <span
                      data-hb-node="text"
                      data-hb-item={rowIdx}
                      data-hb-edit={`pricing:comparisons.${rowIdx}.label`}
                    >
                      {row.label}
                    </span>
                  </TableHead>
                  {content.plans.map((plan, index) => (
                    <TableCell key={plan.id}>
                      <span
                        data-hb-node="text"
                        data-hb-item={rowIdx}
                        data-hb-edit={`pricing:comparisons.${rowIdx}.values.${index}`}
                      >
                        {row.values[index] ?? "Not included"}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableHead scope="row">Next step</TableHead>
                {content.plans.map((plan, idx) => (
                  <TableCell key={plan.id} data-hb-item={idx}>
                    <LandingActionButton
                      action={plan.action}
                      secondary={idx !== 1}
                      editField={`pricing:plans.${idx}.action.label`}
                    />
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
