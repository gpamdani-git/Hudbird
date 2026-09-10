// apps/docs/src/pages/HeadingDoc.tsx
import headingCode from "../../../../packages/core/src/components/Heading/Heading.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import {
  Heading,
  type HeadingLevel,
  type HeadingSize,
  type HeadingTracking,
  type HeadingColor,
  Button,
} from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const headingTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "semantic-hierarchy", title: "Semantic Hierarchy (H1 - H6)" },
      { id: "heading-colors-and-styles", title: "Heading Colors & Styles" },
      { id: "heading-with-divider", title: "Heading with Divider" },
      { id: "interactive-customizer", title: "Interactive Customizer" },
    ],
  },
];

export default function HeadingDoc() {
  const [selectedTag, setSelectedTag] = useState<HeadingLevel>("h1");
  const [selectedSize, setSelectedSize] = useState<HeadingSize>("h1");
  const [selectedColor, setSelectedColor] = useState<HeadingColor>("default");
  const [selectedTracking, setSelectedTracking] = useState<HeadingTracking>("tight");
  const [withDivider, setWithDivider] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "as",
      defaultVal: "'h1'",
      description: (
        <span>
          Specifies the rendered semantic HTML heading tag:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h1'
          </code>{" "}
          |{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h2'
          </code>{" "}
          |{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h3'
          </code>{" "}
          |{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h4'
          </code>{" "}
          |{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h5'
          </code>{" "}
          |{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h6'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "inherits 'as'",
      description: (
        <span>
          Typography scale token:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h1'
          </code>{" "}
          (4xl/5xl),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h2'
          </code>{" "}
          (3xl),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h3'
          </code>{" "}
          (2xl),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h4'
          </code>{" "}
          (xl),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h5'
          </code>{" "}
          (lg),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'h6'
          </code>{" "}
          (base), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'inherit'
          </code>
          . Defaults to matching the <code className="font-mono text-[11px]">as</code> prop.
        </span>
      ),
    },
    {
      prop: "tracking",
      defaultVal: "auto / 'tight'",
      description: (
        <span>
          Letter-spacing density:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'tighter'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'tight'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'normal'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'wide'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "color",
      defaultVal: "'default'",
      description: (
        <span>
          Heading text color archetype:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'default'
          </code>{" "}
          (high-contrast),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'muted'
          </code>{" "}
          (secondary/subtitles), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'primary'
          </code>{" "}
          (accent indigo).
        </span>
      ),
    },
    {
      prop: "withDivider",
      defaultVal: "false",
      description:
        "When true, appends a subtle bottom border and breathing room to cleanly separate content sections.",
    },
    {
      prop: "className",
      defaultVal: "-",
      description:
        "Custom CSS classes merged via cn() for text alignments, transforms, and extra styling.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Heading
          </h1>
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Typographic heading primitives rendered with semantic HTML levels (H1–H6), optical
          letter-spacing, fluid responsiveness, and native dark mode contrast.
        </p>
      </div>

      {/* Hero Showcase Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-2xl space-y-4 py-6">
            <Heading as="h1">Design systems engineered for craft.</Heading>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Every detail is calibrated for visual rhythm, mathematical spacing, and seamless dark
              mode fidelity.
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Heading } from '@hudbird/ui'

export default function Example() {
  return (
    <div className="space-y-4">
      <Heading as="h1">Design systems engineered for craft.</Heading>
      <p className="text-zinc-600 dark:text-zinc-400">
        Every detail is calibrated for visual rhythm.
      </p>
    </div>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="heading" manualCode={headingCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note="Heading supports all standard HTML heading element attributes."
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* 1. Semantic Hierarchy (H1 - H6) */}
        <div id="semantic-hierarchy" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Semantic Hierarchy (H1 - H6)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A full typographic progression demonstrating distinct sizes, weights, and automatic
            optical letter-spacing across all six standard heading levels:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-2xl space-y-6 py-4">
              <div className="space-y-1">
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                  Heading 1 (text-4xl / md:text-5xl)
                </span>
                <Heading as="h1">The quick brown fox jumps over the lazy dog</Heading>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                  Heading 2 (text-3xl)
                </span>
                <Heading as="h2">The quick brown fox jumps over the lazy dog</Heading>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                  Heading 3 (text-2xl)
                </span>
                <Heading as="h3">The quick brown fox jumps over the lazy dog</Heading>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                  Heading 4 (text-xl)
                </span>
                <Heading as="h4">The quick brown fox jumps over the lazy dog</Heading>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                  Heading 5 (text-lg)
                </span>
                <Heading as="h5">The quick brown fox jumps over the lazy dog</Heading>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                  Heading 6 (text-base)
                </span>
                <Heading as="h6">The quick brown fox jumps over the lazy dog</Heading>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Heading } from '@hudbird/ui'

export default function HierarchyExample() {
  return (
    <div className="space-y-6">
      <Heading as="h1">The quick brown fox jumps over the lazy dog</Heading>
      <Heading as="h2">The quick brown fox jumps over the lazy dog</Heading>
      <Heading as="h3">The quick brown fox jumps over the lazy dog</Heading>
      <Heading as="h4">The quick brown fox jumps over the lazy dog</Heading>
      <Heading as="h5">The quick brown fox jumps over the lazy dog</Heading>
      <Heading as="h6">The quick brown fox jumps over the lazy dog</Heading>
    </div>
  )
}`}
          />
        </div>

        {/* 2. Heading Colors & Styles */}
        <div id="heading-colors-and-styles" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Heading Colors & Styles
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Headings support predefined archetypal color palettes (
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              default
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              muted
            </code>
            , and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              primary
            </code>
            ) as well as external utility classes for transformations:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-2xl space-y-6 py-4">
              <div>
                <span className="mb-1 block text-xs text-zinc-400">High Contrast Default:</span>
                <Heading as="h2" color="default">
                  High-Contrast Default Heading
                </Heading>
              </div>

              <div>
                <span className="mb-1 block text-xs text-zinc-400">Primary Brand Accent:</span>
                <Heading as="h2" color="primary">
                  Primary Accent Brand Heading
                </Heading>
              </div>

              <div>
                <span className="mb-1 block text-xs text-zinc-400">Muted / Subtitle Tone:</span>
                <Heading as="h2" color="muted">
                  Subdued & Muted Section Heading
                </Heading>
              </div>

              <div>
                <span className="mb-1 block text-xs text-zinc-400">
                  Custom Uppercase Tracking Utility:
                </span>
                <Heading
                  as="h5"
                  tracking="wide"
                  className="font-bold text-zinc-400 uppercase dark:text-zinc-500"
                >
                  Telemetry & Infrastructure Logs
                </Heading>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Heading } from '@hudbird/ui'

{/* 1. Default high-contrast */}
<Heading as="h2" color="default">
  High-Contrast Default Heading
</Heading>

{/* 2. Primary brand accent */}
<Heading as="h2" color="primary">
  Primary Accent Brand Heading
</Heading>

{/* 3. Muted subtitle style */}
<Heading as="h2" color="muted">
  Subdued & Muted Section Heading
</Heading>

{/* 4. Tracking with uppercase transformation */}
<Heading as="h5" tracking="wide" className="uppercase text-zinc-400 font-bold">
  Telemetry & Infrastructure Logs
</Heading>`}
          />
        </div>

        {/* 3. Heading with Divider */}
        <div id="heading-with-divider" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Heading with Divider
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              withDivider
            </code>{" "}
            to automatically produce a clean hairline bottom divider with optimized baseline spacing
            for dashboard pages and article layouts:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-2xl space-y-8 py-4">
              {/* Section 1 */}
              <div>
                <Heading as="h2" withDivider>
                  Security & Access Control
                </Heading>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Manage multi-factor authentication preferences, active OAuth application tokens,
                  and team permission grants.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <Heading as="h3" withDivider color="primary">
                  Billing & Payment Methods
                </Heading>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Your team is currently on the Pro Tier. Automatic monthly top-ups will occur on
                  the first calendar day of each billing cycle.
                </p>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Heading } from '@hudbird/ui'

export default function ArticleSections() {
  return (
    <div className="space-y-8">
      <div>
        <Heading as="h2" withDivider>
          Security & Access Control
        </Heading>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Manage multi-factor authentication preferences and team permissions.
        </p>
      </div>

      <div>
        <Heading as="h3" withDivider color="primary">
          Billing & Payment Methods
        </Heading>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your team is currently on the Pro Tier.
        </p>
      </div>
    </div>
  )
}`}
          />
        </div>

        {/* 4. Interactive Customizer */}
        <div id="interactive-customizer" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Interactive Customizer
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Test combinations of semantic HTML tags, optical sizes, tracking presets, colors, and
            divider states in real-time:
          </p>

          {/* Interactive controls bar */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            {/* HTML Tag */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Tag (as)
              </label>
              <select
                value={selectedTag}
                onChange={(e) => {
                  const val = e.target.value as HeadingLevel;
                  setSelectedTag(val);
                  setSelectedSize(val);
                }}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
                <option value="h4">h4</option>
                <option value="h5">h5</option>
                <option value="h6">h6</option>
              </select>
            </div>

            {/* Size Scale */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Size Scale
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as HeadingSize)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="h1">h1 (4xl/5xl)</option>
                <option value="h2">h2 (3xl)</option>
                <option value="h3">h3 (2xl)</option>
                <option value="h4">h4 (xl)</option>
                <option value="h5">h5 (lg)</option>
                <option value="h6">h6 (base)</option>
              </select>
            </div>

            {/* Color Archetype */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Color
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value as HeadingColor)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="muted">Muted</option>
              </select>
            </div>

            {/* Tracking Presets */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Tracking
              </label>
              <select
                value={selectedTracking}
                onChange={(e) => setSelectedTracking(e.target.value as HeadingTracking)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="tighter">Tighter</option>
                <option value="tight">Tight</option>
                <option value="normal">Normal</option>
                <option value="wide">Wide</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={withDivider ? "solid" : "outline"}
              color={withDivider ? "indigo" : "zinc"}
              onClick={() => setWithDivider(!withDivider)}
            >
              Toggle withDivider: {withDivider ? "Enabled" : "Disabled"}
            </Button>
          </div>

          <ComponentPreview>
            <div className="w-full max-w-2xl py-6">
              <Heading
                as={selectedTag}
                size={selectedSize}
                color={selectedColor}
                tracking={selectedTracking}
                withDivider={withDivider}
              >
                Crafting modern interfaces with precision
              </Heading>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                This preview renders a semantic{" "}
                <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  &lt;{selectedTag}&gt;
                </code>{" "}
                tag with size{" "}
                <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  "{selectedSize}"
                </code>
                , color{" "}
                <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  "{selectedColor}"
                </code>
                , and tracking{" "}
                <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  "{selectedTracking}"
                </code>
                .
              </p>
            </div>
          </ComponentPreview>
        </div>
      </section>
    </div>
  );
}
