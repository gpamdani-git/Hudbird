import React, { useState, useEffect } from "react";
import { ShowcaseNavbar } from "../components/Showcase/ShowcaseNavbar";
import { ShowcaseFooter } from "../components/Showcase/ShowcaseFooter";
import { motion } from "framer-motion";
import { Mail, AtSign, Shield, ArrowRight } from "lucide-react";

export function Privacy() {
  const [activeSection, setActiveSection] = useState("information");

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
    { id: "information", title: "1. Information We Collect" },
    { id: "usage", title: "2. How We Use Your Data" },
    { id: "security", title: "3. Data Security" },
    { id: "third-party", title: "4. Third-Party Services" },
    { id: "rights", title: "5. Your Rights & Choices" },
    { id: "changes", title: "6. Policy Changes" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-blue-500/30 dark:bg-[#030712]">
      <ShowcaseNavbar />

      {/* Luxurious Hero Header */}
      <div className="relative w-full overflow-hidden border-b border-zinc-200/50 bg-white pt-32 pb-16 dark:border-white/5 dark:bg-[#030712]">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 opacity-30 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen">
          <div className="absolute top-[-100px] left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/40 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          >
            <Shield className="h-6 w-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl dark:text-white"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400"
          >
            We are committed to protecting your privacy and ensuring your personal data is handled
            securely and transparently.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-zinc-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500" />
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
                    ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
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
                At Hudbird UI, we value your privacy and are committed to protecting your personal
                data. This Privacy Policy explains how we collect, use, and safeguard your
                information when you visit our website or use our services.
              </p>

              <section id="information" className="scroll-mt-32">
                <h2>1. Information We Collect</h2>
                <p>
                  <strong>Personal Information:</strong> We may collect personal information such as
                  your name, email address, and billing details when you purchase a license,
                  register for an account, or contact our support team.
                </p>
                <p>
                  <strong>Usage Data:</strong> We automatically collect certain non-personally
                  identifiable information when you visit our site, including your IP address,
                  browser type, device information, and pages visited. This helps us analyze trends
                  and improve user experience.
                </p>
              </section>

              <section id="usage" className="scroll-mt-32">
                <h2>2. How We Use Your Data</h2>
                <p>We use the information we collect for various purposes, including to:</p>
                <ul className="space-y-2">
                  <li>Provide, maintain, and improve our components and templates.</li>
                  <li>Process your transactions and send related information (e.g., invoices).</li>
                  <li>Respond to your comments, questions, and customer service requests.</li>
                  <li>
                    Send you technical notices, updates, security alerts, and administrative
                    messages.
                  </li>
                </ul>
              </section>

              <section id="security" className="scroll-mt-32">
                <h2>3. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal
                  information from unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the Internet or electronic storage is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section id="third-party" className="scroll-mt-32">
                <h2>4. Third-Party Services</h2>
                <p>
                  We do not sell, trade, or rent your personal identification information to others.
                  We may share generic aggregated demographic information not linked to any personal
                  identification information with our business partners and trusted affiliates. We
                  may also use third-party service providers (such as payment processors) to help us
                  operate our business, provided they agree to keep your information confidential.
                </p>
              </section>

              <section id="rights" className="scroll-mt-32">
                <h2>5. Your Rights & Choices</h2>
                <p>
                  Depending on your location, you may have the right to access, update, or delete
                  the personal information we hold about you. If you wish to exercise these rights,
                  or if you wish to opt-out of receiving promotional communications from us, please
                  contact us using the information provided below.
                </p>
              </section>

              <section id="changes" className="scroll-mt-32">
                <h2>6. Policy Changes</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page and updating the "Effective
                  Date" at the top of this document. We encourage you to review this Privacy Policy
                  periodically for any changes.
                </p>
              </section>
            </div>

            {/* Premium Contact Block */}
            <div className="relative mt-16 overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-50/50 p-8 dark:border-blue-500/10 dark:bg-blue-500/5">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
              <div className="relative z-10">
                <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
                  Have Questions?
                </h3>
                <p className="mb-6 max-w-md text-zinc-600 dark:text-zinc-400">
                  If you have any questions or concerns about this Privacy Policy, please don't
                  hesitate to reach out to our team.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="mailto:gpamdani@gmail.com"
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700"
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
