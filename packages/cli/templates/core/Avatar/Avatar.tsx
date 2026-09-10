// packages/core/src/components/Avatar/Avatar.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarRadius = "none" | "md" | "lg" | "full";
export type AvatarColor = "default" | "primary" | "success" | "danger";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none font-semibold tracking-tight transition-all duration-200 ring-1 ring-zinc-950/5 dark:ring-white/10",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-14 w-14 text-lg",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      color: {
        default: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
        primary: "bg-indigo-600 text-white dark:bg-indigo-500",
        success: "bg-emerald-500 text-white dark:bg-emerald-500",
        danger: "bg-rose-500 text-white dark:bg-rose-500",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "full",
      color: "default",
    },
  }
);

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  onError?: () => void;
}

// Utility to generate initials from a name string (e.g. "John Doe" -> "JD", "Sarah" -> "S")
function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = "Avatar",
      name,
      size = "md",
      radius = "full",
      color = "default",
      onError,
      children,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // Reset error state when src changes
    React.useEffect(() => {
      setImageError(false);
    }, [src]);

    const handleImageError = () => {
      setImageError(true);
      onError?.();
    };

    const hasValidImage = Boolean(src) && !imageError;
    const initials = getInitials(name);

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, radius, color, className }))}
        aria-label={name || alt}
        role="img"
        {...props}
      >
        {hasValidImage ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : initials ? (
          <span className="leading-none font-semibold uppercase">{initials}</span>
        ) : children ? (
          children
        ) : (
          <svg
            className="h-3/5 w-3/5 fill-current opacity-60"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
