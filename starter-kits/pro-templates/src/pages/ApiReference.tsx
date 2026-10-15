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
)`,
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />
      <DocsSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 pt-24 sm:px-6 lg:px-8">
        {/* Left Sidebar - Navigation */}
        <aside className="sticky top-24 hidden max-h-[calc(100vh-6rem)] w-64 shrink-0 flex-col overflow-y-auto border-r border-zinc-200 pt-8 pr-8 pb-10 lg:flex dark:border-white/5">
          <div className="group relative mb-6 cursor-pointer" onClick={() => setSearchOpen(true)}>
            <div className="absolute inset-0 rounded-full bg-zinc-100/50 opacity-0 blur-md transition-all group-hover:bg-zinc-200/50 group-hover:opacity-100" />
            <Search className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <div className="relative z-10 flex w-full items-center justify-between rounded-full border border-zinc-200 bg-white py-2 pr-4 pl-9 text-sm text-zinc-500 transition-colors select-none group-hover:border-zinc-500 dark:border-white/10 dark:bg-[#12141D] dark:text-zinc-400">
              <span>Search docs...</span>
              <kbd className="hidden items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 sm:inline-flex dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                ⌘K
              </kbd>
            </div>
          </div>

          <nav className="flex flex-col gap-8">
            {docsSidebarData.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
                  {section.category}
                </h3>
                <ul className="ml-2 flex flex-col gap-2 border-l border-zinc-200 pl-4 dark:border-white/10">
                  {section.links.map((link, i) => {
                    const isActive = link.title === "Workspaces"; // Mock active state for preview
                    return (
                      <li key={i}>
                        <Link
                          to={link.href}
                          className={`block py-1 text-sm transition-colors ${
                            isActive
                              ? "-ml-[17px] border-l border-zinc-500 pl-4 font-medium text-purple-600 dark:text-purple-400"
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
        <main className="min-w-0 flex-1 py-8 pb-24 lg:px-12">
          <div className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
            <Link
              to="/docs"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              Docs
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-zinc-900 dark:text-white">API Reference</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Workspaces API
            </h1>
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Workspaces are the top-level container in Taskk. Every project, task, and user belongs
              to a workspace. Use the Workspaces API to provision new tenants programmatically.
            </p>

            <div className="mb-10 h-px w-full bg-zinc-200 dark:bg-white/10" />

            {/* Endpoint block */}
            <div className="flex flex-col items-start gap-10 xl:flex-row">
              <div className="w-full shrink-0 xl:w-1/2">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded bg-zinc-100/50 px-2 py-1 text-xs font-bold tracking-wider text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    POST
                  </span>
                  <code className="font-mono text-sm text-zinc-900 dark:text-zinc-300">
                    /v1/workspaces
                  </code>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                  Create a workspace
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Creates a new workspace and sets the authenticated user as the owner.
                </p>

                <h3 className="mb-4 text-sm font-semibold tracking-wider text-zinc-900 uppercase dark:text-white">
                  Body Parameters
                </h3>

                <div className="space-y-4">
                  <div className="border-b border-zinc-200 pb-4 dark:border-white/5">
                    <div className="mb-1 flex items-baseline gap-2">
                      <code className="text-sm font-bold text-zinc-900 dark:text-white">name</code>
                      <span className="text-xs font-medium text-red-500">required</span>
                      <span className="font-mono text-xs text-zinc-500">string</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      The human-readable display name of the workspace. Maximum 50 characters.
                    </p>
                  </div>

                  <div className="border-b border-zinc-200 pb-4 dark:border-white/5">
                    <div className="mb-1 flex items-baseline gap-2">
                      <code className="text-sm font-bold text-zinc-900 dark:text-white">plan</code>
                      <span className="text-xs font-medium text-zinc-500">optional</span>
                      <span className="font-mono text-xs text-zinc-500">enum</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      The billing plan. Can be{" "}
                      <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-white/10">
                        free
                      </code>
                      ,{" "}
                      <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-white/10">
                        pro
                      </code>
                      , or{" "}
                      <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-white/10">
                        enterprise
                      </code>
                      . Defaults to free.
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Panel */}
              <div className="sticky top-32 w-full xl:w-1/2">
                <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl">
                  {/* Tabs */}
                  <div className="no-scrollbar flex items-center overflow-x-auto border-b border-[#30363d] bg-[#161b22] px-4">
                    <button
                      onClick={() => setActiveTab("curl")}
                      className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-xs transition-colors ${activeTab === "curl" ? "border-zinc-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
                    >
                      <Terminal className="h-3.5 w-3.5" /> cURL
                    </button>
                    <button
                      onClick={() => setActiveTab("node")}
                      className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-xs transition-colors ${activeTab === "node" ? "border-zinc-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
                    >
                      <Code2 className="h-3.5 w-3.5" /> Node.js
                    </button>
                    <button
                      onClick={() => setActiveTab("python")}
                      className={`flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-xs transition-colors ${activeTab === "python" ? "border-zinc-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
                    >
                      <Code2 className="h-3.5 w-3.5" /> Python
                    </button>
                  </div>

                  {/* Code */}
                  <div className="group relative p-4">
                    <button
                      onClick={() => copyToClipboard(codeSnippets[activeTab], "code")}
                      className="absolute top-4 right-4 rounded-md bg-white/5 p-2 text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white"
                    >
                      {copiedId === "code" ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <pre className="overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre text-[#c9d1d9]">
                      {codeSnippets[activeTab]}
                    </pre>
                  </div>

                  {/* Response */}
                  <div className="border-t border-[#30363d] bg-[#0d1117] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-400">Response</span>
                      <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" /> 200 OK
                      </span>
                    </div>
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[#a5d6ff]">
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
        <aside className="sticky top-24 hidden max-h-[calc(100vh-6rem)] w-48 shrink-0 flex-col overflow-y-auto pt-8 pb-10 xl:flex">
          <h4 className="mb-3 text-xs font-bold tracking-wider text-zinc-900 uppercase dark:text-white">
            On this page
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href="#" className="font-medium text-purple-600 dark:text-purple-400">
                Create a workspace
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                List workspaces
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Get a workspace
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Update a workspace
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Delete a workspace
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <SaaSFooter />
    </div>
  );
}
