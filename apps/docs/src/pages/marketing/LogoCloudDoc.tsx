import React from "react";
import { DocHeader } from "../../components/DocHeader";
import logoCloudCode from "../../../../../packages/marketing/src/components/LogoCloud/LogoCloud.tsx?raw";
import logoCloudGlassCode from "../../../../../packages/marketing/src/components/LogoCloud/LogoCloudGlass.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import {
  LogoCloud,
  LogoCloudTitle,
  LogoCloudGrid,
  LogoCloudItem,
  LogoCloudTicker,
  LogoCloudGlass,
} from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
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
      { id: "glass", title: "Glassmorphic Logo Cloud" },
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

const staticGridCode = `import { LogoCloud, LogoCloudTitle, LogoCloudGrid, LogoCloudItem } from "@/components/hudbird-ui/LogoCloud";

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

const tickerCode = `import { LogoCloud, LogoCloudTitle, LogoCloudTicker, LogoCloudItem } from "@/components/hudbird-ui/LogoCloud";

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
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Subtitle */}
      <DocHeader
        category="Marketing"
        title="Logo Clouds"
        badge="Marketing"
        description="Build trust with your visitors by displaying the logos of companies that use your product. Choose between static grids and infinite ticker animations."
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="logo-cloud" manualCode={logoCloudCode} />
      </div>

      <div className="flex flex-col gap-16">
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

        {/* Glassmorphic Logo Cloud */}
        <div id="glass" className="scroll-mt-24">
          <MarketingPreview
            title="Glassmorphic Logo Cloud"
            code={logoCloudGlassCode}
            minHeight={200}
          >
            <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-indigo-950/20">
              <div className="absolute top-1/2 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[100px]" />
              <div className="absolute top-1/2 right-1/4 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/30 blur-[100px]" />

              <LogoCloudGlass
                title="Trusted by the world's most innovative teams"
                logos={[
                  { name: "React", url: "/assets/marketing-section/logo/react-dev-logo.png" },
                  {
                    name: "OpenAI",
                    url: "/assets/marketing-section/logo/openai-com-brandmark.svg",
                  },
                  { name: "NPM", url: "/assets/marketing-section/logo/npmjs-com-logo.png" },
                  {
                    name: "Claude",
                    url: "/assets/marketing-section/logo/ai-claude-net-logo.png",
                  },
                  { name: "Nike", url: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
                ]}
              />
            </div>
          </MarketingPreview>
        </div>
      </div>

      <section id="component-api" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <ApiTable title="LogoCloud Props" rows={apiRows} />
        </div>
        <div>
          <h3 className="font-outfit mb-4 text-lg font-medium text-zinc-900 dark:text-white">
            LogoCloudGlass Props
          </h3>
          <ApiTable
            title="LogoCloudGlass"
            rows={[
              {
                prop: "logos",
                type: "LogoGlassItem[]",
                defaultVal: "-",
                description: "Array of logo objects with name and url.",
              },
              {
                prop: "title",
                type: "string",
                defaultVal: '"Trusted by..."',
                description: "Optional heading text above the logos.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
