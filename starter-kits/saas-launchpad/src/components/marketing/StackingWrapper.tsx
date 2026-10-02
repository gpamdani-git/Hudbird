import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackingWrapperProps {
  children: React.ReactNode;
  zIndex: number;
}

export function StackingWrapper({ children, zIndex }: StackingWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Track when the bottom of this wrapper leaves the bottom of the viewport
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["end end", "end start"],
  });

  // As the user scrolls past the bottom of the section,
  // translate the inner content downwards at the EXACT speed of the scroll
  // so it appears perfectly stuck to the screen.
  // "end bottom" to "end top" is exactly 100vh of scrolling.
  // So we translate Y from 0 to 100vh.
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ zIndex }}>
      <motion.div style={{ y }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
}
