// apps/docs/src/components/IframePreview.tsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export interface ContextMenuSectionInfo {
  sectionType: string;
  x: number;
  y: number;
}

export interface IframePreviewProps {
  children: React.ReactNode;
  minHeight?: number;
  className?: string;
  flush?: boolean;
  onPreviewClick?: () => void;
  onContextMenuSection?: (info: ContextMenuSectionInfo) => void;
  onEscape?: () => void;
  scrollToSection?: { type: string; nonce: number } | null;
}

export const IframePreview: React.FC<IframePreviewProps> = ({
  children,
  minHeight = 0,
  className = "",
  flush = false,
  onPreviewClick,
  onContextMenuSection,
  onEscape,
  scrollToSection,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [frameHeight, setFrameHeight] = useState<number>(minHeight || 600);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (mountNode) {
      const id = setTimeout(() => setIsReady(true), 120);
      return () => clearTimeout(id);
    } else {
      setIsReady(false);
    }
  }, [mountNode]);

  const onPreviewClickRef = useRef(onPreviewClick);
  onPreviewClickRef.current = onPreviewClick;

  const onContextMenuSectionRef = useRef(onContextMenuSection);
  onContextMenuSectionRef.current = onContextMenuSection;

  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let resizeObserver: ResizeObserver | null = null;

    const setupIframe = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const isDark = document.documentElement.classList.contains("dark");

      // Write basic HTML structure with strictly auto-height root so iframe shrinks on section delete/change
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en" class="${isDark ? "dark" : ""}">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <base href="${window.location.origin}/" />
            <style>
              /* Base resets for preview frame with true dynamic height */
              html, body {
                margin: 0;
                padding: 0;
                height: auto !important;
                min-height: 0 !important;
                background-color: transparent;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                overflow-x: hidden !important;
                overflow-y: hidden !important;
              }
              body {
                padding: 0;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
              }

              /* AI Studio Section Selection & Transition (Hardware-accelerated, zero load) */
              :root {
                --hb-ai-focus-rgb: 24, 24, 27;
              }
              html.dark, :root.dark {
                --hb-ai-focus-rgb: 255, 255, 255;
              }

              @keyframes hb-ai-focus-pulse {
                0% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0),
                              0 0 0 rgba(var(--hb-ai-focus-rgb), 0);
                }
                20% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0.35),
                              0 0 30px -4px rgba(var(--hb-ai-focus-rgb), 0.16);
                }
                75% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0.22),
                              0 0 18px -4px rgba(var(--hb-ai-focus-rgb), 0.08);
                }
                100% {
                  box-shadow: 0 0 0 1px rgba(var(--hb-ai-focus-rgb), 0),
                              0 0 0 rgba(var(--hb-ai-focus-rgb), 0);
                }
              }

              @keyframes hb-ai-beam-sweep {
                0% {
                  transform: translateX(-100%);
                  opacity: 0;
                }
                25% {
                  opacity: 1;
                }
                75% {
                  opacity: 1;
                }
                100% {
                  transform: translateX(100%);
                  opacity: 0;
                }
              }

              .hb-ai-focus-active {
                position: relative !important;
                animation: hb-ai-focus-pulse 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
              }

              .hb-ai-focus-active::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(
                  90deg,
                  transparent 0%,
                  rgba(var(--hb-ai-focus-rgb), 0.2) 20%,
                  rgba(var(--hb-ai-focus-rgb), 0.95) 50%,
                  rgba(var(--hb-ai-focus-rgb), 0.2) 80%,
                  transparent 100%
                );
                box-shadow: 0 0 12px rgba(var(--hb-ai-focus-rgb), 0.6);
                pointer-events: none;
                z-index: 60;
                animation: hb-ai-beam-sweep 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            </style>
          </head>
          <body class="text-zinc-900 dark:text-zinc-50 font-sans ${flush ? "p-0" : "p-4"} relative overflow-hidden m-0 w-full h-auto">
            <div id="frame-root" class="w-full flex flex-col items-stretch justify-start h-auto min-h-0"></div>
          </body>
        </html>
      `);
      doc.close();

      // Lock preview viewport height so elements using 100vh do not cause recursive auto-expand loop
      doc.documentElement.style.setProperty("--hb-viewport-h", `${window.innerHeight}px`);

      // Copy all active stylesheets & inline styles from parent document
      const syncStyles = () => {
        if (!doc.head) return;
        document.querySelectorAll("style, link[rel='stylesheet']").forEach((node) => {
          const cloned = node.cloneNode(true);
          doc.head.appendChild(cloned);
        });
      };
      syncStyles();

      const root = doc.getElementById("frame-root");
      setMountNode(root);

      // Measure true content height precisely without phantom space below footer
      const calculateTrueHeight = () => {
        if (!root) return minHeight;
        let bottom = 0;
        const children = root.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const elBottom = el.offsetTop + el.offsetHeight;
          if (elBottom > bottom) bottom = elBottom;
        }
        const measured = Math.max(bottom, root.offsetHeight, root.scrollHeight);
        return Math.max(measured, minHeight);
      };

      if (root) {
        let rafId: number | null = null;
        resizeObserver = new ResizeObserver(() => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            const contentHeight = calculateTrueHeight();
            if (contentHeight > 0) {
              setFrameHeight((prev) => (Math.abs(prev - contentHeight) > 2 ? contentHeight : prev));
            }
          });
        });
        resizeObserver.observe(root);
      }

      // Event Listeners for click-to-close-sidebar, interaction auto-hide, and right-click context menu
      const handlePointerDown = (e: MouseEvent) => {
        if (e.button === 0) {
          onPreviewClickRef.current?.();
        }
      };

      const handleInteraction = () => {
        onPreviewClickRef.current?.();
      };

      const handleContextMenu = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const sectionEl = target?.closest("[data-landing-section]") as HTMLElement | null;
        if (sectionEl && sectionEl.dataset.landingSection) {
          e.preventDefault();
          e.stopPropagation();
          const rect = iframe.getBoundingClientRect();
          onContextMenuSectionRef.current?.({
            sectionType: sectionEl.dataset.landingSection,
            x: rect.left + e.clientX,
            y: rect.top + e.clientY,
          });
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onEscapeRef.current?.();
        }
      };

      doc.addEventListener("pointerdown", handlePointerDown);
      doc.addEventListener("wheel", handleInteraction, { passive: true });
      doc.addEventListener("touchmove", handleInteraction, { passive: true });
      doc.addEventListener("contextmenu", handleContextMenu);
      doc.addEventListener("keydown", handleKeyDown);
    };

    setupIframe();

    // Observe dark mode toggles in parent app
    const themeObserver = new MutationObserver(() => {
      if (iframe.contentDocument) {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          iframe.contentDocument.documentElement.classList.add("dark");
        } else {
          iframe.contentDocument.documentElement.classList.remove("dark");
        }
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleWindowResize = () => {
      if (iframe.contentDocument?.documentElement) {
        iframe.contentDocument.documentElement.style.setProperty(
          "--hb-viewport-h",
          `${window.innerHeight}px`
        );
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      resizeObserver?.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [flush, minHeight]);

  // Smoothly position landing page to the selected section on demand
  useEffect(() => {
    if (!scrollToSection?.type || !iframeRef.current) return;
    const iframe = iframeRef.current;
    const sectionType = scrollToSection.type;

    const performScroll = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const highlightElement = (el: HTMLElement) => {
        const targetSection = (el.firstElementChild as HTMLElement) || el;
        const isDark =
          doc.documentElement.classList.contains("dark") ||
          targetSection.dataset.heroVariant === "video" ||
          targetSection.classList.contains("bg-zinc-950") ||
          targetSection.classList.contains("hb-video-section");

        const rgb = isDark ? "255, 255, 255" : "24, 24, 27";
        targetSection.style.setProperty("--hb-ai-focus-rgb", rgb);

        targetSection.classList.remove("hb-ai-focus-active");
        // Force repaint to cleanly trigger the hardware-accelerated animation
        void targetSection.offsetWidth;
        targetSection.classList.add("hb-ai-focus-active");

        setTimeout(() => {
          targetSection.classList.remove("hb-ai-focus-active");
          targetSection.style.removeProperty("--hb-ai-focus-rgb");
        }, 1500);
      };

      if (sectionType === "navbar") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const target = doc.querySelector(`[data-landing-section="navbar"]`) as HTMLElement | null;
        if (target) {
          highlightElement(target);
        }
        return;
      }

      const target = doc.querySelector(
        `[data-landing-section="${sectionType}"]`
      ) as HTMLElement | null;
      if (target) {
        const iframeRect = iframe.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const headerOffset = 76; // Clearance for top fixed navbar
        const targetScrollY = Math.max(
          0,
          window.scrollY + iframeRect.top + targetRect.top - headerOffset
        );

        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });

        highlightElement(target);
      }
    };

    const rafId = requestAnimationFrame(performScroll);
    return () => cancelAnimationFrame(rafId);
  }, [scrollToSection]);

  return (
    <div className="relative w-full overflow-hidden">
      {!isReady && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-50/90 py-12 backdrop-blur-xs transition-opacity duration-300 dark:bg-[#161618]/90"
          style={{ minHeight: `${Math.max(minHeight, 140)}px` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-9 w-9 animate-ping rounded-full bg-blue-500/25" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900">
              <svg
                viewBox="0 0 81 123"
                fill="currentColor"
                className="h-5 w-auto animate-pulse text-zinc-900 dark:text-white"
                aria-hidden="true"
              >
                <path d="M 11.5,0 A 11.5,11.5 0 0,1 23,11.5 L 23,44 C 25,38 36,35 48,35 C 64,35 80.5,45 80.5,65 L 80.5,111.5 A 11.25,11.25 0 0,1 58,111.5 L 58,65 C 58,57 50,53.5 40.5,53.5 C 31,53.5 23,58 23,67 L 23,111.5 A 11.5,11.5 0 0,1 0,111.5 L 0,11.5 A 11.5,11.5 0 0,1 11.5,0 Z" />
              </svg>
            </div>
          </div>
          <span className="mt-2.5 text-[11px] font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
            Rendering preview...
          </span>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Responsive Isolated Canvas"
        style={{ height: `${frameHeight}px` }}
        className={`block w-full border-0 bg-transparent transition-opacity duration-300 ${!isReady ? "opacity-0" : "opacity-100"} ${className}`}
      >
        {mountNode && ReactDOM.createPortal(children, mountNode)}
      </iframe>
    </div>
  );
};
