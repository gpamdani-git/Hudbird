import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { ChevronLeft } from "lucide-react";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface SidebarContextValue {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  variant: "flat" | "bordered";
  size: "sm" | "md" | "lg";
  radius: "none" | "md" | "lg" | "full";
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used within a <Sidebar>");
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Sidebar
 * -----------------------------------------------------------------------------------------------*/

const sidebarVariants = cva(
  "group relative flex flex-col h-full transition-all duration-300 ease-in-out shrink-0",
  {
    variants: {
      variant: {
        flat: "bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md",
        bordered: "bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800",
      },
      isCollapsed: {
        true: "w-20",
        false: "w-64",
      },
    },
    defaultVariants: {
      variant: "flat",
      isCollapsed: false,
    },
  }
);

export interface SidebarProps
  extends
    React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof sidebarVariants>, "isCollapsed"> {
  defaultCollapsed?: boolean;
  isCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "md" | "lg" | "full";
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      variant = "flat",
      size = "md",
      radius = "md",
      defaultCollapsed = false,
      isCollapsed: controlledIsCollapsed,
      onCollapseChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledIsCollapsed, setUncontrolledIsCollapsed] = useState(defaultCollapsed);
    const isControlled = controlledIsCollapsed !== undefined;
    const isCollapsed = isControlled ? controlledIsCollapsed : uncontrolledIsCollapsed;

    const toggleCollapse = useCallback(() => {
      const nextCollapsed = !isCollapsed;
      if (!isControlled) {
        setUncontrolledIsCollapsed(nextCollapsed);
      }
      onCollapseChange?.(nextCollapsed);
    }, [isCollapsed, isControlled, onCollapseChange]);

    const contextValue = useMemo<SidebarContextValue>(
      () => ({
        isCollapsed,
        toggleCollapse,
        variant: variant || "flat",
        size,
        radius,
      }),
      [isCollapsed, toggleCollapse, variant, size, radius]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <aside
          ref={ref}
          className={cn(sidebarVariants({ variant, isCollapsed }), className)}
          aria-expanded={!isCollapsed}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

/* -------------------------------------------------------------------------------------------------
 * SidebarHeader
 * -----------------------------------------------------------------------------------------------*/

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed } = useSidebar();
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-16 shrink-0 items-center px-4 py-3 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-between",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

/* -------------------------------------------------------------------------------------------------
 * SidebarToggle
 * -----------------------------------------------------------------------------------------------*/

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, ...props }, ref) => {
    const { isCollapsed, toggleCollapse } = useSidebar();

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleCollapse}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200/50 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:outline-none dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
          className
        )}
        {...props}
      >
        <ChevronLeft
          size={16}
          className={cn(
            "transition-transform duration-300",
            isCollapsed ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
    );
  }
);
SidebarToggle.displayName = "SidebarToggle";

/* -------------------------------------------------------------------------------------------------
 * SidebarContent & SidebarNav
 * -----------------------------------------------------------------------------------------------*/

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto p-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = "SidebarContent";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const SidebarNav = React.forwardRef<HTMLDivElement, SidebarNavProps>(
  ({ className, title, children, ...props }, ref) => {
    const { isCollapsed } = useSidebar();

    return (
      <nav ref={ref} className={cn("relative flex w-full flex-col gap-1", className)} {...props}>
        {title && !isCollapsed && (
          <h4 className="mb-2 px-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase select-none dark:text-zinc-400">
            {title}
          </h4>
        )}
        {children}
      </nav>
    );
  }
);
SidebarNav.displayName = "SidebarNav";

/* -------------------------------------------------------------------------------------------------
 * SidebarItem
 * -----------------------------------------------------------------------------------------------*/

const sidebarItemVariants = cva(
  "group relative flex items-center gap-3 w-full border border-transparent outline-none transition-all duration-200 select-none overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-9 px-2.5 text-xs",
        md: "h-11 px-3 text-sm",
        lg: "h-12 px-3.5 text-base",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      isActive: {
        true: "bg-primary/10 text-primary font-semibold",
        false:
          "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-850 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer",
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
      },
      isCollapsed: {
        true: "justify-center",
        false: "justify-start",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "md",
      isActive: false,
      isDisabled: false,
      isCollapsed: false,
    },
  }
);

export interface SidebarItemProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<VariantProps<typeof sidebarItemVariants>, "size" | "radius" | "isCollapsed"> {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  label?: string; // Explicit label to use for tooltip
}

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  (
    { className, isActive = false, isDisabled = false, icon, badge, label, children, ...props },
    ref
  ) => {
    const { isCollapsed, size, radius } = useSidebar();

    // Derived label for tooltip if explicitly provided or if child is a string
    const tooltipText = label || (typeof children === "string" ? children : undefined);

    return (
      <a
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={isDisabled ? -1 : 0}
        className={cn(
          sidebarItemVariants({ size, radius, isActive, isDisabled, isCollapsed }),
          "focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
          className
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center",
              isActive
                ? "text-primary"
                : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50"
            )}
          >
            {icon}
          </span>
        )}

        {!isCollapsed && (
          <span className="flex-1 truncate transition-opacity duration-300">
            {children || label}
          </span>
        )}

        {!isCollapsed && badge && (
          <span
            className={cn(
              "shrink-0 transition-opacity duration-300",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            {badge}
          </span>
        )}

        {/* Floating Tooltip (Visible only when collapsed and hovered/focused) */}
        {isCollapsed && tooltipText && (
          <div className="pointer-events-none absolute left-full z-50 ml-4 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
            {tooltipText}
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-[4px] border-transparent border-r-zinc-900 dark:border-r-zinc-100" />
          </div>
        )}
      </a>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

/* -------------------------------------------------------------------------------------------------
 * SidebarFooter
 * -----------------------------------------------------------------------------------------------*/

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto shrink-0 border-t border-zinc-200/50 p-4 dark:border-zinc-800/50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
