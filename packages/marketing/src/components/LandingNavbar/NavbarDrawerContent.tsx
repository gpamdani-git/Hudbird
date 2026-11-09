"use client";
import * as React from "react";
import type { BrandProfile, LandingAction, LandingNavigationLink } from "@hudbird/schemas";
import { Button } from "@hudbird/ui";
import { ArrowRight, Layers, Sparkles, BookOpen, Workflow, ExternalLink } from "lucide-react";
import { HUDBIRD_SVG_MARK } from "./NavbarBrandMark";

export interface NavbarDrawerContentProps {
  brand: BrandProfile;
  links: LandingNavigationLink[];
  linkHref: (link: LandingNavigationLink) => string;
  action?: LandingAction;
  onClose: () => void;
}

export function NavbarDrawerContent({
  brand,
  links,
  linkHref,
  action,
  onClose,
}: NavbarDrawerContentProps) {
  const displayName = brand.name === "Forma" ? "Hudbird UI" : brand.name;

  return (
    <div className="flex h-full flex-col space-y-6 py-2">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950">
            {HUDBIRD_SVG_MARK}
          </div>
          <div>
            <div className="text-foreground text-sm font-bold tracking-tight">{displayName}</div>
            <div className="text-muted-foreground text-[11px] font-medium">
              Modern UI Architecture
            </div>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          v1.5 Pro
        </span>
      </div>

      {/* Primary Links */}
      <div className="space-y-1">
        <div className="text-muted-foreground mb-2 px-2 text-[11px] font-semibold tracking-wider uppercase">
          Navigation
        </div>
        {links.map((link) => (
          <a
            key={link.label}
            href={linkHref(link)}
            onClick={onClose}
            className="group flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
          >
            <span>{link.label}</span>
            <ArrowRight className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
        ))}
      </div>

      {/* Example Resources & Ecosystem */}
      <div className="space-y-1 border-t border-zinc-200/80 pt-4 dark:border-white/10">
        <div className="text-muted-foreground mb-2 px-2 text-[11px] font-semibold tracking-wider uppercase">
          Explore &amp; Resources
        </div>
        <a
          href="#features"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.06]"
        >
          <Layers className="h-3.5 w-3.5 text-zinc-400" />
          <span>Core UI Components</span>
        </a>
        <a
          href="#how-it-works"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.06]"
        >
          <Workflow className="h-3.5 w-3.5 text-zinc-400" />
          <span>Interactive Page Builder</span>
        </a>
        <a
          href="#pricing"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.06]"
        >
          <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
          <span>Design Tokens &amp; Themes</span>
        </a>
        <a
          href="/docs"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.06]"
        >
          <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
          <span>Full Documentation</span>
          <ExternalLink className="ml-auto h-3 w-3 opacity-60" />
        </a>
      </div>

      {/* Social Media Links */}
      <div className="space-y-2 border-t border-zinc-200/80 pt-4 dark:border-white/10">
        <div className="text-muted-foreground px-2 text-[11px] font-semibold tracking-wider uppercase">
          Community
        </div>
        <div className="flex items-center gap-2 px-2">
          {/* GitHub */}
          <a
            href="https://github.com/hudbird"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-white/[0.08]"
            aria-label="GitHub"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/hudbird"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-white/[0.08]"
            aria-label="X (Twitter)"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-white/[0.08]"
            aria-label="Discord"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>

          {/* Figma */}
          <a
            href="https://figma.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-white/[0.08]"
            aria-label="Figma"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zM4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm0-8c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm8-4h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0zm0 8h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V8z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer CTA Buttons */}
      <div className="mt-auto flex flex-col gap-2 border-t border-zinc-200/80 pt-4 dark:border-white/10">
        {action && (
          <a
            href={action.href}
            onClick={onClose}
            className="group hb-primary hb-cta relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--hb-accent,var(--primary,#2457d6))] px-5 py-3 text-center text-sm font-semibold text-[var(--hb-on-accent,var(--primary-foreground,#ffffff))] shadow-sm transition-all hover:opacity-95 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{action.label}</span>
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </a>
        )}
        <Button
          href="/docs"
          variant="outline"
          onClick={onClose}
          className="h-9 w-full justify-center text-xs font-medium"
        >
          View Documentation
        </Button>
      </div>
    </div>
  );
}
