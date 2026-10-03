import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronDown, Ghost, Lock, Menu as MenuIcon, Share, Sparkles } from "lucide-react";
import type { ModalKey, ModelOption } from "./types";
import { MODELS } from "./data";
import { IconButton, Menu, cx, softSpring, useClickOutside } from "./primitives";

interface TopbarProps {
  isGuest: boolean;
  model: ModelOption;
  onModel: (m: ModelOption) => void;
  onModal: (m: ModalKey) => void;
  onLogin: () => void;
  onSignup: () => void;
  onMobileMenu: () => void;
  hasChat: boolean;
  temporary: boolean;
  onTemporary: () => void;
  onToast: (m: string) => void;
}

export function Topbar(props: TopbarProps) {
  const { isGuest } = props;
  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center gap-2 px-2 sm:px-3">
      <IconButton label="Open menu" onClick={props.onMobileMenu} className="md:hidden">
        <MenuIcon className="h-5 w-5" />
      </IconButton>

      <ModelPicker {...props} />

      {!isGuest && (
        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ChatWorkToggle value="chat" onWork={() => props.onModal("work")} />
        </div>
      )}

      <div className="ml-auto flex items-center gap-1.5">
        {isGuest ? (
          <>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={props.onLogin}
              className="h-9 rounded-full bg-[var(--c-invert)] px-4 text-sm font-medium text-[var(--c-invert-text)] transition-opacity hover:opacity-90"
            >
              Log in
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={props.onSignup}
              className="hidden h-9 rounded-full border border-[var(--c-border-strong)] px-4 text-sm font-medium transition-colors hover:bg-[var(--c-surface-2)] sm:block"
            >
              Sign up for free
            </motion.button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => props.onModal("plans")}
              className="group hidden h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-[var(--c-accent)] transition-colors hover:bg-[var(--c-accent-soft)] sm:inline-flex"
            >
              <motion.span
                className="inline-flex"
                animate={{ rotate: [0, 18, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-4 w-4" fill="currentColor" />
              </motion.span>
              Upgrade
            </button>
            {props.hasChat && (
              <IconButton label="Share" onClick={() => props.onModal("share")}>
                <Share className="h-[18px] w-[18px]" />
              </IconButton>
            )}
            <IconButton
              label={props.temporary ? "Turn off temporary chat" : "Temporary chat"}
              onClick={props.onTemporary}
              active={props.temporary}
            >
              <Ghost
                className={cx("h-[18px] w-[18px]", props.temporary && "text-[var(--c-accent)]")}
              />
            </IconButton>
          </>
        )}
      </div>
    </header>
  );
}

function ModelPicker({ model, onModel, onModal, isGuest }: TopbarProps) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-9 items-center gap-1 rounded-xl px-2.5 text-[17px] font-medium transition-colors hover:bg-[var(--c-surface-2)]"
      >
        {isGuest ? "Hudbird" : model.name}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={softSpring}
          className="inline-flex text-[var(--c-subtle)]"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <Menu open={open} className="top-11 left-0 w-80">
        <div className="px-2.5 pt-2 pb-1 text-xs font-medium text-[var(--c-subtle)]">Models</div>
        {MODELS.map((m) => {
          const selected = m.id === model.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setOpen(false);
                if (m.locked) onModal("plans");
                else onModel(m);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-[var(--c-surface-2)]"
            >
              <span className="flex-1">
                <span className="block text-sm font-medium">{m.name}</span>
                <span className="block text-xs text-[var(--c-subtle)]">{m.description}</span>
              </span>
              {m.locked ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--c-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--c-accent)]">
                  <Lock className="h-3 w-3" /> Plus
                </span>
              ) : (
                selected && <Check className="h-4 w-4" />
              )}
            </button>
          );
        })}
        <div className="m-1 mt-2 rounded-xl bg-gradient-to-br from-violet-500/15 via-blue-500/10 to-cyan-400/10 p-3">
          <p className="text-sm font-medium">Get Hudbird Plus</p>
          <p className="mt-0.5 text-xs text-[var(--c-muted)]">
            Our smartest models, more usage, deep research.
          </p>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onModal("plans");
            }}
            className="mt-2 h-8 rounded-full bg-[var(--c-invert)] px-3 text-xs font-semibold text-[var(--c-invert-text)]"
          >
            Upgrade
          </button>
        </div>
      </Menu>
    </div>
  );
}

export function ChatWorkToggle({
  value,
  onWork,
  onChat,
}: {
  value: "chat" | "work";
  onWork?: () => void;
  onChat?: () => void;
}) {
  return (
    <div className="relative inline-flex h-9 items-center rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] p-1">
      {(["chat", "work"] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={v === "work" ? onWork : onChat}
          className={cx(
            "relative z-10 inline-flex h-7 items-center gap-1 rounded-full px-5 text-sm font-medium transition-colors",
            value === v
              ? "text-[var(--c-text)]"
              : v === "work"
                ? "text-[var(--c-accent)]"
                : "text-[var(--c-muted)]"
          )}
        >
          {value === v && (
            <motion.span
              layoutId="aichat-chatwork"
              transition={softSpring}
              className="absolute inset-0 -z-10 rounded-full bg-[var(--c-surface-3)]"
            />
          )}
          {v === "work" && <Sparkles className="h-3.5 w-3.5" fill="currentColor" />}
          {v === "chat" ? "Chat" : "Work"}
        </button>
      ))}
    </div>
  );
}
