// apps/docs/app/page.tsx
export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="inline-flex items-center rounded-full border border-[rgb(var(--primary))]/30 bg-[rgb(var(--primary))]/10 px-3 py-1 text-sm font-medium text-[rgb(var(--primary))] mb-8">
        🚀 Phase 2: Documentation Site Ready
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-3xl">
        Build Premium UIs <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--primary))] to-blue-500">
          At Lightning Speed
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        A gorgeous, fully accessible, and customizable component library built on top of Tailwind CSS and React. Designed for maximum developer experience.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button className="h-12 px-8 rounded-full bg-[rgb(var(--primary))] text-white font-semibold shadow-xl shadow-[rgb(var(--primary))]/25 hover:opacity-90 transition-opacity">
          Get Started
        </button>
        <button className="h-12 px-8 rounded-full bg-muted text-foreground font-semibold border border-border hover:bg-muted/80 transition-colors">
          View Components
        </button>
      </div>

      <div className="w-full max-w-2xl text-left bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0f172a]">
          <span className="text-xs font-mono text-slate-400">Install via pnpm</span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
          </div>
        </div>
        <div className="p-6">
          <code className="font-mono text-sm text-emerald-400">
            pnpm add @my-lib/core @my-lib/theme
          </code>
        </div>
      </div>
    </div>
  );
}
