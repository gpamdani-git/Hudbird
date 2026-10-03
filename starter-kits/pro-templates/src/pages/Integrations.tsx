import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { Blocks, Workflow, Zap, Terminal, Code2, Globe } from "lucide-react";

export function Integrations() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />
      
      {/* SECTION 1: Hero & Features Grid */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-100/50 dark:bg-pink-600/15 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 mb-8 w-fit">
            Product / Integrations
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            Connect your <span className="italic font-light text-zinc-500 dark:text-zinc-400">favorite tools</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Taskk integrates seamlessly with the apps your team already uses. No more switching contexts or moving data manually.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "One-Click Sync", icon: <Zap className="w-6 h-6 text-pink-500" /> },
              { title: "Open API", icon: <Blocks className="w-6 h-6 text-pink-500" /> },
              { title: "Automated Workflows", icon: <Workflow className="w-6 h-6 text-pink-500" /> }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:border-zinc-2000 transition-colors">
                <div className="mb-4 bg-zinc-50 dark:bg-pink-500/10 w-12 h-12 rounded-2xl flex items-center justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Connect to over 100+ services including Slack, Jira, GitHub, and more instantly.</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Logo Marquee/Grid */}
      <section className="py-24 bg-white dark:bg-[#0A0C14] border-y border-zinc-200/50 dark:border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
            Works where you work
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Dozens of native integrations to keep your data perfectly synced across platforms.
          </p>
        </div>
        
        {/* App integrations grid */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-8 items-center justify-items-center opacity-80">
            {[
              { name: "Slack", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg" },
              { name: "Jira", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
              { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertDark: true },
              { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
              { name: "Salesforce", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg" },
              { name: "Google", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" },
              { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
              { name: "Kubernetes", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
              { name: "Cloudflare", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" },
              { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" }
            ].map((app, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex h-16 w-full max-w-[120px] items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 grayscale hover:grayscale-0 transition-all hover:scale-105 cursor-pointer hover:shadow-lg dark:hover:border-white/10"
              >
                <div className="flex items-center justify-center p-2">
                  <img 
                    src={app.src} 
                    alt={`${app.name} integration`} 
                    className={`w-8 h-8 ${app.invertDark ? 'dark:invert' : ''}`}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Developer API */}
      <section className="py-24 bg-zinc-50 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="text-[10px] font-bold tracking-wider text-pink-600 dark:text-pink-400 uppercase mb-4">Built for Developers</div>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
                Extend Taskk with our REST API
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Need something custom? Our robust, thoroughly documented API allows you to programmatically manage projects, users, and workflows directly from your own codebase.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                  <Terminal className="h-4 w-4" />
                  Read the Docs
                </button>
                <button className="flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900">
                  <Code2 className="h-4 w-4" />
                  API Reference
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[400px] w-full rounded-3xl bg-[#0d1117] border border-[#30363d] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Fake Mac Header */}
              <div className="h-10 border-b border-[#30363d] flex items-center px-4 gap-2 bg-[#161b22]">
                <div className="h-3 w-3 rounded-full bg-zinc-100/50" />
                <div className="h-3 w-3 rounded-full bg-zinc-100/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <div className="ml-4 text-xs font-mono text-[#8b949e]">curl - POST /api/v1/projects</div>
              </div>
              
              {/* Code Snippet */}
              <div className="p-6 text-sm font-mono leading-relaxed overflow-auto flex-1">
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">1</span><span className="text-[#c9d1d9]"><span className="text-[#ff7b72]">curl</span> -X POST https://api.taskk.com/v1/projects \</span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">2</span><span className="text-[#c9d1d9]">  -H <span className="text-[#a5d6ff]">"Authorization: Bearer YOUR_API_KEY"</span> \</span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">3</span><span className="text-[#c9d1d9]">  -H <span className="text-[#a5d6ff]">"Content-Type: application/json"</span> \</span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">4</span><span className="text-[#c9d1d9]">  -d <span className="text-[#a5d6ff]">'{'{'}</span></span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">5</span><span className="text-[#c9d1d9]">       <span className="text-[#79c0ff]">"name"</span>: <span className="text-[#a5d6ff]">"Q4 Marketing Campaign"</span>,</span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">6</span><span className="text-[#c9d1d9]">       <span className="text-[#79c0ff]">"team_id"</span>: <span className="text-[#a5d6ff]">"tm_9x8c7v"</span>,</span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">7</span><span className="text-[#c9d1d9]">       <span className="text-[#79c0ff]">"is_private"</span>: <span className="text-[#79c0ff]">false</span></span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">8</span><span className="text-[#c9d1d9]">     <span className="text-[#a5d6ff]">{'}'}'</span></span></div>
                <div className="flex gap-4 mt-4"><span className="text-[#8b949e] select-none">9</span><span className="text-[#8b949e] italic">// Response: 200 OK</span></div>
                <div className="flex gap-4"><span className="text-[#8b949e] select-none">10</span><span className="text-[#c9d1d9]"><span className="text-[#a5d6ff]">'{'{'} "id": "prj_1234", "status": "created" {'}'}'</span></span></div>
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
