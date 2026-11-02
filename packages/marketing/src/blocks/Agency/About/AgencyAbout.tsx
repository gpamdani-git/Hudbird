import React from "react";
import { motion } from "framer-motion";
import { Button, Container } from "@hudbird/ui";
import { BlurRevealText } from "../../../components/BlurRevealText/BlurRevealText";
import { Magnetic } from "../../../components/Magnetic";

export function AgencyAbout() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-screen flex-col border-b border-[#3D3935] bg-[#F4F2ED] py-24 pr-6 pl-[88px] text-[#282623] md:py-40 md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
    >
      <div className="mb-24 flex items-start justify-between font-serif">
        <BlurRevealText text="CHAPTER I" className="text-3xl tracking-tight md:text-5xl" />
        <BlurRevealText
          text="Quick Intro"
          className="font-sans text-xs font-bold tracking-widest uppercase"
        />
      </div>

      <Container size="xl" className="flex flex-1 flex-col justify-center">
        <BlurRevealText
          text="Hi, I'm Dani — a designer with 10+ years of experience in digital products, websites, and visual systems, creating clear and thoughtful experiences."
          className="font-sans text-4xl leading-[1.1] font-medium tracking-tight md:text-6xl lg:text-7xl"
        />
      </Container>

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
          <Button
            variant="light"
            className="flex h-auto items-center gap-4 p-0 text-2xl font-medium tracking-tight text-[#282623] hover:bg-transparent hover:italic md:text-3xl"
          >
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
          </Button>

          <div className="h-64 w-48 overflow-hidden bg-zinc-300 grayscale transition-all duration-500 hover:grayscale-0 md:h-80 md:w-64">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
