// packages/core/src/components/StickyStack/StickyStack.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface StickyStackContextValue {
  baseTop: string;
  offsetStep: string;
  totalItems?: number;
}

const StickyStackContext = React.createContext<StickyStackContextValue>({
  baseTop: "6rem",
  offsetStep: "1.5rem",
});

export function useStickyStack() {
  return React.useContext(StickyStackContext);
}

export interface StickyStackProps extends React.HTMLAttributes<HTMLDivElement> {
  baseTop?: string;
  offsetStep?: string;
  totalItems?: number;
  classNames?: {
    container?: string;
  };
}

export const StickyStack = React.forwardRef<HTMLDivElement, StickyStackProps>(
  (
    {
      children,
      baseTop = "6rem",
      offsetStep = "1.5rem",
      totalItems,
      className,
      classNames,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({
        baseTop,
        offsetStep,
        totalItems,
      }),
      [baseTop, offsetStep, totalItems]
    );

    return (
      <StickyStackContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "relative flex flex-col space-y-6 sm:space-y-8",
            classNames?.container,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StickyStackContext.Provider>
    );
  }
);

StickyStack.displayName = "StickyStack";

export interface StickyStackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  total?: number;
  scaleStep?: number;
  customTop?: string;
  classNames?: {
    item?: string;
  };
}

export const StickyStackItem = React.forwardRef<HTMLDivElement, StickyStackItemProps>(
  (
    {
      children,
      index,
      total,
      scaleStep = 0.015,
      customTop,
      className,
      classNames,
      style,
      ...props
    },
    ref
  ) => {
    const context = useStickyStack();
    const effectiveTotal = total ?? context.totalItems ?? 5;

    // Calculate dynamic sticky top offset
    const calculatedTop =
      customTop || `calc(${context.baseTop} + ${index} * ${context.offsetStep})`;

    const inlineStyle: React.CSSProperties = {
      position: "sticky",
      top: calculatedTop,
      zIndex: 10 + index,
      ...style,
    };

    return (
      <div
        ref={ref}
        style={inlineStyle}
        data-stack-index={index}
        className={cn(
          "w-full transition-transform duration-300 will-change-transform",
          classNames?.item,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StickyStackItem.displayName = "StickyStackItem";
