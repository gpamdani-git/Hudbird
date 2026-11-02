// apps/docs/src/pages/SectionDoc.tsx
import React, { useState } from "react";
import sectionCode from "../../../../packages/core/src/components/Section/Section.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import { Section, Container, Button, Badge, cn } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { Layers, Sparkles, Check, ArrowRight } from "lucide-react";

export const sectionTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "vertical-rhythm", title: "Vertical Spatial Rhythm" },
      { id: "surfaces", title: "Obsidian & Surface Variants" },
      { id: "hairline-borders", title: "Specular Hairline Borders" },
      { id: "safe-viewport", title: "Safe 100dvh Fullscreen Section" },
    ],
  },
];

export default function SectionDoc() {
  const [spacing, setSpacing] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const [variant, setVariant] = useState<"default" | "muted" | "card" | "obsidian">("default");
  const [bordered, setBordered] = useState<boolean | "top" | "bottom" | "both">(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "spacing",
      defaultVal: '"md"',
      description:
        '"none" | "xs" | "sm" | "md" | "lg" | "xl" locked to the 8-point spatial rhythm.',
    },
    {
      prop: "variant",
      defaultVal: '"default"',
      description: '"default" | "muted" | "card" | "inverted" | "obsidian" surface styling.',
    },
    {
      prop: "bordered",
      defaultVal: "false",
      description: 'Adds specular hairline borders: true | "top" | "bottom" | "both" | false.',
    },
    {
      prop: "fullHeight",
      defaultVal: "false",
      description:
        "Applies mobile-safe min-h-[100dvh] eliminating iOS Safari toolbar layout jumps.",
    },
    {
      prop: "as",
      defaultVal: '"section"',
      description:
        'Semantic HTML tag: "section" | "div" | "main" | "article" | "header" | "footer".',
    },
  ];

  return (
    <div className="space-y-24 pb-32 sm:space-y-32">
      {/* Header */}
      <DocHeader
        category="Layouts"
        title="Section"
        badge="Macro Primitive"
        description="Semantic macro content chunk enforcing monumental vertical whitespace, Obsidian surfaces, and safe 100dvh viewport rhythm."
      />

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Installation
        </h2>
        <InstallationTabs componentName="section" manualCode={sectionCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable rows={apiRows} />
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-20 sm:space-y-28">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Examples
          </h2>
        </div>

        {/* 1. Vertical Spatial Rhythm */}
        <div id="vertical-rhythm" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Vertical Spatial Rhythm
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Select standard 8-point spatial cadences (
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">xs</code>:
            24px,{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">md</code>:
            64px,{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">xl</code>:
            128px):
          </p>

          <ComponentPreview>
            <div className="w-full space-y-6">
              <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => {
                  const isActive = spacing === s;
                  return (
                    <Button
                      key={s}
                      size="xs"
                      variant={isActive ? "solid" : "light"}
                      color={isActive ? "white" : "zinc"}
                      onClick={() => setSpacing(s)}
                      className={cn(
                        "cursor-pointer text-xs font-medium",
                        isActive
                          ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      spacing="{s}"
                    </Button>
                  );
                })}
              </div>

              <div className="border-primary/40 bg-primary/5 overflow-hidden rounded-2xl border border-dashed">
                <Section spacing={spacing} className="text-center">
                  <Container size="md">
                    <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-xs font-semibold">
                      Spacing Cadence: {spacing}
                    </span>
                    <h4 className="mt-3 text-lg font-bold text-zinc-900 dark:text-white">
                      Monumental Breathing Room
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">
                      Eliminates claustrophobic layouts with calibrated vertical whitespace.
                    </p>
                  </Container>
                </Section>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`<Section spacing="${spacing}">\n  <Container size="md">\n    <h2>Section Title</h2>\n    <p>Section Content</p>\n  </Container>\n</Section>`}
          />
        </div>

        {/* 2. Surfaces */}
        <div id="surfaces" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Obsidian & Surface Variants
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Follows the Gestalt Law of Common Region to demarcate high-value content bands:
          </p>

          <ComponentPreview>
            <div className="w-full space-y-4">
              <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                {(["default", "muted", "card", "obsidian"] as const).map((v) => {
                  const isActive = variant === v;
                  return (
                    <Button
                      key={v}
                      size="xs"
                      variant={isActive ? "solid" : "light"}
                      color={isActive ? "white" : "zinc"}
                      onClick={() => setVariant(v)}
                      className={cn(
                        "cursor-pointer text-xs font-medium",
                        isActive
                          ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      variant="{v}"
                    </Button>
                  );
                })}
              </div>

              <div className="border-border overflow-hidden rounded-2xl border">
                <Section variant={variant} spacing="sm">
                  <Container size="md" className="text-center">
                    <h4 className="text-lg font-bold">Surface: {variant}</h4>
                    <p className="mt-1 text-sm opacity-80">
                      Grounds visual contrast without harsh OLED black clipping.
                    </p>
                  </Container>
                </Section>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`<Section variant="${variant}" spacing="sm">\n  <Container size="md">\n    <h4>Surface: ${variant}</h4>\n  </Container>\n</Section>`}
          />
        </div>

        {/* 3. Hairline Borders */}
        <div id="hairline-borders" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Specular Hairline Borders
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Adds fine architectural dividing rules without harsh dividers:
          </p>

          <ComponentPreview>
            <div className="w-full space-y-4">
              <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                {([false, "top", "bottom", "both"] as const).map((b) => {
                  const isActive = bordered === b;
                  return (
                    <Button
                      key={String(b)}
                      size="xs"
                      variant={isActive ? "solid" : "light"}
                      color={isActive ? "white" : "zinc"}
                      onClick={() => setBordered(b)}
                      className={cn(
                        "cursor-pointer text-xs font-medium",
                        isActive
                          ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      bordered={typeof b === "string" ? `"${b}"` : String(b)}
                    </Button>
                  );
                })}
              </div>

              <Section bordered={bordered} spacing="sm" className="bg-card">
                <Container size="md" className="text-center">
                  <span className="text-foreground text-sm font-medium">
                    Hairline Divider Active: {String(bordered)}
                  </span>
                </Container>
              </Section>
            </div>
          </ComponentPreview>
        </div>

        {/* 4. Safe Viewport */}
        <div id="safe-viewport" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Safe 100dvh Fullscreen Hero Section
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Uses{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              min-h-[100dvh]
            </code>{" "}
            to eliminate iOS Safari toolbar jumpiness:
          </p>

          <ComponentPreview>
            <Section
              fullHeight
              spacing="none"
              className="border-border bg-card min-h-[280px] rounded-2xl border p-8"
            >
              <Container size="md" className="space-y-4 text-center">
                <Badge color="primary" variant="soft">
                  Mobile Safe Viewport
                </Badge>
                <h3 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                  Zero Layout Shift Experience
                </h3>
                <p className="text-muted-foreground text-sm">
                  Perfect for landing hero folds, sign-in stages, and immersive full-height modals.
                </p>
                <div className="pt-2">
                  <Button color="primary" size="md">
                    Explore Platform <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Container>
            </Section>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`<Section fullHeight as="header">\n  <Container size="md">\n    <h1>Zero Layout Shift Experience</h1>\n  </Container>\n</Section>`}
          />
        </div>
      </section>
    </div>
  );
}
