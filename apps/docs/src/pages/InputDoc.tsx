import React from "react";
import { Input } from "@my-lib/core";
import { Search, Eye, Mail, Lock } from "lucide-react";

export default function InputDoc() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Input</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-normal">
          A premium text input field designed for forms and data collection, featuring multiple variants, sizes, and icon slot support.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Variants</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
            <Input 
              label="Flat Variant" 
              variant="flat" 
              placeholder="Enter your name" 
            />
            <Input 
              label="Bordered Variant" 
              variant="bordered" 
              placeholder="Enter your name" 
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Sizes</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-col gap-6 max-w-md">
            <Input 
              label="Small (sm)" 
              inputSize="sm" 
              placeholder="Small size input" 
            />
            <Input 
              label="Medium (md)" 
              inputSize="md" 
              placeholder="Medium size input" 
            />
            <Input 
              label="Large (lg)" 
              inputSize="lg" 
              placeholder="Large size input" 
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Start & End Content (Icons)</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-col gap-6 max-w-md">
            <Input 
              label="Search" 
              placeholder="Search anything..." 
              startContent={<Search size={16} />}
            />
            <Input 
              label="Email Address" 
              type="email"
              placeholder="you@example.com" 
              startContent={<Mail size={16} />}
            />
            <Input 
              label="Password" 
              type="password"
              placeholder="Enter your password" 
              startContent={<Lock size={16} />}
              endContent={<Eye size={16} className="cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors" />}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">States</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="flex flex-col gap-6 max-w-md">
            <Input 
              label="Invalid State" 
              isInvalid 
              defaultValue="wrong@email"
              placeholder="Enter your email" 
            />
            <Input 
              label="Disabled" 
              disabled 
              placeholder="You cannot type here" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
