import { motion } from "framer-motion";

export const ProStyleVisualEditor = () => (
  <section className="relative overflow-hidden bg-[#0B1120] py-24 sm:py-32 w-full rounded-2xl border border-blue-900/30 font-sans">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
    <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-900/20 blur-3xl" />
    <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center">
      <div className="w-full lg:w-1/3 text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-2 text-indigo-400 font-medium mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <span>Introducing Blocks</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Pro Style <br/> with Visual Editor
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-zinc-400">
          hudbird visual editor drag n drop premade beautifully section made with love in Bali.
        </motion.p>
      </div>

      <div className="w-full lg:w-2/3 relative h-[600px] flex items-center justify-center">
        {/* Card 1: Inspiration Board */}
        <motion.div 
          initial={{ opacity: 0, y: 40, x: -20, rotate: -5 }} 
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="absolute left-0 lg:left-10 top-10 w-48 p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl"
        >
           <div className="text-xs font-medium text-zinc-400 mb-3 flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/></svg> Inspiration</div>
           <div className="grid grid-cols-2 gap-2">
             <div className="h-20 rounded-lg bg-zinc-800" />
             <div className="h-20 rounded-lg bg-zinc-800" />
             <div className="h-20 rounded-lg bg-zinc-800" />
             <div className="h-20 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold">+16</div>
           </div>
        </motion.div>

        {/* Card 2: Main Stat */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          className="absolute z-10 w-64 p-6 bg-zinc-900/90 backdrop-blur-xl rounded-3xl border border-zinc-700 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">MAU JAN 2023</span>
            <span className="text-xs text-zinc-500">Last 28 days</span>
          </div>
          <div className="text-5xl font-light text-white mb-2">52k</div>
          <div className="text-sm text-zinc-400">Marketing campaign effectiveness</div>
          <div className="mt-6 h-12 w-full flex items-end">
             <svg viewBox="0 0 100 35" className="w-full h-full stroke-indigo-500 fill-none overflow-visible" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               <motion.path 
                 d="M0 20 Q 20 5, 40 25 T 80 15 T 100 5" 
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
               />
             </svg>
          </div>
        </motion.div>

        {/* Card 3: User Info / Road map */}
        <motion.div 
          initial={{ opacity: 0, y: -40, x: 20, rotate: 5 }} 
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          className="absolute right-0 lg:right-10 top-16 w-56 p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500" />
             <div>
               <div className="text-sm font-bold text-white">Amara Robinson</div>
               <div className="text-[10px] text-zinc-500">amara@changer.com</div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
               <div className="text-zinc-500 mb-1">18 Jan 2022</div>
               <div className="font-medium text-zinc-300">JOIN DATE</div>
            </div>
            <div>
               <div className="text-zinc-500 mb-1">72 sales</div>
               <div className="font-medium text-zinc-300">SALES MADE</div>
            </div>
          </div>
        </motion.div>
        
        {/* Card 4: Dark Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 40, x: 40 }} 
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          className="absolute right-4 lg:right-20 bottom-20 w-56 p-5 bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl"
        >
          <div className="text-xs font-medium text-zinc-400 mb-4 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"/> Our journey</div>
          <div className="relative pl-4 border-l border-zinc-800 space-y-4">
             <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-zinc-900" />
                <div className="text-sm font-medium text-zinc-200">First concept</div>
                <div className="h-12 mt-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-sky-500/20 border border-blue-500/10" />
             </div>
             <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-zinc-900" />
                <div className="text-sm font-medium text-zinc-500">When things got serious</div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
