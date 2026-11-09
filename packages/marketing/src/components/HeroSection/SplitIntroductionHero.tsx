"use client";
import * as React from "react";
import { Section, Container, Grid, Button, Badge, Heading, Text, Input } from "@hudbird/ui";
import { Star, Check, Apple, Users, Layers, Palette, Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroContent, HeroImage, HeroSectionConfig } from "@hudbird/schemas";
import { useBrandMode } from "./BrandScope";
import { cn } from "../../utils/cn";

export interface SplitIntroductionHeroProps {
  content: HeroContent;
  config: {
    variant: string;
    image?: HeroImage;
    [key: string]: unknown;
  };
  id?: string;
  headingLevel?: "h1" | "h2" | "h3";
}

export function renderEditorialTitle(rawTitle: string) {
  if (!rawTitle) return null;

  // Support markdown italic asterisks e.g. "Meet. *Collaborate.* Hire. Finally, all in *one* place."
  if (rawTitle.includes("*")) {
    const parts = rawTitle.split(/(\*[^*]+\*)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <span key={i} className="font-serif font-normal italic">
                {part.slice(1, -1)}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }

  // Exact reference title match
  if (
    rawTitle.includes("Meet. Collaborate. Hire") ||
    rawTitle.includes("Finally, all in one place")
  ) {
    return (
      <>
        <span>Meet. </span>
        <span className="font-serif font-normal italic">Collaborate.</span>
        <span> Hire.</span>
        <br className="hidden sm:inline" />
        <span> Finally, all in </span>
        <span className="font-serif font-normal italic">one</span>
        <span> place.</span>
      </>
    );
  }

  // Generic startup title match
  if (rawTitle.includes("Make room for your next idea")) {
    return (
      <>
        <span>Make room for your </span>
        <span className="font-serif font-normal italic">next</span>
        <span> idea.</span>
      </>
    );
  }

  return rawTitle;
}

const defaultSocialAvatars = [
  "https://images.pexels.com/photos/32993772/pexels-photo-32993772.jpeg?auto=compress&cs=tinysrgb&w=120",
  "https://images.pexels.com/photos/29204802/pexels-photo-29204802.jpeg?auto=compress&cs=tinysrgb&w=120",
  "https://images.pexels.com/photos/6500631/pexels-photo-6500631.jpeg?auto=compress&cs=tinysrgb&w=120",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120",
];

export interface SplitSlideItem {
  id: string;
  image: HeroImage;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
  };
}

export const defaultSplitSlides: SplitSlideItem[] = [
  {
    id: "slide-1",
    image: {
      src: "https://images.pexels.com/photos/32993772/pexels-photo-32993772.jpeg?auto=compress&cs=tinysrgb&w=1400",
      darkSrc:
        "https://images.pexels.com/photos/32993772/pexels-photo-32993772.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Elegant black and white portrait of a woman with headscarf in monochrome lighting",
    },
    testimonial: {
      quote: "Found our lead brand designer in under 24 hours. The talent pool is astonishing.",
      author: "Elena Rostova",
      role: "Head of Design @ Studio A",
      avatar:
        "https://images.pexels.com/photos/32993772/pexels-photo-32993772.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
  },
  {
    id: "slide-2",
    image: {
      src: "https://images.pexels.com/photos/29204802/pexels-photo-29204802.jpeg?auto=compress&cs=tinysrgb&w=1400",
      darkSrc:
        "https://images.pexels.com/photos/29204802/pexels-photo-29204802.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Artistic black and white portrait of a creative designer in monochrome denim",
    },
    testimonial: {
      quote: "We assembled an entire product engineering team in one week. Zero agency overhead.",
      author: "Marcus Vance",
      role: "VP of Product @ Linear Labs",
      avatar:
        "https://images.pexels.com/photos/29204802/pexels-photo-29204802.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
  },
  {
    id: "slide-3",
    image: {
      src: "https://images.pexels.com/photos/14965665/pexels-photo-14965665.jpeg?auto=compress&cs=tinysrgb&w=1400",
      darkSrc:
        "https://images.pexels.com/photos/14965665/pexels-photo-14965665.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Dramatic monochrome architectural facade with geometric lines and cloudy sky",
    },
    testimonial: {
      quote:
        "The smoothest hiring experience we've ever had. Verified talents with impeccable taste.",
      author: "Sophia Chen",
      role: "Creative Director @ Forma",
      avatar:
        "https://images.pexels.com/photos/6500631/pexels-photo-6500631.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
  },
  {
    id: "slide-4",
    image: {
      src: "https://images.pexels.com/photos/37159340/pexels-photo-37159340.jpeg?auto=compress&cs=tinysrgb&w=1400",
      darkSrc:
        "https://images.pexels.com/photos/37159340/pexels-photo-37159340.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Dramatic black and white abstract building architecture with high contrast shadows",
    },
    testimonial: {
      quote: "Finally a platform that feels like it was designed by creatives for creatives.",
      author: "David Kim",
      role: "Founder @ Atelier 9",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.15,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function SlideCardContent({
  slideIndex,
  testimonial,
}: {
  slideIndex: number;
  testimonial: SplitSlideItem["testimonial"];
}) {
  if (slideIndex === 0) {
    // 1. Testimonial Card (Rating + Verified + Quote + Profile)
    return (
      <>
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
            <span className="ml-1 text-[11px] font-semibold text-zinc-900 dark:text-white">
              {testimonial.rating}.0
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
            Verified
          </span>
        </div>

        <p className="my-2 line-clamp-2 text-[11px] leading-snug font-medium text-zinc-800 italic sm:text-xs dark:text-zinc-200">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center gap-2 border-t border-zinc-100 pt-1.5 dark:border-white/[0.08]">
          <img
            src={testimonial.avatar}
            alt=""
            role="presentation"
            aria-hidden="true"
            className="h-6 w-6 rounded-full object-cover ring-1 ring-zinc-200 sm:h-7 sm:w-7 dark:ring-white/15"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 truncate text-[11px] font-semibold text-zinc-900 dark:text-white">
              <span className="truncate">{testimonial.author}</span>
              <svg
                className="h-2.5 w-2.5 shrink-0 fill-current text-blue-500"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
              {testimonial.role}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (slideIndex === 1) {
    // 2. GitHub Free Open Source Card (inspired by image 1)
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium tracking-tight text-zinc-500 uppercase dark:text-zinc-400">
            GitHub Community
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
            Open Source
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 py-0.5">
          <span className="[font-family:serif,Georgia,ui-serif] font-serif text-3xl font-normal tracking-tight text-zinc-900 italic sm:text-4xl dark:text-white">
            14.8k
          </span>
          <span className="text-xs font-semibold text-amber-500">★ stars</span>
        </div>

        <div className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-100/80 px-3 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-200/80 dark:border-white/10 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/15">
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>MIT License • Free</span>
        </div>
      </div>
    );
  }

  if (slideIndex === 2) {
    // 3. Hudbird UI - Collaboration & Projects (inspired by image 2)
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-zinc-200/70 bg-zinc-50/70 p-2.5 transition-colors dark:border-white/[0.08] dark:bg-white/[0.04]">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-semibold text-zinc-900 dark:text-white">Collaboration</div>
            <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
              Collab with others for UI creation
            </div>
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-zinc-800 shadow-2xs dark:bg-zinc-800 dark:text-zinc-200">
            <Users className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-zinc-200/70 bg-zinc-50/70 p-2.5 transition-colors dark:border-white/[0.08] dark:bg-white/[0.04]">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-semibold text-zinc-900 dark:text-white">Project</div>
            <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
              Build modern pages in seconds
            </div>
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-zinc-800 shadow-2xs dark:bg-zinc-800 dark:text-zinc-200">
            <Layers className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  // 4. Hudbird UI - Design System & Release (inspired by image 3)
  return (
    <div className="divide-y divide-zinc-100 rounded-lg dark:divide-white/[0.08]">
      <div className="flex items-center justify-between py-1.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700 dark:bg-white/[0.08] dark:text-zinc-200">
            <Palette className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-zinc-900 dark:text-white">
              Design System
            </div>
            <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
              Tailwind v4 • OKLCH
            </div>
          </div>
        </div>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
      </div>

      <div className="flex items-center justify-between pt-2 pb-0.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700 dark:bg-white/[0.08] dark:text-zinc-200">
            <Calendar className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-zinc-900 dark:text-white">
              Hudbird v1.5.0
            </div>
            <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
              Production Ready • Accessible
            </div>
          </div>
        </div>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
      </div>
    </div>
  );
}

export function SplitIntroductionHero({
  content,
  config,
  id,
  headingLevel = "h1",
}: SplitIntroductionHeroProps) {
  const mode = useBrandMode();
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Active slide index & direction for smooth Shopify-style transitions
  const [[activeIdx, direction], setSlideState] = React.useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // Determine if image passed in config is a custom customer image or theme test image
  const isDefaultSvg = config.image?.src?.startsWith("data:image/svg+xml");
  const hasCustomImage = Boolean(config.image?.src && !isDefaultSvg);

  // Build the slides array
  const slides = React.useMemo(() => {
    if (hasCustomImage && config.image) {
      return [
        {
          id: "custom-slide-0",
          image: config.image,
          testimonial: defaultSplitSlides[0].testimonial,
        },
        ...defaultSplitSlides.slice(1),
      ];
    }
    return defaultSplitSlides;
  }, [hasCustomImage, config.image]);

  const currentSlide = slides[activeIdx] ?? slides[0];

  // Resolve light/dark src for current active slide
  const resolvedSrc =
    mode === "dark"
      ? (currentSlide.image.darkSrc ?? currentSlide.image.src)
      : currentSlide.image.src;

  React.useEffect(() => {
    setFailed(false);
  }, [resolvedSrc]);

  // Shopify-style carousel auto-advance every 6 seconds when not paused
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideState(([prev]) => [(prev + 1) % slides.length, 1]);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === activeIdx) return;
    const nextDir = nextIndex > activeIdx ? 1 : -1;
    setSlideState([nextIndex, nextDir]);
  };

  const handleReserve = (e: React.MouseEvent) => {
    if (content.primaryAction?.href && (!email || !email.includes("@"))) {
      // Let standard link anchor action work if user didn't enter email
      return;
    }
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3500);
  };

  const buttonLabel =
    content.primaryAction?.label && content.primaryAction.label !== "See the product demo"
      ? content.primaryAction.label
      : "Reserve My Spot";

  return (
    <Section id={id} spacing="lg" className="hb-section relative isolate overflow-hidden">
      <Container size="xl" gutter="lg" className="py-6 sm:py-10 lg:py-14">
        <Grid cols={2} gap="xl" align="center" className="[&>*]:min-w-0">
          {/* Left Column: Pill Badge, Editorial Title, Description, Email Form, Social Proof */}
          <div className="flex flex-col items-start text-left">
            {/* 1. iOS Launch Pill Badge with Apple Icon */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-100/80 px-3.5 py-1.5 text-xs font-medium text-zinc-900 shadow-2xs backdrop-blur-xs transition-colors dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200">
              <Apple className="h-3.5 w-3.5 shrink-0" />
              <span>Public launch on iOS soon</span>
            </div>

            {/* 2. Editorial Headline Title with Serif Italic Accent (Primary Hero Attraction) */}
            <Heading
              as={headingLevel}
              className="hb-heading text-4xl font-bold tracking-[-0.04em] text-balance text-zinc-950 sm:text-5xl md:text-6xl lg:text-[3.75rem] lg:leading-[1.08] xl:text-[4.25rem] dark:text-white"
            >
              {renderEditorialTitle(content.title)}
            </Heading>

            {/* 3. Short Description with Muted Gray Tone */}
            <Text className="mt-4 max-w-[42ch] text-base leading-relaxed font-normal text-zinc-600 sm:mt-5 sm:text-lg dark:text-zinc-400">
              {content.description}
            </Text>

            {/* 4. Capsule Email Input Form with Pill CTA Button */}
            <div className="mt-7 w-full max-w-md sm:mt-9">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email || !email.includes("@")) return;
                  setIsSubmitted(true);
                  setTimeout(() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }, 3500);
                }}
                className="relative flex items-center"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  variant="flat"
                  radius="full"
                  size="md"
                  aria-label="Enter your email"
                  className="w-full text-sm"
                  wrapperClassName="h-12 w-full bg-zinc-100/90 dark:bg-white/[0.07] border border-zinc-200/80 dark:border-white/10 p-1 pl-4.5 pr-1 shadow-2xs transition-all focus-within:ring-2 focus-within:ring-zinc-900/10 dark:focus-within:ring-white/10"
                  endContent={
                    <Button
                      type="submit"
                      href={content.primaryAction?.href}
                      aria-label={content.primaryAction?.label || "Reserve My Spot"}
                      onClick={handleReserve}
                      className="group hb-primary hb-cta relative h-10 shrink-0 overflow-hidden rounded-full bg-[var(--hb-accent,var(--primary,#2457d6))] px-5 text-xs font-semibold tracking-tight text-[var(--hb-on-accent,var(--primary-foreground,#ffffff))] shadow-xs transition-all hover:opacity-95 hover:shadow-md active:scale-95 sm:px-6 sm:text-sm"
                    >
                      {isSubmitted ? (
                        <span className="relative z-10 inline-flex items-center gap-1.5 font-semibold">
                          <Check className="h-4 w-4" />
                          Reserved!
                        </span>
                      ) : (
                        <span className="relative z-10 inline-flex items-center gap-1.5">
                          {buttonLabel}
                        </span>
                      )}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    </Button>
                  }
                />
              </form>
            </div>

            {/* 5. Social Proof: Overlapping User Avatars + 5,000+ Creatives Text */}
            <div className="mt-6 flex items-center gap-3.5 sm:mt-7">
              <div className="flex -space-x-2.5 overflow-hidden">
                {defaultSocialAvatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    role="presentation"
                    aria-hidden="true"
                    className="inline-block h-8 w-8 rounded-full object-cover shadow-2xs ring-2 ring-white sm:h-9 sm:w-9 dark:ring-zinc-950"
                  />
                ))}
              </div>
              <Text
                variant="small"
                className="text-xs font-normal text-zinc-600 sm:text-sm dark:text-zinc-400"
              >
                <strong className="font-semibold text-zinc-900 dark:text-white">
                  5,000+ creatives
                </strong>{" "}
                already signed up for beta
              </Text>
            </div>
          </div>

          {/* Right Column: High-End Photography Carousel + Floating Testimonial Card */}
          <div
            className="relative mx-auto w-full max-w-[560px] pt-4 lg:max-w-none lg:pt-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Visual Frame with Rounded Corners & Shadows (Taller than left text for full-photo presence) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-zinc-200/80 bg-zinc-950/[0.03] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.12)] sm:aspect-[4/5] sm:rounded-[36px] lg:aspect-auto lg:h-[620px] lg:rounded-[40px] xl:h-[660px] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)]">
              {failed || !resolvedSrc ? (
                <div
                  role="img"
                  aria-label={currentSlide.image.alt}
                  className="hb-media hb-radius bg-card text-muted-foreground border-border flex h-full w-full items-center justify-center border p-8 text-center"
                >
                  Image unavailable. Add your brand image.
                </div>
              ) : (
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIdx}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.35 },
                    }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <img
                      src={resolvedSrc}
                      alt={currentSlide.image.alt}
                      width={1440}
                      height={900}
                      loading="eager"
                      fetchPriority="high"
                      onError={() => setFailed(true)}
                      className="h-full w-full object-cover select-none"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Floating Diverse Cards Protruding on Desktop (Responsive, Positioned Up 50px & Left 15px) */}
            <div className="absolute right-3 bottom-3 left-3 z-20 sm:right-auto sm:bottom-[74px] sm:left-[-33px] sm:w-[260px] sm:max-w-[270px]">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-zinc-200/90 bg-white/95 p-3.5 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.14)] backdrop-blur-md sm:rounded-2xl sm:p-4 dark:border-white/10 dark:bg-zinc-900/95 dark:shadow-[0_20px_48px_-10px_rgba(0,0,0,0.55)]"
              >
                <SlideCardContent slideIndex={activeIdx} testimonial={currentSlide.testimonial} />
              </motion.div>
            </div>

            {/* Shopify-Style Slide Pagination Dots Below Image */}
            <div
              className="mt-5 flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Slide navigation"
            >
              {slides.map((_, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <Button
                    key={idx}
                    isIconOnly
                    size="sm"
                    variant="plain"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => goToSlide(idx)}
                    className="relative flex h-4 min-w-0 cursor-pointer items-center justify-center p-0 focus:outline-none"
                  >
                    <span
                      className={cn(
                        "block h-2 rounded-full transition-all duration-300",
                        isActive
                          ? "w-7 bg-zinc-900 dark:bg-white"
                          : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
