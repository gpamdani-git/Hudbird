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
  "inline-flex items-center justify-center font-medium select-none transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:active:scale-100 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-8 min-w-8 text-xs px-2",
        md: "h-9 min-w-9 text-sm px-2.5",
        lg: "h-11 min-w-11 text-base px-3.5",
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
    const endPages = Array.from(
      { length: boundaries },
      (_, i) => total - boundaries + 1 + i
    );

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
              return "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus-visible:ring-indigo-500";
            case "success":
              return "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 focus-visible:ring-emerald-500";
            case "danger":
              return "bg-rose-600 text-white shadow-xs hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 focus-visible:ring-rose-500";
            case "dark":
              return "bg-zinc-900 text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100";
            case "zinc":
            default:
              return "bg-zinc-800 text-white shadow-xs hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white focus-visible:ring-zinc-600";
          }
        case "bordered":
          switch (color) {
            case "primary":
              return "border-2 border-indigo-600 text-indigo-600 bg-indigo-50/50 dark:border-indigo-400 dark:text-indigo-400 dark:bg-indigo-950/40 focus-visible:ring-indigo-500";
            case "success":
              return "border-2 border-emerald-600 text-emerald-600 bg-emerald-50/50 dark:border-emerald-400 dark:text-emerald-400 dark:bg-emerald-950/40 focus-visible:ring-emerald-500";
            case "danger":
              return "border-2 border-rose-600 text-rose-600 bg-rose-50/50 dark:border-rose-400 dark:text-rose-400 dark:bg-rose-950/40 focus-visible:ring-rose-500";
            case "dark":
              return "border-2 border-zinc-900 text-zinc-900 bg-zinc-100/60 dark:border-zinc-100 dark:text-zinc-100 dark:bg-zinc-800/60 focus-visible:ring-zinc-900";
            case "zinc":
            default:
              return "border-2 border-zinc-700 text-zinc-800 bg-zinc-100/60 dark:border-zinc-300 dark:text-zinc-200 dark:bg-zinc-800/60 focus-visible:ring-zinc-600";
          }
        case "flat":
          switch (color) {
            case "primary":
              return "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 focus-visible:ring-indigo-500";
            case "success":
              return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 focus-visible:ring-emerald-500";
            case "danger":
              return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 focus-visible:ring-rose-500";
            case "dark":
              return "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 focus-visible:ring-zinc-900";
            case "zinc":
            default:
              return "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 focus-visible:ring-zinc-600";
          }
        case "light":
        default:
          switch (color) {
            case "primary":
              return "text-indigo-600 font-bold bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 focus-visible:ring-indigo-500";
            case "success":
              return "text-emerald-600 font-bold bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 focus-visible:ring-emerald-500";
            case "danger":
              return "text-rose-600 font-bold bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 focus-visible:ring-rose-500";
            case "dark":
              return "text-zinc-950 font-bold bg-zinc-100 dark:text-zinc-50 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus-visible:ring-zinc-900";
            case "zinc":
            default:
              return "text-zinc-800 font-bold bg-zinc-100 dark:text-zinc-200 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus-visible:ring-zinc-600";
          }
      }
    };

    // Inactive regular item styles
    const inactiveStyles =
      "text-zinc-600 dark:text-zinc-400 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-100 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600";

    const isFirstPage = activePage <= 1;
    const isLastPage = activePage >= total;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination Navigation"
        className={cn(
          "inline-flex items-center gap-1.5 p-1 rounded-2xl",
          isDisabled && "opacity-50 pointer-events-none",
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
              "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:text-zinc-950 dark:hover:text-white shadow-xs focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-zinc-950"
            )}
          >
            {prevContent ?? (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
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
                  "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 group"
                )}
              >
                <span className="group-hover:hidden tracking-widest text-xs">•••</span>
                <span className="hidden group-hover:inline text-xs font-semibold">
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
              "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:text-zinc-950 dark:hover:text-white shadow-xs focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-zinc-950"
            )}
          >
            {nextContent ?? (
              <span className="flex items-center gap-1">
                <span className="hidden sm:inline">Next</span>
                <svg
                  className="w-4 h-4"
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
