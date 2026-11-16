"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDownCircle, Award, Maximize2, Minimize2, Play, X } from "lucide-react";
import { Badge, Container, Heading, Section } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import "./about-us-section.css";

export interface AboutUsSectionProps {
  id?: string;
  badgeLabel?: string;
  title?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  posterSrc?: string;
  posterAlt?: string;
  videoUrl?: string;
  videoTitle?: string;
  className?: string;
}

const DEFAULT_POSTER =
  "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600";
const DEFAULT_VIDEO =
  "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

interface VideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

export function AboutVideoDialog({
  isOpen,
  onClose,
  videoUrl,
  title,
  returnFocusRef,
}: VideoDialogProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = React.useState(false);
  const dialogPanelRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const wasOpenRef = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const focusTimer = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 20);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            onClose();
          }
        }
      };

      const handleFullscreenChange = () => {
        setIsNativeFullscreen(Boolean(document.fullscreenElement));
      };

      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("fullscreenchange", handleFullscreenChange);

      return () => {
        window.clearTimeout(focusTimer);
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      returnFocusRef.current?.focus();
    }
  }, [isOpen, onClose, returnFocusRef]);

  React.useEffect(() => {
    if (!videoRef.current) return;
    if (isOpen) {
      videoRef.current.play?.()?.catch?.(() => {});
    } else {
      videoRef.current.pause?.();
    }
  }, [isOpen]);

  const toggleNativeFullscreen = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!dialogPanelRef.current) return;
    if (!document.fullscreenElement) {
      dialogPanelRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="hb-about-us fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 md:p-12"
        >
          {/* Backdrop opacity transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Top-right floating close control */}
          <motion.button
            ref={closeButtonRef}
            type="button"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            onClick={onClose}
            aria-label="Close video dialog"
            className="hb-about-dialog-close fixed top-5 right-5 z-[10001] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-2xl backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-7 sm:right-7"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </motion.button>

          {/* Centered modal video surface (transform-origin: center, never scale(0)) */}
          <motion.div
            ref={dialogPanelRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            style={{ transformOrigin: "center" }}
            onClick={(event) => event.stopPropagation()}
            className="relative z-[10000] aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_32px_100px_-16px_rgba(0,0,0,0.9)] sm:rounded-3xl"
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            )}

            <button
              type="button"
              onClick={toggleNativeFullscreen}
              aria-label={isNativeFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="hb-about-dialog-close absolute top-4 right-4 z-20 flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 text-xs font-medium text-white backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isNativeFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function AboutUsSection({
  id = "about",
  badgeLabel = "About Hudbird UI",
  title = "Engineering clean interfaces with precision and craft",
  actionLabel = "Explore Hudbird UI",
  actionHref = "#benefits",
  onActionClick,
  posterSrc = DEFAULT_POSTER,
  posterAlt = "Minimalist monochrome design engineering studio workspace",
  videoUrl = DEFAULT_VIDEO,
  videoTitle = "About Hudbird UI Story Video",
  className,
}: AboutUsSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const playButtonRef = React.useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const revealInitial = (y: number, scale = 1) =>
    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y, scale };

  const revealTarget = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

  return (
    <Section
      id={id}
      data-landing-section="about"
      spacing="none"
      className={cn(
        "hb-about-us bg-background text-foreground pt-8 pb-16 sm:pt-12 sm:pb-24",
        className
      )}
    >
      <Container size="xl" gutter="lg">
        <div>
          {/* Top Pill Badge */}
          <motion.div
            initial={revealInitial(10)}
            animate={revealTarget}
            transition={{ duration: 0.36, delay: 0, ease: EASE_OUT }}
            className="mb-5 sm:mb-6"
          >
            <Badge
              variant="modern"
              size="md"
              data-hb-node="badge"
              data-hb-edit="about:badgeLabel"
              className="gap-2 px-3.5 py-1.5 text-xs font-medium"
            >
              <Award className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
              <span data-hb-edit-text="">{badgeLabel}</span>
            </Badge>
          </motion.div>

          {/* Full-width Two-line Editorial Headline + Right-Aligned Inline Action */}
          <div className="w-full">
            <motion.div
              initial={revealInitial(14)}
              animate={revealTarget}
              transition={{ duration: 0.42, delay: 0.05, ease: EASE_OUT }}
              className="w-full"
            >
              <Heading
                as="h1"
                size="inherit"
                data-hb-node="heading"
                data-hb-edit="about:title"
                className="text-foreground w-full max-w-none text-[clamp(2rem,4.35vw,4.15rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
              >
                {title}
              </Heading>
            </motion.div>

            <motion.div
              initial={revealInitial(10)}
              animate={revealTarget}
              transition={{ duration: 0.36, delay: 0.09, ease: EASE_OUT }}
              className="mt-3 flex justify-start md:mt-2 md:justify-end"
            >
              <a
                href={actionHref}
                onClick={onActionClick}
                data-hb-node="primary-button"
                data-hb-edit="about:actionLabel"
                className="hb-about-action text-foreground inline-flex items-center gap-2 text-sm font-medium tracking-tight hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span data-hb-edit-text="">{actionLabel}</span>
                <ArrowDownCircle
                  className="hb-about-action-icon h-5 w-5 stroke-[1.6]"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>

          {/* Full-width Video Poster Card with Centered Frosted Play Trigger */}
          <motion.div
            initial={revealInitial(18, 0.985)}
            animate={revealTarget}
            transition={{ duration: 0.48, delay: 0.13, ease: EASE_OUT }}
            className="mt-8 sm:mt-11"
          >
            <div
              data-hb-node="media"
              data-hb-edit="about:videoUrl"
              data-hb-edit-mode="popover"
              className="hb-about-media-card group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 sm:aspect-[16/9] sm:rounded-[28px] dark:bg-zinc-900"
            >
              <img
                src={posterSrc}
                alt={posterAlt}
                className="hb-about-media-img h-full w-full object-cover object-[center_32%]"
              />
              <div
                aria-hidden="true"
                className="hb-about-media-scrim pointer-events-none absolute inset-0 bg-black/15 opacity-0"
              />
              <button
                ref={playButtonRef}
                type="button"
                data-hb-node="media"
                data-hb-edit="about:videoUrl"
                data-hb-edit-mode="popover"
                data-hb-video-trigger="true"
                onClick={() => setIsVideoOpen(true)}
                aria-label={`Play ${videoTitle}`}
                className="absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-none"
              >
                <span className="hb-about-play-btn flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/95 bg-white/30 text-white shadow-lg backdrop-blur-md group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 sm:h-20 sm:w-20">
                  <Play
                    className="h-6 w-6 translate-x-[2px] fill-white/95 text-white sm:h-7 sm:w-7"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </Container>

      <AboutVideoDialog
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title={videoTitle}
        returnFocusRef={playButtonRef}
      />
    </Section>
  );
}
