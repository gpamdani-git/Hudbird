import React from "react";
import { motion } from "framer-motion";
import { BlurRevealText } from "../../../components/BlurRevealText/BlurRevealText";

export interface Project {
  name: string;
  category: string;
  overview: string;
  year: string;
  client: string;
  scope: string[];
  image: string;
  images: string[];
}

interface AgencyProjectsProps {
  projects: Project[];
  setActiveProject: (project: Project) => void;
}

export const DEFAULT_AGENCY_PROJECTS: Project[] = [
  {
    name: "AI Startup",
    category: "SaaS Dashboard",
    overview: "A sleek and futuristic AI startup website landing page mockup.",
    year: "2026",
    client: "Neuralyx",
    scope: ["Web Design", "Framer Developer"],
    image:
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1000&auto=format&fit=crop",
    images: [],
  },
  {
    name: "E-Commerce",
    category: "Digital Storefront",
    overview: "A premium headless e-commerce experience.",
    year: "2025",
    client: "Lumina",
    scope: ["UX Design", "Frontend"],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    images: [],
  },
];

export function AgencyProjects({
  projects = DEFAULT_AGENCY_PROJECTS,
  setActiveProject = () => {},
}: Partial<AgencyProjectsProps>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-[#3D3935] bg-[#F4F2ED] py-24 pr-6 pl-[88px] text-[#282623] md:py-40 md:pr-12 md:pl-[128px] lg:pr-20 lg:pl-[160px]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <h2 className="font-serif text-[18vw] leading-none tracking-tighter whitespace-nowrap text-[#282623] opacity-10">
          THE WORK
        </h2>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="mb-16 flex items-end justify-between">
          <BlurRevealText
            text="THE WORK"
            className="font-serif text-5xl tracking-tighter md:text-7xl"
          />
          <BlurRevealText
            text="❋ Live site unavailable for some inactive or incomplete projects"
            className="hidden max-w-xs text-right text-xs font-medium tracking-wider text-[#8E8A83] uppercase sm:block"
            delay={0.2}
          />
        </div>

        <div className="flex w-full flex-col border-t border-[#3D3935]/20">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              data-cursor="view-works"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveProject(project)}
              className="group relative -mx-6 flex cursor-pointer items-center justify-between border-b border-[#3D3935]/20 px-6 py-8 transition-colors duration-300 hover:bg-[#0A0A0A] hover:text-[#F4F2ED] md:-mx-12 md:px-12 md:py-12"
            >
              <h4 className="font-serif text-4xl tracking-tight transition-all duration-300 group-hover:italic md:text-6xl">
                {project.name}
              </h4>
              <span className="text-sm font-medium tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {project.category}
              </span>

              {/* Hover Image Reveal */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 aspect-video w-[300px] -translate-x-1/2 -translate-y-1/2 scale-90 overflow-hidden bg-zinc-200 opacity-0 shadow-2xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <img
                  src={project.image}
                  className="h-full w-full object-cover"
                  alt={project.name}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
