cat << 'TSUP' > packages/core/tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
});
TSUP

cat << 'DOCPAGE' > apps/docs/app/page.tsx
export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-500 mb-8">
        🚀 Phase 2: Documentation Site Ready
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-3xl">
        Build Premium UIs <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
          At Lightning Speed
        </span>
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <a href="/components/button" className="h-12 px-8 rounded-full bg-indigo-500 text-white font-semibold flex items-center justify-center hover:bg-indigo-600 transition-colors">
          View Components
        </a>
      </div>
    </div>
  );
}
DOCPAGE

cat << 'DOCBTN' > apps/docs/app/components/button/page.tsx
import { Button } from "@my-lib/core";

export default function ButtonDocsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Button</h1>
      </div>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Variants</h2>
        <div className="p-8 rounded-2xl bg-zinc-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-border dark:bg-zinc-900/50">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="solid">Solid</Button>
            <Button variant="bordered">Bordered</Button>
            <Button variant="flat">Flat</Button>
            <Button variant="light">Light</Button>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Colors</h2>
        <div className="p-8 rounded-2xl bg-zinc-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-border dark:bg-zinc-900/50">
          <div className="flex flex-wrap gap-4 items-center">
            <Button color="primary">Primary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">States (Disabled & Loading)</h2>
        <div className="p-8 rounded-2xl bg-zinc-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-border dark:bg-zinc-900/50">
          <div className="flex flex-wrap gap-4 items-center">
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
DOCBTN
