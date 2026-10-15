import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import {
  BarChart3,
  LineChart,
  PieChart,
  ArrowRight,
  Eye,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";

export function Analytics() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />

      {/* SECTION 1: Hero & Features Grid */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100/50 blur-[100px] dark:bg-blue-600/15" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-600 uppercase dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            Product / Analytics
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
          >
            Data that drives{" "}
            <span className="font-light text-zinc-500 italic dark:text-zinc-400">decisions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Track performance, measure impact, and uncover hidden opportunities with our advanced
            analytics suite. Built for speed and clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-1 gap-6 text-left md:grid-cols-3"
          >
            {[
              { title: "Real-time Metrics", icon: <BarChart3 className="h-6 w-6 text-blue-500" /> },
              {
                title: "Custom Dashboards",
                icon: <PieChart className="h-6 w-6 text-purple-500" />,
              },
              {
                title: "Predictive Trends",
                icon: <LineChart className="h-6 w-6 text-green-500" />,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="hover:border-zinc-2000 rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/50 transition-colors dark:border-white/5 dark:bg-zinc-900/50 dark:shadow-none"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100/50 dark:bg-blue-500/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Beautiful, interactive visualizations that make complex data easy to understand at
                  a glance.
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Deep Dive Highlight */}
      <section className="border-y border-zinc-200/50 bg-white py-24 dark:border-white/5 dark:bg-[#0A0C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex aspect-square flex-col overflow-hidden rounded-3xl border border-zinc-200/50 bg-zinc-100 p-8 lg:aspect-auto lg:h-[600px] dark:border-white/5 dark:bg-zinc-900"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Active Users Overview
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Abstract Chart UI */}
              <div className="relative flex h-full w-full flex-1 items-end gap-2 pb-4 sm:gap-4">
                <div className="absolute inset-x-0 bottom-4 h-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="absolute inset-x-0 bottom-1/4 h-px border-dashed bg-zinc-200 dark:bg-zinc-800" />
                <div className="absolute inset-x-0 bottom-2/4 h-px border-dashed bg-zinc-200 dark:bg-zinc-800" />
                <div className="absolute inset-x-0 bottom-3/4 h-px border-dashed bg-zinc-200 dark:bg-zinc-800" />

                {[30, 45, 25, 60, 40, 75, 50, 90, 65, 80].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
                    className="group relative z-10 flex-1 cursor-pointer rounded-t-sm bg-blue-500 transition-colors hover:bg-blue-400"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-[10px] font-bold whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-zinc-900">
                      {height}K Users
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="mb-4 text-[10px] font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                Deep Dive Analytics
              </div>
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                Understand user behavior at a granular level
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Go beyond surface-level metrics. Our deep dive tools allow you to track individual
                funnels, segment users, and pinpoint exactly where drop-offs happen in your
                workflow.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Funnel Analysis",
                    icon: <TrendingUp className="h-5 w-5 text-zinc-400" />,
                  },
                  {
                    title: "Click Tracking",
                    icon: <MousePointerClick className="h-5 w-5 text-zinc-400" />,
                  },
                  { title: "Session Replays", icon: <Eye className="h-5 w-5 text-zinc-400" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Metrics */}
      <section className="bg-zinc-50 py-24 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
          >
            Built to handle{" "}
            <span className="bg-gradient-to-r from-zinc-500 to-zinc-400 bg-clip-text text-transparent">
              massive scale
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 gap-8 border-y border-zinc-200/50 py-12 md:grid-cols-4 dark:border-white/5">
            {[
              { value: "5B+", label: "Events processed daily" },
              { value: "<50ms", label: "Average query time" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "Unlimited", label: "Data retention" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="mb-2 text-4xl font-bold tracking-tighter text-zinc-900 sm:text-5xl dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SaaSCta />
      <SaaSFooter />
    </div>
  );
}
