const fs = require("fs");

const path = "packages/marketing/src/blocks/Hospitality/Highlights/AccommodationSlider.tsx";
let code = fs.readFileSync(path, "utf8");

// Replace GooeyImage with GooeyFullImage
const newGooey = `
function GooeyFullImage({ src, direction }: { src: string, direction: number }) {
  const [isPresent, safeToRemove] = usePresence();
  const progress = useMotionValue(0);
  
  useEffect(() => {
    if (isPresent) {
      const controls = animate(progress, 100, {
        type: "spring", stiffness: 60, damping: 20
      });
      return controls.stop;
    } else {
      const timeout = setTimeout(safeToRemove, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isPresent, safeToRemove, progress]);

  const svgMask = useMotionTemplate\`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='\${useTransform(progress, p => {
    const curve = Math.sin((p / 100) * Math.PI) * 20; 
    if (direction > 0) {
      const x = 100 - p;
      return \`M 100 0 L \${x} 0 Q \${x - curve} 50 \${x} 100 L 100 100 Z\`;
    } else {
      const x = p;
      return \`M 0 0 L \${x} 0 Q \${x + curve} 50 \${x} 100 L 0 100 Z\`;
    }
  })}' fill='black'/%3E%3C/svg%3E")\`;

  const gapWobble = useTransform(progress, p => {
    return Math.sin((p / 100) * Math.PI) * 8 * (direction > 0 ? -1 : 1);
  });

  return (
    <motion.div 
      style={{ 
        maskImage: svgMask, 
        WebkitMaskImage: svgMask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        zIndex: isPresent ? 10 : 5
      }} 
      className="absolute inset-0 w-full h-full"
    >
      <motion.img 
        src={src} 
        className="absolute inset-0 w-[110%] max-w-none h-full object-cover" 
        alt="Slide"
        initial={{ x: "0%", scale: 1 }}
        animate={isPresent ? { x: "-5%" } : {}}
        transition={{ duration: 8, ease: "linear" }}
      />
      <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path 
          fill="#F5F3E7" 
          d={useMotionTemplate\`
            M 18 0 Q \${useTransform(gapWobble, w => 18 + w)} 50 18 100 L 18.4 100 Q \${useTransform(gapWobble, w => 18.4 + w)} 50 18.4 0 Z
            M 81.6 0 Q \${useTransform(gapWobble, w => 81.6 + w)} 50 81.6 100 L 82 100 Q \${useTransform(gapWobble, w => 82 + w)} 50 82 0 Z
          \`} 
        />
      </svg>
    </motion.div>
  );
}
`;

// Replace GooeyImage definition
code = code.replace(
  /function GooeyImage[\s\S]*?(?=export function AccommodationSlider)/,
  newGooey + "\n"
);

// Replace the slider slots
const newSlots = `
          {/* AYANA Text floating on the far left */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col justify-center items-center pointer-events-none">
            <div className="rotate-[-90deg] whitespace-nowrap text-[10px] md:text-[11px] font-serif tracking-[0.4em] text-white mix-blend-difference">
              AYANA BALI
            </div>
          </div>

          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence custom={slideDirection}>
              <GooeyFullImage
                key={activeSlideIndex}
                src={images[activeSlideIndex]}
                direction={slideDirection}
              />
            </AnimatePresence>
          </div>
`;

// Find everything between "className="w-full h-full cursor-none flex bg-[#F5F3E7]"" and "</motion.div>"
code = code.replace(
  /className="w-full h-full cursor-none flex bg-\[#F5F3E7\]"[\s\S]*?<\/motion\.div>/,
  'className="w-full h-full cursor-none flex bg-[#F5F3E7]">\n' + newSlots + "        </motion.div>"
);

// Insert auto-slide effect
const autoSlideEffect = `
  useEffect(() => {
    if (isHoveringSlider) return;
    const interval = setInterval(() => {
      setSlideDirection(1);
      setActiveSlideIndex(prev => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHoveringSlider, images.length]);
`;

code = code.replace(
  /const changeSlide = \(newIndex: number\) => {/,
  autoSlideEffect + "\n  const changeSlide = (newIndex: number) => {"
);

fs.writeFileSync(path, code);
