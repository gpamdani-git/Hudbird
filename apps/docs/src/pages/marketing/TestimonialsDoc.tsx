import React from "react";
import testimonialsCode from "../../../../../packages/marketing/src/components/Testimonials/Testimonials.tsx?raw";
import testimonialsFlatCode from "../../../../../packages/marketing/src/components/Testimonials/TestimonialsFlat.tsx?raw";
import testimonialsMarqueeCode from "../../../../../packages/marketing/src/components/Testimonials/TestimonialsMarquee.tsx?raw";
import testimonialsSideBySideCode from "../../../../../packages/marketing/src/components/Testimonials/TestimonialsSideBySide.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import {
  Testimonials,
  TestimonialsFlat,
  TestimonialsMarquee,
  TestimonialsSideBySide,
} from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import { ChevronRight, Menu } from "lucide-react";
import skillContent from "../../../../../.agents/skills/marketing-testimonials/SKILL.md?raw";

export default function TestimonialsDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const apiRows: ApiPropRow[] = [
    {
      prop: "title",
      type: "string",
      defaultVal: '"What They\'re Saying"',
      description: "The main heading of the testimonials section.",
    },
    {
      prop: "description",
      type: "string",
      defaultVal: '""',
      description: "Optional subheading/description text displayed below the title.",
    },
    {
      prop: "testimonials",
      type: "Testimonial[]",
      defaultVal: "DEFAULT_TESTIMONIALS",
      description: "Array of testimonial objects containing data for each card.",
    },
    {
      prop: "className",
      type: "string",
      defaultVal: "undefined",
      description: "Additional CSS classes to apply to the root section element.",
    },
  ];

  const testimonialTypeRows: ApiPropRow[] = [
    {
      prop: "id",
      type: "string | number",
      defaultVal: "required",
      description: "Unique identifier for the testimonial.",
    },
    {
      prop: "content",
      type: "string | React.ReactNode",
      defaultVal: "required",
      description: "The main body text of the testimonial quote.",
    },
    {
      prop: "author",
      type: "string",
      defaultVal: "required",
      description: "The name of the person giving the testimonial.",
    },
    {
      prop: "role",
      type: "string",
      defaultVal: "required",
      description: "The author's job title or company.",
    },
    {
      prop: "avatar",
      type: "string",
      defaultVal: "undefined",
      description: "URL to the author's avatar image.",
    },
    {
      prop: "featured",
      type: "boolean",
      defaultVal: "false",
      description: "If true, renders as a large, highlighted featured card.",
    },
    {
      prop: "featuredImage",
      type: "string",
      defaultVal: "undefined",
      description: "URL for the background image of a featured card.",
    },
    {
      prop: "featuredTitle",
      type: "string",
      defaultVal: "undefined",
      description: "Heading text displayed inside a featured card.",
    },
  ];

  return (
    <div className="flex w-full flex-col pb-20">
      {/* Header section with breadcrumbs and description */}
      <div className="sticky top-14 z-30 mb-8 w-full border-b border-zinc-200/50 bg-white/80 px-4 py-4 backdrop-blur-md transition-all sm:px-6 lg:px-8 dark:border-zinc-800/50 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="-ml-1.5 rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>
          )}
          <span>Marketing section</span>
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-100">Testimonials</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-10">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Testimonials
          </h1>
          <p className="max-w-3xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Build trust with your audience using this beautiful masonry-style testimonial grid.
            Fully responsive, supports native dark mode, and features smooth Framer Motion reveal
            animations.
          </p>
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="testimonials" manualCode={testimonialsCode} />
        </div>

        <div className="flex flex-col gap-16">
          <MarketingPreview title="Masonry Grid" skill={skillContent} code={testimonialsCode}>
            <Testimonials />
          </MarketingPreview>

          <MarketingPreview title="Flat Grid" code={testimonialsFlatCode}>
            <TestimonialsFlat />
          </MarketingPreview>

          <MarketingPreview title="Infinite Marquee" code={testimonialsMarqueeCode}>
            <TestimonialsMarquee />
          </MarketingPreview>

          <MarketingPreview title="Side by Side" code={testimonialsSideBySideCode}>
            <TestimonialsSideBySide />
          </MarketingPreview>
        </div>

        {/* API Reference */}
        <div id="component-api" className="mt-20 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
            Component API
          </h2>
          <div className="flex flex-col gap-10">
            <ApiTable title="Testimonials Props" rows={apiRows} />
            <ApiTable title="Testimonial Object Type" rows={testimonialTypeRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
