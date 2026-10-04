import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { Check, CheckCircle2, Sparkles, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Toast } from "./types";

/* ------------------------------------------------------------------ */
/*  Motion tokens                                                       */
/* ------------------------------------------------------------------ */
export const spring: Transition = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 };
export const softSpring: Transition = { type: "spring", stiffness: 260, damping: 30 };
export const ease = [0.22, 1, 0.36, 1] as const;

export const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease } },
  exit: { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.18, ease } },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
export function formatMailDate(iso: string) {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 60000;
  if (diff < 0) {
    return `Sends ${d.toLocaleDateString([], { weekday: "short" })} ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }
  if (diff < 1) return "Just now";
  if (diff < 60) return `${Math.round(diff)}m ago`;
  if (diff < 60 * 24 && new Date().toDateString() === d.toDateString())
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (diff < 60 * 48) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function useClickOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return ref;
}

/* ------------------------------------------------------------------ */
/*  Avatar                                                              */
/* ------------------------------------------------------------------ */
const GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-zinc-600 to-zinc-800",
];

export function MailAvatar({
  name,
  size = 40,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <div
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-2 ring-white dark:ring-zinc-950",
        GRADIENTS[hash % GRADIENTS.length],
        className
      )}
    >
      {initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon button                                                         */
/* ------------------------------------------------------------------ */
export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; active?: boolean }
>(({ label, active, className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label={label}
    title={label}
    className={cn(
      "relative inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-zinc-500 transition-all duration-150 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white",
      active && "bg-zinc-100 text-zinc-900 dark:bg-white/[0.08] dark:text-white",
      className
    )}
    {...props}
  >
    {children}
  </button>
));
IconButton.displayName = "IconButton";

/* ------------------------------------------------------------------ */
/*  Popover panel                                                       */
/* ------------------------------------------------------------------ */
export function PopoverPanel({
  open,
  className,
  children,
  align = "right",
}: {
  open: boolean;
  className?: string;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
          transition={spring}
          style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
          className={cn(
            "absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95 dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)]",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MenuItem({
  icon: Icon,
  children,
  onClick,
  danger,
  hint,
}: {
  icon?: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  hint?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
        danger
          ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.06]"
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 opacity-70" />}
      <span className="flex-1 truncate">{children}</span>
      {hint && <span className="text-xs text-zinc-400">{hint}</span>}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  AI visuals                                                          */
/* ------------------------------------------------------------------ */
export function AiOrb({ size = 28, spinning = false }: { size?: number; spinning?: boolean }) {
  return (
    <span
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#6366f1,#a855f7,#ec4899,#22d3ee,#6366f1)] blur-[1px]"
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning ? { repeat: Infinity, duration: 1.6, ease: "linear" } : { duration: 0.4 }
        }
      />
      <span className="absolute inset-[2px] flex items-center justify-center rounded-full bg-white dark:bg-zinc-950">
        <Sparkles className="text-violet-500" style={{ width: size * 0.5, height: size * 0.5 }} />
      </span>
    </span>
  );
}

export function ShimmerText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "animate-[aimail-shimmer_2.2s_linear_infinite] bg-[linear-gradient(90deg,#71717a_0%,#71717a_40%,#a855f7_50%,#71717a_60%,#71717a_100%)] bg-[length:200%_100%] bg-clip-text text-transparent dark:bg-[linear-gradient(90deg,#a1a1aa_0%,#a1a1aa_40%,#e9d5ff_50%,#a1a1aa_60%,#a1a1aa_100%)]",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Multi-step "AI is thinking" visualisation. */
export function ThinkingSteps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-4 dark:border-violet-500/20 dark:from-violet-500/[0.08] dark:via-zinc-900 dark:to-sky-500/[0.06]"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <AiOrb size={22} spinning />
        <ShimmerText className="text-sm font-semibold">Thinking…</ShimmerText>
      </div>
      <ol className="space-y-2">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: i <= current ? 1 : 0.35, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2.5 text-[13px]"
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                  done && "border-emerald-500 bg-emerald-500 text-white",
                  active && "border-violet-500",
                  !done && !active && "border-zinc-300 dark:border-zinc-700"
                )}
              >
                {done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                {active && (
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-violet-500"
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                  />
                )}
              </span>
              <span
                className={cn(
                  active ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {s}
              </span>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}

export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="AI is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-violet-500"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export function StreamCaret() {
  return (
    <motion.span
      aria-hidden
      className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded bg-violet-500"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Modal                                                               */
/* ------------------------------------------------------------------ */
export function Modal({
  open,
  onClose,
  children,
  className,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.15 } }}
            transition={spring}
            className={cn(
              "relative w-full max-w-md overflow-hidden rounded-t-3xl border border-zinc-200 bg-white shadow-2xl sm:rounded-3xl dark:border-white/10 dark:bg-zinc-900",
              className
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Toaster                                                             */
/* ------------------------------------------------------------------ */
export function Toaster({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-[120] flex flex-col items-center gap-2 px-4 md:bottom-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.15 } }}
            transition={spring}
            className="pointer-events-auto flex max-w-md min-w-[280px] items-center gap-3 rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white shadow-2xl ring-1 ring-white/10 dark:bg-white dark:text-zinc-900"
          >
            {t.tone === "success" && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
            )}
            {t.tone === "error" && <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />}
            {t.tone === "ai" && (
              <Sparkles className="h-4 w-4 shrink-0 text-violet-400 dark:text-violet-600" />
            )}
            <span className="flex-1">{t.message}</span>
            {t.action && (
              <button
                type="button"
                onClick={() => {
                  t.action?.onClick();
                  onDismiss(t.id);
                }}
                className="cursor-pointer rounded-lg px-2 py-1 font-semibold text-sky-300 hover:bg-white/10 dark:text-blue-600 dark:hover:bg-zinc-100"
              >
                {t.action.label}
              </button>
            )}
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => onDismiss(t.id)}
              className="cursor-pointer rounded-md p-1 opacity-60 hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small atoms                                                         */
/* ------------------------------------------------------------------ */
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-zinc-500 shadow-[0_1px_0_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400">
      {children}
    </kbd>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors",
        checked ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-700"
      )}
    >
      <motion.span
        layout
        transition={spring}
        className={cn("h-5 w-5 rounded-full bg-white shadow", checked ? "ml-auto" : "ml-0")}
      />
    </button>
  );
}

export function SectionCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-white/[0.07] dark:bg-zinc-900/60",
        className
      )}
    >
      {children}
    </div>
  );
}
