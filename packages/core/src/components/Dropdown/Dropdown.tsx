// packages/core/src/components/Dropdown/Dropdown.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type DropdownPlacement =
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
  | "right-end"
  | "center";

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
  placement: DropdownPlacement;
}

const DropdownContext = React.createContext<DropdownContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  close: () => {},
  placement: "bottom-start",
});

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: DropdownPlacement;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      placement = "bottom-start",
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

    const handleSetIsOpen = React.useCallback(
      (valueOrUpdater: boolean | ((prevState: boolean) => boolean)) => {
        const nextValue =
          typeof valueOrUpdater === "function" ? valueOrUpdater(isOpen) : valueOrUpdater;

        if (!isControlled) {
          setUncontrolledOpen(nextValue);
        }
        onOpenChange?.(nextValue);
      },
      [isControlled, isOpen, onOpenChange]
    );

    const close = React.useCallback(() => {
      handleSetIsOpen(false);
    }, [handleSetIsOpen]);

    // Handle outside click
    React.useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          close();
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isOpen, close]);

    // Handle Escape key
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          close();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, close]);

    return (
      <DropdownContext.Provider
        value={{
          isOpen,
          setIsOpen: handleSetIsOpen,
          close,
          placement,
        }}
      >
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
      </DropdownContext.Provider>
    );
  }
);
Dropdown.displayName = "Dropdown";

export interface DropdownTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DropdownTrigger = React.forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(DropdownContext);

    return (
      <div
        ref={ref}
        className={cn("inline-flex cursor-pointer items-center select-none", className)}
        onClick={(e) => {
          onClick?.(e);
          setIsOpen((prev) => !prev);
        }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, placement } = React.useContext(DropdownContext);

    if (!isOpen) return null;

    const placementClasses: Record<DropdownPlacement, string> = {
      // Bottom variants (snug 1.5/2 margin right underneath trigger)
      bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
      "bottom-start": "top-full left-0 mt-1.5",
      "bottom-end": "top-full right-0 mt-1.5",

      // Top variants (snug right above trigger)
      top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
      "top-start": "bottom-full left-0 mb-1.5",
      "top-end": "bottom-full right-0 mb-1.5",

      // Left variants (to the left of trigger)
      left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
      "left-start": "right-full top-0 mr-1.5",
      "left-end": "right-full bottom-0 mr-1.5",

      // Right variants (to the right of trigger)
      right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
      "right-start": "left-full top-0 ml-1.5",
      "right-end": "left-full bottom-0 ml-1.5",

      // Center (centered directly over trigger)
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    };

    return (
      <div
        ref={ref}
        role="menu"
        tabIndex={-1}
        className={cn(
          "border-border/80 bg-popover text-popover-foreground absolute z-50 min-w-[210px] rounded-2xl border p-1.5 shadow-xl backdrop-blur-md",
          "animate-in fade-in-0 zoom-in-95 duration-150 focus:outline-none",
          placementClasses[placement] || placementClasses["bottom-start"],
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-0.5">{children}</div>
      </div>
    );
  }
);
DropdownMenu.displayName = "DropdownMenu";

const dropdownItemVariants = cva(
  "relative flex items-center justify-between w-full px-3 py-2 text-sm rounded-xl cursor-pointer select-none transition-all duration-150 outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-popover-foreground hover:bg-accent focus:bg-accent",
        danger: "text-destructive hover:bg-destructive/10 focus:bg-destructive/10 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DropdownItemProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dropdownItemVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  disabled?: boolean;
}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    {
      className,
      variant = "default",
      startContent,
      endContent,
      disabled = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const { close } = React.useContext(DropdownContext);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      close();
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        className={cn(
          dropdownItemVariants({ variant }),
          disabled && "pointer-events-none cursor-not-allowed opacity-40",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="flex min-w-0 items-center gap-2.5 truncate">
          {startContent && <span className="text-muted-foreground shrink-0">{startContent}</span>}
          <span className="truncate">{children}</span>
        </div>

        {endContent && (
          <span className="text-muted-foreground ml-auto shrink-0 pl-2 font-mono text-xs">
            {endContent}
          </span>
        )}
      </div>
    );
  }
);
DropdownItem.displayName = "DropdownItem";

export interface DropdownSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  showDivider?: boolean;
}

const DropdownSection = React.forwardRef<HTMLDivElement, DropdownSectionProps>(
  ({ className, title, showDivider = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "flex flex-col gap-0.5 py-1",
          showDivider && "border-border/60 mt-1 border-t pt-1.5",
          className
        )}
        {...props}
      >
        {title && (
          <div className="text-muted-foreground px-3 py-1 text-[10px] font-bold tracking-wider uppercase select-none">
            {title}
          </div>
        )}
        {children}
      </div>
    );
  }
);
DropdownSection.displayName = "DropdownSection";

export {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  dropdownItemVariants,
};
