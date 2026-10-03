import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { BarChart3, LineChart, PieChart, ArrowRight, Eye, MousePointerClick, TrendingUp } from "lucide-react";

export function Analytics() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />
      
      {/* SECTION 1: Hero & Features Grid */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-100/50 dark:bg-blue-600/15 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 mb-8 w-fit">
            Product / Analytics
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            Data that drives <span className="italic font-light text-zinc-500 dark:text-zinc-400">decisions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Track performance, measure impact, and uncover hidden opportunities with our advanced analytics suite. Built for speed and clarity.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Real-time Metrics", icon: <BarChart3 className="w-6 h-6 text-blue-500" /> },
              { title: "Custom Dashboards", icon: <PieChart className="w-6 h-6 text-purple-500" /> },
              { title: "Predictive Trends", icon: <LineChart className="w-6 h-6 text-green-500" /> }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:border-zinc-2000 transition-colors">
                <div className="mb-4 bg-zinc-100/50 dark:bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Beautiful, interactive visualizations that make complex data easy to understand at a glance.</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Deep Dive Highlight */}
      <section className="py-24 bg-white dark:bg-[#0A0C14] border-y border-zinc-200/50 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200/50 dark:border-white/5 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">Active Users Overview</div>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                </div>
              </div>
              
              {/* Abstract Chart UI */}
              <div className="flex-1 flex items-end gap-2 sm:gap-4 relative w-full h-full pb-4">
                <div className="absolute inset-x-0 bottom-4 h-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="absolute inset-x-0 bottom-1/4 h-px bg-zinc-200 dark:bg-zinc-800 border-dashed" />
                <div className="absolute inset-x-0 bottom-2/4 h-px bg-zinc-200 dark:bg-zinc-800 border-dashed" />
                <div className="absolute inset-x-0 bottom-3/4 h-px bg-zinc-200 dark:bg-zinc-800 border-dashed" />
                
                {[30, 45, 25, 60, 40, 75, 50, 90, 65, 80].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
                    className="flex-1 bg-blue-500 rounded-t-sm relative z-10 hover:bg-blue-400 transition-colors cursor-pointer group"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
              <div className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">Deep Dive Analytics</div>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
                Understand user behavior at a granular level
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Go beyond surface-level metrics. Our deep dive tools allow you to track individual funnels, segment users, and pinpoint exactly where drop-offs happen in your workflow.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Funnel Analysis", icon: <TrendingUp className="w-5 h-5 text-zinc-400" /> },
                  { title: "Click Tracking", icon: <MousePointerClick className="w-5 h-5 text-zinc-400" /> },
                  { title: "Session Replays", icon: <Eye className="w-5 h-5 text-zinc-400" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Metrics */}
      <section className="py-24 bg-zinc-50 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white mb-16"
          >
            Built to handle <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-400">massive scale</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-zinc-200/50 dark:border-white/5 py-12">
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
                <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
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
