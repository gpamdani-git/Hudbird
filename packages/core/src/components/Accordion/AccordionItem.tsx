// packages/core/src/components/Accordion/AccordionItem.tsx
"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type AccordionVariant = "light" | "shadow" | "bordered" | "splitted";

export interface AccordionContextValue {
  selectedKeys: Set<string>;
  toggleKey: (key: string) => void;
  variant: AccordionVariant;
  isCompact: boolean;
  isDisabled: boolean;
  showDivider: boolean;
}

export const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  return React.useContext(AccordionContext);
}

export const accordionItemVariants = cva("transition-colors duration-150", {
  variants: {
    variant: {
      light: "border-b border-zinc-200/80 dark:border-white/[0.08] last:border-b-0",
      bordered: "border-b border-zinc-200/70 dark:border-white/[0.06] last:border-b-0",
      shadow:
        "bg-white dark:bg-[#161618] text-zinc-900 dark:text-zinc-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)] hover:shadow-md border border-zinc-200/90 dark:border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-200",
      splitted:
        "bg-white dark:bg-[#161618] text-zinc-900 dark:text-zinc-100 border border-zinc-200/90 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_4px_0_rgba(0,0,0,0.04)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  itemKey?: string;
  value?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  startContent?: React.ReactNode;
  indicator?: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode);
  hideIndicator?: boolean;
  isDisabled?: boolean;
  classNames?: {
    base?: string;
    trigger?: string;
    titleWrapper?: string;
    title?: string;
    subtitle?: string;
    indicator?: string;
    content?: string;
  };
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      className,
      classNames,
      itemKey,
      value,
      title,
      subtitle,
      startContent,
      indicator,
      hideIndicator = false,
      isDisabled: propDisabled = false,
      children,
      id: customId,
      ...props
    },
    ref
  ) => {
    const context = useAccordionContext();
    const generatedId = React.useId();

    const actualKey = itemKey || value || customId || generatedId;

    const isOpen = context ? context.selectedKeys.has(actualKey) : false;
    const isDisabled = propDisabled || (context?.isDisabled ?? false);
    const variant = context?.variant || "light";
    const isCompact = context?.isCompact || false;

    const triggerId = `${generatedId}-trigger`;
    const contentId = `${generatedId}-content`;

    const handleToggle = () => {
      if (!isDisabled && context) {
        context.toggleKey(actualKey);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          accordionItemVariants({ variant }),
          isDisabled ? "pointer-events-none opacity-50" : "",
          classNames?.base,
          className
        )}
        {...props}
      >
        <h3 className="m-0 p-0 font-normal">
          <button
            type="button"
            id={triggerId}
            aria-expanded={isOpen}
            aria-controls={contentId}
            aria-disabled={isDisabled ? true : undefined}
            disabled={isDisabled}
            onClick={handleToggle}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between gap-3 text-left transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] select-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.995]",
              variant === "light"
                ? isCompact
                  ? "px-1 py-2.5 hover:text-zinc-950 dark:hover:text-zinc-50"
                  : "px-1 py-4 hover:text-zinc-950 dark:hover:text-zinc-50"
                : isCompact
                  ? "rounded-xl px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  : "min-h-[52px] rounded-xl px-6 py-4.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
              classNames?.trigger
            )}
          >
            {startContent && (
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                  isOpen
                    ? "bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-white"
                    : "bg-black/[0.03] text-zinc-500 dark:bg-white/[0.04] dark:text-zinc-400"
                )}
              >
                {startContent}
              </span>
            )}

            <div className={cn("flex min-w-0 flex-1 flex-col text-left", classNames?.titleWrapper)}>
              <span
                className={cn(
                  "truncate tracking-tight transition-colors duration-150",
                  isOpen
                    ? "font-semibold text-zinc-950 dark:text-white"
                    : "font-medium text-zinc-900 dark:text-zinc-100",
                  isCompact ? "text-sm" : "text-base",
                  classNames?.title
                )}
              >
                {title}
              </span>
              {subtitle && (
                <span
                  className={cn(
                    "mt-0.5 text-xs text-zinc-500 dark:text-zinc-400",
                    classNames?.subtitle
                  )}
                >
                  {subtitle}
                </span>
              )}
            </div>

            {!hideIndicator && (
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:text-zinc-500",
                  isOpen
                    ? "rotate-180 bg-black/[0.04] text-zinc-950 dark:bg-white/10 dark:text-white"
                    : "hover:bg-black/[0.02] dark:hover:bg-white/[0.04]",
                  classNames?.indicator
                )}
              >
                {typeof indicator === "function" ? (
                  indicator({ isOpen })
                ) : indicator ? (
                  indicator
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            )}
          </button>
        </h3>

        {/* Collapsible Content */}
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className={cn(
            "grid overflow-hidden text-zinc-600 transition-all duration-200 ease-in-out dark:text-zinc-400",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "pb-4 text-sm leading-relaxed",
                variant === "light"
                  ? isCompact
                    ? "px-1 pt-1 pb-3"
                    : "px-1 pt-1 pb-5"
                  : isCompact
                    ? "px-4 pt-1 pb-3"
                    : "px-6 pt-1 pb-5",
                classNames?.content
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";
