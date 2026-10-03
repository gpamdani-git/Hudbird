import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { Check, Copy, X } from "lucide-react";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const spring = { type: "spring", bounce: 0.18, visualDuration: 0.38 } as const;
export const softSpring = { type: "spring", bounce: 0.1, visualDuration: 0.3 } as const;

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */
export function Logo({ size = 22, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      animate={animated ? { rotate: 360 } : undefined}
      transition={animated ? { duration: 8, ease: "linear", repeat: Infinity } : undefined}
    >
      <defs>
        <linearGradient id="aichat-logo" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#3d7bff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path
        d="M16 2c1.2 6.4 4.6 9.8 11 11-6.4 1.2-9.8 4.6-11 11-1.2-6.4-4.6-9.8-11-11 6.4-1.2 9.8-4.6 11-11Z"
        fill="url(#aichat-logo)"
      />
      <circle cx="25" cy="25" r="3" fill="url(#aichat-logo)" opacity="0.8" />
    </motion.svg>
  );
}

export function GoogleIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

export function AppleIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.37 1.43c0 1.14-.42 2.2-1.25 3.17-1 1.15-2.2 1.82-3.5 1.71a3.5 3.5 0 0 1-.03-.43c0-1.1.48-2.27 1.33-3.23.42-.48.96-.88 1.6-1.2.65-.31 1.26-.48 1.83-.51.02.16.02.33.02.49Zm4.3 15.98c-.33.77-.73 1.48-1.18 2.13-.62.88-1.13 1.5-1.52 1.84-.6.56-1.25.84-1.94.86-.5 0-1.1-.14-1.8-.43-.7-.29-1.35-.43-1.94-.43-.62 0-1.28.14-1.99.43-.71.29-1.28.44-1.72.46-.66.03-1.32-.26-1.98-.88-.42-.37-.95-1.01-1.59-1.92a13.2 13.2 0 0 1-1.68-3.34c-.47-1.4-.7-2.75-.7-4.06 0-1.5.32-2.8.97-3.88a5.7 5.7 0 0 1 2.04-2.06 5.48 5.48 0 0 1 2.75-.78c.54 0 1.25.17 2.13.5.88.33 1.44.5 1.69.5.18 0 .82-.2 1.9-.59 1.02-.37 1.89-.52 2.6-.46 1.92.15 3.36.91 4.32 2.27-1.72 1.04-2.57 2.5-2.55 4.38.02 1.46.55 2.68 1.58 3.65.47.45 1 .79 1.58 1.03-.13.37-.26.72-.4 1.06Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Icon button with tooltip                                            */
/* ------------------------------------------------------------------ */
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tooltipSide?: "top" | "bottom" | "right";
  active?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, tooltipSide = "bottom", active, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cx(
        "group/tt relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[var(--c-muted)] transition-colors duration-150 hover:bg-[var(--c-surface-2)] hover:text-[var(--c-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-accent)] active:scale-[0.96]",
        active && "bg-[var(--c-surface-2)] text-[var(--c-text)]",
        className
      )}
      {...rest}
    >
      {children}
      <span
        role="tooltip"
        className={cx(
          "pointer-events-none absolute z-50 rounded-lg bg-[var(--c-invert)] px-2 py-1 text-xs font-medium whitespace-nowrap text-[var(--c-invert-text)] opacity-0 shadow-lg transition-all delay-300 duration-150 group-hover/tt:opacity-100",
          tooltipSide === "bottom" &&
            "top-full left-1/2 mt-2 -translate-x-1/2 translate-y-1 group-hover/tt:translate-y-0",
          tooltipSide === "top" &&
            "bottom-full left-1/2 mb-2 -translate-x-1/2 -translate-y-1 group-hover/tt:translate-y-0",
          tooltipSide === "right" && "top-1/2 left-full ml-2 -translate-y-1/2"
        )}
      >
        {label}
      </span>
    </button>
  );
});

/* ------------------------------------------------------------------ */
/* Click outside                                                       */
/* ------------------------------------------------------------------ */
export function useClickOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Floating menu                                                       */
/* ------------------------------------------------------------------ */
export function Menu({
  open,
  className,
  children,
  origin = "top left",
}: {
  open: boolean;
  className?: string;
  children: React.ReactNode;
  origin?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="menu"
          initial={{ opacity: 0, scale: 0.94, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -4, transition: { duration: 0.12 } }}
          transition={softSpring}
          style={{ transformOrigin: origin }}
          className={cx(
            "absolute z-50 min-w-[220px] rounded-2xl border border-[var(--c-border-strong)] bg-[var(--c-elevated)] p-1.5 shadow-[0_20px_60px_-15px_rgb(0_0_0/0.6)] backdrop-blur-xl",
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
  icon,
  children,
  hint,
  danger,
  onClick,
  trailing,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  hint?: string;
  danger?: boolean;
  onClick?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors hover:bg-[var(--c-surface-2)]",
        danger ? "text-rose-400" : "text-[var(--c-text)]"
      )}
    >
      {icon && (
        <span className={cx("shrink-0", danger ? "text-rose-400" : "text-[var(--c-muted)]")}>
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block leading-tight">{children}</span>
        {hint && <span className="mt-0.5 block text-xs text-[var(--c-subtle)]">{hint}</span>}
      </span>
      {trailing}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Modal shell                                                         */
/* ------------------------------------------------------------------ */
export function Modal({
  open,
  onClose,
  children,
  className,
  label,
  hideClose,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  label: string;
  hideClose?: boolean;
}) {
  const dragControls = useDragControls();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--c-overlay)] backdrop-blur-[6px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.16 } }}
            transition={spring}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
            className={cx(
              "relative w-full overflow-hidden rounded-t-[28px] border border-[var(--c-border-strong)] bg-[var(--c-elevated)] text-[var(--c-text)] shadow-[0_40px_120px_-20px_rgb(0_0_0/0.7)] sm:rounded-[28px]",
              className
            )}
          >
            <div
              className="flex h-5 w-full cursor-grab touch-none items-center justify-center active:cursor-grabbing sm:absolute sm:top-0 sm:left-0 sm:z-10 sm:h-4"
              onPointerDown={(e) => dragControls.start(e)}
              aria-hidden
            >
              <div className="h-1 w-10 rounded-full bg-[var(--c-surface-3)] sm:hidden" />
            </div>
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--c-muted)] transition-colors hover:bg-[var(--c-surface-2)] hover:text-[var(--c-text)]"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Switch                                                              */
/* ------------------------------------------------------------------ */
export function Switch({
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
      className={cx(
        "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200",
        checked ? "bg-[var(--c-accent)]" : "bg-[var(--c-surface-3)]"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", bounce: 0.3, visualDuration: 0.25 }}
        className={cx("h-5 w-5 rounded-full bg-white shadow", checked ? "ml-auto" : "")}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Avatar                                                              */
/* ------------------------------------------------------------------ */
export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Copy button                                                         */
/* ------------------------------------------------------------------ */
export function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return { copied, copy };
}

export function CopyIcon({ copied }: { copied: boolean }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={copied ? "y" : "n"}
        initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
        transition={{ duration: 0.18 }}
        className="inline-flex"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </motion.span>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Markdown (streaming-safe, zero deps)                                */
/* ------------------------------------------------------------------ */
type Block =
  | { type: "h"; level: number; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; lang: string; code: string; open: boolean }
  | { type: "quote"; text: string }
  | { type: "hr" }
  | { type: "table"; head: string[]; rows: string[][] };

function parseBlocks(src: string): Block[] {
  const lines = src.split("\n");
  const out: Block[] = [];
  let i = 0;
  const isSpecial = (l: string) =>
    /^```/.test(l) ||
    /^#{1,3}\s/.test(l) ||
    /^>\s?/.test(l) ||
    /^\s*[-*]\s+/.test(l) ||
    /^\s*\d+\.\s+/.test(l) ||
    /^---\s*$/.test(l) ||
    l.trim().startsWith("|");

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
      const open = i >= lines.length;
      i++;
      out.push({ type: "code", lang, code: buf.join("\n"), open });
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)/);
    if (h) {
      out.push({ type: "h", level: h[1].length, text: h[2] });
      i++;
      continue;
    }
    if (/^---\s*$/.test(line)) {
      out.push({ type: "hr" });
      i++;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push({ type: "quote", text: buf.join(" ") });
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i]))
        items.push(lines[i++].replace(/^\s*[-*]\s+/, ""));
      out.push({ type: "ul", items });
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i]))
        items.push(lines[i++].replace(/^\s*\d+\.\s+/, ""));
      out.push({ type: "ol", items });
      continue;
    }
    if (line.trim().startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const r = lines[i++].trim();
        if (/^\|?\s*:?-{2,}/.test(r)) continue;
        rows.push(
          r
            .replace(/^\||\|$/g, "")
            .split("|")
            .map((c) => c.trim())
        );
      }
      out.push({ type: "table", head: rows[0] ?? [], rows: rows.slice(1) });
      continue;
    }
    if (!line.trim()) {
      i++;
      continue;
    }
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !isSpecial(lines[i])) buf.push(lines[i++]);
    out.push({ type: "p", text: buf.join(" ") });
  }
  return out;
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*|_[^_]+_)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**") && p.length > 4)
          return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("`") && p.endsWith("`") && p.length > 2)
          return <code key={i}>{p.slice(1, -1)}</code>;
        if (
          ((p.startsWith("*") && p.endsWith("*")) || (p.startsWith("_") && p.endsWith("_"))) &&
          p.length > 2
        )
          return <em key={i}>{p.slice(1, -1)}</em>;
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </>
  );
}

const Caret = () => <span className="aichat-caret" aria-hidden />;

export function Markdown({ text, streaming }: { text: string; streaming?: boolean }) {
  const blocks = useMemo(() => parseBlocks(text), [text]);
  return (
    <div className="aichat-prose">
      {blocks.map((b, i) => {
        const caret = streaming && i === blocks.length - 1;
        switch (b.type) {
          case "h": {
            const Tag = `h${b.level}` as "h1" | "h2" | "h3";
            return (
              <Tag key={i}>
                <Inline text={b.text} />
                {caret && <Caret />}
              </Tag>
            );
          }
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
                {caret && <Caret />}
              </p>
            );
          case "ul":
          case "ol": {
            const Tag = b.type;
            return (
              <Tag key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                    {caret && j === b.items.length - 1 && <Caret />}
                  </li>
                ))}
              </Tag>
            );
          }
          case "quote":
            return (
              <blockquote key={i}>
                <Inline text={b.text} />
                {caret && <Caret />}
              </blockquote>
            );
          case "hr":
            return <hr key={i} />;
          case "code":
            return (
              <CodeBlock key={i} lang={b.lang} code={b.code} streaming={b.open && streaming} />
            );
          case "table":
            return (
              <div
                key={i}
                className="aichat-scroll overflow-x-auto rounded-2xl border border-[var(--c-border)]"
              >
                <table>
                  <thead>
                    <tr>
                      {b.head.map((c, j) => (
                        <th key={j}>
                          <Inline text={c} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
      {streaming && blocks.length === 0 && <Caret />}
    </div>
  );
}

const TOKEN_RE =
  /(\/\/.*$|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\b(?:import|from|export|function|const|let|var|return|type|interface|as|if|else|new|async|await|default|extends|true|false|null|undefined)\b|\b\d+\b|<\/?[A-Z][\w.]*|=>)/gm;

function highlight(code: string) {
  return code.split(TOKEN_RE).map((part, i) => {
    if (!part) return null;
    let cls = "";
    if (part.startsWith("//")) cls = "text-zinc-500 italic";
    else if (/^["']/.test(part)) cls = "text-emerald-400";
    else if (/^\d+$/.test(part)) cls = "text-amber-300";
    else if (/^<\/?[A-Z]/.test(part)) cls = "text-cyan-300";
    else if (part === "=>") cls = "text-violet-300";
    else if (
      /^(import|from|export|function|const|let|var|return|type|interface|as|if|else|new|async|await|default|extends|true|false|null|undefined)$/.test(
        part
      )
    )
      cls = "text-violet-400";
    return cls ? (
      <span key={i} className={cls}>
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    );
  });
}

function CodeBlock({ lang, code, streaming }: { lang: string; code: string; streaming?: boolean }) {
  const { copied, copy } = useCopy();
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--c-border)] bg-[var(--c-code)]">
      <div className="flex items-center justify-between border-b border-[var(--c-border)] px-4 py-2 text-xs text-[var(--c-subtle)]">
        <span className="font-mono">{lang || "code"}</span>
        <button
          type="button"
          onClick={() => copy(code)}
          className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors hover:text-[var(--c-text)]"
        >
          <CopyIcon copied={copied} />
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
      <pre className="aichat-scroll overflow-x-auto p-4 font-mono text-[13px] leading-6 text-[var(--c-text)]">
        <code>
          {highlight(code)}
          {streaming && <Caret />}
        </code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated audio bars                                                 */
/* ------------------------------------------------------------------ */
export function AudioBars({
  playing,
  bars = 4,
  className,
}: {
  playing: boolean;
  bars?: number;
  className?: string;
}) {
  return (
    <span className={cx("inline-flex h-4 items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-current"
          animate={playing ? { height: ["30%", "100%", "45%", "85%", "30%"] } : { height: "30%" }}
          transition={
            playing
              ? { duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        />
      ))}
    </span>
  );
}
