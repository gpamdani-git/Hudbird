import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Terminal,
  FolderTree,
  Layout,
  Settings,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { ShowcaseNavbar } from "../components/Showcase/ShowcaseNavbar";
import { ShowcaseFAQ } from "../components/Showcase/ShowcaseFAQ";
import { ShowcaseFooter } from "../components/Showcase/ShowcaseFooter";

const steps = [
  {
    icon: Terminal,
    title: "1. Initial Setup",
    description: "Install dependencies and start the development server.",
    code: `pnpm install\npnpm dev`,
  },
  {
    icon: Layout,
    title: "2. Choose Your Route",
    description:
      "In App.tsx, pick your desired template as the root (/) route. For example, to use the AI Startup template:",
    code: `<Route path="/" element={<AiStartup />} />`,
  },
  {
    icon: FolderTree,
    title: "3. Project Structure",
    description: "Our repository is organized as a monorepo. Here's what you need to know:",
    bullets: [
      "packages/ui - Contains the Core UI components.",
      "packages/marketing - Contains the Block Gallery & Templates.",
      "starter-kits/pro-templates - The main application you are running now.",
      "apps/docs - The documentation site.",
    ],
  },
  {
    icon: Settings,
    title: "4. Admin CMS Integration",
    description:
      "The admin dashboard is pre-configured at /dashboard. You can link any frontend page to it, and customize the layout in src/layouts/DashboardLayout.tsx.",
  },
  {
    icon: BookOpen,
    title: "5. Using the Galleries",
    description:
      "Want to mix and match? You don't have to use a template as-is. Browse the Block Gallery and Core UI docs, then import the specific components into your page.",
  },
];

export function ShowcaseInstallation() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <ShowcaseNavbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 -ml-[50rem] h-[50rem] w-[100rem] opacity-30 mix-blend-screen blur-[120px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600" />
        </div>

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></span>
            Hudbird UI PRO All Access
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading mt-8 text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl dark:text-white"
          >
            Installation &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Setup Guide
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Everything you need to configure your new codebase, set up your preferred landing page,
            and integrate the admin CMS. Let's get building.
          </motion.p>
        </div>
      </div>

      {/* Steps Content */}
      <div className="mx-auto max-w-5xl px-4 pb-32 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-zinc-50/50 p-8 shadow-xl backdrop-blur-sm transition-all hover:bg-zinc-100 md:flex-row md:items-start md:gap-10 md:p-12 dark:border-zinc-800 dark:bg-zinc-900/30 dark:shadow-2xl dark:hover:bg-zinc-900/50"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-blue-600 shadow-sm ring-1 ring-zinc-200 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700 dark:bg-zinc-800/80 dark:text-blue-400 dark:ring-white/10 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-300">
                <step.icon className="h-8 w-8" />
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>

                {step.code && (
                  <div className="mt-6 overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-zinc-800 dark:bg-black dark:ring-white/10">
                    <pre className="overflow-x-auto p-4 text-sm text-zinc-300">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                )}

                {step.bullets && (
                  <ul className="mt-6 space-y-3">
                    {step.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300"
                      >
                        <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-blue-500 dark:text-blue-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core UI & Block Gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] shadow-lg"
        >
          <div className="flex flex-col items-center justify-between gap-8 rounded-[23px] bg-white p-10 text-center sm:p-16 md:flex-row md:text-left dark:bg-zinc-950">
            <div>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Need detailed component docs?
              </h3>
              <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
                Dive into our comprehensive documentation for Core UI, Chart UI, and the Block
                Gallery to learn how to customize every pixel.
              </p>
            </div>
            <a
              href="https://hudbird.vercel.app/#/docs"
              target="_blank"
              rel="noreferrer"
              className="group flex shrink-0 items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
            >
              Read Full Docs{" "}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* FAQ & Footer */}
      <ShowcaseFAQ />
      <ShowcaseFooter />
    </div>
  );
}
