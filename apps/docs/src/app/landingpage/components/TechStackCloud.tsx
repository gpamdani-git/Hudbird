import React from "react";
import { LogoCloud, LogoCloudTitle } from "@hudbird/marketing";

export function TechStackCloud() {
  const stack = [
    {
      name: "React 19",
      icon: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-6 w-6" fill="currentColor">
          <circle cx="0" cy="0" r="2.05" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: "Tailwind CSS v4",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
    {
      name: "TypeScript",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.275 13.935h-2.5v7.565H6.625v-7.565H4.125V11.5h7.65v2.435zm4.845 2.185c.78.39 1.545.69 2.295.69.96 0 1.53-.42 1.53-1.05 0-.66-.54-.93-1.74-1.38-1.65-.6-2.73-1.41-2.73-2.88 0-1.89 1.56-3.15 3.96-3.15 1.14 0 2.19.27 3.03.75l-.75 2.28c-.69-.36-1.44-.6-2.28-.6-.9 0-1.41.42-1.41.96 0 .6.54.87 1.77 1.35 1.71.63 2.7 1.47 2.7 2.94 0 1.98-1.59 3.24-4.23 3.24-1.29 0-2.58-.33-3.48-.87l.345-2.28z" />
        </svg>
      ),
    },
    {
      name: "Framer Motion",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      ),
    },
    {
      name: "Vite",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M22.57 3.535l-9.87 17.585a.94.94 0 0 1-1.64 0L1.19 3.535a.939.939 0 0 1 .82-1.403h19.74c.732 0 1.2.793.82 1.403zM12 17.218l6.39-11.386H5.61L12 17.218z" />
        </svg>
      ),
    },
    {
      name: "Radix UI",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 3.5a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 13 5.5zm-5 13a2.5 2.5 0 1 1 2.5-2.5A2.5 2.5 0 0 1 8 18.5zm8-2.5a2.5 2.5 0 1 1 2.5-2.5A2.5 2.5 0 0 1 16 16z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="stack"
      className="border-y border-zinc-200/80 bg-zinc-50/50 py-12 dark:border-white/5 dark:bg-[#161618]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="mb-8 text-center text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase dark:text-zinc-500">
          BUILT FOR THE MODERN REACT ECOSYSTEM
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {stack.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2.5 text-zinc-500 opacity-60 transition-all duration-300 hover:text-zinc-900 hover:opacity-100 dark:text-zinc-400 dark:hover:text-white"
            >
              <div className="shrink-0">{item.icon}</div>
              <span className="font-mono text-xs font-medium tracking-tight sm:text-sm">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
