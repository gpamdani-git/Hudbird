import { motion } from "framer-motion";

export const ProStyleVisualEditor = () => (
  <section className="relative w-full overflow-hidden rounded-2xl border border-blue-900/30 bg-[#0B1120] py-24 font-sans sm:py-32">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
    <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-900/20 blur-3xl" />
    <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl" />

    <div className="mx-auto w-full max-w-7xl space-y-16 px-4 sm:px-8 lg:px-12">
      <div className="w-full text-left lg:w-1/3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex items-center gap-2 font-medium text-indigo-400"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Introducing Blocks</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Pro Style <br /> with UI Components
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-zinc-400"
        >
          hudbird UI components made beautifully with love in Bali.
        </motion.p>
      </div>

      <div className="relative flex h-[600px] w-full items-center justify-center lg:w-2/3">
        {/* Card 1: Inspiration Board */}
        <motion.div
          initial={{ opacity: 0, y: 40, x: -20, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="absolute top-10 left-0 w-48 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-md lg:left-10"
        >
          <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
            </svg>{" "}
            Inspiration
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-20 rounded-lg bg-zinc-800" />
            <div className="h-20 rounded-lg bg-zinc-800" />
            <div className="h-20 rounded-lg bg-zinc-800" />
            <div className="flex h-20 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/20 text-xs font-bold text-indigo-400">
              +16
            </div>
          </div>
        </motion.div>

        {/* Card 2: Main Stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          className="absolute z-10 w-64 rounded-3xl border border-zinc-700 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded bg-indigo-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-indigo-400 uppercase">
              MAU JAN 2023
            </span>
            <span className="text-xs text-zinc-500">Last 28 days</span>
          </div>
          <div className="mb-2 text-5xl font-light text-white">52k</div>
          <div className="text-sm text-zinc-400">Marketing campaign effectiveness</div>
          <div className="mt-6 flex h-12 w-full items-end">
            <svg
              viewBox="0 0 100 35"
              className="h-full w-full overflow-visible fill-none stroke-indigo-500"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M0 20 Q 20 5, 40 25 T 80 15 T 100 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
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
          className="absolute top-16 right-0 w-56 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-md lg:right-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500" />
            <div>
              <div className="text-sm font-bold text-white">Amara Robinson</div>
              <div className="text-[10px] text-zinc-500">amara@changer.com</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="mb-1 text-zinc-500">18 Jan 2022</div>
              <div className="font-medium text-zinc-300">JOIN DATE</div>
            </div>
            <div>
              <div className="mb-1 text-zinc-500">72 sales</div>
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
          className="absolute right-4 bottom-20 w-56 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-md lg:right-20"
        >
          <div className="mb-4 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Our journey
          </div>
          <div className="relative space-y-4 border-l border-zinc-800 pl-4">
            <div className="relative">
              <div className="absolute top-1 -left-[21px] h-2.5 w-2.5 rounded-full border-2 border-zinc-900 bg-zinc-700" />
              <div className="text-sm font-medium text-zinc-200">First concept</div>
              <div className="mt-2 h-12 rounded-lg border border-blue-500/10 bg-gradient-to-r from-blue-500/20 to-sky-500/20" />
            </div>
            <div className="relative">
              <div className="absolute top-1 -left-[21px] h-2.5 w-2.5 rounded-full border-2 border-zinc-900 bg-zinc-700" />
              <div className="text-sm font-medium text-zinc-500">When things got serious</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
