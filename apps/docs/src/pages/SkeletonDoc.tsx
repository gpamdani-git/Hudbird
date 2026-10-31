import React from "react";
import { DocHeader } from "../components/DocHeader";
import skeletonCode from "../../../../packages/core/src/components/Skeleton/Skeleton.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { Skeleton } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { Card, CardBody, CardHeader } from "@hudbird/ui";

export const skeletonTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-usage", title: "Basic Usage" },
      { id: "shapes", title: "Shapes & Variants" },
      { id: "animations", title: "Animations (Pulse & Wave)" },
      { id: "composition", title: "Layout Composition" },
    ],
  },
];

export default function SkeletonDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: '"rect"',
      description: (
        <>
          The visual shape of the skeleton.
          <br />
          <code className="text-xs text-indigo-600 dark:text-indigo-400">
            "rect" | "circle" | "text"
          </code>
        </>
      ),
    },
    {
      prop: "animation",
      defaultVal: '"pulse"',
      description: (
        <>
          The animation style to indicate loading state.
          <br />
          <code className="text-xs text-indigo-600 dark:text-indigo-400">
            "pulse" | "wave" | "none"
          </code>
        </>
      ),
    },
    {
      prop: "className",
      defaultVal: "undefined",
      description: "Additional CSS classes for custom sizing and overrides.",
    },
  ];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Header */}
      <DocHeader
        category="Components"
        title="Skeleton"
        badge="Core"
        description="A placeholder component to show content is loading with customizable shapes and smooth pulse/wave animations."
      />

      {/* Hero Preview */}
      <section className="mt-8 space-y-4">
        <ComponentPreview>
          <div className="flex w-full max-w-sm items-center gap-4 py-8">
            <Skeleton variant="circle" className="h-16 w-16 shrink-0" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
              <Skeleton variant="text" className="w-full" />
            </div>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`import { Skeleton } from "@/components/hudbird-ui/Skeleton";

export function App() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" className="w-16 h-16" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-full" />
      </div>
    </div>
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="skeleton" manualCode={skeletonCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable rows={apiRows} />
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-20 sm:space-y-24">
        <div>
          <h2 className="font-outfit mb-2 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Examples
          </h2>
        </div>

        {/* 1. Basic Usage */}
        <div id="basic-usage" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Basic Usage
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            By default, the Skeleton renders as a <code>rect</code> with a <code>pulse</code>{" "}
            animation. Use <code>className</code> to set explicit width and height.
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xs">
              <Skeleton className="h-32 w-full" />
            </div>
          </ComponentPreview>
          <CodeBlock code={`<Skeleton className="w-full h-32" />`} />
        </div>

        {/* 2. Shapes */}
        <div id="shapes" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Shapes & Variants
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Skeletons come in three variants: <code>rect</code> (default), <code>circle</code>, and{" "}
            <code>text</code>.
          </p>

          <ComponentPreview>
            <div className="flex w-full max-w-sm flex-col gap-6">
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" className="h-12 w-12" />
                <span className="text-sm font-medium text-zinc-500">circle</span>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton variant="rect" className="h-12 w-16" />
                <span className="text-sm font-medium text-zinc-500">rect</span>
              </div>
              <div className="flex w-full flex-1 items-center gap-4">
                <div className="w-full">
                  <Skeleton variant="text" />
                </div>
                <span className="shrink-0 text-sm font-medium text-zinc-500">text</span>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Skeleton variant="circle" className="w-12 h-12" />
<Skeleton variant="rect" className="w-16 h-12" />
<Skeleton variant="text" className="w-full" />`}
          />
        </div>

        {/* 3. Animations */}
        <div id="animations" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Animations
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose between <code>pulse</code> (default), <code>wave</code> (shimmer effect), or{" "}
            <code>none</code>.
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Skeleton animation="pulse" className="h-24 w-full" />
                <div className="text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Pulse
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton animation="wave" className="h-24 w-full" />
                <div className="text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Wave
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton animation="none" className="h-24 w-full" />
                <div className="text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  None
                </div>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Skeleton animation="pulse" className="h-24" />
<Skeleton animation="wave" className="h-24" />
<Skeleton animation="none" className="h-24" />`}
          />
        </div>

        {/* 4. Composition */}
        <div id="composition" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Layout Composition
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Combine Skeleton components inside your actual layout wrappers (like Cards) to perfectly
            match the loaded state structure.
          </p>

          <ComponentPreview>
            <div className="w-full max-w-sm">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton variant="circle" className="h-10 w-10 shrink-0" />
                    <div className="w-full space-y-2">
                      <Skeleton variant="text" className="w-1/2" />
                      <Skeleton variant="text" className="w-1/3" />
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="space-y-3">
                  <Skeleton variant="text" className="w-full" />
                  <Skeleton variant="text" className="w-[90%]" />
                  <Skeleton variant="text" className="w-[95%]" />
                  <Skeleton variant="rect" className="mt-4 h-32 w-full" />
                </CardBody>
              </Card>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Card>
  <CardHeader>
    <div className="flex gap-4 items-center">
      <Skeleton variant="circle" className="w-10 h-10 shrink-0" />
      <div className="space-y-2 w-full">
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/3" />
      </div>
    </div>
  </CardHeader>
  <CardBody className="space-y-3">
    <Skeleton variant="text" className="w-full" />
    <Skeleton variant="text" className="w-[90%]" />
    <Skeleton variant="text" className="w-[95%]" />
    <Skeleton variant="rect" className="w-full h-32 mt-4" />
  </CardBody>
</Card>`}
          />
        </div>
      </section>
    </div>
  );
}
