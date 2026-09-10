// packages/core/src/components/Tabs/Tabs.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type TabsVariant = "solid" | "bordered" | "light" | "underlined";
export type TabsColor = "default" | "primary" | "success" | "warning" | "danger";
export type TabsSize = "sm" | "md" | "lg";
export type TabsRadius = "none" | "sm" | "md" | "lg" | "full";

export const tabListVariants = cva(
  "inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 select-none",
  {
    variants: {
      variant: {
        solid:
          "bg-zinc-100 dark:bg-zinc-900/80 p-1 border border-zinc-200/60 dark:border-zinc-800/80",
        bordered: "border-2 border-zinc-200 dark:border-zinc-800 p-1 bg-transparent",
        light: "bg-transparent p-0 gap-1.5",
        underlined: "bg-transparent p-0 gap-4 border-b border-zinc-200 dark:border-zinc-800",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col items-stretch",
      },
    },
    defaultVariants: {
      variant: "solid",
      radius: "md",
      fullWidth: false,
      orientation: "horizontal",
    },
  }
);

export const tabTriggerVariants = cva(
  "relative inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      size: {
        sm: "px-2.5 py-1 text-xs gap-1.5 min-h-7",
        md: "px-3.5 py-1.5 text-sm gap-2 min-h-9",
        lg: "px-4.5 py-2 text-base gap-2.5 min-h-11",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      variant: {
        solid: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
        bordered: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
        light:
          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
        underlined:
          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 pb-2 border-b-2 border-transparent -mb-px rounded-none",
      },
      isSelected: {
        true: "",
        false: "",
      },
      fullWidth: {
        true: "flex-1 w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        isSelected: true,
        className:
          "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50 font-semibold",
      },
      {
        variant: "bordered",
        isSelected: true,
        className: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 font-semibold",
      },
      {
        variant: "light",
        isSelected: true,
        className: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 font-semibold",
      },
      {
        variant: "underlined",
        isSelected: true,
        className:
          "text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-100 font-semibold",
      },
    ],
    defaultVariants: {
      size: "md",
      radius: "md",
      variant: "solid",
      isSelected: false,
      fullWidth: false,
    },
  }
);

export const tabColorStyles: Record<
  TabsColor,
  { solid: string; light: string; underlined: string; bordered: string }
> = {
  default: {
    solid: "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 shadow-xs",
    light: "bg-zinc-200/70 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
    underlined: "!text-zinc-900 dark:!text-zinc-100 !border-zinc-900 dark:!border-zinc-100",
    bordered: "bg-zinc-200/60 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
  },
  primary: {
    solid: "!bg-indigo-600 !text-white dark:!bg-indigo-500 dark:!text-white shadow-xs",
    light: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50",
    underlined: "!text-indigo-600 dark:!text-indigo-400 !border-indigo-600 dark:!border-indigo-400",
    bordered:
      "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  },
  success: {
    solid: "!bg-emerald-600 !text-white dark:!bg-emerald-500 dark:!text-white shadow-xs",
    light: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50",
    underlined:
      "!text-emerald-600 dark:!text-emerald-400 !border-emerald-600 dark:!border-emerald-400",
    bordered:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  },
  warning: {
    solid: "!bg-amber-500 !text-white dark:!bg-amber-500 dark:!text-white shadow-xs",
    light: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50",
    underlined: "!text-amber-600 dark:!text-amber-400 !border-amber-500 dark:!border-amber-400",
    bordered:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  },
  danger: {
    solid: "!bg-rose-600 !text-white dark:!bg-rose-500 dark:!text-white shadow-xs",
    light: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50",
    underlined: "!text-rose-600 dark:!text-rose-400 !border-rose-600 dark:!border-rose-400",
    bordered:
      "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  },
};

interface TabsContextValue {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  variant: TabsVariant;
  color: TabsColor;
  size: TabsSize;
  radius: TabsRadius;
  isDisabled: boolean;
  fullWidth: boolean;
  orientation: "horizontal" | "vertical";
  baseId: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs subcomponents must be used within a Tabs component");
  }
  return context;
}

// ----------------------------------------------------
// TAB COMPONENT
// ----------------------------------------------------
export interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  id?: string;
  tabKey?: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  isDisabled?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      id: customId,
      tabKey,
      title,
      icon,
      badge,
      isDisabled: propDisabled,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const {
      selectedKey,
      setSelectedKey,
      variant,
      color,
      size,
      radius,
      isDisabled: groupDisabled,
      fullWidth,
      baseId,
    } = useTabsContext();

    const tabId = tabKey || customId || "";
    const isSelected = selectedKey === tabId;
    const disabled = propDisabled || groupDisabled;

    const colorOverride = isSelected && color !== "default" ? tabColorStyles[color][variant] : "";

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`${baseId}-tab-${tabId}`}
        aria-selected={isSelected}
        aria-controls={`${baseId}-panel-${tabId}`}
        aria-disabled={disabled ? true : undefined}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={(e) => {
          if (!disabled) {
            setSelectedKey(tabId);
            onClick?.(e);
          }
        }}
        className={cn(
          tabTriggerVariants({ size, radius, variant, isSelected, fullWidth }),
          colorOverride,
          className
        )}
        {...props}
      >
        {icon && <span className="flex shrink-0 items-center justify-center">{icon}</span>}
        <span className="truncate">{title || children}</span>
        {badge && (
          <span className="ml-1 inline-flex items-center justify-center rounded-full bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
            {badge}
          </span>
        )}
      </button>
    );
  }
);
Tab.displayName = "Tab";

// ----------------------------------------------------
// TAB LIST COMPONENT
// ----------------------------------------------------
export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant, radius, fullWidth, orientation } = useTabsContext();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const tabs = Array.from(
        e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
      );
      const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);

      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      const isHorizontal = orientation === "horizontal";

      if ((isHorizontal && e.key === "ArrowRight") || (!isHorizontal && e.key === "ArrowDown")) {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (
        (isHorizontal && e.key === "ArrowLeft") ||
        (!isHorizontal && e.key === "ArrowUp")
      ) {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== currentIndex) {
        tabs[nextIndex]?.focus();
        tabs[nextIndex]?.click();
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(tabListVariants({ variant, radius, fullWidth, orientation }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabList.displayName = "TabList";

// ----------------------------------------------------
// TAB PANEL COMPONENT
// ----------------------------------------------------
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  tabKey?: string;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ id: customId, tabKey, className, children, ...props }, ref) => {
    const { selectedKey, baseId } = useTabsContext();
    const panelId = tabKey || customId || "";
    const isSelected = selectedKey === panelId;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${panelId}`}
        aria-labelledby={`${baseId}-tab-${panelId}`}
        tabIndex={0}
        className={cn(
          "animate-in fade-in-50 mt-3 rounded-lg text-zinc-700 duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:text-zinc-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabPanel.displayName = "TabPanel";

// ----------------------------------------------------
// MAIN TABS COMPONENT
// ----------------------------------------------------
export interface TabsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tabListVariants> {
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelectionChange?: (key: string) => void;
  color?: TabsColor;
  size?: TabsSize;
  isDisabled?: boolean;
  classNames?: {
    base?: string;
    tabList?: string;
    tab?: string;
    tabContent?: string;
    panel?: string;
  };
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      classNames,
      selectedKey: controlledKey,
      defaultSelectedKey,
      onSelectionChange,
      variant = "solid",
      color = "primary",
      size = "md",
      radius = "md",
      fullWidth = false,
      orientation = "horizontal",
      isDisabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseId = React.useId();

    const childrenArray = React.Children.toArray(children) as React.ReactElement[];
    const isDeclarative = childrenArray.some(
      (child) =>
        React.isValidElement(child) &&
        (child.type === Tab || Boolean((child.props as Record<string, any>)?.title))
    );

    const firstKey = React.useMemo(() => {
      if (childrenArray.length === 0) return "";
      const first = childrenArray[0];
      if (React.isValidElement(first)) {
        const firstProps = (first.props as Record<string, any>) || {};
        return (
          (first.key as string)?.replace(/^\.\$/, "") ||
          firstProps.tabKey ||
          firstProps.id ||
          "tab-0"
        );
      }
      return "";
    }, [childrenArray]);

    const [uncontrolledKey, setUncontrolledKey] = React.useState<string>(
      defaultSelectedKey || firstKey
    );

    const isControlled = controlledKey !== undefined;
    const currentKey = isControlled ? controlledKey : uncontrolledKey;

    const handleSelect = React.useCallback(
      (key: string) => {
        if (!isControlled) {
          setUncontrolledKey(key);
        }
        onSelectionChange?.(key);
      },
      [isControlled, onSelectionChange]
    );

    const contextValue = React.useMemo(
      () => ({
        selectedKey: currentKey,
        setSelectedKey: handleSelect,
        variant: variant || "solid",
        color: color || "primary",
        size: size || "md",
        radius: radius || "md",
        isDisabled: Boolean(isDisabled),
        fullWidth: Boolean(fullWidth),
        orientation: orientation || "horizontal",
        baseId,
      }),
      [
        currentKey,
        handleSelect,
        variant,
        color,
        size,
        radius,
        isDisabled,
        fullWidth,
        orientation,
        baseId,
      ]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-row gap-6" : "flex-col gap-2",
            classNames?.base,
            className
          )}
          {...props}
        >
          {isDeclarative ? (
            <>
              <TabList className={classNames?.tabList}>
                {childrenArray.map((child, index) => {
                  if (!React.isValidElement(child)) return null;
                  const childProps = (child.props as Record<string, any>) || {};
                  const key =
                    (child.key as string)?.replace(/^\.\$/, "") ||
                    childProps.tabKey ||
                    childProps.id ||
                    `tab-${index}`;
                  return (
                    <Tab
                      key={key}
                      tabKey={key}
                      id={key}
                      title={childProps.title}
                      icon={childProps.icon}
                      badge={childProps.badge}
                      isDisabled={childProps.isDisabled}
                      className={cn(classNames?.tab, childProps.className)}
                    >
                      {childProps.title || childProps.children}
                    </Tab>
                  );
                })}
              </TabList>

              {childrenArray.map((child, index) => {
                if (!React.isValidElement(child)) return null;
                const childProps = (child.props as Record<string, any>) || {};
                const key =
                  (child.key as string)?.replace(/^\.\$/, "") ||
                  childProps.tabKey ||
                  childProps.id ||
                  `tab-${index}`;
                return (
                  <TabPanel
                    key={key}
                    tabKey={key}
                    className={cn(classNames?.panel, childProps.panelClassName)}
                  >
                    {childProps.children}
                  </TabPanel>
                );
              })}
            </>
          ) : (
            children
          )}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";
