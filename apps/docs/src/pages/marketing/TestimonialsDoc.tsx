import React from "react";
import { DocHeader } from "../../components/DocHeader";
import testimonialsCode from "../../../../../packages/marketing/src/components/Testimonials/Testimonials.tsx?raw";
import testimonialsFlatCode from "../../../../../packages/marketing/src/components/Testimonials/TestimonialsFlat.tsx?raw";
import testimonialsMarqueeCode from "../../../../../packages/marketing/src/components/Testimonials/TestimonialsMarquee.tsx?raw";
import testimonialsSideBySideCode from "../../../../../packages/marketing/src/components/Testimonials/TestimonialsSideBySide.tsx?raw";
import testimonialGlassCode from "../../../../../packages/marketing/src/components/Testimonials/TestimonialGlass.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import {
  Testimonials,
  TestimonialsFlat,
  TestimonialsMarquee,
  TestimonialsSideBySide,
  TestimonialGlass,
  DEFAULT_TESTIMONIALS,
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
    {
      prop: "glowClassName",
      type: "string",
      defaultVal: '"bg-blue-500/30"',
      description: "Override the background ambient glow blob color.",
    },
    {
      prop: "dotClassName",
      type: "string",
      defaultVal: '"bg-blue-500"',
      description: "Override the live indicator dot color in the section badge.",
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
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Subtitle */}
      <DocHeader
        category="Marketing"
        title="Testimonials"
        badge="Marketing"
        description="Build trust with your audience using this beautiful masonry-style testimonial grid. Fully responsive, supports native dark mode, and features smooth Framer Motion reveal animations."
      />

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

        <MarketingPreview title="Glassmorphic Testimonials" code={testimonialGlassCode}>
          <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-50 to-indigo-50/30 pb-12 dark:from-zinc-950 dark:to-indigo-950/20">
            <div className="bg-primary/10 absolute top-0 left-1/4 h-80 w-80 -translate-x-1/2 rounded-full blur-[100px]" />
            <div className="bg-primary/5 absolute right-1/4 bottom-0 h-80 w-80 translate-x-1/2 rounded-full blur-[100px]" />
            <TestimonialGlass testimonials={DEFAULT_TESTIMONIALS} />
          </div>
        </MarketingPreview>
      </div>

      {/* API Reference */}
      <div id="component-api" className="scroll-mt-24">
        <h2 className="font-outfit mb-6 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <div className="flex flex-col gap-10">
          <ApiTable title="Testimonials Props" rows={apiRows} />
          <ApiTable title="Testimonial Object Type" rows={testimonialTypeRows} />
        </div>
      </div>
    </div>
  );
}
