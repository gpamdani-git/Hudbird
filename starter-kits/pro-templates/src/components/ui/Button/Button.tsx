// packages/core/src/components/Button/Button.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Slot } from "../Slot";

export type ButtonVariant =
  "solid" | "bordered" | "flat" | "soft" | "light" | "ghost" | "outline" | "plain";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "dark"
  | "zinc"
  | "white"
  | "light"
  | "dark/zinc"
  | "dark/white"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRadius = "none" | "md" | "lg" | "full";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium tracking-tight whitespace-nowrap select-none transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:active:scale-100",
  {
    variants: {
      variant: {
        solid: "shadow-xs font-semibold",
        bordered: "border-2 bg-transparent font-semibold",
        flat: "font-semibold border-0",
        soft: "font-semibold border-0",
        light: "bg-transparent border-0 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800",
        ghost: "bg-transparent border-0 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800",
        outline:
          "border border-zinc-950/10 dark:border-white/15 bg-transparent hover:bg-zinc-950/5 dark:hover:bg-white/5",
        plain: "bg-transparent hover:bg-zinc-950/5 dark:hover:bg-white/5",
      },
      color: {
        primary: "focus-visible:ring-primary dark:focus-visible:ring-offset-zinc-950",
        secondary: "focus-visible:ring-secondary dark:focus-visible:ring-offset-zinc-950",
        success: "focus-visible:ring-success dark:focus-visible:ring-offset-zinc-950",
        warning: "focus-visible:ring-warning dark:focus-visible:ring-offset-zinc-950",
        danger: "focus-visible:ring-destructive dark:focus-visible:ring-offset-zinc-950",
        info: "focus-visible:ring-info dark:focus-visible:ring-offset-zinc-950",
        dark: "focus-visible:ring-zinc-950 dark:focus-visible:ring-offset-zinc-950",
        zinc: "focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950",
        white: "focus-visible:ring-zinc-400 dark:focus-visible:ring-offset-zinc-950",
        light: "focus-visible:ring-zinc-400 dark:focus-visible:ring-offset-zinc-950",
        "dark/zinc": "focus-visible:ring-zinc-900 dark:focus-visible:ring-offset-zinc-950",
        "dark/white": "focus-visible:ring-zinc-900 dark:focus-visible:ring-offset-zinc-950",
        red: "focus-visible:ring-red-500",
        orange: "focus-visible:ring-orange-500",
        amber: "focus-visible:ring-amber-500",
        yellow: "focus-visible:ring-yellow-500",
        lime: "focus-visible:ring-lime-500",
        green: "focus-visible:ring-green-500",
        emerald: "focus-visible:ring-emerald-500",
        teal: "focus-visible:ring-teal-500",
        cyan: "focus-visible:ring-cyan-500",
        sky: "focus-visible:ring-sky-500",
        blue: "focus-visible:ring-blue-500",
        indigo: "focus-visible:ring-indigo-500",
        violet: "focus-visible:ring-violet-500",
        purple: "focus-visible:ring-purple-500",
        fuchsia: "focus-visible:ring-fuchsia-500",
        pink: "focus-visible:ring-pink-500",
        rose: "focus-visible:ring-rose-500",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-9 px-4 text-sm gap-2",
        lg: "h-11 px-5 text-base gap-2.5",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      isIconOnly: {
        true: "p-0 min-w-0 justify-center shrink-0",
      },
    },
    compoundVariants: [
      // Icon-only size adjustments
      {
        isIconOnly: true,
        size: "sm",
        className: "w-8 h-8",
      },
      {
        isIconOnly: true,
        size: "md",
        className: "w-9 h-9",
      },
      {
        isIconOnly: true,
        size: "lg",
        className: "w-11 h-11",
      },

      // Capsule (radius: "full") extra padding to prevent trailing icons/chevrons from hitting corner curve
      {
        radius: "full",
        size: "sm",
        isIconOnly: false,
        className: "px-3.5",
      },
      {
        radius: "full",
        size: "md",
        isIconOnly: false,
        className: "px-5",
      },
      {
        radius: "full",
        size: "lg",
        isIconOnly: false,
        className: "px-6",
      },

      // ==========================================
      // --- SOLID VARIANTS (All 20 Solid + Adaptive) ---
      // ==========================================
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
      },
      {
        variant: "solid",
        color: "secondary",
        className:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active",
      },
      {
        variant: "solid",
        color: "success",
        className:
          "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-600",
      },
      {
        variant: "solid",
        color: "warning",
        className:
          "bg-amber-500 text-zinc-950 font-bold hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-400 dark:hover:bg-amber-500",
      },
      {
        variant: "solid",
        color: "danger",
        className:
          "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 dark:bg-rose-500 dark:hover:bg-rose-600",
      },
      {
        variant: "solid",
        color: "info",
        className:
          "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 dark:bg-sky-500 dark:hover:bg-sky-600",
      },
      {
        variant: "solid",
        color: "dark/zinc",
        className:
          "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600",
      },
      {
        variant: "solid",
        color: "dark",
        className: "bg-foreground text-background hover:opacity-90",
      },
      {
        variant: "solid",
        color: "zinc",
        className:
          "bg-zinc-600 text-white hover:bg-zinc-700 dark:bg-zinc-600 dark:hover:bg-zinc-500",
      },
      {
        variant: "solid",
        color: "white",
        className:
          "bg-white text-zinc-950 border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-xs",
      },
      {
        variant: "solid",
        color: "light",
        className:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
      },
      {
        variant: "solid",
        color: "dark/white",
        className:
          "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100",
      },
      {
        variant: "solid",
        color: "red",
        className: "bg-red-600 text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400",
      },
      {
        variant: "solid",
        color: "orange",
        className:
          "bg-orange-600 text-white hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-400",
      },
      {
        variant: "solid",
        color: "amber",
        className:
          "bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 dark:bg-amber-400 dark:text-zinc-950",
      },
      {
        variant: "solid",
        color: "yellow",
        className:
          "bg-yellow-400 text-zinc-950 font-bold hover:bg-yellow-300 dark:bg-yellow-400 dark:text-zinc-950",
      },
      {
        variant: "solid",
        color: "lime",
        className:
          "bg-lime-500 text-zinc-950 font-bold hover:bg-lime-400 dark:bg-lime-400 dark:text-zinc-950",
      },
      {
        variant: "solid",
        color: "green",
        className:
          "bg-green-600 text-white hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400",
      },
      {
        variant: "solid",
        color: "emerald",
        className:
          "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400",
      },
      {
        variant: "solid",
        color: "teal",
        className:
          "bg-teal-600 text-white hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400",
      },
      {
        variant: "solid",
        color: "cyan",
        className:
          "bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 dark:bg-cyan-400 dark:text-zinc-950",
      },
      {
        variant: "solid",
        color: "sky",
        className: "bg-sky-500 text-white hover:bg-sky-400 dark:bg-sky-400 dark:hover:bg-sky-300",
      },
      {
        variant: "solid",
        color: "blue",
        className:
          "bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400",
      },
      {
        variant: "solid",
        color: "indigo",
        className:
          "bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400",
      },
      {
        variant: "solid",
        color: "violet",
        className:
          "bg-violet-600 text-white hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400",
      },
      {
        variant: "solid",
        color: "purple",
        className:
          "bg-purple-600 text-white hover:bg-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400",
      },
      {
        variant: "solid",
        color: "fuchsia",
        className:
          "bg-fuchsia-600 text-white hover:bg-fuchsia-500 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-400",
      },
      {
        variant: "solid",
        color: "pink",
        className:
          "bg-pink-600 text-white hover:bg-pink-500 dark:bg-pink-500 dark:hover:bg-pink-400",
      },
      {
        variant: "solid",
        color: "rose",
        className:
          "bg-rose-600 text-white hover:bg-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400",
      },

      // ==========================================
      // --- BORDERED VARIANTS ---
      // ==========================================
      {
        variant: ["bordered", "outline"],
        color: "primary",
        className:
          "border-primary-600 text-primary-700 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-500/15",
      },
      {
        variant: ["bordered", "outline"],
        color: "secondary",
        className:
          "border-secondary-600 text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-500/15",
      },
      {
        variant: ["bordered", "outline"],
        color: "success",
        className:
          "border-emerald-600 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-500/15",
      },
      {
        variant: ["bordered", "outline"],
        color: "warning",
        className:
          "border-amber-500 text-amber-600 hover:bg-amber-50 active:bg-amber-100 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-500/15",
      },
      {
        variant: ["bordered", "outline"],
        color: "danger",
        className:
          "border-rose-600 text-rose-700 hover:bg-rose-50 active:bg-rose-100 dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-500/15",
      },
      {
        variant: ["bordered", "outline"],
        color: "info",
        className:
          "border-sky-600 text-sky-700 hover:bg-sky-50 active:bg-sky-100 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-500/15",
      },
      {
        variant: "bordered",
        color: "dark/zinc",
        className:
          "border-zinc-900 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800/60",
      },
      {
        variant: "bordered",
        color: "blue",
        className:
          "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/40",
      },

      // ==========================================
      // --- FLAT (PASTEL/SOFT) VARIANTS ---
      // ==========================================
      {
        variant: ["flat", "soft"],
        color: "primary",
        className:
          "bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 dark:bg-primary-500/20 dark:text-primary-300 dark:hover:bg-primary-500/30",
      },
      {
        variant: ["flat", "soft"],
        color: "secondary",
        className:
          "bg-secondary-50 text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200 dark:bg-secondary-500/15 dark:text-secondary-400 dark:hover:bg-secondary-500/25",
      },
      {
        variant: ["flat", "soft"],
        color: "success",
        className:
          "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:hover:bg-emerald-500/25",
      },
      {
        variant: ["flat", "soft"],
        color: "warning",
        className:
          "bg-amber-50 text-amber-600 hover:bg-amber-100 active:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:hover:bg-amber-500/25",
      },
      {
        variant: ["flat", "soft"],
        color: "danger",
        className:
          "bg-rose-50 text-rose-700 hover:bg-rose-100 active:bg-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:hover:bg-rose-500/25",
      },
      {
        variant: ["flat", "soft"],
        color: "info",
        className:
          "bg-sky-50 text-sky-700 hover:bg-sky-100 active:bg-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:hover:bg-sky-500/25",
      },
      {
        variant: "flat",
        color: "dark/zinc",
        className:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
      },

      // ==========================================
      // --- LIGHT (GHOST) VARIANTS ---
      // ==========================================
      {
        variant: ["light", "ghost"],
        color: "primary",
        className:
          "text-primary-700 hover:bg-primary-50 active:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-500/15",
      },
      {
        variant: ["light", "ghost"],
        color: "secondary",
        className:
          "text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-500/15",
      },
      {
        variant: ["light", "ghost"],
        color: "success",
        className:
          "text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-500/15",
      },
      {
        variant: ["light", "ghost"],
        color: "warning",
        className:
          "text-amber-600 hover:bg-amber-50 active:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-500/15",
      },
      {
        variant: ["light", "ghost"],
        color: "danger",
        className:
          "text-rose-700 hover:bg-rose-50 active:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-500/15",
      },
      {
        variant: ["light", "ghost"],
        color: "info",
        className:
          "text-sky-700 hover:bg-sky-50 active:bg-sky-100 dark:text-sky-400 dark:hover:bg-sky-500/15",
      },
      {
        variant: "light",
        color: "dark/zinc",
        className: "text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      radius: "md",
      isIconOnly: false,
    },
  }
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  /**
   * Element or icon placed at the start of the button.
   */
  startContent?: React.ReactNode;
  /**
   * Element or icon placed at the end of the button.
   */
  endContent?: React.ReactNode;
  /**
   * Shows a loading spinner and disables user interaction.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Shorthand for outline variant.
   */
  outline?: boolean;
  /**
   * Shorthand for plain variant.
   */
  plain?: boolean;
  /**
   * Delegate rendering to the immediate child element using Slot pattern.
   */
  asChild?: boolean;
  /**
   * Optional link destination URL to render as an `<a>` tag.
   */
  href?: string;
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      color = "primary",
      size = "md",
      radius = "md",
      isIconOnly = false,
      startContent,
      endContent,
      isLoading = false,
      outline,
      plain,
      asChild = false,
      children,
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    // Resolve variant precedence if outline/plain shorthand was provided
    let resolvedVariant = variant;
    if (plain) resolvedVariant = "plain";
    else if (outline) resolvedVariant = "outline";

    const computedClass = cn(
      buttonVariants({
        variant: resolvedVariant,
        color,
        size,
        radius,
        isIconOnly,
        className,
      })
    );

    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={computedClass}
          aria-disabled={disabled || isLoading}
          {...(props as any)}
        >
          {children}
        </Slot>
      );
    }

    // Spinner indicator
    const spinner = (
      <svg
        className="h-4 w-4 shrink-0 animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const buttonBody = isIconOnly ? (
      isLoading ? (
        spinner
      ) : (
        children
      )
    ) : (
      <>
        {isLoading ? spinner : startContent}
        {children}
        {endContent && (
          <span className="ml-0.5 inline-flex shrink-0 items-center" aria-hidden="true">
            {endContent}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <a ref={ref as any} href={href} className={computedClass} {...(props as any)}>
          {buttonBody}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={computedClass}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {buttonBody}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
