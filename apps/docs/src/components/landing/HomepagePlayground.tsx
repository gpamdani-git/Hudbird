import * as React from "react";
import { BrandScope, useBrandMode } from "@hudbird/marketing";
import type { BrandProfile, HeroContent } from "@hudbird/schemas";
import {
  Button,
  Container,
  Grid,
  Heading,
  Section,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@hudbird/ui";
import { ArrowUpRight, Check, Columns2, PanelTop, Shapes } from "lucide-react";
import "./homepage-playground.css";

type PlaygroundLayout = "split" | "centered";

const brands = [
  {
    id: "sky",
    name: "Sky",
    primary: "#75caff",
    fontFamily: '"Outfit", ui-sans-serif, sans-serif',
    radius: "soft",
    detail: "Outfit · Soft corners",
  },
  {
    id: "clay",
    name: "Clay",
    primary: "#e4ab8e",
    fontFamily: 'Georgia, "Times New Roman", serif',
    radius: "square",
    detail: "Georgia · Square corners",
  },
  {
    id: "sage",
    name: "Sage",
    primary: "#b9d0aa",
    fontFamily: '"Plus Jakarta Sans", ui-sans-serif, sans-serif',
    radius: "round",
    detail: "Jakarta · Round corners",
  },
] satisfies (Pick<BrandProfile, "id" | "name" | "primary" | "fontFamily" | "radius"> & {
  detail: string;
})[];

const layouts = [
  { id: "split", label: "Split", icon: Columns2 },
  { id: "centered", label: "Centered", icon: PanelTop },
] satisfies { id: PlaygroundLayout; label: string; icon: typeof Columns2 }[];

const sampleContent: HeroContent = {
  title: "Your next idea starts here.",
  description:
    "A simple home for what you’re making. Add your story, show your work, and invite people in.",
  primaryAction: { label: "Make it yours", href: "/#/marketing/landing-builder" },
  secondaryAction: { label: "Explore sections", href: "/#/marketing/landing-sections" },
};

function SampleLanding({ brand, layout }: { brand: BrandProfile; layout: PlaygroundLayout }) {
  return (
    <BrandScope brand={brand} className="hbp-preview" data-preview-layout={layout}>
      <Container size="fluid" gutter="none" className="hbp-preview-container">
        <header className="hbp-preview-header">
          <Text as="span" className="hbp-wordmark">
            <Shapes size={20} strokeWidth={1.6} aria-hidden="true" />
            your studio
          </Text>
          <Text as="span" className="hbp-sample-label">
            Sample website
          </Text>
        </header>
        <Section spacing="none" className="hbp-preview-hero" aria-label="Sample landing page">
          <Grid gap="lg" align="center" className="hbp-preview-composition">
            <div className="hbp-preview-copy">
              <Heading as="h3" size="inherit" className="hbp-preview-title">
                {sampleContent.title}
              </Heading>
              <Text className="hbp-preview-description">{sampleContent.description}</Text>
              <div className="hbp-preview-actions">
                <Button
                  href={sampleContent.primaryAction.href}
                  className="hbp-preview-primary"
                  endContent={<ArrowUpRight size={16} aria-hidden="true" />}
                >
                  {sampleContent.primaryAction.label}
                </Button>
                <Button
                  href={sampleContent.secondaryAction!.href}
                  variant="plain"
                  className="hbp-preview-secondary"
                >
                  {sampleContent.secondaryAction!.label}
                </Button>
              </div>
            </div>
            <figure className="hbp-type-sample" aria-label={`${brand.name} type and color sample`}>
              <span className="hbp-type-specimen" aria-hidden="true">
                Aa
              </span>
              <figcaption className="hbp-type-caption">
                <span>
                  A little character.
                  <br />A lot of possibility.
                </span>
                <Shapes size={28} strokeWidth={1.3} aria-hidden="true" />
              </figcaption>
            </figure>
          </Grid>
        </Section>
        <footer className="hbp-preview-footer">
          <Text as="span">Your story. Your work. Your next chapter.</Text>
          <span className="hbp-color-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </footer>
      </Container>
    </BrandScope>
  );
}

export function HomepagePlayground() {
  const mode = useBrandMode();
  const [brandId, setBrandId] = React.useState(brands[0].id);
  const [layout, setLayout] = React.useState<PlaygroundLayout>("split");
  const selectedBrand = brands.find((brand) => brand.id === brandId) ?? brands[0];
  const brand: BrandProfile = { ...selectedBrand, density: "compact", mode };
  const selectedLayout = layouts.find((item) => item.id === layout)!;
  const headingId = React.useId();

  return (
    <Section id="builder" spacing="xl" className="hbp-section" aria-labelledby={headingId}>
      <Container size="xl">
        <Grid cols={1} gap="md" className="hbp-introduction">
          <Heading as="h2" size="inherit" id={headingId} className="hbp-heading">
            Your brand.
            <br />
            <span>Your starting point.</span>
          </Heading>
          <Text className="hbp-description">
            Try a different look. Move a few things around. The same content can feel entirely
            yours—before you write a line of code.
          </Text>
        </Grid>

        <Tabs
          selectedKey={layout}
          onSelectionChange={(key) => setLayout(key as PlaygroundLayout)}
          variant="light"
          size="lg"
          className="hbp-playground"
        >
          <Grid cols={1} gap="lg" align="start" className="hbp-workspace">
            <aside className="hbp-controls" aria-label="Customize the sample website">
              <div className="hbp-brand-control">
                <Heading as="h3" size="inherit" className="hbp-control-heading">
                  Choose a brand
                </Heading>
                <div role="group" aria-label="Sample brand presets" className="hbp-brand-options">
                  {brands.map((preset) => (
                    <Button
                      key={preset.id}
                      variant="plain"
                      aria-label={`${preset.name} brand`}
                      aria-pressed={preset.id === brandId}
                      onClick={() => setBrandId(preset.id)}
                      className="hbp-brand-option"
                      style={{ "--hbp-swatch": preset.primary } as React.CSSProperties}
                    >
                      <span className="hbp-brand-swatch" aria-hidden="true">
                        {preset.id === brandId && <Check size={18} strokeWidth={2} />}
                      </span>
                      <span className="hbp-brand-label">
                        <strong>{preset.name}</strong>
                        <span>{preset.detail}</span>
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="hbp-layout-control">
                <Heading as="h3" size="inherit" className="hbp-control-heading">
                  Pick a layout
                </Heading>
                <TabList aria-label="Sample website layout" className="hbp-layout-options">
                  {layouts.map(({ id, label, icon: Icon }) => (
                    <Tab
                      key={id}
                      tabKey={id}
                      className="hbp-layout-option"
                      icon={<Icon size={17} aria-hidden="true" />}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <Text className="hbp-control-note">
                These are sample presets. Add your own colors, fonts, and content in the full
                builder.
              </Text>
            </aside>

            <div className="hbp-preview-area">
              <div className="hbp-preview-bar">
                <Text as="span">Live preview</Text>
                <Text as="span">
                  {selectedBrand.name} / {selectedLayout.label}
                </Text>
              </div>
              {layouts.map((item) => (
                <TabPanel key={item.id} tabKey={item.id} className="hbp-preview-panel">
                  <SampleLanding brand={brand} layout={item.id} />
                </TabPanel>
              ))}
              <Text className="hbp-preview-note">Same content. A different first impression.</Text>
            </div>
          </Grid>
        </Tabs>
        <Text role="status" aria-live="polite" className="sr-only">
          {selectedBrand.name} brand, {selectedLayout.label} layout selected.
        </Text>
        <div className="hbp-section-actions">
          <Button
            href="/#/marketing/landing-builder"
            className="hbp-builder-link"
            radius="full"
            endContent={<ArrowUpRight size={17} aria-hidden="true" />}
          >
            Open the page builder
          </Button>
          <Button href="/#/marketing/landing-sections" variant="plain" radius="full">
            Browse the sections
          </Button>
        </div>
      </Container>
    </Section>
  );
}
