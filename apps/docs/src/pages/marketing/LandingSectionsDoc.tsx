import * as React from "react";
import { useParams } from "react-router-dom";
import { Text } from "@hudbird/ui";
import {
  LandingSectionPreview,
  landingSectionRegistry,
  landingComponentNames,
  formaLandingContent,
  createLandingPageConfig,
} from "@hudbird/marketing";
import type { LandingSectionSelection, BrandProfile } from "@hudbird/schemas";
import { DocHeader } from "../../components/DocHeader";
import { InstallationTabs } from "../../components/InstallationTabs";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable } from "../../components/ApiTable";
import { useWebsiteMode } from "../../lib/useWebsiteMode";
import skill from "../../../../../public/skills/landing-sections.md?raw";

export default function LandingSectionsDoc() {
  const { section: sectionType } = useParams();
  const definition =
    landingSectionRegistry.find((section) => section.type === sectionType) ??
    landingSectionRegistry[0];
  const websiteMode = useWebsiteMode();
  const [brand] = React.useState<BrandProfile>(createLandingPageConfig().brand);
  const resolvedBrand = { ...brand, mode: websiteMode };

  function code(selection: LandingSectionSelection) {
    const name = landingComponentNames[selection.type];
    const data = JSON.stringify(formaLandingContent[selection.type], null, 2);
    const props =
      selection.type === "hero"
        ? `content={content.content} config={content.variants.${selection.variant}}`
        : `variant="${selection.variant}" content={content}${selection.type === "navbar" || selection.type === "footer" ? " brand={brand}" : ""}`;
    return `import { ${name} } from "@/components/hudbird-ui/${name}";\nimport { BrandScope } from "@/components/hudbird-ui/HeroSection";\nimport type { LandingSectionContent, BrandProfile } from "@/components/hudbird-ui/CompositionSchema";\n\nconst brand: BrandProfile = ${JSON.stringify(resolvedBrand, null, 2)};\nconst content: LandingSectionContent["${selection.type}"] = ${data};\n\nexport default function Example() {\n  return <BrandScope brand={brand} id="landing-page"><${name} ${props} /></BrandScope>;\n}`;
  }

  const allVariants = [...definition.variants, ...(definition.additionalVariants ?? [])];
  const firstSelection = {
    type: definition.type,
    variant: allVariants[0].id,
    enabled: true,
  } as LandingSectionSelection;

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Marketing Sections"
        title={definition.title}
        badge="Marketing"
        description={definition.description}
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs
          componentName={landingComponentNames[definition.type]}
          manualCode={code(firstSelection)}
        />
      </div>

      <div id="examples" className="flex flex-col gap-16">
        {allVariants.map((variant) => {
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
      </div>

      <section id="component-api" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <ApiTable
            title={`${landingComponentNames[definition.type]} Props`}
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
                    type: allVariants.map((variant) => `"${variant.id}"`).join(" | "),
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
        </div>
        <Text variant="small">Built with Hudbird: {definition.coreComponents.join(", ")}.</Text>
      </section>
    </div>
  );
}
