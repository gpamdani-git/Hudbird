import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

import logoBlack from "../../assets/dastudio-logo/black-logo.png";
import logoWhite from "../../assets/dastudio-logo/white-logo.png";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<"default" | "button" | "text" | "view-works">(
    "default"
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        setHoverState(cursorTarget.getAttribute("data-cursor") as any);
        return;
      }

      if (target.closest("a") || target.closest("button") || target.closest(".cursor-pointer")) {
        setHoverState("button");
      } else if (
        ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"].some(
          (tag) => target.tagName.toLowerCase() === tag && target.innerText.length > 0
        )
      ) {
        setHoverState("text");
      } else {
        setHoverState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[99999] flex items-center justify-center rounded-full mix-blend-difference ease-out ${
        hoverState === "button" ? "h-12 w-12 border-transparent bg-white" : ""
      } ${hoverState === "text" ? "h-24 w-24 border-transparent bg-white" : ""} ${
        hoverState === "view-works" ? "h-28 w-28 border-transparent bg-white text-black" : ""
      } ${
        hoverState === "default" ? "h-8 w-8 border border-white opacity-70 backdrop-invert" : ""
      } `}
      style={{
        transitionProperty: "width, height, background-color, border-color, opacity",
        transitionDuration: "300ms",
      }}
    >
      <AnimatePresence>
        {hoverState === "view-works" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center text-[10px] font-bold tracking-widest uppercase"
          >
            View
            <br />
            Works
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

const BlurRevealText = ({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
        hidden: {},
      }}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          {word === "\n" ? (
            <br />
          ) : (
            <motion.span
              variants={{
                hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export function DigitalAgencyTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isSeeking = useRef(false);
  const targetTime = useRef(0);
  const prevX = useRef(0);

  const [isLightSectionInView, setIsLightSectionInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setLightSectionRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsLightSectionInView(entry.isIntersecting);
        },
        { rootMargin: "-20% 0px -20% 0px" }
      );
      observerRef.current.observe(node);
    }
  }, []);

  const sidebarTheme = activeProject || isLightSectionInView ? "light" : "dark";
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
      // Default to 1080p if connection API is not supported (desktop usually)
      setVideoSrc("/assets/hero-video/animate_hero_agency1080p.mp4");
    }
  }, []);

  // Video Auto-play & Scrubbing Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Default to looping for auto-play
    video.loop = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (isNaN(video.duration)) return;

      const currentX = e.clientX;
      if (prevX.current === 0) {
        prevX.current = currentX;
        return;
      }

      const delta = currentX - prevX.current;

      // Require a minimum movement of 5px to switch from auto-play to scrubbing
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

  // Scroll to top when opening a project
  useEffect(() => {
    if (activeProject) {
      window.scrollTo(0, 0);
    }
  }, [activeProject]);

  const projects = [
    {
      name: "AI Startup",
      category: "SaaS Dashboard",
      overview:
        "A sleek and futuristic AI startup website landing page mockup with dark mode, glowing neon accents, 3D abstract shapes, and a professional SaaS dashboard UI.",
      year: "2026",
      client: "Neuralyx",
      scope: ["Web Design", "Framer Developer"],
      image: "/assets/templates/ai-startup.png",
      images: ["/assets/templates/ai-startup-full.png"],
    },
    {
      name: "SaaS Template",
      category: "B2B Dashboard",
      overview:
        "Modern B2B SaaS template website landing page featuring a clean white background, dashboard analytics charts, blue and purple accents, and a corporate professional UI design.",
      year: "2026",
      client: "Insightly",
      scope: ["Product Design", "Frontend Dev"],
      image: "/assets/templates/saas-launchpad.png",
      images: ["/assets/templates/saas-launchpad-full.png"],
    },
    {
      name: "Modern Template",
      category: "Editorial Portfolio",
      overview:
        "Minimalist modern website template with an editorial style, large typography, expansive whitespace, and brutalist design elements tailored for high-end fashion or architecture portfolios.",
      year: "2026",
      client: "Studio Nouveau",
      scope: ["Art Direction", "UI/UX Design"],
      image: "/assets/templates/modern-app.png",
      images: ["/assets/templates/modern-app-full.png"],
    },
    {
      name: "Agency Template",
      category: "Digital Agency",
      overview:
        "Creative digital agency website template featuring bold typography, a dark cinematic theme, interactive 3D elements, and an award-winning portfolio grid layout.",
      year: "2026",
      client: "DAStudio",
      scope: ["Web Design", "Motion Design"],
      image: "/assets/templates/digital-agency.png",
      images: ["/assets/templates/digital-agency-full.png"],
    },
  ];

  const activeIndex = activeProject ? projects.findIndex((p) => p.name === activeProject.name) : -1;
  const nextProject = activeIndex >= 0 ? projects[(activeIndex + 1) % projects.length] : null;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen cursor-none bg-[#282623] font-sans text-[#F4F2ED] selection:bg-[#F4F2ED] selection:text-[#282623]"
    >
      <CustomCursor />

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px #F4F2ED;
        }
      `}</style>

      {/* Mobile Hamburger Menu Toggle */}
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="group fixed top-6 right-6 z-[120] flex cursor-pointer flex-col items-center gap-[6px] md:hidden"
      >
        <motion.div
          animate={{
            backgroundColor: isMenuOpen
              ? "#F4F2ED"
              : sidebarTheme === "light"
                ? "#282623"
                : "#F4F2ED",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`h-[2px] w-8 origin-center transition-transform duration-300 ${isMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}
        />
        <motion.div
          animate={{
            backgroundColor: isMenuOpen
              ? "#F4F2ED"
              : sidebarTheme === "light"
                ? "#282623"
                : "#F4F2ED",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`h-[2px] w-8 origin-center transition-transform duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
        />
        <motion.div
          animate={{
            backgroundColor: isMenuOpen
              ? "#F4F2ED"
              : sidebarTheme === "light"
                ? "#282623"
                : "#F4F2ED",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`h-[2px] w-8 origin-center transition-transform duration-300 ${isMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
        />
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-[#282623]/95 px-6 pl-24 text-[#F4F2ED] md:px-12 md:pl-32 lg:px-32"
          >
            <nav className="flex flex-col gap-6 md:gap-8">
              {["Home", "Work", "Services", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.1 }}
                  className="font-serif text-5xl tracking-tight transition-all hover:text-[#8E8A83] hover:italic md:text-8xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Sidebar */}
      <motion.aside
        animate={{
          color: sidebarTheme === "light" ? "#282623" : "#F4F2ED",
          borderRightColor:
            sidebarTheme === "light" ? "rgba(61,57,53,0.2)" : "rgba(142,138,131,0.3)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="pointer-events-none fixed top-0 bottom-0 left-0 z-[100] flex w-16 flex-col items-center justify-between border-r pt-32 pb-8 md:w-20"
      >
        {/* Sticky Logo */}
        <button
          className="pointer-events-auto absolute top-6 flex w-8 cursor-pointer items-center justify-center transition-transform hover:scale-110 md:top-8 md:w-10"
          onClick={() => {
            setActiveProject(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={sidebarTheme === "light" ? logoBlack : logoWhite}
            alt="DAStudio"
            className="w-full object-contain"
          />
        </button>

        <div className="vertical-text text-xs font-medium tracking-widest opacity-60">
          FOLIO — EDITION
        </div>
        <div className="vertical-text font-serif text-sm tracking-widest">DAStudio™</div>

        {/* Menu Text Button (Desktop) */}
        <button
          className="md:vertical-text pointer-events-auto hidden cursor-pointer text-xs font-bold tracking-widest uppercase opacity-70 transition-opacity hover:opacity-100 md:block"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeProject ? (
          <motion.main
            key="detail"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0 flex min-h-screen w-full flex-col bg-[#F4F2ED] pl-16 text-[#282623] md:flex-row md:pl-20"
          >
            {/* Detail View Left side */}
            <div className="flex w-full shrink-0 flex-col self-start p-8 md:sticky md:top-0 md:h-screen md:w-1/2 md:p-16">
              <button
                onClick={() => setActiveProject(null)}
                className="mb-12 flex w-max items-center gap-2 text-sm hover:italic"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </button>

              <h1 className="mb-16 font-serif text-5xl tracking-tighter uppercase md:mb-24 md:text-7xl">
                {activeProject.name}
              </h1>

              <div className="flex max-w-lg flex-col gap-12 pb-12">
                {/* Overview */}
                <div className="flex flex-col gap-4 md:flex-row md:gap-12">
                  <div className="w-24 shrink-0 text-xs font-medium tracking-widest text-[#8E8A83] uppercase">
                    Overview
                  </div>
                  <div className="text-sm leading-relaxed">{activeProject.overview}</div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4 md:flex-row md:gap-12">
                  <div className="w-24 shrink-0 pt-4 text-xs font-medium tracking-widest text-[#8E8A83] uppercase">
                    Details
                  </div>
                  <div className="flex flex-1 flex-col border-t border-[#3D3935]/20 text-sm">
                    <div className="flex justify-between border-b border-[#3D3935]/20 py-4">
                      <span className="text-[#8E8A83]">Client</span>
                      <span className="font-medium">{activeProject.client}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#3D3935]/20 py-4">
                      <span className="text-[#8E8A83]">Year</span>
                      <span className="font-medium">{activeProject.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#3D3935]/20 py-4">
                      <span className="text-[#8E8A83]">Preview</span>
                      <a href="#" className="flex items-center gap-2 font-medium hover:italic">
                        See It Live &rarr;
                      </a>
                    </div>
                    <div className="flex justify-between py-4">
                      <span className="text-[#8E8A83]">Scope</span>
                      <div className="flex flex-col gap-1 text-right font-medium">
                        {activeProject.scope?.map((s: string) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Projects */}
                <div className="mt-12 flex flex-col gap-4 md:mt-16 md:flex-row md:gap-12">
                  <div className="w-24 shrink-0 pt-2 text-xs font-medium tracking-widest text-[#8E8A83] uppercase">
                    Next Projects
                  </div>
                  <div
                    className="cursor-pointer font-serif text-3xl transition-all hover:italic md:text-4xl"
                    onClick={() => setActiveProject(nextProject)}
                  >
                    {nextProject?.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Detail View Right side (Scrollable Full Image) */}
            <div className="relative flex w-full flex-col gap-0 bg-[#1F1D1B] md:w-1/2">
              {activeProject.images?.map((imgSrc: string, idx: number) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`${activeProject.name} detail ${idx + 1}`}
                  className="h-auto w-full object-cover"
                />
              ))}
            </div>
          </motion.main>
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-0"
          >
            {/* HERO SECTION */}
            <section
              ref={heroRef}
              className="relative flex min-h-screen flex-col justify-between overflow-hidden border-b border-[#3D3935] bg-black pt-32 pr-6 pb-8 pl-[88px] md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
            >
              {/* Background Video */}
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

              {/* A slight gradient overlay for text readability without blurring the video */}
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

            <div ref={setLightSectionRef}>
              {/* CHAPTER I: QUICK INTRO */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-screen flex-col border-b border-[#3D3935] bg-[#F4F2ED] py-24 pr-6 pl-[88px] text-[#282623] md:py-40 md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
              >
                <div className="mb-24 flex items-start justify-between font-serif">
                  <BlurRevealText
                    text="CHAPTER I"
                    className="text-3xl tracking-tight md:text-5xl"
                  />
                  <BlurRevealText
                    text="Quick Intro"
                    className="font-sans text-xs font-bold tracking-widest uppercase"
                  />
                </div>

                <div className="mx-auto flex max-w-5xl flex-1 flex-col justify-center">
                  <BlurRevealText
                    text="Hi, I'm Dani — a designer with 10+ years of experience in digital products, websites, and visual systems, creating clear and thoughtful experiences."
                    className="font-sans text-4xl leading-[1.1] font-medium tracking-tight md:text-6xl lg:text-7xl"
                  />
                </div>

                <div className="mt-32 grid grid-cols-1 items-end gap-12 md:grid-cols-2">
                  <div className="space-y-12">
                    <BlurRevealText
                      text={'"Work for money. \n Design for love."'}
                      className="text-xs font-medium tracking-widest text-[#8E8A83] uppercase"
                    />
                    <BlurRevealText
                      text="Beyond design: football, watches, aquariums, and martial arts."
                      className="max-w-sm text-sm font-medium text-[#282623] md:text-base"
                    />
                  </div>

                  <div className="flex flex-col items-end justify-between gap-8 sm:flex-row sm:items-center md:justify-end">
                    <button className="flex items-center gap-4 text-2xl font-medium tracking-tight transition-all hover:italic md:text-3xl">
                      More about me
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="rotate-0"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="h-64 w-48 overflow-hidden bg-zinc-300 grayscale transition-all duration-500 hover:grayscale-0 md:h-80 md:w-64">
                      <img
                        src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1500&auto=format&fit=crop"
                        alt="Khanh Portrait"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* CHAPTER II: THE WORK */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-[#3D3935] bg-[#F4F2ED] py-24 pr-6 pl-[88px] text-[#282623] md:py-40 md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <h2 className="font-serif text-[18vw] leading-none tracking-tighter whitespace-nowrap text-[#282623] opacity-10">
                    THE WORK
                  </h2>
                </motion.div>

                <div className="relative z-10 mx-auto w-full max-w-5xl">
                  <div className="mb-16 flex items-end justify-between">
                    <BlurRevealText
                      text="THE WORK"
                      className="font-serif text-5xl tracking-tighter md:text-7xl"
                    />
                    <BlurRevealText
                      text="❋ Live site unavailable for some inactive or incomplete projects"
                      className="hidden max-w-xs text-right text-xs font-medium tracking-wider text-[#8E8A83] uppercase sm:block"
                      delay={0.2}
                    />
                  </div>

                  <div className="flex w-full flex-col border-t border-[#3D3935]/20">
                    {projects.map((project, i) => (
                      <motion.div
                        key={i}
                        data-cursor="view-works"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setActiveProject(project)}
                        className="group relative -mx-6 flex cursor-pointer items-center justify-between border-b border-[#3D3935]/20 px-6 py-8 transition-colors duration-300 hover:bg-[#0A0A0A] hover:text-[#F4F2ED] md:-mx-12 md:px-12 md:py-12"
                      >
                        <h4 className="font-serif text-4xl tracking-tight transition-all duration-300 group-hover:italic md:text-6xl">
                          {project.name}
                        </h4>
                        <span className="text-sm font-medium tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {project.category}
                        </span>

                        {/* Hover Image Reveal */}
                        <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 aspect-video w-[300px] -translate-x-1/2 -translate-y-1/2 scale-90 overflow-hidden bg-zinc-200 opacity-0 shadow-2xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                          <img
                            src={project.image}
                            className="h-full w-full object-cover"
                            alt={project.name}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>

            {/* CHAPTER III: SERVICES */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen border-b border-[#3D3935] bg-[#1F1D1B] py-24 pr-6 pl-[88px] text-[#F4F2ED] md:py-40 md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
            >
              <div className="mx-auto max-w-6xl">
                <BlurRevealText
                  text="Designing digital experiences with clarity, structure, and intention."
                  className="mb-6 font-serif text-2xl md:text-4xl"
                />
                <div className="mb-20 h-[1px] w-full bg-[#3D3935]" />

                <div className="grid grid-cols-1 gap-12 gap-y-16 md:grid-cols-2 md:gap-x-24">
                  {[
                    {
                      num: "01",
                      title: "PRODUCT DESIGN",
                      desc: "End-to-end product design from user research and wireframing to high-fidelity prototyping and design system creation.",
                    },
                    {
                      num: "02",
                      title: "DIGITAL EXPERIENCES",
                      desc: "Crafting immersive, interactive, and memorable web experiences that push the boundaries of conventional design.",
                    },
                    {
                      num: "03",
                      title: "ART DIRECTION",
                      desc: "Guiding the visual language and aesthetic vision of brands across digital touchpoints to ensure consistency and impact.",
                    },
                    {
                      num: "04",
                      title: "DEVELOPMENT",
                      desc: "Translating design into pixel-perfect, performant, and accessible front-end code using modern web technologies.",
                    },
                  ].map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col"
                    >
                      <BlurRevealText
                        text={`${service.num} / ${service.title}`}
                        className="mb-4 text-xs tracking-widest text-[#8E8A83]"
                      />
                      <BlurRevealText
                        text={service.title}
                        className="mb-6 font-serif text-3xl tracking-tight md:text-4xl"
                        delay={0.1}
                      />
                      <BlurRevealText
                        text={service.desc}
                        className="text-sm leading-relaxed text-[#8E8A83] md:text-base"
                        delay={0.2}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* CHAPTER IV: EXPERIENCES */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-[#3D3935] bg-[#282623] py-24 pr-6 pl-[88px] text-[#F4F2ED] md:py-40 md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
            >
              <div className="mx-auto max-w-5xl">
                <BlurRevealText
                  text="Work spanning brands, products, and digital teams."
                  className="mb-16 text-xs tracking-widest text-[#8E8A83] uppercase"
                />

                <div className="text-outline flex cursor-default flex-wrap gap-x-8 gap-y-4 font-serif text-3xl tracking-tight md:text-5xl lg:text-7xl">
                  {["Trusting Social", "Baliworks", "Autonomous", "VEN Agency", "Glass Egg"].map(
                    (client, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="transition-colors duration-300 hover:text-[#F4F2ED]"
                        style={{ WebkitTextStroke: "1px #F4F2ED", color: "transparent" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
                          e.currentTarget.style.color = "#F4F2ED";
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => {
                          e.currentTarget.style.color = "transparent";
                        }}
                      >
                        {client}
                        {i !== 4 && <span className="opacity-30">,</span>}
                      </motion.span>
                    )
                  )}
                </div>
              </div>
            </motion.section>

            {/* CTA SECTION */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black py-8 pr-6 pl-[88px] text-[#F4F2ED] md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
            >
              {/* Top corner texts */}
              <div className="z-10 flex w-full justify-between text-[10px] tracking-widest text-[#8E8A83] uppercase">
                <BlurRevealText text="SINCE 2016" />
                <BlurRevealText text="BRANDING & CONTENT" delay={0.2} />
              </div>

              {/* Center Content */}
              <div className="relative my-20 flex w-full flex-1 flex-col items-center justify-center">
                {/* Abstract Looping Illustration */}
                <div className="absolute top-1/2 left-1/2 z-0 flex aspect-square w-[350px] -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-100 md:w-[450px] lg:w-[500px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full w-full"
                    style={{ perspective: "1000px" }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{ transform: `rotateX(65deg) rotateY(${i * 45}deg)` }}
                      >
                        <motion.div
                          className={`h-full w-full rounded-full border-[1px] ${i === 0 ? "border-[#FF5A00]/70" : "border-[#F4F2ED]/40"}`}
                          animate={{ rotateZ: 360 }}
                          transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>
                    ))}

                    {/* Subtle inner rotating dashed ring */}
                    <motion.div
                      className="absolute inset-16 rounded-full border-[1px] border-dashed border-[#F4F2ED]/30"
                      animate={{ rotateZ: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Center glowing orange core */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A00] blur-[70px]"
                    />
                  </motion.div>
                </div>

                {/* Big Text */}
                <BlurRevealText
                  text="Great Work Starts Here"
                  className="pointer-events-none relative z-10 text-center font-serif text-[15vw] leading-none tracking-tight text-white drop-shadow-2xl md:text-[12vw]"
                />

                {/* Button */}
                <div className="relative z-10 mt-20 md:mt-32">
                  <button className="border border-[#F4F2ED] bg-black px-8 py-4 text-xs font-bold tracking-widest text-[#F4F2ED] uppercase transition-colors hover:bg-[#F4F2ED] hover:text-black">
                    START A PROJECT
                  </button>
                </div>
              </div>

              {/* Bottom corner texts */}
              <div className="z-10 flex w-full items-end justify-between text-[10px] tracking-widest text-[#8E8A83] uppercase">
                <BlurRevealText text="50+ BRANDS SHAPED" className="w-24 md:w-auto" />

                {/* Center Hamburger Icon (decorative/scroll to top) */}
                <div
                  className="hidden cursor-pointer border border-[#3D3935] p-4 transition-colors hover:border-[#F4F2ED] md:flex"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="flex h-3 w-5 flex-col justify-between">
                    <div className="h-[1px] w-full bg-[#8E8A83]"></div>
                    <div className="h-[1px] w-full bg-[#8E8A83]"></div>
                  </div>
                </div>

                <BlurRevealText
                  text="BASED IN BALI"
                  className="w-24 text-right md:w-auto md:text-left"
                  delay={0.2}
                />
              </div>
            </motion.section>

            {/* FOOTER */}
            <motion.footer
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden bg-[#0A0A0A] pt-32 pr-6 pb-6 pl-[88px] md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
            >
              {/* Dark vertical banding background */}
              <div className="pointer-events-none absolute inset-0 z-0 flex w-full justify-evenly opacity-20">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div key={i} className="h-full w-[1px] bg-[#3D3935]" />
                ))}
              </div>

              {/* Glowing Red Top Effect */}
              <div className="pointer-events-none absolute -top-[300px] left-1/2 z-0 h-[600px] w-full max-w-[1200px] -translate-x-1/2 rounded-full bg-red-600/15 blur-[120px]"></div>

              <div className="relative z-10 flex w-full flex-col justify-between gap-16 pb-24 md:flex-row md:items-start md:pb-32">
                {/* Left Column */}
                <div className="flex max-w-xl flex-col">
                  <BlurRevealText
                    text="Ready to bring your vision to life? Subscribe to our newsletter for weekly insights."
                    className="mb-12 font-serif text-3xl leading-tight tracking-tight text-[#F4F2ED]/90 md:text-4xl lg:text-5xl"
                  />

                  <div className="flex max-w-md items-center border-b border-[#3D3935] pb-2">
                    <input
                      type="email"
                      placeholder="name@email.com"
                      className="flex-1 bg-transparent text-sm text-[#F4F2ED] placeholder-[#8E8A83] outline-none"
                    />
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#FF5A00]/90">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col items-start gap-16 md:items-end">
                  <nav className="flex flex-col items-start gap-3 font-serif text-lg text-[#F4F2ED] md:items-end md:text-xl">
                    <a href="#" className="transition-colors hover:text-[#8E8A83]">
                      Home
                    </a>
                    <a href="#" className="transition-colors hover:text-[#8E8A83]">
                      About
                    </a>
                    <a href="#" className="transition-colors hover:text-[#8E8A83]">
                      Works
                    </a>
                    <a href="#" className="transition-colors hover:text-[#8E8A83]">
                      Services
                    </a>
                    <a href="#" className="transition-colors hover:text-[#8E8A83]">
                      Contact
                    </a>
                  </nav>

                  <div className="text-left text-xs tracking-wide text-[#8E8A83] md:text-right">
                    <p>Designed by DAStudio.</p>
                    <p>All Rights Reserved.</p>
                  </div>
                </div>
              </div>

              {/* Huge Bottom Text */}
              <div className="relative z-10 mt-auto w-full overflow-hidden text-center md:-ml-8 lg:-ml-10">
                <h1 className="font-serif text-[14vw] leading-[0.75] tracking-tighter whitespace-nowrap text-[#F4F2ED] uppercase">
                  DASTUDIO
                </h1>
              </div>
            </motion.footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
