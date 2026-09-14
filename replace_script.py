import re

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'r') as f:
    content = f.read()

# We want to replace the Agent Showcase grid
# From: <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
# To: the matching closing div before: {/* <!-- Bento Grid V3

# Let's find the start index
start_str = '          {/* Grid Layout */}\n          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">'
start_idx = content.find(start_str)

if start_idx == -1:
    print("Could not find start_str")
    exit(1)

# Let's find the end index
end_str = '          </div>\n        </div>\n      </div>\n\n      {/* <!-- Bento Grid V3'
end_idx = content.find(end_str)

if end_idx == -1:
    print("Could not find end_str")
    exit(1)

new_content = '''          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* Left Main Feature Cards Stack */}
            <div className="flex flex-col gap-12">
              {/* Card 0: CMS */}
              <motion.div 
                onViewportEnter={() => setActiveAgentCard(0)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                className="flex flex-col overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0f1c]"
              >
                {/* Illustration Area */}
                <div className="relative flex min-h-[400px] flex-1 flex-col items-center justify-center p-8 lg:p-12">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_50%)]" />

                  {/* Simulated CMS/Design Interface */}
                  <div className="relative flex w-full max-w-3xl flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950/80">
                    {/* Top Nav */}
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400 dark:bg-red-500/20" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400 dark:bg-yellow-500/20" />
                        <div className="h-3 w-3 rounded-full bg-green-400 dark:bg-green-500/20" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-2 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                      </div>
                    </div>
                    {/* Main Canvas Area */}
                    <div className="flex gap-6">
                      {/* Sidebar */}
                      <div className="hidden w-40 flex-col gap-4 sm:flex">
                        <div className="flex flex-col gap-2">
                          <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                          <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800/50" />
                          <div className="h-3 w-24 rounded bg-zinc-100 dark:bg-zinc-800/50" />
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                          <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                          <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800/50" />
                        </div>
                      </div>
                      {/* Content List */}
                      <div className="flex flex-1 flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800/50">
                          <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
                          <div className="flex gap-4">
                            <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
                            <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
                          </div>
                        </div>
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 rounded-lg border border-zinc-100 bg-white p-3 shadow-sm dark:border-zinc-800/50 dark:bg-white/5"
                          >
                            <div className="h-10 w-16 shrink-0 rounded bg-blue-100 dark:bg-blue-900/30">
                              {/* Simulated Image Content */}
                              <motion.div
                                animate={{ scale: [0.95, 1.05, 0.95] }}
                                transition={{ duration: 4, delay: i, repeat: Infinity }}
                                className="h-full w-full rounded bg-blue-500/20"
                              />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                              <div className="h-2 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700" />
                              <div className="h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                            </div>
                            <div className="hidden h-5 w-16 items-center justify-center rounded-full bg-green-100 sm:flex dark:bg-green-500/10">
                              <div className="h-1.5 w-8 rounded-full bg-green-500/50" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200 bg-zinc-50 p-8 sm:flex-row sm:items-end lg:p-12 dark:border-zinc-800/50 dark:bg-black/20">
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      Run your CMS with an agent
                    </h3>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                      Manage more. Publish faster. The CMS agent sets up, organizes, and updates your
                      entire CMS, connecting it directly to the canvas so content and design stay in
                      sync.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                  >
                    Start with Agents <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Card 1: Accelerate */}
              <motion.div 
                onViewportEnter={() => setActiveAgentCard(1)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                className="flex flex-col overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0f1c]"
              >
                {/* Code Illustration Area */}
                <div className="relative flex min-h-[400px] flex-1 flex-col items-center justify-center p-8 lg:p-12">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
                  
                  {/* Code Block with Typing Animation */}
                  <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 shadow-2xl dark:border-zinc-800">
                    <motion.div
                      animate={{
                        clipPath: [
                          "inset(0 0 100% 0)", 
                          "inset(0 0 80% 0)", 
                          "inset(0 0 60% 0)", 
                          "inset(0 0 40% 0)", 
                          "inset(0 0 20% 0)", 
                          "inset(0 0 0% 0)",
                          "inset(0 0 0% 0)"
                        ]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "steps(6)"
                      }}
                    >
                      <CodeBlock 
                        language="tsx"
                        code={`import { Button, Text } from "@hudbird/ui";
import { BentoGrid } from "@hudbird/marketing";

export function HeroSection() {
  return (
    <BentoGrid>
      <Text variant="strong">Ship Faster</Text>
      <Button variant="solid" color="indigo">
        Deploy Now
      </Button>
    </BentoGrid>
  );
}`}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200 bg-zinc-50 p-8 sm:flex-row sm:items-end lg:p-12 dark:border-zinc-800/50 dark:bg-black/20">
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      Accelerate your development
                    </h3>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                      Everything you need to ship your product faster with ready-to-use layouts and blocks.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                  >
                    Start with Agents <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

            </div>

            {/* Right Agent Chat Card */}
            <div className="sticky top-24 flex h-fit flex-col overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#15151e]">
              {/* Chat Area */}
              <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Agent Bubble */}
                <AnimatePresence mode="wait">
                  {activeAgentCard === 0 && (
                    <motion.div
                      key="bubble-0"
                      initial={{ opacity: 0, scale: 0.9, transformOrigin: "top right" }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, position: "absolute" }}
                      transition={{ type: "spring", bounce: 0.4 }}
                      className="rounded-2xl rounded-tr-sm border border-zinc-100 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800/50 dark:bg-[#20202b]"
                    >
                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">/cms</span> Add
                        these{" "}
                        <span className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50">
                          articles.csv
                        </span>{" "}
                        to my collection and list them on the articles page.
                      </p>
                    </motion.div>
                  )}
                  {activeAgentCard === 1 && (
                    <motion.div
                      key="bubble-1"
                      initial={{ opacity: 0, scale: 0.9, transformOrigin: "top right" }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, position: "absolute" }}
                      transition={{ type: "spring", bounce: 0.4 }}
                      className="rounded-2xl rounded-tr-sm border border-zinc-100 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800/50 dark:bg-[#20202b]"
                    >
                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">/ui</span> Generate a hero section using{" "}
                        <span className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50">
                          @hudbird/ui
                        </span>{" "}
                        components.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Thoughts Area */}
                <div className="flex flex-col gap-4 px-2">
                  <div className="flex items-center justify-between text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span>Thought 8s</span>
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="h-1.5 w-1.5 rounded-full bg-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {activeAgentCard === 0 && (
                        <motion.div
                          key="thought-0"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5, position: "absolute", top: 0, left: 0, right: 0 }}
                          className="w-full"
                        >
                          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            I'll import the articles from your CSV file into the CMS collection. Then I'll
                            connect the collection list to the articles page so all 320 items appear.
                          </p>

                          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">Changes</span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Database className="h-3.5 w-3.5 text-blue-500" /> Blog
                              </div>
                              <span className="text-xs text-zinc-500">320 items</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {activeAgentCard === 1 && (
                        <motion.div
                          key="thought-1"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5, position: "absolute", top: 0, left: 0, right: 0 }}
                          className="w-full"
                        >
                          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            I'll pull in the BentoGrid and Button components, and assemble a responsive hero section for you.
                          </p>

                          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">Changes</span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Layout className="h-3.5 w-3.5 text-indigo-500" /> Hero Section
                              </div>
                              <span className="text-xs text-zinc-500">Added</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-zinc-100 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-black/10">
                <div className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700/50 dark:bg-[#1a1a24]">
                  <span className="text-sm text-zinc-400 dark:text-zinc-500">Add follow up...</span>
                  <div className="flex gap-2 text-zinc-400">
                    <Command className="h-4 w-4" />
                    <ArrowUpCircle className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  <span>GPT 5.6 Terra ⌄</span>
                  <div className="flex gap-2">
                    <div className="h-3.5 w-3.5 rounded-full border border-zinc-300 dark:border-zinc-600" />
                    <div className="h-3.5 w-3.5 rounded-full border border-zinc-300 dark:border-zinc-600" />
                  </div>
                </div>
              </div>
            </div>'''

# The rest of the file after the grid layout
after_content = content[end_idx:]

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'w') as f:
    f.write(content[:start_idx] + new_content + after_content)

print("Replaced successfully!")
