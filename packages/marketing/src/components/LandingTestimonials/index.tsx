"use client";
import * as React from "react";
import { Avatar, Badge, Button, Card, CardBody, Divider, Grid, Heading, Text } from "@hudbird/ui";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  Quote,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingHeading } from "../LandingShared";
import { cn } from "../../utils/cn";

// Default 5 testimonials matching Image Reference 1 specifications
const singleTestimonials = [
  {
    id: "quote-1",
    quote:
      "All I can say until this point is that Ruul is trustworthy and their services are outstanding. Keep up the good work guys! Thank you!",
    source: "Adrian Lazea",
    context: "QA Engineer",
  },
  {
    id: "quote-2",
    quote:
      "Hudbird reduced our design-to-production turnaround from weeks to hours. The micro-interactions and accessibility are peerless.",
    source: "Elena Vance",
    context: "VP of Product at FinScale",
  },
  {
    id: "quote-3",
    quote:
      "The cleanest React code generation I've seen in any design system. Zero runtime overhead, pure Tailwind v4, and instantaneous export.",
    source: "David Sterling",
    context: "Founding Engineer at Veloce",
  },
  {
    id: "quote-4",
    quote:
      "Our engineering velocity jumped 3x within our first sprint. Every single block conforms to strict WCAG AA standards out of the box.",
    source: "Marcus Chen",
    context: "Lead Architect at CloudPulse",
  },
  {
    id: "quote-5",
    quote:
      "Finally, a component system that doesn't force compromise between design taste and engineering rigor. Simply extraordinary.",
    source: "Sophia Laurent",
    context: "Head of Design at Lumina",
  },
];

// Single card metrics matching Image Reference 1
const singleMetrics = [
  {
    label: "Over $1billion processed in total transactions.",
    value: "$1.18bn",
  },
  {
    label: "Trusted by 240,000 contractors worldwide.",
    value: "240k",
  },
  {
    label: "96.4% of users report being satisfied with Ruul.",
    value: "96.4%",
  },
];

// Featured spotlight video testimonials (Image Reference 4 & 2)
const featuredSpotlights = [
  {
    id: "spotlight-1",
    quote:
      "Before Hudbird, I had to double-check everything before leaving to production. Now our team composes complete verified pages in minutes.",
    author: "Aulia Vance",
    role: "Interior & Systems Designer",
    company: "Studio Alivio",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoDuration: "1:24",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "spotlight-2",
    quote:
      "The design system and Tailwind v4 architecture made our entire product interface feel crisp, intentional, and unmistakably premium.",
    author: "Jack Sterling",
    role: "Lead Product Architect",
    company: "Veloce Technologies",
    avatar:
      "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=300",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoDuration: "2:08",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
];

// Collection cards with video & signatures (Image Reference 2 & 3)
const collectionCards = [
  {
    id: "card-1",
    type: "quote" as const,
    author: "Kane Williamson",
    role: "Lead Designer",
    handle: "@kanew",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    quote:
      "This adventure exceeded all my expectations and gave me workflows I'll cherish forever. Hudbird is our secret weapon.",
    date: "09/30/2026",
    rating: 5,
  },
  {
    id: "card-2",
    type: "video" as const,
    author: "Kane Williamson",
    role: "Lead Designer",
    handle: "@kanew",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    image:
      "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoDuration: "1:42",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    date: "09/30/2026",
    rating: 5,
  },
  {
    id: "card-3",
    type: "editorial" as const,
    author: "Patrick Nawrocki",
    role: "UX Manager at Superhabits",
    signature: "Patrick Nawrocki",
    avatar:
      "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=300",
    quote:
      "The lovely team at Hudbird has provided our startup with significant leverage. Their work is exceptionally professional and always spot on!",
    date: "10/12/2026",
    rating: 5,
  },
  {
    id: "card-4",
    type: "editorial" as const,
    author: "Rob West",
    role: "CEO of Kingdom Advisors",
    signature: "Rob West",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    quote:
      "Hudbird has greatly exceeded our expectations. The turnaround is lightning quick, and the generated code integrates seamlessly into production.",
    date: "10/18/2026",
    rating: 5,
  },
];

export function LandingTestimonials({
  variant = "single",
  content,
}: LandingSectionProps<"testimonials">) {
  // ----------------------------------------------------
  // Single Card Carousel State (Image Reference 1)
  // ----------------------------------------------------
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [isHovered, setIsHovered] = React.useState(false);
  const singleCardRef = React.useRef<HTMLDivElement>(null);
  const isSingleCardInView = useInView(singleCardRef, { margin: "100px 0px" });

  // Use content items if available and 5+ items, or default singleTestimonials
  const activeTestimonials =
    content.items && content.items.length >= 5 ? content.items : singleTestimonials;

  // Auto-advance Shopify smooth slide from left-to-right
  React.useEffect(() => {
    if (variant !== "single" && variant !== (undefined as unknown as string)) return;
    if (isHovered || !isSingleCardInView) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % activeTestimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [variant, isHovered, isSingleCardInView, activeTestimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? activeTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % activeTestimonials.length);
  };

  // ----------------------------------------------------
  // Featured Spotlight State (Variant 2)
  // ----------------------------------------------------
  const [featuredIdx, setFeaturedIdx] = React.useState(0);

  // ----------------------------------------------------
  // Video Popup Modal State (Works 100% Ready)
  // ----------------------------------------------------
  const [activeVideo, setActiveVideo] = React.useState<{
    title: string;
    author: string;
    role: string;
    videoUrl: string;
  } | null>(null);

  const activeTestimonial = activeTestimonials[currentIdx] || activeTestimonials[0];

  return (
    <LandingFrame id="testimonials">
      {/* ========================================================
          VARIANT 1: SINGLE CARD TESTIMONIAL (Image Reference 1)
          Exact match to Reference: 1-col centered card, large quote,
          author info, chevron buttons, 3 stat rows with dividers.
          Without badges, without extra text.
         ======================================================== */}
      {(!variant || variant === "single") && (
        <div className="py-6 sm:py-10">
          <div className="mx-auto w-full max-w-4xl">
            <div
              ref={singleCardRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={cn(
                "group/single-card relative overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white/95 p-8 sm:rounded-[40px] sm:p-14 lg:p-16",
                "shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-300",
                "dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
              )}
            >
              {/* Testimonial Quote Area */}
              <div className="flex min-h-[140px] items-center sm:min-h-[170px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIdx}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({
                        x: d > 0 ? 40 : -40,
                        opacity: 0,
                        filter: "blur(4px)",
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: {
                          x: { type: "spring", stiffness: 320, damping: 32 },
                          opacity: { duration: 0.4 },
                          filter: { duration: 0.25 },
                        },
                      },
                      exit: (d: number) => ({
                        x: d > 0 ? -40 : 40,
                        opacity: 0,
                        filter: "blur(4px)",
                        transition: {
                          x: { type: "spring", stiffness: 320, damping: 32 },
                          opacity: { duration: 0.25 },
                          filter: { duration: 0.2 },
                        },
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <Text
                      as="blockquote"
                      className="m-0 text-2xl leading-[1.35] font-medium tracking-tight text-zinc-700 transition-colors duration-300 group-hover/single-card:text-zinc-950 sm:text-3xl lg:text-[34px] dark:text-zinc-300 dark:group-hover/single-card:text-white"
                    >
                      {activeTestimonial.quote}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Author & Controls Row (Space Between) */}
              <div className="mt-8 flex items-center justify-between sm:mt-10">
                <div>
                  <div className="text-sm font-semibold tracking-tight text-zinc-900 sm:text-base dark:text-white">
                    {activeTestimonial.source}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {activeTestimonial.context}
                  </div>
                </div>

                {/* Circular Chevron Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="bordered"
                    size="sm"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="h-10 w-10 rounded-full border border-zinc-200/90 p-0 text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/30 dark:hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="bordered"
                    size="sm"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="h-10 w-10 rounded-full border border-blue-500 bg-blue-500/10 p-0 text-blue-600 transition-all hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-black"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Divider between testimonial and metrics */}
              <div className="my-8 h-px w-full bg-zinc-100 sm:my-10 dark:bg-white/[0.08]" />

              {/* 3 Metric Rows separated by horizontal dividers */}
              <div className="space-y-6 sm:space-y-7">
                {singleMetrics.map((stat, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <Text className="max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                        {stat.label}
                      </Text>
                      <span className="shrink-0 font-serif text-4xl font-normal tracking-tight text-zinc-950 sm:text-5xl lg:text-[54px] dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    {idx < singleMetrics.length - 1 && (
                      <div className="h-px w-full bg-zinc-100 dark:bg-white/[0.08]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          VARIANT 2: FEATURED VIDEO STORY (Image Reference 4 & 2)
          Split card with photo/video preview on right and playable
          popup video modal.
         ======================================================== */}
      {variant === "featured" && (
        <div className="space-y-8 sm:space-y-12">
          <LandingHeading
            eyebrow="Testimonials"
            title={content.title || "Discover how teams transform their workflow"}
            description={
              content.description ||
              "Real customer stories, verified performance metrics, and production-tested results."
            }
          />

          {(() => {
            const item = featuredSpotlights[featuredIdx] || featuredSpotlights[0];
            return (
              <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white/95 p-6 shadow-xl backdrop-blur-2xl sm:rounded-[36px] sm:p-10 lg:p-12 dark:border-white/10 dark:bg-zinc-950/90">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Column: Quote & Author */}
                  <div className="flex w-full flex-col justify-between space-y-6 lg:w-[48%]">
                    <div>
                      <div className="mb-4 flex items-center gap-1 text-amber-400">
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <Text
                        as="blockquote"
                        className="text-xl leading-snug font-medium tracking-tight text-zinc-900 sm:text-2xl lg:text-3xl dark:text-white"
                      >
                        “{item.quote}”
                      </Text>
                    </div>

                    <div className="flex items-center gap-4 border-t border-zinc-100 pt-6 dark:border-white/[0.08]">
                      <Avatar src={item.avatar} name={item.author} size="lg" />
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {item.author}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {item.role} • {item.company}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="bordered"
                        size="sm"
                        onClick={() =>
                          setFeaturedIdx((prev) =>
                            prev === 0 ? featuredSpotlights.length - 1 : prev - 1
                          )
                        }
                        className="h-9 w-9 rounded-full p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="bordered"
                        size="sm"
                        onClick={() =>
                          setFeaturedIdx((prev) => (prev + 1) % featuredSpotlights.length)
                        }
                        className="h-9 w-9 rounded-full p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: High Quality Pexels Photo with Video Play Overlay */}
                  <div
                    onClick={() =>
                      setActiveVideo({
                        title: `Customer Story: ${item.author}`,
                        author: item.author,
                        role: item.role,
                        videoUrl: item.videoUrl,
                      })
                    }
                    className="group/video relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/80 shadow-inner sm:aspect-[4/3] lg:w-[48%] dark:border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.author}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Circular Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover/video:scale-110">
                        <Play className="ml-1 h-6 w-6 fill-current text-zinc-900" />
                      </div>
                    </div>

                    {/* Video Duration Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <Play className="h-3 w-3 fill-current" />
                      <span>Watch Story • {item.videoDuration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================
          VARIANT 3: COLLECTION CARDS WITH VIDEO & SIGNATURES
          (Image Reference 2 & 3)
         ======================================================== */}
      {variant === "collection" && (
        <div className="space-y-8 sm:space-y-12">
          {/* Header Row with Contact Sales CTA (Image Reference 2) */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                TESTIMONIALS
              </span>
              <Heading
                as="h2"
                className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl dark:text-white"
              >
                Chosen by 14k+ growing businesses worldwide!
              </Heading>
            </div>
            <Button
              variant="solid"
              size="sm"
              className="shrink-0 self-start rounded-full px-5 py-2 text-xs font-medium shadow-sm sm:self-auto"
            >
              Contact Sales
            </Button>
          </div>

          {/* 3-4 Cards Grid (Image Reference 2 & 3) */}
          <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
            {collectionCards.slice(0, 3).map((card) => {
              // Video Card (Image Reference 2 center card)
              if (card.type === "video") {
                return (
                  <div
                    key={card.id}
                    onClick={() =>
                      setActiveVideo({
                        title: `Featured Review: ${card.author}`,
                        author: card.author,
                        role: card.role,
                        videoUrl: card.videoUrl,
                      })
                    }
                    className="group/videocard relative flex min-h-[360px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 p-6 shadow-md transition-all duration-300 hover:shadow-xl md:w-1/3 dark:border-white/10"
                  >
                    <img
                      src={card.image}
                      alt={card.author}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/videocard:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

                    {/* Top Author Details */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={card.avatar} name={card.author} size="sm" />
                        <div>
                          <div className="text-sm font-semibold text-white">{card.author}</div>
                          <div className="text-[11px] text-zinc-300">{card.role}</div>
                        </div>
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Center Play Button */}
                    <div className="relative z-10 my-auto flex items-center justify-center py-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover/videocard:scale-110">
                        <Play className="ml-1 h-5 w-5 fill-current" />
                      </div>
                    </div>

                    {/* Bottom Stars & Date */}
                    <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star key={s} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-mono text-[11px] text-zinc-300">{card.date}</span>
                    </div>
                  </div>
                );
              }

              // Standard Quote Card & Editorial Signature Card
              return (
                <div
                  key={card.id}
                  className="flex min-h-[360px] w-full flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md md:w-1/3 dark:border-white/10 dark:bg-zinc-950/90"
                >
                  <div>
                    {/* Top Author Details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={card.avatar} name={card.author} size="sm" />
                        <div>
                          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {card.author}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {card.role}
                          </div>
                        </div>
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                        <Quote className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Quote Text */}
                    <Text
                      as="blockquote"
                      className="mt-6 text-sm leading-relaxed font-medium text-zinc-700 sm:text-base dark:text-zinc-300"
                    >
                      “{card.quote}”
                    </Text>
                  </div>

                  {/* Bottom: Signature / Stars & Date */}
                  <div className="mt-8 border-t border-zinc-100 pt-4 dark:border-white/[0.08]">
                    {card.type === "editorial" && card.signature && (
                      <div className="mb-3 font-serif text-lg tracking-wide text-zinc-800 italic dark:text-zinc-200">
                        {card.signature}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star key={s} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                        {card.date}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          VIDEO POPUP MODAL (100% Works Ready)
         ======================================================== */}
      <AnimatePresence>
        {activeVideo && (
          <div
            className="absolute -inset-4 z-50 flex min-h-[540px] items-center justify-center p-4 sm:-inset-8 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 rounded-3xl bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950 p-4 shadow-2xl sm:p-6"
            >
              {/* Modal Top Bar */}
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{activeVideo.title}</h3>
                    <p className="text-xs text-zinc-400">
                      {activeVideo.author} • {activeVideo.role}
                    </p>
                  </div>
                </div>
                <Button
                  variant="bordered"
                  size="sm"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video"
                  className="h-8 w-8 rounded-full border-white/10 p-0 text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Modal Footer info */}
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Verified Customer Experience</span>
                </div>
                <span className="font-mono text-[11px] text-zinc-500">Hudbird Video Showcase</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </LandingFrame>
  );
}
