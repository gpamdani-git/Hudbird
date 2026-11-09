"use client";
import * as React from "react";

export type NavbarContainerWidth = "compact" | "standard" | "wide" | "floating" | "full";

export interface NavbarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: NavbarContainerWidth;
  className?: string;
  children: React.ReactNode;
}

const widthClasses: Record<NavbarContainerWidth, string> = {
  compact: "max-w-5xl mx-auto px-4 sm:px-6",
  standard: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  wide: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  floating: "max-w-5xl mx-auto px-3 sm:px-4",
  full: "w-full px-4 sm:px-6 lg:px-8",
};

export const NavbarContainer = React.forwardRef<HTMLDivElement, NavbarContainerProps>(
  ({ width = "standard", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full transition-all duration-150 ${widthClasses[width]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarContainer.displayName = "NavbarContainer";
