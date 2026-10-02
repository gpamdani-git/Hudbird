import React, { useState, useEffect } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { motion } from "framer-motion";
import { ChevronRight, Search, Copy, Check, Terminal, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { DocsSearchModal, docsSidebarData } from "@/components/marketing/SaaS/Docs/DocsSearchModal";

export function ApiReference() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"curl" | "node" | "python">("curl");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    document.addEventListener("open-docs-search", handleOpenSearch);
    return () => document.removeEventListener("open-docs-search", handleOpenSearch);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const codeSnippets = {
    curl: `curl -X POST https://api.taskk.dev/v1/workspaces \\
  -H "Authorization: Bearer sk_live_12345" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Acme Corp",
    "plan": "enterprise"
  }'`,
    node: `import { Taskk } from '@taskk/node';

const taskk = new Taskk('sk_live_12345');

const workspace = await taskk.workspaces.create({
  name: 'Acme Corp',
  plan: 'enterprise'
});`,
    python: `import taskk

client = taskk.Client('sk_live_12345')

workspace = client.workspaces.create(
    name='Acme Corp',
    plan='enterprise'
)`
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />
      <DocsSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      <div className="mx-auto flex w-full max-w-7xl flex-1 pt-24 px-4 sm:px-6 lg:px-8">
        
        {/* Left Sidebar - Navigation */}
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto pb-10 pr-8 pt-8 lg:flex border-r border-zinc-200 dark:border-white/5 sticky top-24 max-h-[calc(100vh-6rem)]">
          <div className="relative mb-6 cursor-pointer group" onClick={() => setSearchOpen(true)}>
            <div className="absolute inset-0 bg-zinc-100/50 blur-md rounded-full group-hover:bg-zinc-200/50 transition-all opacity-0 group-hover:opacity-100" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 z-10" />
            <div 
              className="w-full rounded-full border border-zinc-200 bg-white dark:bg-[#12141D] py-2 pl-9 pr-4 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 group-hover:border-zinc-500 transition-colors relative z-10 select-none flex items-center justify-between"
            >
              <span>Search docs...</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">⌘K</kbd>
            </div>
          </div>
          
          <nav className="flex flex-col gap-8">
            {docsSidebarData.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">{section.category}</h3>
                <ul className="flex flex-col gap-2 border-l border-zinc-200 dark:border-white/10 ml-2 pl-4">
                  {section.links.map((link, i) => {
                    const isActive = link.title === "Workspaces"; // Mock active state for preview
                    return (
                      <li key={i}>
                        <Link 
                          to={link.href} 
                          className={`text-sm block py-1 transition-colors ${
                            isActive 
                              ? "font-medium text-purple-600 dark:text-purple-400 -ml-[17px] border-l border-zinc-500 pl-4" 
                              : "text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400"
                          }`}
                        >
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-8 lg:px-12 pb-24">
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link to="/docs" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Docs</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-zinc-900 dark:text-white font-medium">API Reference</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              Workspaces API
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-3xl">
              Workspaces are the top-level container in Taskk. Every project, task, and user belongs to a workspace. Use the Workspaces API to provision new tenants programmatically.
            </p>

            <div className="h-px w-full bg-zinc-200 dark:bg-white/10 mb-10" />

            {/* Endpoint block */}
            <div className="flex flex-col xl:flex-row gap-10 items-start">
              
              <div className="w-full xl:w-1/2 shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded bg-zinc-100/50 dark:bg-emerald-500/10 px-2 py-1 text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400">POST</span>
                  <code className="text-sm font-mono text-zinc-900 dark:text-zinc-300">/v1/workspaces</code>
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Create a workspace</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
                  Creates a new workspace and sets the authenticated user as the owner.
                </p>

                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Body Parameters</h3>
                
                <div className="space-y-4">
                  <div className="border-b border-zinc-200 dark:border-white/5 pb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <code className="text-sm font-bold text-zinc-900 dark:text-white">name</code>
                      <span className="text-xs text-red-500 font-medium">required</span>
                      <span className="text-xs text-zinc-500 font-mono">string</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">The human-readable display name of the workspace. Maximum 50 characters.</p>
                  </div>
                  
                  <div className="border-b border-zinc-200 dark:border-white/5 pb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <code className="text-sm font-bold text-zinc-900 dark:text-white">plan</code>
                      <span className="text-xs text-zinc-500 font-medium">optional</span>
                      <span className="text-xs text-zinc-500 font-mono">enum</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">The billing plan. Can be <code className="bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded text-xs">free</code>, <code className="bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded text-xs">pro</code>, or <code className="bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded text-xs">enterprise</code>. Defaults to free.</p>
                  </div>
                </div>
              </div>

              {/* Code Panel */}
              <div className="w-full xl:w-1/2 sticky top-32">
                <div className="rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-2xl">
                  {/* Tabs */}
                  <div className="flex items-center px-4 bg-[#161b22] border-b border-[#30363d] overflow-x-auto no-scrollbar">
                    <button 
                      onClick={() => setActiveTab("curl")}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-mono border-b-2 transition-colors ${activeTab === "curl" ? "border-zinc-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
                    >
                      <Terminal className="w-3.5 h-3.5" /> cURL
                    </button>
                    <button 
                      onClick={() => setActiveTab("node")}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-mono border-b-2 transition-colors ${activeTab === "node" ? "border-zinc-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
                    >
                      <Code2 className="w-3.5 h-3.5" /> Node.js
                    </button>
                    <button 
                      onClick={() => setActiveTab("python")}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-mono border-b-2 transition-colors ${activeTab === "python" ? "border-zinc-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
                    >
                      <Code2 className="w-3.5 h-3.5" /> Python
                    </button>
                  </div>

                  {/* Code */}
                  <div className="relative group p-4">
                    <button 
                      onClick={() => copyToClipboard(codeSnippets[activeTab], "code")}
                      className="absolute top-4 right-4 p-2 rounded-md bg-white/5 text-zinc-400 opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-white transition-all"
                    >
                      {copiedId === "code" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-[#c9d1d9] whitespace-pre">
                      {codeSnippets[activeTab]}
                    </pre>
                  </div>

                  {/* Response */}
                  <div className="border-t border-[#30363d] bg-[#0d1117] p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-mono text-zinc-400">Response</span>
                      <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400" /> 200 OK</span>
                    </div>
                    <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-[#a5d6ff]">
{`{
  "id": "ws_01H1V2...",
  "name": "Acme Corp",
  "plan": "enterprise",
  "created_at": "2026-10-02T10:00:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </main>

        {/* Right Sidebar - TOC */}
        <aside className="hidden w-48 shrink-0 flex-col overflow-y-auto pb-10 pt-8 xl:flex sticky top-24 max-h-[calc(100vh-6rem)]">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">On this page</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><a href="#" className="text-purple-600 dark:text-purple-400 font-medium">Create a workspace</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">List workspaces</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Get a workspace</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Update a workspace</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Delete a workspace</a></li>
          </ul>
        </aside>

      </div>
      <SaaSFooter />
    </div>
  );
}
