import * as React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Select,
  SelectItem,
  Switch,
  Text,
  Accordion,
  AccordionItem,
} from "@hudbird/ui";
import {
  SaasLandingPage,
  landingSectionRegistry,
  createLandingPageConfig,
  parseLandingPageConfig,
  moveLandingSection,
  createLandingPageCode,
  createLandingPageRecipe,
  formaLandingContent,
  LandingBuilderShowcase,
} from "@hudbird/marketing";
import type {
  LandingPageConfig,
  LandingSectionSelection,
  LandingSectionType,
} from "@hudbird/schemas";
import { DocHeader } from "../../components/DocHeader";
import { MarketingPreview } from "../../components/MarketingPreview";
import { LandingBrandControls } from "../../components/landing/LandingBrandControls";
import { hudbirdBuilderVariants, hudbirdHomepageContent } from "../../data/hudbirdHomepage";
import { posthog } from "../../lib/posthog";

const storageKey = "hudbird-landing-builder:v1";
function restore() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved)
      return { config: createLandingPageConfig(), message: "Choose a layout for each section." };
    const config = parseLandingPageConfig(JSON.parse(saved));
    if (config) return { config, message: "Your saved page has been restored." };
    return {
      config: createLandingPageConfig(),
      message: "The saved layout could not be restored. Starting with the Forma example.",
    };
  } catch {
    return {
      config: createLandingPageConfig(),
      message: "Browser storage is unavailable. Download JSON to keep your choices.",
    };
  }
}

export default function LandingBuilderDoc() {
  const [initial] = React.useState(restore);
  const [config, setConfig] = React.useState<LandingPageConfig>(initial.config);
  const [status, setStatus] = React.useState(initial.message);
  React.useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(config));
    } catch {
      setStatus("Unable to save locally. Download JSON to keep your choices.");
    }
  }, [config]);
  const source = createLandingPageCode(config);
  const recipe = createLandingPageRecipe(config, formaLandingContent);
  const update = (type: LandingSectionType, patch: Record<string, unknown>) =>
    setConfig((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.type === type ? ({ ...section, ...patch } as LandingSectionSelection) : section
      ),
    }));
  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      posthog.capture("landing_page_code_copied", {
        section_count: config.sections.length,
        enabled_section_count: config.sections.filter((section) => section.enabled).length,
      });
      setStatus("React code copied. Install LandingPage with the Hudbird CLI before running it.");
    } catch {
      setStatus("Clipboard unavailable. Use Download React instead.");
    }
  }
  return (
    <div className="min-w-0 space-y-8 pb-24">
      <DocHeader
        category="SaaS page builder"
        title="One page. Your arrangement."
        description="Choose section layouts, adjust the brand, and take the composition into your own React project."
      />
      <div id="builder-export" className="flex scroll-mt-24 flex-wrap gap-2">
        <Button onClick={copy}>Copy React</Button>
        <Button asChild variant="outline">
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}
            download="App.tsx"
          >
            Download React
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(recipe, null, 2))}`}
            download="hudbird-page.recipe.json"
          >
            Download recipe
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(config, null, 2))}`}
            download="hudbird-landing.json"
          >
            Download JSON
          </a>
        </Button>
        <Button
          variant="plain"
          onClick={() => {
            setConfig(createLandingPageConfig());
            setStatus("Reset to the Forma example.");
          }}
        >
          Reset layout
        </Button>
        <Button href="/#/marketing/landing-sections" variant="plain">
          Browse sections
        </Button>
      </div>
      <Text role="status" aria-live="polite" variant="small">
        {status}
      </Text>
      <Card id="builder-source-preview" variant="bordered" className="scroll-mt-24 shadow-none">
        <CardHeader>
          <Heading as="h2" size="h4">
            React source preview
          </Heading>
          <Text variant="small">
            This is the same source used by Copy React and Download React.
          </Text>
        </CardHeader>
        <CardBody padding="none">
          <Text
            as="pre"
            variant="code"
            className="block max-h-80 overflow-auto rounded-none border-0 p-5 whitespace-pre"
          >
            {source}
          </Text>
        </CardBody>
      </Card>
      <Accordion id="builder-brand" className="scroll-mt-24">
        <AccordionItem itemKey="brand" title="Brand and preview theme">
          <LandingBrandControls
            brand={config.brand}
            onChange={(brand) => setConfig({ ...config, brand })}
            themeMode={config.themeMode}
            onThemeChange={(themeMode) => setConfig({ ...config, themeMode })}
          />
        </AccordionItem>
      </Accordion>
      <Card id="builder-motion" variant="bordered" className="scroll-mt-24 shadow-none">
        <CardHeader>
          <Heading as="h2" size="h4">
            Motion
          </Heading>
          <Text variant="small">
            Calm defaults with reduced-motion support. These settings are saved in the recipe.
          </Text>
        </CardHeader>
        <CardBody className="space-y-5">
          <Select
            label="Scroll reveal"
            value={config.motion?.reveal ?? "subtle"}
            onValueChange={(reveal) =>
              setConfig({
                ...config,
                motion: {
                  ...(config.motion ?? { reveal: "subtle", autoplay: true, smoothScroll: true }),
                  reveal: reveal as "off" | "subtle",
                },
              })
            }
          >
            <SelectItem value="subtle">Subtle reveal</SelectItem>
            <SelectItem value="off">No reveal</SelectItem>
          </Select>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Text className="font-medium">Autoplay motion</Text>
              <Text variant="small">Run continuous motion such as the logo ticker.</Text>
            </div>
            <Switch
              checked={config.motion?.autoplay ?? true}
              aria-label="Autoplay motion"
              onChange={(event) =>
                setConfig({
                  ...config,
                  motion: {
                    ...(config.motion ?? { reveal: "subtle", autoplay: true, smoothScroll: true }),
                    autoplay: event.target.checked,
                  },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Text className="font-medium">Smooth section navigation</Text>
              <Text variant="small">Move between visible sections without a hard jump.</Text>
            </div>
            <Switch
              checked={config.motion?.smoothScroll ?? true}
              aria-label="Smooth section navigation"
              onChange={(event) =>
                setConfig({
                  ...config,
                  motion: {
                    ...(config.motion ?? { reveal: "subtle", autoplay: true, smoothScroll: true }),
                    smoothScroll: event.target.checked,
                  },
                })
              }
            />
          </div>
        </CardBody>
      </Card>
      <Grid
        id="builder-workspace"
        layout="bento-1-2"
        gap="lg"
        align="start"
        className="scroll-mt-24 [&>*]:min-w-0"
      >
        <Card
          id="builder-sections"
          variant="bordered"
          className="max-h-[75dvh] overflow-y-auto shadow-none lg:sticky lg:top-20"
        >
          <CardHeader>
            <Heading as="h2" size="h4">
              Section order
            </Heading>
          </CardHeader>
          <CardBody padding="none" className="px-4 pb-4">
            {config.sections.map((selection, index) => {
              const definition = landingSectionRegistry.find(
                (item) => item.type === selection.type
              )!;
              const fixed = selection.type === "navbar" || selection.type === "footer";
              return (
                <div
                  key={selection.type}
                  data-builder-section={selection.type}
                  className="border-border space-y-3 border-t py-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Text className="font-medium">{definition.title}</Text>
                    <Switch
                      checked={selection.enabled}
                      aria-label={`Show ${definition.title}`}
                      onChange={(event) => {
                        update(selection.type, { enabled: event.target.checked });
                        setStatus(
                          `${definition.title} ${event.target.checked ? "shown" : "hidden"}.`
                        );
                      }}
                    />
                  </div>
                  <Select
                    label={`${definition.title} layout`}
                    value={selection.variant}
                    onValueChange={(variant) => {
                      update(selection.type, { variant });
                      setStatus(`${definition.title} layout updated.`);
                    }}
                  >
                    {[...definition.variants, ...(definition.additionalVariants ?? [])].map(
                      (variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name}
                        </SelectItem>
                      )
                    )}
                  </Select>
                  {!fixed ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={index <= 1}
                        aria-label={`Move ${definition.title} up`}
                        onClick={() => {
                          setConfig((current) => moveLandingSection(current, selection.type, -1));
                          setStatus(`${definition.title} moved up.`);
                        }}
                      >
                        Up
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={index >= config.sections.length - 2}
                        aria-label={`Move ${definition.title} down`}
                        onClick={() => {
                          setConfig((current) => moveLandingSection(current, selection.type, 1));
                          setStatus(`${definition.title} moved down.`);
                        }}
                      >
                        Down
                      </Button>
                    </div>
                  ) : (
                    <Text variant="small">
                      {selection.type === "navbar"
                        ? "Pinned to the beginning"
                        : "Pinned to the end"}
                    </Text>
                  )}
                </div>
              );
            })}
          </CardBody>
        </Card>
        <div className="min-w-0">
          <MarketingPreview
            isolateViewport
            title={`${config.brand.name} landing page`}
            subtitle="The preview and both exports use the same configuration."
            code={source}
            minHeight={600}
          >
            <SaasLandingPage config={config} content={formaLandingContent} />
          </MarketingPreview>
        </div>
      </Grid>
      <MarketingPreview
        title="LandingBuilderShowcase"
        subtitle="A public, embeddable block for comparing hero compositions without changing the brand or content."
        code={`import { LandingBuilderShowcase } from "@/components/hudbird-ui/LandingBuilderShowcase";

<LandingBuilderShowcase
  brand={brand}
  content={content}
  variants={variants}
  initialVariant="split"
  builderHref="/builder"
/>`}
        minHeight={520}
      >
        <LandingBuilderShowcase
          brand={config.brand}
          content={hudbirdHomepageContent.hero.content}
          variants={hudbirdBuilderVariants}
          initialVariant="split"
          builderHref="#builder-export"
        />
      </MarketingPreview>
      <Text variant="small">
        Install the full page with <code>npx hudbird-ui add LandingPage</code>, or install only the
        public comparison block with <code>npx hudbird-ui add LandingBuilderShowcase</code>. Then
        use the downloaded App.tsx. Local CLI verification is required until this collection is
        published. Content, prices, logos, and quotations are labeled examples.
      </Text>
    </div>
  );
}
