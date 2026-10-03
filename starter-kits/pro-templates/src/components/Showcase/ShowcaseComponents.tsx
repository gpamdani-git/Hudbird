import React from "react";
import { motion } from "framer-motion";
import {
  Command,
  Bell,
  LineChart,
  SlidersHorizontal,
  CheckSquare,
  Check,
  TableProperties,
  KanbanSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const components = [
  {
    title: "Command Menu",
    icon: Command,
    colSpan: "col-span-1 md:col-span-4",
    content: (
      <div className="flex h-full w-full flex-col justify-center px-8">
        <div className="overflow-hidden rounded-xl border border-zinc-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <span className="text-sm text-zinc-400">Search documentation...</span>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-between rounded-lg bg-zinc-100/50 px-3 py-2 text-sm text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300">
              <span className="flex items-center gap-2">
                <Command className="h-4 w-4" /> Create New Project
              </span>
              <span className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-xs font-medium dark:border-zinc-600 dark:bg-zinc-700">
                ⌘ N
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-2">
                <KanbanSquare className="h-4 w-4" /> Duplicate
              </span>
              <span className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-xs font-medium dark:border-zinc-600 dark:bg-zinc-700">
                ⌘ D
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Toast Notifications",
    icon: Bell,
    colSpan: "col-span-1 md:col-span-4",
    content: (
      <div className="flex h-full w-full flex-col justify-end gap-3 p-6 pb-8">
        <div className="w-[85%] translate-y-6 self-center rounded-xl border border-zinc-200 bg-white p-3 opacity-60 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">Profile updated</div>
        </div>
        <div className="z-10 w-[92%] translate-y-3 self-center rounded-xl border border-zinc-200 bg-white p-3 opacity-80 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            Settings saved successfully.
          </div>
        </div>
        <div className="z-20 w-full self-center rounded-xl border border-emerald-500/20 bg-emerald-50 p-4 shadow-xl dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-emerald-100 p-1 dark:bg-emerald-500/20">
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                Deployment successful
              </div>
              <div className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
                Your app is now live on the production URL.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Stats & Charts",
    icon: LineChart,
    colSpan: "col-span-1 md:col-span-4",
    content: (
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <LineChart className="h-4 w-4" /> Total Clicks
          </div>
          <div className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">2,441</div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="flex items-center font-medium text-emerald-500">↑ 3.5%</span>
            <span className="text-zinc-400">last 30d</span>
          </div>
          {/* Fake sparkline */}
          <svg
            className="mt-4 h-10 w-full text-blue-500"
            viewBox="0 0 100 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 25C10 25 15 15 25 15C35 15 40 20 50 20C60 20 65 5 75 5C85 5 90 10 100 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0 25C10 25 15 15 25 15C35 15 40 20 50 20C60 20 65 5 75 5C85 5 90 10 100 10L100 30L0 30Z"
              fill="currentColor"
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "Advanced Filters",
    icon: SlidersHorizontal,
    colSpan: "col-span-1 md:col-span-4",
    content: (
      <div className="flex h-full w-full flex-col justify-center p-6">
        <div className="mx-auto w-full max-w-sm space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div>
            <div className="text-xs font-semibold text-zinc-900 dark:text-white">Type of place</div>
            <div className="mt-3 flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
              <div className="flex-1 rounded-md bg-white py-1.5 text-center text-xs font-medium text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white">
                Any type
              </div>
              <div className="flex-1 py-1.5 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Room
              </div>
              <div className="flex-1 py-1.5 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Entire home
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-zinc-900 dark:text-white">Price Range</div>
            <div className="mt-4 flex h-8 items-end gap-1">
              {[4, 7, 3, 8, 5, 9, 6, 4, 2, 7, 10, 8, 6, 3, 5].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-blue-500/20 dark:bg-blue-500/40"
                  style={{ height: `${h * 10}%` }}
                />
              ))}
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className="ml-1/4 h-full w-1/2 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Form Controls",
    icon: CheckSquare,
    colSpan: "col-span-1 md:col-span-4",
    content: (
      <div className="flex h-full w-full flex-col justify-center gap-5 p-6">
        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email notifications
          </div>
          <div className="h-5 w-9 rounded-full bg-blue-500 p-0.5 shadow-inner">
            <div className="h-4 w-4 translate-x-4 rounded-full bg-white shadow-sm transition-transform" />
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span>Volume limit</span>
            <span>64%</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-[64%] rounded-full bg-blue-500" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-4 w-4 items-center justify-center rounded border border-blue-500 bg-blue-500">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Accept terms and conditions
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "DataGrid",
    icon: TableProperties,
    colSpan: "col-span-1 md:col-span-4",
    content: (
      <div className="flex h-full w-full flex-col justify-center p-6">
        <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <div className="flex gap-2">
              <span className="rounded bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                Filter
              </span>
              <span className="rounded bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                Sort
              </span>
            </div>
            <div className="w-24 rounded border border-zinc-200 bg-zinc-50 px-2 py-1 text-[10px] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">
              Search...
            </div>
          </div>
          <div className="p-3">
            {[
              { region: "US-West 1", status: "Active", val: "$321.55" },
              { region: "EU-Central 1", status: "Warning", val: "$410.15" },
              { region: "AP-South 1", status: "Active", val: "$100.00" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-zinc-100 py-2 last:border-0 dark:border-zinc-800"
              >
                <div className="flex w-16 items-center gap-1">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${row.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                  ></span>
                  <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                    {row.region}
                  </span>
                </div>
                <div className="text-[10px] font-medium text-zinc-900 dark:text-zinc-300">
                  {row.val}
                </div>
                <div className="h-3 w-8 overflow-hidden rounded-full bg-blue-500/10">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${Math.random() * 60 + 30}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function ShowcaseComponents() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-50 py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400"
          >
            Pro components
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Polished by default. <br />
            <span className="text-zinc-400 dark:text-zinc-500">Every edge case, handled.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Accessibility, animations, and platform edge cases are built in. We handle the UI so you
            can focus on your product.
          </motion.p>
        </div>

        {/* Scrolling Components Marquee */}
        <div className="relative mt-20 w-full overflow-hidden">
          {/* Left/Right Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-zinc-50 to-transparent md:w-48 dark:from-[#030712]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-zinc-50 to-transparent md:w-48 dark:from-[#030712]" />

          {/* Scrolling Track */}
          <motion.div
            className="flex gap-6 py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[1, 2].map((set) => (
              <div
                key={set}
                className="grid w-[1200px] grid-cols-3 grid-rows-2 gap-6 px-3 md:w-[1500px]"
              >
                {components.map((item, idx) => (
                  <motion.div
                    key={`${set}-${item.title}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`group relative flex h-[320px] flex-col overflow-hidden rounded-[2rem] border border-zinc-200/50 bg-zinc-100/80 shadow-md transition-colors hover:bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/60`}
                  >
                    {/* Card Content Area */}
                    <div className="relative flex-1 overflow-hidden">
                      {/* Subtle gradient overlay to match image aesthetic */}
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-zinc-100/50 dark:to-zinc-900/50" />
                      {item.content}
                    </div>

                    {/* Card Footer */}
                    <div className="z-20 flex shrink-0 items-center justify-between px-6 pt-2 pb-6">
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700">
                          <item.icon className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center justify-center gap-6"
        >
          <p className="text-zinc-500 dark:text-zinc-400">Built for React and Tailwind CSS v4.</p>
          <a
            href="https://hudbird.vercel.app/#/blocks"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-zinc-200/80 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            Browse components
          </a>
        </motion.div>
      </div>
    </section>
  );
}
