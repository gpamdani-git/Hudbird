import React, { useState, useEffect } from "react";
import {
  BentoGridGlass,
  CtaGlass,
  FeatureGlass,
  FooterMega,
  HeroGlass,
  HeroHeader,
  TestimonialGlass,
} from "./hudbird-ui"; // Hudbird UI library (vendored in src/components/hudbird-ui)
import { Moon, Sun } from "lucide-react";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };
  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 bottom-4 z-50 rounded-full border border-zinc-200 bg-white p-3 text-zinc-900 shadow-lg transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export default function GeneratedComponent() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <ThemeSwitcher />
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[#0A0A0E] px-8 py-12">
        <div className="flex w-full flex-col">
          <div className="flex flex-col" />
          <div className="flex flex-col" />
          <div className="flex flex-col">
            <HeroHeader
              className="relative sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60"
              links={[
                {
                  label: "Work",
                  href: "#",
                  className:
                    "text-zinc-700 font-medium dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
                },
                {
                  label: "Studio",
                  href: "#",
                  className:
                    "text-zinc-700 font-medium dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
                },
                {
                  label: "Contact",
                  href: "#",
                  className:
                    "text-zinc-700 font-medium dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
                },
              ]}
            />
            <div className="py-[128px]">
              <HeroGlass
                className="border-b border-zinc-200/50 bg-transparent py-32 text-3xl dark:border-white/5 dark:bg-transparent"
                description="Neon Studio is a creative design and engineering agency based in New York. We partner with ambitious brands to create digital products that push boundaries."
                locked={false}
              />
            </div>
            <div className="flex flex-col py-12">
              <BentoGridGlass
                description="A curated selection of our recent digital projects spanning branding, web design, and product engineering."
                items={[
                  {
                    title: "Lumina Fragrances",
                    description: "E-Commerce Experience",
                    className: "md:col-span-2 md:row-span-2 xl:col-span-2 xl:row-span-2",
                  },
                  {
                    title: "Aura Design System",
                    description: "Brand Identity & Web",
                    className: "md:col-span-1",
                  },
                  {
                    title: "Aura Fintech",
                    description: "Brand Identity",
                    className: "md:col-span-1 md:row-span-1 xl:col-span-2 xl:row-span-1",
                  },
                  {
                    title: "Nexus Analytics",
                    description: "Web Application",
                    className: "md:col-span-1 md:row-span-1 xl:col-span-2 xl:row-span-1",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col py-12">
              <FeatureGlass
                description="A full-service digital approach. We handle everything from brand identity to complex web application engineering seamlessly."
                features={[
                  {
                    icon: { _type: "LucideIcon", name: "PenTool", size: 28 },
                    title: "Brand Identity",
                    description:
                      "We create cohesive brand systems, typography, and visual languages that resonate with your target audience and stand the test of time.",
                  },
                  {
                    icon: { _type: "LucideIcon", name: "Layout", size: 28 },
                    title: "UX/UI Design",
                    description:
                      "Crafting intuitive and beautiful interfaces. Our design process is rooted in user research, wireframing, and interactive prototyping.",
                  },
                  {
                    icon: { _type: "LucideIcon", name: "Monitor", size: 28 },
                    title: "Creative Engineering",
                    description:
                      "Bringing designs to life with modern web technologies. We specialize in React, WebGL, and buttery smooth framer motion animations.",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col py-24">
              <TestimonialGlass
                testimonials={[
                  {
                    quote:
                      "Neon Studio completely transformed our brand identity. Their attention to detail and ability to execute on a vision is unmatched in the industry.",
                    author: "Sarah Jenkins",
                    role: "CMO, Lumina Fragrances",
                    avatar:
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                  },
                  {
                    quote:
                      "Working with them felt like an extension of our own team. They delivered our complex web application weeks ahead of schedule with flawless motion design.",
                    author: "David Chen",
                    role: "Founder, FinTrack Mobile",
                    avatar:
                      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col py-[128px]">
              <CtaGlass
                description="We are currently accepting new projects for Q3 2026. Reach out to discuss how we can partner to elevate your brand."
                primaryAction={{
                  label: "Start a Project",
                  className:
                    "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full h-14 px-10 text-lg shadow-2xl",
                }}
                secondaryAction={{
                  label: "Send an Email",
                  href: "#",
                  className:
                    "text-zinc-800 dark:text-zinc-200 font-medium hover:text-zinc-900 dark:hover:text-white rounded-full bg-white/60 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 h-14 backdrop-blur-md px-10 shadow-lg",
                }}
              />
            </div>
            <div className="pt-16">
              <FooterMega
                className="relative z-10 mt-auto border-t border-zinc-200/50 bg-white/30 pt-16 backdrop-blur-lg dark:border-white/5 dark:bg-zinc-950/30"
                brandName=""
                description="A curated selection of our recent digital projects spanning branding, web design, and product engineering."
                linkGroups={[
                  {
                    title: "Services",
                    links: [
                      { label: "Digital Product Design", href: "#" },
                      { label: "Web Application Engineering", href: "#" },
                      { label: "Brand Identity", href: "#" },
                      { label: "Motion Graphics", href: "#" },
                    ],
                  },
                  {
                    title: "Agency",
                    links: [
                      { label: "About Us", href: "#" },
                      { label: "Careers", href: "#" },
                      { label: "Journal", href: "#" },
                      { label: "Contact", href: "#" },
                    ],
                  },
                ]}
                socials={[
                  {
                    label: "Instagram",
                    href: "#",
                    icon: { _type: "LucideIcon", name: "Camera", size: 24 },
                  },
                ]}
                copyright="© 2026 Neon Studio, LLC. Made in NYC."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
