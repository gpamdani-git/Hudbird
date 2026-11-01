// packages/core/src/components/Table/Table.tsx
"use client";

import * as React from "react";
import { cn } from "../../utils/cn";

export type TableVariant = "default" | "bordered" | "borderless" | "striped";
export type TableDensity = "compact" | "normal" | "relaxed";

interface TableContextValue {
  variant: TableVariant;
  density: TableDensity;
  isHoverable: boolean;
}

const TableContext = React.createContext<TableContextValue>({
  variant: "default",
  density: "normal",
  isHoverable: true,
});

export const useTableContext = () => React.useContext(TableContext);

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  density?: TableDensity;
  isHoverable?: boolean;
  wrapperClassName?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      wrapperClassName,
      variant = "default",
      density = "normal",
      isHoverable = true,
      children,
      ...props
    },
    ref
  ) => {
    const isFramed = variant !== "borderless";

    return (
      <TableContext.Provider value={{ variant, density, isHoverable }}>
        <div
          className={cn(
            "w-full overflow-auto",
            isFramed &&
              "rounded-2xl border border-black/[0.06] bg-white/70 shadow-xs backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#161618]/70",
            wrapperClassName
          )}
        >
          <table
            ref={ref}
            className={cn("w-full text-left text-sm whitespace-nowrap", className)}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);
Table.displayName = "Table";

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        "border-b border-black/[0.06] bg-zinc-50/80 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase select-none dark:border-white/[0.08] dark:bg-[#202124]/90 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("divide-y divide-black/[0.05] dark:divide-white/[0.06]", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-black/[0.06] bg-zinc-50/60 text-xs font-medium text-zinc-900 dark:border-white/[0.08] dark:bg-[#161618]/80 dark:text-zinc-100",
        className
      )}
      {...props}
    />
  )
);
TableFooter.displayName = "TableFooter";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, isSelected, ...props }, ref) => {
    const { variant, isHoverable } = useTableContext();

    return (
      <tr
        ref={ref}
        data-selected={isSelected}
        className={cn(
          "transition-colors duration-150",
          variant === "striped" && "even:bg-black/[0.02] dark:even:bg-white/[0.02]",
          isHoverable && "hover:bg-black/[0.025] dark:hover:bg-white/[0.04]",
          isSelected &&
            "bg-indigo-50/60 hover:bg-indigo-50/80 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/15",
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = "TableRow";

const densityHeadStyles: Record<TableDensity, string> = {
  compact: "px-3.5 py-2 text-[10px]",
  normal: "px-5 py-3.5 text-[11px]",
  relaxed: "px-6 py-4.5 text-xs",
};

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    const { density } = useTableContext();

    return (
      <th
        ref={ref}
        className={cn(
          "align-middle font-semibold [&:has([role=checkbox])]:pr-0",
          densityHeadStyles[density] || densityHeadStyles.normal,
          className
        )}
        {...props}
      />
    );
  }
);
TableHead.displayName = "TableHead";

const densityCellStyles: Record<TableDensity, string> = {
  compact: "px-3.5 py-2 text-xs",
  normal: "px-5 py-3.5 text-sm",
  relaxed: "px-6 py-4.5 text-sm sm:text-base",
};

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    const { density } = useTableContext();

    return (
      <td
        ref={ref}
        className={cn(
          "align-middle leading-normal font-normal text-zinc-800 dark:text-zinc-200 [&:has([role=checkbox])]:pr-0",
          densityCellStyles[density] || densityCellStyles.normal,
          className
        )}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  side?: "top" | "bottom";
}

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, side = "bottom", ...props }, ref) => (
    <caption
      ref={ref}
      className={cn(
        "font-medium text-zinc-500 select-none dark:text-zinc-400",
        side === "top"
          ? "caption-top pb-3 text-left text-xs"
          : "caption-bottom pt-3 text-center text-xs",
        className
      )}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
