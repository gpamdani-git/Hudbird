import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function AgencyHero({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isSeeking = useRef(false);
  const targetTime = useRef(0);
  const prevX = useRef(0);
  const hasUserInteracted = useRef(false);

  const [videoSrc, setVideoSrc] = useState("/assets/hero-video/animate_hero_agency720p.mp4");

  useEffect(() => {
    // Basic network speed check
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
    if (connection) {
      if (connection.effectiveType === "4g") {
        setVideoSrc("/assets/hero-video/animate_hero_agency1080p.mp4");
      } else {
        setVideoSrc("/assets/hero-video/animate_hero_agency720p.mp4");
      }
    } else {
      setVideoSrc("/assets/hero-video/animate_hero_agency1080p.mp4");
    }
  }, []);

  // Video Auto-play & Scrubbing Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (isNaN(video.duration)) return;

      const currentX = e.clientX;
      if (prevX.current === 0) {
        prevX.current = currentX;
        return;
      }

      const delta = currentX - prevX.current;

      if (!hasUserInteracted.current && Math.abs(delta) > 5) {
        hasUserInteracted.current = true;
        video.pause();
        targetTime.current = video.currentTime;
      }

      prevX.current = currentX;

      if (!hasUserInteracted.current) return;

      const SENSITIVITY = 0.8;
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;

      let newTime = targetTime.current + offset;
      newTime = Math.max(0, Math.min(newTime, video.duration));
      targetTime.current = newTime;

      if (!isSeeking.current) {
        isSeeking.current = true;
        video.currentTime = targetTime.current;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTime.current) > 0.05) {
      video.currentTime = targetTime.current;
    } else {
      isSeeking.current = false;
    }
  };

  const isHeroInView = useInView(heroRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasUserInteracted.current) return;

    if (isHeroInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHeroInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden border-b border-[#3D3935] bg-black pt-32 pr-6 pb-8 pl-[88px] md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
      />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <motion.div
        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-16 right-6 z-10 hidden max-w-[300px] text-lg leading-snug text-[#F4F2ED] md:right-12 md:block"
      >
        Independent designer based in Bali — focused on thoughtful, considered digital work.
      </motion.div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mt-12 flex flex-1 flex-col justify-center md:mt-0"
      >
        <h1 className="flex flex-col font-serif text-[13vw] leading-[0.85] tracking-tight text-[#F4F2ED] uppercase">
          <span className="block overflow-hidden pb-4">
            <motion.span
              initial={{ y: "100%", skewY: 4, filter: "blur(20px)" }}
              animate={{ y: 0, skewY: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block origin-bottom-left"
            >
              DASTUDIO
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-4">
            <motion.span
              initial={{ y: "100%", skewY: 4, filter: "blur(20px)" }}
              animate={{ y: 0, skewY: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="block origin-bottom-left"
            >
              AGENCY
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-8 flex items-end justify-between text-xs tracking-widest text-[#8E8A83] md:text-sm"
      >
        <div className="uppercase">
          Canggu, Bali
          <br />
          (GMT+7) 09:29
        </div>
        <div className="hidden uppercase sm:block">
          Open for
          <br />
          collaborations
        </div>
        <div className="pr-4 font-serif text-2xl text-[#F4F2ED] normal-case italic md:text-3xl">
          Scroll
        </div>
      </motion.div>
    </section>
  );
}
