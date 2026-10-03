import React from "react";
import { ShowcaseNavbar } from "../components/Showcase/ShowcaseNavbar";
import { ShowcaseFooter } from "../components/Showcase/ShowcaseFooter";

export function About() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-[#030712]">
      <ShowcaseNavbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-32 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          About Us
        </h1>
        <div className="prose prose-zinc dark:prose-invert">
          <p className="text-zinc-600 dark:text-zinc-400">
            Hudbird UI is a meticulously crafted set of accessible, highly-customizable React
            components and templates. We are dedicated to providing the highest quality UI building
            blocks for developers, designers, and founders.
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Built with React, Tailwind CSS v4, and Framer Motion, our components are designed to be
            dropped into any project with minimal configuration while offering maximum flexibility
            and aesthetic excellence.
          </p>
        </div>
      </main>
      <ShowcaseFooter />
    </div>
  );
}
