import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface MagneticProps {
  children: React.ReactElement;
  /**
   * The strength of the magnetic pull. Higher values mean the component
   * will move further towards the cursor. Default is 0.2 (20% pull).
   */
  strength?: number;
  /**
   * The strength of the magnetic pull for the inner content (parallax effect).
   * Default is 0.1.
   */
  innerStrength?: number;
}

export const Magnetic = ({ children, strength = 0.2, innerStrength = 0.1 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Use motion values to bypass React re-renders completely!
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics directly to the motion values
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const innerSpringX = useSpring(useMotionValue(0), springConfig);
  const innerSpringY = useSpring(useMotionValue(0), springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();
    if (boundingRect) {
      const { width, height, top, left } = boundingRect;
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);

      x.set(middleX * strength);
      y.set(middleY * strength);
      innerSpringX.set(middleX * innerStrength);
      innerSpringY.set(middleY * innerStrength);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    innerSpringX.set(0);
    innerSpringY.set(0);
  };

  return (
    <motion.div
      style={{ position: "relative", display: "inline-block", x: springX, y: springY }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <motion.div style={{ x: innerSpringX, y: innerSpringY }}>{children}</motion.div>
    </motion.div>
  );
};
