// apps/docs/src/pages/TextDoc.tsx
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import textCode from "../../../../packages/core/src/components/Text/Text.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { Text, Strong, Code, Lead, Eyebrow, Kbd, Blockquote, Mark, Button } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const textTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "typography-scale", title: "Typographic Editorial Scale" },
      { id: "gradient-and-eyebrow", title: "Gradient & Eyebrow Badges" },
      { id: "keyboard-shortcuts", title: "Keyboard Keycaps (<Kbd>)" },
      { id: "blockquote-and-quotes", title: "Blockquote & Citations" },
      { id: "line-clamping", title: "Line Clamping (<Text clamp={...}>)" },
    ],
  },
];

export default function TextDoc() {
  const [clamped, setClamped] = useState(true);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"default" | "prose" | "lead" | "eyebrow" | "strong" | "muted" | "small" | "subtle" | "gradient" | "quote" | "code"',
      defaultVal: '"default"',
      description: "Visual typographic styling conforming to the Stitch Editorial standard.",
    },
    {
      prop: "weight",
      type: '"light" | "normal" | "medium" | "semibold" | "bold"',
      defaultVal: "undefined",
      description: "Font-weight override for typographic hierarchy.",
    },
    {
      prop: "align",
      type: '"left" | "center" | "right" | "justify"',
      defaultVal: '"left"',
      description: "Text alignment utility.",
    },
    {
      prop: "color",
      type: '"default" | "muted" | "primary" | "secondary" | "success" | "danger" | "warning"',
      defaultVal: '"default"',
      description: "Polarity-aware tokenized color assignment.",
    },
    {
      prop: "clamp",
      type: "1 | 2 | 3 | 4 | 5",
      defaultVal: "undefined",
      description: "Truncates multiline paragraph text cleanly with an ellipsis.",
    },
    {
      prop: "as",
      type: "React.ElementType",
      defaultVal: '"p" (for Text), "strong" (for Strong), "code" (for Code)',
      description: "Polymorphic prop to render as a different HTML element tag.",
    },
  ];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Subtitle */}
      <DocHeader
        category="PRIMITIVES"
        title="Text"
        badge="Typography"
        description="Comprehensive typographic primitives for body copy, editorial leads, monospaced code chips, keyboard keycaps, and line-clamped content blocks."
      />

      {/* Typographic Editorial Scale */}
      <section id="typography-scale" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Typographic Editorial Scale
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Carefully calibrated letter spacing, optical contrast, and line heights for long-form
            reading and dense dashboards.
          </p>
        </div>

        <ComponentPreview>
          <div className="w-full max-w-2xl space-y-6 text-left">
            <div>
              <Eyebrow>Editorial System</Eyebrow>
              <Lead className="mt-2">
                Hudbird UI is designed to assert visual authority through deliberate typography,
                kinetic spring physics, and obsidian surface depth.
              </Lead>
            </div>

            <Text variant="prose">
              The relationship between human cognition and typography relies on strict Gestalt
              proximity and measure limits. By constraining prose to{" "}
              <Strong>65 characters per line</Strong>, the reader's saccadic eye movement remains
              relaxed, reducing cognitive strain across dense technical documentation.
            </Text>

            <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200/80 pt-4 dark:border-white/10">
              <Text variant="small">Updated 2 hours ago</Text>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Text variant="muted">5 min read</Text>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Text variant="subtle">STITCH-TYPO-V4</Text>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Text, Lead, Eyebrow, Strong } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="space-y-4">
      <Eyebrow>Editorial System</Eyebrow>
      <Lead>Hudbird UI asserts visual authority through deliberate typography.</Lead>
      <Text variant="prose">
        By constraining prose to <Strong>65 characters per line</Strong>, saccadic eye movement remains relaxed.
      </Text>
      <Text variant="muted">5 min read</Text>
    </div>
  );
}`}
        />
      </section>

      {/* Gradient & Eyebrow Badges */}
      <section id="gradient-and-eyebrow" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Gradient &amp; Eyebrow Typography
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            High-contrast text treatment for product taglines, hero accents, and brand
            announcements.
          </p>
        </div>

        <ComponentPreview>
          <div className="w-full max-w-xl space-y-3 text-left">
            <Text variant="gradient" className="text-2xl sm:text-3xl">
              Next-Generation Artificial Intelligence
            </Text>
            <Text variant="muted">
              Built on top of native Tailwind v4 @theme tokens and zero-latency physics.
            </Text>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`<Text variant="gradient" className="text-3xl">
  Next-Generation Artificial Intelligence
</Text>`}
        />
      </section>

      {/* Keyboard Shortcuts Keycaps (<Kbd>) */}
      <section id="keyboard-shortcuts" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Keyboard Keycaps (&lt;Kbd&gt;)
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Tactile physical keycap representations for documenting hotkeys, command triggers, and
            system accelerators.
          </p>
        </div>

        <ComponentPreview>
          <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Quick Search:</span>
              <div className="flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </div>
            </div>

            <div className="hidden h-4 w-px bg-zinc-200 sm:block dark:bg-white/10" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Save Snapshot:</span>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <Kbd>Shift</Kbd>
                <Kbd>S</Kbd>
              </div>
            </div>

            <div className="hidden h-4 w-px bg-zinc-200 sm:block dark:bg-white/10" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Dismiss:</span>
              <Kbd>Esc</Kbd>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Kbd } from "@hudbird/ui";

export default function Shortcuts() {
  return (
    <div className="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  );
}`}
        />
      </section>

      {/* Blockquote & Citations */}
      <section id="blockquote-and-quotes" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Blockquote &amp; Citations
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Editorial quote callouts with primary indigo edge highlight and author attribution
            footer.
          </p>
        </div>

        <ComponentPreview>
          <div className="w-full max-w-xl text-left">
            <Blockquote author="Steve Jobs, 2003">
              Design is not just what it looks like and feels like. Design is how it works.
            </Blockquote>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Blockquote } from "@hudbird/ui";

export default function Quote() {
  return (
    <Blockquote author="Steve Jobs, 2003">
      Design is not just what it looks like and feels like. Design is how it works.
    </Blockquote>
  );
}`}
        />
      </section>

      {/* Line Clamping */}
      <section id="line-clamping" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Line Clamping (&lt;Text clamp=&#123;...&#125;&gt;)
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Enforce strict visual limits on cards and preview feeds with zero layout jumping.
          </p>
        </div>

        <ComponentPreview>
          <div className="w-full max-w-md space-y-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-5 text-left dark:border-white/10 dark:bg-white/[0.02]">
            <Text clamp={clamped ? 2 : undefined} className="text-sm leading-relaxed">
              Google Stitch and Apple Human Interface Guidelines mandate strict containment for all
              dynamic card feeds. Long unstructured strings must be truncated cleanly to prevent
              card height discrepancies, preserving visual cadence across asymmetric bento blocks.
            </Text>
            <Button size="sm" variant="outline" onClick={() => setClamped(!clamped)}>
              {clamped ? "Show Full Text" : "Collapse Text"}
            </Button>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`<Text clamp={2}>
  This long paragraph will be clamped strictly to 2 lines with a trailing ellipsis...
</Text>`}
        />
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Installation
        </h2>
        <InstallationTabs componentName="Text" manualCode={textCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable rows={apiRows} />
      </section>
    </div>
  );
}
