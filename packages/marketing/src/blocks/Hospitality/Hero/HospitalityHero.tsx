import React, { useState, useEffect, useRef } from "react";
import { SmoothStackingWrapper } from "../../../components/SmoothStackingWrapper";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { BlurRevealText } from "../../../components/BlurRevealText/BlurRevealText";

export interface HospitalityHeroProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  logoText?: string;
  subTitle?: string;
  title?: string;
  onBookRoom?: () => void;
  onBookTable?: () => void;
}

export function HospitalityHero({
  backgroundImage = "/assets/hospitality/bali-resort.jpg",
  backgroundVideo = "/assets/hospitality/hero-video.mp4",
  logoText = "SAMSARA UBUD",
  subTitle = "THE SANCTUARY",
  title = "Enchanted Land of Blue and Green",
  onBookRoom,
  onBookTable,
}: HospitalityHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState("ACTIVITIES");
  const heroBlueWrapperRef = useRef<HTMLDivElement>(null);

  // Fullscreen video state
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);

  // Custom cursor for Hero
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

  // Track scroll progress through the first two sections (Hero + Blue BG)
  // Height = 200vh.
  const { scrollYProgress } = useScroll({
    target: heroBlueWrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Title Parallax:
  // At 0% scroll (top of Hero), Y is 0.
  // At 50% scroll (top of Blue BG), Y is driven down so it stays on screen, but moves slightly up.
  // We can just make the title container `sticky top-0 h-screen` which perfectly keeps it in viewport!
  // Then we animate the opacity and Y offset of the text *inside* the sticky container.

  // When scroll is 0 to 0.5 (Hero), title is centered.
  // When scroll is 0.5 to 1.0 (Blue BG), title moves slightly up to make room for description.
  const titleY = useTransform(smoothProgress, [0, 0.4, 0.8], ["0px", "0px", "-140px"]);
  const titleScale = useTransform(smoothProgress, [0, 0.4, 0.8], [1, 1, 0.65]);

  // Opacity of the blue gradient at the bottom of the hero. Fades in as user scrolls.
  // We use scrollYProgress directly (without spring) and make it hit 1 quickly (at 0.15)
  // so it doesn't lag behind the scroll snap and hide the image seam instantly!
  const heroGradientOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  // Description Text no longer needs fade out, because it will be placed normally in the flow and scroll away naturally.
  // It only needs a slight fade IN as you reach it.
  const descOpacity = useTransform(smoothProgress, [0.3, 0.5, 1], [0, 1, 1]);
  const descY = useTransform(smoothProgress, [0.3, 0.5, 1], ["40px", "0px", "0px"]);

  // Map Parallax and Drone Effect
  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mapScroll } = useScroll({
    target: mapRef,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(mapScroll, [0, 1], ["-5%", "5%"]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuLinks = [
    "HOME",
    "THE STORY",
    "THE VILLAS",
    "DINING",
    "SPA",
    "PACKAGES",
    "ACTIVITIES",
    "WEDDING",
    "BLOG",
    "CONTACT US",
  ];

  return (
    <>
      <div className="relative w-full bg-[#111]">
        {/* Navigation Header (Fixed) */}
        <motion.header
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="pointer-events-auto absolute top-0 z-50 flex w-full items-center justify-between px-6 py-8 text-white drop-shadow-md md:px-12"
        >
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group z-50 flex h-8 w-12 flex-col items-start justify-center gap-2 focus:outline-none"
          >
            <span className="block h-[1px] w-8 bg-white transition-all duration-300 group-hover:w-12" />
            <span className="block h-[1px] w-12 bg-white" />
          </button>

          <div className="pointer-events-none absolute top-8 right-0 left-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-xl tracking-[0.2em] text-white md:text-2xl">
              {logoText}
            </h1>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-white uppercase opacity-90">
              {subTitle}
            </p>
          </div>

          <div className="z-50 hidden items-center gap-8 md:flex">
            <button
              onClick={onBookRoom}
              className="text-xs font-medium tracking-[0.15em] text-white uppercase transition-opacity hover:opacity-70"
            >
              BOOK ROOM
            </button>
            <button
              onClick={onBookTable}
              className="text-xs font-medium tracking-[0.15em] text-white uppercase transition-opacity hover:opacity-70"
            >
              BOOK TABLE
            </button>
          </div>
        </motion.header>

        {/* Wrapper for Hero and Blue Background (210vh height total) */}
        <div ref={heroBlueWrapperRef} className="relative w-full">
          {/* The Sticky Title Container (Spans 195vh so it unsticks and scrolls up naturally) */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-30 h-[195vh]">
            <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6">
              <motion.div
                style={{ y: titleY, scale: titleScale }}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                >
                  <h2 className="text-center font-serif text-5xl leading-[1.1] font-light text-white md:text-7xl">
                    Enchanted Land <br />
                    <span className="text-4xl font-light text-white/90 italic md:text-6xl">
                      of
                    </span>{" "}
                    Blue and Green
                  </h2>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Section 1: Hero Image (110vh) - Taller than screen to hide the bottom gradient initially */}
          <section className="relative h-[110vh] w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/2 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[10vh] bg-gradient-to-t from-[#7DB3CF] to-transparent" />

            {/* Animated gradient that fades in to blend into the blue sky seamlessly BEFORE reaching the seam */}
            <motion.div
              style={{
                opacity: heroGradientOpacity,
                background:
                  "linear-gradient(to top, #7DB3CF 0%, #7DB3CF 20%, rgba(125,179,207,0.8) 50%, transparent 100%)",
              }}
              className="pointer-events-none absolute inset-0 z-10"
            />

            <motion.div
              initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative h-full w-full overflow-hidden"
            >
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

          {/* Section 2: Blue Sky Background (100vh) */}
          <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#7DB3CF] px-6 pt-32">
            {/* Description Text that appears in the Blue BG naturally, sits safely below the sticky title */}
            <div className="z-20 mx-auto max-w-4xl space-y-14 text-center text-white/90">
              <div className="flex justify-center pb-4">
                <svg className="h-3 w-3 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </div>

              <p className="font-serif text-lg leading-[1.2] tracking-wide md:text-xl lg:text-[22px]">
                Discover the paradise you've been longing for in Bali.
              </p>

              <p className="font-serif text-lg leading-[1.2] tracking-wide md:text-xl lg:text-[22px]">
                Immerse yourself in a tropical haven where ocean and{" "}
                <br className="hidden md:block" />
                forest converge. Spanning 90 lush hectares, this <br className="hidden md:block" />
                sanctuary is designed to awaken all five senses.
              </p>

              <p className="text-md font-serif leading-[1.2] tracking-wide md:text-xl lg:text-[22px]">
                Overlooking the Jimbaran sea, home to 200 species of{" "}
                <br className="hidden md:block" />
                plants and birds, and offering sunsets that paint the sky in{" "}
                <br className="hidden md:block" />
                radiant hues as you dine—this is the Island of the Gods,{" "}
                <br className="hidden md:block" />
                where harmony and tranquility between people and <br className="hidden md:block" />
                nature flourish.
              </p>

              <p className="font-serif text-lg leading-[1.2] tracking-wide md:text-xl lg:text-[22px]">
                Make this holiday uniquely yours at AYANA Bali.
              </p>
            </div>

            {/* Gradient at the bottom to smoothly blend into the next section's lighter blue sky (#E1F2FB) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#E1F2FB]" />
          </section>
        </div>

        {/* Section 3: Aerial Map (100vh) - Title is no longer sticky here */}
        <section ref={mapRef} className="relative h-screen w-full overflow-hidden bg-[#0a192f]">
          {/* Drone effect wrapper + Parallax */}
          <motion.div style={{ y: mapY }} className="absolute inset-0 -top-[5%] h-[110%] w-full">
            <motion.img
              src="/assets/hospitality/aerial.jpg?v=2"
              alt="Resort Aerial Map"
              className="h-full w-full scale-[1.05] object-cover"
              animate={{
                x: [0, -10, 5, 0],
                y: [0, 5, -5, 0],
                rotate: [0, 0.5, -0.5, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Gradient at the top: Shorter to not clash with the green forest */}
          <div className="absolute inset-0 z-10 h-48 bg-gradient-to-b from-[#E1F2FB] via-[#E1F2FB]/80 to-transparent" />

          {/* Gradient at the bottom to blend from the photo's ocean into the dark navy highlights section */}
          <div className="absolute inset-0 top-1/2 z-10 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/50 to-transparent" />

          {/* Map Markers */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-[40%] left-[55%] flex flex-col items-center">
              <span className="text-[10px] tracking-widest text-white uppercase drop-shadow-md">
                Area 1
              </span>
              <span className="font-serif text-sm tracking-widest text-white drop-shadow-md">
                RESORT
              </span>
              <div className="mt-1 h-8 w-[1px] bg-white/50" />
            </div>
            <div className="absolute top-[35%] left-[45%] flex flex-col items-center">
              <span className="text-[10px] tracking-widest text-white uppercase drop-shadow-md">
                Area 2
              </span>
              <span className="font-serif text-sm tracking-widest text-white drop-shadow-md">
                SEGARA
              </span>
              <div className="mt-1 h-8 w-[1px] bg-white/50" />
            </div>
            <div className="absolute top-[50%] left-[75%] flex flex-col items-center">
              <span className="text-[10px] tracking-widest text-white uppercase drop-shadow-md">
                Area 4
              </span>
              <span className="font-serif text-sm tracking-widest text-white drop-shadow-md">
                VILLAS
              </span>
              <div className="mt-1 h-8 w-[1px] bg-white/50" />
            </div>
          </div>

          {/* Text at the bottom of the map that transitions into Highlights */}
          <div className="absolute right-0 bottom-16 left-0 z-20 flex flex-col items-center text-white">
            <p className="mb-4 text-sm font-light tracking-widest">
              The most holistic resort on the island
            </p>
            <div className="flex items-end gap-2">
              <span className="font-serif text-7xl leading-none md:text-8xl">90</span>
              <span className="mb-2 font-serif text-lg md:text-xl">ha</span>
            </div>
          </div>
        </section>

        {/* Fullscreen Overlay Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ clipPath: "circle(0% at 0% 0%)" }}
              animate={{ clipPath: "circle(150% at 0% 0%)" }}
              exit={{ clipPath: "circle(0% at 0% 0%)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="pointer-events-auto fixed inset-0 z-[60] flex h-full w-full flex-col bg-[#1A1C1D] text-white"
            >
              <header className="flex w-full items-center justify-between px-6 py-8 md:px-12">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative flex h-10 w-10 items-center justify-center focus:outline-none"
                >
                  <span className="absolute h-[1px] w-8 rotate-45 bg-white transition-transform group-hover:rotate-90" />
                  <span className="absolute h-[1px] w-8 -rotate-45 bg-white transition-transform group-hover:rotate-0" />
                </button>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
                  <h1 className="font-serif text-xl tracking-[0.2em] md:text-2xl">{logoText}</h1>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-70">{subTitle}</p>
                </div>
                <div className="hidden items-center gap-8 md:flex">
                  <button className="text-xs font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-70">
                    BOOK ROOM
                  </button>
                  <button className="text-xs font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-70">
                    BOOK TABLE
                  </button>
                </div>
              </header>

              <div className="relative flex flex-1 items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredMenu}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[15vw] leading-none whitespace-nowrap text-white/5"
                  >
                    {hoveredMenu}
                  </motion.div>
                </AnimatePresence>

                <nav className="relative z-10 flex flex-col items-center gap-6">
                  {menuLinks.map((link, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      onMouseEnter={() => setHoveredMenu(link)}
                      onMouseLeave={() => setHoveredMenu("ACTIVITIES")}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
                      className="group relative text-base font-medium tracking-[0.2em] uppercase transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-150 hover:text-[#C5A880]"
                    >
                      {link}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
      </div>
    </>
  );
}
