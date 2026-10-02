"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// --- Context ---

const HeroContext = React.createContext<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
});

// --- Hero Container ---

const heroVariants = cva(
  "relative w-full overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300 flex flex-col",
  {
    variants: {
      size: {
        full: "min-h-[100dvh]",
        auto: "min-h-[50dvh]",
        fixed: "h-[80dvh] min-h-[600px]",
      },
    },
    defaultVariants: {
      size: "full",
    },
  }
);

interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof heroVariants> {
  children?: React.ReactNode;
  /** Pass false to hide the default aesthetic background blobs */
  withBlobs?: boolean;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ className, size, children, withBlobs = true, ...props }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
      <HeroContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
        <div ref={ref} className={cn(heroVariants({ size }), className)} {...props}>
          {withBlobs && (
            <>
              {/* Top aesthetic blur */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-20"
                />
              </div>

              {/* Bottom aesthetic blur */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:opacity-20"
                />
              </div>
            </>
          )}

          <div className="relative z-10 flex h-full flex-1 flex-col">{children}</div>
        </div>
      </HeroContext.Provider>
    );
  }
);
Hero.displayName = "Hero";

// --- Header ---

type LinkItem = { label: string; href?: string; className?: string; items?: { label: string; href: string }[]; onClick?: (e: React.MouseEvent) => void };

interface HeroHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: LinkItem[];
  action?: React.ReactNode;
}

const HeroHeader = React.forwardRef<HTMLElement, HeroHeaderProps>(
  ({ className, logo, links, action, ...props }, ref) => {
    const { mobileMenuOpen, setMobileMenuOpen } = React.useContext(HeroContext);

    return (
      <header
        ref={ref}
        className={cn("absolute inset-x-0 top-0 z-50 text-zinc-900 dark:text-zinc-100", className)}
        {...props}
      >
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">{logo}</div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-opacity hover:opacity-80"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {links?.map((item) =>
              item.items ? (
                <Dropdown key={item.label}>
                  <DropdownTrigger className="flex cursor-pointer items-center gap-1 text-sm leading-6 font-semibold transition-opacity hover:opacity-80">
                    {item.label}
                    <svg className="h-4 w-4 opacity-60" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {item.items.map((subItem) => (
                      <DropdownItem
                        key={subItem.label}
                        onClick={() => {
                          if (subItem.href) window.location.href = subItem.href;
                        }}
                      >
                        {subItem.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={item.onClick}
                  className={cn("text-sm leading-6 font-semibold transition-opacity hover:opacity-80", item.className)}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">{action}</div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div
              className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10 dark:bg-zinc-950 dark:sm:ring-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  {logo}
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-zinc-500/10 dark:divide-white/10">
                  <div className="space-y-2 py-6">
                    {links?.map((item) =>
                      item.items ? (
                        <div key={item.label}>
                          <div className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-zinc-900 dark:text-zinc-100">
                            {item.label}
                          </div>
                          <div className="mt-1 mb-2 ml-4 flex flex-col gap-1 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                            {item.items.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                className="block rounded-lg px-3 py-2 text-sm leading-6 font-medium text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900/50"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a
                          key={item.label}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
                        >
                          {item.label}
                        </a>
                      )
                    )}
                  </div>
                  <div className="py-6">{action}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </header>
    );
  }
);
HeroHeader.displayName = "Hero.Header";

// --- Body ---

const heroBodyVariants = cva("mx-auto w-full max-w-7xl", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center flex flex-col items-center",
      right: "text-right flex flex-col items-end",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export interface HeroBodyProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof heroBodyVariants> {}

const HeroBody = React.forwardRef<HTMLDivElement, HeroBodyProps>(
  ({ className, align, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="relative isolate flex h-full flex-1 flex-col justify-center px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8"
      >
        <div className={cn(heroBodyVariants({ align }), className)} {...props}>
          {children}
        </div>
      </div>
    );
  }
);
HeroBody.displayName = "Hero.Body";

// --- Content (For Split Layouts) ---

const heroContentVariants = cva("mx-auto max-w-2xl lg:mx-0 lg:max-w-xl", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center flex flex-col items-center",
      right: "text-right flex flex-col items-end",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export interface HeroContentProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof heroContentVariants> {}

const HeroContent = React.forwardRef<HTMLDivElement, HeroContentProps>(
  ({ className, align, ...props }, ref) => {
    return <div ref={ref} className={cn(heroContentVariants({ align }), className)} {...props} />;
  }
);
HeroContent.displayName = "Hero.Content";

// --- Media (For Split Layouts) ---

const HeroMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref as any}
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0 }}
        className={cn(
          "mx-auto mt-16 flex items-center justify-center lg:mt-0 lg:max-w-none",
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);
HeroMedia.displayName = "Hero.Media";

// --- Background (For Image Overlays) ---

interface HeroBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  overlayClassName?: string;
}

const HeroBackground = React.forwardRef<HTMLDivElement, HeroBackgroundProps>(
  ({ className, src, overlayClassName, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0 -z-20", className)} {...props}>
        <img src={src} alt="" className="h-full w-full object-cover" />
        {/* Default darkening overlay */}
        <div className={cn("absolute inset-0 bg-zinc-950/70", overlayClassName)} />
      </div>
    );
  }
);
HeroBackground.displayName = "Hero.Background";

// --- Badge ---

interface HeroBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const HeroBadge = React.forwardRef<HTMLDivElement, HeroBadgeProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <div className="mb-8 flex">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Comp
            ref={ref}
            className={cn(
              "relative cursor-pointer rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 ring-1 ring-zinc-900/10 backdrop-blur-sm transition-all hover:ring-zinc-900/20 dark:text-zinc-300 dark:ring-white/10 dark:hover:ring-white/20",
              className
            )}
            {...props}
          />
        </motion.div>
      </div>
    );
  }
);
HeroBadge.displayName = "Hero.Badge";

// --- Title ---

const HeroTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0 }}
        ref={ref}
        className={cn(
          "text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-7xl lg:max-w-3xl dark:text-white",
          className
        )}
        {...(props as any)}
      />
    );
  }
);
HeroTitle.displayName = "Hero.Title";

// --- Description ---

const HeroDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, type: "spring", bounce: 0 }}
      ref={ref}
      className={cn(
        "mt-8 text-lg font-medium text-pretty text-zinc-600 sm:text-xl/8 lg:max-w-3xl dark:text-zinc-400",
        className
      )}
      {...(props as any)}
    />
  );
});
HeroDescription.displayName = "Hero.Description";

// --- Actions ---

const HeroActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0 }}
        ref={ref}
        className={cn("mt-10 flex items-center gap-x-6", className)}
        {...(props as any)}
      />
    );
  }
);
HeroActions.displayName = "Hero.Actions";

export {
  Hero,
  HeroHeader,
  HeroBody,
  HeroContent,
  HeroMedia,
  HeroBackground,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
};
