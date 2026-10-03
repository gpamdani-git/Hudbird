import React from "react";
import { motion } from "framer-motion";
import { Button } from "@hudbird/ui";

export function ShowcaseHero() {
  return (
    <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 px-4 py-24 sm:px-6 lg:px-8 dark:bg-zinc-950">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="bg-primary-500/20 dark:bg-primary-500/10 absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-zinc-800 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-lime-400" />
            BlankUI Pro All Access
          </div>

          <h1 className="font-heading text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
            47+ Prebuilt <br className="hidden sm:block" />
            Websites & Dashboards
          </h1>

          <p className="max-w-2xl text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
            The ultimate React & Tailwind CSS template collection. Ship faster with beautifully
            designed, fully responsive components and pages.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 font-semibold">
              Purchase Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold">
              View Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
