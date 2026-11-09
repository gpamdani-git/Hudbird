import * as React from "react";
import { useReducedMotion } from "framer-motion";

export interface UseNavbarScrollOptions {
  enabled?: boolean;
  hideOnScroll?: boolean;
  threshold?: number;
  deltaHysteresis?: number;
  isMenuOpen?: boolean;
  navbarRef?: React.RefObject<HTMLElement | null>;
}

export interface NavbarScrollState {
  scrolled: boolean;
  hidden: boolean;
  scrollY: number;
  scrollPercent: number;
}

export function useNavbarScroll({
  enabled = true,
  hideOnScroll = false,
  threshold = 16,
  deltaHysteresis = 10,
  isMenuOpen = false,
  navbarRef,
}: UseNavbarScrollOptions = {}): NavbarScrollState {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const [scrollPercent, setScrollPercent] = React.useState(0);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    if (!enabled) return;

    const ownerWindow =
      navbarRef?.current?.ownerDocument?.defaultView ??
      (typeof window !== "undefined" ? window : null);
    if (!ownerWindow) return;

    const onScroll = () => {
      const currentY = Math.max(0, ownerWindow.scrollY);
      setScrollY(currentY);

      const doc = ownerWindow.document.documentElement;
      const scrollTotal = doc ? doc.scrollHeight - ownerWindow.innerHeight : 0;
      const pct =
        scrollTotal > 0
          ? Math.min(100, Math.max(0, Math.round((currentY / scrollTotal) * 100)))
          : 0;
      setScrollPercent(pct);

      // Check elevation / border threshold
      const isPastThreshold = currentY > threshold;
      setScrolled(isPastThreshold);

      // Scroll direction & hide/reveal calculation
      if (!hideOnScroll || reduceMotion || isMenuOpen) {
        setHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      // Check if focus is inside navbar; if so, never hide
      const activeElement = navbarRef?.current?.ownerDocument?.activeElement;
      if (activeElement && navbarRef?.current?.contains(activeElement)) {
        setHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      const delta = currentY - lastScrollY.current;

      if (currentY <= threshold) {
        // Return to top
        setHidden(false);
      } else if (delta > deltaHysteresis) {
        // Scrolling down past tolerance -> hide
        setHidden(true);
      } else if (delta < -deltaHysteresis) {
        // Scrolling up past tolerance -> reveal
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    // Initial check
    onScroll();

    ownerWindow.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ownerWindow.removeEventListener("scroll", onScroll);
    };
  }, [enabled, hideOnScroll, threshold, deltaHysteresis, isMenuOpen, navbarRef, reduceMotion]);

  // If menu opens, immediately unhide
  React.useEffect(() => {
    if (isMenuOpen) {
      setHidden(false);
    }
  }, [isMenuOpen]);

  return { scrolled, hidden, scrollY, scrollPercent };
}
