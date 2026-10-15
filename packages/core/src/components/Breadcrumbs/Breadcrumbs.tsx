// packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../utils/cn";

export type BreadcrumbsSize = "sm" | "md" | "lg";
export type BreadcrumbsVariant = "solid" | "bordered" | "light";
export type BreadcrumbsUnderline = "none" | "hover" | "always" | "active";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface BreadcrumbsContextValue {
  size: BreadcrumbsSize;
  separator: React.ReactNode;
  underline: BreadcrumbsUnderline;
  isDisabled: boolean;
}

const BreadcrumbsContext = React.createContext<BreadcrumbsContextValue>({
  size: "md",
  separator: <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />,
  underline: "hover",
  isDisabled: false,
});

export const useBreadcrumbsContext = () => React.useContext(BreadcrumbsContext);

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs (Root)
 * -----------------------------------------------------------------------------------------------*/

export const breadcrumbsVariants = cva("flex flex-wrap items-center", {
  variants: {
    variant: {
      light: "bg-transparent p-0",
      bordered:
        "border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 rounded-xl px-3 py-2 shadow-2xs backdrop-blur-sm",
      solid:
        "bg-zinc-100 dark:bg-zinc-800/80 rounded-xl px-3.5 py-2 text-zinc-800 dark:text-zinc-200",
    },
    size: {
      sm: "text-xs gap-1.5",
      md: "text-sm gap-2",
      lg: "text-base gap-2.5",
    },
  },
  defaultVariants: {
    variant: "light",
    size: "md",
  },
});

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof breadcrumbsVariants> {
  separator?: React.ReactNode;
  underline?: BreadcrumbsUnderline;
  isDisabled?: boolean;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  renderEllipsis?: () => React.ReactNode;
  children: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      separator = <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />,
      variant = "light",
      size = "md",
      underline = "hover",
      isDisabled = false,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      renderEllipsis,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const rawItems = React.Children.toArray(children).filter(Boolean);

    let displayItems = rawItems;
    if (maxItems && rawItems.length > maxItems) {
      const before = rawItems.slice(0, itemsBeforeCollapse);
      const after = rawItems.slice(rawItems.length - itemsAfterCollapse);
      const ellipsisNode = (
        <li
          key="breadcrumbs-ellipsis"
          className="flex items-center text-zinc-400 dark:text-zinc-500"
        >
          {renderEllipsis ? (
            renderEllipsis()
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          )}
          <span className="mx-1.5 flex items-center select-none" aria-hidden="true">
            {separator}
          </span>
        </li>
      );

      displayItems = [...before, ellipsisNode, ...after];
    }

    return (
      <BreadcrumbsContext.Provider
        value={{
          size: size || "md",
          separator,
          underline,
          isDisabled,
        }}
      >
        <nav ref={ref} aria-label="Breadcrumb" className={cn("w-fit", className)} {...props}>
          <ol className={cn(breadcrumbsVariants({ variant, size }))}>
            {displayItems.map((child, index) => {
              const isLast = index === displayItems.length - 1;
              return (
                <React.Fragment key={index}>
                  {child}
                  {!isLast && (
                    <li
                      aria-hidden="true"
                      className="flex items-center text-zinc-400 select-none dark:text-zinc-600"
                    >
                      {separator}
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </BreadcrumbsContext.Provider>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbItem
 * -----------------------------------------------------------------------------------------------*/

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
  isCurrent?: boolean;
  isDisabled?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onPress?: () => void;
  children: React.ReactNode;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      href,
      isCurrent = false,
      isDisabled: propDisabled = false,
      startContent,
      endContent,
      onPress,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const context = useBreadcrumbsContext();
    const disabled = propDisabled || context.isDisabled;

    const underlineClasses = {
      none: "no-underline",
      hover: "hover:underline",
      always: "underline",
      active: isCurrent ? "underline" : "no-underline",
    }[context.underline];

    const content = (
      <span className="flex items-center gap-1.5">
        {startContent && <span className="shrink-0">{startContent}</span>}
        <span>{children}</span>
        {endContent && <span className="shrink-0">{endContent}</span>}
      </span>
    );

    const handleClick = (e: React.MouseEvent<any>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onPress?.();
      onClick?.(e);
    };

    return (
      <li
        ref={ref}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(
          "inline-flex items-center transition-colors duration-150",
          isCurrent
            ? "cursor-default font-semibold text-zinc-900 dark:text-zinc-50"
            : disabled
              ? "pointer-events-none cursor-not-allowed text-zinc-400 dark:text-zinc-600"
              : "cursor-pointer text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
          className
        )}
        {...props}
      >
        {href && !isCurrent ? (
          <a
            href={href}
            onClick={handleClick}
            className={cn(
              "inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              underlineClasses
            )}
          >
            {content}
          </a>
        ) : (
          <span
            aria-current={isCurrent ? "page" : undefined}
            onClick={handleClick}
            className={cn(
              "inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              underlineClasses
            )}
          >
            {content}
          </span>
        )}
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
