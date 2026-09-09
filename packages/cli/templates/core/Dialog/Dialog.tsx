// packages/core/src/components/Dialog/Dialog.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

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
  "relative w-full overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl rounded-3xl p-6 sm:p-7 transition-all animate-in fade-in-0 zoom-in-95 duration-200 focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
      },
      severity: {
        default: "",
        danger: "border-t-4 border-t-rose-500 dark:border-t-rose-500",
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

  if (!isOpen) return null;

  return (
    <DialogContext.Provider value={{ isOpen, onClose, size, severity }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md transition-opacity animate-in fade-in-0 duration-200"
          aria-hidden="true"
          onClick={() => {
            if (isDismissable) onClose?.();
          }}
        />

        {/* Dialog Centered Content */}
        <div className="relative z-10 w-full flex items-center justify-center pointer-events-auto">
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
};
Dialog.displayName = "Dialog";

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogPanelVariants> {}

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
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5 text-left mb-5", className)}
        {...props}
      >
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
          "text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2",
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

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-zinc-500 dark:text-zinc-400 leading-normal", className)}
      {...props}
    >
      {children}
    </p>
  );
});
DialogDescription.displayName = "DialogDescription";

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-4 mt-2",
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
