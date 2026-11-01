// packages/core/src/components/Dialog/Dialog.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

import { createPortal } from "react-dom";

export type DialogSize = "sm" | "md";
export type DialogSeverity = "default" | "danger";

interface DialogContextValue {
  isOpen: boolean;
  onClose?: () => void;
  size?: DialogSize;
  severity?: DialogSeverity;
}

const DialogContext = React.createContext<DialogContextValue>({
  isOpen: false,
});

const dialogPanelVariants = cva(
  "relative w-full overflow-hidden bg-white/95 dark:bg-[#161618]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-[0_24px_64px_rgba(0,0,0,0.7)] rounded-[28px] p-6 sm:p-7 transition-all animate-in fade-in-0 zoom-in-95 duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
      },
      severity: {
        default: "",
        danger: "border-t-4 border-t-rose-600 dark:border-t-rose-500",
      },
    },
    defaultVariants: {
      size: "md",
      severity: "default",
    },
  }
);

export interface DialogProps {
  isOpen: boolean;
  onClose?: () => void;
  size?: DialogSize;
  severity?: DialogSeverity;
  isDismissable?: boolean;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  size = "md",
  severity = "default",
  isDismissable = true,
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ESC key to close
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDismissable) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDismissable, onClose]);

  // Prevent background scroll when dialog is open
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
    <DialogContext.Provider value={{ isOpen, onClose, size, severity }}>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div
          className="animate-in fade-in-0 fixed inset-0 bg-black/45 backdrop-blur-md transition-opacity duration-200"
          aria-hidden="true"
          onClick={() => {
            if (isDismissable) onClose?.();
          }}
        />

        {/* Dialog Centered Content */}
        <div className="pointer-events-auto relative z-10 flex w-full items-center justify-center">
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );

  return createPortal(content, document.body);
};
Dialog.displayName = "Dialog";

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dialogPanelVariants> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, size: propSize, severity: propSeverity, children, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    const size = propSize ?? context.size ?? "md";
    const severity = propSeverity ?? context.severity ?? "default";

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(dialogPanelVariants({ size, severity }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mb-4 flex flex-col gap-1 text-left", className)} {...props}>
        {children}
      </div>
    );
  }
);
DialogHeader.displayName = "DialogHeader";

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DialogContext);

    return (
      <h2
        ref={ref}
        className={cn(
          "flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50",
          context.severity === "danger" && "text-rose-600 dark:text-rose-400",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm leading-relaxed text-zinc-500 dark:text-zinc-400", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
DialogDescription.displayName = "DialogDescription";

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-6 flex flex-col-reverse gap-2 border-t border-black/5 pt-4 sm:flex-row sm:justify-end dark:border-white/5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  dialogPanelVariants,
};
