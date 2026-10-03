import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Eye, EyeOff, Loader2, Phone } from "lucide-react";
import { AppleIcon, GoogleIcon, Logo, cx, softSpring } from "./primitives";

type Step = "start" | "password" | "phone" | "code" | "loading";
const ORDER: Step[] = ["start", "password", "phone", "code", "loading"];

/**
 * Log in / sign up — multi-step with directional slide transitions,
 * floating-label inputs, inline validation, password strength & OTP boxes.
 */
export function AuthScreen({
  mode,
  onSuccess,
  onTryFirst,
}: {
  mode: "login" | "signup";
  onSuccess: (via: string) => void;
  onTryFirst: () => void;
}) {
  const [step, setStep] = useState<Step>("start");
  const [dir, setDir] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [provider, setProvider] = useState<string | null>(null);

  const go = (s: Step) => {
    setDir(ORDER.indexOf(s) >= ORDER.indexOf(step) ? 1 : -1);
    setError("");
    setStep(s);
  };

  const finish = (via: string) => {
    go("loading");
    window.setTimeout(() => onSuccess(via), 1400);
  };

  const oauth = (p: string) => {
    setProvider(p);
    window.setTimeout(() => finish(p), 900);
  };

  const signup = mode === "signup";

  return (
    <div className="relative flex min-h-full flex-col items-center overflow-hidden bg-[var(--c-bg)] px-5">
      {/* Ambient */}
      <motion.div
        className="pointer-events-none absolute top-[-240px] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,123,255,0.18),rgba(139,92,246,0.08),transparent)] blur-2xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <header className="relative z-10 flex h-16 w-full max-w-6xl items-center">
        <button
          type="button"
          onClick={onTryFirst}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <Logo size={24} /> Hudbird
        </button>
      </header>

      <main className="relative z-10 flex w-full max-w-[380px] flex-1 flex-col justify-center pb-16">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 40, opacity: 0, filter: "blur(6px)" }),
              center: { x: 0, opacity: 1, filter: "blur(0px)" },
              exit: (d: number) => ({ x: d * -40, opacity: 0, filter: "blur(6px)" }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={softSpring}
          >
            {step === "start" && (
              <div className="flex flex-col">
                <h1 className="text-center text-[28px] font-semibold tracking-tight">
                  {signup ? "Create your account" : "Log in or sign up"}
                </h1>
                <p className="mt-2 text-center text-sm text-[var(--c-muted)]">
                  You'll get smarter responses and can upload files, images, and more.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <ProviderButton
                    icon={<GoogleIcon />}
                    label="Continue with Google"
                    loading={provider === "Google"}
                    onClick={() => oauth("Google")}
                  />
                  <ProviderButton
                    icon={<AppleIcon />}
                    label="Continue with Apple"
                    loading={provider === "Apple"}
                    onClick={() => oauth("Apple")}
                  />
                  <ProviderButton
                    icon={<Phone className="h-[18px] w-[18px]" />}
                    label="Continue with phone"
                    onClick={() => go("phone")}
                  />
                </div>
                <div className="my-6 flex items-center gap-4 text-xs font-medium text-[var(--c-subtle)]">
                  <span className="h-px flex-1 bg-[var(--c-border-strong)]" /> OR{" "}
                  <span className="h-px flex-1 bg-[var(--c-border-strong)]" />
                </div>
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!/^\S+@\S+\.\S+$/.test(email))
                      return setError("Enter a valid email address.");
                    go("password");
                  }}
                >
                  <FloatingInput
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={setEmail}
                    error={error}
                    autoFocus
                  />
                  <PrimaryButton>Continue</PrimaryButton>
                </form>
                <button
                  type="button"
                  onClick={onTryFirst}
                  className="mx-auto mt-5 text-sm font-medium text-[var(--c-text)] underline underline-offset-4 hover:opacity-80"
                >
                  Try it first
                </button>
              </div>
            )}

            {step === "password" && (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (password.length < 8)
                    return setError(
                      signup
                        ? "Use at least 8 characters."
                        : "Incorrect password. Try at least 8 characters."
                    );
                  finish("email");
                }}
              >
                <BackButton onClick={() => go("start")} />
                <h1 className="text-center text-[28px] font-semibold tracking-tight">
                  {signup ? "Create a password" : "Enter your password"}
                </h1>
                <div className="mt-8 flex h-[52px] items-center justify-between rounded-full border border-[var(--c-border-strong)] px-5 text-sm">
                  <span className="truncate text-[var(--c-muted)]">{email}</span>
                  <button
                    type="button"
                    onClick={() => go("start")}
                    className="font-medium text-[var(--c-accent)]"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-3">
                  <PasswordInput value={password} onChange={setPassword} error={error} />
                </div>
                {signup && <StrengthMeter value={password} />}
                {!signup && (
                  <button type="button" className="mt-3 text-sm font-medium text-[var(--c-accent)]">
                    Forgot password?
                  </button>
                )}
                <PrimaryButton>{signup ? "Create account" : "Continue"}</PrimaryButton>
              </form>
            )}

            {step === "phone" && (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (phone.replace(/\D/g, "").length < 8)
                    return setError("Enter a valid phone number.");
                  go("code");
                }}
              >
                <BackButton onClick={() => go("start")} />
                <h1 className="text-center text-[28px] font-semibold tracking-tight">
                  Continue with phone
                </h1>
                <p className="mt-2 text-center text-sm text-[var(--c-muted)]">
                  We'll text you a 6-digit code.
                </p>
                <div className="mt-8 flex gap-2">
                  <select
                    aria-label="Country code"
                    className="h-[52px] rounded-full border border-[var(--c-border-strong)] bg-transparent px-4 text-sm"
                  >
                    <option>🇮🇩 +62</option>
                    <option>🇺🇸 +1</option>
                    <option>🇸🇬 +65</option>
                  </select>
                  <div className="flex-1">
                    <FloatingInput
                      label="Phone number"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={setPhone}
                      error={error}
                      autoFocus
                    />
                  </div>
                </div>
                <PrimaryButton>Send code</PrimaryButton>
              </form>
            )}

            {step === "code" && (
              <OtpStep phone={phone} onBack={() => go("phone")} onDone={() => finish("phone")} />
            )}

            {step === "loading" && (
              <div className="flex flex-col items-center py-10 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  className="rounded-full p-1"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #8b5cf6, #3d7bff, #22d3ee, transparent 70%)",
                  }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--c-bg)]">
                    <Logo size={30} />
                  </div>
                </motion.div>
                <p className="aichat-shimmer mt-6 text-sm font-medium">
                  Setting up your workspace…
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-3 pb-8 text-xs text-[var(--c-subtle)]">
        <Logo size={20} />
        <div className="flex gap-3">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="underline underline-offset-2 hover:text-[var(--c-text)]"
          >
            Terms of use
          </a>
          <span>|</span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="underline underline-offset-2 hover:text-[var(--c-text)]"
          >
            Privacy policy
          </a>
        </div>
      </footer>
    </div>
  );
}

function ProviderButton({
  icon,
  label,
  onClick,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      className="relative flex h-[52px] items-center justify-center gap-3 overflow-hidden rounded-full border border-[var(--c-border-strong)] bg-[var(--c-surface)] text-[15px] font-medium transition-colors hover:bg-[var(--c-surface-2)]"
    >
      {loading ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : icon}
      {label}
      {loading && (
        <motion.span
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-120%", "320%"] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      type="submit"
      whileTap={{ scale: 0.98 }}
      className="mt-4 h-[52px] w-full rounded-full bg-[var(--c-invert)] text-[15px] font-medium text-[var(--c-invert-text)] transition-opacity hover:opacity-90"
    >
      {children}
    </motion.button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--c-muted)] transition-colors hover:bg-[var(--c-surface-2)] hover:text-[var(--c-text)]"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  error,
  autoFocus,
  autoComplete,
  trailing,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  trailing?: React.ReactNode;
}) {
  const [focus, setFocus] = useState(false);
  const floated = focus || value.length > 0;
  const id = React.useId();
  return (
    <div>
      <motion.div
        animate={error ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className={cx(
          "relative h-[52px] rounded-full border bg-transparent transition-colors",
          error
            ? "border-rose-500"
            : focus
              ? "border-[var(--c-accent)] shadow-[0_0_0_3px_var(--c-accent-soft)]"
              : "border-[var(--c-border-strong)]"
        )}
      >
        <motion.label
          htmlFor={id}
          initial={false}
          animate={floated ? { y: -26, scale: 0.82, x: -2 } : { y: 0, scale: 1, x: 0 }}
          transition={softSpring}
          style={{ transformOrigin: "left center" }}
          className={cx(
            "pointer-events-none absolute top-[15px] left-5 bg-[var(--c-bg)] px-1 text-[15px]",
            error ? "text-rose-400" : focus ? "text-[var(--c-accent)]" : "text-[var(--c-subtle)]"
          )}
        >
          {label}
        </motion.label>
        <input
          id={id}
          type={type}
          value={value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          aria-invalid={!!error}
          className="h-full w-full rounded-full bg-transparent px-6 text-[15px] focus:outline-none"
        />
        {trailing && <div className="absolute top-1/2 right-3 -translate-y-1/2">{trailing}</div>}
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="overflow-hidden px-5 pt-2 text-xs text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <FloatingInput
      label="Password"
      type={show ? "text" : "password"}
      autoComplete="current-password"
      value={value}
      onChange={onChange}
      error={error}
      autoFocus
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--c-muted)] hover:text-[var(--c-text)]"
        >
          {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      }
    />
  );
}

function StrengthMeter({ value }: { value: string }) {
  const score = [
    value.length >= 8,
    /[A-Z]/.test(value),
    /\d/.test(value),
    /[^A-Za-z0-9]/.test(value),
  ].filter(Boolean).length;
  const colors = ["bg-rose-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  return (
    <div className="mt-3 px-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--c-surface-3)]">
            <motion.div
              className={cx("h-full", colors[Math.max(0, score - 1)])}
              initial={false}
              animate={{ width: i < score ? "100%" : "0%" }}
              transition={softSpring}
            />
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-xs text-[var(--c-subtle)]">
        {value
          ? labels[Math.max(0, score - 1)]
          : "Use 8+ characters with a mix of letters, numbers & symbols"}
      </p>
    </div>
  );
}

function OtpStep({
  phone,
  onBack,
  onDone,
}: {
  phone: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => refs.current[0]?.focus(), []);
  useEffect(() => {
    if (code.every(Boolean)) {
      const id = window.setTimeout(onDone, 350);
      return () => window.clearTimeout(id);
    }
  }, [code, onDone]);

  const setAt = (i: number, v: string) => {
    const d = v.replace(/\D/g, "");
    if (d.length > 1) {
      const next = d.slice(0, 6).split("");
      setCode((c) => c.map((_, j) => next[j] ?? ""));
      refs.current[Math.min(5, next.length)]?.focus();
      return;
    }
    setCode((c) => c.map((x, j) => (j === i ? d : x)));
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <h1 className="text-center text-[28px] font-semibold tracking-tight">Check your messages</h1>
      <p className="mt-2 text-center text-sm text-[var(--c-muted)]">
        Enter the code sent to {phone || "your phone"}. Tip: type any 6 digits.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        {code.map((c, i) => (
          <motion.input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={c}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus();
            }}
            animate={c ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            className={cx(
              "h-14 w-12 rounded-2xl border bg-[var(--c-surface)] text-center text-xl font-semibold focus:outline-none",
              c
                ? "border-[var(--c-accent)]"
                : "border-[var(--c-border-strong)] focus:border-[var(--c-accent)]"
            )}
          />
        ))}
      </div>
      <button
        type="button"
        className="mx-auto mt-6 block text-sm font-medium text-[var(--c-accent)]"
      >
        Resend code
      </button>
    </div>
  );
}
