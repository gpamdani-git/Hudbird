import re
import sys

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'r') as f:
    content = f.read()

# 1. Insert AtomicIllustration below TerminalAnimation
atomic_components = """
const AtomicIllustration = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = [
      2500, // Phase 0: Atoms
      2500, // Phase 1: Molecules
      2500, // Phase 2: Sections
      3500, // Phase 3: Templates
    ];
    let timeout = setTimeout(() => {
      setPhase((s) => (s >= 3 ? 0 : s + 1));
    }, sequence[phase]);
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="relative flex h-[400px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950/80">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <AnimatePresence mode="popLayout">
        {phase === 0 && (
           <motion.div key="atoms" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, type: "spring" }} className="flex gap-8 items-center z-10">
             {/* Atom 1: Button */}
             <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex h-12 w-28 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/20">
               <div className="h-2 w-12 rounded-full bg-white/50" />
             </motion.div>
             {/* Atom 2: Input */}
             <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex h-12 w-56 items-center rounded-lg border border-zinc-300 bg-white px-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
               <div className="h-2 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
             </motion.div>
             {/* Atom 3: Avatar */}
             <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="h-14 w-14 rounded-full bg-purple-500 shadow-lg shadow-purple-500/20" />
           </motion.div>
        )}
        
        {phase === 1 && (
           <motion.div key="molecules" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, type: "spring" }} className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 w-96 z-10">
              <div className="flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-purple-500" />
                 <div className="flex flex-col gap-3 flex-1">
                    <div className="h-3 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div className="h-2 w-1/2 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                 </div>
              </div>
              <div className="flex gap-3 mt-4">
                 <div className="flex-1 h-12 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/50" />
                 <div className="w-28 h-12 rounded-lg bg-indigo-500" />
              </div>
           </motion.div>
        )}

        {phase === 2 && (
           <motion.div key="organisms" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5, type: "spring" }} className="w-[500px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 z-10">
              {/* Header */}
              <div className="flex h-12 items-center justify-between border-b border-zinc-100 px-6 dark:border-zinc-800">
                 <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
                 <div className="flex gap-4">
                    <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-7 w-7 rounded-full bg-purple-500" />
                 </div>
              </div>
              {/* Hero Section */}
              <div className="flex flex-col items-center gap-5 py-16 px-6 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/10">
                 <div className="h-6 w-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-2" />
                 <div className="h-8 w-72 rounded-md bg-zinc-800 dark:bg-zinc-200" />
                 <div className="h-4 w-56 rounded-md bg-zinc-400 dark:bg-zinc-600" />
                 <div className="flex gap-4 mt-6">
                    <div className="h-12 w-32 rounded-lg bg-indigo-500" />
                    <div className="h-12 w-32 rounded-lg border border-zinc-200 dark:border-zinc-700" />
                 </div>
              </div>
           </motion.div>
        )}

        {phase === 3 && (
           <motion.div key="template" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, type: "spring" }} className="flex w-[640px] h-[340px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 z-10">
              {/* Sidebar Directory */}
              <div className="w-52 border-r border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-2 mb-6">
                   <div className="h-3 w-3 rounded-full bg-red-400" />
                   <div className="h-3 w-3 rounded-full bg-yellow-400" />
                   <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded text-blue-500"><FolderIcon /></div>
                      <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
                   </div>
                   <div className="pl-7 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded bg-zinc-300 dark:bg-zinc-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded bg-zinc-300 dark:bg-zinc-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-14 rounded bg-zinc-300 dark:bg-zinc-600" />
                      </div>
                   </div>
                   <div className="flex items-center gap-3 pt-2">
                      <div className="w-4 h-4 rounded text-indigo-500"><FolderIcon /></div>
                      <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
                   </div>
                </div>
              </div>
              {/* Main Content Layout */}
              <div className="flex flex-1 flex-col p-5 gap-5 bg-zinc-50/50 dark:bg-zinc-950">
                 <div className="h-14 w-full rounded-xl bg-white border border-zinc-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800" />
                 <div className="flex gap-5 h-full">
                    <div className="w-2/3 h-full rounded-xl bg-white border border-zinc-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800" />
                    <div className="w-1/3 flex flex-col gap-5">
                       <div className="flex-1 rounded-xl bg-white border border-zinc-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800" />
                       <div className="flex-1 rounded-xl bg-white border border-zinc-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800" />
                    </div>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Label overlays */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {["Atoms", "Molecules", "Sections", "Templates"].map((label, i) => (
          <div key={label} className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${phase === i ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105" : "bg-white/70 text-zinc-500 shadow-sm backdrop-blur-sm dark:bg-black/50 dark:text-zinc-500 scale-95"}`}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);
"""

insert_idx = content.find("export const AiStartupTemplate = () => {")
if insert_idx == -1:
    print("Could not find AiStartupTemplate")
    sys.exit(1)

content = content[:insert_idx] + atomic_components + "\n" + content[insert_idx:]

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'w') as f:
    f.write(content)

