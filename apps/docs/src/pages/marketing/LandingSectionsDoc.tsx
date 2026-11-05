import * as React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  Text,
  Section,
  Container,
  Accordion,
  AccordionItem,
} from "@hudbird/ui";
import {
  LandingSectionPreview,
  landingSectionRegistry,
  landingComponentNames,
  formaLandingContent,
  createLandingPageConfig,
} from "@hudbird/marketing";
import type { LandingSectionSelection, BrandProfile, LandingPageConfig } from "@hudbird/schemas";
import { DocHeader } from "../../components/DocHeader";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable } from "../../components/ApiTable";
import { LandingBrandControls } from "../../components/landing/LandingBrandControls";
import { useWebsiteMode } from "../../lib/useWebsiteMode";
import skill from "../../../../../public/skills/landing-sections.md?raw";

export default function LandingSectionsDoc() {
  const { section: sectionType } = useParams();
  const definition = landingSectionRegistry.find((section) => section.type === sectionType);
  const websiteMode = useWebsiteMode();
  const [brand, setBrand] = React.useState<BrandProfile>(createLandingPageConfig().brand);
  const [themeMode, setThemeMode] = React.useState<LandingPageConfig["themeMode"]>("auto");
  const resolvedBrand = { ...brand, mode: themeMode === "auto" ? websiteMode : themeMode };
  function code(selection: LandingSectionSelection) {
    const name = landingComponentNames[selection.type];
    const data = JSON.stringify(formaLandingContent[selection.type], null, 2);
    const props =
      selection.type === "hero"
        ? `content={content.content} config={content.variants.${selection.variant}}`
        : `variant="${selection.variant}" content={content}${selection.type === "navbar" || selection.type === "footer" ? " brand={brand}" : ""}`;
    return `import { ${name} } from "@/components/hudbird-ui/${name}";\nimport { BrandScope } from "@/components/hudbird-ui/HeroSection";\nimport type { LandingSectionContent, BrandProfile } from "@/components/hudbird-ui/CompositionSchema";\n\nconst brand: BrandProfile = ${JSON.stringify(resolvedBrand, null, 2)};\nconst content: LandingSectionContent["${selection.type}"] = ${data};\n\nexport default function Example() {\n  return <BrandScope brand={brand} id="landing-page"><${name} ${props} /></BrandScope>;\n}`;
  }
  if (sectionType && !definition)
    return (
      <div className="space-y-5">
        <DocHeader title="Section not found" description="Choose a section from the collection." />
        <Button href="/#/marketing/landing-sections">View the collection</Button>
      </div>
    );
  return (
    <div className="min-w-0 space-y-10 pb-24">
      <DocHeader
        category="SaaS sections"
        title={definition?.title ?? "A considered start for every section."}
        description={
          definition?.description ??
          "Twelve section types. Twenty-seven layout variants. One shared design language, built from Hudbird core components."
        }
      />
      <div className="flex flex-wrap gap-3">
        <Button href="/#/marketing/landing-builder">Open page builder</Button>
        {definition && (
          <Button href="/#/marketing/landing-sections" variant="outline">
            All sections
          </Button>
        )}
      </div>
      <Accordion>
        <AccordionItem itemKey="brand" title="Brand and preview theme">
          <LandingBrandControls
            brand={brand}
            onChange={setBrand}
            themeMode={themeMode}
            onThemeChange={setThemeMode}
          />
        </AccordionItem>
      </Accordion>
      {!definition ? (
        <Section spacing="none">
          <Container size="fluid" gutter="none">
            <Grid cols={2} gap="md">
              {landingSectionRegistry.map((section) => (
                <Card key={section.type} variant="bordered" className="shadow-none">
                  <CardBody className="space-y-4 p-6">
                    <Text variant="small">{section.variants.length} layouts</Text>
                    <Heading as="h2" size="h3">
                      {section.title}
                    </Heading>
                    <Text>{section.description}</Text>
                    <Text variant="small">
                      {section.variants.map((variant) => variant.name).join(" · ")}
                    </Text>
                    <Button
                      href={`/#/marketing/landing-sections/${section.type}`}
                      variant="outline"
                    >
                      View {section.title.toLowerCase()}
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : (
        <>
          <Text>
            Install from the locally packed CLI until this registry is published. After release:{" "}
            <code>npx hudbird-ui add {landingComponentNames[definition.type]}</code>. Installation
            includes shared layout, brand scope, and required core components.
          </Text>
          {definition.type === "hero" && (
            <Text variant="small">
              Slideshow and video heroes are also available in the page builder and hero pilot.
            </Text>
          )}
          {definition.variants.map((variant) => {
            const selection = {
              type: definition.type,
              variant: variant.id,
              enabled: true,
            } as LandingSectionSelection;
            return (
              <MarketingPreview
                isolateViewport
                key={`${definition.type}-${variant.id}`}
                title={variant.name}
                subtitle={variant.description}
                code={code(selection)}
                skill={skill}
                minHeight={320}
              >
                <LandingSectionPreview
                  selection={selection}
                  content={formaLandingContent}
                  brand={resolvedBrand}
                />
              </MarketingPreview>
            );
          })}
          <ApiTable
            title="Section API"
            rows={[
              definition.type === "hero"
                ? {
                    prop: "config",
                    type: "HeroSectionConfig",
                    required: true,
                    description: "Select the hero layout and its media independently of content.",
                  }
                : {
                    prop: "variant",
                    type: definition.variants.map((variant) => `"${variant.id}"`).join(" | "),
                    required: true,
                    description: "Select the composition while retaining content.",
                  },
              {
                prop: "content",
                type:
                  definition.type === "hero"
                    ? "HeroContent"
                    : `LandingSectionContent["${definition.type}"]`,
                required: true,
                description: "Typed content, separate from layout.",
              },
              ...(definition.type === "navbar" || definition.type === "footer"
                ? [
                    {
                      prop: "brand",
                      type: "BrandProfile",
                      required: true,
                      description: "Brand name and logo.",
                    },
                  ]
                : []),
            ]}
          />
          <Text variant="small">
            Built with Hudbird: {definition.coreComponents.join(", ")}. Native media and semantic
            wrappers support the composition.
          </Text>
        </>
      )}
    </div>
  );
}
