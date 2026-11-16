"use client";

import * as React from "react";

export const ABOUT_EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Uses IntersectionObserver on standard pages while activating immediately inside
 * cross-document iframe portals (e.g. IframePreview) where parent observers never fire.
 */
export function useSafeSectionReveal(ref: React.RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") {
      setVisible(true);
      return;
    }

    const isIframePortal = el.ownerDocument !== document;
    const Observer =
      el.ownerDocument.defaultView?.IntersectionObserver ?? window.IntersectionObserver;

    if (isIframePortal || typeof Observer === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new Observer(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}
