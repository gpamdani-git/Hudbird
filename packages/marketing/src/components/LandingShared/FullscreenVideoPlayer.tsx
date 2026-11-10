"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { Button, Badge } from "@hudbird/ui";
import { cn } from "../../utils/cn";

export interface FullscreenVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  subtitle?: string;
  author?: string;
  role?: string;
  className?: string;
}

export function FullscreenVideoPlayer({
  isOpen,
  onClose,
  videoUrl,
  title = "Customer Success Story",
  subtitle = "We call ourselves generalist investors with a vertical focus.",
  author,
  role,
  className,
}: FullscreenVideoPlayerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key & fullscreenchange events
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          onClose();
        }
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isOpen, onClose]);

  // Clean playback handling on open/close
  React.useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    } else if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen]);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Video player"}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 md:p-12"
        >
          {/* Deep Frosted Blur Backdrop (Matches Image Reference) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
            aria-hidden="true"
          />

          {/* Floating Close Button Top-Right of Viewport */}
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            aria-label="Close video player"
            className="fixed top-5 right-5 z-[10001] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 active:scale-95 sm:top-7 sm:right-7"
          >
            <X className="h-5 w-5" />
          </motion.button>

          {/* Video Player Container with Modern Rounded Corners (Matches Image Reference) */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={cn(
              "group/player relative z-[10000] w-full max-w-5xl",
              "aspect-video overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[28px]",
              "border border-white/20 bg-black shadow-[0_32px_100px_-16px_rgba(0,0,0,0.95)] ring-1 ring-white/10",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HTML5 Video Element with Fullscreen Aspect Ratio */}
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />

            {/* Top Bar Context & Controls (Reveals on Hover / Non-intrusive) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover/player:opacity-100 sm:p-5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="flat"
                  size="sm"
                  radius="full"
                  className="bg-white/15 font-mono text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-md"
                >
                  4K UHD
                </Badge>
                {(author || role) && (
                  <span className="hidden font-sans text-xs font-medium text-zinc-300 sm:inline">
                    {[author, role].filter(Boolean).join(" • ")}
                  </span>
                )}
              </div>

              {/* Fullscreen Toggle Action */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                radius="full"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="pointer-events-auto flex h-9 items-center gap-1.5 border-white/20 bg-black/60 px-3.5 text-xs font-medium text-white shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 active:scale-95"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </>
                )}
              </Button>
            </div>

            {/* Subtitle Caption Overlay (Matches Reference Image Exactly) */}
            {subtitle && (
              <div
                aria-label="Video subtitle"
                className="pointer-events-none absolute bottom-14 left-1/2 z-20 max-w-[85%] -translate-x-1/2 sm:bottom-16"
              >
                <div className="rounded bg-black/85 px-4 py-1.5 text-center font-sans text-xs font-medium tracking-wide text-white shadow-xl backdrop-blur-xs select-none sm:text-sm sm:leading-snug">
                  {subtitle}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
