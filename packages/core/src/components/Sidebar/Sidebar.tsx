import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { ChevronLeft } from "lucide-react";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

export type SidebarPosition = "left" | "right" | "bottom";
export type SidebarVariant = "flat" | "bordered" | "floating" | "dock";

interface SidebarContextValue {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  variant: SidebarVariant;
  position: SidebarPosition;
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
  "group relative transition-all duration-300 ease-in-out shrink-0 select-none",
  {
    variants: {
      position: {
        left: "flex flex-col h-full",
        right: "flex flex-col h-full",
        bottom: "flex flex-row items-center h-16 w-auto max-w-fit mx-auto",
      },
      variant: {
        flat: "bg-zinc-100/80 dark:bg-[#161618]/90 backdrop-blur-xl",
        bordered: "bg-white dark:bg-[#161618] shadow-xs",
        floating:
          "rounded-3xl m-3 border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#161618]/90 backdrop-blur-2xl shadow-xl",
        dock: "rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/70 dark:bg-[#161618]/80 backdrop-blur-2xl shadow-2xl",
      },
      isCollapsed: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        position: "left",
        variant: ["flat", "bordered"],
        className: "border-r border-black/[0.04] dark:border-white/[0.06]",
      },
      {
        position: "right",
        variant: ["flat", "bordered"],
        className: "border-l border-black/[0.04] dark:border-white/[0.06]",
      },
      {
        position: "bottom",
        variant: ["flat", "bordered"],
        className: "border-t border-black/[0.08] dark:border-white/[0.08]",
      },
      {
        position: ["left", "right"],
        isCollapsed: true,
        className: "w-20",
      },
      {
        position: ["left", "right"],
        isCollapsed: false,
        className: "w-64",
      },
      {
        position: "bottom",
        isCollapsed: true,
        className: "px-2 py-1.5",
      },
      {
        position: "bottom",
        isCollapsed: false,
        className: "px-4 py-2",
      },
    ],
    defaultVariants: {
      position: "left",
      variant: "flat",
      isCollapsed: false,
    },
  }
);

export interface SidebarProps
  extends
    React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof sidebarVariants>, "isCollapsed" | "variant" | "position"> {
  position?: SidebarPosition;
  variant?: SidebarVariant;
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
      position = "left",
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
        variant,
        position,
        size,
        radius,
      }),
      [isCollapsed, toggleCollapse, variant, position, size, radius]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <aside
          ref={ref}
          className={cn(sidebarVariants({ position, variant, isCollapsed }), className)}
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
 * SidebarHeader & SidebarBrand
 * -----------------------------------------------------------------------------------------------*/

export interface SidebarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

export const SidebarBrand = React.forwardRef<HTMLDivElement, SidebarBrandProps>(
  ({ className, icon, title, children, ...props }, ref) => {
    const { isCollapsed, position } = useSidebar();
    const isBottom = position === "bottom";

    return (
      <div
        ref={ref}
        data-sidebar-brand="true"
        className={cn(
          "flex min-w-0 items-center gap-2.5 overflow-hidden transition-all duration-300",
          isCollapsed && !isBottom && "hidden w-0 opacity-0",
          className
        )}
        {...props}
      >
        {icon && <span className="flex shrink-0 items-center justify-center">{icon}</span>}
        {(title || children) && (
          <span className="truncate text-sm font-semibold select-none">{title || children}</span>
        )}
      </div>
    );
  }
);
SidebarBrand.displayName = "SidebarBrand";

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed, position } = useSidebar();
    const isBottom = position === "bottom";

    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center overflow-hidden transition-all duration-300",
          isBottom
            ? "gap-2 px-2 py-1"
            : isCollapsed
              ? "min-h-16 justify-center px-2 py-3 group-aria-[expanded=false]:[&>*:not(button):not([data-sidebar-keep])]:hidden"
              : "min-h-16 justify-between px-4 py-3",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          if (isCollapsed && !isBottom) {
            const isToggle =
              (child.type as any)?.displayName === "SidebarToggle" ||
              child.props?.["data-sidebar-toggle"] !== undefined ||
              child.props?.["aria-label"]?.toLowerCase().includes("sidebar");

            const shouldKeep = child.props?.["data-sidebar-keep"] === true;

            // When mini/collapsed, hide text/labels and non-toggle children unless explicitly told to keep
            if (!isToggle && !shouldKeep) {
              return null;
            }
          }

          return child;
        })}
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
    const { isCollapsed, toggleCollapse, position } = useSidebar();

    const getRotationClass = () => {
      if (position === "right") {
        return isCollapsed ? "rotate-0" : "rotate-180";
      }
      if (position === "bottom") {
        return isCollapsed ? "rotate-90" : "-rotate-90";
      }
      return isCollapsed ? "rotate-180" : "rotate-0";
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleCollapse}
        data-sidebar-toggle="true"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-zinc-200/60 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:outline-none active:scale-95 dark:hover:bg-white/10 dark:hover:text-zinc-100",
          className
        )}
        {...props}
      >
        <ChevronLeft
          size={16}
          className={cn("transition-transform duration-300", getRotationClass())}
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
    const { position } = useSidebar();
    const isBottom = position === "bottom";

    return (
      <div
        ref={ref}
        className={cn(
          isBottom
            ? "flex flex-row items-center gap-2 overflow-visible px-2"
            : "flex flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto p-3",
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
    const { isCollapsed, position } = useSidebar();
    const isBottom = position === "bottom";

    return (
      <nav
        ref={ref}
        className={cn(
          "relative flex",
          isBottom ? "flex-row items-center gap-1.5" : "w-full flex-col gap-1",
          className
        )}
        {...props}
      >
        {title && !isCollapsed && !isBottom && (
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
        sm: "h-9 px-3 text-xs gap-2.5",
        md: "h-11 px-3.5 text-sm gap-3",
        lg: "h-13 px-4 text-base gap-3.5",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      isActive: {
        true: "bg-primary/10 text-primary font-semibold ring-1 ring-primary/20",
        false:
          "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-[#202124] hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer active:scale-[0.98]",
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
    const { isCollapsed, size, radius, position } = useSidebar();
    const isBottom = position === "bottom";

    // Derived label for tooltip if explicitly provided or if child is a string
    const tooltipText = label || (typeof children === "string" ? children : undefined);

    const getTooltipClasses = () => {
      if (position === "right") {
        return "right-full mr-4";
      }
      if (position === "bottom") {
        return "bottom-full mb-3 left-1/2 -translate-x-1/2";
      }
      return "left-full ml-4";
    };

    const getTooltipArrowClasses = () => {
      if (position === "right") {
        return "top-1/2 -right-1 -translate-y-1/2 border-[4px] border-transparent border-l-zinc-900 dark:border-l-zinc-100";
      }
      if (position === "bottom") {
        return "top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-zinc-900 dark:border-t-zinc-100";
      }
      return "top-1/2 -left-1 -translate-y-1/2 border-[4px] border-transparent border-r-zinc-900 dark:border-r-zinc-100";
    };

    return (
      <a
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={isDisabled ? -1 : 0}
        className={cn(
          sidebarItemVariants({
            size,
            radius,
            isActive,
            isDisabled,
            isCollapsed: isCollapsed || isBottom,
          }),
          isBottom && "h-11 w-11 justify-center rounded-xl px-0",
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
              "flex h-5 w-5 shrink-0 items-center justify-center",
              isActive
                ? "text-primary"
                : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50"
            )}
          >
            {icon}
          </span>
        )}

        {!isCollapsed && !isBottom && (
          <span className="flex-1 truncate transition-opacity duration-300">
            {children || label}
          </span>
        )}

        {!isCollapsed && !isBottom && badge && (
          <span
            className={cn(
              "shrink-0 transition-opacity duration-300",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            {badge}
          </span>
        )}

        {/* Floating Tooltip (Visible when collapsed OR bottom dock, and hovered/focused) */}
        {(isCollapsed || isBottom) && tooltipText && (
          <div
            className={cn(
              "pointer-events-none absolute z-50 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-zinc-100 dark:text-zinc-900",
              getTooltipClasses()
            )}
          >
            {tooltipText}
            {/* Tooltip Arrow */}
            <div className={cn("absolute", getTooltipArrowClasses())} />
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
    const { position, isCollapsed } = useSidebar();
    const isBottom = position === "bottom";

    return (
      <div
        ref={ref}
        className={cn(
          isBottom
            ? "ml-auto flex items-center border-l border-zinc-200/50 pl-2 dark:border-zinc-800/50"
            : isCollapsed
              ? "mt-auto flex shrink-0 justify-center overflow-hidden border-t border-zinc-200/50 p-2 dark:border-zinc-800/50 [&_span]:hidden"
              : "mt-auto shrink-0 border-t border-zinc-200/50 p-4 dark:border-zinc-800/50",
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
