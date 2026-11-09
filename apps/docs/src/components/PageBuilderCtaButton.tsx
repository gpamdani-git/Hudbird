import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * 10-Dot Matrix Chevron Icon (pointing right)
 * Matches the exact dot-matrix arrow seen in the user reference images.
 * Composed of 5 rows of 2 dots with precise grid offsets.
 */
export const DotMatrixChevron: React.FC<{
  className?: string;
  dotSize?: number;
  dotFill?: string;
}> = ({ className = "w-3 h-3.5", dotSize = 1.45, dotFill = "currentColor" }) => {
  const dots = [
    { cx: 2.5, cy: 2.5 },
    { cx: 6.5, cy: 2.5 },
    { cx: 6.5, cy: 6.0 },
    { cx: 10.5, cy: 6.0 },
    { cx: 10.5, cy: 9.5 },
    { cx: 14.5, cy: 9.5 }, // apex
    { cx: 6.5, cy: 13.0 },
    { cx: 10.5, cy: 13.0 },
    { cx: 2.5, cy: 16.5 },
    { cx: 6.5, cy: 16.5 },
  ];

  return (
    <svg viewBox="0 0 17 19" className={className} fill="none" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={dotSize} fill={dotFill} />
      ))}
    </svg>
  );
};

interface PageBuilderCtaButtonProps {
  className?: string;
}

/**
 * PageBuilderCtaButton
 * Kinetic morphing button inspired by Hudbird UI Stitch standard:
 * - Rest state: Dark pill with Hudbird Electric Indigo/Cyan gradient left badge + "Page Builder" label.
 * - Hover state: Smooth spring morph expanding the Hudbird gradient from left to right across the button,
 *   revealing 7 dot-matrix chevrons with an animated traveling wave from left to right.
 * - Mouse out: Smooth spring retract back to rest state.
 * - Click: Tactile spring compression navigating to /marketing/landing-builder.
 */
export const PageBuilderCtaButton: React.FC<PageBuilderCtaButtonProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/marketing/landing-builder");
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* 1. Desktop & Tablet Full Morphing Button (sm:inline-flex) */}
      <motion.button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.95 }}
        title="Open Page Builder"
        aria-label="Open Page Builder"
        className="group relative hidden h-9 w-[146px] cursor-pointer items-center overflow-hidden rounded-xl border border-black/[0.08] bg-white text-zinc-900 shadow-xs transition-all duration-300 select-none hover:border-indigo-500/30 hover:shadow-md hover:shadow-indigo-500/20 sm:inline-flex dark:border-white/15 dark:bg-[#131417] dark:text-white dark:hover:border-indigo-400/40"
      >
        {/* Expanding Background Gradient (Left-to-Right morph with Hudbird Brand Colors) */}
        <motion.div
          className="absolute top-1 bottom-1 left-1 rounded-lg bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#06B6D4] shadow-xs shadow-indigo-500/25"
          animate={{
            width: isHovered ? "calc(100% - 8px)" : "28px",
            borderRadius: isHovered ? "10px" : "8px",
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
            mass: 0.8,
          }}
        />

        {/* Rest State: Single Chevron inside left block (aligned with gradient box + optical centering) */}
        <motion.div
          className="pointer-events-none relative z-10 ml-1 flex h-7 w-7 shrink-0 items-center justify-center"
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.75 : 1,
          }}
          transition={{ duration: 0.16 }}
        >
          <DotMatrixChevron dotFill="#FFFFFF" className="h-3.5 w-3 translate-x-[0.5px]" />
        </motion.div>

        {/* Rest State: "Page Builder" Text Label with generous, balanced gap */}
        <motion.span
          className="pointer-events-none relative z-10 pr-3 pl-3.5 text-[12px] font-semibold tracking-tight whitespace-nowrap text-zinc-900 transition-colors dark:text-white"
          animate={{
            opacity: isHovered ? 0 : 1,
            x: isHovered ? 12 : 0,
          }}
          transition={{
            duration: 0.18,
            ease: "easeOut",
          }}
        >
          Page Builder
        </motion.span>

        {/* Hover State: 7 Dot-Matrix Chevrons with animated travelling wave (Left-to-Right) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
            <motion.div
              key={idx}
              animate={
                isHovered
                  ? {
                      opacity: [0.3, 1, 0.3],
                      scale: [0.92, 1.08, 0.92],
                    }
                  : { opacity: 0, scale: 0.7 }
              }
              transition={
                isHovered
                  ? {
                      duration: 1.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.1,
                    }
                  : { duration: 0.15 }
              }
              className="flex items-center justify-center"
            >
              <DotMatrixChevron dotFill="#FFFFFF" className="h-3.5 w-3" />
            </motion.div>
          ))}
        </div>
      </motion.button>

      {/* 2. Mobile Compact Icon Button (Visible on screens < 640px) */}
      <motion.button
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        title="Open Page Builder"
        aria-label="Open Page Builder"
        className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-900 shadow-2xs sm:hidden dark:border-white/15 dark:bg-[#131417] dark:text-white"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] shadow-xs shadow-indigo-500/30">
          <DotMatrixChevron dotFill="#FFFFFF" className="h-3 w-2.5" />
        </div>
      </motion.button>
    </div>
  );
};
