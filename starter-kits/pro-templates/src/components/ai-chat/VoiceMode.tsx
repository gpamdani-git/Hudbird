import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Captions, Mic, MicOff, X } from "lucide-react";
import { VOICE_SCRIPT } from "./data";
import { cx, softSpring } from "./primitives";

type Phase = "connecting" | "listening" | "thinking" | "speaking" | "idle";

const PHASE_LABEL: Record<Phase, string> = {
  connecting: "Connecting…",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
  idle: "Your turn — start talking",
};

/**
 * Full-screen voice conversation. The orb is driven by a MotionValue that is
 * updated every animation frame (no React re-renders), so it stays at 60fps.
 */
export function VoiceMode({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (result?: { user: string; assistant: string; duration: number }) => void;
}) {
  return <AnimatePresence>{open && <VoiceStage onClose={onClose} />}</AnimatePresence>;
}

function VoiceStage({
  onClose,
}: {
  onClose: (r?: { user: string; assistant: string; duration: number }) => void;
}) {
  const [phase, setPhase] = useState<Phase>("connecting");
  const [userText, setUserText] = useState("");
  const [aiWords, setAiWords] = useState(0);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const startedAt = useRef(Date.now());
  const aiWordList = useRef(VOICE_SCRIPT.assistant.split(" "));

  /* ---------- Phase script ---------- */
  useEffect(() => {
    const t: number[] = [];
    t.push(window.setTimeout(() => setPhase("listening"), 900));
    // User "speaks"
    const words = VOICE_SCRIPT.user.split(" ");
    words.forEach((_, i) =>
      t.push(window.setTimeout(() => setUserText(words.slice(0, i + 1).join(" ")), 1300 + i * 210))
    );
    const userEnd = 1300 + words.length * 210 + 500;
    t.push(window.setTimeout(() => setPhase("thinking"), userEnd));
    t.push(window.setTimeout(() => setPhase("speaking"), userEnd + 1600));
    aiWordList.current.forEach((_, i) =>
      t.push(window.setTimeout(() => setAiWords(i + 1), userEnd + 1700 + i * 170))
    );
    t.push(
      window.setTimeout(() => setPhase("idle"), userEnd + 1900 + aiWordList.current.length * 170)
    );
    return () => t.forEach(clearTimeout);
  }, []);

  /* ---------- Audio-reactive amplitude ---------- */
  const amp = useMotionValue(0);
  const smooth = useSpring(amp, { stiffness: 260, damping: 18, mass: 0.6 });
  const scale = useTransform(smooth, [0, 1], [1, 1.28]);
  const glow = useTransform(smooth, [0, 1], [0.35, 0.95]);
  const ringScale = useTransform(smooth, [0, 1], [1, 1.5]);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 1;
      let v = 0.04;
      if (phase === "listening" && !muted)
        v = 0.25 + Math.abs(Math.sin(t * 0.21)) * 0.45 * Math.random();
      if (phase === "speaking") v = 0.35 + Math.abs(Math.sin(t * 0.13) * Math.cos(t * 0.07)) * 0.65;
      if (phase === "thinking") v = 0.12 + Math.sin(t * 0.05) * 0.08;
      if (phase === "idle") v = 0.06 + Math.sin(t * 0.03) * 0.04;
      amp.set(v);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, muted, amp]);

  const end = () => {
    if (aiWords > 0) {
      onClose({
        user: VOICE_SCRIPT.user,
        assistant: VOICE_SCRIPT.assistant,
        duration: Math.max(4, Math.round((Date.now() - startedAt.current) / 1000 / 3)),
      });
    } else onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && end();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const thinking = phase === "thinking";

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center bg-[var(--c-bg)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      role="dialog"
      aria-label="Voice mode"
    >
      {/* Ambient aura */}
      <motion.div
        className="pointer-events-none absolute top-[42%] left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,123,255,0.35),rgba(139,92,246,0.18)_40%,transparent_70%)] blur-3xl"
        style={{ opacity: glow }}
      />

      <div className="relative z-10 flex w-full items-center justify-between px-5 py-4">
        <span className="rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] px-3 py-1 text-xs font-medium text-[var(--c-muted)]">
          Hudbird Voice · Sol
        </span>
        <span className="font-mono text-xs text-[var(--c-subtle)] tabular-nums">
          <Timer />
        </span>
      </div>

      {/* Orb */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.4, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", bounce: 0.35, visualDuration: 0.8 }}
          className="relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px]"
        >
          <motion.div
            className="absolute -inset-6 rounded-full border border-[var(--c-glow-2)]/30"
            style={{ scale: ringScale, opacity: glow }}
          />
          <motion.div
            className="absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,#8b5cf6,#3d7bff,#22d3ee,#f472b6,#8b5cf6)] blur-2xl"
            style={{ opacity: glow }}
            animate={{ rotate: 360 }}
            transition={{ duration: thinking ? 2 : 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div className="absolute inset-0 overflow-hidden rounded-full" style={{ scale }}>
            <div
              className="aichat-genfield absolute inset-0"
              style={{ animationDuration: thinking ? "1.6s" : "6s" }}
            />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.65),transparent_38%)]"
              animate={{ rotate: thinking ? 360 : 0 }}
              transition={{ duration: 2.5, repeat: thinking ? Infinity : 0, ease: "linear" }}
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_-20px_60px_rgba(0,0,0,0.45),inset_0_10px_40px_rgba(255,255,255,0.15)]" />
          </motion.div>
          {thinking && (
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-3 w-3 rounded-full bg-white/90"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={phase + (muted ? "m" : "")}
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={softSpring}
            className={cx(
              "mt-12 text-sm font-medium",
              thinking || phase === "connecting" ? "aichat-shimmer" : "text-[var(--c-muted)]"
            )}
          >
            {muted && phase === "listening" ? "Microphone muted" : PHASE_LABEL[phase]}
          </motion.p>
        </AnimatePresence>

        {/* Captions */}
        <AnimatePresence>
          {captions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 min-h-[96px] w-full max-w-xl px-6 text-center"
              aria-live="polite"
            >
              {phase === "listening" || (phase === "thinking" && !aiWords) ? (
                <p className="text-lg leading-8 text-[var(--c-muted)]">{userText}</p>
              ) : (
                <p className="text-lg leading-8 text-[var(--c-text)]">
                  {aiWordList.current.slice(0, aiWords).map((w, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.35 }}
                    >
                      {w}{" "}
                    </motion.span>
                  ))}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...softSpring, delay: 0.2 }}
        className="relative z-10 mb-10 flex items-center gap-4"
      >
        <ControlButton
          label={muted ? "Unmute" : "Mute"}
          onClick={() => setMuted((m) => !m)}
          active={muted}
        >
          {muted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </ControlButton>
        <ControlButton
          label={captions ? "Hide captions" : "Show captions"}
          onClick={() => setCaptions((c) => !c)}
          active={!captions}
        >
          <Captions className="h-6 w-6" />
        </ControlButton>
        <motion.button
          type="button"
          onClick={end}
          aria-label="End voice mode"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 text-white shadow-[0_0_40px_-8px_rgb(244_63_94)]"
        >
          <X className="h-7 w-7" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function ControlButton({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      className={cx(
        "inline-flex h-16 w-16 items-center justify-center rounded-full border transition-colors",
        active
          ? "border-transparent bg-[var(--c-invert)] text-[var(--c-invert-text)]"
          : "border-[var(--c-border-strong)] bg-[var(--c-surface)] text-[var(--c-text)] hover:bg-[var(--c-surface-2)]"
      )}
    >
      {children}
    </motion.button>
  );
}

function Timer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setS((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <>
      {Math.floor(s / 60)}:{String(s % 60).padStart(2, "0")}
    </>
  );
}
