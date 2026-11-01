import React from "react";
import { CtaCentered, CtaSplit, CtaGlass } from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import ctaCenteredCode from "../../../../../packages/marketing/src/components/Cta/CtaCentered.tsx?raw";
import ctaGlassCode from "../../../../../packages/marketing/src/components/Cta/CtaGlass.tsx?raw";
import { DocHeader } from "../../components/DocHeader";
import { InstallationTabs } from "../../components/InstallationTabs";

import { Sparkles } from "lucide-react";

export default function CtaDoc() {
  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Subtitle */}
      <DocHeader
        category="Marketing"
        title="Call to Action"
        badge="Marketing"
        description="Persuasive, highly visible sections designed to drive conversions. Perfect for the bottom of a landing page or feature page."
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="cta" manualCode={ctaCenteredCode} />
      </div>

      {/* EXAMPLES SECTION */}
      <section id="examples" className="scroll-mt-24 space-y-16">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Examples
          </h2>
        </div>
        <div className="space-y-16">
          {/* Centered CTA */}
          <div id="centered" className="scroll-mt-20">
            <h3 className="font-outfit mb-4 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Centered CTA
            </h3>
            <MarketingPreview>
              <CtaCentered
                badge={
                  <span className="bg-primary/10 text-primary ring-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:ring-primary/30 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset">
                    <Sparkles className="h-4 w-4" /> Version 2.0 release
                  </span>
                }
                title="Ship faster with accessible, high-performance UI."
                description="Production-ready React components built with TypeScript, Tailwind CSS, and Framer Motion."
                primaryAction={{
                  label: "Get started",
                  onClick: () => alert("Get started clicked"),
                }}
                secondaryAction={{
                  label: "Read documentation",
                  href: "#",
                }}
              />
            </MarketingPreview>
          </div>

          {/* Split CTA */}
          <div id="split" className="scroll-mt-20">
            <h3 className="font-outfit mb-4 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Split Layout CTA
            </h3>
            <MarketingPreview>
              <CtaSplit
                badge={
                  <span className="bg-primary/10 text-primary ring-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset">
                    CLI Available
                  </span>
                }
                title="Built for modern React engineering teams."
                description="Install individual components directly into your codebase. Zero lock-in, customizable tokens, and clean dependencies."
                imageSrc="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1600"
                primaryAction={{
                  label: "Explore components",
                  href: "#",
                }}
                secondaryAction={{
                  label: "CLI installation",
                  href: "#",
                }}
              />
            </MarketingPreview>
          </div>

          {/* Glassmorphic CTA */}
          <div id="glass" className="scroll-mt-20">
            <h3 className="font-outfit mb-4 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Glassmorphic CTA
            </h3>
            <MarketingPreview>
              <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-50 to-indigo-50/30 dark:from-zinc-950 dark:to-indigo-950/20">
                {/* Ambient illumination */}
                <div className="bg-primary/10 absolute top-0 left-1/4 h-80 w-80 -translate-x-1/2 rounded-full blur-[90px]" />
                <div className="bg-primary/5 absolute right-1/4 bottom-0 h-80 w-80 translate-x-1/2 rounded-full blur-[90px]" />

                <CtaGlass
                  badge={
                    <span className="text-primary ring-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:ring-primary/30 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-sm font-medium ring-1 backdrop-blur-md ring-inset">
                      <Sparkles className="h-4 w-4" /> Ready to ship?
                    </span>
                  }
                  title="Build your next project with Hudbird UI"
                  description="Pre-built marketing sections, dashboard templates, and 30+ accessible core primitives."
                  primaryAction={{
                    label: "Get started",
                    href: "#",
                  }}
                  secondaryAction={{
                    label: "View templates",
                    href: "#",
                  }}
                />
              </div>
            </MarketingPreview>
          </div>
        </div>
      </section>

      {/* API REFERENCE */}
      <section id="api" className="scroll-mt-24 space-y-12">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          API Reference
        </h2>

        <div id="props" className="scroll-mt-20">
          <h3 className="font-outfit mb-4 text-lg font-medium text-zinc-900 dark:text-white">
            CTA Props
          </h3>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Both <code className="font-mono text-xs">CtaCentered</code> and{" "}
            <code className="font-mono text-xs">CtaSplit</code> share mostly identical props, with{" "}
            <code className="font-mono text-xs">CtaSplit</code> having additional image props.
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
              <thead className="border-b border-zinc-200 bg-zinc-50/50 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100">
                <tr>
                  <th className="px-4 py-3">Prop</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    badge
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                  <td className="px-4 py-3">Small badge element above the title</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    title
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                  <td className="px-4 py-3">Main heading for the CTA</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    description
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                  <td className="px-4 py-3">Supporting text below the title</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    primaryAction
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{`{ label: string; href?: string; onClick?: () => void }`}</td>
                  <td className="px-4 py-3">Props for the primary button</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    secondaryAction
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{`{ label: string; href?: string; onClick?: () => void }`}</td>
                  <td className="px-4 py-3">Props for the secondary button</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    imageSrc <br />
                    <span className="text-[10px] text-zinc-500">(CtaSplit only)</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3">Source URL for the right-aligned image</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

const centeredCode = `import { CtaCentered } from "@/components/hudbird-ui/Cta";

export default function Example() {
  return (
    <CtaCentered
      badge={<span className="...">Version 2.0 release</span>}
      title="Ship faster with accessible, high-performance UI."
      description="Production-ready React components built with TypeScript, Tailwind CSS, and Framer Motion."
      primaryAction={{
        label: "Get started",
        href: "/signup",
      }}
      secondaryAction={{
        label: "Read documentation",
        href: "/docs",
      }}
    />
  )
}`;

const splitCode = `import { CtaSplit } from "@/components/hudbird-ui/Cta";

export default function Example() {
  return (
    <CtaSplit
      title="Built for modern React engineering teams."
      description="Install individual components directly into your codebase. Zero lock-in, customizable tokens, and clean dependencies."
      imageSrc="/images/cta-graphic.jpg"
      primaryAction={{
        label: "Get started",
        href: "#",
      }}
    />
  )
}`;
