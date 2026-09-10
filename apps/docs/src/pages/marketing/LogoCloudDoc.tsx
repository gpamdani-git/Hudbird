import React from "react";
import logoCloudCode from "../../../../../packages/marketing/src/components/LogoCloud/LogoCloud.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import {
  LogoCloud,
  LogoCloudTitle,
  LogoCloudGrid,
  LogoCloudItem,
  LogoCloudTicker,
} from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import { ChevronRight, Menu } from "lucide-react";
import skillContent from "../../../../../.agents/skills/marketing-bento-grid/SKILL.md?raw"; // fallback skill for now

export const logoCloudTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "static-grid", title: "Static Grid" },
      { id: "infinite-ticker", title: "Infinite Ticker" },
    ],
  },
];

const logos = [
  {
    name: "React",
    svg: (
      <img
        src="/assets/marketing-section/logo/react-dev-logo.png"
        alt="React"
        className="h-9 w-auto object-contain"
      />
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <img
        src="/assets/marketing-section/logo/openai-com-brandmark.svg"
        alt="OpenAI"
        className="h-9 w-auto object-contain dark:invert"
      />
    ),
  },
  {
    name: "NPM",
    svg: (
      <img
        src="/assets/marketing-section/logo/npmjs-com-logo.png"
        alt="NPM"
        className="h-9 w-auto object-contain"
      />
    ),
  },
  {
    name: "Claude",
    svg: (
      <img
        src="/assets/marketing-section/logo/ai-claude-net-logo.png"
        alt="Claude"
        className="h-9 w-auto object-contain"
      />
    ),
  },
  {
    name: "Nike",
    svg: (
      <img
        src="/assets/marketing-section/logo/nike-com-brandmark.svg"
        alt="Nike"
        className="h-9 w-auto object-contain dark:invert"
      />
    ),
  },
];

const staticGridCode = `import { LogoCloud, LogoCloudTitle, LogoCloudGrid, LogoCloudItem } from '@hudbird/marketing'

function Example() {
  return (
    <LogoCloud>
      <LogoCloudTitle>Trusted by the world's most innovative teams</LogoCloudTitle>
      <LogoCloudGrid>
        {logos.map((logo) => (
          <LogoCloudItem key={logo.name}>
            {logo.svg}
          </LogoCloudItem>
        ))}
      </LogoCloudGrid>
    </LogoCloud>
  )
}`;

const tickerCode = `import { LogoCloud, LogoCloudTitle, LogoCloudTicker, LogoCloudItem } from '@hudbird/marketing'

function Example() {
  return (
    <LogoCloud>
      <LogoCloudTitle>Join thousands of companies building with us</LogoCloudTitle>
      <LogoCloudTicker speed="normal" direction="left">
        {logos.map((logo) => (
          <LogoCloudItem key={logo.name}>
            {logo.svg}
          </LogoCloudItem>
        ))}
      </LogoCloudTicker>
    </LogoCloud>
  )
}`;

export default function LogoCloudDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"default" | "subtle" | "transparent"',
      defaultVal: '"default"',
      description: "Controls the background color of the LogoCloud container.",
    },
    {
      prop: "speed (Ticker)",
      type: '"fast" | "normal" | "slow"',
      defaultVal: '"normal"',
      description: "Controls the animation speed of the infinite marquee.",
    },
    {
      prop: "direction (Ticker)",
      type: '"left" | "right"',
      defaultVal: '"left"',
      description: "Controls the direction of the infinite marquee.",
    },
  ];

  return (
    <div className="flex w-full flex-col pb-20">
      <div className="sticky top-14 z-30 mb-8 w-full border-b border-zinc-200/50 bg-white/80 px-4 py-4 backdrop-blur-md transition-all sm:px-6 lg:px-8 dark:border-zinc-800/50 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="-ml-1.5 hidden rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 lg:flex dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>
          )}
          <span>Marketing section</span>
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-100">Logo Clouds</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-10">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Logo Clouds
          </h1>
          <p className="max-w-3xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Build trust with your visitors by displaying the logos of companies that use your
            product. Choose between static grids and infinite ticker animations.
          </p>
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="logo-cloud" manualCode={logoCloudCode} />
        </div>

        <div className="mt-16 flex flex-col gap-16">
          <MarketingPreview
            title="Static Grid"
            skill={skillContent}
            code={staticGridCode}
            minHeight={200}
          >
            <LogoCloud>
              <LogoCloudTitle>Trusted by the world's most innovative teams</LogoCloudTitle>
              <LogoCloudGrid>
                {logos.map((logo, i) => (
                  <LogoCloudItem key={i}>{logo.svg}</LogoCloudItem>
                ))}
              </LogoCloudGrid>
            </LogoCloud>
          </MarketingPreview>

          <MarketingPreview
            title="Infinite Marquee Ticker"
            skill={skillContent}
            code={tickerCode}
            minHeight={200}
          >
            <LogoCloud>
              <LogoCloudTitle>Join thousands of companies building with us</LogoCloudTitle>
              <LogoCloudTicker speed="normal">
                {logos.map((logo, i) => (
                  <LogoCloudItem key={i}>{logo.svg}</LogoCloudItem>
                ))}
                {logos.map((logo, i) => (
                  <LogoCloudItem key={i + "clone"}>{logo.svg}</LogoCloudItem>
                ))}
              </LogoCloudTicker>
            </LogoCloud>
          </MarketingPreview>
        </div>

        <section id="component-api" className="mt-16 scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Component API
          </h2>
          <ApiTable title="LogoCloud Props" rows={apiRows} />
        </section>
      </div>
    </div>
  );
}
