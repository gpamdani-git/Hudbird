import React, { useState, useEffect } from "react";
import { ShowcaseNavbar } from "../components/Showcase/ShowcaseNavbar";
import { ShowcaseFooter } from "../components/Showcase/ShowcaseFooter";
import { motion } from "framer-motion";
import { Mail, AtSign, FileText, ArrowRight } from "lucide-react";

export function Terms() {
  const [activeSection, setActiveSection] = useState("license");

  // Intersection observer for sticky TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sections = [
    { id: "license", title: "1. License Grant" },
    { id: "restrictions", title: "2. Restrictions" },
    { id: "ip", title: "3. Intellectual Property" },
    { id: "warranties", title: "4. Disclaimer" },
    { id: "liability", title: "5. Limitation of Liability" },
    { id: "changes", title: "6. Changes to Terms" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-purple-500/30 dark:bg-[#030712]">
      <ShowcaseNavbar />

      {/* Luxurious Hero Header */}
      <div className="relative w-full overflow-hidden border-b border-zinc-200/50 bg-white pt-32 pb-16 dark:border-white/5 dark:bg-[#030712]">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 opacity-30 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen">
          <div className="absolute top-[-100px] left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-purple-500/40 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
          >
            <FileText className="h-6 w-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl dark:text-white"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400"
          >
            Please read these terms carefully before using Hudbird UI. By accessing our platform,
            you agree to comply with these rules.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-zinc-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            <span className="flex h-2 w-2 rounded-full bg-purple-500" />
            Last Updated: October 2026
          </motion.div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
        {/* Sticky Sidebar TOC */}
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 flex flex-col gap-1">
            <h4 className="mb-4 text-xs font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              Contents
            </h4>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeSection === s.id
                    ? "bg-purple-50 font-semibold text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-w-0 flex-1">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12 dark:border-white/5 dark:bg-[#0a0a0b]">
            <div className="prose prose-zinc dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-zinc-600 prose-p:leading-loose dark:prose-p:text-zinc-400 max-w-none">
              <p className="lead text-xl text-zinc-700 dark:text-zinc-300">
                Welcome to Hudbird UI. By accessing or using our website, components, templates, and
                related services (collectively, the "Service"), you agree to be bound by these Terms
                of Service. If you do not agree, please do not use our Service.
              </p>

              <section id="license" className="scroll-mt-32">
                <h2>1. License Grant</h2>
                <p>
                  Hudbird UI grants you a non-exclusive, non-transferable, revocable license to
                  access and use the templates, components, and code provided. You may use our
                  products for both personal and commercial projects, including client work, SaaS
                  products, and internal tools.
                </p>
              </section>

              <section id="restrictions" className="scroll-mt-32">
                <h2>2. Restrictions</h2>
                <p>
                  While you are free to build end products using our Service, you are strictly
                  prohibited from:
                </p>
                <ul className="space-y-2">
                  <li>
                    Redistributing or reselling the source code, components, or templates as a
                    standalone product.
                  </li>
                  <li>
                    Using our components to create a competing UI library, framework, or theme
                    marketplace.
                  </li>
                  <li>Claiming ownership or authorship over the original Hudbird UI assets.</li>
                </ul>
              </section>

              <section id="ip" className="scroll-mt-32">
                <h2>3. Intellectual Property</h2>
                <p>
                  All content, components, designs, and code provided through the Service are the
                  exclusive intellectual property of Hudbird UI. The license granted to you does not
                  convey any ownership rights in or to the Service.
                </p>
              </section>

              <section id="warranties" className="scroll-mt-32">
                <h2>4. Disclaimer of Warranties</h2>
                <p>
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Hudbird UI makes
                  no representations or warranties of any kind, express or implied, regarding the
                  operation of the Service, its compatibility with future browser versions, or its
                  fitness for a particular purpose.
                </p>
              </section>

              <section id="liability" className="scroll-mt-32">
                <h2>5. Limitation of Liability</h2>
                <p>
                  In no event shall Hudbird UI, its creators, or its affiliates be liable for any
                  indirect, incidental, special, consequential, or punitive damages, including but
                  not limited to loss of profits, data, or goodwill, arising out of your use or
                  inability to use the Service.
                </p>
              </section>

              <section id="changes" className="scroll-mt-32">
                <h2>6. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms of Service at any time. Any
                  changes will be effectively immediately upon posting to this page. Your continued
                  use of the Service following any modifications constitutes your acceptance of the
                  revised Terms.
                </p>
              </section>
            </div>

            {/* Premium Contact Block */}
            <div className="relative mt-16 overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-50/50 p-8 dark:border-purple-500/10 dark:bg-purple-500/5">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px]" />
              <div className="relative z-10">
                <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
                  Legal Questions?
                </h3>
                <p className="mb-6 max-w-md text-zinc-600 dark:text-zinc-400">
                  If you have any questions or require clarification regarding these Terms of
                  Service, please reach out to our team.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="mailto:gpamdani@gmail.com"
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-700"
                  >
                    <Mail className="h-4 w-4" /> gpamdani@gmail.com
                  </a>
                  <a
                    href="https://x.com/dani_akbarr"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
                  >
                    <AtSign className="h-4 w-4" /> @dani_akbarr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ShowcaseFooter />
    </div>
  );
}
