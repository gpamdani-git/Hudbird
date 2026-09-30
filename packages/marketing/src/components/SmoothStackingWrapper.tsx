import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SmoothStackingWrapperProps {
  children: React.ReactNode;
  zIndex: number;
}

export function SmoothStackingWrapper({ children, zIndex }: SmoothStackingWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this wrapper leaving the screen
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["end end", "end start"],
  });

  // Use a highly stiff spring.
  // - High stiffness (400) makes it react almost instantly to scroll changes.
  // - High damping (40) prevents any bouncing or lingering momentum.
  // This eliminates the 1-frame JS scroll desync (lag) while avoiding the "auto-scroll" feeling.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // Translate downwards by 100vh to counteract the scroll, making it appear stuck
  const y = useTransform(smoothProgress, [0, 1], ["0vh", "100vh"]);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ zIndex }}>
      <motion.div style={{ y, position: "relative", zIndex: 1 }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
}
