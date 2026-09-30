import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useVelocity,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "framer-motion";

const SLOT_1 = [
  "/assets/hospitality/ayana_farm.webp",
  "/assets/hospitality/aerial.webp",
  "/assets/hospitality/aquatonic_pool.webp",
];

const SLOT_2 = [
  "/assets/hospitality/balinese_massage.webp",
  "/assets/hospitality/sami_sami_pizza.webp",
  "/assets/hospitality/ayana_kids_pool.webp",
];

const SLOT_3 = [
  "/assets/hospitality/putting_golf.webp",
  "/assets/hospitality/kubu_beach.webp",
  "/assets/hospitality/flower_bath.webp",
];

const SLOT_4 = [
  "/assets/hospitality/romantic_dinner.webp",
  "/assets/hospitality/luxury_pool_villa.webp",
  "/assets/hospitality/kids_club.webp",
];

const POSITIONS = [
  "top-[10%] left-[5%] md:left-[15%] w-[45vw] h-[30vh] md:w-80 md:h-60", // Top Left
  "bottom-[15%] left-[2%] md:left-[10%] w-[50vw] h-[35vh] md:w-[28rem] md:h-72", // Bottom Left
  "top-[5%] right-[2%] md:right-[15%] w-[40vw] h-[25vh] md:w-72 md:h-56", // Top Right
  "bottom-[10%] right-[5%] md:right-[10%] w-[45vw] h-[30vh] md:w-80 md:h-60", // Bottom Right
];

const SLOTS = [SLOT_1, SLOT_2, SLOT_3, SLOT_4];

export function HospitalityCuratedJourneys() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Liquid CSS Mask Physics
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 50, stiffness: 200, mass: 1 });
  const scrollVelocity = useVelocity(smoothScrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 80, mass: 1 });

  const curveControlPoint = useTransform(smoothVelocity, [-1500, -50, 50, 1500], [0, 50, 50, 100]);

  const svgMask = useMotionTemplate`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L100,0 L100,50 Q50,${curveControlPoint} 0,50 Z' fill='black'/%3E%3C/svg%3E")`;
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

  const contentY = useTransform(
    smoothVelocity,
    [-1500, -50, 50, 1500],
    ["-3vw", "0vw", "0vw", "3vw"]
  );

  return (
    <div className="relative w-full bg-[#111111]">
      <motion.section
        style={{ ...liquidMaskTopStyle, zIndex: 15 }}
        className="relative mt-[-8vw] flex h-[120vh] w-full items-center justify-center overflow-hidden bg-[#F5F3E7] py-0 md:h-[140vh]"
      >
        <motion.div style={{ y: contentY }} className="absolute inset-0 h-full w-full">
          {/* Background Texture */}
          <div className="absolute inset-0">
            <img
              src="/assets/hospitality/stone_texture_bg.webp"
              alt="Stone Texture Background"
              className="h-full w-full object-cover opacity-90"
            />
            {/* Darken overlay slightly so the central card pops */}
            <div className="absolute inset-0 bg-[#3A3530]/5" />
          </div>

          {/* Floating Image Slots */}
          {SLOTS.map((slotImages, i) => (
            <div key={i} className={`absolute overflow-hidden shadow-2xl ${POSITIONS[i]}`}>
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentIndex}
                  src={slotImages[currentIndex % slotImages.length]}
                  alt={`Curated Journey ${i}`}
                  initial={{ opacity: 0, scale: 1.1, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: -50 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.5, ease: "easeInOut" },
                    y: { duration: 10, ease: "linear" },
                    scale: { duration: 10, ease: "linear" },
                  }}
                  className="absolute inset-0 h-[130%] w-full object-cover"
                />
              </AnimatePresence>
            </div>
          ))}

          {/* Center Card */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto relative mx-4 flex max-w-lg flex-col items-center bg-[#F4F1EA] px-6 py-10 text-center shadow-2xl md:px-10 md:py-12 lg:px-16 lg:py-16">
              {/* Subtle map/line decoration at the top right of the card, mimicking the reference */}
              <div className="pointer-events-none absolute top-4 right-4 w-40 opacity-20">
                <svg
                  viewBox="0 0 200 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full"
                >
                  <path
                    d="M0 50 Q 50 10, 100 50 T 200 50"
                    stroke="#3A3530"
                    strokeWidth="1"
                    fill="transparent"
                  />
                  <path
                    d="M20 80 Q 70 40, 120 80 T 200 80"
                    stroke="#3A3530"
                    strokeWidth="0.5"
                    fill="transparent"
                  />
                  <circle cx="150" cy="50" r="3" fill="#3A3530" />
                </svg>
              </div>

              <span className="z-10 mb-3 text-[10px] font-medium tracking-[0.2em] text-[#5A524A] uppercase">
                Ways to explore SAMSARA BALI
              </span>

              <h2 className="z-10 mb-6 font-serif text-3xl text-[#3A3530] md:text-4xl lg:text-5xl">
                Curated Journeys
              </h2>

              <p className="z-10 mb-8 max-w-[240px] text-xs leading-relaxed font-light tracking-wider text-[#5A524A] md:text-sm">
                On this vast estate, <br />
                endless joys await your perfect journey.
              </p>

              <button className="group relative z-10 flex h-12 items-center justify-center overflow-hidden bg-[#736B60] px-8 text-xs font-medium tracking-widest text-white transition-all hover:bg-[#5A524A]">
                <span className="relative z-10 flex items-center">
                  See the itineraries
                  <motion.span
                    className="ml-2 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
