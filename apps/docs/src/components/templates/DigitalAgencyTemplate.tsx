import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

import logoBlack from "../../assets/dastudio-logo/black-logo.png";
import logoWhite from "../../assets/dastudio-logo/white-logo.png";
import {
  CustomCursor,
  AgencyHero,
  AgencyAbout,
  AgencyProjects,
  AgencyServices,
  AgencyExperiences,
  AgencyCta,
  AgencyFooter,
} from "@hudbird/marketing";

export function DigitalAgencyTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      image: "/assets/templates/ai-startup.webp",
      images: ["/assets/templates/ai-startup-full.webp"],
    },
    {
      name: "SaaS Template",
      category: "B2B Dashboard",
      overview:
        "Modern B2B SaaS template website landing page featuring a clean white background, dashboard analytics charts, blue and purple accents, and a corporate professional UI design.",
      year: "2026",
      client: "Insightly",
      scope: ["Product Design", "Frontend Dev"],
      image: "/assets/templates/saas-launchpad.webp",
      images: ["/assets/templates/saas-launchpad-full.webp"],
    },
    {
      name: "Modern Template",
      category: "Editorial Portfolio",
      overview:
        "Minimalist modern website template with an editorial style, large typography, expansive whitespace, and brutalist design elements tailored for high-end fashion or architecture portfolios.",
      year: "2026",
      client: "Studio Nouveau",
      scope: ["Art Direction", "UI/UX Design"],
      image: "/assets/templates/modern-app.webp",
      images: ["/assets/templates/modern-app-full.webp"],
    },
    {
      name: "Agency Template",
      category: "Digital Agency",
      overview:
        "Creative digital agency website template featuring bold typography, a dark cinematic theme, interactive 3D elements, and an award-winning portfolio grid layout.",
      year: "2026",
      client: "DAStudio",
      scope: ["Web Design", "Motion Design"],
      image: "/assets/templates/digital-agency.webp",
      images: ["/assets/templates/digital-agency-full.webp"],
    },
  ];

  const activeIndex = activeProject ? projects.findIndex((p) => p.name === activeProject.name) : -1;
  const nextProject = activeIndex >= 0 ? projects[(activeIndex + 1) % projects.length] : null;

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
            <AgencyHero containerRef={containerRef} />

            <div ref={setLightSectionRef}>
              <AgencyAbout />
              <AgencyProjects projects={projects} setActiveProject={setActiveProject} />
            </div>

            <AgencyServices />
            <AgencyExperiences />
            <AgencyCta />
            <AgencyFooter />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
