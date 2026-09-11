"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface FooterGlassProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  brandName?: string;
  newsletterTitle?: string;
  newsletterDisclaimer?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  onSubscribe?: (email: string) => void;
  linkGroups?: { title: string; links: { label: string; href: string }[] }[];
  copyright?: string;
}

export const FooterGlass = React.forwardRef<HTMLElement, FooterGlassProps>(
  (
    {
      className,
      logo,
      brandName,
      newsletterTitle = "Sign up to receive updates.",
      newsletterDisclaimer = "By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.",
      newsletterPlaceholder = "Enter your email",
      newsletterButtonText = "Submit",
      onSubscribe,
      linkGroups = [],
      copyright,
      ...props
    },
    ref
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      if (email && onSubscribe) {
        onSubscribe(email);
      }
    };

    return (
      <footer ref={ref} className={cn("py-12 md:py-16 lg:py-20", className)} {...props}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl sm:p-12 dark:border-white/10 dark:bg-black/20 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex flex-col justify-between gap-12 lg:flex-row">
              {/* Left Column: Brand & Newsletter */}
              <div className="w-full max-w-sm">
                <div className="mb-8 flex items-center gap-2">
                  {logo}
                  {brandName && (
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {newsletterTitle}
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex rounded-full border border-zinc-200/50 bg-white/50 p-1 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/50"
                  >
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={newsletterPlaceholder}
                      className="w-full min-w-0 bg-transparent px-4 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-400"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                    >
                      {newsletterButtonText}
                    </button>
                  </form>
                  {newsletterDisclaimer && (
                    <p className="mt-4 text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {newsletterDisclaimer}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Links */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
                {linkGroups.map((group, idx) => (
                  <div key={idx}>
                    <h3 className="mb-4 text-xs font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
                      {group.title}
                    </h3>
                    <ul className="space-y-3">
                      {group.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a
                            href={link.href}
                            className="text-xs text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Copyright */}
            <div className="mt-12 flex justify-center border-t border-zinc-200/50 pt-8 dark:border-zinc-800/50">
              {copyright && <p className="text-xs text-zinc-500 dark:text-zinc-400">{copyright}</p>}
            </div>
          </div>
        </motion.div>
      </footer>
    );
  }
);

FooterGlass.displayName = "FooterGlass";
