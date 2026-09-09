import React, { lazy, Suspense } from "react";
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
const HeroThreeBackground = lazy(() => import("@hudbird/marketing").then((m) => ({ default: m.HeroThreeBackground })));

export const heroTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-hero", title: "Basic Hero" },
    ],
  },
];

const minimalistCode = `import { Button } from '@hudbird/ui'
import { Hero, HeroHeader, HeroBody, HeroBadge, HeroTitle, HeroDescription, HeroActions } from '@hudbird/marketing'
import { ArrowRight } from 'lucide-react'

function Example() {
  return (
    <Hero size="full">
      <HeroBackground src="/assets/marketing-section/hero-bg.webp" overlayClassName="bg-white/40 dark:bg-zinc-950/60 backdrop-blur-md" />
      <HeroHeader
        logo={
          <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />
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

function Example() {
  return (
    <Hero size="full" withBlobs={false} className="bg-[#050505] text-white">
      <HeroHeader
        logo={<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />}
        links={[{ label: "Product", href: "#" }, { label: "Features", href: "#" }]}
        action={<a href="#" className="text-sm font-semibold text-white">Log in &rarr;</a>}
        className="[&_a]:text-white [&_button]:text-white"
      />
      <HeroBody>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent align="left">
            <HeroBadge className="text-zinc-200 ring-white/20 hover:ring-white/30 bg-white/10 backdrop-blur-md">
              New Feature Release
            </HeroBadge>
            <HeroTitle className="text-left text-5xl sm:text-6xl text-white">Build faster with Hudbird UI</HeroTitle>
            <HeroDescription className="text-left text-zinc-400">
              Deploy your next web application in minutes with our premium React components. Beautifully designed, accessible, and ready for production.
            </HeroDescription>
            <HeroActions>
              <Button color="primary" className="flex items-center gap-1">Start building <ArrowRight size={16} /></Button>
            </HeroActions>
          </HeroContent>
          <HeroMedia>
            <img src="/assets/marketing-section/potrait-split-bg.webp" alt="App screenshot" className="w-full h-auto max-h-[80vh] object-cover rounded-2xl shadow-2xl ring-1 ring-white/10" />
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
      <HeroBackground src="/assets/marketing-section/hero-bg.webp" overlayClassName="bg-zinc-900/80 backdrop-blur-sm" />
      <HeroHeader
        logo={<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />}
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
        logo={<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />}
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
    <div className="flex flex-col w-full pb-20">
      {/* Header section with breadcrumbs and description */}
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
          <span className="text-zinc-900 dark:text-zinc-100">Hero Section</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
      
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
          Hero Sections
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl text-balance">
          Use these Tailwind CSS hero section examples to add important messaging, product photos, and call-to-actions to the top of your website. These hero examples are fully responsive and support native dark mode.
        </p>
      </div>

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="hero-section" manualCode={heroCode} />
      </div>

      <div className="flex flex-col gap-16">
        <MarketingPreview title="Minimalist Centered" skill={skillContent} code={minimalistCode}>
          <Hero size="full">
            <HeroBackground src="/assets/marketing-section/hero-bg.webp" overlayClassName="bg-white/40 dark:bg-zinc-950/60 backdrop-blur-md" />
            <HeroHeader
              logo={<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />}
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
                { label: "Company", href: "#" }
              ]}
              action={<a href="#" className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Log in &rarr;</a>}
            />
            <HeroBody align="center">
              <HeroBadge>
                Announcing our next round of funding. <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors ml-1">Read more &rarr;</a>
              </HeroBadge>
              <HeroTitle>Data to enrich your online business</HeroTitle>
              <HeroDescription className="max-w-xl mx-auto">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
              </HeroDescription>
              <HeroActions className="justify-center">
                <Button color="primary" className="flex items-center gap-1">Get started <ArrowRight size={16} /></Button>
                <Button variant="light" className="flex items-center gap-1">Learn more <ArrowRight size={16} /></Button>
              </HeroActions>
            </HeroBody>
          </Hero>
        </MarketingPreview>
        
        <MarketingPreview title="Split Screen Hero" skill={skillContent} code={splitCode}>
          <Hero size="full" withBlobs={false} className="bg-[#050505] text-white">
            <HeroHeader
              logo={<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />}
              links={[
                { label: "Product", href: "#" }, 
                { 
                  label: "Features", 
                  items: [
                    { label: "Analytics", href: "#" },
                    { label: "Security", href: "#" },
                  ]
                }
              ]}
              action={<a href="#" className="text-sm font-semibold text-white">Log in &rarr;</a>}
              className="[&_a]:text-white [&_button]:text-white"
            />
            <HeroBody>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <HeroContent align="left">
                  <HeroBadge className="text-zinc-200 ring-white/20 hover:ring-white/30 bg-white/10 backdrop-blur-md">
                    New Feature Release
                  </HeroBadge>
                  <HeroTitle className="text-left text-5xl sm:text-6xl text-white">Build faster with Hudbird UI</HeroTitle>
                  <HeroDescription className="text-left text-zinc-400">
                    Deploy your next web application in minutes with our premium React components. Beautifully designed, accessible, and ready for production.
                  </HeroDescription>
                  <HeroActions>
                    <Button color="primary" className="flex items-center gap-1">Start building <ArrowRight size={16} /></Button>
                  </HeroActions>
                </HeroContent>
                <HeroMedia>
                  <img src="/assets/marketing-section/potrait-split-bg.webp" alt="App screenshot" className="w-full h-auto max-h-[80vh] object-cover rounded-2xl shadow-2xl ring-1 ring-white/10" />
                </HeroMedia>
              </div>
            </HeroBody>
          </Hero>
        </MarketingPreview>
        
        <MarketingPreview title="Background Image Overlay" skill={skillContent} code={overlayCode}>
          <Hero size="full" withBlobs={false}>
            <HeroBackground src="/assets/marketing-section/hero-bg.webp" overlayClassName="bg-zinc-900/80 backdrop-blur-sm" />
            <HeroHeader
              logo={<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />}
              links={[
                { label: "Product", href: "#" }, 
                { 
                  label: "Features", 
                  items: [
                    { label: "Analytics", href: "#" },
                    { label: "Security", href: "#" },
                  ]
                }
              ]}
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
                <Button variant="plain" className="flex items-center gap-1 text-white hover:bg-white/10">
                  <Play size={16} /> Watch video
                </Button>
              </HeroActions>
            </HeroBody>
          </Hero>
        </MarketingPreview>
        
        <MarketingPreview title="Interactive WebGL Background" skill={skillContent} code={threeCode}>
          <Hero size="full" withBlobs={false}>
            <Suspense fallback={<div className="absolute inset-0 bg-zinc-950 flex items-center justify-center text-zinc-500">Loading 3D Engine...</div>}>
              <HeroThreeBackground />
            </Suspense>
            <HeroHeader
              logo={<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" className="h-8 w-auto" />}
              links={[
                { label: "Product", href: "#" }, 
                { 
                  label: "Features", 
                  items: [
                    { label: "Analytics", href: "#" },
                    { label: "Security", href: "#" },
                  ]
                }
              ]}
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
                <Button color="primary" className="flex items-center gap-1">Get started <ArrowRight size={16} /></Button>
              </HeroActions>
            </HeroBody>
          </Hero>
        </MarketingPreview>
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4 mt-16">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Hero</strong> is built using compound components for maximum layout flexibility.
            </span>
          }
          rows={[...apiRows, {
            prop: "align (HeroBody & HeroContent)",
            type: '"left" | "center" | "right"',
            defaultVal: '"left"',
            description: "Controls the internal alignment (flex items and text align) of the body or content.",
          }]}
        />
      </section>
      </div>
    </div>
  );
}
