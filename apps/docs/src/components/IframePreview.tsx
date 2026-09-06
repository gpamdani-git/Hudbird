// apps/docs/src/components/IframePreview.tsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface IframePreviewProps {
  children: React.ReactNode;
  minHeight?: number;
  className?: string;
}

export const IframePreview: React.FC<IframePreviewProps> = ({
  children,
  minHeight = 360,
  className = "",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [frameHeight, setFrameHeight] = useState<number>(minHeight);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let resizeObserver: ResizeObserver | null = null;

    const setupIframe = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const isDark = document.documentElement.classList.contains("dark");

      // Write basic HTML structure
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en" class="${isDark ? "dark" : ""}">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              /* Base resets for preview frame */
              html, body {
                margin: 0;
                padding: 0;
                min-height: 100%;
                background-color: transparent;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              body {
                padding: 0;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            </style>
          </head>
          <body class="text-zinc-900 dark:text-zinc-50 font-sans p-4 relative overflow-x-hidden min-h-[${minHeight}px]">
            <div id="frame-root" class="w-full flex flex-col items-center justify-center"></div>
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

      // Auto-adjust height dynamically based on content changes
      if (doc.body) {
        resizeObserver = new ResizeObserver(() => {
          if (doc.body) {
            const newHeight = Math.max(doc.body.scrollHeight, minHeight);
            setFrameHeight(newHeight);
          }
        });
        resizeObserver.observe(doc.body);
      }
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
  }, [minHeight]);

  return (
    <iframe
      ref={iframeRef}
      title="Responsive Isolated Canvas"
      style={{ height: `${frameHeight}px` }}
      className={`w-full border-0 transition-[height] duration-200 block bg-transparent ${className}`}
    >
      {mountNode && ReactDOM.createPortal(children, mountNode)}
    </iframe>
  );
};
