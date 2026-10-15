// packages/core/src/components/Toast/Toast.tsx
"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type ToastType = "default" | "success" | "error" | "warning" | "info" | "loading";
export type ToastPosition =
  "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";

export interface ToastAction {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  onDismiss?: () => void;
  className?: string;
}

export interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
  type: ToastType;
}

// ----------------------------------------------------
// Global Toast Event Bus & State Store
// ----------------------------------------------------

type ToastListener = (toasts: ToastItem[]) => void;
let toasts: ToastItem[] = [];
const listeners = new Set<ToastListener>();

function notify() {
  listeners.forEach((listener) => listener([...toasts]));
}

let toastCounter = 0;
function generateId(): string {
  toastCounter += 1;
  return `toast-${Date.now()}-${toastCounter}`;
}

export const toast = (title: React.ReactNode, options: ToastOptions = {}) => {
  const id = options.id || generateId();
  const newToast: ToastItem = {
    id,
    title,
    description: options.description,
    type: options.type || "default",
    duration: options.duration ?? 4000,
    icon: options.icon,
    action: options.action,
    cancel: options.cancel,
    onDismiss: options.onDismiss,
    className: options.className,
    createdAt: Date.now(),
  };

  // Replace if exists, else append
  const existingIdx = toasts.findIndex((t) => t.id === id);
  if (existingIdx !== -1) {
    toasts[existingIdx] = newToast;
  } else {
    toasts = [...toasts, newToast];
  }
  notify();
  return id;
};

toast.success = (title: React.ReactNode, options?: Omit<ToastOptions, "type">) =>
  toast(title, { ...options, type: "success" });

toast.error = (title: React.ReactNode, options?: Omit<ToastOptions, "type">) =>
  toast(title, { ...options, type: "error" });

toast.warning = (title: React.ReactNode, options?: Omit<ToastOptions, "type">) =>
  toast(title, { ...options, type: "warning" });

toast.info = (title: React.ReactNode, options?: Omit<ToastOptions, "type">) =>
  toast(title, { ...options, type: "info" });

toast.loading = (title: React.ReactNode, options?: Omit<ToastOptions, "type">) =>
  toast(title, { ...options, type: "loading", duration: Infinity });

toast.dismiss = (id?: string) => {
  if (id) {
    const item = toasts.find((t) => t.id === id);
    item?.onDismiss?.();
    toasts = toasts.filter((t) => t.id !== id);
  } else {
    toasts.forEach((t) => t.onDismiss?.());
    toasts = [];
  }
  notify();
};

toast.promise = async <T,>(
  promise: Promise<T> | (() => Promise<T>),
  msgs: {
    loading: React.ReactNode;
    success: React.ReactNode | ((data: T) => React.ReactNode);
    error: React.ReactNode | ((err: any) => React.ReactNode);
  },
  options?: ToastOptions
) => {
  const id = toast.loading(msgs.loading, options);
  try {
    const p = typeof promise === "function" ? promise() : promise;
    const res = await p;
    const successMsg = typeof msgs.success === "function" ? msgs.success(res) : msgs.success;
    toast.success(successMsg, { ...options, id });
    return res;
  } catch (err) {
    const errorMsg = typeof msgs.error === "function" ? msgs.error(err) : msgs.error;
    toast.error(errorMsg, { ...options, id });
    throw err;
  }
};

// ----------------------------------------------------
// Toast Component & Icons
// ----------------------------------------------------

const defaultIcons: Record<ToastType, React.ReactNode> = {
  default: null,
  success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />,
  error: <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />,
  info: <Info className="h-5 w-5 shrink-0 text-sky-500" />,
  loading: <Loader2 className="text-primary h-5 w-5 shrink-0 animate-spin" />,
};

interface SingleToastProps {
  toastItem: ToastItem;
}

const SingleToast: React.FC<SingleToastProps> = ({ toastItem }) => {
  const { id, title, description, type, icon, action, cancel, duration, className } = toastItem;

  React.useEffect(() => {
    if (duration === Infinity) return;
    const timer = setTimeout(() => {
      toast.dismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration]);

  const displayIcon = icon ?? defaultIcons[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "animate-in fade-in-0 slide-in-from-bottom-2 pointer-events-auto relative flex w-full max-w-sm items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white/95 p-4 shadow-xl shadow-zinc-950/5 backdrop-blur-md transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-black/20",
        type === "error" && "border-rose-200 dark:border-rose-900/40",
        type === "success" && "border-emerald-200 dark:border-emerald-900/40",
        type === "warning" && "border-amber-200 dark:border-amber-900/40",
        className
      )}
    >
      {displayIcon && <div className="mt-0.5 shrink-0">{displayIcon}</div>}

      <div className="flex-1 space-y-1 text-left">
        {title && (
          <h5 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h5>
        )}
        {description && (
          <div className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </div>
        )}

        {(action || cancel) && (
          <div className="flex items-center gap-2 pt-2">
            {action && (
              <button
                type="button"
                onClick={(e) => {
                  action.onClick(e);
                  toast.dismiss(id);
                }}
                className="rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                {action.label}
              </button>
            )}
            {cancel && (
              <button
                type="button"
                onClick={(e) => {
                  cancel.onClick(e);
                  toast.dismiss(id);
                }}
                className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {cancel.label}
              </button>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="Dismiss toast"
        onClick={() => toast.dismiss(id)}
        className="-mt-1 -mr-1 rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

// ----------------------------------------------------
// Toaster Container Component
// ----------------------------------------------------

export interface ToasterProps {
  position?: ToastPosition;
  className?: string;
  maxToasts?: number;
}

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

export const Toaster: React.FC<ToasterProps> = ({
  position = "bottom-right",
  className,
  maxToasts = 5,
}) => {
  const [activeToasts, setActiveToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    const handleUpdate = (newList: ToastItem[]) => {
      setActiveToasts(newList);
    };

    listeners.add(handleUpdate);
    setActiveToasts([...toasts]);

    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const visibleToasts = activeToasts.slice(-maxToasts);

  if (visibleToasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className={cn(
        "pointer-events-none fixed z-[9999] flex w-full max-w-sm flex-col gap-2.5 p-4 sm:p-0",
        positionClasses[position],
        className
      )}
    >
      {visibleToasts.map((item) => (
        <SingleToast key={item.id} toastItem={item} />
      ))}
    </div>
  );
};

Toaster.displayName = "Toaster";
