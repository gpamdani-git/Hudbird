import React, { useState, useEffect } from "react";
import { SmoothStackingWrapper } from "../../../components/SmoothStackingWrapper";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import { AccommodationSlider } from "./AccommodationSlider";

const HIGHLIGHTS = [
  { num: "01", category: "Four distinctive", title: "Hotels", id: "section-hotels" },
  {
    num: "02",
    category: "Relaxation Begins The Moment You Check-In",
    title: "14 Pools & Beaches",
    id: "section-pools",
  },
  {
    num: "03",
    category: "World-Class Wining & Dining",
    title: "30 Restaurants & Bars",
    id: "section-dining",
  },
  { num: "04", category: "Escape the everyday", title: "40+ Spa Treatments", id: "section-spa" },
  {
    num: "05",
    category: "Ignite Your Imagination",
    title: "50+ Activities",
    id: "section-experiences",
  },
];

const HOTEL_IMAGES = [
  "/assets/hospitality/aerial.webp", // Villas
  "/assets/hospitality/bali-resort.webp", // Segara
  "/assets/hospitality/dance.webp", // Resort
  "/assets/hospitality/luxury_pool_villa.webp", // Rimba
];

const POOLS_IMAGES = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538964173425-93884d739596?q=80&w=800&auto=format&fit=crop",
];

const HOTEL_TABS = ["VILLAS", "SEGARA", "RESORT", "RIMBA"];

export const ScrollFillTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 45%"],
  });

  const rightInset = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 ${rightInset}% 0 0)`;

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Base faint text */}
      <span className="opacity-30">{children}</span>
      {/* Solid reveal text overlapping */}
      <motion.span
        style={{ clipPath }}
        className="absolute top-0 left-0 h-full w-full text-inherit"
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </span>
  );
};

export function HospitalityHighlights() {
  const [activeMenuTab, setActiveMenuTab] = useState(0);

  // 2. Scroll-driven Marquee Section
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: marqueeScroll } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"],
  });
  // "tergeser dari kiri ke kanan" -> moves from left to right as you scroll down
  const marqueeX = useTransform(marqueeScroll, [0, 1], ["-25%", "0%"]);

  const marqueeRef2 = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: marqueeScroll2 } = useScroll({
    target: marqueeRef2,
    offset: ["start end", "end start"],
  });
  const marqueeX2 = useTransform(marqueeScroll2, [0, 1], ["-25%", "0%"]);

  // 7. Parallax Gallery Section
  const galleryRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  // Different speeds for parallax
  const yFast = useTransform(galleryScroll, [0, 1], ["-15%", "15%"]);
  const ySlow = useTransform(galleryScroll, [0, 1], ["-5%", "5%"]);
  const yReverse = useTransform(galleryScroll, [0, 1], ["10%", "-10%"]);

  // ==========================================
  // LIQUID CSS MASK PHYSICS (NO Z-INDEX FLIPPING)
  // ==========================================
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 50, stiffness: 200, mass: 1 });
  const scrollVelocity = useVelocity(smoothScrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 80, mass: 1 });

  // Curve control point: 0 (Dome), 50 (Flat), 100 (Bowl)
  const curveControlPoint = useTransform(smoothVelocity, [-1500, -50, 50, 1500], [0, 50, 50, 100]);

  // Generates a dynamic SVG data URI mask
  const svgMask = useMotionTemplate`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L100,0 L100,50 Q50,${curveControlPoint} 0,50 Z' fill='black'/%3E%3C/svg%3E")`;

  const liquidMaskStyle = {
    WebkitMaskImage: useMotionTemplate`linear-gradient(black, black), ${svgMask}`,
    WebkitMaskSize: "100% calc(100% - 8vw + 2px), 100% 8vw",
    WebkitMaskPosition: "top left, bottom left",
    WebkitMaskRepeat: "no-repeat, no-repeat",
    maskImage: useMotionTemplate`linear-gradient(black, black), ${svgMask}`,
    maskSize: "100% calc(100% - 8vw + 2px), 100% 8vw",
    maskPosition: "top left, bottom left",
    maskRepeat: "no-repeat, no-repeat",
  };

  const svgMaskTop = useMotionTemplate`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,100 L100,100 L100,50 Q50,${curveControlPoint} 0,50 Z' fill='black'/%3E%3C/svg%3E")`;

  const liquidMaskBothStyle = {
    WebkitMaskImage: useMotionTemplate`${svgMaskTop}, ${svgMask}, linear-gradient(black, black)`,
    WebkitMaskSize: "100% 8vw, 100% 8vw, 100% calc(100% - 16vw + 4px)",
    WebkitMaskPosition: "top left, bottom left, center left",
    WebkitMaskRepeat: "no-repeat, no-repeat, no-repeat",
    maskImage: useMotionTemplate`${svgMaskTop}, ${svgMask}, linear-gradient(black, black)`,
    maskSize: "100% 8vw, 100% 8vw, 100% calc(100% - 16vw + 4px)",
    maskPosition: "top left, bottom left, center left",
    maskRepeat: "no-repeat, no-repeat, no-repeat",
  };

  // Elastic stretch & parallax to simulate physical warping of the container contents

  const liquidMaskGalleryStyle = {
    WebkitMaskImage: useMotionTemplate`${svgMaskTop}, ${svgMask}, linear-gradient(black, black)`,
    WebkitMaskSize: "100% 3vw, 100% 3vw, 100% calc(100% - 6vw + 4px)",
    WebkitMaskPosition: "top left, bottom left, center left",
    WebkitMaskRepeat: "no-repeat, no-repeat, no-repeat",
    maskImage: useMotionTemplate`${svgMaskTop}, ${svgMask}, linear-gradient(black, black)`,
    maskSize: "100% 3vw, 100% 3vw, 100% calc(100% - 6vw + 4px)",
    maskPosition: "top left, bottom left, center left",
    maskRepeat: "no-repeat, no-repeat, no-repeat",
  };

  const contentY = useTransform(
    smoothVelocity,
    [-1500, -50, 50, 1500],
    ["-3vw", "0vw", "0vw", "3vw"]
  );

  return (
    <SmoothStackingWrapper zIndex={10}>
      <div className="relative w-full bg-transparent">
        {/* 1. Highlights Menu Section */}
        <motion.section
          style={{ ...liquidMaskStyle, zIndex: 40 }}
          className="relative flex w-full flex-col items-center justify-center bg-[#0a192f] px-6 pt-32 pb-32"
        >
          <motion.div
            style={{ y: contentY }}
            className="flex w-full flex-col items-center justify-center"
          >
            <p className="mb-6 text-sm font-light tracking-widest text-[#8BB7D0]">
              A wonderland to explore by tram or on foot
            </p>
            <h2 className="mb-24 text-center font-serif text-4xl leading-[1.2] text-white md:text-5xl">
              5 HIGHLIGHTS <span className="font-light italic">of</span>
              <br />
              SAMSARA BALI
            </h2>

            <div className="flex w-full max-w-6xl flex-wrap justify-center gap-x-16 gap-y-16">
              {HIGHLIGHTS.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className="group w-full cursor-pointer md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-3rem)]"
                >
                  <div className="mb-8 flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="font-serif text-2xl text-white transition-colors group-hover:text-[#8BB7D0]">
                      <span className="mr-2 font-sans text-sm">Nº</span>
                      {item.num}
                    </span>
                    <ChevronRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-[#8BB7D0]" />
                  </div>
                  <p className="mb-2 text-xs font-light tracking-wider text-white/50">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-2xl text-white transition-colors group-hover:text-[#8BB7D0]">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 2. Scroll-Driven Gallery Strip */}
        <motion.section
          ref={marqueeRef}
          style={{ ...liquidMaskStyle, zIndex: 30 }}
          className="relative mt-[-8vw] w-full overflow-hidden bg-[#F4F1EA] py-0"
        >
          <motion.div style={{ x: marqueeX, y: contentY }} className="flex w-max whitespace-nowrap">
            {/* Combine and duplicate images for a seamless long strip */}
            {[...HOTEL_IMAGES, ...HOTEL_IMAGES].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Gallery"
                className="inline-block h-48 w-auto object-cover md:h-64 lg:h-[350px]"
              />
            ))}
          </motion.div>
        </motion.section>

        {/* 3. Large Hotels Showcase (Combined) */}
        <motion.section
          id="section-hotels"
          style={{ ...liquidMaskStyle, zIndex: 20 }}
          className="relative mt-[-8vw] flex h-[120vh] w-full flex-col justify-between overflow-hidden bg-black py-0"
        >
          <motion.img
            style={{ y: contentY }} // Scale ensures no gaps appear when shifting Y
            src="/assets/hospitality/luxury_pool_villa.webp?v=2"
            alt="Luxury Resort Pool"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = HOTEL_IMAGES[1];
            }}
          />
          <div className="absolute inset-0 bg-black/20" />

          <motion.div
            style={{ y: contentY }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            {/* Center the Nº 01 text exactly like the reference image */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="mb-2 flex items-start font-serif text-6xl font-light text-white drop-shadow-md md:text-7xl">
                  N
                  <span className="mt-1.5 text-3xl underline decoration-1 underline-offset-[6px] md:text-4xl">
                    o
                  </span>
                  <span className="ml-4 font-normal">01</span>
                </div>
                <div className="font-serif text-sm tracking-[0.3em] text-white uppercase drop-shadow-md md:text-base">
                  HOTELS
                </div>
              </div>
            </div>

            {/* Title at the bottom, above dotted lines */}
            <div className="relative z-10 flex w-full flex-col items-center justify-end pb-0">
              <h2 className="mb-8 text-center font-serif text-4xl leading-[1.2] text-white drop-shadow-lg md:text-5xl">
                <ScrollFillTitle>Four distinctive hotels</ScrollFillTitle>
              </h2>
              <div className="h-32 w-[1px] border-l-2 border-dotted border-white/50" />
            </div>
          </motion.div>
        </motion.section>

        {/* 4. The Hotel Slider Section with Editorial Design */}
        <motion.section
          style={{ ...liquidMaskStyle, zIndex: 10 }}
          className="relative mt-[-8vw] flex w-full flex-col items-center bg-[#F5F3E7] px-6 pt-[calc(6rem+8vw)] pb-[8vw]"
        >
          <motion.div className="flex w-full flex-col items-center">
            {/* Editorial Intro */}
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <p className="font-serif text-xl leading-relaxed text-[#4a4a4a] md:text-2xl">
                Samsara Bali is home to four distinctive hotels,
                <br className="hidden md:block" />
                each offering its own unique charm
                <br className="hidden md:block" />
                and heavenly vistas.
              </p>
              <p className="mt-8 text-sm font-light tracking-wide text-[#8a8a8a]">
                Which will you pick?
              </p>
            </div>

            <div className="mt-12 mb-8 text-xs text-[#b3ac9f]">✧</div>

            <div className="mb-6 text-[10px] font-semibold tracking-[0.25em] text-[#8a8a8a]">
              SAMSARA BALI HOTELS
            </div>

            {/* Tab Navigation */}
            <div className="mb-20 flex flex-wrap justify-center gap-6 md:gap-12">
              {HOTEL_TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveMenuTab(i);
                    document
                      .getElementById(`section-${tab.toLowerCase()}`)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center gap-2 text-xs font-semibold tracking-widest transition-colors ${
                    activeMenuTab === i ? "text-[#3a3a3a]" : "text-[#9a9a9a] hover:text-[#5a5a5a]"
                  }`}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border border-current">
                    <span className="font-serif text-[8px]">{tab.charAt(0)}</span>
                  </div>
                  {tab}
                </button>
              ))}
            </div>

            {/* The 4 Sections */}
            <AccommodationSlider
              id="section-villas"
              title="VILLAS"
              subtitle="Your Exclusive Tranquil Haven"
              description="Poised on a cliffside with sweeping oceanviews, complemented by personalized butler services to cater to your every desire."
              roomTypeName="Villas"
              images={HOTEL_IMAGES}
              liquidMaskStyle={liquidMaskBothStyle}
            />
            <AccommodationSlider
              id="section-segara"
              title="SEGARA"
              subtitle="Oceanfront Serenity & Bliss"
              description="Immerse yourself in oceanfront tranquility, where the gentle sound of the waves harmonizes with luxurious comfort."
              roomTypeName="Rooms"
              images={[...HOTEL_IMAGES].reverse()}
              liquidMaskStyle={liquidMaskBothStyle}
            />
            <AccommodationSlider
              id="section-resort"
              title="RESORT"
              subtitle="The Heart of Luxury Living"
              description="Landmarked by the iconic Rock Bar and built to see the ocean from wherever you choose to go, this award-winning resort has something for everyone."
              roomTypeName="Rooms"
              images={[...HOTEL_IMAGES.slice(2), ...HOTEL_IMAGES.slice(0, 2)]}
              liquidMaskStyle={liquidMaskBothStyle}
            />
            <AccommodationSlider
              id="section-rimba"
              title="RIMBA"
              subtitle="Immersed in Tropical Forest"
              description="Surround yourself with a 90-hectare pristine forest, featuring multi-tiered swimming pools and authentic natural charm."
              roomTypeName="Rooms"
              images={[...HOTEL_IMAGES.slice(1), ...HOTEL_IMAGES.slice(0, 1)]}
              liquidMaskStyle={liquidMaskBothStyle}
            />
          </motion.div>
        </motion.section>

        {/* 5. Scroll-Driven Gallery Strip (Pools & Beaches) */}
        <motion.section
          ref={marqueeRef2}
          style={{ ...liquidMaskStyle, zIndex: 5 }}
          className="relative mt-[-8vw] w-full overflow-hidden bg-[#F4F1EA] py-0"
        >
          <motion.div
            style={{ x: marqueeX2, y: contentY }}
            className="flex w-max whitespace-nowrap"
          >
            {/* Combine and duplicate images for a seamless long strip */}
            {[...POOLS_IMAGES, ...POOLS_IMAGES].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Pools Gallery"
                className="inline-block h-48 w-auto object-cover md:h-64 lg:h-[350px]"
              />
            ))}
          </motion.div>
        </motion.section>

        {/* 6. Large Pools & Beaches Showcase */}
        <motion.section
          id="section-pools"
          style={{ ...liquidMaskStyle, zIndex: 4 }}
          className="relative mt-[-8vw] flex h-[120vh] w-full flex-col justify-between overflow-hidden bg-black py-0"
        >
          <motion.img
            style={{ y: contentY }}
            src="/assets/hospitality/ocean_beach_pool.webp"
            alt="Luxury Resort Pools and Beaches"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          <motion.div
            style={{ y: contentY }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            {/* Center the Nº 02 text exactly like the reference image */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="mb-2 flex items-start font-serif text-6xl font-light text-white drop-shadow-md md:text-7xl">
                  N
                  <span className="mt-1.5 text-3xl underline decoration-1 underline-offset-[6px] md:text-4xl">
                    o
                  </span>
                  <span className="ml-4 font-normal">02</span>
                </div>
                <div className="font-serif text-sm tracking-[0.3em] text-white uppercase drop-shadow-md md:text-base">
                  POOLS & BEACHES
                </div>
              </div>
            </div>

            {/* Title at the bottom, above dotted lines */}
            <div className="relative z-10 flex w-full flex-col items-center justify-end pb-0">
              <h2 className="mb-8 max-w-4xl text-center font-serif text-3xl leading-[1.3] text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                Relaxation begins the moment you check-in with
                <br className="hidden md:block" />
                <ScrollFillTitle>14 pools & beaches</ScrollFillTitle>
              </h2>
              <div className="h-32 w-[1px] border-l-2 border-dotted border-white/50" />
            </div>
          </motion.div>
        </motion.section>

        {/* 7. Parallax Staggered Gallery */}
        <motion.section
          ref={galleryRef}
          style={{ zIndex: 3 }}
          className="relative mt-[-8vw] flex w-full flex-col items-center bg-[#F5F3E7] px-6 pt-[calc(6rem+8vw)] pb-[35vh]"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-12 md:flex-row md:gap-24">
            {/* Left Column */}
            <div className="flex w-full flex-col gap-24 md:w-1/2">
              {/* 1. Ocean Beach Pool (Large) */}
              <motion.div style={{ y: ySlow }} className="flex w-full flex-col">
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: yFast }}
                    src="/assets/hospitality/ocean_beach_pool.webp"
                    alt="Ocean Beach Pool"
                    className="absolute inset-0 h-[130%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Experience the dynamism of the Indian Ocean up close.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>Ocean Beach Pool</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>

              {/* 2. RIMBA Cabana Pool (Medium) */}
              <motion.div style={{ y: ySlow }} className="flex w-full flex-col md:mt-32">
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "3/2", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: yReverse }}
                    src="/assets/hospitality/rimba_cabana_pool.webp"
                    alt="RIMBA Cabana Pool"
                    className="absolute inset-0 h-[115%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    A water oasis adorned with bougainvillea.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>RIMBA Cabana Pool</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>

              {/* 3. AYANA Kids Pool (Small) */}
              <motion.div style={{ y: ySlow }} className="flex w-full flex-col md:w-[80%]">
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: yFast }}
                    src="/assets/hospitality/ayana_kids_pool.webp"
                    alt="AYANA Kids Pool"
                    className="absolute inset-0 h-[130%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Pure delight in every splash.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>AYANA Kids Pool</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex w-full flex-col gap-24 md:w-1/2">
              {/* 1. Text Block */}
              <div className="flex w-full items-center justify-start pt-8">
                <p className="max-w-md font-serif text-lg leading-relaxed text-[#4a4a4a] md:text-xl lg:text-2xl">
                  Wander through enchanted gardens to discover a kaleidoscope of pools and hidden
                  adventures. No matter which accommodation you choose, you are welcome to enjoy all
                  the pools across our four-hotel resort.
                </p>
              </div>

              {/* 2. Segara Pool (Medium) */}
              <motion.div
                style={{ y: yReverse }}
                className="flex w-full flex-col md:ml-auto md:w-[90%]"
              >
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/3", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: ySlow }}
                    src="/assets/hospitality/segara_pool.webp"
                    alt="Segara pool"
                    className="absolute inset-0 h-[120%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Glimmering waters shaped by graceful curves.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>Segara pool</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>

              {/* 3. Kubu Beach (Large) */}
              <motion.div
                style={{ y: yFast }}
                className="flex w-full flex-col md:ml-auto md:w-[90%]"
              >
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: yReverse }}
                    src="/assets/hospitality/kubu_beach.webp"
                    alt="Kubu Beach"
                    className="absolute inset-0 h-[130%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Revel in nature by the shimmering blue Indian Ocean.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>Kubu Beach</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Section Footer */}
          <div className="mt-48 flex w-full max-w-4xl flex-col items-center justify-center text-center">
            <p className="font-serif text-lg text-[#6a6a6a]">
              Find the perfect spot for every moment
            </p>
            <h2 className="mt-6 font-serif text-3xl text-[#2a2a2a] md:text-4xl lg:text-5xl">
              <ScrollFillTitle>POOLS & BEACHES</ScrollFillTitle>
            </h2>
            <div className="mt-8 text-xs text-[#b3ac9f]">✧</div>

            <div className="mt-16 flex w-full flex-col items-center justify-between gap-8 border-t border-dotted border-[#b3ac9f] pt-6 md:flex-row md:gap-12">
              <button className="group relative flex w-full flex-1 items-center justify-between px-2 pb-4 text-sm font-semibold tracking-widest text-[#4a4a4a] transition-colors hover:text-[#2a2a2a]">
                Overview
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#4a4a4a] transition-colors group-hover:border-[#2a2a2a]">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#2a2a2a]/20" />
                <div className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#2a2a2a] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </button>
              <button className="group relative flex w-full flex-1 items-center justify-between px-2 pb-4 text-sm font-semibold tracking-widest text-[#4a4a4a] transition-colors hover:text-[#2a2a2a]">
                Pools & Beaches
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#4a4a4a] transition-colors group-hover:border-[#2a2a2a]">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#2a2a2a]/20" />
                <div className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#2a2a2a] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </SmoothStackingWrapper>
  );
}
