// packages/core/src/components/Accordion/AccordionItem.tsx
"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

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
      light: "border-b border-border last:border-b-0",
      bordered: "border-b border-border last:border-b-0",
      shadow:
        "bg-card text-card-foreground shadow-sm border border-border/80 rounded-xl mb-2 last:mb-0",
      splitted:
        "bg-card text-card-foreground border border-border rounded-xl mb-3 shadow-xs last:mb-0",
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
              "focus-visible:ring-ring focus-visible:ring-offset-background flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg text-left transition-all duration-150 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              isCompact ? "px-3 py-2.5" : "px-4 py-4",
              classNames?.trigger
            )}
          >
            {startContent && (
              <span className="text-muted-foreground flex shrink-0 items-center justify-center">
                {startContent}
              </span>
            )}

            <div className={cn("flex min-w-0 flex-1 flex-col text-left", classNames?.titleWrapper)}>
              <span
                className={cn(
                  "text-foreground truncate font-medium",
                  isCompact ? "text-sm" : "text-base",
                  classNames?.title
                )}
              >
                {title}
              </span>
              {subtitle && (
                <span className={cn("text-muted-foreground mt-0.5 text-xs", classNames?.subtitle)}>
                  {subtitle}
                </span>
              )}
            </div>

            {!hideIndicator && (
              <span
                aria-hidden="true"
                className={cn(
                  "text-muted-foreground shrink-0 transition-transform duration-200 ease-out",
                  isOpen ? "text-foreground rotate-180" : "",
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
            "text-muted-foreground grid overflow-hidden transition-all duration-200 ease-in-out",
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
