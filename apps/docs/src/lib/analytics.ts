export const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || "G-7ELTSPERKY";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let isInitialized = false;

/**
 * Initializes Google Analytics 4 (GA4) by injecting the gtag.js script
 * and setting up the global dataLayer and gtag function.
 */
export function initGA(): void {
  if (typeof window === "undefined" || isInitialized) return;
  if (!GA_MEASUREMENT_ID) return;

  // Initialize dataLayer & gtag if not already present in HTML
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  }

  // Inject script asynchronously if not already present in HTML
  const existingScript =
    document.getElementById("ga-gtag-script") ||
    document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "ga-gtag-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  isInitialized = true;
}

/**
 * Tracks SPA pageviews. Ideal for HashRouter transitions (e.g. /#/button, /#/marketing/hero).
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const currentTitle = title || document.title;
  const fullPath = path.startsWith("/") ? path : `/${path}`;

  window.gtag("event", "page_view", {
    page_title: currentTitle,
    page_path: fullPath,
    page_location: window.location.href,
  });
}

/**
 * Tracks custom user interactions (e.g. code copies, theme changes, template previews).
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, eventParams);
}
