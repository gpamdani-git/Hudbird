import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView, trackEvent } from "../lib/analytics";

/**
 * Headless component that:
 * 1. Initializes GA4 (G-7ELTSPERKY).
 * 2. Tracks every SPA HashRouter route change (Templates, Demos, Sidebar docs, Themes).
 * 3. Measures time spent (dwell time) on each individual page.
 * 4. Autocaptures click events on all buttons and interactive links across the entire app.
 */
export function AnalyticsTracker() {
  const location = useLocation();
  const pageStartTimeRef = useRef<number>(Date.now());
  const currentPathRef = useRef<string>(location.pathname + location.search);

  // Initialize GA4 on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track pageviews & time spent per page
  useEffect(() => {
    const newPath = location.pathname + location.search;
    const prevPath = currentPathRef.current;
    const now = Date.now();

    // If leaving a previous page, record how many seconds user stayed there
    if (prevPath) {
      const timeSpentSec = Math.round((now - pageStartTimeRef.current) / 1000);
      if (timeSpentSec >= 2) {
        trackEvent("page_dwell_time", {
          page_path: prevPath,
          duration_seconds: timeSpentSec,
        });
      }
    }

    // Reset timer and update current path
    pageStartTimeRef.current = now;
    currentPathRef.current = newPath;

    // Send SPA pageview
    trackPageView(newPath);
  }, [location.pathname, location.search]);

  // Track page dwell time when user closes or leaves tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpentSec = Math.round((Date.now() - pageStartTimeRef.current) / 1000);
      if (timeSpentSec >= 2 && currentPathRef.current) {
        trackEvent("page_dwell_time", {
          page_path: currentPathRef.current,
          duration_seconds: timeSpentSec,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Global click event listener for all buttons and interactive elements
  useEffect(() => {
    let lastClickTime = 0;
    let lastElement: EventTarget | null = null;

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive element (button, link, or role="button")
      const interactiveEl = target.closest<HTMLElement>(
        'button, [role="button"], a[href], summary'
      );
      if (!interactiveEl) return;

      // Avoid double triggering if click event fires rapidly on the same target (< 300ms)
      const now = Date.now();
      if (interactiveEl === lastElement && now - lastClickTime < 300) {
        return;
      }
      lastClickTime = now;
      lastElement = interactiveEl;

      // Extract a descriptive label for the button/link
      const rawText = interactiveEl.innerText || interactiveEl.textContent || "";
      const cleanText = rawText.trim().replace(/\s+/g, " ").slice(0, 60);

      const label =
        interactiveEl.getAttribute("aria-label") ||
        interactiveEl.getAttribute("title") ||
        cleanText ||
        interactiveEl.getAttribute("id") ||
        "unnamed_button";

      const elementType = interactiveEl.tagName.toLowerCase();
      const href = interactiveEl.getAttribute("href") || undefined;

      trackEvent("button_click", {
        button_label: label,
        button_id: interactiveEl.id || undefined,
        element_type: elementType,
        href: href,
        page_path: currentPathRef.current,
      });
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
