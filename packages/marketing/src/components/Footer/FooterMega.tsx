"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Input, Button } from "@hudbird/ui";

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
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
}

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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-5">
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
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-16">
              {linkGroups.map((group, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
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

          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800">
            {copyright && <p className="text-sm text-zinc-500 dark:text-zinc-400">{copyright}</p>}

            {socials.length > 0 && (
              <div className="flex items-center gap-4">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </footer>
    );
  }
);

FooterMega.displayName = "FooterMega";
