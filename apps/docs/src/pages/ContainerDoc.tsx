// apps/docs/src/pages/ContainerDoc.tsx
import React, { useState } from "react";
import containerCode from "../../../../packages/core/src/components/Container/Container.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import { Container, Button, Badge, cn } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { BookOpen, Maximize2, ShieldCheck, Check } from "lucide-react";

export const containerTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "size-variants", title: "Width Constraints & Miller's Law" },
      { id: "prose-channel", title: "Prose Channel (65ch Reading Measure)" },
      { id: "responsive-gutters", title: "Responsive Gutter Padding" },
      { id: "polymorphic", title: "Polymorphic Semantic Markup" },
    ],
  },
];

export default function ContainerDoc() {
  const [size, setSize] = useState<"sm" | "md" | "prose" | "lg" | "xl" | "2xl" | "fluid">("xl");
  const [gutter, setGutter] = useState<"none" | "sm" | "md" | "lg">("md");

  const apiRows: ApiPropRow[] = [
    {
      prop: "size",
      defaultVal: '"xl"',
      description:
        '"sm" (640px) | "md" (768px) | "prose" (65ch) | "lg" (1024px) | "xl" (1280px) | "2xl" (1440px) | "fluid".',
    },
    {
      prop: "gutter",
      defaultVal: '"md"',
      description: '"none" | "sm" (16px) | "md" (16-32px) | "lg" (24-48px Stitch monumental).',
    },
    {
      prop: "centered",
      defaultVal: "true",
      description: "Applies auto horizontal margins (mx-auto).",
    },
    {
      prop: "as",
      defaultVal: '"div"',
      description:
        'Polymorphic HTML tag: "div" | "main" | "article" | "header" | "footer" | "nav".',
    },
  ];

  return (
    <div className="space-y-24 pb-32 sm:space-y-32">
      {/* Header */}
      <DocHeader
        category="Layouts"
        title="Container"
        badge="Macro Primitive"
        description="Responsive horizontal constraint enforcing Miller's Law reading channel, anisotropic edge gutters, and optical centering."
      />

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Installation
        </h2>
        <InstallationTabs componentName="container" manualCode={containerCode} />
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

        {/* 1. Size Variants */}
        <div id="size-variants" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Width Constraints & Miller's Law
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Switch container widths to preview responsive bounding thresholds:
          </p>

          <ComponentPreview>
            <div className="w-full space-y-6">
              <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                {(["sm", "md", "prose", "lg", "xl", "2xl", "fluid"] as const).map((s) => {
                  const isActive = size === s;
                  return (
                    <Button
                      key={s}
                      size="xs"
                      variant={isActive ? "solid" : "light"}
                      color={isActive ? "white" : "zinc"}
                      onClick={() => setSize(s)}
                      className={cn(
                        "cursor-pointer text-xs font-medium",
                        isActive
                          ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      size="{s}"
                    </Button>
                  );
                })}
              </div>

              <div className="w-full rounded-2xl border border-dashed border-zinc-300 bg-zinc-100/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                <Container
                  size={size}
                  gutter={gutter}
                  className="border-primary/30 bg-primary/10 rounded-xl border py-6 text-center"
                >
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    Active Size: {size}
                  </span>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Centered with auto margins and responsive edge gutters.
                  </p>
                </Container>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`<Container size="${size}" gutter="${gutter}">\n  <div>Page Content</div>\n</Container>`}
          />
        </div>

        {/* 2. Prose Channel */}
        <div id="prose-channel" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Prose Channel (65ch Reading Measure)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enforces{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              max-w-3xl
            </code>{" "}
            (768px) for articles, guides, and documentations to eliminate eye tracking fatigue:
          </p>

          <ComponentPreview>
            <Container
              size="prose"
              className="border-border bg-card space-y-4 rounded-2xl border p-6 sm:p-8"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary h-5 w-5" />
                <h4 className="text-foreground text-lg font-bold">Cognitive Reading Measure</h4>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                In typography and visual ergonomics, eye strain increases dramatically when lines of
                text extend beyond 75 characters. Using{" "}
                <code className="text-foreground font-semibold">
                  &lt;Container size="prose"&gt;
                </code>{" "}
                locks copy into an optimal reading cadence.
              </p>
            </Container>
          </ComponentPreview>

          <CodeBlock
            language="tsx"
            code={`<Container size="prose">\n  <article>\n    <h2>Cognitive Reading Measure</h2>\n    <p>Optimal line length prevents eye fatigue.</p>\n  </article>\n</Container>`}
          />
        </div>

        {/* 3. Responsive Gutters */}
        <div id="responsive-gutters" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Responsive Gutter Padding
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Adheres to the Anisotropic Vision ratio to safeguard edge touch margins on small
            screens:
          </p>

          <ComponentPreview>
            <div className="w-full space-y-4">
              <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]">
                {(["none", "sm", "md", "lg"] as const).map((g) => {
                  const isActive = gutter === g;
                  return (
                    <Button
                      key={g}
                      size="xs"
                      variant={isActive ? "solid" : "light"}
                      color={isActive ? "white" : "zinc"}
                      onClick={() => setGutter(g)}
                      className={cn(
                        "cursor-pointer text-xs font-medium",
                        isActive
                          ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      gutter="{g}"
                    </Button>
                  );
                })}
              </div>

              <div className="border-border bg-card overflow-hidden rounded-2xl border">
                <Container size="xl" gutter={gutter} className="py-4">
                  <div className="border-primary/40 bg-primary/5 rounded-lg border border-dashed p-4 text-center">
                    <span className="text-primary text-sm font-semibold">
                      Gutter Applied: {gutter}
                    </span>
                  </div>
                </Container>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* 4. Polymorphic Markup */}
        <div id="polymorphic" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Polymorphic Semantic Markup
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Render accessible semantic landmarks (
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              &lt;main&gt;
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              &lt;article&gt;
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              &lt;header&gt;
            </code>
            ) without losing styling:
          </p>

          <CodeBlock
            language="tsx"
            code={`// Renders as semantic <main> landmark tag\n<Container as="main" size="xl">\n  <Section>...</Section>\n</Container>\n\n// Renders as semantic <article>\n<Container as="article" size="prose">\n  <h1>Article Title</h1>\n</Container>`}
          />
        </div>
      </section>
    </div>
  );
}
