import React from "react";
import { motion } from "framer-motion";
import { BlurRevealText } from "../../../components/BlurRevealText/BlurRevealText";

export function AgencyFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden bg-[#0A0A0A] pt-32 pr-6 pb-6 pl-[88px] md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex w-full justify-evenly opacity-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="h-full w-[1px] bg-[#3D3935]" />
        ))}
      </div>

      <div className="pointer-events-none absolute -top-[300px] left-1/2 z-0 h-[600px] w-full max-w-[1200px] -translate-x-1/2 rounded-full bg-red-600/15 blur-[120px]"></div>

      <div className="relative z-10 flex w-full flex-col justify-between gap-16 pb-24 md:flex-row md:items-start md:pb-32">
        <div className="flex max-w-xl flex-col">
          <BlurRevealText
            text="Ready to bring your vision to life? Subscribe to our newsletter for weekly insights."
            className="mb-12 font-serif text-3xl leading-tight tracking-tight text-[#F4F2ED]/90 md:text-4xl lg:text-5xl"
          />

          <div className="flex max-w-md items-center border-b border-[#3D3935] pb-2">
            <input
              type="email"
              placeholder="name@email.com"
              className="flex-1 bg-transparent text-sm text-[#F4F2ED] placeholder-[#8E8A83] outline-none"
            />
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#FF5A00]/90">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-16 md:items-end">
          <nav className="flex flex-col items-start gap-3 font-serif text-lg text-[#F4F2ED] md:items-end md:text-xl">
            <a href="#" className="transition-colors hover:text-[#8E8A83]">
              Home
            </a>
            <a href="#" className="transition-colors hover:text-[#8E8A83]">
              About
            </a>
            <a href="#" className="transition-colors hover:text-[#8E8A83]">
              Works
            </a>
            <a href="#" className="transition-colors hover:text-[#8E8A83]">
              Services
            </a>
            <a href="#" className="transition-colors hover:text-[#8E8A83]">
              Contact
            </a>
          </nav>

          <div className="text-left text-xs tracking-wide text-[#8E8A83] md:text-right">
            <p>Designed by DAStudio.</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full overflow-hidden text-center md:-ml-8 lg:-ml-10">
        <h1 className="font-serif text-[14vw] leading-[0.75] tracking-tighter whitespace-nowrap text-[#F4F2ED] uppercase">
          DASTUDIO
        </h1>
      </div>
    </motion.footer>
  );
}
