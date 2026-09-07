// packages/core/src/components/Accordion/Accordion.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import {
  AccordionContext,
  type AccordionVariant,
  AccordionItem,
} from "./AccordionItem";

export const accordionVariants = cva("w-full transition-all duration-200", {
  variants: {
    variant: {
      light: "border-t border-zinc-200 dark:border-zinc-800",
      bordered: "border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/50",
      shadow: "space-y-2",
      splitted: "space-y-3",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof accordionVariants> {
  selectionMode?: "single" | "multiple";
  selectedKeys?: string[] | Set<string>;
  defaultSelectedKeys?: string[] | Set<string>;
  onSelectionChange?: (keys: string[]) => void;
  isCompact?: boolean;
  isDisabled?: boolean;
  showDivider?: boolean;
  classNames?: {
    base?: string;
  };
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      classNames,
      variant = "light",
      selectionMode = "single",
      selectedKeys: propSelectedKeys,
      defaultSelectedKeys = [],
      onSelectionChange,
      isCompact = false,
      isDisabled = false,
      showDivider = true,
      children,
      ...props
    },
    ref
  ) => {
    // Normalise defaultSelectedKeys to Set
    const initialKeys = React.useMemo(() => {
      if (defaultSelectedKeys instanceof Set) return defaultSelectedKeys;
      return new Set(defaultSelectedKeys);
    }, [defaultSelectedKeys]);

    const [uncontrolledKeys, setUncontrolledKeys] = React.useState<Set<string>>(initialKeys);

    const isControlled = propSelectedKeys !== undefined;
    const currentKeys = React.useMemo(() => {
      if (!isControlled) return uncontrolledKeys;
      if (propSelectedKeys instanceof Set) return propSelectedKeys;
      return new Set(propSelectedKeys);
    }, [isControlled, propSelectedKeys, uncontrolledKeys]);

    const toggleKey = React.useCallback(
      (key: string) => {
        const next = new Set(currentKeys);
        if (selectionMode === "single") {
          if (next.has(key)) {
            next.clear();
          } else {
            next.clear();
            next.add(key);
          }
        } else {
          // multiple
          if (next.has(key)) {
            next.delete(key);
          } else {
            next.add(key);
          }
        }

        if (!isControlled) {
          setUncontrolledKeys(next);
        }
        onSelectionChange?.(Array.from(next));
      },
      [currentKeys, selectionMode, isControlled, onSelectionChange]
    );

    const contextValue = React.useMemo(
      () => ({
        selectedKeys: currentKeys,
        toggleKey,
        variant: variant || "light",
        isCompact,
        isDisabled,
        showDivider,
      }),
      [currentKeys, toggleKey, variant, isCompact, isDisabled, showDivider]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), classNames?.base, className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";
