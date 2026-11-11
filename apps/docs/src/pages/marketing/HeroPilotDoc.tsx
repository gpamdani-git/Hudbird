import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Input,
  Section,
  Select,
  SelectItem,
  Text,
} from "@hudbird/ui";
import {
  BrandScope,
  HeroSection,
  StartupPage,
  pilotBrands,
  pilotCompositions,
  pilotHeroes,
  startupContent,
} from "@hudbird/marketing";
import type { BrandProfile, HeroSectionConfig } from "@hudbird/schemas";
import { DocHeader } from "../../components/DocHeader";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable } from "../../components/ApiTable";
import pilotSkill from "../../../../../public/skills/startup-pilot.md?raw";
import { useWebsiteMode } from "../../lib/useWebsiteMode";
import { typographyPresets } from "../../lib/themes";

const googleFontFamilies = [...new Set([...typographyPresets.sans, ...typographyPresets.heading])];
function googleFontProfile(family: string) {
  return {
    googleFont: family,
    fontFamily: `"${family}", ${["Playfair Display", "Lora"].includes(family) ? "Georgia, serif" : "system-ui, sans-serif"}`,
  };
}

export const heroLabels: Record<HeroSectionConfig["variant"], string> = {
  "split-product": "Hero Split Product",
  "center-canvas": "Hero Center Video",
  "center-video": "Hero Center Video",
  "editorial-photo": "Hero Editorial Photo",
  centered: "Centered image",
  split: "Split image",
  slideshow: "Slideshow",
  video: "Video background",
  interactive: "Interactive demo",
};

export function StartupPilotPreview() {
  const params = new URLSearchParams(useLocation().search);
  const websiteMode = useWebsiteMode();
  const mode = params.get("mode");
  const brand = {
    ...(pilotBrands.find((item) => item.id === params.get("brand")) ?? pilotBrands[0]),
    mode: mode === "dark" || mode === "light" ? mode : websiteMode,
  } as BrandProfile;
  const primary = params.get("primary");
  if (primary && /^#[\da-f]{6}$/i.test(primary)) brand.primary = primary;
  brand.name = params.get("name") ?? brand.name;
  const logo = params.get("logo");
  if (logo) brand.logo = { src: logo, alt: `${brand.name} logo` };
  const font = params.get("font");
  if (font && googleFontFamilies.includes(font)) Object.assign(brand, googleFontProfile(font));
  const composition =
    pilotCompositions.find((item) => item.id === params.get("composition")) ?? pilotCompositions[0];
  const requested = params.get("hero") as HeroSectionConfig["variant"] | null;
  const hero =
    requested && Object.hasOwn(pilotHeroes, requested) ? pilotHeroes[requested] : composition.hero;
  return (
    <StartupPage brand={brand} composition={{ ...composition, hero }} content={startupContent} />
  );
}

export default function HeroPilotDoc() {
  const websiteMode = useWebsiteMode();
  const [modeOverride, setModeOverride] = React.useState<BrandProfile["mode"] | null>(null);
  const [brandProfile, setBrand] = React.useState<BrandProfile>(pilotBrands[0]);
  const brand = { ...brandProfile, mode: modeOverride ?? websiteMode };
  const [chosen, setChosen] = React.useState<string | null>(null);
  const [hero, setHero] = React.useState<HeroSectionConfig>(pilotHeroes.split);
  const [color, setColor] = React.useState(brand.primary);
  const composition = pilotCompositions.find((item) => item.id === chosen);
  const validColor = /^#[\da-f]{6}$/i.test(color);
  const previewUrl = (id: string) =>
    `/#/templates/startup-pilot?${new URLSearchParams({
      composition: id,
      brand: brand.id,
      mode: brand.mode,
      name: brand.name,
      primary: brand.primary,
      ...(brand.googleFont ? { font: brand.googleFont } : {}),
      ...(brand.logo ? { logo: brand.logo.src } : {}),
    })}`;
  const exportConfig = {
    brand,
    composition: composition ? { ...composition, hero } : null,
    content: startupContent,
  };
  const code = `import { StartupPage, startupContent, pilotCompositions, pilotHeroes } from "@/components/hudbird-ui/StartupPilot";
import type { BrandProfile } from "@/components/hudbird-ui/CompositionSchema";

const brand: BrandProfile = ${JSON.stringify(brand, null, 2)};
const composition = { ...pilotCompositions[${chosen === "product-first" ? 1 : 0}], hero: pilotHeroes.${hero.variant} };

export default function App() {
  return <StartupPage brand={brand} composition={composition} content={startupContent} />;
}`;
  return (
    <div className="space-y-12 pb-24">
      <Button href="/#/marketing/landing-builder" variant="outline">
        Try the full SaaS page builder
      </Button>
      <DocHeader
        category="Marketing"
        title="Your brand. Your starting point."
        description="Choose a composition, apply your brand, then swap the hero. A small, complete website kit for building with Codex."
      />
      <Section spacing="none">
        <Container size="fluid" gutter="none" className="space-y-6">
          <Heading as="h2" size="h2">
            1. Bring your brand
          </Heading>
          <Text variant="muted">
            The two brands below are design fixtures, not customer endorsements. Your reference
            guides the character, rather than copying another website.
          </Text>
          <div role="group" aria-label="Brand presets" className="flex flex-wrap gap-3">
            {pilotBrands.map((preset) => (
              <Button
                key={preset.id}
                variant={brand.id === preset.id ? "solid" : "outline"}
                aria-pressed={brand.id === preset.id}
                onClick={() => {
                  setBrand(preset);
                  setColor(preset.primary);
                }}
              >
                {preset.name}
              </Button>
            ))}
          </div>
          <Grid cols={2} gap="md">
            <Input
              label="Brand name"
              value={brand.name}
              onChange={(event) => setBrand({ ...brand, name: event.target.value })}
            />
            <Input
              label="Primary color (six-digit hex)"
              value={color}
              isInvalid={!validColor}
              errorMessage={!validColor ? "Use a color such as #2457d6." : undefined}
              onChange={(event) => {
                const value = event.target.value;
                setColor(value);
                if (/^#[\da-f]{6}$/i.test(value)) setBrand({ ...brand, primary: value });
              }}
            />
            <Input
              label="Logo URL or local asset path"
              value={brand.logo?.src ?? ""}
              onChange={(event) =>
                setBrand({
                  ...brand,
                  logo: event.target.value
                    ? { src: event.target.value, alt: `${brand.name} logo` }
                    : undefined,
                })
              }
              description="Use an asset you own, or ask Codex to add your logo file."
            />
            <Input
              label="Website reference URL"
              value={brand.referenceUrl ?? ""}
              onChange={(event) => setBrand({ ...brand, referenceUrl: event.target.value })}
              description="Saved with your brief for Codex. This page does not import or analyze the URL."
            />
            <Select
              label="Brand font"
              value={brand.googleFont ?? "preset"}
              onValueChange={(family) =>
                setBrand({
                  ...brand,
                  ...(family === "preset"
                    ? {
                        googleFont: undefined,
                        fontFamily: (
                          pilotBrands.find((preset) => preset.id === brand.id) ?? pilotBrands[0]
                        ).fontFamily,
                      }
                    : googleFontProfile(family)),
                })
              }
              description="Google Fonts. Applied to your previews, exported code, and installed block."
            >
              <SelectItem value="preset">Keep the brand preset font</SelectItem>
              {googleFontFamilies.map((family) => (
                <SelectItem key={family} value={family}>
                  {family}
                </SelectItem>
              ))}
            </Select>
          </Grid>
          <div role="group" aria-label="Preview theme" className="flex flex-wrap gap-2">
            {([null, "light", "dark"] as const).map((mode) => (
              <Button
                key={mode ?? "auto"}
                variant={modeOverride === mode ? "solid" : "outline"}
                aria-pressed={modeOverride === mode}
                onClick={() => setModeOverride(mode)}
              >
                {mode === null
                  ? "Follow website"
                  : `${mode === "light" ? "Light" : "Dark"} preview`}
              </Button>
            ))}
          </div>
          <Text variant="small">
            The blocks follow the website theme by default. Preview a different mode whenever you
            need to.
          </Text>
        </Container>
      </Section>

      <Section spacing="none">
        <Container size="fluid" gutter="none" className="space-y-6">
          <Heading as="h2" size="h2">
            2. Choose how the story unfolds
          </Heading>
          <Grid cols={2} gap="md">
            {pilotCompositions.map((item) => (
              <Card key={item.id} variant="bordered" className="overflow-hidden p-5 shadow-none">
                <div
                  className="bg-muted pointer-events-none relative mb-6 h-52 overflow-hidden rounded-lg"
                  aria-hidden="true"
                >
                  <iframe
                    title={`${item.name} thumbnail`}
                    loading="lazy"
                    tabIndex={-1}
                    src={previewUrl(item.id)}
                    style={{
                      width: 1280,
                      height: 850,
                      transform: "scale(0.34)",
                      transformOrigin: "top left",
                      border: 0,
                    }}
                  />
                </div>
                <Heading as="h3" size="h4">
                  {item.name}
                </Heading>
                <Text className="mt-3">{item.rationale}</Text>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    aria-pressed={chosen === item.id}
                    variant={chosen === item.id ? "solid" : "outline"}
                    onClick={() => {
                      setChosen(item.id);
                      setHero(item.hero);
                    }}
                  >
                    Choose {item.name.toLowerCase()}
                  </Button>
                  <Button
                    href={previewUrl(item.id)}
                    target="_blank"
                    rel="noreferrer"
                    variant="plain"
                  >
                    Open full preview
                  </Button>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section spacing="none">
        <Container size="fluid" gutter="none" className="space-y-6">
          <Heading as="h2" size="h2">
            3. Change one part, keep your brand
          </Heading>
          {!composition ? (
            <Text role="status">
              Choose a composition above to begin. Your page will appear here.
            </Text>
          ) : (
            <>
              <div role="group" aria-label="Hero layout" className="flex flex-wrap gap-2">
                {Object.values(pilotHeroes).map((config) => (
                  <Button
                    key={config.variant}
                    size="sm"
                    variant={hero.variant === config.variant ? "solid" : "outline"}
                    aria-pressed={hero.variant === config.variant}
                    onClick={() => setHero(config)}
                  >
                    {heroLabels[config.variant]}
                  </Button>
                ))}
              </div>
              <MarketingPreview
                title={`${brand.name} · ${composition.name}`}
                subtitle="All hero layouts share the same content and brand. The other sections stay in place."
                code={code}
                skill={pilotSkill}
                minHeight={600}
              >
                <StartupPage
                  brand={brand}
                  composition={{ ...composition, hero }}
                  content={startupContent}
                />
              </MarketingPreview>
              <Button asChild variant="outline">
                <a
                  href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportConfig, null, 2))}`}
                  download="hudbird-brand-composition.json"
                >
                  Download brand and composition
                </a>
              </Button>
            </>
          )}
        </Container>
      </Section>

      <Section spacing="none">
        <Container size="fluid" gutter="none" className="space-y-6">
          <Heading as="h2" size="h2">
            The five hero starting points
          </Heading>
          {Object.values(pilotHeroes).map((config) => (
            <MarketingPreview
              key={config.variant}
              title={heroLabels[config.variant]}
              code={`import { BrandScope, HeroSection } from "@/components/hudbird-ui/HeroSection";\nimport { pilotBrands, pilotHeroes, startupContent } from "@/components/hudbird-ui/StartupPilot";\n\n<BrandScope brand={pilotBrands[0]}>\n  <HeroSection content={startupContent.hero} config={pilotHeroes.${config.variant}} />\n</BrandScope>`}
              skill={pilotSkill}
            >
              <BrandScope brand={brand}>
                <HeroSection content={startupContent.hero} config={config} />
              </BrandScope>
            </MarketingPreview>
          ))}
          <ApiTable
            title="HeroSection"
            rows={[
              {
                prop: "content",
                type: "HeroContent",
                required: true,
                description:
                  "Shared title, description, and actions. Preserved when the layout changes.",
              },
              {
                prop: "config",
                type: "HeroSectionConfig",
                required: true,
                description:
                  "A discriminated union: centered, split, slideshow, video, or interactive, with the matching media.",
              },
              {
                prop: "id",
                type: "string",
                description:
                  "Optional section anchor. Wrap in BrandScope or use inside StartupPage.",
              },
            ]}
          />
          <ApiTable
            title="StartupPage"
            rows={[
              {
                prop: "brand",
                type: "BrandProfile",
                required: true,
                description:
                  "Name, logo, primary color, font family, radius, density, mode, and optional reference URL.",
              },
              {
                prop: "composition",
                type: "PageComposition",
                required: true,
                description: "Selected hero and ordered content sections.",
              },
              {
                prop: "content",
                type: "StartupPageContent",
                required: true,
                description: "Your own hero, benefits, demo, FAQ, CTA, and footer content.",
              },
            ]}
          />
        </Container>
      </Section>
    </div>
  );
}
