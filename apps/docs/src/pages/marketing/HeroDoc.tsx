import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import heroCode from "../../../../../packages/marketing/src/components/Hero/Hero.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import { Button } from "@hudbird/ui";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroContent,
  HeroMedia,
  HeroBackground,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
} from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import { ArrowRight, ChevronRight, Play, Menu } from "lucide-react";
import skillContent from "../../../../../.agents/skills/marketing-hero/SKILL.md?raw";

// Lazy load the Three.js background for fast initial loading
const HeroThreeBackground = lazy(() =>
  import("@hudbird/marketing").then((m) => ({ default: m.HeroThreeBackground }))
);

export const heroTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "basic-hero", title: "Basic Hero" }],
  },
];

const minimalistCode = `import { Button } from '@hudbird/ui'
import { Hero, HeroHeader, HeroBody, HeroBadge, HeroTitle, HeroDescription, HeroActions } from '@hudbird/marketing'
import { ArrowRight } from 'lucide-react'

function Example() {
  return (
    <Hero size="full">
      <HeroBackground src="/assets/marketing-section/hero-bg.webp" overlayClassName="bg-white/40 dark:bg-zinc-950/80 backdrop-blur-md" />
      <HeroHeader
        logo={
          <><img src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg" alt="Logo" className="h-8 w-auto dark:hidden" /><img src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg" alt="Logo" className="h-8 w-auto hidden dark:block" /></>
        }
        links={[
          { label: "Product", href: "#" },
          { 
            label: "Features", 
            items: [
              { label: "Analytics", href: "#" },
              { label: "Security", href: "#" },
              { label: "Integrations", href: "#" },
            ]
          },
          { label: "Company", href: "#" },
        ]}
        action={<a href="#" className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 transition-colors">Log in &rarr;</a>}
      />
      <HeroBody align="center">
        <HeroBadge>
          Announcing our next round of funding. <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400 ml-1">Read more &rarr;</a>
        </HeroBadge>
        <HeroTitle>Data to enrich your online business</HeroTitle>
        <HeroDescription className="max-w-xl mx-auto">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
        </HeroDescription>
        <HeroActions className="justify-center">
          <Button color="primary">Get started <ArrowRight size={16} className="ml-1" /></Button>
          <Button variant="light">Learn more <ArrowRight size={16} className="ml-1" /></Button>
        </HeroActions>
      </HeroBody>
    </Hero>
  )
}`;

const splitCode = `import { Button } from '@hudbird/ui'
import { Hero, HeroHeader, HeroBody, HeroContent, HeroMedia, HeroBadge, HeroTitle, HeroDescription, HeroActions } from '@hudbird/marketing'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

function Example() {
  return (
    <Hero size="full" withBlobs={false} className="bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white">
      <HeroHeader
        logo={
          <>
            <img src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg" alt="Logo" className="h-8 w-auto dark:hidden" />
            <img src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg" alt="Logo" className="h-8 w-auto hidden dark:block" />
          </>
        }
        links={[{ label: "Product", href: "#" }, { label: "Features", href: "#" }]}
        action={<a href="#" className="text-sm font-semibold text-zinc-900 dark:text-white">Log in &rarr;</a>}
        className="[&_a]:text-zinc-600 dark:[&_a]:text-white [&_button]:text-zinc-900 dark:[&_button]:text-white"
      />
      <HeroBody>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent align="left">
            <HeroBadge className="text-zinc-600 dark:text-zinc-200 ring-zinc-200 dark:ring-white/20 hover:ring-zinc-300 dark:hover:ring-white/30 bg-white/50 dark:bg-white/10 backdrop-blur-md">
              New Feature Release
            </HeroBadge>
            <HeroTitle className="text-left text-5xl sm:text-6xl text-zinc-900 dark:text-white">Build faster with Hudbird UI</HeroTitle>
            <HeroDescription className="text-left text-zinc-500 dark:text-zinc-400">
              Deploy your next web application in minutes with our premium React components. Beautifully designed, accessible, and ready for production.
            </HeroDescription>
            <HeroActions>
              <Button color="primary" className="flex items-center gap-1">Start building <ArrowRight size={16} /></Button>
            </HeroActions>
          </HeroContent>
          <HeroMedia className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full"
            >
              <img src="/assets/marketing-section/split-screen-light.webp" alt="App screenshot" className="w-full h-auto max-h-[80vh] object-cover rounded-3xl shadow-xl transition-opacity duration-700 ease-in-out dark:opacity-0" />
              <img src="/assets/marketing-section/split-screen-dark.webp" alt="App screenshot" className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl shadow-2xl ring-1 ring-white/10 transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100" />
            </motion.div>
          </HeroMedia>
        </div>
      </HeroBody>
    </Hero>
  )
}`;

const overlayCode = `import { Button } from '@hudbird/ui'
import { Hero, HeroHeader, HeroBody, HeroBackground, HeroBadge, HeroTitle, HeroDescription, HeroActions } from '@hudbird/marketing'
import { Play } from 'lucide-react'

function Example() {
  return (
    <Hero size="full" withBlobs={false}>
      <HeroBackground src="/assets/marketing-section/hero-bg.webp" overlayClassName="bg-zinc-900/80 dark:bg-zinc-950/90 backdrop-blur-sm" />
      <HeroHeader
        logo={<img src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg" alt="Logo" className="h-8 w-auto" />}
        links={[{ label: "Product", href: "#" }, { label: "Features", href: "#" }]}
        action={<a href="#" className="text-sm font-semibold text-white">Log in &rarr;</a>}
        className="[&_a]:text-white [&_button]:text-white"
      />
      <HeroBody align="center">
        <HeroBadge className="text-zinc-200 ring-white/20 hover:ring-white/30 bg-white/10 backdrop-blur-md">
          Available now
        </HeroBadge>
        <HeroTitle className="text-white">Experience the future</HeroTitle>
        <HeroDescription className="text-zinc-300 max-w-xl mx-auto">
          Immersive, full-screen background images create a stunning first impression for your marketing campaigns.
        </HeroDescription>
        <HeroActions className="justify-center">
          <Button color="primary">Get started</Button>
          <Button variant="plain" className="text-white hover:bg-white/10">
            <Play size={16} className="mr-2" /> Watch video
          </Button>
        </HeroActions>
      </HeroBody>
    </Hero>
  )
}`;

const threeCode = `import React, { Suspense } from 'react'
import { Button } from '@hudbird/ui'
import { Hero, HeroHeader, HeroBody, HeroBadge, HeroTitle, HeroDescription, HeroActions } from '@hudbird/marketing'
import { ArrowRight } from 'lucide-react'

// Lazy load to prevent blocking the main thread
const HeroThreeBackground = React.lazy(() => import('@hudbird/marketing').then((m) => ({ default: m.HeroThreeBackground })))

function Example() {
  return (
    <Hero size="full" withBlobs={false}>
      <Suspense fallback={<div className="absolute inset-0 bg-zinc-950" />}>
        <HeroThreeBackground />
      </Suspense>
      <HeroHeader
        logo={<img src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg" alt="Logo" className="h-8 w-auto" />}
        links={[{ label: "Product", href: "#" }, { label: "Features", href: "#" }]}
        action={<a href="#" className="text-sm font-semibold text-white">Log in &rarr;</a>}
        className="[&_a]:text-white [&_button]:text-white"
      />
      <HeroBody align="center">
        <HeroBadge className="text-zinc-200 ring-white/20 hover:ring-white/30 bg-white/10 backdrop-blur-md">
          Interactive WebGL
        </HeroBadge>
        <HeroTitle className="text-white">Stand out from the crowd</HeroTitle>
        <HeroDescription className="text-zinc-300 max-w-xl mx-auto">
          Add a premium touch with high-performance 3D particle backgrounds powered by React Three Fiber.
        </HeroDescription>
        <HeroActions className="justify-center">
          <Button color="primary">Get started <ArrowRight size={16} className="ml-1" /></Button>
        </HeroActions>
      </HeroBody>
    </Hero>
  )
}`;

const fullImageSplitCode = `import { Button } from '@hudbird/ui'
import { Hero, HeroHeader, HeroContent } from '@hudbird/marketing'
import { ArrowRight } from 'lucide-react'

function Example() {
  return (
    <Hero size="full" withBlobs={false} className="bg-zinc-50 dark:bg-zinc-950 p-0 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col px-6 sm:px-12 xl:px-24 pt-8 pb-16 justify-center relative z-10 min-h-[50vh]">
          <HeroHeader
            logo={<img src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg" alt="Logo" className="h-8 w-auto dark:hidden" />}
            links={[{ label: "Product", href: "#" }, { label: "Features", href: "#" }]}
            action={<a href="#" className="text-sm font-semibold text-zinc-900 dark:text-white">Log in &rarr;</a>}
            className="mb-auto pb-12 w-full max-w-xl mx-auto"
          />
          <HeroContent align="left" className="max-w-xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 px-3 py-1 text-sm text-zinc-600 dark:text-zinc-300 backdrop-blur-md mb-6">
              New Feature Release
            </div>
            <h1 className="text-left text-5xl sm:text-6xl text-zinc-900 dark:text-white font-bold tracking-tight mb-6">Redefining digital experiences.</h1>
            <p className="text-left text-lg text-zinc-500 dark:text-zinc-400 mb-8">
              Create breathtaking web experiences that engage users and drive conversions with our expertly crafted UI toolkit.
            </p>
            <div className="flex items-center gap-4">
              <Button color="primary" className="flex items-center gap-1 shadow-lg shadow-primary/20">Get Started <ArrowRight size={16} /></Button>
              <Button variant="light" className="font-semibold text-zinc-700 dark:text-zinc-300">View Demo</Button>
            </div>
          </HeroContent>
          <div className="mt-auto"></div>
        </div>
        <div className="relative w-full h-full min-h-[50vh] lg:min-h-screen border-l border-zinc-200 dark:border-zinc-800">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            alt="Office Minimalist" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>
      </div>
    </Hero>
  )
}`;

const bentoGridCode = `import { Button } from '@hudbird/ui'
import { Hero, HeroHeader, HeroBody } from '@hudbird/marketing'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

function Example() {
  return (
    <Hero size="full" withBlobs={true} className="bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <HeroHeader
        logo={
          <>
            <img src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg" alt="Logo" className="h-8 w-auto dark:hidden" />
            <img src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg" alt="Logo" className="h-8 w-auto hidden dark:block" />
          </>
        }
        links={[{ label: "Products", href: "#" }, { label: "App", href: "#" }, { label: "About", href: "#" }, { label: "FAQ", href: "#" }]}
        action={
          <div className="flex items-center gap-2">
            <a href="#" className="text-sm font-semibold text-zinc-900 dark:text-white px-3 py-1">Log in</a>
            <Button size="sm" className="rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">Sign Up</Button>
          </div>
        }
      />
      <HeroBody className="pt-10">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 p-4">
          
          {/* Main Large Card (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-7 bg-[#111] dark:bg-black rounded-[2rem] p-8 sm:p-12 min-h-[450px] flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="relative z-10 text-white max-w-md">
              <div className="text-xs font-semibold tracking-wider text-zinc-400 mb-4 uppercase">Visual Editor</div>
              <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] mb-8">
                Hudbird UI is built on top of modern web technologies
              </h2>
            </div>
            <div className="relative z-10 mt-12 sm:mt-0">
              <div className="bg-white text-black inline-flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:bg-zinc-100 transition-colors cursor-pointer">
                <span>Explore editor</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
            </div>
            
            {/* Minimalist Editor Illustration */}
            <div className="absolute -right-4 -bottom-4 sm:right-4 sm:bottom-4 w-full max-w-[320px] h-[280px] bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden opacity-90 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 pointer-events-none">
              <div className="h-8 border-b border-zinc-800 flex items-center px-3 gap-1.5 bg-zinc-900/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex bg-zinc-950 p-4 gap-4">
                <div className="flex-1 border border-zinc-800/50 rounded-lg flex items-center justify-center relative overflow-hidden bg-zinc-900/20">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-400 blur-sm"></div>
                  </motion.div>
                </div>
                <div className="w-20 space-y-3">
                  <div className="h-3 bg-zinc-800 rounded w-full"></div>
                  <motion.div 
                    animate={{ width: ["100%", "60%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="h-2 bg-zinc-800 rounded"
                  />
                  <div className="h-2 bg-zinc-800 rounded w-4/5"></div>
                  <div className="h-2 bg-zinc-800 rounded w-full"></div>
                  <div className="h-2 bg-zinc-800 rounded w-3/4"></div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-5 h-5 rounded bg-zinc-800"></div>
                      <div className="w-10 h-5 rounded bg-zinc-800"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-5 h-5 rounded bg-zinc-800"></div>
                      <div className="w-10 h-5 rounded bg-zinc-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Grid */}
          <div className="md:col-span-12 lg:col-span-5 grid grid-cols-2 grid-rows-2 gap-4 lg:gap-6">
            
            {/* Top Wide Card - Layers Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="col-span-2 row-span-1 bg-zinc-200/50 dark:bg-zinc-900 rounded-[2rem] p-6 relative overflow-hidden group hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 relative z-10">Scalable Hierarchy</div>
              <h3 className="text-3xl font-medium text-zinc-900 dark:text-white mt-4 relative z-10">Layer Management</h3>
              
              <div className="mt-8 space-y-3 relative z-10">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-3 bg-white dark:bg-zinc-800/80 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm w-3/4 max-w-[200px]"
                  >
                    <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
                      <div className="w-3 h-3 border border-zinc-400 rounded-sm"></div>
                    </div>
                    <div className="h-2 bg-zinc-300 dark:bg-zinc-600 rounded w-full"></div>
                  </motion.div>
                ))}
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-zinc-300 dark:bg-zinc-700 rounded-full blur-xl opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
            </motion.div>

            {/* Bottom Left Square - Color Picker */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="col-span-1 row-span-1 bg-[#a77dfa] rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group hover:bg-[#9760ff] transition-colors"
            >
              <div>
                <div className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2 relative z-10">Design Tokens</div>
                <h3 className="text-2xl font-medium text-white relative z-10">Colors</h3>
              </div>
              
              <div className="mt-6 flex gap-2 relative z-10 justify-center">
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-white shadow-lg border-4 border-purple-200"
                />
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-black shadow-lg border-4 border-purple-800"
                />
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-[#a3ff47] shadow-lg border-4 border-[#8cee2c]"
                />
              </div>
            </motion.div>

            {/* Bottom Right Square - Responsive */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="col-span-1 row-span-1 bg-[#a3ff47] rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group hover:bg-[#8cee2c] transition-colors"
            >
              <div>
                <div className="text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2 relative z-10">Any Device</div>
                <h3 className="text-2xl font-medium text-black relative z-10">Responsive</h3>
              </div>
              
              <div className="mt-8 flex items-end justify-center gap-3 relative z-10">
                <motion.div 
                  animate={{ height: ["40px", "60px", "40px"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 bg-black/80 rounded-t-lg"
                />
                <motion.div 
                  animate={{ height: ["60px", "80px", "60px"] }}
                  transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 bg-black/60 rounded-t-lg"
                />
                <motion.div 
                  animate={{ height: ["30px", "50px", "30px"] }}
                  transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 bg-black/40 rounded-t-lg"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </HeroBody>
    </Hero>
  )
}`;

export default function HeroDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const apiRows: ApiPropRow[] = [
    {
      prop: "size",
      type: '"full" | "auto" | "fixed"',
      defaultVal: '"full"',
      description: "Controls the height of the Hero container.",
    },
    {
      prop: "withBlobs",
      type: "boolean",
      defaultVal: "true",
      description: "Toggle the aesthetic gradient blur blobs in the background.",
    },
    {
      prop: "children",
      type: "ReactNode",
      defaultVal: "-",
      description: "The content of the Hero section, typically composed of compound components.",
    },
  ];

  return (
    <div className="flex w-full flex-col pb-20">
      {/* Header section with breadcrumbs and description */}
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
          <span className="text-zinc-900 dark:text-zinc-100">Hero Section</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-10">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Hero Sections
          </h1>
          <p className="max-w-3xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Use these Tailwind CSS hero section examples to add important messaging, product photos,
            and call-to-actions to the top of your website. These hero examples are fully responsive
            and support native dark mode.
          </p>
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="hero" manualCode={heroCode} />
        </div>

        <div className="flex flex-col gap-16">
          <MarketingPreview title="Minimalist Centered" skill={skillContent} code={minimalistCode}>
            <Hero size="full">
              <HeroBackground
                src="/assets/marketing-section/hero-bg.webp"
                overlayClassName="bg-white/40 dark:bg-zinc-950/80 backdrop-blur-md"
              />
              <HeroHeader
                logo={
                  <>
                    <img
                      src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg"
                      alt="Logo"
                      className="h-8 w-auto dark:hidden"
                    />
                    <img
                      src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg"
                      alt="Logo"
                      className="hidden h-8 w-auto dark:block"
                    />
                  </>
                }
                links={[
                  { label: "Product", href: "#" },
                  {
                    label: "Features",
                    items: [
                      { label: "Analytics", href: "#" },
                      { label: "Security", href: "#" },
                      { label: "Integrations", href: "#" },
                    ],
                  },
                  { label: "Company", href: "#" },
                ]}
                action={
                  <a
                    href="#"
                    className="text-sm leading-6 font-semibold text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
                  >
                    Log in &rarr;
                  </a>
                }
              />
              <HeroBody align="center">
                <HeroBadge>
                  Announcing our next round of funding.{" "}
                  <a
                    href="#"
                    className="ml-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Read more &rarr;
                  </a>
                </HeroBadge>
                <HeroTitle>Data to enrich your online business</HeroTitle>
                <HeroDescription className="mx-auto max-w-xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                  commodo. Elit sunt amet fugiat veniam occaecat.
                </HeroDescription>
                <HeroActions className="justify-center">
                  <Button color="primary" className="flex items-center gap-1">
                    Get started <ArrowRight size={16} />
                  </Button>
                  <Button variant="light" className="flex items-center gap-1">
                    Learn more <ArrowRight size={16} />
                  </Button>
                </HeroActions>
              </HeroBody>
            </Hero>
          </MarketingPreview>

          <MarketingPreview title="Split Screen Hero" skill={skillContent} code={splitCode}>
            <Hero
              size="full"
              withBlobs={false}
              className="bg-zinc-50 text-zinc-900 dark:bg-[#050505] dark:text-white"
            >
              <HeroHeader
                logo={
                  <>
                    <img
                      src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg"
                      alt="Logo"
                      className="h-8 w-auto dark:hidden"
                    />
                    <img
                      src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg"
                      alt="Logo"
                      className="hidden h-8 w-auto dark:block"
                    />
                  </>
                }
                links={[
                  { label: "Product", href: "#" },
                  {
                    label: "Features",
                    items: [
                      { label: "Analytics", href: "#" },
                      { label: "Security", href: "#" },
                    ],
                  },
                ]}
                action={
                  <a href="#" className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Log in &rarr;
                  </a>
                }
                className="[&_a]:text-zinc-600 dark:[&_a]:text-white [&_button]:text-zinc-900 dark:[&_button]:text-white"
              />
              <HeroBody>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <HeroContent align="left">
                    <HeroBadge className="bg-white/50 text-zinc-600 ring-zinc-200 backdrop-blur-md hover:ring-zinc-300 dark:bg-white/10 dark:text-zinc-200 dark:ring-white/20 dark:hover:ring-white/30">
                      New Feature Release
                    </HeroBadge>
                    <HeroTitle className="text-left text-5xl text-zinc-900 sm:text-6xl dark:text-white">
                      Build faster with Hudbird UI
                    </HeroTitle>
                    <HeroDescription className="text-left text-zinc-500 dark:text-zinc-400">
                      Deploy your next web application in minutes with our premium React components.
                      Beautifully designed, accessible, and ready for production.
                    </HeroDescription>
                    <HeroActions>
                      <Button color="primary" className="flex items-center gap-1">
                        Start building <ArrowRight size={16} />
                      </Button>
                    </HeroActions>
                  </HeroContent>
                  <HeroMedia className="relative flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative w-full"
                    >
                      <img
                        src="/assets/marketing-section/split-screen-light.webp"
                        alt="App screenshot"
                        className="h-auto max-h-[80vh] w-full rounded-3xl object-cover shadow-xl transition-opacity duration-700 ease-in-out dark:opacity-0"
                      />
                      <img
                        src="/assets/marketing-section/split-screen-dark.webp"
                        alt="App screenshot"
                        className="absolute top-0 left-0 h-full w-full rounded-3xl object-cover opacity-0 shadow-2xl ring-1 ring-white/10 transition-opacity duration-700 ease-in-out dark:opacity-100"
                      />
                    </motion.div>
                  </HeroMedia>
                </div>
              </HeroBody>
            </Hero>
          </MarketingPreview>

          <MarketingPreview
            title="Background Image Overlay"
            skill={skillContent}
            code={overlayCode}
          >
            <Hero size="full" withBlobs={false}>
              <HeroBackground
                src="/assets/marketing-section/hero-bg.webp"
                overlayClassName="bg-zinc-900/80 dark:bg-zinc-950/90 backdrop-blur-sm"
              />
              <HeroHeader
                logo={
                  <img
                    src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg"
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                }
                links={[
                  { label: "Product", href: "#" },
                  {
                    label: "Features",
                    items: [
                      { label: "Analytics", href: "#" },
                      { label: "Security", href: "#" },
                    ],
                  },
                ]}
                action={
                  <a href="#" className="text-sm font-semibold text-white">
                    Log in &rarr;
                  </a>
                }
                className="[&_a]:text-white [&_button]:text-white"
              />
              <HeroBody align="center">
                <HeroBadge className="bg-white/10 text-zinc-200 ring-white/20 backdrop-blur-md hover:ring-white/30">
                  Available now
                </HeroBadge>
                <HeroTitle className="text-white">Experience the future</HeroTitle>
                <HeroDescription className="mx-auto max-w-xl text-zinc-300">
                  Immersive, full-screen background images create a stunning first impression for
                  your marketing campaigns.
                </HeroDescription>
                <HeroActions className="justify-center">
                  <Button color="primary">Get started</Button>
                  <Button
                    variant="plain"
                    className="flex items-center gap-1 text-white hover:bg-white/10"
                  >
                    <Play size={16} /> Watch video
                  </Button>
                </HeroActions>
              </HeroBody>
            </Hero>
          </MarketingPreview>

          <MarketingPreview
            title="Interactive WebGL Background"
            skill={skillContent}
            code={threeCode}
          >
            <Hero size="full" withBlobs={false}>
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-zinc-500">
                    Loading 3D Engine...
                  </div>
                }
              >
                <HeroThreeBackground />
              </Suspense>
              <HeroHeader
                logo={
                  <img
                    src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg"
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                }
                links={[
                  { label: "Product", href: "#" },
                  {
                    label: "Features",
                    items: [
                      { label: "Analytics", href: "#" },
                      { label: "Security", href: "#" },
                    ],
                  },
                ]}
                action={
                  <a href="#" className="text-sm font-semibold text-white">
                    Log in &rarr;
                  </a>
                }
                className="[&_a]:text-white [&_button]:text-white"
              />
              <HeroBody align="center">
                <HeroBadge className="bg-white/10 text-zinc-200 ring-white/20 backdrop-blur-md hover:ring-white/30">
                  Interactive WebGL
                </HeroBadge>
                <HeroTitle className="text-white">Stand out from the crowd</HeroTitle>
                <HeroDescription className="mx-auto max-w-xl text-zinc-300">
                  Add a premium touch with high-performance 3D particle backgrounds powered by React
                  Three Fiber.
                </HeroDescription>
                <HeroActions className="justify-center">
                  <Button color="primary" className="flex items-center gap-1">
                    Get started <ArrowRight size={16} />
                  </Button>
                </HeroActions>
              </HeroBody>
            </Hero>
          </MarketingPreview>

          <MarketingPreview
            title="Split Screen Hero (Full Image)"
            skill={skillContent}
            code={fullImageSplitCode}
          >
            <Hero
              size="full"
              withBlobs={false}
              className="overflow-hidden bg-zinc-50 p-0 dark:bg-zinc-950"
            >
              <div className="grid min-h-screen lg:grid-cols-2">
                <div className="relative z-10 flex min-h-[50vh] flex-col justify-center px-6 pt-8 pb-16 sm:px-12 xl:px-24">
                  <HeroHeader
                    logo={
                      <img
                        src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg"
                        alt="Logo"
                        className="h-8 w-auto dark:hidden"
                      />
                    }
                    links={[
                      { label: "Product", href: "#" },
                      { label: "Features", href: "#" },
                    ]}
                    action={
                      <a href="#" className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Log in &rarr;
                      </a>
                    }
                    className="mx-auto mb-auto w-full max-w-xl pb-12"
                  />
                  <HeroContent align="left" className="mx-auto max-w-xl py-24 lg:py-48">
                    <div className="mb-6 inline-flex items-center rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-sm text-zinc-600 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300">
                      New Feature Release
                    </div>
                    <HeroTitle className="mb-6 text-left text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
                      Redefining digital experiences.
                    </HeroTitle>
                    <HeroDescription className="mb-8 text-left text-lg text-zinc-500 dark:text-zinc-400">
                      Create breathtaking web experiences that engage users and drive conversions
                      with our expertly crafted UI toolkit.
                    </HeroDescription>
                    <HeroActions className="flex items-center gap-4">
                      <Button
                        color="primary"
                        className="shadow-primary/20 flex items-center gap-1 shadow-lg"
                      >
                        Get Started <ArrowRight size={16} />
                      </Button>
                      <Button
                        variant="light"
                        className="font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        View Demo
                      </Button>
                    </HeroActions>
                  </HeroContent>
                  <div className="mt-auto"></div>
                </div>
                <div className="relative h-full min-h-[50vh] w-full border-l border-zinc-200 lg:min-h-screen dark:border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069"
                    alt="Office Minimalist"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </Hero>
          </MarketingPreview>

          <MarketingPreview title="Bento Grid Hero" skill={skillContent} code={bentoGridCode}>
            <Hero
              size="full"
              withBlobs={true}
              className="overflow-hidden bg-zinc-50 dark:bg-zinc-950"
            >
              <HeroHeader
                logo={
                  <>
                    <img
                      src="/assets/marketing-section/logo-hudbird/logo-ico-black.svg"
                      alt="Logo"
                      className="h-8 w-auto dark:hidden"
                    />
                    <img
                      src="/assets/marketing-section/logo-hudbird/logo-ico-white.svg"
                      alt="Logo"
                      className="hidden h-8 w-auto dark:block"
                    />
                  </>
                }
                links={[
                  { label: "Products", href: "#" },
                  { label: "App", href: "#" },
                  { label: "About", href: "#" },
                  { label: "FAQ", href: "#" },
                ]}
                action={
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      className="px-3 py-1 text-sm font-semibold text-zinc-900 dark:text-white"
                    >
                      Log in
                    </a>
                    <Button
                      size="sm"
                      className="rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    >
                      Sign Up
                    </Button>
                  </div>
                }
              />
              <HeroBody className="pt-10">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-12 lg:gap-6">
                  {/* Main Large Card (Left) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="group relative flex min-h-[450px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#111] p-8 sm:p-12 md:col-span-12 lg:col-span-7 dark:bg-black"
                  >
                    <div className="relative z-10 max-w-md text-white">
                      <div className="mb-4 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                        Visual Editor
                      </div>
                      <h2 className="mb-8 text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
                        Hudbird UI is built on top of modern web technologies
                      </h2>
                    </div>
                    <div className="relative z-10 mt-12 sm:mt-0">
                      <div className="inline-flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-zinc-100">
                        <span>Explore editor</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      </div>
                    </div>

                    {/* Minimalist Editor Illustration */}
                    <div className="pointer-events-none absolute -right-4 -bottom-4 flex h-[280px] w-full max-w-[320px] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 opacity-90 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105 sm:right-4 sm:bottom-4">
                      <div className="flex h-8 items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/50 px-3">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="flex flex-1 gap-4 bg-zinc-950 p-4">
                        <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-900/20">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/50 bg-indigo-500/20"
                          >
                            <div className="h-8 w-8 rounded-full bg-indigo-400 blur-sm"></div>
                          </motion.div>
                        </div>
                        <div className="w-20 space-y-3">
                          <div className="h-3 w-full rounded bg-zinc-800"></div>
                          <motion.div
                            animate={{ width: ["100%", "60%", "100%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="h-2 rounded bg-zinc-800"
                          />
                          <div className="h-2 w-4/5 rounded bg-zinc-800"></div>
                          <div className="h-2 w-full rounded bg-zinc-800"></div>
                          <div className="h-2 w-3/4 rounded bg-zinc-800"></div>

                          <div className="mt-6 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="h-5 w-5 rounded bg-zinc-800"></div>
                              <div className="h-5 w-10 rounded bg-zinc-800"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="h-5 w-5 rounded bg-zinc-800"></div>
                              <div className="h-5 w-10 rounded bg-zinc-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side Grid */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 md:col-span-12 lg:col-span-5 lg:gap-6">
                    {/* Top Wide Card - Layers Panel */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                      className="group relative col-span-2 row-span-1 overflow-hidden rounded-[2rem] bg-zinc-200/50 p-6 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                    >
                      <div className="relative z-10 mb-2 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                        Scalable Hierarchy
                      </div>
                      <h3 className="relative z-10 mt-4 text-3xl font-medium text-zinc-900 dark:text-white">
                        Layer Management
                      </h3>

                      <div className="relative z-10 mt-8 space-y-3">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ x: [0, 10, 0] }}
                            transition={{
                              duration: 3,
                              delay: i * 0.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="flex w-3/4 max-w-[200px] items-center gap-3 rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm dark:border-zinc-700/50 dark:bg-zinc-800/80"
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700">
                              <div className="h-3 w-3 rounded-sm border border-zinc-400"></div>
                            </div>
                            <div className="h-2 w-full rounded bg-zinc-300 dark:bg-zinc-600"></div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-zinc-300 opacity-50 blur-xl transition-transform duration-500 group-hover:scale-110 dark:bg-zinc-700" />
                    </motion.div>

                    {/* Bottom Left Square - Color Picker */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                      className="group relative col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#a77dfa] p-6 transition-colors hover:bg-[#9760ff]"
                    >
                      <div>
                        <div className="relative z-10 mb-2 text-[10px] font-bold tracking-wider text-white/70 uppercase">
                          Design Tokens
                        </div>
                        <h3 className="relative z-10 text-2xl font-medium text-white">Colors</h3>
                      </div>

                      <div className="relative z-10 mt-6 flex justify-center gap-2">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="h-10 w-10 rounded-full border-4 border-purple-200 bg-white shadow-lg"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 2,
                            delay: 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="h-10 w-10 rounded-full border-4 border-purple-800 bg-black shadow-lg"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 2,
                            delay: 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="h-10 w-10 rounded-full border-4 border-[#8cee2c] bg-[#a3ff47] shadow-lg"
                        />
                      </div>
                    </motion.div>

                    {/* Bottom Right Square - Responsive */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      className="group relative col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#a3ff47] p-6 transition-colors hover:bg-[#8cee2c]"
                    >
                      <div>
                        <div className="relative z-10 mb-2 text-[10px] font-bold tracking-wider text-black/60 uppercase">
                          Any Device
                        </div>
                        <h3 className="relative z-10 text-2xl font-medium text-black">
                          Responsive
                        </h3>
                      </div>

                      <div className="relative z-10 mt-8 flex items-end justify-center gap-3">
                        <motion.div
                          animate={{ height: ["40px", "60px", "40px"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="w-8 rounded-t-lg bg-black/80"
                        />
                        <motion.div
                          animate={{ height: ["60px", "80px", "60px"] }}
                          transition={{
                            duration: 3,
                            delay: 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-12 rounded-t-lg bg-black/60"
                        />
                        <motion.div
                          animate={{ height: ["30px", "50px", "30px"] }}
                          transition={{
                            duration: 3,
                            delay: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-6 rounded-t-lg bg-black/40"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </HeroBody>
            </Hero>
          </MarketingPreview>
        </div>

        {/* Component API */}
        <section id="component-api" className="mt-16 scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Component API
          </h2>
          <ApiTable
            title="Hero Props"
            note={
              <span>
                <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Hero</strong> is
                built using compound components for maximum layout flexibility.
              </span>
            }
            rows={[
              ...apiRows,
              {
                prop: "align (HeroBody & HeroContent)",
                type: '"left" | "center" | "right"',
                defaultVal: '"left"',
                description:
                  "Controls the internal alignment (flex items and text align) of the body or content.",
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
