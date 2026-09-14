"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Input, Button } from "@hudbird/ui";

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href?: string; badge?: React.ReactNode }[];
}

export interface FooterMegaProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  brandName?: string;
  description?: string;
  linkGroups?: FooterLinkGroup[];
  socials?: { label: string; href: string; icon: React.ReactNode }[];
  copyright?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  onSubscribe?: (email: string) => void;
  hideNewsletter?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export const FooterMega = React.forwardRef<HTMLElement, FooterMegaProps>(
  (
    {
      className,
      logo,
      brandName,
      description,
      linkGroups = [],
      socials = [],
      copyright,
      newsletterTitle = "Subscribe to our newsletter",
      newsletterDescription = "The latest news, articles, and resources, sent to your inbox weekly.",
      newsletterPlaceholder = "Enter your email",
      newsletterButtonText = "Subscribe",
      onSubscribe,
      hideNewsletter = false,
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
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {hideNewsletter ? (
            /* ── Wide layout (no newsletter): logo left + dense multi-column links ── */
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              {/* Logo + tagline */}
              <motion.div variants={itemVariants} className="shrink-0 lg:w-52">
                <div className="flex items-center gap-2">
                  {logo}
                  {brandName && (
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  )}
                </div>
                {description && (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {description}
                  </p>
                )}
              </motion.div>

              {/* Dense links grid – auto-fills columns */}
              <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {linkGroups.map((group, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <h3 className="text-xs font-semibold tracking-widest text-zinc-900 uppercase dark:text-white">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {group.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          {link.href ? (
                            <a
                              href={link.href}
                              className="flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            >
                              {link.label}
                              {link.badge && link.badge}
                            </a>
                          ) : (
                            <div className="flex cursor-not-allowed items-center gap-1.5 text-sm text-zinc-400 select-none dark:text-zinc-500">
                              {link.label}
                              {link.badge && link.badge}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* ── Default layout: brand + newsletter on left, links on right ── */
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  {logo}
                  {brandName && (
                    <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  )}
                </div>
                {description && (
                  <p className="mt-4 max-w-md text-base text-zinc-600 dark:text-zinc-400">
                    {description}
                  </p>
                )}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {newsletterTitle}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {newsletterDescription}
                  </p>
                  <form onSubmit={handleSubmit} className="mt-4 flex max-w-md gap-2">
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder={newsletterPlaceholder}
                      className="w-full"
                      aria-label="Email address"
                    />
                    <Button type="submit" variant="solid" color="zinc" className="shrink-0">
                      {newsletterButtonText}
                    </Button>
                  </form>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-16">
                {linkGroups.map((group, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {group.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          {link.href ? (
                            <a
                              href={link.href}
                              className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            >
                              {link.label}
                              {link.badge && link.badge}
                            </a>
                          ) : (
                            <div className="flex cursor-not-allowed items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
                              {link.label}
                              {link.badge && link.badge}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Bottom bar ── */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800"
          >
            {copyright && <p className="text-sm text-zinc-500">{copyright}</p>}

            {socials.length > 0 && (
              <div className="flex items-center gap-4">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </footer>
    );
  }
);

FooterMega.displayName = "FooterMega";
