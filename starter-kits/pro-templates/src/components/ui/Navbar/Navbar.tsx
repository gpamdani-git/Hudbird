// packages/core/src/components/Navbar/Navbar.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export type NavbarLayout = "standard" | "admin";
export type NavbarPosition = "static" | "sticky" | "fixed";
export type NavbarMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type NavbarLogoPosition = "left" | "center" | "right";
export type NavbarStyleVariant = "glassmorphism" | "transparent" | "floating-full";
export type NavbarMobileMenuVariant = "top" | "left" | "right" | "fullscreen";

interface NavbarContextValue {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  layout: NavbarLayout;
  logoPosition: NavbarLogoPosition;
  styleVariant: NavbarStyleVariant;
  mobileMenuVariant: NavbarMobileMenuVariant;
  isContained: boolean;
  isBordered: boolean;
  isBlurred: boolean;
}

const NavbarContext = React.createContext<NavbarContextValue | undefined>(undefined);

export function useNavbarContext() {
  const context = React.useContext(NavbarContext);
  if (!context) {
    throw new Error("Navbar sub-components must be rendered within a <Navbar> provider.");
  }
  return context;
}

const navbarVariants = cva("w-full transition-all duration-200 box-border", {
  variants: {
    position: {
      static: "relative z-40",
      sticky: "sticky top-0 z-40",
      fixed: "fixed top-0 left-0 right-0 z-40",
    },
    styleVariant: {
      glassmorphism:
        "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md backdrop-saturate-150 border-b border-zinc-200/80 dark:border-zinc-800/80",
      transparent: "bg-transparent border-b border-transparent shadow-none",
      "floating-full":
        "mt-2 sm:mt-4 mx-auto max-w-5xl rounded-full border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg shadow-zinc-950/5 dark:shadow-black/40 px-3 sm:px-6 transition-all",
    },
    isBordered: {
      true: "",
      false: "border-transparent dark:border-transparent",
    },
    isBlurred: {
      true: "",
      false: "backdrop-blur-none bg-white dark:bg-zinc-950",
    },
  },
  defaultVariants: {
    position: "sticky",
    styleVariant: "glassmorphism",
    isBordered: true,
    isBlurred: true,
  },
});

const containerMaxWidths: Record<NavbarMaxWidth, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof navbarVariants> {
  layout?: NavbarLayout;
  logoPosition?: NavbarLogoPosition;
  styleVariant?: NavbarStyleVariant;
  mobileMenuVariant?: NavbarMobileMenuVariant;
  position?: NavbarPosition;
  isBordered?: boolean;
  isBlurred?: boolean;
  maxWidth?: NavbarMaxWidth;
  isMenuOpen?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
  isMenuDefaultOpen?: boolean;
  isContained?: boolean;
  lockScroll?: boolean;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      layout = "standard",
      logoPosition = "left",
      styleVariant = "glassmorphism",
      mobileMenuVariant = "top",
      position = "sticky",
      isBordered = true,
      isBlurred = true,
      maxWidth = "full",
      isMenuOpen: controlledIsMenuOpen,
      onMenuOpenChange,
      isMenuDefaultOpen = false,
      isContained = false,
      lockScroll = true,
      children,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLElement>(null);
    const mergedRef = React.useMemo(() => {
      if (typeof ref === "function") {
        return (node: HTMLElement | null) => {
          ref(node);
          internalRef.current = node;
        };
      } else if (ref) {
        return (node: HTMLElement | null) => {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          internalRef.current = node;
        };
      }
      return internalRef;
    }, [ref]);

    const [uncontrolledIsMenuOpen, setUncontrolledIsMenuOpen] =
      React.useState<boolean>(isMenuDefaultOpen);

    const isControlled = controlledIsMenuOpen !== undefined;
    const isMenuOpen = isControlled ? controlledIsMenuOpen : uncontrolledIsMenuOpen;

    const setIsMenuOpen = React.useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const nextValue = typeof value === "function" ? value(isMenuOpen) : value;
        if (!isControlled) {
          setUncontrolledIsMenuOpen(nextValue);
        }
        onMenuOpenChange?.(nextValue);
      },
      [isControlled, isMenuOpen, onMenuOpenChange]
    );

    // Prevent body-scroll leak when mobile drawer is open in full viewport mode
    React.useEffect(() => {
      // Find the correct document context in case we are rendered in an iframe portal
      const currentDocument =
        (typeof window !== "undefined" && internalRef.current?.ownerDocument) ||
        (typeof document !== "undefined" ? document : null);

      if (isMenuOpen && lockScroll && !isContained && currentDocument) {
        const docBody = currentDocument.body;
        const originalOverflow = docBody.style.overflow;
        const originalPaddingRight = docBody.style.paddingRight;
        const currentWindow = currentDocument.defaultView || window;
        const scrollbarWidth = currentWindow
          ? currentWindow.innerWidth - currentDocument.documentElement.clientWidth
          : 0;

        docBody.style.overflow = "hidden";
        if (scrollbarWidth > 0) {
          docBody.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
          docBody.style.overflow = originalOverflow;
          docBody.style.paddingRight = originalPaddingRight;
        };
      }
    }, [isMenuOpen, lockScroll, isContained, internalRef.current]);

    const contextValue = React.useMemo(
      () => ({
        isMenuOpen,
        setIsMenuOpen,
        layout,
        logoPosition,
        styleVariant,
        mobileMenuVariant,
        isContained,
        isBordered,
        isBlurred,
      }),
      [
        isMenuOpen,
        setIsMenuOpen,
        layout,
        logoPosition,
        styleVariant,
        mobileMenuVariant,
        isContained,
        isBordered,
        isBlurred,
      ]
    );

    const isFloating = styleVariant === "floating-full";

    // Separate NavbarMenu from main header children so drawer overlays are never constrained by the h-16 flex row
    const barChildren: React.ReactNode[] = [];
    const leftRightFullscreenMenuChildren: React.ReactNode[] = [];
    const topMenuChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        ((child.type as any)?.displayName === "NavbarMenu" ||
          (child.type as any)?.__isNavbarMenu ||
          child.type === NavbarMenu ||
          (child.props as any)?.variant !== undefined ||
          (child.props as any)?.isContained !== undefined)
      ) {
        if ((child.props as any)?.variant === "top" || !(child.props as any)?.variant) {
          topMenuChildren.push(child);
        } else {
          leftRightFullscreenMenuChildren.push(child);
        }
      } else {
        barChildren.push(child);
      }
    });

    return (
      <NavbarContext.Provider value={contextValue}>
        <nav
          ref={mergedRef}
          data-logo-position={logoPosition}
          data-style-variant={styleVariant}
          data-mobile-variant={mobileMenuVariant}
          className={cn(
            navbarVariants({
              position,
              styleVariant,
              isBordered,
              isBlurred,
              className,
            }),
            isMenuOpen && "z-50",
            isMenuOpen &&
              styleVariant === "transparent" &&
              "bg-white transition-colors dark:bg-zinc-950",
            isContained && styleVariant !== "floating-full" && "rounded-t-2xl",
            isContained && !isMenuOpen && styleVariant !== "floating-full" && "rounded-b-2xl"
          )}
          {...props}
        >
          <div
            className={cn(
              "mx-auto flex h-16 w-full flex-nowrap items-center justify-between px-4 sm:px-6",
              !isFloating && containerMaxWidths[maxWidth],
              isFloating && "px-3 sm:px-5"
            )}
          >
            {barChildren}
          </div>
          {topMenuChildren}
        </nav>
        {leftRightFullscreenMenuChildren}
      </NavbarContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

/* -------------------------------------------------------------------------------------------------
 * NavbarBrand
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: NavbarLogoPosition;
}

const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, position: explicitPosition, children, ...props }, ref) => {
    const { logoPosition: contextPosition } = useNavbarContext();
    const logoPosition = explicitPosition || contextPosition;

    const logoPositionClasses: Record<NavbarLogoPosition, string> = {
      left: "justify-start mr-auto shrink-0",
      center: "justify-center mx-auto shrink-0",
      right: "justify-end ml-auto order-last shrink-0",
    };

    return (
      <div
        ref={ref}
        data-position={logoPosition}
        className={cn(
          "flex shrink-0 cursor-pointer items-center gap-2.5 font-bold tracking-tight whitespace-nowrap text-zinc-900 select-none dark:text-zinc-50",
          logoPositionClasses[logoPosition],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarBrand.displayName = "NavbarBrand";

/* -------------------------------------------------------------------------------------------------
 * NavbarContent (Mobile-First Responsive Container: Center/Links hide on mobile, show on md:)
 * -----------------------------------------------------------------------------------------------*/

export type NavbarContentJustify = "start" | "center" | "end";

export interface NavbarContentProps extends React.HTMLAttributes<HTMLUListElement> {
  justify?: NavbarContentJustify;
  wrap?: boolean;
  hideOnMobile?: boolean;
}

const NavbarContent = React.forwardRef<HTMLUListElement, NavbarContentProps>(
  ({ className, justify = "start", wrap = false, hideOnMobile, children, ...props }, ref) => {
    const justifyClasses: Record<NavbarContentJustify, string> = {
      start: "justify-start mr-auto shrink-0",
      center: "justify-center flex-1 min-w-0 px-2",
      end: "justify-end ml-auto shrink-0",
    };

    // Center navigation links container strictly hides on mobile (hidden md:flex) by default
    const shouldHideOnMobile = hideOnMobile !== undefined ? hideOnMobile : justify === "center";

    return (
      <ul
        ref={ref}
        className={cn(
          "m-0 min-w-0 shrink-0 list-none items-center gap-2 p-0 sm:gap-4 lg:gap-5",
          wrap ? "flex-wrap" : "flex-nowrap",
          shouldHideOnMobile ? "hidden md:flex" : "flex",
          justifyClasses[justify],
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
NavbarContent.displayName = "NavbarContent";

/* -------------------------------------------------------------------------------------------------
 * NavbarItem
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isActive?: boolean;
}

const NavbarItem = React.forwardRef<HTMLLIElement, NavbarItemProps>(
  ({ className, isActive = false, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-active={isActive ? "true" : undefined}
        className={cn(
          "relative flex shrink-0 cursor-pointer items-center text-sm font-medium whitespace-nowrap transition-colors select-none",
          isActive
            ? "font-semibold text-zinc-950 dark:text-white"
            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100",
          className
        )}
        {...props}
      >
        {children}
        {isActive && (
          <span className="pointer-events-none absolute right-0 -bottom-[21px] left-0 h-[2px] rounded-full bg-zinc-950 transition-all dark:bg-white" />
        )}
      </li>
    );
  }
);
NavbarItem.displayName = "NavbarItem";

/* -------------------------------------------------------------------------------------------------
 * NavbarMenuToggle (Mobile-First: flex md:hidden - appears on mobile, hides on desktop)
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarMenuToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  "aria-label"?: string;
  forceVisible?: boolean;
}

const lineSpringTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

const NavbarMenuToggle = React.forwardRef<HTMLButtonElement, NavbarMenuToggleProps>(
  (
    {
      className,
      icon,
      "aria-label": ariaLabel = "Toggle navigation menu",
      forceVisible = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const { isMenuOpen, setIsMenuOpen } = useNavbarContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsMenuOpen((prev) => !prev);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isMenuOpen}
        onClick={handleClick}
        className={cn(
          forceVisible ? "flex" : "flex md:hidden",
          "relative h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-xs transition-all select-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950",
          className
        )}
        {...props}
      >
        {icon ? (
          icon
        ) : (
          <div className="relative flex h-4 w-4 flex-col items-center justify-between overflow-hidden">
            {/* Top Line */}
            <motion.span
              animate={
                isMenuOpen ? { rotate: 45, y: 7, width: 16 } : { rotate: 0, y: 0, width: 16 }
              }
              transition={lineSpringTransition}
              className="h-0.5 origin-center rounded-full bg-current"
            />
            {/* Middle Line */}
            <motion.span
              animate={
                isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, width: 16 }
              }
              transition={{ duration: 0.15 }}
              className="h-0.5 origin-center rounded-full bg-current"
            />
            {/* Bottom Line */}
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -7, width: 16 } : { rotate: 0, y: 0, width: 16 }
              }
              transition={lineSpringTransition}
              className="h-0.5 origin-center rounded-full bg-current"
            />
          </div>
        )}
      </button>
    );
  }
);
NavbarMenuToggle.displayName = "NavbarMenuToggle";

/* -------------------------------------------------------------------------------------------------
 * NavbarMenu (4 Variations: 'top' | 'left' | 'right' | 'fullscreen')
 * Arranges drawer links vertically in an isolated overlay with maximum z-index
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NavbarMobileMenuVariant;
  isContained?: boolean;
  title?: string;
  footer?: React.ReactNode;
  onClose?: () => void;
}

const NavbarMenu = React.forwardRef<HTMLDivElement, NavbarMenuProps>(
  (
    {
      className,
      variant: explicitVariant,
      isContained: explicitContained,
      title,
      footer,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const {
      isMenuOpen,
      setIsMenuOpen,
      mobileMenuVariant: contextVariant,
      isContained: contextContained,
      styleVariant,
    } = useNavbarContext();

    const variant = explicitVariant || contextVariant || "top";
    const isContained = explicitContained !== undefined ? explicitContained : contextContained;
    const isFloating = styleVariant === "floating-full";

    const handleClose = () => {
      setIsMenuOpen(false);
      onClose?.();
    };

    // 1. TOP DRAWER (Standard slide down from top-16 below navbar)
    if (variant === "top") {
      return (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "left-0 z-50 flex w-full flex-col overflow-y-auto p-6",
                // Conditional styling based on styleVariant
                styleVariant === "glassmorphism" || isFloating
                  ? "border-x border-b border-zinc-200/50 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/80"
                  : "bg-white shadow-xl dark:bg-zinc-950",

                isContained
                  ? "absolute top-16 max-h-[500px]"
                  : "fixed top-16 max-h-[calc(100vh-4rem)]",

                // When floating, detach from top edge and fully round it
                isFloating ? "mt-2 rounded-2xl border-t" : "rounded-b-2xl",

                isFloating && !isContained && "fixed top-20 mt-2",
                className
              )}
              {...(props as any)}
            >
              {title && (
                <div className="mb-2 flex shrink-0 items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {title}
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="cursor-pointer rounded-md p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="flex flex-1 flex-col gap-1.5">{children}</div>
              {footer && (
                <div className="mt-auto shrink-0 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  {footer}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      );
    }

    // 2. LEFT SIDE DRAWER (Slide in from Left with dark backdrop)
    if (variant === "left") {
      return (
        <AnimatePresence>
          {isMenuOpen && (
            <div
              className={cn(
                isContained ? "absolute inset-0" : "fixed inset-0",
                "pointer-events-auto z-[99999] overflow-hidden"
              )}
            >
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={handleClose}
                className="absolute inset-0 z-10 cursor-pointer bg-black/60 backdrop-blur-xs dark:bg-black/80"
              />

              {/* Side Drawer Panel */}
              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                initial={{ x: "-100%" }}
                animate={{
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 32,
                    staggerChildren: 0.04,
                    delayChildren: 0.06,
                  },
                }}
                exit={{
                  x: "-100%",
                  transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                }}
                className={cn(
                  "pointer-events-auto absolute top-0 bottom-0 left-0 z-20 flex h-full w-[84%] max-w-full flex-col justify-between overflow-y-auto border-r border-zinc-200 bg-white p-5 shadow-2xl sm:w-[320px] sm:p-6 dark:border-zinc-800 dark:bg-zinc-950",
                  className
                )}
                {...(props as any)}
              >
                <div className="flex flex-1 flex-col">
                  <div className="mb-4 flex shrink-0 items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                    <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {title || "Navigation"}
                    </span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors hover:text-zinc-900 dark:bg-zinc-900 dark:hover:text-zinc-100"
                      aria-label="Close menu"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">{children}</div>
                </div>

                {footer && (
                  <div className="mt-6 shrink-0 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    {footer}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      );
    }

    // 3. RIGHT SIDE DRAWER (Slide in from Right with dark backdrop)
    if (variant === "right") {
      return (
        <AnimatePresence>
          {isMenuOpen && (
            <div
              className={cn(
                isContained ? "absolute inset-0" : "fixed inset-0",
                "pointer-events-auto z-[99999] flex justify-end overflow-hidden"
              )}
            >
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={handleClose}
                className="absolute inset-0 z-10 cursor-pointer bg-black/60 backdrop-blur-xs dark:bg-black/80"
              />

              {/* Side Drawer Panel */}
              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                initial={{ x: "100%" }}
                animate={{
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 32,
                    staggerChildren: 0.04,
                    delayChildren: 0.06,
                  },
                }}
                exit={{
                  x: "100%",
                  transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                }}
                className={cn(
                  "pointer-events-auto absolute top-0 right-0 bottom-0 z-20 flex h-full w-[84%] max-w-full flex-col justify-between overflow-y-auto border-l border-zinc-200 bg-white p-5 shadow-2xl sm:w-[320px] sm:p-6 dark:border-zinc-800 dark:bg-zinc-950",
                  className
                )}
                {...(props as any)}
              >
                <div className="flex flex-1 flex-col">
                  <div className="mb-4 flex shrink-0 items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                    <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {title || "Navigation"}
                    </span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors hover:text-zinc-900 dark:bg-zinc-900 dark:hover:text-zinc-100"
                      aria-label="Close menu"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">{children}</div>
                </div>

                {footer && (
                  <div className="mt-6 shrink-0 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    {footer}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      );
    }

    // 4. FULLSCREEN DRAMATIC MENU (100% overlay with bold typography & close button)
    return (
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.05,
                delayChildren: 0.05,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
            }}
            className={cn(
              isContained ? "absolute inset-0 z-[99999]" : "fixed inset-0 z-[99999]",
              "pointer-events-auto flex h-full w-full flex-col justify-between overflow-y-auto bg-white p-6 shadow-2xl sm:p-10 dark:bg-zinc-950",
              className
            )}
            {...(props as any)}
          >
            {/* Fullscreen Header with Brand & Close Button */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 pb-6 dark:border-zinc-800">
              <span className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title || "Menu"}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-700 shadow-xs transition-all hover:scale-105 active:scale-95 dark:bg-zinc-900 dark:text-zinc-200"
                aria-label="Close fullscreen menu"
              >
                ✕
              </button>
            </div>

            {/* Links Center */}
            <div className="my-auto flex flex-col gap-3 py-6">{children}</div>

            {/* Footer Information */}
            {footer && (
              <div className="shrink-0 border-t border-zinc-100 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
                {footer}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
NavbarMenu.displayName = "NavbarMenu";
(NavbarMenu as any).__isNavbarMenu = true;

/* -------------------------------------------------------------------------------------------------
 * NavbarMenuItem
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const menuItemVariants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
};

const NavbarMenuItem = React.forwardRef<HTMLDivElement, NavbarMenuItemProps>(
  ({ className, isActive = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={menuItemVariants}
        data-active={isActive ? "true" : undefined}
        className={cn(
          "flex w-full cursor-pointer items-center rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all select-none",
          isActive
            ? "bg-zinc-100 font-semibold text-zinc-950 shadow-xs dark:bg-zinc-900 dark:text-white"
            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-100",
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);
NavbarMenuItem.displayName = "NavbarMenuItem";

/* -------------------------------------------------------------------------------------------------
 * NavbarMegaMenu (Framer Motion Animated E-Commerce Mega Menu)
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarMegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
}

const NavbarMegaMenu = React.forwardRef<HTMLDivElement, NavbarMegaMenuProps>(
  ({ className, isOpen, onClose, children, ...props }, ref) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            role="menu"
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn("absolute top-full right-0 left-0 z-[9990] w-full pt-2", className)}
            onMouseLeave={onClose}
            {...(props as any)}
          >
            <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
NavbarMegaMenu.displayName = "NavbarMegaMenu";

/* -------------------------------------------------------------------------------------------------
 * NavbarDropdownMenu (Standard Compact Dropdown Menu via Framer Motion)
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
  align?: "left" | "right" | "center";
}

const NavbarDropdownMenu = React.forwardRef<HTMLDivElement, NavbarDropdownMenuProps>(
  ({ className, isOpen, onClose, align = "left", children, ...props }, ref) => {
    const alignClasses = {
      left: "left-0",
      center: "left-1/2 -translate-x-1/2",
      right: "right-0",
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute top-full z-[9990] mt-2 min-w-[220px] rounded-xl border border-zinc-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95",
              alignClasses[align],
              className
            )}
            onMouseLeave={onClose}
            {...(props as any)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
NavbarDropdownMenu.displayName = "NavbarDropdownMenu";

export {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMegaMenu,
  NavbarDropdownMenu,
  navbarVariants,
};
