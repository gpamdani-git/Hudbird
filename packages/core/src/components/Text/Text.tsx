// packages/core/src/components/Text/Text.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textVariants = cva("text-zinc-700 dark:text-[#E5E5E5]", {
  variants: {
    variant: {
      default: "text-[16px] leading-[1.7] tracking-[-0.1px]",
      prose: "text-[16px] leading-[1.7] tracking-[-0.1px] max-w-[65ch]",
      lead: "text-lg sm:text-xl leading-[1.625] text-zinc-600 dark:text-zinc-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100 max-w-3xl font-normal tracking-[-0.2px]",
      eyebrow:
        "text-xs font-bold uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-indigo-200 select-none",
      strong: "font-semibold text-zinc-950 dark:text-white",
      muted:
        "text-sm text-zinc-500 dark:text-zinc-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100/95 leading-normal",
      small:
        "text-xs/5 text-zinc-600 dark:text-zinc-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100/95",
      subtle:
        "text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-200 uppercase select-none",
      gradient:
        "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent",
      quote:
        "italic border-l-2 border-indigo-500 pl-4 py-1 text-zinc-700 dark:text-zinc-200 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100 leading-relaxed",
      code: "font-mono text-[13px] leading-5 text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-[#202124] border border-black/[0.06] dark:border-white/[0.1] [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-slate-950/65 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-white [[data-glass-mode=glass][data-hb-theme=dark]_&]:border-white/25 rounded-md px-1.5 py-0.5 tracking-tight",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    color: {
      default: "",
      muted:
        "text-zinc-500 dark:text-zinc-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100/95",
      primary:
        "text-indigo-600 dark:text-indigo-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-indigo-200",
      secondary:
        "text-purple-600 dark:text-purple-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-purple-200",
      success:
        "text-emerald-700 dark:text-emerald-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-emerald-200",
      danger:
        "text-rose-700 dark:text-rose-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-rose-200",
      warning:
        "text-amber-700 dark:text-amber-300 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-amber-200",
    },
    tabularNums: {
      true: "tabular-nums",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    tabularNums: false,
  },
});

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
  clamp?: 1 | 2 | 3 | 4 | 5;
  /** Enforces monospaced tabular digits (.monospacedDigit()) for live clocks, counters, and metrics */
  tabularNums?: boolean;
}

const clampClasses: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
};

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant,
      weight,
      align,
      color,
      tabularNums = false,
      clamp,
      as: Component = "p",
      ...props
    },
    ref
  ) => {
    const Comp = Component as any;
    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({ variant, weight, align, color, tabularNums }),
          clamp && clampClasses[clamp],
          className
        )}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

const Strong = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="strong" variant="strong" className={className} {...props} />;
  }
);
Strong.displayName = "Strong";

const Code = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="code" variant="code" className={className} {...props} />;
  }
);
Code.displayName = "Code";

const Eyebrow = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="div" variant="eyebrow" className={className} {...props} />;
  }
);
Eyebrow.displayName = "Eyebrow";

const Lead = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="p" variant="lead" className={className} {...props} />;
  }
);
Lead.displayName = "Lead";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, children, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md border border-black/10 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-zinc-700 shadow-xs select-none dark:border-white/15 dark:bg-white/10 dark:text-zinc-200 [[data-glass-mode=glass][data-hb-theme=dark]_&]:border-white/25 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-slate-950/60 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-white",
      className
    )}
    {...props}
  >
    {children}
  </kbd>
));
Kbd.displayName = "Kbd";

export interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  author?: React.ReactNode;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, author, children, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "border-l-2 border-indigo-500 py-1 pl-4 text-zinc-700 italic dark:text-zinc-300",
        className
      )}
      {...props}
    >
      <p className="leading-relaxed">{children}</p>
      {author && (
        <footer className="mt-2 text-xs font-medium text-zinc-500 not-italic dark:text-zinc-400">
          — {author}
        </footer>
      )}
    </blockquote>
  )
);
Blockquote.displayName = "Blockquote";

export interface MarkProps extends React.HTMLAttributes<HTMLElement> {}

const Mark = React.forwardRef<HTMLElement, MarkProps>(({ className, ...props }, ref) => (
  <mark
    ref={ref}
    className={cn(
      "rounded bg-amber-500/20 px-1 py-0.5 font-medium text-amber-900 dark:bg-amber-400/20 dark:text-amber-200",
      className
    )}
    {...props}
  />
));
Mark.displayName = "Mark";

export { Text, Strong, Code, Eyebrow, Lead, Kbd, Blockquote, Mark, textVariants };
