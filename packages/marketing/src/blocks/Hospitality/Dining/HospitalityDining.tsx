import React from "react";
import { SmoothStackingWrapper } from "../../../components/SmoothStackingWrapper";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  useVelocity,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ScrollFillTitle } from "../Highlights/HospitalityHighlights";

const DINING_STRIP_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
];

export function HospitalityDining() {
  // 1. Scroll-Driven Gallery Strip (Top)
  const stripRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: stripScroll } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });
  const stripX = useTransform(stripScroll, [0, 1], ["-20%", "0%"]);

  // 2. Parallax Gallery Section (Main)
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
  // LIQUID CSS MASK PHYSICS (VELOCITY BASED)
  // ==========================================
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 50, stiffness: 200, mass: 1 });
  const scrollVelocity = useVelocity(smoothScrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 80, mass: 1 });

  // Curve control point: 0 (Dome), 50 (Flat), 100 (Bowl)
  const curveControlPoint = useTransform(smoothVelocity, [-1500, -50, 50, 1500], [0, 50, 50, 100]);

  // Generates a dynamic SVG data URI mask
  const svgMask = useMotionTemplate`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L100,0 L100,50 Q50,${curveControlPoint} 0,50 Z' fill='black'/%3E%3C/svg%3E")`;
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
    <SmoothStackingWrapper zIndex={20}>
      <div id="section-dining" className="relative w-full bg-transparent">
        {/* 1. Scroll-Driven Gallery Strip */}
        <motion.section
          ref={stripRef}
          style={{ ...liquidMaskBothStyle, zIndex: 5 }}
          className="relative mt-[-8vw] w-full overflow-hidden bg-[#F4F1EA] py-0"
        >
          <motion.div style={{ x: stripX, y: contentY }} className="flex w-max whitespace-nowrap">
            {/* Combine and duplicate images for a seamless long strip */}
            {[...DINING_STRIP_IMAGES, ...DINING_STRIP_IMAGES].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Dining Gallery"
                className="inline-block h-48 w-auto object-cover md:h-64 lg:h-[350px]"
              />
            ))}
          </motion.div>
        </motion.section>

        {/* 2. Large Showcase (Nº 03 DINING) */}
        <motion.section
          style={{ ...liquidMaskBothStyle, zIndex: 4 }}
          className="relative mt-[-8vw] flex h-[120vh] w-full flex-col justify-between overflow-hidden bg-black py-0"
        >
          <motion.img
            style={{ y: contentY }}
            src="/assets/hospitality/bali_sunset_bar.webp"
            alt="Dining Showcase"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          <motion.div
            style={{ y: contentY }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            {/* Center the Nº 03 text exactly like the reference image */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="mb-2 flex items-start font-serif text-6xl font-light text-white drop-shadow-md md:text-7xl">
                  N
                  <span className="mt-1.5 text-3xl underline decoration-1 underline-offset-[6px] md:text-4xl">
                    o
                  </span>
                  <span className="ml-4 font-normal">03</span>
                </div>
                <div className="font-serif text-sm tracking-[0.3em] text-white uppercase drop-shadow-md md:text-base">
                  DINING
                </div>
              </div>
            </div>

            {/* Title at the bottom, above dotted lines */}
            <div className="relative z-10 flex w-full flex-col items-center justify-end pb-0">
              <h2 className="mb-8 max-w-4xl text-center font-serif text-3xl leading-[1.3] text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                World-class wining & dining
                <br className="hidden md:block" />
                <ScrollFillTitle>for every taste with 30 restaurants & bars</ScrollFillTitle>
              </h2>
              <div className="h-32 w-[1px] border-l-2 border-dotted border-white/50" />
            </div>
          </motion.div>
        </motion.section>

        {/* 3. Parallax Staggered Gallery */}
        <motion.section
          ref={galleryRef}
          style={{ zIndex: 3 }}
          className="relative mt-[-8vw] flex w-full flex-col items-center bg-[#F5F3E7] px-6 pt-[calc(6rem+8vw)] pb-[35vh]"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-12 md:flex-row md:gap-24">
            {/* Left Column */}
            <div className="flex w-full flex-col gap-24 md:w-1/2">
              {/* 1. Text Block */}
              <div className="flex w-full items-center justify-start pt-8 md:pt-32">
                <p className="max-w-md font-serif text-lg leading-relaxed text-[#4a4a4a] md:text-xl lg:text-2xl">
                  Embark on an extraordinary culinary journey with thirty dining experiences
                  offering flavors from around the world. Delight in traditional Indonesian dishes,
                  savor freshly caught seafood, enjoy Mediterranean fare with vegetables from AYANA
                  Farm, and so much more.
                </p>
              </div>

              {/* 2. Cocktail (Small) */}
              <motion.div style={{ y: ySlow }} className="flex w-full flex-col md:mt-16">
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: yFast }}
                    src="/assets/hospitality/rock_bar_cocktail.webp"
                    alt="Rock Bar Cocktail"
                    className="absolute inset-0 h-[130%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Enjoy a cocktail while feeling the sea breeze.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>Rock Bar</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>

              {/* 3. Pizza (Medium) */}
              <motion.div
                style={{ y: yReverse }}
                className="flex w-full flex-col md:mt-24 md:w-[90%]"
              >
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "3/2", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: ySlow }}
                    src="/assets/hospitality/sami_sami_pizza.webp"
                    alt="Sami Sami Pizza"
                    className="absolute inset-0 h-[115%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Savor vibrant flavors amidst a refreshing coastal breeze.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>Sami Sami</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex w-full flex-col gap-24 md:w-1/2">
              {/* 1. Rock Bar Sunset (Large) */}
              <motion.div style={{ y: ySlow }} className="flex w-full flex-col">
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: yReverse }}
                    src="/assets/hospitality/luxury_rock_bar_dining.webp"
                    alt="Rock Bar"
                    className="absolute inset-0 h-[130%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Soak in the splendor of nature's masterpiece.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>Rock Bar</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>

              {/* 2. Kubu Beach Club (Medium) */}
              <motion.div
                style={{ y: yReverse }}
                className="flex w-full flex-col md:mt-16 md:ml-auto md:w-[90%]"
              >
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/3", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: ySlow }}
                    src="/assets/hospitality/kubu_beach_club.webp"
                    alt="Kubu Beach Club"
                    className="absolute inset-0 h-[120%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    A soothing vintage Bali atmosphere.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>Kubu Beach Club</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>

              {/* 3. DAVA Steak (Medium) */}
              <motion.div
                style={{ y: ySlow }}
                className="flex w-full flex-col md:mt-24 md:ml-auto md:w-[90%]"
              >
                <motion.div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9", ...liquidMaskGalleryStyle }}
                >
                  <motion.img
                    style={{ y: yFast }}
                    src="/assets/hospitality/dava_steak.webp"
                    alt="DAVA Steak & Seafood"
                    className="absolute inset-0 h-[130%] w-full object-cover"
                  />
                </motion.div>
                <div className="mt-4 flex flex-col">
                  <p className="font-serif text-sm text-[#4a4a4a] italic md:text-base">
                    Fine dining in a romantic setting.
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    <ScrollFillTitle>DAVA Steak & Seafood</ScrollFillTitle>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Section Footer */}
          <div className="mt-48 flex w-full max-w-4xl flex-col items-center justify-center text-center">
            <p className="font-serif text-lg text-[#6a6a6a]">
              Flavors of the world, at your leisure
            </p>
            <h2 className="mt-6 font-serif text-3xl text-[#2a2a2a] md:text-4xl lg:text-5xl">
              <ScrollFillTitle>DINING</ScrollFillTitle>
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
                Restaurant & Café/Bar List
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
