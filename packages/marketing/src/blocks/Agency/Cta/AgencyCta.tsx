import React from "react";
import { motion } from "framer-motion";
import { BlurRevealText } from "../../../components/BlurRevealText/BlurRevealText";

export function AgencyCta() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black py-8 pr-6 pl-[88px] text-[#F4F2ED] md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
    >
      <div className="z-10 flex w-full justify-between text-[10px] tracking-widest text-[#8E8A83] uppercase">
        <BlurRevealText text="SINCE 2016" />
        <BlurRevealText text="BRANDING & CONTENT" delay={0.2} />
      </div>

      <div className="relative my-20 flex w-full flex-1 flex-col items-center justify-center">
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

            <motion.div
              className="absolute inset-16 rounded-full border-[1px] border-dashed border-[#F4F2ED]/30"
              animate={{ rotateZ: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A00] blur-[70px]"
            />
          </motion.div>
        </div>

        <BlurRevealText
          text="Great Work Starts Here"
          className="pointer-events-none relative z-10 text-center font-serif text-[15vw] leading-none tracking-tight text-white drop-shadow-2xl md:text-[12vw]"
        />

        <div className="relative z-10 mt-20 md:mt-32">
          <button className="border border-[#F4F2ED] bg-black px-8 py-4 text-xs font-bold tracking-widest text-[#F4F2ED] uppercase transition-colors hover:bg-[#F4F2ED] hover:text-black">
            START A PROJECT
          </button>
        </div>
      </div>

      <div className="z-10 flex w-full items-end justify-between text-[10px] tracking-widest text-[#8E8A83] uppercase">
        <BlurRevealText text="50+ BRANDS SHAPED" className="w-24 md:w-auto" />

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
  );
}
