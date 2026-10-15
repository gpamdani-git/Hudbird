import React, { useState, useEffect } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { Search, Book, Terminal, Settings, ArrowRight, Zap, Code2, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { DocsSearchModal } from "@/components/marketing/SaaS/Docs/DocsSearchModal";

export function Docs() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    document.addEventListener("open-docs-search", handleOpenSearch);
    return () => document.removeEventListener("open-docs-search", handleOpenSearch);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />
      <DocsSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* SECTION 1: Hero & Search */}
      <section className="relative overflow-hidden border-b border-zinc-200/50 pt-32 pb-24 lg:pt-48 lg:pb-32 dark:border-white/5">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-zinc-100/50 blur-[120px] dark:bg-purple-600/15" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-600 uppercase dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            Resources / Documentation
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
          >
            How can we{" "}
            <span className="font-light text-zinc-500 italic dark:text-zinc-400">help you?</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative mx-auto max-w-2xl cursor-pointer"
            onClick={() => setSearchOpen(true)}
          >
            <div className="absolute inset-0 rounded-2xl bg-zinc-100/50 opacity-0 blur-xl transition-all group-hover:bg-zinc-200/50 group-hover:opacity-100" />
            <div className="relative flex items-center overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-sm transition-all hover:border-zinc-500 hover:ring-1 hover:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
              <Search className="ml-4 h-5 w-5 shrink-0 text-zinc-400" />
              <div className="w-full bg-transparent px-4 py-4 text-left text-zinc-500 select-none dark:text-zinc-400">
                Search documentation, API references, guides...
              </div>
              <div className="flex shrink-0 items-center gap-1 pr-4">
                <kbd className="hidden items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 sm:inline-flex dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  ⌘
                </kbd>
                <kbd className="hidden items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 sm:inline-flex dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  K
                </kbd>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Popular Guides */}
      <section className="bg-white py-24 dark:bg-[#0A0C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-2xl font-semibold text-zinc-900 dark:text-white">
            Popular{" "}
            <span className="font-light text-zinc-500 italic dark:text-zinc-400">Topics</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Quickstart Guide",
                desc: "Get up and running in less than 5 minutes.",
                icon: <Zap className="h-5 w-5 text-purple-500" />,
                href: "/docs/api-reference",
              },
              {
                title: "API Reference",
                desc: "Detailed endpoints, parameters, and responses.",
                icon: <Code2 className="h-5 w-5 text-purple-500" />,
                href: "/docs/api-reference",
              },
              {
                title: "Authentication",
                desc: "Learn about OAuth2, JWTs, and API keys.",
                icon: <Shield className="h-5 w-5 text-purple-500" />,
                href: "/docs/api-reference",
              },
              {
                title: "CLI Tool",
                desc: "Manage resources directly from your terminal.",
                icon: <Terminal className="h-5 w-5 text-purple-500" />,
                href: "/docs/api-reference",
              },
              {
                title: "Webhooks",
                desc: "Subscribe to real-time events and updates.",
                icon: <Book className="h-5 w-5 text-purple-500" />,
                href: "/docs/api-reference",
              },
              {
                title: "Account Settings",
                desc: "Manage billing, teams, and workspace config.",
                icon: <Settings className="h-5 w-5 text-purple-500" />,
                href: "/docs/api-reference",
              },
            ].map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={topic.href}
                  className="group flex h-full flex-col rounded-2xl border border-zinc-200/50 bg-zinc-50 p-6 transition-all hover:border-zinc-200 hover:bg-white dark:border-white/5 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100/50 transition-transform group-hover:scale-110 dark:bg-purple-500/10">
                    {topic.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                    {topic.title}
                  </h3>
                  <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">{topic.desc}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-purple-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-purple-400">
                    Read guide{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Code Snippet Quick Peek */}
      <section className="border-t border-zinc-200/50 bg-zinc-50 py-24 dark:border-white/5 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-zinc-900 dark:text-white">
                Developer-first experience
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                We've built SDKs for every major language, so you can integrate our platform using
                the tools you already know and love. Copy-paste ready snippets are available in
                every guide.
              </p>

              <div className="flex gap-3">
                <span className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                  Node.js
                </span>
                <span className="cursor-pointer rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:hover:text-white">
                  Python
                </span>
                <span className="cursor-pointer rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:hover:text-white">
                  Go
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] shadow-2xl"
            >
              <div className="flex items-center border-b border-[#30363d] bg-[#161b22] px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 font-mono text-xs text-zinc-400">index.ts</div>
              </div>
              <div className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-[#c9d1d9]">
                <div>
                  <span className="text-[#ff7b72]">import</span> {"{"} TaskkClient {"}"}{" "}
                  <span className="text-[#ff7b72]">from</span>{" "}
                  <span className="text-[#a5d6ff]">'@taskk/sdk'</span>;
                </div>
                <div className="mt-4">
                  <span className="text-[#ff7b72]">const</span> client ={" "}
                  <span className="text-[#ff7b72]">new</span>{" "}
                  <span className="text-[#d2a8ff]">TaskkClient</span>({"{"}
                </div>
                <div>
                  {" "}
                  apiKey: process.env.<span className="text-[#79c0ff]">TASKK_API_KEY</span>
                </div>
                <div>{"}"});</div>
                <div className="mt-4">
                  <span className="text-[#ff7b72]">async function</span>{" "}
                  <span className="text-[#d2a8ff]">init</span>() {"{"}
                </div>
                <div>
                  {" "}
                  <span className="text-[#ff7b72]">const</span> user ={" "}
                  <span className="text-[#ff7b72]">await</span> client.users.
                  <span className="text-[#d2a8ff]">identify</span>({"{"}
                </div>
                <div>
                  {" "}
                  id: <span className="text-[#a5d6ff]">'usr_123'</span>,
                </div>
                <div>
                  {" "}
                  email: <span className="text-[#a5d6ff]">'hello@example.com'</span>
                </div>
                <div> {"}"});</div>
                <div>
                  {" "}
                  <span className="text-[#79c0ff]">console</span>.
                  <span className="text-[#d2a8ff]">log</span>(user);
                </div>
                <div>{"}"}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SaaSCta />
      <SaaSFooter />
    </div>
  );
}
