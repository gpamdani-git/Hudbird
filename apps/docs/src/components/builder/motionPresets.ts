/**
 * Calibrated motion presets following the Hudbird `animate` skill:
 * - Strong deceleration ease-out curves for entering UI (never bounce or ease-in).
 * - Composite transforms & opacity only (never animate layout width/height unless CSS grid collapse).
 * - Reduced motion replaces spatial travel with instant/gentle opacity fades.
 */
export const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

export function drawerTransition(reduced: boolean | null) {
  return reduced ? { duration: 0.14 } : { duration: 0.28, ease: EASE_DRAWER };
}

export function modalTransition(reduced: boolean | null) {
  return reduced ? { duration: 0.12 } : { duration: 0.2, ease: EASE_OUT_EXPO };
}

export function popoverTransition(reduced: boolean | null) {
  return reduced ? { duration: 0.1 } : { duration: 0.16, ease: EASE_OUT_EXPO };
}

export const BUTTON_PRESS_CLASS =
  "transition-[transform,background-color,border-color,color,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]";
