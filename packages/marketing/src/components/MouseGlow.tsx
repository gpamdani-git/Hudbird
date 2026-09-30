import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface MouseGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const MouseGlow = ({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.05)",
}: MouseGlowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Use motion values for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for smooth tracking
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, ${glowColor}, transparent 40%)`;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
