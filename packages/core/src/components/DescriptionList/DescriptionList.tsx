// packages/core/src/components/DescriptionList/DescriptionList.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type DescriptionListVariant = "flat" | "card";
export type DescriptionListOrientation = "horizontal" | "vertical";

interface DescriptionListContextValue {
  orientation: DescriptionListOrientation;
}

const DescriptionListContext = React.createContext<DescriptionListContextValue>({
  orientation: "horizontal",
});

const descriptionListVariants = cva("w-full divide-y divide-zinc-200/60 dark:divide-zinc-800/60", {
  variants: {
    variant: {
      flat: "bg-transparent",
      card: "rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 sm:p-6 shadow-2xs",
    },
  },
  defaultVariants: {
    variant: "flat",
  },
});

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement>, VariantProps<typeof descriptionListVariants> {
  orientation?: DescriptionListOrientation;
}

const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, variant = "flat", orientation = "horizontal", children, ...props }, ref) => {
    return (
      <DescriptionListContext.Provider value={{ orientation }}>
        <dl ref={ref} className={cn(descriptionListVariants({ variant }), className)} {...props}>
          {children}
        </dl>
      </DescriptionListContext.Provider>
    );
  }
);
DescriptionList.displayName = "DescriptionList";

export interface DescriptionListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DescriptionListOrientation;
}

const DescriptionListItem = React.forwardRef<HTMLDivElement, DescriptionListItemProps>(
  ({ className, orientation: itemOrientation, children, ...props }, ref) => {
    const context = React.useContext(DescriptionListContext);
    const resolvedOrientation = itemOrientation ?? context.orientation;

    return (
      <div
        ref={ref}
        className={cn(
          "py-3.5 first:pt-0 last:pb-0",
          resolvedOrientation === "horizontal"
            ? "grid grid-cols-1 items-baseline sm:grid-cols-3 sm:gap-4"
            : "flex flex-col gap-1.5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DescriptionListItem.displayName = "DescriptionListItem";

export interface DescriptionListLabelProps extends React.HTMLAttributes<HTMLElement> {}

const DescriptionListLabel = React.forwardRef<HTMLElement, DescriptionListLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={cn(
          "text-sm font-medium text-zinc-500 select-none dark:text-zinc-400",
          className
        )}
        {...props}
      >
        {children}
      </dt>
    );
  }
);
DescriptionListLabel.displayName = "DescriptionListLabel";

export interface DescriptionListValueProps extends React.HTMLAttributes<HTMLElement> {}

const DescriptionListValue = React.forwardRef<HTMLElement, DescriptionListValueProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        className={cn(
          "mt-1 text-sm font-normal text-zinc-900 sm:col-span-2 sm:mt-0 dark:text-zinc-50",
          className
        )}
        {...props}
      >
        {children}
      </dd>
    );
  }
);
DescriptionListValue.displayName = "DescriptionListValue";

export {
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
  descriptionListVariants,
};
