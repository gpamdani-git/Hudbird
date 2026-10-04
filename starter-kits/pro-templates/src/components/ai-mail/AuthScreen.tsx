import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail as MailIcon,
  Moon,
  Rocket,
  Sparkles,
  Sun,
  User,
  Users,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { AiOrb, ShimmerText, StreamCaret, ease, spring } from "./primitives";
import { TONES } from "./data";

interface AuthScreenProps {
  onSuccess: (name?: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

type Mode = "login" | "signup" | "forgot";

const SIGNUP_STEPS = ["Account", "Security", "Workspace", "AI Setup"];

/* ------------------------------------------------------------------ */
/*  Field                                                               */
/* ------------------------------------------------------------------ */
function Field({
  id,
  label,
  icon: Icon,
  error,
  trailing,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon: React.ElementType;
  error?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div
        className={cn(
          "group flex h-12 items-center gap-3 rounded-2xl border bg-white px-4 transition-all focus-within:ring-4 dark:bg-zinc-900",
          error
            ? "border-rose-400 focus-within:ring-rose-500/15"
            : "border-zinc-200 focus-within:border-blue-500 focus-within:ring-blue-500/15 dark:border-white/10"
        )}
      >
        <Icon className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-focus-within:text-blue-500" />
        <input
          id={id}
          aria-invalid={!!error}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
          {...props}
        />
        {trailing}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs font-medium text-rose-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PrimaryButton({
  loading,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={loading || props.disabled}
      className={cn(
        "relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-zinc-900 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)] transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
        className
      )}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </motion.button>
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        {
          name: "Google",
          svg: (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2.2 12 2.2 6.6 2.2 2.2 6.6 2.2 12s4.4 9.8 9.8 9.8c5.7 0 9.4-4 9.4-9.6 0-.6-.1-1.1-.2-1.6H12z"
              />
            </svg>
          ),
        },
        {
          name: "Microsoft",
          svg: (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
              <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
              <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
              <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
            </svg>
          ),
        },
      ].map((s) => (
        <button
          key={s.name}
          type="button"
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 transition-all hover:-translate-y-px hover:border-zinc-300 hover:shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-white/20"
        >
          {s.svg}
          {s.name}
        </button>
      ))}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-400">
      <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
      {label}
      <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand showcase (right column)                                       */
/* ------------------------------------------------------------------ */
const DEMO_TEXT =
  "Hi Sofia,\n\nThanks for the deck — it looks fantastic. I'm happy to sign off. Let's keep the AI assistant in Pro and move the embargo to Oct 16.\n\nBest,\nAlex";

function BrandPanel() {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    let t: number;
    const tick = () => {
      i = i >= DEMO_TEXT.length + 40 ? 0 : i + 1;
      setTyped(DEMO_TEXT.slice(0, i));
      t = window.setTimeout(tick, i === 0 ? 800 : 28);
    };
    t = window.setTimeout(tick, 600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative hidden overflow-hidden rounded-[32px] bg-zinc-950 lg:flex lg:flex-col lg:justify-between lg:p-10">
      {/* aurora */}
      <div className="aimail-aurora pointer-events-none absolute -top-1/3 -left-1/4 h-[140%] w-[140%] bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.55),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.45),transparent_45%),radial-gradient(circle_at_40%_85%,rgba(34,211,238,0.35),transparent_40%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-white/70">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
          ✦ New · AI Compose 2.0
        </span>
      </div>

      {/* floating compose card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="relative z-10 mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center gap-3">
          <AiOrb size={30} spinning={typed.length < DEMO_TEXT.length} />
          <div>
            <p className="text-sm font-semibold text-white">HudMail AI</p>
            {typed.length < DEMO_TEXT.length ? (
              <ShimmerText className="text-xs">Writing a reply to Sofia…</ShimmerText>
            ) : (
              <p className="text-xs text-emerald-300">Draft ready · 0.8s</p>
            )}
          </div>
        </div>
        <p className="min-h-[170px] text-[13.5px] leading-relaxed whitespace-pre-wrap text-white/85">
          {typed}
          <StreamCaret />
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Professional", "Shorter", "Add meeting"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
            >
              {c}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, ...spring }}
        className="absolute top-[38%] right-8 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white shadow-xl backdrop-blur"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
          <Check className="h-3.5 w-3.5" />
        </span>
        Inbox zero in 4 min
      </motion.div>

      <div className="relative z-10">
        <h2 className="font-heading max-w-sm text-3xl leading-tight font-semibold text-white">
          Your inbox, written and organised by AI.
        </h2>
        <p className="mt-3 max-w-sm text-sm text-white/60">
          Summaries, smart replies, scheduling and drafting — all in one calm, fast workspace.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              "from-blue-500 to-indigo-600",
              "from-violet-500 to-fuchsia-500",
              "from-emerald-500 to-teal-600",
            ].map((g, i) => (
              <span
                key={i}
                className={`h-8 w-8 rounded-full bg-gradient-to-br ring-2 ring-zinc-950 ${g}`}
              />
            ))}
          </div>
          <p className="text-xs text-white/60">
            Trusted by <span className="font-semibold text-white">12,000+</span> teams
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                                */
/* ------------------------------------------------------------------ */
export function AuthScreen({ onSuccess, isDark, onToggleTheme }: AuthScreenProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [creating, setCreating] = useState(-1);
  const [resetSent, setResetSent] = useState(false);

  const [form, setForm] = useState({
    email: "alex@hudmail.ai",
    password: "hudmail-demo",
    name: "",
    signupEmail: "",
    signupPw: "",
    workspace: "",
    role: "Founder",
    teamSize: "2-10",
    tone: "Professional",
    features: ["Smart summaries", "AI compose"] as string[],
    remember: true,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const pwScore = useMemo(() => {
    const p = form.signupPw;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  }, [form.signupPw]);

  const go = (m: Mode) => {
    setDir(1);
    setMode(m);
    setStep(0);
    setErrors({});
    setResetSent(false);
  };

  const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!validEmail(form.email)) errs.email = "Enter a valid email address";
    if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    window.setTimeout(() => onSuccess(), 1100);
  };

  const handleSignupNext = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (form.name.trim().length < 2) errs.name = "Please tell us your name";
      if (!validEmail(form.signupEmail)) errs.signupEmail = "Enter a valid email address";
    }
    if (step === 1 && pwScore < 2)
      errs.signupPw = "Use 8+ characters with a number or capital letter";
    if (step === 2 && !form.workspace.trim()) errs.workspace = "Give your workspace a name";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (step < SIGNUP_STEPS.length - 1) {
      setDir(1);
      setStep((s) => s + 1);
      return;
    }
    // final: animated workspace creation
    const steps = 4;
    for (let i = 0; i <= steps; i++) window.setTimeout(() => setCreating(i), i * 650);
    window.setTimeout(() => onSuccess(form.name), steps * 650 + 900);
  };

  const back = () => {
    setDir(-1);
    if (step > 0) setStep((s) => s - 1);
    else go("login");
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -32 }),
  };

  const creatingSteps = [
    "Creating your workspace",
    "Importing contacts",
    "Training your AI writing style",
    "Organising smart folders",
  ];

  return (
    <div className="aimail-root fixed inset-0 z-[100] overflow-y-auto bg-[#f7f7f8] font-sans text-zinc-900 dark:bg-[#0a0a0b] dark:text-zinc-100">
      <div className="mx-auto grid min-h-full max-w-[1280px] gap-6 p-3 sm:p-6 lg:grid-cols-[1fr_1.05fr]">
        {/* Form column */}
        <div className="relative flex flex-col rounded-[32px] bg-white px-5 py-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:px-10 sm:py-8 dark:bg-zinc-950 dark:ring-1 dark:ring-white/[0.06]">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-600/30">
                <MailIcon className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-heading text-lg font-semibold tracking-tight">HudMail</span>
            </div>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/10 dark:hover:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </header>

          <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-10">
            {/* creating overlay */}
            {creating >= 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  {creating >= creatingSteps.length ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
                    >
                      <Check className="h-9 w-9" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <AiOrb size={72} spinning />
                  )}
                </div>
                <h1 className="font-heading text-2xl font-semibold">
                  {creating >= creatingSteps.length
                    ? `Welcome, ${form.name.split(" ")[0]}!`
                    : "Setting things up…"}
                </h1>
                <ul className="mx-auto mt-6 max-w-xs space-y-3 text-left">
                  {creatingSteps.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: i <= creating ? 1 : 0.35, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                          i < creating
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-zinc-300 dark:border-zinc-700"
                        )}
                      >
                        {i < creating ? (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        ) : i === creating ? (
                          <Loader2 className="h-3 w-3 animate-spin text-violet-500" />
                        ) : null}
                      </span>
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={mode + step}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease }}
                >
                  {/* ---------------------------- LOGIN ---------------------------- */}
                  {mode === "login" && (
                    <form onSubmit={handleLogin} className="space-y-5" noValidate>
                      <div>
                        <h1 className="font-heading text-[32px] leading-tight font-semibold tracking-tight">
                          Welcome back
                        </h1>
                        <p className="mt-2 text-[15px] text-zinc-500 dark:text-zinc-400">
                          Sign in to your AI-powered inbox.
                        </p>
                      </div>
                      <SocialButtons />
                      <Divider label="or continue with email" />
                      <Field
                        id="login-email"
                        label="Email"
                        icon={MailIcon}
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        error={errors.email}
                      />
                      <Field
                        id="login-password"
                        label="Password"
                        icon={Lock}
                        type={showPw ? "text" : "password"}
                        autoComplete="current-password"
                        value={form.password}
                        onChange={(e) => set("password", e.target.value)}
                        error={errors.password}
                        trailing={
                          <button
                            type="button"
                            onClick={() => setShowPw((v) => !v)}
                            aria-label={showPw ? "Hide password" : "Show password"}
                            className="cursor-pointer text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                          >
                            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        }
                      />
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex cursor-pointer items-center gap-2 text-zinc-600 dark:text-zinc-400">
                          <input
                            type="checkbox"
                            checked={form.remember}
                            onChange={(e) => set("remember", e.target.checked)}
                            className="h-4 w-4 rounded accent-blue-600"
                          />
                          Remember me
                        </label>
                        <button
                          type="button"
                          onClick={() => go("forgot")}
                          className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <PrimaryButton loading={loading} type="submit" id="aimail-login-submit">
                        Sign in <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                        New to HudMail?{" "}
                        <button
                          type="button"
                          onClick={() => go("signup")}
                          className="cursor-pointer font-semibold text-zinc-900 hover:underline dark:text-white"
                        >
                          Create an account
                        </button>
                      </p>
                      <p className="rounded-2xl bg-blue-50 px-4 py-3 text-xs text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                        Demo credentials are pre-filled — just press <b>Sign in</b>.
                      </p>
                    </form>
                  )}

                  {/* ---------------------------- FORGOT ---------------------------- */}
                  {mode === "forgot" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!validEmail(form.email))
                          return setErrors({ email: "Enter a valid email address" });
                        setLoading(true);
                        window.setTimeout(() => {
                          setLoading(false);
                          setResetSent(true);
                        }, 900);
                      }}
                      className="space-y-5"
                      noValidate
                    >
                      <button
                        type="button"
                        onClick={() => go("login")}
                        className="flex cursor-pointer items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back to sign in
                      </button>
                      <div>
                        <h1 className="font-heading text-[32px] leading-tight font-semibold tracking-tight">
                          Reset password
                        </h1>
                        <p className="mt-2 text-[15px] text-zinc-500 dark:text-zinc-400">
                          We'll email you a secure magic link.
                        </p>
                      </div>
                      {resetSent ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0" />
                          Check <b className="mx-1">{form.email}</b> for a reset link. It expires in
                          15 minutes.
                        </motion.div>
                      ) : (
                        <>
                          <Field
                            id="forgot-email"
                            label="Email"
                            icon={MailIcon}
                            type="email"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            error={errors.email}
                          />
                          <PrimaryButton loading={loading} type="submit">
                            Send reset link
                          </PrimaryButton>
                        </>
                      )}
                    </form>
                  )}

                  {/* ---------------------------- SIGNUP ---------------------------- */}
                  {mode === "signup" && (
                    <form onSubmit={handleSignupNext} className="space-y-5" noValidate>
                      {/* progress */}
                      <div>
                        <div className="mb-3 flex items-center justify-between text-xs font-medium text-zinc-500">
                          <span>
                            Step {step + 1} of {SIGNUP_STEPS.length}
                          </span>
                          <span className="text-zinc-900 dark:text-white">
                            {SIGNUP_STEPS[step]}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          {SIGNUP_STEPS.map((s, i) => (
                            <div
                              key={s}
                              className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10"
                            >
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                                initial={false}
                                animate={{ width: i <= step ? "100%" : "0%" }}
                                transition={{ duration: 0.4, ease }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {step === 0 && (
                        <>
                          <div>
                            <h1 className="font-heading text-[30px] leading-tight font-semibold tracking-tight">
                              Create your account
                            </h1>
                            <p className="mt-2 text-[15px] text-zinc-500 dark:text-zinc-400">
                              Free forever for personal use. No credit card.
                            </p>
                          </div>
                          <SocialButtons />
                          <Divider label="or" />
                          <Field
                            id="signup-name"
                            label="Full name"
                            icon={User}
                            placeholder="Alex Morgan"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            error={errors.name}
                            autoFocus
                          />
                          <Field
                            id="signup-email"
                            label="Work email"
                            icon={MailIcon}
                            type="email"
                            placeholder="you@company.com"
                            value={form.signupEmail}
                            onChange={(e) => set("signupEmail", e.target.value)}
                            error={errors.signupEmail}
                          />
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <div>
                            <h1 className="font-heading text-[30px] leading-tight font-semibold tracking-tight">
                              Secure your account
                            </h1>
                            <p className="mt-2 text-[15px] text-zinc-500 dark:text-zinc-400">
                              Choose a strong password for {form.signupEmail}.
                            </p>
                          </div>
                          <Field
                            id="signup-pw"
                            label="Password"
                            icon={Lock}
                            type={showPw ? "text" : "password"}
                            placeholder="At least 8 characters"
                            value={form.signupPw}
                            onChange={(e) => set("signupPw", e.target.value)}
                            error={errors.signupPw}
                            autoFocus
                            trailing={
                              <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                aria-label={showPw ? "Hide password" : "Show password"}
                                className="cursor-pointer text-zinc-400"
                              >
                                {showPw ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            }
                          />
                          <div className="space-y-2">
                            <div className="flex gap-1.5">
                              {[0, 1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "h-1 flex-1 rounded-full transition-colors duration-300",
                                    i < pwScore
                                      ? [
                                          "bg-rose-500",
                                          "bg-amber-500",
                                          "bg-lime-500",
                                          "bg-emerald-500",
                                        ][pwScore - 1]
                                      : "bg-zinc-200 dark:bg-white/10"
                                  )}
                                />
                              ))}
                            </div>
                            <ul className="grid grid-cols-2 gap-1.5 text-xs text-zinc-500">
                              {[
                                ["8+ characters", form.signupPw.length >= 8],
                                ["Uppercase letter", /[A-Z]/.test(form.signupPw)],
                                ["Number", /[0-9]/.test(form.signupPw)],
                                ["Symbol", /[^A-Za-z0-9]/.test(form.signupPw)],
                              ].map(([l, ok]) => (
                                <li
                                  key={l as string}
                                  className={cn(
                                    "flex items-center gap-1.5",
                                    ok && "text-emerald-600 dark:text-emerald-400"
                                  )}
                                >
                                  <Check className={cn("h-3 w-3", !ok && "opacity-30")} /> {l}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div>
                            <h1 className="font-heading text-[30px] leading-tight font-semibold tracking-tight">
                              Set up your workspace
                            </h1>
                            <p className="mt-2 text-[15px] text-zinc-500 dark:text-zinc-400">
                              We'll tailor folders and AI suggestions to your team.
                            </p>
                          </div>
                          <Field
                            id="signup-workspace"
                            label="Workspace name"
                            icon={Briefcase}
                            placeholder="Acme Inc."
                            value={form.workspace}
                            onChange={(e) => set("workspace", e.target.value)}
                            error={errors.workspace}
                            autoFocus
                          />
                          <fieldset className="space-y-2">
                            <legend className="mb-1.5 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                              Your role
                            </legend>
                            <div className="grid grid-cols-2 gap-2">
                              {["Founder", "Designer", "Engineer", "Sales"].map((r) => (
                                <button
                                  type="button"
                                  key={r}
                                  onClick={() => set("role", r)}
                                  className={cn(
                                    "flex h-11 cursor-pointer items-center justify-center rounded-2xl border text-sm font-medium transition-all",
                                    form.role === r
                                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-4 ring-blue-500/10 dark:bg-blue-500/10 dark:text-blue-300"
                                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-white/10 dark:text-zinc-300"
                                  )}
                                >
                                  {r}
                                </button>
                              ))}
                            </div>
                          </fieldset>
                          <fieldset>
                            <legend className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                              <Users className="h-3.5 w-3.5" /> Team size
                            </legend>
                            <div className="flex rounded-2xl bg-zinc-100 p-1 dark:bg-white/[0.06]">
                              {["Just me", "2-10", "11-50", "50+"].map((t) => (
                                <button
                                  type="button"
                                  key={t}
                                  onClick={() => set("teamSize", t)}
                                  className="relative h-9 flex-1 cursor-pointer rounded-xl text-sm font-medium"
                                >
                                  {form.teamSize === t && (
                                    <motion.span
                                      layoutId="auth-team"
                                      transition={spring}
                                      className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-zinc-800"
                                    />
                                  )}
                                  <span className="relative">{t}</span>
                                </button>
                              ))}
                            </div>
                          </fieldset>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <div>
                            <h1 className="font-heading flex items-center gap-2 text-[30px] leading-tight font-semibold tracking-tight">
                              Personalise your AI <Wand2 className="h-6 w-6 text-violet-500" />
                            </h1>
                            <p className="mt-2 text-[15px] text-zinc-500 dark:text-zinc-400">
                              You can change this anytime in Settings.
                            </p>
                          </div>
                          <fieldset>
                            <legend className="mb-2 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                              Default writing tone
                            </legend>
                            <div className="flex flex-wrap gap-2">
                              {TONES.map((t) => (
                                <button
                                  type="button"
                                  key={t}
                                  onClick={() => set("tone", t)}
                                  className={cn(
                                    "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all",
                                    form.tone === t
                                      ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-white/10 dark:text-zinc-300"
                                  )}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </fieldset>
                          <fieldset className="space-y-2">
                            <legend className="mb-2 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                              Enable AI features
                            </legend>
                            {[
                              ["Smart summaries", "TL;DR on every long email"],
                              ["AI compose", "Draft emails from a one-line prompt"],
                              ["Auto-categorise", "Sort mail into smart folders"],
                              ["Meeting detection", "Turn emails into calendar events"],
                            ].map(([f, d]) => {
                              const on = form.features.includes(f);
                              return (
                                <button
                                  type="button"
                                  key={f}
                                  onClick={() =>
                                    set(
                                      "features",
                                      on
                                        ? form.features.filter((x) => x !== f)
                                        : [...form.features, f]
                                    )
                                  }
                                  className={cn(
                                    "flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all",
                                    on
                                      ? "border-violet-300 bg-violet-50/60 dark:border-violet-500/30 dark:bg-violet-500/[0.08]"
                                      : "border-zinc-200 dark:border-white/10"
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                                      on
                                        ? "border-violet-600 bg-violet-600 text-white"
                                        : "border-zinc-300 dark:border-zinc-600"
                                    )}
                                  >
                                    {on && <Check className="h-3 w-3" strokeWidth={3} />}
                                  </span>
                                  <span className="flex-1">
                                    <span className="block text-sm font-medium">{f}</span>
                                    <span className="block text-xs text-zinc-500">{d}</span>
                                  </span>
                                  <Sparkles
                                    className={cn(
                                      "h-4 w-4",
                                      on ? "text-violet-500" : "text-zinc-300 dark:text-zinc-700"
                                    )}
                                  />
                                </button>
                              );
                            })}
                          </fieldset>
                        </>
                      )}

                      <div className="flex gap-3 pt-1">
                        <button
                          type="button"
                          onClick={back}
                          className="flex h-12 cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-zinc-200 px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/5"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <PrimaryButton type="submit" className="flex-1" id="aimail-signup-next">
                          {step === SIGNUP_STEPS.length - 1 ? (
                            <>
                              Launch my inbox <Rocket className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Continue <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </PrimaryButton>
                      </div>
                      {step === 0 && (
                        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => go("login")}
                            className="cursor-pointer font-semibold text-zinc-900 hover:underline dark:text-white"
                          >
                            Sign in
                          </button>
                        </p>
                      )}
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
            <span>© 2026 HudMail · Hudbird UI</span>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-zinc-700 dark:hover:text-zinc-200">
                Privacy
              </a>
              <a href="/terms" className="hover:text-zinc-700 dark:hover:text-zinc-200">
                Terms
              </a>
              <a href="/contact" className="hover:text-zinc-700 dark:hover:text-zinc-200">
                Help
              </a>
            </div>
          </footer>
        </div>

        <BrandPanel />
      </div>
    </div>
  );
}
