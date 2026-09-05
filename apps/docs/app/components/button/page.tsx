// apps/docs/app/components/button/page.tsx
import { Button } from "@my-lib/core";

export default function ButtonDocsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Button</h1>
        <p className="text-lg text-muted-foreground">
          Interactive component that allows users to perform actions with a single click.
          Built with CVA for comprehensive variants and robust state management.
        </p>
      </div>

      {/* Variants Section */}
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
        <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 text-sm overflow-x-auto border border-slate-800">
          <code>{`<Button variant="solid">Solid</Button>
<Button variant="bordered">Bordered</Button>
<Button variant="flat">Flat</Button>
<Button variant="light">Light</Button>`}</code>
        </pre>
      </section>

      {/* Colors Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Colors</h2>
        <div className="p-8 rounded-2xl bg-zinc-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-border dark:bg-zinc-900/50">
          <div className="flex flex-wrap gap-4 items-center">
            <Button color="primary">Primary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
          </div>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 text-sm overflow-x-auto border border-slate-800">
          <code>{`<Button color="primary">Primary</Button>
<Button color="success">Success</Button>
<Button color="danger">Danger</Button>`}</code>
        </pre>
      </section>

      {/* Sizes Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Sizes</h2>
        <div className="p-8 rounded-2xl bg-zinc-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-border dark:bg-zinc-900/50">
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 text-sm overflow-x-auto border border-slate-800">
          <code>{`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}</code>
        </pre>
      </section>

      {/* States Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">States (Disabled & Loading)</h2>
        <div className="p-8 rounded-2xl bg-zinc-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-border dark:bg-zinc-900/50">
          <div className="flex flex-wrap gap-4 items-center">
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
            <Button isLoading color="success" variant="bordered">Processing</Button>
          </div>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 text-sm overflow-x-auto border border-slate-800">
          <code>{`<Button disabled>Disabled</Button>
<Button isLoading>Loading</Button>
<Button isLoading color="success" variant="bordered">Processing</Button>`}</code>
        </pre>
      </section>
    </div>
  );
}
