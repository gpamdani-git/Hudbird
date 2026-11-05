import * as React from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  MotionCrossfade,
  Section,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@hudbird/ui";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "./homepage-assembly.css";

const layers = [
  {
    id: "core",
    label: "Core",
    title: "The smallest useful pieces.",
    description:
      "Buttons, type, surfaces, and layout. Start with accessible primitives that share the same visual language.",
    composition: "Badge · Heading · Button",
    detail: "Each piece has its own API. Change a label, a variant, or a token.",
    link: "Explore core components",
    href: "/#/button",
    caption: "Individual primitives, ready to compose.",
  },
  {
    id: "block",
    label: "Block",
    title: "One job, composed.",
    description:
      "Bring the pieces together around a single purpose. A block groups content and interactions without owning the page.",
    composition: "Core components → focused pattern",
    detail: "Keep the pattern together. Reuse it wherever the same job appears.",
    link: "Explore a signature block",
    href: "/#/signature/morphing-island",
    caption: "The same primitives, grouped into a content block.",
  },
  {
    id: "section",
    label: "Section",
    title: "Give the content its place.",
    description:
      "Wrap the block in a page section. Section, Container, and Grid handle its boundary, reading width, and layout.",
    composition: "Section · Container · Grid",
    detail: "Swap the section layout while keeping your content and brand.",
    link: "Explore marketing sections",
    href: "/#/marketing/landing-sections",
    caption: "A section adds spacing, structure, and a page boundary.",
  },
  {
    id: "template",
    label: "Template",
    title: "A whole page. Still your pieces.",
    description:
      "Arrange sections into a complete starting point. Every layer stays visible, editable, and replaceable in your source.",
    composition: "Navigation → sections → footer",
    detail: "Begin with the composition. Make it yours one layer at a time.",
    link: "Explore templates",
    href: "/#/templates",
    caption: "Sections become a page, with the original pieces still inside.",
  },
] as const;

type Layer = (typeof layers)[number];

function AssemblyDrawing({ layer }: { layer: Layer }) {
  const captionId = React.useId();

  return (
    <figure className="hba-figure" aria-labelledby={captionId}>
      <div className="hba-scene" data-layer={layer.id}>
        <span className="hba-drawing-note" aria-hidden="true">
          A composition, opened up.
        </span>
        <Card variant="flat" radius="lg" className="hba-page-sheet">
          <div className="hba-page-chrome" aria-hidden="true">
            <span className="hba-page-wordmark">hudbird</span>
            <span className="hba-page-nav">Overview &nbsp; Components</span>
            <span className="hba-layer-mark">Template</span>
          </div>
          <Section spacing="none" className="hba-section-sheet" aria-label="Example section">
            <span className="hba-layer-mark hba-section-mark" aria-hidden="true">
              Section
            </span>
            <Container gutter="none" className="hba-example-container">
              <Card variant="flat" radius="md" className="hba-block-sheet">
                <span className="hba-layer-mark hba-block-mark" aria-hidden="true">
                  Block
                </span>
                <Grid cols={1} gap="none" className="hba-core-pieces">
                  <Badge className="hba-example-badge" variant="outline" color="neutral">
                    Your next idea
                  </Badge>
                  <Heading as="h4" size="inherit" className="hba-example-heading">
                    Make it
                    <br />
                    your own.
                  </Heading>
                  <Button
                    href="/#/button"
                    radius="full"
                    className="hba-example-button"
                    aria-label="View the Button component"
                    endContent={<ArrowUpRight size={15} aria-hidden="true" />}
                  >
                    Start building
                  </Button>
                </Grid>
              </Card>
            </Container>
          </Section>
          <Grid cols={1} gap="none" className="hba-page-sections" aria-hidden="true">
            <div>
              <span>Features</span>
              <i />
              <i />
            </div>
            <div>
              <span>How it works</span>
              <i />
              <i />
            </div>
            <div className="hba-page-footer">
              <span>Your page, your source.</span>
              <ArrowUpRight size={12} />
            </div>
          </Grid>
        </Card>
        <span className="hba-drawing-axis" aria-hidden="true">
          Core → Block → Section → Template
        </span>
      </div>
      <Text as="figcaption" id={captionId} className="hba-caption" variant="small">
        <span className="hba-caption-dot" aria-hidden="true" />
        {layer.caption}
      </Text>
    </figure>
  );
}

export function HomepageAssembly() {
  const [selected, setSelected] = React.useState<Layer["id"]>("core");
  const layer = layers.find((item) => item.id === selected) ?? layers[0];

  return (
    <Section id="benefits" spacing="lg" className="hba-section" aria-labelledby="hba-title">
      <Container size="xl" gutter="lg">
        <Grid cols={2} gap="lg" align="end" className="hba-intro">
          <Heading as="h2" size="inherit" id="hba-title" className="hba-title">
            From a button
            <br />
            <span>to the whole page.</span>
          </Heading>
          <Text className="hba-intro-copy">
            One connected system, at every scale. Choose a layer to see how the pieces fit together.
          </Text>
        </Grid>
        <Tabs
          selectedKey={selected}
          onSelectionChange={(key) => {
            const next = layers.find((item) => item.id === key);
            if (next) setSelected(next.id);
          }}
          variant="underlined"
          radius="none"
          className="hba-tabs"
        >
          <TabList aria-label="Explore the Hudbird system layers" className="hba-tab-list">
            {layers.map((item, index) => (
              <Tab key={item.id} tabKey={item.id} className="hba-tab">
                <span className="hba-tab-number" aria-hidden="true">
                  0{index + 1}
                </span>
                {item.label}
                <ArrowRight className="hba-tab-arrow" size={16} aria-hidden="true" />
              </Tab>
            ))}
          </TabList>
          <TabPanel tabKey={layer.id} className="hba-panel">
            <Grid cols={2} gap="lg" align="center" className="hba-stage-grid">
              <div className="hba-stage-copy">
                <MotionCrossfade transitionKey={layer.id}>
                  <Text className="hba-stage-index" variant="small">
                    {layer.label} <span aria-hidden="true">/</span>{" "}
                    {layers.findIndex((item) => item.id === selected) + 1} of {layers.length}
                  </Text>
                  <Heading as="h3" size="inherit" className="hba-stage-title">
                    {layer.title}
                  </Heading>
                  <Text className="hba-description">{layer.description}</Text>
                  <div className="hba-composition">
                    <Text as="code" className="hba-composition-label">
                      {layer.composition}
                    </Text>
                    <Text className="hba-detail" variant="small">
                      {layer.detail}
                    </Text>
                  </div>
                </MotionCrossfade>
                <Button
                  href={layer.href}
                  variant="plain"
                  className="hba-docs-link"
                  endContent={<ArrowUpRight size={17} aria-hidden="true" />}
                >
                  {layer.link}
                </Button>
              </div>
              <AssemblyDrawing layer={layer} />
            </Grid>
          </TabPanel>
        </Tabs>
      </Container>
    </Section>
  );
}
