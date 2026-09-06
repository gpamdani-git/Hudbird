import { Button } from "@my-lib/core";

export default function ButtonDocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Button</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-normal">
          Interactive element that allows users to perform an action.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Variants</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="solid">Solid</Button>
            <Button variant="bordered">Bordered</Button>
            <Button variant="flat">Flat</Button>
            <Button variant="light">Light</Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Colors</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button color="primary">Primary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">States (Disabled & Loading)</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
