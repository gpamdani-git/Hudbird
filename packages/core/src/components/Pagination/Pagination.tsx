// packages/core/src/components/Pagination/Pagination.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type PaginationVariant = "solid" | "bordered" | "flat" | "light";
export type PaginationColor = "primary" | "success" | "danger" | "dark" | "zinc";
export type PaginationSize = "sm" | "md" | "lg";
export type PaginationRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

const paginationItemVariants = cva(
  "inline-flex items-center justify-center font-medium select-none transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:active:scale-100 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-9 min-w-9 text-xs px-2.5",
        md: "h-11 min-w-11 text-sm px-3.5",
        lg: "h-13 min-w-13 text-base px-4",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "xl",
    },
  }
);

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Total number of pages.
   */
  total: number;
  /**
   * Current active page (1-indexed).
   */
  page?: number;
  /**
   * Initial page when uncontrolled.
   * @default 1
   */
  defaultPage?: number;
  /**
   * Number of sibling pages shown before and after the current page.
   * @default 1
   */
  siblings?: number;
  /**
   * Number of boundary pages shown at the start and end.
   * @default 1
   */
  boundaries?: number;
  /**
   * Visual styling variant.
   * @default "solid"
   */
  variant?: PaginationVariant;
  /**
   * Brand theme color for active item and highlights.
   * @default "primary"
   */
  color?: PaginationColor;
  /**
   * Sizing scale for buttons.
   * @default "md"
   */
  size?: PaginationSize;
  /**
   * Border radius tokens for buttons.
   * @default "xl"
   */
  radius?: PaginationRadius;
  /**
   * Whether to show Next and Prev arrow buttons.
   * @default true
   */
  showControls?: boolean;
  /**
   * Custom label or icon for Prev button.
   */
  prevContent?: React.ReactNode;
  /**
   * Custom label or icon for Next button.
   */
  nextContent?: React.ReactNode;
  /**
   * Whether the pagination controls are disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Callback fired when active page changes.
   */
  onChange?: (page: number) => void;
}

export type PaginationItemValue = number | "dots-left" | "dots-right";

/**
 * Generate pagination page items with smart logarithmic/dynamic ellipsis truncation
 */
function usePaginationRange({
  total,
  page,
  siblings = 1,
  boundaries = 1,
}: {
  total: number;
  page: number;
  siblings: number;
  boundaries: number;
}): PaginationItemValue[] {
  return React.useMemo(() => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

    if (total <= totalPageNumbers) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(page - siblings, boundaries + 1);
    const rightSiblingIndex = Math.min(page + siblings, total - boundaries);

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

    const startPages = Array.from({ length: boundaries }, (_, i) => i + 1);
    const endPages = Array.from({ length: boundaries }, (_, i) => total - boundaries + 1 + i);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots-right", ...endPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = siblings * 2 + boundaries + 2;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => total - rightItemCount + 1 + i
      );
      return [...startPages, "dots-left", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [...startPages, "dots-left", ...middleRange, "dots-right", ...endPages];
    }

    return Array.from({ length: total }, (_, i) => i + 1);
  }, [total, page, siblings, boundaries]);
}

/**
 * Pagination Component
 * Elegant, responsive page navigation with smart ellipsis calculation, multiple variants, and colors.
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      total,
      page: controlledPage,
      defaultPage = 1,
      siblings = 1,
      boundaries = 1,
      variant = "solid",
      color = "primary",
      size = "md",
      radius = "xl",
      showControls = true,
      prevContent,
      nextContent,
      isDisabled = false,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledPage, setUncontrolledPage] = React.useState(defaultPage);
    const isControlled = controlledPage !== undefined;
    const activePage = Math.min(
      Math.max(1, isControlled ? controlledPage : uncontrolledPage),
      Math.max(1, total)
    );

    const handlePageChange = (newPage: number) => {
      if (isDisabled) return;
      if (newPage < 1 || newPage > total || newPage === activePage) return;

      if (!isControlled) {
        setUncontrolledPage(newPage);
      }
      onChange?.(newPage);
    };

    const paginationRange = usePaginationRange({
      total: Math.max(1, total),
      page: activePage,
      siblings,
      boundaries,
    });

    // Color & Variant styles for active item
    const getActiveStyles = () => {
      switch (variant) {
        case "solid":
          switch (color) {
            case "primary":
              return "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 focus-visible:ring-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600";
            case "success":
              return "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 focus-visible:ring-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600";
            case "danger":
              return "bg-rose-600 text-white shadow-xs hover:bg-rose-700 focus-visible:ring-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600";
            case "dark":
              return "bg-zinc-950 text-white shadow-xs hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100";
            case "zinc":
            default:
              return "bg-zinc-900 text-white shadow-xs hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 focus-visible:ring-zinc-600";
          }
        case "bordered":
          switch (color) {
            case "primary":
              return "border border-indigo-600 text-indigo-700 bg-indigo-50/80 focus-visible:ring-indigo-600 dark:border-indigo-400 dark:text-indigo-400 dark:bg-indigo-500/15";
            case "success":
              return "border border-emerald-600 text-emerald-700 bg-emerald-50/80 focus-visible:ring-emerald-600 dark:border-emerald-400 dark:text-emerald-400 dark:bg-emerald-500/15";
            case "danger":
              return "border border-rose-600 text-rose-700 bg-rose-50/80 focus-visible:ring-rose-600 dark:border-rose-400 dark:text-rose-400 dark:bg-rose-500/15";
            case "dark":
              return "border border-zinc-950 text-zinc-950 bg-black/[0.04] dark:border-white/20 dark:text-white dark:bg-white/10 focus-visible:ring-zinc-950";
            case "zinc":
            default:
              return "border border-zinc-800 text-zinc-900 bg-black/[0.04] dark:border-white/20 dark:text-white dark:bg-white/10 focus-visible:ring-zinc-600";
          }
        case "flat":
          switch (color) {
            case "primary":
              return "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus-visible:ring-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 dark:hover:bg-indigo-500/25";
            case "success":
              return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus-visible:ring-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 dark:hover:bg-emerald-500/25";
            case "danger":
              return "bg-rose-50 text-rose-700 hover:bg-rose-100 focus-visible:ring-rose-600 dark:bg-rose-500/15 dark:text-rose-400 dark:hover:bg-rose-500/25";
            case "dark":
              return "bg-zinc-200 text-zinc-900 dark:bg-white/10 dark:text-white hover:bg-zinc-300 dark:hover:bg-white/15 focus-visible:ring-zinc-900";
            case "zinc":
            default:
              return "bg-zinc-200 text-zinc-800 dark:bg-white/10 dark:text-white hover:bg-zinc-300 dark:hover:bg-white/15 focus-visible:ring-zinc-600";
          }
        case "light":
        default:
          switch (color) {
            case "primary":
              return "text-indigo-700 font-semibold bg-indigo-50 hover:bg-indigo-100 focus-visible:ring-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/15 dark:hover:bg-indigo-500/25";
            case "success":
              return "text-emerald-700 font-semibold bg-emerald-50 hover:bg-emerald-100 focus-visible:ring-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25";
            case "danger":
              return "text-rose-700 font-semibold bg-rose-50 hover:bg-rose-100 focus-visible:ring-rose-600 dark:text-rose-400 dark:bg-rose-500/15 dark:hover:bg-rose-500/25";
            case "dark":
              return "text-zinc-950 font-semibold bg-black/[0.04] dark:text-white dark:bg-white/10 hover:bg-black/[0.06] dark:hover:bg-white/15 focus-visible:ring-zinc-900";
            case "zinc":
            default:
              return "text-zinc-900 font-semibold bg-black/[0.04] dark:text-white dark:bg-white/10 hover:bg-black/[0.06] dark:hover:bg-white/15 focus-visible:ring-zinc-600";
          }
      }
    };

    // Inactive regular item styles
    const inactiveStyles =
      "text-zinc-600 dark:text-zinc-400 bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-zinc-950 dark:hover:text-zinc-100 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600";

    const isFirstPage = activePage <= 1;
    const isLastPage = activePage >= total;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination Navigation"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-2xl p-1",
          isDisabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {/* Previous Button */}
        {showControls && (
          <button
            type="button"
            aria-label="Previous page"
            disabled={isDisabled || isFirstPage}
            onClick={() => handlePageChange(activePage - 1)}
            className={cn(
              paginationItemVariants({ size, radius }),
              "border border-black/[0.06] bg-white text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-zinc-950 focus-visible:ring-indigo-500 dark:border-white/[0.08] dark:bg-[#161618] dark:text-zinc-300 dark:hover:bg-[#202124] dark:hover:text-white dark:focus-visible:ring-offset-[#161618]"
            )}
          >
            {prevContent ?? (
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 -translate-x-[0.5px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline">Prev</span>
              </span>
            )}
          </button>
        )}

        {/* Page Items & Ellipsis */}
        {paginationRange.map((item, index) => {
          if (item === "dots-left" || item === "dots-right") {
            const jumpTarget =
              item === "dots-left"
                ? Math.max(1, activePage - siblings * 2 - 1)
                : Math.min(total, activePage + siblings * 2 + 1);

            return (
              <button
                key={`dots-${index}-${item}`}
                type="button"
                title={`Jump to page ${jumpTarget}`}
                aria-label={`Jump ${item === "dots-left" ? "backward" : "forward"}`}
                disabled={isDisabled}
                onClick={() => handlePageChange(jumpTarget)}
                className={cn(
                  paginationItemVariants({ size, radius }),
                  "group text-zinc-400 hover:bg-black/[0.04] hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
                )}
              >
                <span className="text-xs tracking-widest group-hover:hidden">•••</span>
                <span className="hidden text-xs font-semibold group-hover:inline">
                  {item === "dots-left" ? "«" : "»"}
                </span>
              </button>
            );
          }

          const isActive = item === activePage;

          return (
            <button
              key={`page-${item}`}
              type="button"
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${item}`}
              disabled={isDisabled}
              onClick={() => handlePageChange(item as number)}
              className={cn(
                paginationItemVariants({ size, radius }),
                isActive ? getActiveStyles() : inactiveStyles
              )}
            >
              {item}
            </button>
          );
        })}

        {/* Next Button */}
        {showControls && (
          <button
            type="button"
            aria-label="Next page"
            disabled={isDisabled || isLastPage}
            onClick={() => handlePageChange(activePage + 1)}
            className={cn(
              paginationItemVariants({ size, radius }),
              "border border-black/[0.06] bg-white text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-zinc-950 focus-visible:ring-indigo-500 dark:border-white/[0.08] dark:bg-[#161618] dark:text-zinc-300 dark:hover:bg-[#202124] dark:hover:text-white dark:focus-visible:ring-offset-[#161618]"
            )}
          >
            {nextContent ?? (
              <span className="flex items-center gap-1">
                <span className="hidden sm:inline">Next</span>
                <svg
                  className="h-4 w-4 translate-x-[0.5px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            )}
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
