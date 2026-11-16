"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, Check, Eye, EyeOff, Mail, Play, Plus, Sparkles, X } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Container,
  Divider,
  Grid,
  Heading,
  Section,
  Text,
  Textarea,
  Input,
} from "@hudbird/ui";
import "./login-page.css";

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}
export interface LoginPageProps {
  brandName?: string;
  logo?: React.ReactNode;
  variant?: "split" | "centered";
  showBrand?: boolean;
  showForm?: boolean;
  showSocial?: boolean;
  showSignUp?: boolean;
  showRecovery?: boolean;
  showFooter?: boolean;
  socialMode?: "oauth" | "sso";
  socialProviders?: ("Apple" | "Google" | "X" | "GitHub" | "SSO")[];
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  onLogin?: (credentials: LoginCredentials) => void | Promise<void>;
  onSocialLogin?: (provider: string) => void | Promise<void>;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  signUpHref?: string;
  forgotPasswordHref?: string;
  homeHref?: string;
  videoSrc?: string;
}

const room =
  "https://images.pexels.com/photos/4261617/pexels-photo-4261617.jpeg?auto=compress&cs=tinysrgb&w=1600";
const film = "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";
const spring = { type: "spring" as const, stiffness: 260, damping: 30 };

function ProviderIcon({ provider }: { provider: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      {provider === "Apple" ? (
        <path d="M17.1 12.3c0-2 1.6-3 1.7-3.1-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.6 0-3.1 1-3.9 2.4-1.6 2.9-.4 7.2 1.2 9.5.8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.3-.9-2.3-3.4ZM14.8 5.9c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1.1 2.9 1.1.1 2.2-.5 2.9-1.3Z" />
      ) : provider === "X" ? (
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.8L18.9 2ZM17.5 20h1.7L6.3 4H4.5l13 16Z" />
      ) : (
        <>
          <path
            fill="#4285F4"
            d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4c-.2 1.3-1 2.3-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.5Z"
          />
          <path
            fill="#34A853"
            d="M12 22c2.7 0 5-1 6.7-2.4l-3.3-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H3v2.7C4.7 19.8 8.1 22 12 22Z"
          />
          <path fill="#FBBC05" d="M6.4 13.8a6 6 0 0 1 0-3.6V7.5H3a10 10 0 0 0 0 9l3.4-2.7Z" />
          <path
            fill="#EA4335"
            d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-9 5.5l3.4 2.7C7.2 7.8 9.4 6 12 6Z"
          />
        </>
      )}
    </svg>
  );
}

function FilmDialog({ onClose, src }: { onClose: () => void; src: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="hb-login-film"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        setClosing(true);
      }}
    >
      <motion.div
        className="flex h-full flex-col bg-zinc-950 p-4 text-white sm:p-8"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
        animate={{ opacity: closing ? 0 : 1, scale: closing && !reduced ? 0.98 : 1 }}
        transition={{ duration: reduced ? 0 : 0.22 }}
        onAnimationComplete={() => {
          if (closing) onClose();
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-sm font-medium">
            A little space to think
          </h2>
          <Button
            autoFocus
            variant="ghost"
            color="white"
            isIconOnly
            aria-label="Close video"
            onClick={() => setClosing(true)}
          >
            <X size={20} />
          </Button>
        </div>
        {failed ? (
          <p role="alert" className="m-auto">
            The film could not load. Please close it and try again.
          </p>
        ) : (
          <video
            className="min-h-0 w-full flex-1 rounded-xl object-contain"
            src={src}
            controls
            autoPlay
            playsInline
            onError={() => setFailed(true)}
            aria-label="Pexels inspiration film"
          />
        )}
      </motion.div>
    </dialog>
  );
}

function InspirationPanel({ videoSrc }: { videoSrc: string }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <>
      <motion.aside
        className="hb-login-aside relative flex min-h-[540px] flex-col justify-center overflow-hidden rounded-3xl bg-zinc-800 p-6 sm:p-10"
        initial={{ opacity: 0, transform: reduced ? "none" : "translateX(-24px)" }}
        animate={{ opacity: 1, transform: "none" }}
        transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Workspace inspiration"
      >
        <img
          src={room}
          alt="Quiet monochrome room with sculptural white walls and an open doorway"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/15 via-zinc-950/30 to-zinc-950/70" />
        <div className="relative mx-auto w-full max-w-md space-y-7">
          <div className="text-center text-white">
            <Heading as="h2" size="h3" className="text-white">
              A little space. A bigger idea.
            </Heading>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              Make room for your next project.
            </p>
          </div>
          <motion.div layout={!reduced} transition={spring}>
            <Card className="overflow-hidden shadow-xl">
              <CardBody className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles size={16} className="text-primary" /> Your creative assistant
                  </span>
                  <Text variant="muted">Preview</Text>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-4"
                    >
                      <div role="status" className="space-y-3">
                        <Text>A starting point for your idea</Text>
                        <p className="text-muted-foreground line-clamp-2 text-sm">{prompt}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Check size={16} className="text-primary" /> Start with a clear headline
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check size={16} className="text-primary" /> Give the content room to
                          breathe
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setResult(false)}>
                        Edit your idea
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="composer"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (prompt.trim()) setResult(true);
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Textarea
                        aria-label="Describe your next project"
                        placeholder="What would you like to create?"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-28 resize-none"
                      />
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          startContent={<Plus size={14} />}
                          onClick={() => setPrompt("A calm, minimal website for my next project.")}
                        >
                          Try an idea
                        </Button>
                        <Button
                          type="submit"
                          isIconOnly
                          aria-label="Preview your idea"
                          disabled={!prompt.trim()}
                          color="primary"
                        >
                          <ArrowUp size={18} />
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardBody>
            </Card>
          </motion.div>
        </div>
        <div className="relative mt-12 flex items-center gap-3 text-white lg:absolute lg:bottom-8 lg:left-8 lg:mt-0">
          <Button
            className="hb-login-play size-14 border border-white/40 bg-white/15 text-white shadow-lg backdrop-blur-xl hover:bg-white/25"
            variant="outline"
            isIconOnly
            radius="full"
            aria-label="Play inspiration film fullscreen"
            onClick={() => setVideoOpen(true)}
          >
            <Play size={20} fill="currentColor" className="translate-x-px" />
          </Button>
          <div>
            <p className="text-sm font-medium">Take a moment</p>
            <p className="mt-1 text-xs text-white/80">Watch the inspiration film</p>
          </div>
        </div>
      </motion.aside>
      {videoOpen && <FilmDialog src={videoSrc} onClose={() => setVideoOpen(false)} />}
    </>
  );
}

export function LoginPage({
  brandName = "Hudbird",
  logo,
  variant = "split",
  showBrand = true,
  showForm = true,
  showSocial = true,
  showSignUp = true,
  showRecovery = true,
  showFooter = true,
  socialMode = "oauth",
  socialProviders,
  heading = "Welcome back!",
  subheading,
  submitLabel = "Log in",
  onLogin,
  onSocialLogin,
  onSignUp,
  onForgotPassword,
  signUpHref = "/sign-up",
  forgotPasswordHref = "/forgot-password",
  homeHref = "/",
  videoSrc = film,
}: LoginPageProps) {
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const reduced = useReducedMotion();
  async function perform(action?: () => void | Promise<void>) {
    setMessage("");
    if (!action) {
      setMessage("This is a preview. Connect your authentication provider to continue.");
      return;
    }
    setPending(true);
    try {
      await action();
    } catch {
      setMessage("Unable to sign in. Please check your details and try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <Section
      spacing="none"
      className="hb-login bg-background text-foreground"
      data-login-variant={variant}
    >
      <Container size="fluid" gutter="none">
        <Grid
          cols={1}
          gap="none"
          className={variant === "split" ? "hb-login-grid lg:grid-cols-2" : "hb-login-grid"}
        >
          <motion.div
            className="flex min-w-0 flex-col p-6 sm:p-10 lg:px-12"
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(20px)" }}
            animate={{ opacity: 1, transform: "none" }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {showBrand && (
              <a
                href={homeHref}
                className="inline-flex w-fit items-center gap-2.5 text-lg font-semibold tracking-tight"
                aria-label={`${brandName} home`}
              >
                {logo ?? (
                  <svg
                    viewBox="0 0 81 123"
                    fill="currentColor"
                    className="size-7"
                    aria-hidden="true"
                  >
                    <path d="M 11.5,0 A 11.5,11.5 0 0,1 23,11.5 L 23,44 C 25,38 36,35 48,35 C 64,35 80.5,45 80.5,65 L 80.5,111.5 A 11.25,11.25 0 0,1 58,111.5 L 58,65 C 58,57 50,53.5 40.5,53.5 C 31,53.5 23,58 23,67 L 23,111.5 A 11.5,11.5 0 0,1 0,111.5 L 0,11.5 A 11.5,11.5 0 0,1 11.5,0 Z" />
                  </svg>
                )}
                {brandName}
              </a>
            )}
            {showForm && (
              <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-16 lg:py-20">
                <div className="mb-8 text-center">
                  <Heading as="h1" size="h2" data-hb-node="heading" data-hb-edit="auth:heading">
                    {heading}
                  </Heading>
                  <Text
                    variant="muted"
                    className="mt-3"
                    data-hb-node="text"
                    data-hb-edit="auth:subheading"
                  >
                    {subheading ?? `Sign in to ${brandName}. Pick up where you left off.`}
                  </Text>
                </div>
                {showSocial && (
                  <>
                    {(() => {
                      const providers =
                        socialProviders && socialProviders.length > 0
                          ? socialProviders
                          : socialMode === "sso"
                            ? ["SSO"]
                            : ["Apple", "Google", "X"];
                      return (
                        <Grid
                          cols={1}
                          gap="xs"
                          className={
                            providers.length >= 3
                              ? "grid-cols-3"
                              : providers.length === 2
                                ? "grid-cols-2"
                                : "grid-cols-1"
                          }
                        >
                          {providers.map((provider) => (
                            <Button
                              key={provider}
                              variant="outline"
                              color="zinc"
                              size="lg"
                              aria-label={`Continue with ${provider}`}
                              disabled={pending}
                              onClick={() =>
                                perform(onSocialLogin ? () => onSocialLogin(provider) : undefined)
                              }
                            >
                              {provider === "SSO" || provider === "GitHub" ? (
                                provider === "SSO" ? (
                                  "Continue with SSO"
                                ) : (
                                  "GitHub"
                                )
                              ) : (
                                <ProviderIcon provider={provider} />
                              )}
                            </Button>
                          ))}
                        </Grid>
                      );
                    })()}
                    <Divider className="my-7">or email address</Divider>
                  </>
                )}
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    void perform(
                      onLogin
                        ? () =>
                            onLogin({
                              email: String(data.get("email")),
                              password: String(data.get("password")),
                              remember,
                            })
                        : undefined
                    );
                  }}
                >
                  <Input
                    label="Email address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    startContent={<Mail size={16} />}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type={visible ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    endContent={
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        aria-label={visible ? "Hide password" : "Show password"}
                        aria-pressed={visible}
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    }
                  />
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)}>
                      <span className="text-xs">Keep me logged in</span>
                    </Checkbox>
                    {showRecovery && (
                      <Button
                        asChild
                        variant="plain"
                        size="sm"
                        className="px-0 text-xs underline underline-offset-4"
                      >
                        <a
                          href={forgotPasswordHref}
                          onClick={
                            onForgotPassword
                              ? (e) => {
                                  e.preventDefault();
                                  onForgotPassword();
                                }
                              : undefined
                          }
                        >
                          Forgot password?
                        </a>
                      </Button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    data-hb-node="primary-button"
                    data-hb-edit="auth:submitLabel"
                    className="w-full"
                    isLoading={pending}
                  >
                    <span data-hb-edit-text="">{submitLabel}</span>
                  </Button>
                  {message && (
                    <p role="status" className="text-muted-foreground text-center text-sm">
                      {message}
                    </p>
                  )}
                </form>
                {showSignUp && (
                  <Text variant="muted" className="mt-4 text-center">
                    Don’t have an account?{" "}
                    <a
                      href={signUpHref}
                      className="text-foreground font-medium underline-offset-4 hover:underline"
                      onClick={
                        onSignUp
                          ? (e) => {
                              e.preventDefault();
                              onSignUp();
                            }
                          : undefined
                      }
                    >
                      Sign up
                    </a>
                  </Text>
                )}
              </div>
            )}
            {showFooter && (
              <Text variant="muted" className="text-center">
                A space for your next idea.
              </Text>
            )}
          </motion.div>
          {variant === "split" && <InspirationPanel videoSrc={videoSrc} />}
        </Grid>
      </Container>
    </Section>
  );
}
