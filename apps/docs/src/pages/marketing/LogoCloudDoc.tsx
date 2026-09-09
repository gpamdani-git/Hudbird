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
    svg: <img src="/assets/marketing-section/logo/react-dev-logo.png" alt="React" className="h-9 w-auto object-contain" />
  },
  {
    name: "OpenAI",
    svg: <img src="/assets/marketing-section/logo/openai-com-brandmark.svg" alt="OpenAI" className="h-9 w-auto object-contain dark:invert" />
  },
  {
    name: "NPM",
    svg: <img src="/assets/marketing-section/logo/npmjs-com-logo.png" alt="NPM" className="h-9 w-auto object-contain" />
  },
  {
    name: "Claude",
    svg: <img src="/assets/marketing-section/logo/ai-claude-net-logo.png" alt="Claude" className="h-9 w-auto object-contain" />
  },
  {
    name: "Nike",
    svg: <img src="/assets/marketing-section/logo/nike-com-brandmark.svg" alt="Nike" className="h-9 w-auto object-contain dark:invert" />
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
    <div className="flex flex-col w-full pb-20">
      <div className="sticky top-14 z-30 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8 transition-all border-b border-zinc-200/50 dark:border-zinc-800/50 mb-8">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          {onOpenSidebar && (
            <button 
              onClick={onOpenSidebar}
              className="p-1.5 -ml-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
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
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
            Logo Clouds
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl text-balance">
            Build trust with your visitors by displaying the logos of companies that use your product. Choose between static grids and infinite ticker animations.
          </p>
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="logo-cloud" manualCode={logoCloudCode} />
        </div>

        <div className="flex flex-col gap-16 mt-16">
          <MarketingPreview title="Static Grid" skill={skillContent} code={staticGridCode} minHeight={200}>
            <LogoCloud>
              <LogoCloudTitle>Trusted by the world's most innovative teams</LogoCloudTitle>
              <LogoCloudGrid>
                {logos.map((logo, i) => (
                  <LogoCloudItem key={i}>
                    {logo.svg}
                  </LogoCloudItem>
                ))}
              </LogoCloudGrid>
            </LogoCloud>
          </MarketingPreview>

          <MarketingPreview title="Infinite Marquee Ticker" skill={skillContent} code={tickerCode} minHeight={200}>
            <LogoCloud>
              <LogoCloudTitle>Join thousands of companies building with us</LogoCloudTitle>
              <LogoCloudTicker speed="normal">
                {logos.map((logo, i) => (
                  <LogoCloudItem key={i}>
                    {logo.svg}
                  </LogoCloudItem>
                ))}
                {logos.map((logo, i) => (
                  <LogoCloudItem key={i + 'clone'}>
                    {logo.svg}
                  </LogoCloudItem>
                ))}
              </LogoCloudTicker>
            </LogoCloud>
          </MarketingPreview>
        </div>

        <section id="component-api" className="scroll-mt-24 space-y-4 mt-16">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Component API
          </h2>
          <ApiTable rows={apiRows} />
        </section>
      </div>
    </div>
  );
}
