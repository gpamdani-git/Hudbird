// apps/docs/src/pages/IconBoxDoc.tsx
import React, { useState } from "react";
import iconBoxCode from "../../../../packages/core/src/components/IconBox/IconBox.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { DocHeader } from "../components/DocHeader";
import { IconBox, Button, Badge } from "@hudbird/ui";
import {
  Sparkles,
  Zap,
  Shield,
  Terminal,
  Flame,
  ArrowUpRight,
  Layers,
  Cpu,
  Fingerprint,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const iconBoxTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "interactive-playground", title: "Interactive Playground" },
      { id: "variants", title: "Visual Variants" },
      { id: "sizes", title: "Scale & Dimensions" },
      { id: "bento-showcase", title: "Bento Feature Grid" },
    ],
  },
];

export default function IconBoxDoc() {
  const [selectedVariant, setSelectedVariant] = useState<
    "default" | "brand" | "glass" | "subtle" | "solid"
  >("brand");
  const [selectedSize, setSelectedSize] = useState<"sm" | "md" | "lg">("md");
  const [showGlow, setShowGlow] = useState(true);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"default" | "brand" | "glass" | "subtle" | "solid"',
      defaultVal: '"default"',
      description: "Visual styling and backdrop blur treatment of the icon frame container.",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      defaultVal: '"md"',
      description:
        "Geometric scale: sm (36px / w-9 h-9), md (48px / w-12 h-12), lg (56px / w-14 h-14).",
    },
    {
      prop: "icon",
      type: "React.ComponentType<{ className?: string; strokeWidth?: number | string }>",
      defaultVal: "undefined",
      description: "Lucide or custom SVG icon component passed directly to be sized automatically.",
    },
    {
      prop: "showGlow",
      type: "boolean",
      defaultVal: "true",
      description: "Enables specular backlight glow halo that illuminates on hover.",
    },
    {
      prop: "classNames",
      type: "{ base?: string; glow?: string; icon?: string }",
      defaultVal: "undefined",
      description:
        "Granular slot-level class overrides for base container, glow halo, and icon node.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      defaultVal: "undefined",
      description:
        "Fallback custom slot for custom SVG icons or complex elements when icon prop is omitted.",
    },
    {
      prop: "className",
      type: "string",
      defaultVal: "undefined",
      description: "Additional Tailwind CSS classes merged via cn() utility.",
    },
  ];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Introduction */}
      <DocHeader
        category="Components"
        title="Icon Box"
        badge="Primitive"
        description="Ergonomic icon container tile engineered with Apple HIG frosted glass, specular backlight glow halo, and spring tactile feedback for feature cards, bento grids, and stat tiles."
      />

      {/* Hero Interactive Playground */}
      <section id="interactive-playground" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Interactive Playground
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Tune variants, dimensions, and specular backlight glow in real-time.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-white/[0.08] dark:bg-[#161618]/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Variant:
            </span>
            {(["default", "brand", "glass", "subtle", "solid"] as const).map((v) => (
              <Button
                key={v}
                size="sm"
                variant={selectedVariant === v ? "solid" : "flat"}
                color={selectedVariant === v ? "primary" : "secondary"}
                onClick={() => setSelectedVariant(v)}
              >
                {v}
              </Button>
            ))}
          </div>

          <div className="hidden h-4 w-[1px] bg-zinc-200 sm:block dark:bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Size:
            </span>
            {(["sm", "md", "lg"] as const).map((s) => (
              <Button
                key={s}
                size="sm"
                variant={selectedSize === s ? "solid" : "flat"}
                color={selectedSize === s ? "primary" : "secondary"}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </Button>
            ))}
          </div>

          <div className="hidden h-4 w-[1px] bg-zinc-200 sm:block dark:bg-white/10" />

          <Button
            size="sm"
            variant={showGlow ? "solid" : "bordered"}
            color={showGlow ? "primary" : "secondary"}
            onClick={() => setShowGlow(!showGlow)}
          >
            Glow: {showGlow ? "ON" : "OFF"}
          </Button>
        </div>

        <ComponentPreview>
          <div className="group flex flex-col items-center justify-center gap-4 py-12">
            <IconBox
              variant={selectedVariant}
              size={selectedSize}
              showGlow={showGlow}
              icon={Sparkles}
            />
            <p className="text-xs text-zinc-400">
              Hover over the icon tile to reveal specular halo
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { IconBox } from "@hudbird/ui";
import { Sparkles } from "lucide-react";

export function Example() {
  return (
    <div className="group">
      <IconBox
        variant="${selectedVariant}"
        size="${selectedSize}"
        showGlow={${showGlow}}
        icon={Sparkles}
      />
    </div>
  );
}`}
        />
      </section>

      {/* Installation */}
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="icon-box" manualCode={iconBoxCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable rows={apiRows} />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="font-outfit mb-2 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Examples
          </h2>
        </div>

        {/* 1. All Visual Variants */}
        <div id="variants" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Visual Variants
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose from five calibrated styling tiers matching any backdrop lightness and contrast:
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-2 gap-6 py-6 sm:grid-cols-5">
              <div className="group flex flex-col items-center gap-2">
                <IconBox variant="default" icon={Zap} />
                <span className="font-mono text-xs text-zinc-500">default</span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox variant="brand" icon={Sparkles} />
                <span className="font-mono text-xs text-zinc-500">brand</span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox variant="glass" icon={Shield} />
                <span className="font-mono text-xs text-zinc-500">glass</span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox variant="subtle" icon={Terminal} />
                <span className="font-mono text-xs text-zinc-500">subtle</span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox variant="solid" icon={Flame} />
                <span className="font-mono text-xs text-zinc-500">solid</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { IconBox } from "@hudbird/ui";
import { Zap, Sparkles, Shield, Terminal, Flame } from "lucide-react";

<IconBox variant="default" icon={Zap} />
<IconBox variant="brand" icon={Sparkles} />
<IconBox variant="glass" icon={Shield} />
<IconBox variant="subtle" icon={Terminal} />
<IconBox variant="solid" icon={Flame} />`}
          />
        </div>

        {/* 2. Scale & Dimensions */}
        <div id="sizes" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Scale & Dimensions
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Available in three optical sizes: <code className="font-mono text-xs">sm</code> (36px),{" "}
            <code className="font-mono text-xs">md</code> (48px), and{" "}
            <code className="font-mono text-xs">lg</code> (56px).
          </p>

          <ComponentPreview>
            <div className="flex items-end justify-center gap-8 py-6">
              <div className="group flex flex-col items-center gap-2">
                <IconBox size="sm" variant="brand" icon={Zap} />
                <span className="font-mono text-xs text-zinc-500">sm (36px)</span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox size="md" variant="brand" icon={Zap} />
                <span className="font-mono text-xs text-zinc-500">md (48px)</span>
              </div>
              <div className="group flex flex-col items-center gap-2">
                <IconBox size="lg" variant="brand" icon={Zap} />
                <span className="font-mono text-xs text-zinc-500">lg (56px)</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { IconBox } from "@hudbird/ui";
import { Zap } from "lucide-react";

<IconBox size="sm" variant="brand" icon={Zap} />
<IconBox size="md" variant="brand" icon={Zap} />
<IconBox size="lg" variant="brand" icon={Zap} />`}
          />
        </div>

        {/* 3. Bento Feature Grid Showcase */}
        <div id="bento-showcase" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Bento Feature Grid
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Integrate <code className="font-mono text-xs">IconBox</code> seamlessly inside SaaS
            feature cards and bento grids:
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <div className="group hover:border-brand-500/40 relative rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-lg dark:border-white/[0.08] dark:bg-[#161618]">
                <div className="mb-4 flex items-center justify-between">
                  <IconBox variant="brand" size="md" icon={Cpu} />
                  <Badge variant="outline" size="sm">
                    Edge
                  </Badge>
                </div>
                <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                  Neural Inference Engine
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  Sub-millisecond routing across 300+ edge PoPs with automated tensor pruning.
                </p>
              </div>

              <div className="group hover:border-brand-500/40 relative rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-lg dark:border-white/[0.08] dark:bg-[#161618]">
                <div className="mb-4 flex items-center justify-between">
                  <IconBox variant="glass" size="md" icon={Fingerprint} />
                  <Badge variant="outline" size="sm">
                    Auth
                  </Badge>
                </div>
                <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                  Biometric Passkey Vault
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  Hardware-backed WebAuthn enclave protection with zero-knowledge cryptographic
                  proofs.
                </p>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { IconBox, Badge } from "@hudbird/ui";
import { Cpu } from "lucide-react";

export function BentoCard() {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-[#161618] p-6 hover:border-brand-500/40">
      <div className="flex items-center justify-between mb-4">
        <IconBox variant="brand" size="md" icon={Cpu} />
        <Badge variant="outline">Edge</Badge>
      </div>
      <h4 className="font-semibold text-white">Neural Inference Engine</h4>
      <p className="text-xs text-zinc-500">Sub-millisecond routing across 300+ edge PoPs.</p>
    </div>
  );
}`}
          />
        </div>
      </section>
    </div>
  );
}
