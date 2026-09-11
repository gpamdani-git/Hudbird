"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterSimpleProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  brandName?: string;
  links?: FooterLink[];
  socials?: SocialLink[];
  copyright?: string;
}

export const FooterSimple = React.forwardRef<HTMLElement, FooterSimpleProps>(
  ({ className, logo, brandName, links = [], socials = [], copyright, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn("py-12 md:py-16", className)} {...props}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              {logo}
              {brandName && (
                <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {brandName}
                </span>
              )}
            </div>

            {/* Links */}
            {links.length > 0 && (
              <nav className="flex flex-wrap items-center justify-center gap-6">
                {links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Socials */}
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

          {/* Copyright */}
          {copyright && (
            <div className="mt-8 border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{copyright}</p>
            </div>
          )}
        </motion.div>
      </footer>
    );
  }
);

FooterSimple.displayName = "FooterSimple";
