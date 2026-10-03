import React from "react";
import { ShowcaseNavbar } from "../components/Showcase/ShowcaseNavbar";
import { ShowcaseFooter } from "../components/Showcase/ShowcaseFooter";
import { motion } from "framer-motion";
import { Mail, AtSign, MessageSquare, ArrowRight, MapPin } from "lucide-react";

export function Contact() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-rose-500/30 dark:bg-[#030712]">
      <ShowcaseNavbar />

      {/* Luxurious Hero Header */}
      <div className="relative w-full overflow-hidden border-b border-zinc-200/50 bg-white pt-32 pb-16 dark:border-white/5 dark:bg-[#030712]">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 opacity-30 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen">
          <div className="absolute top-[-100px] left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-rose-500/40 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl dark:text-white"
          >
            Get in touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400"
          >
            Whether you have a question about features, pricing, or anything else, our team is ready
            to answer all your questions.
          </motion.p>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-4xl flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-[#0a0a0b]"
          >
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-blue-500/10 blur-[40px] transition-all group-hover:bg-blue-500/20" />
            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-white/5 dark:text-white">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Email Us</h3>
              <p className="mb-8 text-zinc-500 dark:text-zinc-400">
                Drop us a line anytime. We usually respond within 24 hours on business days.
              </p>
              <a
                href="mailto:gpamdani@gmail.com"
                className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                gpamdani@gmail.com <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Social Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-[#0a0a0b]"
          >
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-zinc-500/10 blur-[40px] transition-all group-hover:bg-zinc-500/20" />
            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-white/5 dark:text-white">
                <AtSign className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Social Media</h3>
              <p className="mb-8 text-zinc-500 dark:text-zinc-400">
                Follow us on X/Twitter for the latest updates, design tips, and releases.
              </p>
              <a
                href="https://x.com/dani_akbarr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
              >
                @dani_akbarr <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <ShowcaseFooter />
    </div>
  );
}
