/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className='min-h-screen w-full bg-[#0f172a] text-slate-300 font-sans flex flex-col overflow-hidden'>
      <header className='h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-[#1e293b]'>
        <div className='flex items-center gap-4'>
          <div className='w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white'>HG</div>
          <h1 className='text-sm font-semibold tracking-wide text-slate-100 uppercase'>Halo Gemini Monorepo — Phase 1</h1>
        </div>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2 text-xs'>
            <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
            <span className='text-slate-400'>pnpm-workspace.yaml detected</span>
          </div>
          <div className='flex items-center gap-2 text-xs'>
            <span className='w-2 h-2 rounded-full bg-indigo-500'></span>
            <span className='text-slate-400'>Turborepo Caching: Active</span>
          </div>
        </div>
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <aside className='w-64 bg-[#111827] border-r border-slate-800 flex flex-col'>
          <div className='p-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest'>Explorer</div>
          <nav className='flex-1 overflow-hidden text-sm'>
            <div className='px-4 py-1 flex items-center gap-2 text-slate-400'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'></path></svg> apps/
            </div>
            <div className='px-4 py-1 flex items-center gap-2 text-slate-400 font-medium'>
              <span className='text-slate-600'>▼</span>
              <svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' strokeWidth='2'></path></svg> packages/
            </div>
            <div className='pl-10 pr-4 py-1 flex items-center gap-2 text-slate-500'>
              <span className='text-slate-700'>▶</span> core/
            </div>
            <div className='pl-10 pr-4 py-1 flex items-center gap-2 text-slate-500'>
              <span className='text-slate-700'>▶</span> theme/
            </div>
            <div className='mt-4 p-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800'>Root Configs</div>
            <div className='px-4 py-2 flex items-center gap-2 text-indigo-300 bg-indigo-500/10 border-r-2 border-indigo-500'>
              <span className='w-4 text-yellow-500 text-center font-bold'>{"{}"}</span> turbo.json
            </div>
            <div className='px-4 py-2 flex items-center gap-2 text-slate-400'>
              <span className='w-4 text-blue-400 text-center font-bold'>{"{}"}</span> package.json
            </div>
            <div className='px-4 py-2 flex items-center gap-2 text-slate-400'>
              <span className='w-4 text-emerald-400 text-center font-bold'>#</span> pnpm-workspace.yaml
            </div>
          </nav>
        </aside>
        <main className='flex-1 flex flex-col bg-[#020617]'>
          <div className='h-10 bg-[#1e293b] flex items-center px-4 border-b border-slate-800'>
            <div className='flex items-center gap-2 text-xs text-slate-300 bg-[#020617] px-3 py-2 border-t border-x border-slate-800 rounded-t mt-2'>
              <span>turbo.json</span>
              <span className='text-slate-600 cursor-pointer hover:text-slate-400'>×</span>
            </div>
          </div>
          <div className='flex-1 p-8 font-mono text-sm leading-relaxed overflow-hidden relative'>
            <div className='absolute left-0 top-0 w-12 h-full bg-[#0a0f1d] border-r border-slate-800/50 flex flex-col items-center py-8 text-slate-700 text-[10px] space-y-1 select-none'>
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i + 1}>{i + 1}</span>
              ))}
            </div>
            <div className='ml-8'>
              <div className='text-slate-500 mb-2'>// root/turbo.json</div>
              <div className='text-slate-300'>{"{"}</div>
              <div className='pl-4'>
                <span className='text-blue-400'>"schema"</span>: <span className='text-emerald-400'>"https://turbo.build/schema.json"</span>,
              </div>
              <div className='pl-4'>
                <span className='text-blue-400'>"pipeline"</span>: {"{"}
              </div>
              <div className='pl-8'>
                <span className='text-blue-400'>"build"</span>: {"{"}
              </div>
              <div className='pl-12'>
                <span className='text-blue-400'>"dependsOn"</span>: [<span className='text-emerald-400'>"^build"</span>],
              </div>
              <div className='pl-12'>
                <span className='text-blue-400'>"outputs"</span>: [<span className='text-emerald-400'>"dist/**"</span>, <span className='text-emerald-400'>".next/**"</span>]
              </div>
              <div className='pl-8'>
                {"},"}
              </div>
              <div className='pl-8'>
                <span className='text-blue-400'>"lint"</span>: {"{},"}
              </div>
              <div className='pl-8'>
                <span className='text-blue-400'>"dev"</span>: {"{"}
              </div>
              <div className='pl-12'>
                <span className='text-blue-400'>"cache"</span>: <span className='text-orange-400'>false</span>,
              </div>
              <div className='pl-12'>
                <span className='text-blue-400'>"persistent"</span>: <span className='text-orange-400'>true</span>
              </div>
              <div className='pl-8'>
                {"}"}
              </div>
              <div className='pl-4'>
                {"}"}
              </div>
              <div className='text-slate-300'>{"}"}</div>
            </div>
            <div className='mt-12 p-4 bg-slate-900/50 border border-slate-800 rounded-lg'>
              <div className='text-[10px] font-bold text-slate-500 uppercase mb-2'>Architecture Insights</div>
              <div className='grid grid-cols-2 gap-4 text-xs'>
                <div className='bg-slate-800/50 p-3 rounded'>
                  <div className='text-indigo-400 font-semibold mb-1'>Packages Shared</div>
                  <div className='text-slate-400'>@my-lib/theme is linked to core via workspaces</div>
                </div>
                <div className='bg-slate-800/50 p-3 rounded'>
                  <div className='text-emerald-400 font-semibold mb-1'>Build Optimization</div>
                  <div className='text-slate-400'>Caching dist/ folder for rapid CI/CD cycles</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside className='w-72 bg-[#1e293b] border-l border-slate-800 p-6 flex flex-col gap-6'>
          <section>
            <h3 className='text-xs font-bold text-slate-500 uppercase tracking-widest mb-4'>Dependency Graph</h3>
            <div className='relative h-32 border border-slate-700 rounded-lg bg-[#0f172a] p-4 flex items-center justify-center'>
              <div className='flex flex-col items-center gap-4'>
                <div className='px-3 py-1 bg-indigo-600 rounded text-xs text-white font-mono'>@my-lib/core</div>
                <div className='h-6 w-px bg-slate-700'></div>
                <div className='px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono'>@my-lib/theme</div>
              </div>
            </div>
          </section>
          <section>
            <h3 className='text-xs font-bold text-slate-500 uppercase tracking-widest mb-4'>Pipeline Summary</h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center text-xs'>
                <span className='text-slate-400'>Total Tasks</span>
                <span className='text-slate-200 font-mono'>4 Active</span>
              </div>
              <div className='flex justify-between items-center text-xs'>
                <span className='text-slate-400'>Cache Hit Rate</span>
                <span className='text-emerald-400 font-mono'>92.4%</span>
              </div>
              <div className='w-full bg-slate-800 h-1.5 rounded-full mt-2'>
                <div className='bg-indigo-500 h-1.5 rounded-full w-[92%]'></div>
              </div>
            </div>
          </section>
          <section className='mt-auto'>
            <div className='p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl'>
              <div className='text-xs text-indigo-300 font-semibold mb-1'>Ready for Phase 2</div>
              <p className='text-[10px] text-slate-400 leading-normal'>Turborepo configurations are validated. Workspaces linked. Ready to populate packages/core components.</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
