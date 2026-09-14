import React from "react";
import {
  HeroGlass,
  HeroHeader,
  FeatureGlass,
  BentoGridGlass,
  TestimonialGlass,
  CtaGlass,
  FooterMega,
} from "@hudbird/marketing";
import { Button } from "@hudbird/ui";
import {
  Sparkles,
  PenTool,
  Layout,
  Monitor,
  Camera,
  ArrowUpRight,
  Maximize2,
  Zap,
} from "lucide-react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import { motion } from "framer-motion";

// <!-- Creative Agency Portfolio Theme - Full Glassmorphic Version -->
const MEGA_LINK_GROUPS = [
  {
    title: "Services",
    links: [
      { label: "Digital Product Design", href: "#" },
      { label: "Web Application Engineering", href: "#" },
      { label: "Brand Identity", href: "#" },
      { label: "Motion Graphics", href: "#" },
    ],
  },
  {
    title: "Agency",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const SOCIALS = [{ label: "Instagram", href: "#", icon: <Camera className="h-5 w-5" /> }];

const AGENCY_TESTIMONIALS = [
  {
    quote:
      "Neon Studio completely transformed our brand identity. Their attention to detail and ability to execute on a vision is unmatched in the industry.",
    author: "Sarah Jenkins",
    role: "CMO, Lumina Fragrances",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    quote:
      "Working with them felt like an extension of our own team. They delivered our complex web application weeks ahead of schedule with flawless motion design.",
    author: "David Chen",
    role: "Founder, FinTrack Mobile",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const BENTO_ITEMS = [
  {
    title: "Lumina Fragrances",
    description: "E-Commerce Experience",
    className: "md:col-span-2 md:row-span-2 xl:col-span-2 xl:row-span-2",
    content: (
      <div className="group relative h-full min-h-[250px] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <motion.img
          src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1200"
          alt="Lumina Fragrances"
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Glass Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </div>
        <div className="absolute bottom-6 left-6 z-10">
          <h4 className="text-2xl font-bold tracking-tight text-white">Lumina Fragrances</h4>
          <p className="mt-1 text-sm font-medium tracking-wide text-white/80 uppercase">
            E-Commerce Experience
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Aura Design System",
    description: "Brand Identity & Web",
    className: "md:col-span-1",
    content: (
      <div className="group relative h-full min-h-[250px] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <motion.img
          src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"
          alt="Aura Design"
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply dark:mix-blend-overlay"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-pink-500/40 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 z-10">
          <h4 className="text-xl font-bold tracking-tight text-white">Aura Design</h4>
          <p className="mt-1 text-xs font-medium tracking-wide text-white/80 uppercase">
            Brand Identity
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Aura Fintech",
    description: "Brand Identity",
    className: "md:col-span-1 md:row-span-1 xl:col-span-2 xl:row-span-1",
    content: (
      <div className="group relative flex h-full min-h-[250px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#00ff94] p-8 dark:bg-[#00ff94]/20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-90" />

        {/* Abstract mock elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-[20px] right-[-20px] flex h-64 w-48 flex-col gap-3 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm"
        >
          <div className="h-4 w-1/2 rounded-full bg-white/30" />
          <div className="h-24 w-full rounded-xl bg-white/20" />
          <div className="flex gap-2">
            <div className="h-8 w-1/2 rounded-lg bg-white/20" />
            <div className="h-8 w-1/2 rounded-lg bg-white/20" />
          </div>
        </motion.div>

        <div className="relative z-10 mt-auto">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
            <Maximize2 size={20} />
          </div>
          <h4 className="text-xl font-bold tracking-tight text-white">FinTrack App</h4>
          <p className="mt-1 text-xs font-medium tracking-wide text-white/90 uppercase">
            UX/UI & Motion
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Nexus Analytics",
    description: "Web Application",
    className: "md:col-span-1 md:row-span-1 xl:col-span-2 xl:row-span-1",
    content: (
      <div className="group relative flex h-full min-h-[250px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-900">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="relative z-10 flex h-[70%] w-[80%] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-md">
          {/* Mockup UI */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="h-6 w-32 rounded-full bg-white/5" />
          </div>

          <div className="flex flex-1 gap-4">
            {/* Chart bars */}
            {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
              <div key={i} className="flex flex-1 items-end">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`w-full rounded-t-sm ${i === 3 ? "bg-purple-500" : "bg-zinc-800"}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 z-20">
          <h4 className="text-2xl font-bold tracking-tight text-white">Nexus Data UI</h4>
          <p className="mt-1 text-sm font-medium tracking-wide text-white/70 uppercase">
            SaaS Engineering
          </p>
        </div>
      </div>
    ),
  },
];

const FEATURE_ITEMS = [
  {
    icon: <PenTool size={28} className="text-purple-500" />,
    title: "Brand Identity",
    description:
      "We create cohesive brand systems, typography, and visual languages that resonate with your target audience and stand the test of time.",
  },
  {
    icon: <Layout size={28} className="text-pink-500" />,
    title: "UX/UI Design",
    description:
      "Crafting intuitive and beautiful interfaces. Our design process is rooted in user research, wireframing, and interactive prototyping.",
  },
  {
    icon: <Monitor size={28} className="text-indigo-500" />,
    title: "Creative Engineering",
    description:
      "Bringing designs to life with modern web technologies. We specialize in React, WebGL, and buttery smooth framer motion animations.",
  },
];

export const DigitalAgencyTemplate = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-zinc-50 font-sans selection:bg-purple-500/30 dark:bg-zinc-950">
      {/* Background Gradient for Glassmorphism to pop */}
      {/* Intense blurred abstract blobs */}
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-purple-400/30 blur-[120px] dark:bg-purple-600/20" />
      <div className="pointer-events-none fixed right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-pink-400/30 blur-[120px] dark:bg-pink-600/20" />

      <TemplateThemeToggle />

      <div className="relative z-10 flex flex-col">
        {/* Navigation Header */}
        <HeroHeader
          className="relative sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60"
          logo={
            <div className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" /> NEON
              <span className="font-light">STUDIO</span>
            </div>
          }
          links={[
            {
              label: "Work",
              href: "#",
              className:
                "text-zinc-700 font-medium dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
            },
            {
              label: "Studio",
              href: "#",
              className:
                "text-zinc-700 font-medium dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
            },
            {
              label: "Contact",
              href: "#",
              className:
                "text-zinc-700 font-medium dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
            },
          ]}
          action={
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-zinc-300 px-6 font-medium text-zinc-900 backdrop-blur-md hover:bg-zinc-200 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              Let's Talk
            </Button>
          }
        />

        {/* <!-- Hero Section V3 - Glassmorphic / Blobs - Agency Theme --> */}
        <HeroGlass
          className="border-b border-zinc-200/50 bg-transparent py-32 dark:border-white/5 dark:bg-transparent"
          badge={
            <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-purple-700 uppercase dark:text-purple-300">
              <Zap size={16} /> Award Winning Digital Agency
            </span>
          }
          title={
            <span className="text-6xl leading-[1.1] font-light tracking-tight text-zinc-900 md:text-8xl dark:text-white">
              We build digital <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text font-bold text-transparent italic dark:from-purple-400 dark:to-pink-400">
                experiences
              </span>{" "}
              that matter.
            </span>
          }
          description="Neon Studio is a creative design and engineering agency based in New York. We partner with ambitious brands to create digital products that push boundaries."
          actions={
            <div className="flex items-center gap-4">
              <Button className="h-14 rounded-full bg-zinc-900 px-8 text-lg text-white shadow-2xl shadow-zinc-900/20 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:shadow-white/10 dark:hover:bg-zinc-200">
                View Our Work
              </Button>
            </div>
          }
        />

        {/* <!-- Bento Grid V2 - Glassmorphic Portfolio Masonry Showcase --> */}
        <div className="relative border-b border-zinc-200/50 py-12 dark:border-white/5">
          <BentoGridGlass
            title={
              <span className="text-4xl font-light tracking-tight text-zinc-900 md:text-5xl dark:text-white">
                Selected <span className="font-bold">Works.</span>
              </span>
            }
            description="A curated selection of our recent digital projects spanning branding, web design, and product engineering."
            items={BENTO_ITEMS}
          />
        </div>

        {/* <!-- Feature Section V3 - Glassmorphic Capabilities --> */}
        <div className="border-b border-zinc-200/50 py-12 dark:border-white/5">
          <FeatureGlass
            title={
              <span className="text-4xl font-light tracking-tight text-zinc-900 md:text-5xl dark:text-white">
                Our <span className="font-bold">Capabilities.</span>
              </span>
            }
            description="A full-service digital approach. We handle everything from brand identity to complex web application engineering seamlessly."
            features={FEATURE_ITEMS}
          />
        </div>

        {/* <!-- Testimonials V2 - Glassmorphic --> */}
        <div className="relative border-b border-zinc-200/50 py-24 dark:border-white/5">
          <TestimonialGlass testimonials={AGENCY_TESTIMONIALS} />
        </div>

        {/* <!-- CTA V3 - Glassmorphic --> */}
        <div className="relative py-32">
          <CtaGlass
            title={
              <span className="text-5xl leading-[1.1] font-light tracking-tight text-zinc-900 md:text-7xl dark:text-white">
                Have a project in mind?
                <br />
                <span className="font-bold">Let's create together.</span>
              </span>
            }
            description="We are currently accepting new projects for Q3 2026. Reach out to discuss how we can partner to elevate your brand."
            primaryAction={{
              label: "Start a Project",
              onClick: () => {},
              className:
                "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full h-14 px-10 text-lg shadow-2xl",
            }}
            secondaryAction={{
              label: "Send an Email",
              href: "#",
              className:
                "text-zinc-800 dark:text-zinc-200 font-medium hover:text-zinc-900 dark:hover:text-white rounded-full bg-white/60 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 h-14 backdrop-blur-md px-10 shadow-lg",
            }}
          />
        </div>

        {/* <!-- Footer V4 - Mega --> */}
        <FooterMega
          className="relative z-10 mt-auto border-t border-zinc-200/50 bg-white/30 pt-16 backdrop-blur-lg dark:border-white/5 dark:bg-zinc-950/30"
          logo={
            <div className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" /> NEON
            </div>
          }
          brandName=""
          description="A curated selection of our recent digital projects spanning branding, web design, and product engineering."
          linkGroups={MEGA_LINK_GROUPS}
          socials={SOCIALS}
          copyright="&copy; 2026 Neon Studio, LLC. Made in NYC."
        />
      </div>
    </div>
  );
};
