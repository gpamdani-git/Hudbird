import { Input } from "@my-lib/core";

export default function InputDocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Input</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-normal">
          A fundamental text input field for forms and data collection.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Variants</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <Input variant="default" placeholder="Default input..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Filled</label>
              <Input variant="filled" placeholder="Filled input..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Underlined</label>
              <Input variant="underlined" placeholder="Underlined input..." />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Sizes</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-col gap-6 max-w-md">
            <Input inputSize="sm" placeholder="Small (sm)" />
            <Input inputSize="md" placeholder="Medium (md)" />
            <Input inputSize="lg" placeholder="Large (lg)" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">States</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-col gap-6 max-w-md">
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <Input disabled placeholder="Disabled input..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-500">Error</label>
              <Input error placeholder="Error state..." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
