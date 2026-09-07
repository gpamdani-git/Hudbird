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
      light: "border-b border-zinc-200 dark:border-zinc-800 last:border-b-0",
      bordered: "border-b border-zinc-200 dark:border-zinc-800 last:border-b-0",
      shadow:
        "bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl mb-2 last:mb-0",
      splitted:
        "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-3 shadow-xs last:mb-0",
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
          isDisabled ? "opacity-50 pointer-events-none" : "",
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
              "flex w-full items-center justify-between gap-3 text-left transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 rounded-lg",
              isCompact ? "py-2.5 px-3" : "py-4 px-4",
              classNames?.trigger
            )}
          >
            {startContent && (
              <span className="shrink-0 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                {startContent}
              </span>
            )}

            <div className={cn("flex flex-1 flex-col text-left min-w-0", classNames?.titleWrapper)}>
              <span
                className={cn(
                  "font-medium text-zinc-900 dark:text-zinc-100 truncate",
                  isCompact ? "text-sm" : "text-base",
                  classNames?.title
                )}
              >
                {title}
              </span>
              {subtitle && (
                <span
                  className={cn(
                    "text-xs text-zinc-500 dark:text-zinc-400 mt-0.5",
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
                  "shrink-0 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ease-out",
                  isOpen ? "rotate-180 text-zinc-700 dark:text-zinc-200" : "",
                  classNames?.indicator
                )}
              >
                {typeof indicator === "function" ? (
                  indicator({ isOpen })
                ) : indicator ? (
                  indicator
                ) : (
                  <ChevronDown className="w-4 h-4" />
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
            "grid transition-all duration-200 ease-in-out overflow-hidden text-zinc-600 dark:text-zinc-300",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "pb-4 text-sm leading-relaxed",
                isCompact ? "px-3 pt-1 pb-3" : "px-4 pt-1 pb-4",
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
