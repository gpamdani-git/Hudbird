import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useMotionTemplate,
} from "framer-motion";

export function HospitalityFooterHero({
  backgroundImage = "/assets/hospitality/bali-resort.webp",
  backgroundVideo = "/assets/hospitality/hero-video.mp4",
}: {
  backgroundImage?: string;
  backgroundVideo?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  const heroCursorX = useMotionValue(-100);
  const heroCursorY = useMotionValue(-100);
  const heroCursorSpringX = useSpring(heroCursorX, { damping: 25, stiffness: 200, mass: 0.5 });
  const heroCursorSpringY = useSpring(heroCursorY, { damping: 25, stiffness: 200, mass: 0.5 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    heroCursorX.set(e.clientX - rect.left);
    heroCursorY.set(e.clientY - rect.top);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Liquid CSS Mask Physics
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 50, stiffness: 200, mass: 1 });
  const scrollVelocity = useVelocity(smoothScrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 80, mass: 1 });

  const curveControlPoint = useTransform(smoothVelocity, [-1500, -50, 50, 1500], [0, 50, 50, 100]);

  const svgMaskTop = useMotionTemplate`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,100 L100,100 L100,50 Q50,${curveControlPoint} 0,50 Z' fill='black'/%3E%3C/svg%3E")`;

  const liquidMaskTopStyle = {
    WebkitMaskImage: useMotionTemplate`${svgMaskTop}, linear-gradient(black, black)`,
    WebkitMaskSize: "100% 8vw, 100% calc(100% - 8vw + 2px)",
    WebkitMaskPosition: "top left, bottom left",
    WebkitMaskRepeat: "no-repeat, no-repeat",
    maskImage: useMotionTemplate`${svgMaskTop}, linear-gradient(black, black)`,
    maskSize: "100% 8vw, 100% calc(100% - 8vw + 2px)",
    maskPosition: "top left, bottom left",
    maskRepeat: "no-repeat, no-repeat",
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ ...liquidMaskTopStyle, zIndex: 20 }}
      className="relative mt-[-8vw] w-full overflow-hidden bg-[#F5F3E7]"
    >
      <section className="relative h-[80vh] w-full overflow-hidden md:h-screen">
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />

        <motion.div style={{ y: videoY }} className="absolute -top-[20%] left-0 h-[140%] w-full">
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            poster={backgroundImage}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        {/* Interaction Layer */}
        <div
          className="absolute inset-0 z-20 cursor-none"
          onMouseMove={handleHeroMouseMove}
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
          onClick={() => setIsFullscreenVideo(true)}
        />

        {/* Custom Play Cursor */}
        <motion.div
          style={{
            x: heroCursorSpringX,
            y: heroCursorSpringY,
            opacity: isHoveringHero ? 1 : 0,
            pointerEvents: "none",
          }}
          className="absolute top-0 left-0 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[0.5px] border-white/60 bg-transparent transition-transform duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
              <path d="M6 4l14 8-14 8V4z" />
            </svg>
          </div>
          <div className="mt-3 h-[1.5px] w-6 bg-white/90" />
          <span className="mt-1 font-serif text-[15px] tracking-widest whitespace-nowrap text-white drop-shadow-md">
            Play Movie
          </span>
        </motion.div>
      </section>

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {isFullscreenVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex cursor-none items-center justify-center bg-black"
            onMouseMove={handleHeroMouseMove}
            onClick={() => setIsFullscreenVideo(false)}
          >
            <video
              src={backgroundVideo}
              autoPlay
              loop
              playsInline
              className="pointer-events-none h-full w-full object-cover"
            />
            {/* Custom Close Cursor */}
            <motion.div
              style={{
                x: heroCursorSpringX,
                y: heroCursorSpringY,
                pointerEvents: "none",
              }}
              className="absolute top-0 left-0 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-[0.5px] border-white/60 bg-transparent transition-transform duration-300">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="mt-3 h-[1.5px] w-6 bg-white/90" />
              <span className="mt-1 font-serif text-[15px] tracking-widest whitespace-nowrap text-white drop-shadow-md">
                Close
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
