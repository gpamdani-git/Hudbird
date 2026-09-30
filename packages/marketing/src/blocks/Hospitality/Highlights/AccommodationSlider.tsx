import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  usePresence,
  animate,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ScrollFillTitle } from "./HospitalityHighlights";

function GooeyFullImage({ src, direction }: { src: string; direction: number }) {
  const [isPresent, safeToRemove] = usePresence();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (isPresent) {
      const controls = animate(progress, 100, {
        type: "spring",
        stiffness: 60,
        damping: 20,
      });
      return controls.stop;
    } else {
      const timeout = setTimeout(safeToRemove, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isPresent, safeToRemove, progress]);

  const svgMask = useMotionTemplate`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='${useTransform(
    progress,
    (p) => {
      const curve = Math.sin((p / 100) * Math.PI) * 20;
      if (direction > 0) {
        const x = 100 - p;
        return `M 100 0 L ${x} 0 Q ${x - curve} 50 ${x} 100 L 100 100 Z`;
      } else {
        const x = p;
        return `M 0 0 L ${x} 0 Q ${x + curve} 50 ${x} 100 L 0 100 Z`;
      }
    }
  )}' fill='black'/%3E%3C/svg%3E")`;

  const gapWobble = useTransform(progress, (p) => {
    return Math.sin((p / 100) * Math.PI) * 6 * (direction > 0 ? -1 : 1);
  });

  return (
    <motion.div
      style={{
        maskImage: svgMask,
        WebkitMaskImage: svgMask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        zIndex: isPresent ? 10 : 5,
      }}
      className="absolute inset-0 h-full w-full"
    >
      <motion.img
        src={src}
        className="absolute inset-0 h-full w-[110%] max-w-none object-cover"
        alt="Slide"
        initial={{ x: "0%", scale: 1 }}
        animate={isPresent ? { x: "-5%" } : {}}
        transition={{ duration: 8, ease: "linear" }}
      />
      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <motion.path
          fill="#F5F3E7"
          d={useMotionTemplate`
            M 18 0 Q ${useTransform(gapWobble, (w) => 18 + w)} 50 18 100 L 18.4 100 Q ${useTransform(gapWobble, (w) => 18.4 + w)} 50 18.4 0 Z
            M 81.6 0 Q ${useTransform(gapWobble, (w) => 81.6 + w)} 50 81.6 100 L 82 100 Q ${useTransform(gapWobble, (w) => 82 + w)} 50 82 0 Z
          `}
        />
      </svg>
    </motion.div>
  );
}

export function AccommodationSlider({
  id,
  title,
  subtitle,
  description,
  roomTypeName,
  images,
  liquidMaskStyle,
}: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  roomTypeName: string;
  images: string[];
  liquidMaskStyle: any;
}) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  // Custom Cursor
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [sliderHoverDirection, setSliderHoverDirection] = useState<"left" | "right">("right");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);

    if (e.clientX - rect.left < rect.width / 2) {
      setSliderHoverDirection("left");
    } else {
      setSliderHoverDirection("right");
    }
  };

  const changeSlide = (newIndex: number) => {
    setSlideDirection(newIndex > activeSlideIndex ? 1 : -1);
    setActiveSlideIndex(newIndex);
  };

  useEffect(() => {
    if (isHoveringSlider) return;
    const interval = setInterval(() => {
      setSlideDirection(1);
      setActiveSlideIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHoveringSlider, images.length]);

  const handleSliderClick = () => {
    if (sliderHoverDirection === "left") {
      changeSlide((activeSlideIndex - 1 + images.length) % images.length);
    } else {
      changeSlide((activeSlideIndex + 1) % images.length);
    }
  };

  return (
    <div id={id} className="mt-6 mb-16 flex w-full flex-col items-center">
      {/* Selected Hotel Title */}
      <div className="flex w-full flex-col items-center px-6 text-center">
        {/* Ornament (Wide Style) */}
        <div className="relative mb-6 flex w-full max-w-5xl items-center justify-center px-4 text-[#c3bcaf] md:px-8">
          {/* Left Vertical dotted line */}
          <div className="absolute top-1/2 left-0 h-12 w-[1px] -translate-y-1/2 border-l border-dotted border-[#d3cec4] md:h-16">
            <div className="absolute -bottom-3 -left-[4px] text-[10px] text-[#b3ac9f]">⌖</div>
            <div className="absolute -top-3 -left-[4px] text-[10px] text-[#b3ac9f]">⌖</div>
          </div>

          <div className="h-[1px] flex-1 bg-[#e3ded4]" />
          <div className="mx-4 text-[#b3ac9f] md:mx-6">
            <svg
              width="24"
              height="12"
              viewBox="0 0 24 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 12V0M6 12L10 4M18 12L14 4M2 12L7 6M22 12L17 6" />
            </svg>
          </div>
          <div className="h-[1px] flex-1 bg-[#e3ded4]" />

          {/* Right Vertical dotted line */}
          <div className="absolute top-1/2 right-0 h-12 w-[1px] -translate-y-1/2 border-l border-dotted border-[#d3cec4] md:h-16">
            <div className="absolute -bottom-3 -left-[4px] text-[10px] text-[#b3ac9f]">⌖</div>
            <div className="absolute -top-3 -left-[4px] text-[10px] text-[#b3ac9f]">⌖</div>
          </div>
        </div>

        <p className="font-serif text-2xl text-[#6a6a6a] md:text-3xl">
          <ScrollFillTitle>{subtitle}</ScrollFillTitle>
        </p>
        <div className="mt-6 mb-4 text-[10px] font-semibold tracking-[0.25em] text-[#9a9a9a]">
          AYANA BALI
        </div>
        <h2 className="font-serif text-5xl tracking-widest text-[#2a2a2a] md:text-6xl">
          <ScrollFillTitle>{title}</ScrollFillTitle>
        </h2>
        <div className="mt-6 flex items-center justify-center">
          <svg
            width="4"
            height="4"
            viewBox="0 0 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#c3bcaf] opacity-70"
          >
            <path d="M3 0L6 3L3 6L0 3Z" />
          </svg>
        </div>
      </div>

      {/* Slider */}
      <motion.div
        style={{ ...liquidMaskStyle, zIndex: 10 }}
        className="relative h-[60vh] w-full max-w-[80vw] cursor-none overflow-hidden bg-[#F5F3E7] md:h-[80vh]"
        onMouseMove={handleSliderMouseMove}
        onMouseEnter={() => setIsHoveringSlider(true)}
        onMouseLeave={() => setIsHoveringSlider(false)}
      >
        {/* Custom Cursor */}
        <motion.div
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            opacity: isHoveringSlider ? 1 : 0,
            pointerEvents: "none",
          }}
          className="absolute top-0 left-0 z-50 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white mix-blend-difference"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="transition-transform duration-300"
            style={{
              transform: sliderHoverDirection === "left" ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Swipeable Container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.05}
          onClick={handleSliderClick}
          onDragEnd={(e, { offset, velocity }) => {
            const swipeConfidenceThreshold = 10000;
            const swipePower = Math.abs(offset.x) * velocity.x;
            if (swipePower < -swipeConfidenceThreshold) {
              changeSlide((activeSlideIndex + 1) % images.length);
            } else if (swipePower > swipeConfidenceThreshold) {
              changeSlide((activeSlideIndex - 1 + images.length) % images.length);
            }
          }}
          className="flex h-full w-full cursor-none bg-[#F5F3E7]"
        >
          {/* AYANA Text floating on the far left */}
          <div className="pointer-events-none absolute top-1/2 left-6 z-30 flex -translate-y-1/2 flex-col items-center justify-center md:left-12">
            <div className="rotate-[-90deg] font-serif text-[10px] tracking-[0.4em] whitespace-nowrap text-white mix-blend-difference md:text-xs">
              AYANA BALI
            </div>
          </div>

          {/* 1 Single Full Image Slot with SVG Gaps */}
          <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence custom={slideDirection}>
              <GooeyFullImage
                key={activeSlideIndex}
                src={images[activeSlideIndex]}
                direction={slideDirection}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Wrapper to pull caption up into the liquid mask's transparent space */}
      <div className="relative z-20 flex w-full flex-col" style={{ marginTop: "calc(-4vw + 4px)" }}>
        {/* Pagination Dots (Aligned Right to match 80vw slider) */}
        <div className="relative z-20 mb-8 flex w-full max-w-[80vw] justify-end gap-1.5 self-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i)}
              className={`h-[3.5px] w-[3.5px] rounded-full transition-colors ${i === activeSlideIndex ? "bg-[#2a2a2a]" : "bg-[#c3bcaf] hover:bg-[#8a8a8a]"}`}
            />
          ))}
        </div>

        {/* Caption */}
        <div className="relative flex w-full max-w-[100vw] flex-col px-6 pb-12 md:px-12">
          {/* Info Layout */}
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 border-b border-[#e3ded4] pb-6 md:flex-row md:items-end">
            {/* Left: Text and Breadcrumb */}
            <div className="flex w-full max-w-xl flex-col">
              <p className="mb-6 font-serif text-base leading-relaxed break-words text-[#6a6a6a] md:mb-10 md:text-[16px]">
                {description}
              </p>
              <div className="flex w-full items-center gap-2 border-b border-dotted border-[#c3bcaf] pb-4 text-[11px] text-[#8a8a8a] md:border-none md:pb-0">
                <span className="font-serif text-xs text-[#6a6a6a] italic">Hotels</span>
                <span>&gt;</span>
                <span className="tracking-widest uppercase">AYANA BALI</span>
                <span className="ml-1 font-semibold tracking-widest text-[#2a2a2a] uppercase">
                  <ScrollFillTitle>{title}</ScrollFillTitle>
                </span>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex w-full flex-col items-start gap-4 md:w-auto md:flex-row md:items-center md:gap-6">
              <button className="flex w-full items-center justify-between border-b border-[#e3ded4] pb-3 text-sm text-[#4a4a4a] transition-opacity hover:opacity-70 md:w-auto md:justify-start md:gap-2 md:border-[#2a2a2a] md:pb-1">
                Overview
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </span>
              </button>
              <span className="hidden text-xs text-[#d3cec4] md:block">⋮</span>
              <button className="flex w-full items-center justify-between border-b border-[#e3ded4] pb-3 text-sm text-[#4a4a4a] transition-opacity hover:opacity-70 md:w-auto md:justify-start md:gap-2 md:border-[#2a2a2a] md:pb-1">
                {roomTypeName}
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* End of Caption wrapper */}
      </div>
    </div>
  );
}
