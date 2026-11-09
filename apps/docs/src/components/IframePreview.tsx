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
            </style>
          </head>
          <body class="text-zinc-900 dark:text-zinc-50 font-sans ${flush ? "p-0" : "p-4"} relative overflow-hidden m-0 w-full h-auto">
            <div id="frame-root" class="w-full flex flex-col items-stretch justify-start h-auto min-h-0"></div>
          </body>
        </html>
      `);
      doc.close();

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

    return () => {
      resizeObserver?.disconnect();
      themeObserver.disconnect();
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
        el.style.transition = "outline 0.3s ease, box-shadow 0.3s ease";
        el.style.outline = "3px solid rgb(99 102 241)";
        el.style.outlineOffset = "4px";
        el.style.boxShadow = "0 0 30px rgba(99, 102, 241, 0.4)";
        setTimeout(() => {
          el.style.outline = "";
          el.style.outlineOffset = "";
          el.style.boxShadow = "";
        }, 2200);
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
    <iframe
      ref={iframeRef}
      title="Responsive Isolated Canvas"
      style={{ height: `${frameHeight}px` }}
      className={`block w-full border-0 bg-transparent ${className}`}
    >
      {mountNode && ReactDOM.createPortal(children, mountNode)}
    </iframe>
  );
};
