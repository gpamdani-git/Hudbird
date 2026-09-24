const fs = require("fs");
const path =
  "/Users/daniakbar/Documents/AISTUDIO APP/BlankUI-/apps/docs/src/components/templates/ModernAppTemplate.tsx";
let content = fs.readFileSync(path, "utf8");

// 1. Add Mail to lucide-react imports
content = content.replace(
  '  Phone,\n} from "lucide-react";',
  '  Phone,\n  Mail,\n} from "lucide-react";'
);

// 2. Replace Hero Section
const heroStart = content.indexOf("{/* Hero Section */}");
const heroEnd = content.indexOf("{/* Logo Cloud Section */}");

const newHero = `{/* Hero Section */}
      <Hero
        size="full"
        className="relative overflow-hidden bg-[#020617] text-white transition-colors duration-500 dark:bg-[#020617]"
      >
        {/* Starry background effect (CSS radial gradients) */}
        <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        {/* Deep background glow and intense vertical beam */}
        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-end overflow-hidden">
          {/* Intense Vertical Beam */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-rose-300 to-rose-600 shadow-[0_0_20px_rgba(225,29,72,1)]"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-0 left-1/2 h-full w-[80px] -translate-x-1/2 bg-rose-500/30 blur-[40px]"
          ></motion.div>
          
          {/* Core Core Glow */}
          <div className="absolute top-[30%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-rose-600/20 blur-[120px]" />

          {/* Bottom horizon line blur */}
          <div className="absolute right-0 bottom-0 left-0 h-64 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-32 sm:pt-40 lg:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroBadge className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-300 backdrop-blur-md shadow-[0_0_15px_rgba(225,29,72,0.15)]">
              <Sparkles className="h-3.5 w-3.5 text-rose-400" />
              <span>Take note using AI</span>
            </HeroBadge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <HeroTitle className="mt-6 text-center text-5xl leading-tight font-medium tracking-tight text-white sm:text-6xl md:text-[4.5rem]">
              The Future of Note <br className="hidden md:block" /> Taking Starts with AI
            </HeroTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroDescription className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-zinc-400">
              Plan less, focus more. Your personal task workspace, reimagined for deep work.
            </HeroDescription>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex w-full justify-center"
          >
            <form className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 pl-6 shadow-[0_0_40px_rgba(225,29,72,0.2)] backdrop-blur-xl transition-all focus-within:border-rose-500/50 focus-within:bg-white/10">
              <Mail className="h-5 w-5 text-zinc-400" />
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                required
              />
              <button
                type="button"
                className="shrink-0 rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] transition hover:bg-rose-500"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>

        {/* Desktop App UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-20 mx-auto mt-20 w-full max-w-5xl px-4 pb-0"
        >
          {/* Intersecting horizontal glow at the top edge of mockup */}
          <div className="absolute top-0 left-1/2 z-30 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-80 shadow-[0_0_15px_rgba(225,29,72,1)]" />
          <div className="absolute top-0 left-1/2 z-30 h-[40px] w-1/2 -translate-x-1/2 bg-rose-500/40 blur-2xl" />

          <div className="relative overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#0c101d]/90 backdrop-blur-2xl shadow-[0_-20px_80px_-15px_rgba(225,29,72,0.2)] transition-colors duration-500">
            {/* Mockup Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Smartphone className="h-5 w-5 text-rose-400" />
                  <span className="font-semibold tracking-tight">Agex</span>
                </div>
                <div className="hidden h-4 w-px bg-white/10 sm:block" />
                <div className="hidden items-center gap-2 text-sm text-zinc-400 sm:flex">
                  <MessageCircle className="h-4 w-4" />
                  <span>Channels</span>
                  <ChevronDown className="h-3 w-3" />
                  <span className="rounded bg-white/5 px-2 py-0.5 text-white">
                    Design Team
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-[#0c101d] bg-rose-400"></div>
                  <div className="h-7 w-7 rounded-full border-2 border-[#0c101d] bg-blue-400"></div>
                  <div className="h-7 w-7 rounded-full border-2 border-[#0c101d] bg-orange-400"></div>
                </div>
                <span className="hidden text-xs text-zinc-400 sm:inline-block">
                  3 Online
                </span>
              </div>
            </div>

            {/* Mockup Body Layout */}
            <div className="flex h-[400px]">
              {/* Sidebar */}
              <div className="hidden w-56 border-r border-white/5 p-4 md:block bg-white/[0.02]">
                <div className="mb-6 flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs text-zinc-400">
                  <Sparkles className="h-3 w-3 text-rose-400" /> Pulse AI
                </div>
                <nav className="space-y-1">
                  {["# general", "# design-team", "# engineering", "# marketing"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={\`flex items-center gap-3 rounded-md px-3 py-2 text-sm \${i === 1 ? "bg-rose-500/10 font-medium text-rose-400" : "text-zinc-400"}\`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </nav>
                <div className="mt-8 mb-2 px-3 text-xs font-semibold text-zinc-500">DIRECT MESSAGES</div>
                <nav className="space-y-1">
                  {["Alex Johnson", "Sarah Mitchell", "Mike Chen"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400"
                      >
                        <div className={\`h-2 w-2 rounded-full \${i === 0 ? "bg-green-500" : "bg-zinc-600"}\`}></div>
                        {item}
                      </div>
                    )
                  )}
                </nav>
              </div>

              {/* Main Chat Content */}
              <div className="flex flex-1 flex-col p-4 sm:p-6 bg-[#0c101d]">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      # design-team
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white">
                      <Phone className="h-3 w-3" /> Huddle
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex flex-1 flex-col justify-end gap-6 pb-2">
                  {/* Incoming */}
                  <div className="flex max-w-[80%] items-start gap-3">
                    <div className="mt-1 h-8 w-8 rounded-full bg-blue-400 shrink-0"></div>
                    <div className="rounded-2xl rounded-tl-none border border-white/5 bg-white/5 p-3 shadow-sm">
                      <div className="text-xs font-medium text-white mb-1">Sarah Mitchell</div>
                      <div className="text-sm text-zinc-300">
                        I've uploaded the new mockup for the mobile app navigation. Let me know what you think!
                      </div>
                      <div className="mt-2 h-20 w-40 rounded-lg bg-white/5 border border-white/10"></div>
                    </div>
                  </div>
                  {/* Outgoing */}
                  <div className="flex max-w-[80%] self-end items-start gap-3 flex-row-reverse">
                    <div className="mt-1 h-8 w-8 rounded-full bg-rose-400 shrink-0"></div>
                    <div className="rounded-2xl rounded-tr-none bg-rose-600 p-3 shadow-sm text-white">
                      <div className="text-sm">
                        Looks incredible! The new spacing is much better. I'll start implementing this today.
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Input */}
                <div className="mt-4 flex items-center rounded-lg border border-white/10 bg-white/5 p-2 shadow-sm">
                  <span className="text-sm text-zinc-500 pl-2">Message #design-team...</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Hero>

      `;

content = content.substring(0, heroStart) + newHero + content.substring(heroEnd);
fs.writeFileSync(path, content, "utf8");
