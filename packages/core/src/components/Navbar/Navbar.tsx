// packages/core/src/components/Navbar/Navbar.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

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

const navbarVariants = cva(
  "w-full transition-all duration-200 box-border",
  {
    variants: {
      position: {
        static: "relative z-40",
        sticky: "sticky top-0 z-40",
        fixed: "fixed top-0 left-0 right-0 z-40",
      },
      styleVariant: {
        glassmorphism:
          "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md backdrop-saturate-150 border-b border-zinc-200/80 dark:border-zinc-800/80",
        transparent:
          "bg-transparent border-b border-transparent shadow-none",
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
  }
);

const containerMaxWidths: Record<NavbarMaxWidth, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
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
        const scrollbarWidth =
          currentWindow
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
    const menuChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        ((child.type as any)?.displayName === "NavbarMenu" ||
          (child.type as any)?.__isNavbarMenu ||
          child.type === NavbarMenu ||
          (child.props as any)?.variant !== undefined ||
          (child.props as any)?.isContained !== undefined)
      ) {
        menuChildren.push(child);
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
            isMenuOpen && "z-50"
          )}
          {...props}
        >
          <div
            className={cn(
              "mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 flex-nowrap",
              !isFloating && containerMaxWidths[maxWidth],
              isFloating && "px-3 sm:px-5"
            )}
          >
            {barChildren}
          </div>
          {menuChildren}
        </nav>
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
          "flex items-center gap-2.5 shrink-0 text-zinc-900 dark:text-zinc-50 font-bold tracking-tight select-none cursor-pointer whitespace-nowrap",
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
    const shouldHideOnMobile =
      hideOnMobile !== undefined ? hideOnMobile : justify === "center";

    return (
      <ul
        ref={ref}
        className={cn(
          "items-center gap-2 sm:gap-4 lg:gap-5 list-none p-0 m-0 min-w-0 shrink-0",
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
          "relative flex items-center text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 select-none",
          isActive
            ? "text-zinc-950 dark:text-white font-semibold"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100",
          className
        )}
        {...props}
      >
        {children}
        {isActive && (
          <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-zinc-950 dark:bg-white rounded-full transition-all pointer-events-none" />
        )}
      </li>
    );
  }
);
NavbarItem.displayName = "NavbarItem";

/* -------------------------------------------------------------------------------------------------
 * NavbarMenuToggle (Mobile-First: flex md:hidden - appears on mobile, hides on desktop)
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarMenuToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
          "relative h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 shrink-0 select-none cursor-pointer",
          className
        )}
        {...props}
      >
        {icon ? (
          icon
        ) : (
          <div className="relative flex h-4 w-4 flex-col justify-between items-center overflow-hidden">
            {/* Top Line */}
            <motion.span
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 7, width: 16 }
                  : { rotate: 0, y: 0, width: 16 }
              }
              transition={lineSpringTransition}
              className="h-0.5 rounded-full bg-current origin-center"
            />
            {/* Middle Line */}
            <motion.span
              animate={
                isMenuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1, width: 16 }
              }
              transition={{ duration: 0.15 }}
              className="h-0.5 rounded-full bg-current origin-center"
            />
            {/* Bottom Line */}
            <motion.span
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -7, width: 16 }
                  : { rotate: 0, y: 0, width: 16 }
              }
              transition={lineSpringTransition}
              className="h-0.5 rounded-full bg-current origin-center"
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
    const isContained =
      explicitContained !== undefined ? explicitContained : contextContained;
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
                "absolute left-0 w-full z-50 bg-white dark:bg-zinc-950 flex flex-col p-6 shadow-xl overflow-y-auto",
                isContained
                  ? "top-full rounded-b-2xl max-h-[500px]"
                  : "top-16 max-h-[calc(100vh-4rem)]",
                isFloating && !isContained && "top-20",
                className
              )}
              {...(props as any)}
            >
              {title && (
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {title}
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-1.5 flex-1">{children}</div>
              {footer && (
                <div className="pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-800 shrink-0">
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
                "z-[99999] overflow-hidden pointer-events-auto"
              )}
            >
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs cursor-pointer z-10"
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
                  "absolute top-0 bottom-0 left-0 h-full w-[84%] sm:w-[320px] max-w-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 flex flex-col justify-between shadow-2xl z-20 overflow-y-auto pointer-events-auto",
                  className
                )}
                {...(props as any)}
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
                      {title || "Navigation"}
                    </span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                      aria-label="Close menu"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">{children}</div>
                </div>

                {footer && (
                  <div className="pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
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
                "z-[99999] overflow-hidden flex justify-end pointer-events-auto"
              )}
            >
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs cursor-pointer z-10"
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
                  "absolute top-0 bottom-0 right-0 h-full w-[84%] sm:w-[320px] max-w-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 flex flex-col justify-between shadow-2xl z-20 overflow-y-auto pointer-events-auto",
                  className
                )}
                {...(props as any)}
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
                      {title || "Navigation"}
                    </span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                      aria-label="Close menu"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">{children}</div>
                </div>

                {footer && (
                  <div className="pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
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
              "h-full w-full bg-white dark:bg-zinc-950 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto pointer-events-auto shadow-2xl",
              className
            )}
            {...(props as any)}
          >
            {/* Fullscreen Header with Brand & Close Button */}
            <div className="flex items-center justify-between pb-6 shrink-0 border-b border-zinc-100 dark:border-zinc-800">
              <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-50">
                {title || "Menu"}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:scale-105 active:scale-95 transition-all text-sm font-bold shadow-xs cursor-pointer"
                aria-label="Close fullscreen menu"
              >
                ✕
              </button>
            </div>

            {/* Links Center */}
            <div className="my-auto py-6 flex flex-col gap-3">{children}</div>

            {/* Footer Information */}
            {footer && (
              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 shrink-0">
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
          "flex items-center w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer select-none",
          isActive
            ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold shadow-xs"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-950 dark:hover:text-zinc-100",
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
            className={cn(
              "absolute top-full left-0 right-0 z-[9990] w-full pt-2",
              className
            )}
            onMouseLeave={onClose}
            {...(props as any)}
          >
            <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-xl">
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
              "absolute top-full mt-2 min-w-[220px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-2 shadow-xl backdrop-blur-xl z-[9990]",
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
