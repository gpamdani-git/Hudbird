import React from "react";
import { motion } from "framer-motion";
import { BlurRevealText } from "../../../components/BlurRevealText/BlurRevealText";

export function AgencyExperiences() {
  return (
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
  );
}
