import React from "react";
import { motion } from "framer-motion";
import { BlurRevealText } from "../../../components/BlurRevealText/BlurRevealText";

export function AgencyServices() {
  return (
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
  );
}
