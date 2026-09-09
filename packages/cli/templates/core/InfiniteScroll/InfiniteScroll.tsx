// packages/core/src/components/InfiniteScroll/InfiniteScroll.tsx
"use client";
import * as React from "react";
import { cn } from "../../utils/cn";

export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content / children elements rendered inside the scrollable container.
   */
  children: React.ReactNode;
  /**
   * Callback invoked when the bottom detector sentinel enters viewport to fetch additional data.
   */
  next: () => void | Promise<void>;
  /**
   * Whether more data items are available to fetch.
   */
  hasMore: boolean;
  /**
   * Visual loading element displayed when loading more items.
   */
  loader?: React.ReactNode;
  /**
   * Optional message or node rendered when all data has been loaded (`hasMore === false`).
   */
  endMessage?: React.ReactNode;
  /**
   * Margin around the root sentinel element for triggering `next` earlier (e.g., '150px').
   * @default "100px"
   */
  rootMargin?: string;
  /**
   * IntersectionObserver threshold (0 to 1).
   * @default 0.1
   */
  threshold?: number;
  /**
   * Whether fetching is currently in flight to prevent duplicate calls.
   */
  isLoading?: boolean;
}

/**
 * InfiniteScroll Component
 * Modern, intersection-observer powered endless scroll container with automatic trigger detection.
 */
export const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      children,
      next,
      hasMore,
      loader,
      endMessage,
      rootMargin = "100px",
      threshold = 0.1,
      isLoading = false,
      className,
      ...props
    },
    ref
  ) => {
    const sentinelRef = React.useRef<HTMLDivElement | null>(null);
    const isFetchingRef = React.useRef(false);

    // Keep ref in sync with prop to prevent stale closures
    const nextRef = React.useRef(next);
    nextRef.current = next;

    React.useEffect(() => {
      isFetchingRef.current = isLoading;
    }, [isLoading]);

    React.useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || !hasMore) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0];
          if (target && target.isIntersecting && hasMore && !isFetchingRef.current) {
            isFetchingRef.current = true;
            try {
              const res = nextRef.current();
              if (res instanceof Promise) {
                res.finally(() => {
                  isFetchingRef.current = false;
                });
              } else {
                // Micro-debounce for synchronous callbacks
                setTimeout(() => {
                  isFetchingRef.current = false;
                }, 300);
              }
            } catch (err) {
              isFetchingRef.current = false;
              console.error("InfiniteScroll next() error:", err);
            }
          }
        },
        {
          root: null, // viewport or nearest scrollable ancestor
          rootMargin,
          threshold,
        }
      );

      observer.observe(sentinel);

      return () => {
        observer.disconnect();
      };
    }, [hasMore, rootMargin, threshold]);

    return (
      <div
        ref={ref}
        className={cn("w-full flex flex-col", className)}
        {...props}
      >
        {children}

        {/* Sentinel Detector & Loader / End Indicator */}
        <div ref={sentinelRef} className="w-full flex justify-center py-3 min-h-[32px]">
          {hasMore ? (
            loader ?? (
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-medium py-2">
                <svg
                  className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Loading more items...</span>
              </div>
            )
          ) : (
            endMessage ?? (
              <div className="text-center py-2 text-xs font-medium text-zinc-400 dark:text-zinc-600">
                You have reached the end of the list.
              </div>
            )
          )}
        </div>
      </div>
    );
  }
);

InfiniteScroll.displayName = "InfiniteScroll";
