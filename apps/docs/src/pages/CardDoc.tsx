import React from "react";
import { Card } from "@my-lib/core"; // Uncomment jika sudah di-export di packages/core/src/index.ts

export default function CardDoc() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Card</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-normal">
          A premium Card component.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Preview</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-12 flex items-center justify-center">
          <div className="text-zinc-500 dark:text-zinc-400">
            <Card variant="solid">Example Card Component</Card>
          </div>
        </div>
      </section>
    </div>
  );
}
