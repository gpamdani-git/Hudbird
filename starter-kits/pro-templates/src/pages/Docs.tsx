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
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-zinc-200/50 dark:border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-zinc-100/50 dark:bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 mb-8 w-fit">
            Resources / Documentation
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white mb-8">
            How can we <span className="italic font-light text-zinc-500 dark:text-zinc-400">help you?</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative group cursor-pointer"
            onClick={() => setSearchOpen(true)}
          >
            <div className="absolute inset-0 bg-zinc-100/50 blur-xl rounded-2xl group-hover:bg-zinc-200/50 transition-all opacity-0 group-hover:opacity-100" />
            <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-sm hover:border-zinc-500 hover:ring-1 hover:ring-zinc-500 transition-all">
              <Search className="w-5 h-5 text-zinc-400 ml-4 shrink-0" />
              <div className="w-full bg-transparent px-4 py-4 text-left text-zinc-500 dark:text-zinc-400 select-none">
                Search documentation, API references, guides...
              </div>
              <div className="pr-4 flex items-center gap-1 shrink-0">
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">⌘</kbd>
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">K</kbd>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Popular Guides */}
      <section className="py-24 bg-white dark:bg-[#0A0C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-10">Popular <span className="italic font-light text-zinc-500 dark:text-zinc-400">Topics</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Quickstart Guide", desc: "Get up and running in less than 5 minutes.", icon: <Zap className="w-5 h-5 text-purple-500" />, href: "/docs/api-reference" },
              { title: "API Reference", desc: "Detailed endpoints, parameters, and responses.", icon: <Code2 className="w-5 h-5 text-purple-500" />, href: "/docs/api-reference" },
              { title: "Authentication", desc: "Learn about OAuth2, JWTs, and API keys.", icon: <Shield className="w-5 h-5 text-purple-500" />, href: "/docs/api-reference" },
              { title: "CLI Tool", desc: "Manage resources directly from your terminal.", icon: <Terminal className="w-5 h-5 text-purple-500" />, href: "/docs/api-reference" },
              { title: "Webhooks", desc: "Subscribe to real-time events and updates.", icon: <Book className="w-5 h-5 text-purple-500" />, href: "/docs/api-reference" },
              { title: "Account Settings", desc: "Manage billing, teams, and workspace config.", icon: <Settings className="w-5 h-5 text-purple-500" />, href: "/docs/api-reference" },
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
                  className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/5 hover:border-zinc-200 hover:bg-white dark:hover:bg-zinc-900 transition-all flex flex-col h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-100/50 dark:bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {topic.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{topic.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm flex-1">{topic.desc}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Code Snippet Quick Peek */}
      <section className="py-24 bg-zinc-50 dark:bg-[#070912] border-t border-zinc-200/50 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h2 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
                Developer-first experience
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                We've built SDKs for every major language, so you can integrate our platform using the tools you already know and love. Copy-paste ready snippets are available in every guide.
              </p>
              
              <div className="flex gap-3">
                <span className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium dark:text-white bg-white dark:bg-zinc-900">Node.js</span>
                <span className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">Python</span>
                <span className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">Go</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-2xl"
            >
              <div className="flex items-center px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 text-xs font-mono text-zinc-400">index.ts</div>
              </div>
              <div className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-[#c9d1d9]">
                <div><span className="text-[#ff7b72]">import</span> {'{'} TaskkClient {'}'} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@taskk/sdk'</span>;</div>
                <div className="mt-4"><span className="text-[#ff7b72]">const</span> client = <span className="text-[#ff7b72]">new</span> <span className="text-[#d2a8ff]">TaskkClient</span>({'{'}</div>
                <div>  apiKey: process.env.<span className="text-[#79c0ff]">TASKK_API_KEY</span></div>
                <div>{'}'});</div>
                <div className="mt-4"><span className="text-[#ff7b72]">async function</span> <span className="text-[#d2a8ff]">init</span>() {'{'}</div>
                <div>  <span className="text-[#ff7b72]">const</span> user = <span className="text-[#ff7b72]">await</span> client.users.<span className="text-[#d2a8ff]">identify</span>({'{'}</div>
                <div>    id: <span className="text-[#a5d6ff]">'usr_123'</span>,</div>
                <div>    email: <span className="text-[#a5d6ff]">'hello@example.com'</span></div>
                <div>  {'}'});</div>
                <div>  <span className="text-[#79c0ff]">console</span>.<span className="text-[#d2a8ff]">log</span>(user);</div>
                <div>{'}'}</div>
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
