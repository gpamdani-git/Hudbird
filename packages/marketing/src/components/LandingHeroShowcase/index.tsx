"use client";

import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Grid,
  Heading,
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
  Progress,
  Section,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@hudbird/ui";
import { ArrowRight, Check, Code2, LayoutTemplate, Palette, Sparkles } from "lucide-react";

export interface LandingHeroAction {
  label: string;
  href: string;
}

export interface LandingHeroShowcaseContent {
  eyebrow: string;
  title: string;
  accentTitle: string;
  description: string;
  primaryAction: LandingHeroAction;
  secondaryAction?: LandingHeroAction;
}

export interface LandingHeroShowcaseProps {
  id?: string;
  content: LandingHeroShowcaseContent;
  illustration?: React.ReactNode;
}

function SystemLayer({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={
        active
          ? "border-primary/30 bg-primary/10 text-foreground flex min-h-10 items-center justify-between rounded-xl border px-3 text-sm font-medium"
          : "border-border bg-background/70 text-muted-foreground flex min-h-10 items-center justify-between rounded-xl border px-3 text-sm font-medium"
      }
    >
      <span>{label}</span>
      {active ? <Check aria-hidden="true" className="text-primary h-4 w-4" /> : null}
    </div>
  );
}

/** A product illustration assembled entirely from Hudbird core components. */
export function HudbirdSystemCanvas() {
  return (
    <Card
      variant="flat"
      radius="full"
      className="border-border bg-muted/70 isolate min-h-[34rem] overflow-hidden border p-3 shadow-[0_32px_90px_-48px_rgba(24,24,27,0.45)] sm:p-5 lg:min-h-[40rem] lg:p-8 dark:shadow-[0_32px_90px_-48px_rgba(0,0,0,0.9)]"
      aria-label="Hudbird design system preview"
    >
      <div className="border-border bg-background/80 flex items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="bg-primary h-2.5 w-2.5 rounded-full" aria-hidden="true" />
          <Text as="span" variant="small" weight="semibold">
            Hudbird composition
          </Text>
        </div>
        <Badge variant="soft" color="success" size="sm">
          Live system
        </Badge>
      </div>

      <Grid
        cols={12}
        gap="sm"
        align="stretch"
        className="mt-3 auto-rows-[minmax(0,auto)] sm:mt-5 lg:min-h-[31rem]"
      >
        <Card variant="bordered" radius="lg" className="col-span-12 lg:col-span-4 lg:translate-y-8">
          <CardHeader className="items-start">
            <div>
              <Text variant="subtle">Brand profile</Text>
              <Heading as="h3" size="h4" className="mt-1">
                Rules AI can follow
              </Heading>
            </div>
            <Palette aria-hidden="true" className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardBody className="space-y-5 pb-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Text variant="small" weight="medium">
                  Brand color
                </Text>
                <Text as="span" variant="code">
                  #6D5DFC
                </Text>
              </div>
              <div className="flex gap-2" aria-label="Hudbird color tokens">
                <span className="bg-primary h-10 flex-1 rounded-xl" />
                <span className="bg-primary/55 h-10 flex-1 rounded-xl" />
                <span className="bg-primary/15 h-10 flex-1 rounded-xl" />
              </div>
            </div>
            <Progress label="Spacing rhythm" value={75} color="primary" size="sm" />
            <div className="grid grid-cols-2 gap-2">
              <SystemLayer label="Soft radius" active />
              <SystemLayer label="Comfortable" />
            </div>
          </CardBody>
        </Card>

        <Card variant="shadow" radius="lg" className="col-span-12 lg:col-span-5 lg:-translate-y-2">
          <CardHeader className="items-start">
            <div>
              <Text variant="subtle">Section composer</Text>
              <Heading as="h3" size="h4" className="mt-1">
                Build from known layers
              </Heading>
            </div>
            <LayoutTemplate aria-hidden="true" className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardBody className="pb-6">
            <div className="space-y-2">
              <SystemLayer label="Core components" />
              <SystemLayer label="Product blocks" />
              <SystemLayer label="Landing sections" active />
              <SystemLayer label="Page template" />
            </div>
            <div className="border-border bg-muted/60 mt-5 rounded-2xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Text variant="small" weight="semibold">
                    Hero · centered
                  </Text>
                  <Text variant="small" color="muted" className="mt-1">
                    Brand and content preserved
                  </Text>
                </div>
                <Badge variant="soft" color="primary" size="sm">
                  Selected
                </Badge>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card
          variant="bordered"
          radius="lg"
          className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-3 lg:col-start-auto lg:translate-y-16"
        >
          <CardHeader className="items-start">
            <div>
              <Text variant="subtle">Owned source</Text>
              <Heading as="h3" size="h4" className="mt-1">
                Preview to React
              </Heading>
            </div>
            <Code2 aria-hidden="true" className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardBody className="pb-6">
            <Tabs defaultSelectedKey="preview" variant="solid" fullWidth size="sm">
              <TabList aria-label="Product preview format">
                <Tab tabKey="preview">Preview</Tab>
                <Tab tabKey="source">Source</Tab>
              </TabList>
              <TabPanel tabKey="preview" className="pt-5">
                <div className="border-border bg-background rounded-2xl border p-4">
                  <Badge variant="soft" color="primary" size="sm">
                    Hudbird UI
                  </Badge>
                  <div className="bg-foreground mt-4 h-3 w-4/5 rounded-full" />
                  <div className="bg-muted-foreground/25 mt-2 h-2 w-full rounded-full" />
                  <div className="bg-muted-foreground/25 mt-2 h-2 w-3/4 rounded-full" />
                  <Button size="sm" radius="full" className="mt-5" disabled>
                    Open builder
                  </Button>
                </div>
              </TabPanel>
              <TabPanel tabKey="source" className="pt-5">
                <Text as="pre" variant="code" className="overflow-hidden p-4 leading-6">
                  {`<Section>\n  <Container>\n    <Hero />\n  </Container>\n</Section>`}
                </Text>
              </TabPanel>
            </Tabs>
          </CardBody>
        </Card>
      </Grid>
    </Card>
  );
}

export function LandingHeroShowcase({
  id = "hero",
  content,
  illustration,
}: LandingHeroShowcaseProps) {
  return (
    <Section
      id={id}
      spacing="none"
      className="overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-32"
    >
      <Container size="2xl" gutter="md">
        <MotionStagger className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <MotionStaggerItem>
            <Button
              href={content.primaryAction.href}
              variant="plain"
              color="primary"
              size="sm"
              radius="full"
              endContent={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
              className="text-primary"
            >
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              {content.eyebrow}
            </Button>
          </MotionStaggerItem>

          <MotionStaggerItem className="mt-7 w-full sm:mt-9">
            <Heading
              as="h1"
              size="inherit"
              tracking="tighter"
              className="text-[clamp(3rem,9vw,8rem)] leading-[0.92] font-medium tracking-[-0.055em]"
            >
              <span className="block text-zinc-950 dark:text-white">{content.title}</span>{" "}
              <span className="mt-2 block text-zinc-500 dark:text-zinc-500">
                {content.accentTitle}
              </span>
            </Heading>
          </MotionStaggerItem>

          <MotionStaggerItem className="mt-7 sm:mt-9">
            <Text
              variant="lead"
              align="center"
              className="mx-auto max-w-3xl text-base leading-7 sm:text-xl sm:leading-8"
            >
              {content.description}
            </Text>
          </MotionStaggerItem>

          <MotionStaggerItem className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              href={content.primaryAction.href}
              size="lg"
              radius="full"
              className="w-full sm:w-auto"
              endContent={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
            >
              {content.primaryAction.label}
            </Button>
            {content.secondaryAction ? (
              <Button
                href={content.secondaryAction.href}
                variant="outline"
                color="zinc"
                size="lg"
                radius="full"
                className="w-full sm:w-auto"
              >
                {content.secondaryAction.label}
              </Button>
            ) : null}
          </MotionStaggerItem>
        </MotionStagger>

        <MotionReveal distance={24} className="mt-14 sm:mt-20 lg:mt-24">
          {illustration ?? <HudbirdSystemCanvas />}
        </MotionReveal>
      </Container>
    </Section>
  );
}
