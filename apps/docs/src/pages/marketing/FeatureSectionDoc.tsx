import React from "react";
import { PageToolbar } from "../../components/PageToolbar";
import featureCode from "../../../../../packages/marketing/src/components/FeatureSection/Feature.tsx?raw";
import featureGlassCode from "../../../../../packages/marketing/src/components/FeatureSection/FeatureGlass.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import {
  FeatureSection,
  FeatureHeader,
  FeatureBadge,
  FeatureTitle,
  FeatureDescription,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureCardTitle,
  FeatureCardDescription,
  FeatureAlternating,
  FeatureRow,
  FeatureRowContent,
  FeatureRowMedia,
  FeatureGlass,
} from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import { ChevronRight, Menu, Zap, Shield, Globe, Lock, Smartphone, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { ProStyleVisualEditor } from "./ProStyleVisualEditor";
import skillContent from "../../../../../.agents/skills/marketing-bento-grid/SKILL.md?raw"; // fallback skill for now

const PushToDeployIllustration = () => (
  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-indigo-100/50 bg-indigo-50/50 dark:border-indigo-800/50 dark:bg-indigo-900/20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-2xl dark:from-indigo-700/30" />

    <div className="relative z-10 flex flex-col items-center gap-4">
      <motion.div
        animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
        transition={{ repeat: Infinity, duration: 5, times: [0, 0.1, 0.8, 1] }}
        className="w-48 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl"
      >
        <div className="flex gap-1.5 border-b border-zinc-800 bg-zinc-800/50 px-3 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="h-2 w-3/4 rounded-full bg-zinc-700" />
          <div className="h-2 w-1/2 rounded-full bg-indigo-500" />
          <div className="mt-2 h-2 w-5/6 rounded-full bg-zinc-700" />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, times: [0, 0.1, 0.8, 1], delay: 0.2 }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ opacity: [0, 1, 1, 0], y: [-20, 0, 0, 20] }}
        transition={{ repeat: Infinity, duration: 5, times: [0, 0.1, 0.8, 1], delay: 0.4 }}
        className="flex items-center gap-2 rounded-full border border-zinc-100 bg-white px-4 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-zinc-900 dark:text-white">
          Deployed to Production
        </span>
      </motion.div>
    </div>

    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="absolute top-12 right-12 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl"
    />
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 5 }}
      className="absolute bottom-12 left-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl"
    />
  </div>
);

const AnalyticsIllustration = () => (
  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-sky-100/50 bg-sky-50/50 p-6 dark:border-sky-800/50 dark:bg-sky-900/20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-sky-200/50 via-transparent to-transparent blur-2xl dark:from-sky-700/30" />

    <div className="relative z-10 flex h-[60%] w-full items-end justify-center gap-2">
      {[30, 50, 40, 70, 60, 100, 80].map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: [`0%`, `${h}%`, `${h}%`, `0%`] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            times: [0, 0.2, 0.8, 1],
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className={`w-8 rounded-t-md sm:w-10 ${i === 5 ? "bg-gradient-to-t from-sky-400 to-blue-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]" : "bg-sky-200 dark:bg-sky-800/80"}`}
        />
      ))}
    </div>

    <motion.div
      animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8], y: [10, 0, 0, 10] }}
      transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.8, 1], delay: 1 }}
      className="absolute top-[15%] right-[15%] z-20 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white shadow-xl sm:right-[20%] dark:bg-white dark:text-zinc-900"
    >
      +124%
      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-zinc-900 dark:bg-white" />
    </motion.div>
  </div>
);

export const featureSectionTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "grid-layout", title: "Grid Layout" },
      { id: "alternating-layout", title: "Alternating Layout" },
      { id: "glass", title: "Glassmorphic Features" },
    ],
  },
];

const gridCode = `import { FeatureSection } from "@/components/hudbird-ui/FeatureSection";\nimport { FeatureHeader } from "@/components/hudbird-ui/FeatureHeader";\nimport { FeatureBadge } from "@/components/hudbird-ui/FeatureBadge";\nimport { FeatureTitle } from "@/components/hudbird-ui/FeatureTitle";\nimport { FeatureDescription } from "@/components/hudbird-ui/FeatureDescription";\nimport { FeatureGrid } from "@/components/hudbird-ui/FeatureGrid";\nimport { FeatureCard } from "@/components/hudbird-ui/FeatureCard";\nimport { FeatureIcon } from "@/components/hudbird-ui/FeatureIcon";\nimport { FeatureCardTitle } from "@/components/hudbird-ui/FeatureCardTitle";\nimport { FeatureCardDescription } from "@/components/hudbird-ui/FeatureCardDescription";
import { Zap, Shield, Globe, Lock, Smartphone, Cloud } from 'lucide-react'

function Example() {
  return (
    <FeatureSection>
      <FeatureHeader>
        <FeatureBadge>Deploy faster</FeatureBadge>
        <FeatureTitle>Everything you need to build your app</FeatureTitle>
        <FeatureDescription>
          Our platform provides all the tools you need to create, deploy, and scale your applications with ease and confidence.
        </FeatureDescription>
      </FeatureHeader>
      
      <FeatureGrid>
        <FeatureCard index={0}>
          <FeatureIcon><Zap size={20} /></FeatureIcon>
          <FeatureCardTitle>Lightning Fast</FeatureCardTitle>
          <FeatureCardDescription>Global edge network ensures your application loads instantly for users anywhere in the world.</FeatureCardDescription>
        </FeatureCard>
        <FeatureCard index={1}>
          <FeatureIcon><Shield size={20} /></FeatureIcon>
          <FeatureCardTitle>Enterprise Security</FeatureCardTitle>
          <FeatureCardDescription>Advanced DDoS protection and automatic SSL certificates keep your data safe and secure.</FeatureCardDescription>
        </FeatureCard>
        <FeatureCard index={2}>
          <FeatureIcon><Globe size={20} /></FeatureIcon>
          <FeatureCardTitle>Global CDN</FeatureCardTitle>
          <FeatureCardDescription>Deliver content faster with our strategically placed servers across 100+ global locations.</FeatureCardDescription>
        </FeatureCard>
        <FeatureCard index={3}>
          <FeatureIcon><Lock size={20} /></FeatureIcon>
          <FeatureCardTitle>Identity & Access</FeatureCardTitle>
          <FeatureCardDescription>Built-in authentication and role-based access control for your entire organization.</FeatureCardDescription>
        </FeatureCard>
        <FeatureCard index={4}>
          <FeatureIcon><Smartphone size={20} /></FeatureIcon>
          <FeatureCardTitle>Mobile Optimized</FeatureCardTitle>
          <FeatureCardDescription>Responsive APIs and SDKs designed specifically for mobile application performance.</FeatureCardDescription>
        </FeatureCard>
        <FeatureCard index={5}>
          <FeatureIcon><Cloud size={20} /></FeatureIcon>
          <FeatureCardTitle>Auto Scaling</FeatureCardTitle>
          <FeatureCardDescription>Never worry about traffic spikes again. Our infrastructure scales automatically with demand.</FeatureCardDescription>
        </FeatureCard>
      </FeatureGrid>
    </FeatureSection>
  )
}`;

const alternatingCode = `import { FeatureSection } from "@/components/hudbird-ui/FeatureSection";\nimport { FeatureHeader } from "@/components/hudbird-ui/FeatureHeader";\nimport { FeatureBadge } from "@/components/hudbird-ui/FeatureBadge";\nimport { FeatureTitle } from "@/components/hudbird-ui/FeatureTitle";\nimport { FeatureDescription } from "@/components/hudbird-ui/FeatureDescription";\nimport { FeatureAlternating } from "@/components/hudbird-ui/FeatureAlternating";\nimport { FeatureRow } from "@/components/hudbird-ui/FeatureRow";\nimport { FeatureRowContent } from "@/components/hudbird-ui/FeatureRowContent";\nimport { FeatureRowMedia } from "@/components/hudbird-ui/FeatureRowMedia";
import { motion } from 'framer-motion'

// Add the illustrations components here as defined above

function Example() {
  return (
    <FeatureSection variant="subtle">
      <FeatureHeader>
        <FeatureBadge>Workflow</FeatureBadge>
        <FeatureTitle>Supercharge your development</FeatureTitle>
        <FeatureDescription>
          Streamline your workflow with tools designed for modern development teams.
        </FeatureDescription>
      </FeatureHeader>
      
      <FeatureAlternating>
        <FeatureRow>
          <FeatureRowContent>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Push to deploy</h3>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Just push your code to GitHub, GitLab, or Bitbucket, and we'll automatically build and deploy your application. Every commit gets a unique preview URL.
            </p>
          </FeatureRowContent>
          <FeatureRowMedia>
            <PushToDeployIllustration />
          </FeatureRowMedia>
        </FeatureRow>
        
        <FeatureRow reverse>
          <FeatureRowContent>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Real-time analytics</h3>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Gain deep insights into your application's performance and user behavior with our built-in analytics dashboard. Monitor traffic, errors, and core web vitals in real-time.
            </p>
          </FeatureRowContent>
          <FeatureRowMedia>
            <AnalyticsIllustration />
          </FeatureRowMedia>
        </FeatureRow>
      </FeatureAlternating>
    </FeatureSection>
  )
}`;

const proStyleCode = `import { motion } from "framer-motion";

export const ProStyleVisualEditor = () => (
  <section className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32 w-full rounded-2xl border border-zinc-800 font-sans">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
    <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-900/20 blur-3xl" />
    <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl" />

    <div className="mx-auto w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16 px-4 sm:px-8 lg:px-12">
      <div className="w-full lg:w-1/3 text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-2 text-indigo-400 font-medium mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <span>Introducing Blocks</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Pro Style <br/> with UI Components
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-zinc-400">
          hudbird UI components made beautifully with love in Bali.
        </motion.p>
      </div>

      <div className="w-full lg:w-2/3 relative h-[600px] flex items-center justify-center">
        {/* Card 1: Inspiration Board */}
        <motion.div 
          initial={{ opacity: 0, y: 40, x: -20, rotate: -5 }} 
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="absolute left-0 lg:left-10 top-10 w-48 p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl"
        >
           <div className="text-xs font-medium text-zinc-400 mb-3 flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/></svg> Inspiration</div>
           <div className="grid grid-cols-2 gap-2">
             <div className="h-20 rounded-lg bg-zinc-800" />
             <div className="h-20 rounded-lg bg-zinc-800" />
             <div className="h-20 rounded-lg bg-zinc-800" />
             <div className="h-20 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold">+16</div>
           </div>
        </motion.div>

        {/* Card 2: Main Stat */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          className="absolute z-10 w-64 p-6 bg-zinc-900/90 backdrop-blur-xl rounded-3xl border border-zinc-700 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">MAU JAN 2023</span>
            <span className="text-xs text-zinc-500">Last 28 days</span>
          </div>
          <div className="text-5xl font-light text-white mb-2">52k</div>
          <div className="text-sm text-zinc-400">Marketing campaign effectiveness</div>
          <div className="mt-6 h-12 w-full flex items-end">
             <svg viewBox="0 0 100 30" className="w-full h-full stroke-indigo-500 fill-none" strokeWidth="3" strokeLinecap="round">
               <path d="M0 20 Q 20 5, 40 25 T 80 15 T 100 5" />
             </svg>
          </div>
        </motion.div>

        {/* Card 3: User Info / Road map */}
        <motion.div 
          initial={{ opacity: 0, y: -40, x: 20, rotate: 5 }} 
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          className="absolute right-0 lg:right-10 top-16 w-56 p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500" />
             <div>
               <div className="text-sm font-bold text-white">Amara Robinson</div>
               <div className="text-[10px] text-zinc-500">amara@changer.com</div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
               <div className="text-zinc-500 mb-1">18 Jan 2022</div>
               <div className="font-medium text-zinc-300">JOIN DATE</div>
            </div>
            <div>
               <div className="text-zinc-500 mb-1">72 sales</div>
               <div className="font-medium text-zinc-300">SALES MADE</div>
            </div>
          </div>
        </motion.div>
        
        {/* Card 4: Dark Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 40, x: 40 }} 
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          className="absolute right-4 lg:right-20 bottom-20 w-56 p-5 bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl"
        >
          <div className="text-xs font-medium text-zinc-400 mb-4 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"/> Our journey</div>
          <div className="relative pl-4 border-l border-zinc-800 space-y-4">
             <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-zinc-900" />
                <div className="text-sm font-medium text-zinc-200">First concept</div>
                <div className="h-12 mt-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-sky-500/20 border border-blue-500/10" />
             </div>
             <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-zinc-900" />
                <div className="text-sm font-medium text-zinc-500">When things got serious</div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
`;
export default function FeatureSectionDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"default" | "subtle" | "transparent"',
      defaultVal: '"default"',
      description: "Controls the background color of the FeatureSection container.",
    },
    {
      prop: "index (FeatureCard)",
      type: "number",
      defaultVal: "0",
      description: "Used to calculate the stagger delay for the entrance animation.",
    },
    {
      prop: "reverse (FeatureRow)",
      type: "boolean",
      defaultVal: "false",
      description: "If true, reverses the layout order (e.g. Image on left, text on right).",
    },
    {
      prop: "iconClassName (Feature.Icon)",
      type: "string",
      defaultVal: '"bg-blue-600 text-white ring-blue-500/30 ..."',
      description: "Override the Feature.Icon container colors (background, text, and ring).",
    },
    {
      prop: "glowClassName / iconClassName (FeatureGlass)",
      type: "string",
      defaultVal: '"bg-blue-500/10 dark:bg-blue-500/20" / "bg-blue-600/10 ..."',
      description: "Override the glow orb color and icon container colors in the glass variant.",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center pt-24 pb-24">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Feature Sections
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
            </div>
            <p className="pr-32 text-base text-zinc-600 sm:pr-40 lg:max-w-4xl dark:text-zinc-400">
              Highlight the key benefits and capabilities of your product. Use grids for quick
              overviews or alternating layouts for deep dives.
            </p>
          </div>
          <PageToolbar />
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="feature-section" manualCode={featureCode} />
        </div>

        <div className="mt-16 flex flex-col gap-16">
          <MarketingPreview title="Grid Layout" skill={skillContent} code={gridCode}>
            <FeatureSection>
              <FeatureHeader>
                <FeatureBadge>Deploy faster</FeatureBadge>
                <FeatureTitle>Everything you need to build your app</FeatureTitle>
                <FeatureDescription>
                  Our platform provides all the tools you need to create, deploy, and scale your
                  applications with ease and confidence.
                </FeatureDescription>
              </FeatureHeader>

              <FeatureGrid>
                <FeatureCard index={0}>
                  <FeatureIcon>
                    <Zap size={20} />
                  </FeatureIcon>
                  <FeatureCardTitle>Lightning Fast</FeatureCardTitle>
                  <FeatureCardDescription>
                    Global edge network ensures your application loads instantly for users anywhere
                    in the world.
                  </FeatureCardDescription>
                </FeatureCard>
                <FeatureCard index={1}>
                  <FeatureIcon>
                    <Shield size={20} />
                  </FeatureIcon>
                  <FeatureCardTitle>Enterprise Security</FeatureCardTitle>
                  <FeatureCardDescription>
                    Advanced DDoS protection and automatic SSL certificates keep your data safe and
                    secure.
                  </FeatureCardDescription>
                </FeatureCard>
                <FeatureCard index={2}>
                  <FeatureIcon>
                    <Globe size={20} />
                  </FeatureIcon>
                  <FeatureCardTitle>Global CDN</FeatureCardTitle>
                  <FeatureCardDescription>
                    Deliver content faster with our strategically placed servers across 100+ global
                    locations.
                  </FeatureCardDescription>
                </FeatureCard>
                <FeatureCard index={3}>
                  <FeatureIcon>
                    <Lock size={20} />
                  </FeatureIcon>
                  <FeatureCardTitle>Identity & Access</FeatureCardTitle>
                  <FeatureCardDescription>
                    Built-in authentication and role-based access control for your entire
                    organization.
                  </FeatureCardDescription>
                </FeatureCard>
                <FeatureCard index={4}>
                  <FeatureIcon>
                    <Smartphone size={20} />
                  </FeatureIcon>
                  <FeatureCardTitle>Mobile Optimized</FeatureCardTitle>
                  <FeatureCardDescription>
                    Responsive APIs and SDKs designed specifically for mobile application
                    performance.
                  </FeatureCardDescription>
                </FeatureCard>
                <FeatureCard index={5}>
                  <FeatureIcon>
                    <Cloud size={20} />
                  </FeatureIcon>
                  <FeatureCardTitle>Auto Scaling</FeatureCardTitle>
                  <FeatureCardDescription>
                    Never worry about traffic spikes again. Our infrastructure scales automatically
                    with demand.
                  </FeatureCardDescription>
                </FeatureCard>
              </FeatureGrid>
            </FeatureSection>
          </MarketingPreview>

          <MarketingPreview title="Alternating Layout" skill={skillContent} code={alternatingCode}>
            <FeatureSection variant="subtle">
              <FeatureHeader>
                <FeatureBadge>Workflow</FeatureBadge>
                <FeatureTitle>Supercharge your development</FeatureTitle>
                <FeatureDescription>
                  Streamline your workflow with tools designed for modern development teams.
                </FeatureDescription>
              </FeatureHeader>

              <FeatureAlternating>
                <FeatureRow>
                  <FeatureRowContent>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      Push to deploy
                    </h3>
                    <p className="text-base text-zinc-600 dark:text-zinc-400">
                      Just push your code to GitHub, GitLab, or Bitbucket, and we'll automatically
                      build and deploy your application. Every commit gets a unique preview URL.
                    </p>
                  </FeatureRowContent>
                  <FeatureRowMedia>
                    <PushToDeployIllustration />
                  </FeatureRowMedia>
                </FeatureRow>

                <FeatureRow reverse>
                  <FeatureRowContent>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      Real-time analytics
                    </h3>
                    <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                      Gain deep insights into your application's performance and user behavior with
                      our built-in analytics dashboard. Monitor traffic, errors, and core web vitals
                      in real-time.
                    </p>
                  </FeatureRowContent>
                  <FeatureRowMedia>
                    <AnalyticsIllustration />
                  </FeatureRowMedia>
                </FeatureRow>
              </FeatureAlternating>
            </FeatureSection>
          </MarketingPreview>

          <MarketingPreview
            title="Pro Style with UI Components"
            skill={skillContent}
            code={proStyleCode}
          >
            <ProStyleVisualEditor />
          </MarketingPreview>

          {/* Glassmorphic Features */}
          <div id="glass" className="scroll-mt-24">
            <MarketingPreview title="Glassmorphic Features" code={featureGlassCode}>
              <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-indigo-950/20">
                <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[120px]" />
                <div className="absolute top-1/2 right-1/4 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/30 blur-[120px]" />

                <FeatureGlass
                  badge={
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-indigo-900 ring-1 ring-indigo-500/20 backdrop-blur-md ring-inset dark:bg-indigo-500/10 dark:text-indigo-200 dark:ring-indigo-500/30">
                      Features
                    </span>
                  }
                  features={[
                    {
                      title: "Lightning Fast",
                      description:
                        "Global edge network ensures your application loads instantly for users anywhere in the world.",
                      icon: <Zap size={20} />,
                    },
                    {
                      title: "Enterprise Security",
                      description:
                        "Advanced DDoS protection and automatic SSL certificates keep your data safe and secure.",
                      icon: <Shield size={20} />,
                    },
                    {
                      title: "Global CDN",
                      description:
                        "Deliver content faster with our strategically placed servers across 100+ global locations.",
                      icon: <Globe size={20} />,
                    },
                    {
                      title: "Built-in Auth",
                      description:
                        "Secure, ready-to-use authentication with social logins and 2FA support.",
                      icon: <Lock size={20} />,
                    },
                    {
                      title: "Mobile Optimized",
                      description:
                        "Responsive layouts and touch-friendly components built right into the core.",
                      icon: <Smartphone size={20} />,
                    },
                    {
                      title: "Cloud Native",
                      description:
                        "Seamlessly deploy and scale with native support for major cloud providers.",
                      icon: <Cloud size={20} />,
                    },
                  ]}
                />
              </div>
            </MarketingPreview>
          </div>
        </div>

        <section id="component-api" className="mt-16 scroll-mt-24 space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Component API
            </h2>
            <ApiTable title="FeatureSection Props" rows={apiRows} />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              FeatureGlass Props
            </h3>
            <ApiTable
              title="FeatureGlass"
              rows={[
                {
                  prop: "features",
                  type: "FeatureGlassItem[]",
                  defaultVal: "-",
                  description: "Array of feature objects with icon, title, and description.",
                },
                {
                  prop: "badge",
                  type: "ReactNode",
                  defaultVal: "undefined",
                  description: "Optional badge element shown above the title.",
                },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
