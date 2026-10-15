// packages/core/src/components/Popover/Popover.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
  placement: PopoverPlacement;
}

const PopoverContext = React.createContext<PopoverContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  close: () => {},
  placement: "bottom",
});

export const usePopoverContext = () => React.useContext(PopoverContext);

// ----------------------------------------------------
// Popover Root
// ----------------------------------------------------

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: PopoverPlacement;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      className,
      placement = "bottom",
      isOpen: propIsOpen,
      defaultOpen = false,
      onOpenChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const isControlled = propIsOpen !== undefined;
    const isOpen = isControlled ? propIsOpen : uncontrolledOpen;

    const setIsOpen = React.useCallback(
      (value: React.SetStateAction<boolean>) => {
        const nextValue = typeof value === "function" ? value(isOpen) : value;
        if (!isControlled) {
          setUncontrolledOpen(nextValue);
        }
        onOpenChange?.(nextValue);
      },
      [isControlled, isOpen, onOpenChange]
    );

    const close = React.useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);

    // Click outside listener
    React.useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          close();
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          close();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, close]);

    return (
      <PopoverContext.Provider value={{ isOpen, setIsOpen, close, placement }}>
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={cn("relative inline-block text-left", className)}
          {...props}
        >
          {children}
        </div>
      </PopoverContext.Provider>
    );
  }
);
Popover.displayName = "Popover";

// ----------------------------------------------------
// PopoverTrigger
// ----------------------------------------------------

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PopoverTrigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { isOpen, setIsOpen } = usePopoverContext();

    return (
      <div
        ref={ref}
        className={cn("inline-flex cursor-pointer items-center select-none", className)}
        onClick={(e) => {
          onClick?.(e);
          setIsOpen((prev) => !prev);
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

// ----------------------------------------------------
// PopoverContent
// ----------------------------------------------------

const placementClasses: Record<PopoverPlacement, string> = {
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  "bottom-start": "top-full left-0 mt-2",
  "bottom-end": "top-full right-0 mt-2",

  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  "top-start": "bottom-full left-0 mb-2",
  "top-end": "bottom-full right-0 mb-2",

  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  "left-start": "right-full top-0 mr-2",
  "left-end": "right-full bottom-0 mr-2",

  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  "right-start": "left-full top-0 ml-2",
  "right-end": "left-full bottom-0 ml-2",
};

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, placement } = usePopoverContext();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(
          "animate-in fade-in-0 zoom-in-95 absolute z-50 w-72 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xl shadow-zinc-950/5 backdrop-blur-md transition-all duration-150 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20",
          placementClasses[placement],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverContent.displayName = "PopoverContent";
