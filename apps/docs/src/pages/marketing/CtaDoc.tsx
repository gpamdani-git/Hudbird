import React from "react";
import { CtaCentered, CtaSplit, CtaGlass } from "@hudbird/marketing";
import { IdeCodeBlock } from "../../components/IdeCodeBlock";
import { MarketingPreview } from "../../components/MarketingPreview";
import { TableOfContents } from "../../components/TableOfContents";
import ctaCenteredCode from "../../../../../packages/marketing/src/components/Cta/CtaCentered.tsx?raw";
import ctaGlassCode from "../../../../../packages/marketing/src/components/Cta/CtaGlass.tsx?raw";
import { PageToolbar } from "../../components/PageToolbar";
import { InstallationTabs } from "../../components/InstallationTabs";

import { Sparkles } from "lucide-react";

export default function CtaDoc() {
  const tocItems = [
    {
      id: "examples",
      title: "Examples",
      children: [
        { id: "centered", title: "Centered CTA" },
        { id: "split", title: "Split Layout CTA" },
        { id: "glass", title: "Glassmorphic CTA" },
      ],
    },
    {
      id: "api",
      title: "API Reference",
      children: [{ id: "props", title: "Shared Props" }],
    },
  ];

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl items-start gap-12 px-4 pt-24 pb-24 sm:px-8 lg:px-12">
        <div className="min-w-0 flex-1">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="w-full min-w-0 flex-1 pr-4">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Call to Action
              </h1>
              <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                Persuasive, highly visible sections designed to drive conversions. Perfect for the
                bottom of a landing page or feature page.
              </p>
            </div>
            <PageToolbar />
          </div>

          {/* EXAMPLES SECTION */}
          <section id="examples" className="mt-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Examples
            </h2>
            <div className="mt-6 space-y-16">
              {/* Centered CTA */}
              <div id="centered" className="scroll-mt-20">
                <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Centered CTA
                </h3>
                <MarketingPreview>
                  <CtaCentered
                    badge={
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-indigo-500/20 ring-inset dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/30">
                        <Sparkles className="h-4 w-4" /> Version 2.0 is out
                      </span>
                    }
                    title="Boost your productivity. Start using our app today."
                    description="Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea."
                    primaryAction={{
                      label: "Get started",
                      onClick: () => alert("Get started clicked"),
                    }}
                    secondaryAction={{
                      label: "Learn more",
                      href: "#",
                    }}
                  />
                </MarketingPreview>
              </div>

              {/* Split CTA */}
              <div id="split" className="scroll-mt-20">
                <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Split Layout CTA
                </h3>
                <MarketingPreview>
                  <CtaSplit
                    badge={
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-indigo-500/20 ring-inset dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/30">
                        Ready to start?
                      </span>
                    }
                    title="Join thousands of developers."
                    description="Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam."
                    imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2850&q=80"
                    primaryAction={{
                      label: "Get started",
                      href: "#",
                    }}
                    secondaryAction={{
                      label: "Learn more",
                      href: "#",
                    }}
                  />
                </MarketingPreview>
              </div>

              {/* Glassmorphic CTA */}
              <div id="glass" className="scroll-mt-20">
                <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Glassmorphic CTA
                </h3>
                <MarketingPreview>
                  <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-indigo-950/20">
                    {/* Add ambient glowing orbs */}
                    <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-[100px]" />
                    <div className="absolute right-1/4 bottom-0 h-96 w-96 translate-x-1/2 rounded-full bg-cyan-500/30 blur-[100px]" />

                    <CtaGlass
                      badge={
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-indigo-900 ring-1 ring-indigo-500/20 backdrop-blur-md ring-inset dark:bg-indigo-500/10 dark:text-indigo-200 dark:ring-indigo-500/30">
                          <Sparkles className="h-4 w-4" /> Ready to take control?
                        </span>
                      }
                      title="Ready to Take Control of Your Health?"
                      description="Get expert care for weight loss, sexual health, wellness, and more — all from the comfort of home, no insurance needed."
                      primaryAction={{
                        label: "Start Now",
                        href: "#",
                      }}
                      secondaryAction={{
                        label: "Contact Us",
                        href: "#",
                      }}
                    />
                  </div>
                </MarketingPreview>
              </div>
            </div>
          </section>

          <div id="installation" className="mt-24 scroll-mt-20">
            <InstallationTabs componentName="cta" manualCode={ctaCenteredCode} />
          </div>

          {/* API REFERENCE */}
          <section id="api" className="mt-24 scroll-mt-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              API Reference
            </h2>

            <div id="props" className="mb-12 scroll-mt-20">
              <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                CTA Props
              </h3>
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                Both <code className="font-mono text-xs">CtaCentered</code> and{" "}
                <code className="font-mono text-xs">CtaSplit</code> share mostly identical props,
                with <code className="font-mono text-xs">CtaSplit</code> having additional image
                props.
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
      </div>
    </>
  );
}

const centeredCode = `import { CtaCentered } from '@hudbird/marketing'

export default function Example() {
  return (
    <CtaCentered
      badge={<span className="...">Version 2.0 is out</span>}
      title="Boost your productivity. Start using our app today."
      description="Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam."
      primaryAction={{
        label: "Get started",
        href: "/signup",
      }}
      secondaryAction={{
        label: "Learn more",
        href: "/about",
      }}
    />
  )
}`;

const splitCode = `import { CtaSplit } from '@hudbird/marketing'

export default function Example() {
  return (
    <CtaSplit
      title="Join thousands of developers."
      description="Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis."
      imageSrc="/images/cta-graphic.jpg"
      primaryAction={{
        label: "Get started",
        href: "#",
      }}
    />
  )
}`;
