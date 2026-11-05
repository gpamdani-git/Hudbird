"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button, type ButtonProps } from "../Button";

export type NavigationMenuLogoPosition = "left" | "center" | "right";
export type NavigationMenuSurface = "transparent" | "glass" | "flat";
export type NavigationMenuPosition = "static" | "sticky" | "fixed";
export type NavigationMenuScrollBehavior = "none" | "elevate" | "hide";

const navigationMenuVariants = cva(
  "z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-200",
  {
    variants: {
      position: {
        static: "relative",
        sticky: "sticky top-0",
        fixed: "fixed inset-x-0 top-0",
      },
      surface: {
        transparent: "border-transparent bg-transparent",
        glass:
          "border-black/[0.06] bg-background/80 shadow-xs backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.08]",
        flat: "border-border bg-background",
      },
      scrolled: {
        true: "shadow-sm",
        false: "shadow-none",
      },
    },
    compoundVariants: [
      {
        surface: "transparent",
        scrolled: true,
        className: "border-black/[0.06] bg-background/92 backdrop-blur-xl dark:border-white/[0.08]",
      },
    ],
    defaultVariants: {
      position: "sticky",
      surface: "glass",
      scrolled: false,
    },
  }
);

interface NavigationMenuContextValue {
  openValue: string | null;
  setOpenValue: (value: string | null) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  logoPosition: NavigationMenuLogoPosition;
  lastTriggerRef: React.MutableRefObject<HTMLElement | null>;
  mobileTriggerRef: React.MutableRefObject<HTMLElement | null>;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | null>(null);
const NavigationMenuItemContext = React.createContext<string | null>(null);

function useNavigationMenu() {
  const context = React.useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("NavigationMenu components must be used within <NavigationMenu>.");
  }
  return context;
}

function useNavigationMenuItem() {
  const value = React.useContext(NavigationMenuItemContext);
  if (!value) {
    throw new Error("NavigationMenuTrigger and Content require <NavigationMenuItem value>.");
  }
  return value;
}

export interface NavigationMenuProps
  extends
    Omit<HTMLMotionProps<"nav">, "defaultValue" | "onChange">,
    VariantProps<typeof navigationMenuVariants> {
  logoPosition?: NavigationMenuLogoPosition;
  surface?: NavigationMenuSurface;
  position?: NavigationMenuPosition;
  scrollBehavior?: NavigationMenuScrollBehavior;
  scrollThreshold?: number;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  mobileOpen?: boolean;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      className,
      logoPosition = "left",
      surface = "glass",
      position = "sticky",
      scrollBehavior = "elevate",
      scrollThreshold = 12,
      value,
      defaultValue = null,
      onValueChange,
      mobileOpen: controlledMobileOpen,
      defaultMobileOpen = false,
      onMobileOpenChange,
      children,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) => {
    const reduceMotion = useReducedMotion();
    const rootRef = React.useRef<HTMLElement | null>(null);
    const lastTriggerRef = React.useRef<HTMLElement | null>(null);
    const mobileTriggerRef = React.useRef<HTMLElement | null>(null);
    const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue);
    const [internalMobileOpen, setInternalMobileOpen] = React.useState(defaultMobileOpen);
    const [scrolled, setScrolled] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const lastScrollY = React.useRef(0);

    const openValue = value !== undefined ? value : internalValue;
    const mobileOpen = controlledMobileOpen ?? internalMobileOpen;

    const setOpenValue = React.useCallback(
      (nextValue: string | null) => {
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
      },
      [onValueChange, value]
    );

    const setMobileOpen = React.useCallback(
      (nextOpen: boolean) => {
        if (controlledMobileOpen === undefined) setInternalMobileOpen(nextOpen);
        onMobileOpenChange?.(nextOpen);
      },
      [controlledMobileOpen, onMobileOpenChange]
    );

    React.useImperativeHandle(forwardedRef, () => rootRef.current as HTMLElement);

    React.useEffect(() => {
      if (scrollBehavior === "none") return;
      const ownerWindow = rootRef.current?.ownerDocument.defaultView ?? window;
      const handleScroll = () => {
        const nextY = Math.max(0, ownerWindow.scrollY);
        setScrolled(nextY > scrollThreshold);
        if (scrollBehavior === "hide" && !reduceMotion) {
          setHidden(nextY > scrollThreshold && nextY > lastScrollY.current);
        } else {
          setHidden(false);
        }
        lastScrollY.current = nextY;
      };
      handleScroll();
      ownerWindow.addEventListener("scroll", handleScroll, { passive: true });
      return () => ownerWindow.removeEventListener("scroll", handleScroll);
    }, [reduceMotion, scrollBehavior, scrollThreshold]);

    React.useEffect(() => {
      if (!openValue) return;
      const ownerDocument = rootRef.current?.ownerDocument ?? document;
      const handlePointerDown = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) setOpenValue(null);
      };
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
      return () => ownerDocument.removeEventListener("pointerdown", handlePointerDown);
    }, [openValue, setOpenValue]);

    const closeMenus = React.useCallback(
      (restoreFocus = false) => {
        const hadMobileMenu = mobileOpen;
        setOpenValue(null);
        setMobileOpen(false);
        if (restoreFocus) {
          requestAnimationFrame(() => {
            (hadMobileMenu ? mobileTriggerRef.current : lastTriggerRef.current)?.focus();
          });
        }
      },
      [mobileOpen, setMobileOpen, setOpenValue]
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Escape" && (openValue || mobileOpen)) {
        event.preventDefault();
        closeMenus(true);
      }
      onKeyDown?.(event);
    };

    const contextValue = React.useMemo(
      () => ({
        openValue,
        setOpenValue,
        mobileOpen,
        setMobileOpen,
        logoPosition,
        lastTriggerRef,
        mobileTriggerRef,
      }),
      [logoPosition, mobileOpen, openValue, setMobileOpen, setOpenValue]
    );

    return (
      <NavigationMenuContext.Provider value={contextValue}>
        <motion.nav
          ref={rootRef}
          aria-label="Primary navigation"
          data-logo-position={logoPosition}
          data-surface={surface}
          data-scrolled={scrolled ? "true" : "false"}
          initial={false}
          animate={{ y: hidden ? "-100%" : 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            navigationMenuVariants({ position, surface, scrolled }),
            mobileOpen && "z-50",
            className
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </motion.nav>
      </NavigationMenuContext.Provider>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

export interface NavigationMenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "lg" | "xl" | "2xl" | "full";
}

const NavigationMenuBar = React.forwardRef<HTMLDivElement, NavigationMenuBarProps>(
  ({ className, maxWidth = "xl", children, ...props }, ref) => {
    const maxWidths = {
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-none",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto grid min-h-16 w-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 transition-[min-height] duration-200 sm:px-6",
          maxWidths[maxWidth],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavigationMenuBar.displayName = "NavigationMenuBar";

export interface NavigationMenuBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const NavigationMenuBrand = React.forwardRef<HTMLAnchorElement, NavigationMenuBrandProps>(
  ({ className, children, ...props }, ref) => {
    const { logoPosition } = useNavigationMenu();
    const positionClasses = {
      left: "col-start-1 justify-self-start",
      center: "col-start-2 justify-self-center",
      right: "col-start-3 justify-self-end",
    };
    return (
      <a
        ref={ref}
        className={cn(
          "text-foreground focus-visible:ring-primary/40 row-start-1 inline-flex min-h-11 items-center gap-2 font-semibold tracking-tight focus-visible:ring-2 focus-visible:outline-none",
          positionClasses[logoPosition],
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NavigationMenuBrand.displayName = "NavigationMenuBrand";

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

const NavigationMenuList = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, children, ...props }, ref) => {
    const { logoPosition } = useNavigationMenu();
    const positionClasses = {
      left: "col-start-2 justify-self-center",
      center: "col-start-1 justify-self-start",
      right: "col-start-2 justify-self-center",
    };
    return (
      <ul
        ref={ref}
        className={cn(
          "row-start-1 hidden list-none items-center gap-1 p-0 md:flex",
          positionClasses[logoPosition],
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
NavigationMenuList.displayName = "NavigationMenuList";

export interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value?: string;
}

const NavigationMenuItem = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const generatedValue = React.useId();
    return (
      <NavigationMenuItemContext.Provider value={value ?? generatedValue}>
        <li ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </li>
      </NavigationMenuItemContext.Provider>
    );
  }
);
NavigationMenuItem.displayName = "NavigationMenuItem";

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, active = false, children, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(
        "focus-visible:ring-primary/40 inline-flex min-h-11 items-center rounded-xl px-3.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]",
        active
          ? "bg-foreground/[0.06] text-foreground"
          : "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
NavigationMenuLink.displayName = "NavigationMenuLink";

export interface NavigationMenuTriggerProps extends Omit<
  ButtonProps,
  "value" | "variant" | "size"
> {}

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const value = useNavigationMenuItem();
    const { openValue, setOpenValue, lastTriggerRef } = useNavigationMenu();
    const open = openValue === value;
    const contentId = `navigation-menu-content-${value.replace(/:/g, "")}`;
    return (
      <Button
        ref={(node) => {
          const buttonNode = node as HTMLButtonElement | null;
          if (typeof ref === "function") ref(buttonNode);
          else if (ref) ref.current = buttonNode;
          if (open) lastTriggerRef.current = node;
        }}
        type="button"
        variant="plain"
        color="zinc"
        size="sm"
        radius="md"
        aria-expanded={open}
        aria-controls={contentId}
        endContent={
          <ChevronDown
            aria-hidden="true"
            className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
          />
        }
        className={cn("text-muted-foreground hover:text-foreground", className)}
        onClick={(event) => {
          lastTriggerRef.current = event.currentTarget;
          setOpenValue(open ? null : value);
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export interface NavigationMenuContentProps extends Omit<HTMLMotionProps<"div">, "layout"> {
  layout?: "dropdown" | "mega";
  align?: "start" | "center" | "end";
}

const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, layout = "dropdown", align = "start", children, ...props }, ref) => {
    const value = useNavigationMenuItem();
    const { openValue } = useNavigationMenu();
    const open = openValue === value;
    const alignClasses = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    };
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            id={`navigation-menu-content-${value.replace(/:/g, "")}`}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "border-border bg-popover text-popover-foreground absolute top-[calc(100%+0.75rem)] z-50 rounded-2xl border p-2 shadow-xl",
              layout === "dropdown" ? "w-64" : "w-[min(720px,calc(100vw-2rem))] p-4",
              alignClasses[align],
              className
            )}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
NavigationMenuContent.displayName = "NavigationMenuContent";

export interface NavigationMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

const NavigationMenuGroup = React.forwardRef<HTMLDivElement, NavigationMenuGroupProps>(
  ({ className, columns = 1, children, ...props }, ref) => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };
    return (
      <div ref={ref} className={cn("grid gap-1", columnClasses[columns], className)} {...props}>
        {children}
      </div>
    );
  }
);
NavigationMenuGroup.displayName = "NavigationMenuGroup";

export interface NavigationMenuCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  description?: React.ReactNode;
  startContent?: React.ReactNode;
}

const NavigationMenuCard = React.forwardRef<HTMLAnchorElement, NavigationMenuCardProps>(
  ({ className, children, description, startContent, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "group hover:bg-foreground/[0.05] focus-visible:ring-primary/40 flex min-h-11 items-start gap-3 rounded-xl p-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-[0.99]",
        className
      )}
      {...props}
    >
      {startContent && (
        <span className="border-border bg-background text-muted-foreground group-hover:text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors">
          {startContent}
        </span>
      )}
      <span className="min-w-0">
        <span className="text-foreground block text-sm font-medium">{children}</span>
        {description && (
          <span className="text-muted-foreground mt-1 block text-sm leading-5">{description}</span>
        )}
      </span>
    </a>
  )
);
NavigationMenuCard.displayName = "NavigationMenuCard";

export interface NavigationMenuActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuActions = React.forwardRef<HTMLDivElement, NavigationMenuActionsProps>(
  ({ className, children, ...props }, ref) => {
    const { logoPosition } = useNavigationMenu();
    const positionClasses = {
      left: "col-start-3 justify-self-end",
      center: "col-start-3 justify-self-end",
      right: "col-start-1 flex-row-reverse justify-self-start",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "row-start-1 flex items-center gap-2",
          positionClasses[logoPosition],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavigationMenuActions.displayName = "NavigationMenuActions";

export interface NavigationMenuActionProps extends Omit<ButtonProps, "variant" | "color"> {
  intent?: "primary" | "secondary";
}

const NavigationMenuAction = React.forwardRef<HTMLButtonElement, NavigationMenuActionProps>(
  ({ intent = "secondary", size = "sm", radius = "md", ...props }, ref) => (
    <Button
      ref={ref}
      variant={intent === "primary" ? "solid" : "outline"}
      color={intent === "primary" ? "primary" : "zinc"}
      size={size}
      radius={radius}
      {...props}
    />
  )
);
NavigationMenuAction.displayName = "NavigationMenuAction";

export interface NavigationMenuSearchProps extends Omit<
  ButtonProps,
  "variant" | "color" | "startContent"
> {
  shortcut?: React.ReactNode;
}

const NavigationMenuSearch = React.forwardRef<HTMLButtonElement, NavigationMenuSearchProps>(
  (
    {
      className,
      children = "Search",
      shortcut,
      "aria-label": ariaLabel = typeof children === "string" ? children : "Search",
      ...props
    },
    ref
  ) => (
    <Button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      variant="outline"
      color="zinc"
      size="sm"
      radius="md"
      startContent={<Search aria-hidden="true" className="h-4 w-4" />}
      className={cn("text-muted-foreground hidden sm:inline-flex", className)}
      {...props}
    >
      <span className="hidden lg:inline">{children}</span>
      {shortcut && (
        <span
          aria-hidden="true"
          className="border-border bg-muted text-muted-foreground hidden rounded-md border px-1.5 py-0.5 text-[11px] leading-none xl:inline"
        >
          {shortcut}
        </span>
      )}
    </Button>
  )
);
NavigationMenuSearch.displayName = "NavigationMenuSearch";

export interface NavigationMenuToggleProps extends Omit<
  ButtonProps,
  "variant" | "color" | "isIconOnly"
> {}

const NavigationMenuToggle = React.forwardRef<HTMLButtonElement, NavigationMenuToggleProps>(
  ({ className, onClick, "aria-label": ariaLabel = "Toggle navigation", ...props }, ref) => {
    const { mobileOpen, setMobileOpen, mobileTriggerRef } = useNavigationMenu();
    return (
      <Button
        ref={(node) => {
          mobileTriggerRef.current = node;
          const buttonNode = node as HTMLButtonElement | null;
          if (typeof ref === "function") ref(buttonNode);
          else if (ref) ref.current = buttonNode;
        }}
        type="button"
        variant="plain"
        color="zinc"
        size="md"
        radius="md"
        isIconOnly
        aria-label={ariaLabel}
        aria-expanded={mobileOpen}
        aria-controls="navigation-menu-mobile-panel"
        className={cn("md:hidden", className)}
        onClick={(event) => {
          setMobileOpen(!mobileOpen);
          onClick?.(event);
        }}
        {...props}
      >
        {mobileOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </Button>
    );
  }
);
NavigationMenuToggle.displayName = "NavigationMenuToggle";

export interface NavigationMenuMobileProps extends HTMLMotionProps<"div"> {}

const NavigationMenuMobile = React.forwardRef<HTMLDivElement, NavigationMenuMobileProps>(
  ({ className, children, ...props }, ref) => {
    const { mobileOpen } = useNavigationMenu();
    const reduceMotion = useReducedMotion();
    return (
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={ref}
            id="navigation-menu-mobile-panel"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "border-border bg-background border-t px-4 py-4 shadow-lg md:hidden",
              className
            )}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
NavigationMenuMobile.displayName = "NavigationMenuMobile";

export {
  NavigationMenu,
  NavigationMenuAction,
  NavigationMenuActions,
  NavigationMenuBar,
  NavigationMenuBrand,
  NavigationMenuCard,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuMobile,
  NavigationMenuSearch,
  NavigationMenuToggle,
  NavigationMenuTrigger,
  navigationMenuVariants,
};
