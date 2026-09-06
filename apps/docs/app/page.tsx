export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-8">
        🚀 Phase 2: Documentation Site Ready
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-3xl text-zinc-900 dark:text-zinc-50">
        Build Premium UIs <br className="hidden md:block" />
        At Lightning Speed
      </h1>
      <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl">
        A beautiful, minimalist, and highly customizable React component library. 
        Built with Tailwind CSS and React Server Components.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <a 
          href="/components/button" 
          className="h-12 px-8 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-semibold flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all"
        >
          View Components
        </a>
      </div>
    </div>
  );
}
