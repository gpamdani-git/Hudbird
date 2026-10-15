// packages/core/src/components/Sheet/Sheet.tsx
"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export type SheetSide = "top" | "bottom" | "left" | "right";
export type SheetSize = "sm" | "md" | "lg" | "xl" | "full";

interface SheetContextValue {
  isOpen: boolean;
  onClose?: () => void;
  side: SheetSide;
  size: SheetSize;
  isDismissable: boolean;
}

const SheetContext = React.createContext<SheetContextValue>({
  isOpen: false,
  side: "right",
  size: "md",
  isDismissable: true,
});

export const useSheetContext = () => React.useContext(SheetContext);

const sheetPanelVariants = cva(
  "fixed z-[100] flex flex-col bg-background border-border/80 shadow-2xl transition-all duration-300 ease-in-out focus-visible:outline-none",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b animate-in slide-in-from-top duration-300",
        bottom: "inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom duration-300",
        left: "inset-y-0 left-0 h-full border-r animate-in slide-in-from-left duration-300",
        right: "inset-y-0 right-0 h-full border-l animate-in slide-in-from-right duration-300",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      // Right / Left sizing
      { side: ["left", "right"], size: "sm", className: "w-full sm:max-w-sm" },
      { side: ["left", "right"], size: "md", className: "w-full sm:max-w-md" },
      { side: ["left", "right"], size: "lg", className: "w-full sm:max-w-lg" },
      { side: ["left", "right"], size: "xl", className: "w-full sm:max-w-xl" },
      { side: ["left", "right"], size: "full", className: "w-screen max-w-none" },

      // Top / Bottom sizing
      { side: ["top", "bottom"], size: "sm", className: "max-h-[30vh]" },
      { side: ["top", "bottom"], size: "md", className: "max-h-[50vh]" },
      { side: ["top", "bottom"], size: "lg", className: "max-h-[70vh]" },
      { side: ["top", "bottom"], size: "xl", className: "max-h-[85vh]" },
      { side: ["top", "bottom"], size: "full", className: "h-screen max-h-none" },
    ],
    defaultVariants: {
      side: "right",
      size: "md",
    },
  }
);

// ----------------------------------------------------
// Sheet Root
// ----------------------------------------------------

export interface SheetProps {
  isOpen: boolean;
  onClose?: () => void;
  side?: SheetSide;
  size?: SheetSize;
  isDismissable?: boolean;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  side = "right",
  size = "md",
  isDismissable = true,
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard Escape Handler
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDismissable) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDismissable, onClose]);

  // Lock scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const content = (
    <SheetContext.Provider value={{ isOpen, onClose, side, size, isDismissable }}>
      <div className="fixed inset-0 z-[100] flex">
        {/* Backdrop */}
        <div
          className="bg-background/80 animate-in fade-in-0 fixed inset-0 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
          onClick={() => {
            if (isDismissable) onClose?.();
          }}
        />

        {/* Sheet Content Panel */}
        {children}
      </div>
    </SheetContext.Provider>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
};

// ----------------------------------------------------
// Sheet Subcomponents
// ----------------------------------------------------

export interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sheetPanelVariants> {
  showCloseButton?: boolean;
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  (
    { className, side: propSide, size: propSize, showCloseButton = true, children, ...props },
    ref
  ) => {
    const { side: ctxSide, size: ctxSize, onClose } = useSheetContext();
    const side = propSide ?? ctxSide;
    const size = propSize ?? ctxSize;

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(sheetPanelVariants({ side, size }), className)}
        {...props}
      >
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close sheet"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring absolute top-4 right-4 rounded-xl p-1.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-7">{children}</div>
      </div>
    );
  }
);
SheetContent.displayName = "SheetContent";

export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-6 flex flex-col space-y-1.5 text-left", className)}
      {...props}
    />
  )
);
SheetHeader.displayName = "SheetHeader";

export interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-foreground text-lg font-bold tracking-tight", className)}
      {...props}
    />
  )
);
SheetTitle.displayName = "SheetTitle";

export interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const SheetDescription = React.forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
);
SheetDescription.displayName = "SheetDescription";

export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border-border/60 mt-auto flex flex-col-reverse border-t pt-6 sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
);
SheetFooter.displayName = "SheetFooter";
