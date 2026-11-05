import * as React from "react";
import {
  Card,
  CardBody,
  Container,
  Grid,
  Heading,
  MotionReveal,
  MotionScrollProgress,
  MotionSlideshow,
  MotionStagger,
  MotionStaggerItem,
  MotionTicker,
  Section,
  Text,
} from "@hudbird/ui";
import motionCode from "../../../../packages/core/src/components/Motion/Motion.tsx?raw";
import { ApiTable } from "../components/ApiTable";
import { ComponentPreview } from "../components/ComponentPreview";
import { DocHeader } from "../components/DocHeader";
import { InstallationTabs } from "../components/InstallationTabs";

const tickerItems = ["Reveal", "Stagger", "Ticker", "Slideshow"].map((label) => (
  <span key={label} className="px-8 text-lg font-medium tracking-tight">
    {label}
  </span>
));

export default function MotionDoc() {
  return (
    <div className="space-y-14 pb-24">
      <MotionScrollProgress />
      <DocHeader
        category="Motion"
        title="Calm motion, one shared language."
        description="Reusable Hudbird primitives for scroll reveals, staggered groups, tickers, slideshows, and page progress. Reduced motion is built in."
      />
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <InstallationTabs componentName="Motion" manualCode={motionCode} />
        </Container>
      </Section>
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={2} gap="lg">
            <ComponentPreview title="Reveal" description="A short, one-time viewport entrance.">
              <div className="p-10">
                <MotionReveal>
                  <Card variant="bordered" className="shadow-none">
                    <CardBody className="space-y-2 p-7">
                      <Heading as="h3" size="h4">
                        Quiet entrance
                      </Heading>
                      <Text>
                        Opacity and transform only, with no hidden content under reduced motion.
                      </Text>
                    </CardBody>
                  </Card>
                </MotionReveal>
              </div>
            </ComponentPreview>
            <ComponentPreview
              title="Stagger"
              description="A restrained sequence for related items."
            >
              <MotionStagger className="space-y-3 p-10">
                {["Brief", "Build", "Review"].map((item) => (
                  <MotionStaggerItem key={item}>
                    <Card variant="bordered" className="shadow-none">
                      <CardBody className="p-4">
                        <Text>{item}</Text>
                      </CardBody>
                    </Card>
                  </MotionStaggerItem>
                ))}
              </MotionStagger>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={2} gap="lg">
            <ComponentPreview
              title="Ticker"
              description="Pauses on hover, focus, and reduced motion."
            >
              <div className="py-12">
                <MotionTicker items={tickerItems} aria-label="Motion primitive ticker" />
              </div>
            </ComponentPreview>
            <ComponentPreview
              title="Slideshow"
              description="Manual controls and an announced position."
            >
              <div className="p-8">
                <MotionSlideshow
                  slides={["Plan", "Compose", "Ship"].map((label) => (
                    <Card key={label} variant="bordered" className="shadow-none">
                      <CardBody className="p-10 text-center">
                        <Heading as="h3">{label}</Heading>
                      </CardBody>
                    </Card>
                  ))}
                />
              </div>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>
      <ApiTable
        title="Motion primitives"
        rows={[
          {
            prop: "MotionReveal",
            type: "MotionRevealProps",
            description: "One-time viewport reveal.",
          },
          {
            prop: "MotionStagger",
            type: "HTMLMotionProps",
            description: "Coordinates a short child sequence.",
          },
          {
            prop: "MotionTicker",
            type: "MotionTickerProps",
            description: "Accessible continuous content row.",
          },
          {
            prop: "MotionSlideshow",
            type: "MotionSlideshowProps",
            description: "Controlled, keyboard-operable slide presentation.",
          },
          {
            prop: "MotionScrollProgress",
            type: "{ className?: string }",
            description: "Page progress using a transform scale.",
          },
        ]}
      />
    </div>
  );
}
