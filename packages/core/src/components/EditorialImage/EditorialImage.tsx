// packages/core/src/components/EditorialImage/EditorialImage.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const editorialImageVariants = cva("group relative overflow-hidden select-none box-border", {
  variants: {
    aspectRatio: {
      "16/9": "aspect-[16/9]",
      "4/3": "aspect-[4/3]",
      "1/1": "aspect-square",
      "3/2": "aspect-[3/2]",
      "21/9": "aspect-[21/9]",
      auto: "",
    },
    radius: {
      none: "rounded-none",
      md: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl",
    },
    hasBorder: {
      true: "border border-zinc-200/80 dark:border-white/[0.08]",
      false: "",
    },
  },
  defaultVariants: {
    aspectRatio: "16/9",
    radius: "lg",
    hasBorder: true,
  },
});

export interface EditorialImageProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof editorialImageVariants> {
  src: string;
  alt: string;
  badge?: React.ReactNode;
  captionTitle?: React.ReactNode;
  captionSubtitle?: React.ReactNode;
  overlayGradient?: boolean;
  isZoomable?: boolean;
  classNames?: {
    container?: string;
    image?: string;
    overlay?: string;
    innerRing?: string;
    badge?: string;
    captionWrapper?: string;
    captionTitle?: string;
    captionSubtitle?: string;
  };
}

export const EditorialImage = React.forwardRef<HTMLDivElement, EditorialImageProps>(
  (
    {
      src,
      alt,
      badge,
      captionTitle,
      captionSubtitle,
      aspectRatio = "16/9",
      radius = "lg",
      hasBorder = true,
      overlayGradient = false,
      isZoomable = true,
      className,
      classNames,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          editorialImageVariants({ aspectRatio, radius, hasBorder }),
          classNames?.container,
          className
        )}
        {...props}
      >
        {/* Core Media with Editorial Color Grading and Cinematic Hover Scale */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover object-center contrast-[1.04] saturate-[0.88] will-change-transform",
            isZoomable &&
              "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
            classNames?.image
          )}
        />

        {/* Studio Inset Optical 1px Ring */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 ring-1 ring-black/10 ring-inset dark:ring-white/10",
            radius === "xl"
              ? "rounded-3xl"
              : radius === "lg"
                ? "rounded-2xl"
                : radius === "md"
                  ? "rounded-xl"
                  : "rounded-none",
            classNames?.innerRing
          )}
          aria-hidden="true"
        />

        {/* Optional Studio Badge (Top-Right or Custom) */}
        {badge && (
          <div className={cn("absolute top-3.5 right-3.5 z-20", classNames?.badge)}>{badge}</div>
        )}

        {/* Optional Overlay Gradient & Captions */}
        {(overlayGradient || captionTitle || captionSubtitle) && (
          <div
            className={cn(
              "absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white sm:p-6",
              classNames?.overlay
            )}
          >
            <div className={cn("space-y-1", classNames?.captionWrapper)}>
              {captionTitle && (
                <div
                  className={cn(
                    "text-base font-bold tracking-tight text-white sm:text-lg",
                    classNames?.captionTitle
                  )}
                >
                  {captionTitle}
                </div>
              )}
              {captionSubtitle && (
                <div
                  className={cn(
                    "text-xs font-medium text-zinc-300 sm:text-sm",
                    classNames?.captionSubtitle
                  )}
                >
                  {captionSubtitle}
                </div>
              )}
            </div>
          </div>
        )}

        {children}
      </div>
    );
  }
);

EditorialImage.displayName = "EditorialImage";
