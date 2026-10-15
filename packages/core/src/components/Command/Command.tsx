// packages/core/src/components/Command/Command.tsx
"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

interface CommandContextValue {
  search: string;
  setSearch: (query: string) => void;
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
  itemCount: number;
  registerItem: () => number;
  unregisterItem: () => void;
  executeItem: (idx: number) => void;
  registerItemCallback: (idx: number, onSelect?: () => void) => void;
}

const CommandContext = React.createContext<CommandContextValue>({
  search: "",
  setSearch: () => {},
  selectedIndex: 0,
  setSelectedIndex: () => {},
  itemCount: 0,
  registerItem: () => 0,
  unregisterItem: () => {},
  executeItem: () => {},
  registerItemCallback: () => {},
});

export const useCommandContext = () => React.useContext(CommandContext);

// ----------------------------------------------------
// Command Root
// ----------------------------------------------------

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, children, ...props }, ref) => {
    const [search, setSearch] = React.useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [itemCount, setItemCount] = React.useState(0);
    const callbacks = React.useRef<Map<number, () => void>>(new Map());

    const registerItem = React.useCallback(() => {
      let idx = 0;
      setItemCount((prev) => {
        idx = prev;
        return prev + 1;
      });
      return idx;
    }, []);

    const unregisterItem = React.useCallback(() => {
      setItemCount((prev) => Math.max(0, prev - 1));
    }, []);

    const registerItemCallback = React.useCallback((idx: number, onSelect?: () => void) => {
      if (onSelect) {
        callbacks.current.set(idx, onSelect);
      } else {
        callbacks.current.delete(idx);
      }
    }, []);

    const executeItem = React.useCallback((idx: number) => {
      const cb = callbacks.current.get(idx);
      cb?.();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (itemCount === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % itemCount);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount);
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeItem(selectedIndex);
      }
    };

    return (
      <CommandContext.Provider
        value={{
          search,
          setSearch,
          selectedIndex,
          setSelectedIndex,
          itemCount,
          registerItem,
          unregisterItem,
          executeItem,
          registerItemCallback,
        }}
      >
        <div
          ref={ref}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);
Command.displayName = "Command";

// ----------------------------------------------------
// CommandDialog (Modal Container)
// ----------------------------------------------------

export interface CommandDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  isDismissable?: boolean;
  children: React.ReactNode;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({
  isOpen,
  onClose,
  isDismissable = true,
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard Escape & Global Cmd+K trigger
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && isDismissable) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDismissable, onClose]);

  // Lock scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const content = (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24">
      {/* Backdrop */}
      <div
        className="bg-background/80 animate-in fade-in-0 fixed inset-0 backdrop-blur-md transition-opacity duration-200"
        aria-hidden="true"
        onClick={() => {
          if (isDismissable) onClose?.();
        }}
      />

      {/* Modal Box */}
      <div className="animate-in fade-in-0 zoom-in-95 relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900">
        <Command>{children}</Command>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
};

// ----------------------------------------------------
// CommandInput
// ----------------------------------------------------

export interface CommandInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  onValueChange?: (val: string) => void;
}

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, placeholder = "Type a command or search...", onValueChange, ...props }, ref) => {
    const { search, setSearch, setSelectedIndex } = useCommandContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearch(val);
      setSelectedIndex(0);
      onValueChange?.(val);
    };

    return (
      <div className="flex items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Search className="mr-2.5 h-4 w-4 shrink-0 text-zinc-400" />
        <input
          ref={ref}
          type="text"
          value={search}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-500",
            className
          )}
          {...props}
        />
        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setSearch("");
              onValueChange?.("");
            }}
            className="rounded p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }
);
CommandInput.displayName = "CommandInput";

// ----------------------------------------------------
// CommandList
// ----------------------------------------------------

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="listbox"
      className={cn("max-h-80 overflow-x-hidden overflow-y-auto p-2 text-left", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CommandList.displayName = "CommandList";

// ----------------------------------------------------
// CommandEmpty
// ----------------------------------------------------

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children = "No results found.", ...props }, ref) => {
    const { itemCount } = useCommandContext();
    if (itemCount > 0) return null;

    return (
      <div
        ref={ref}
        className={cn("py-6 text-center text-sm text-zinc-500 dark:text-zinc-400", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandEmpty.displayName = "CommandEmpty";

// ----------------------------------------------------
// CommandGroup
// ----------------------------------------------------

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <div ref={ref} className={cn("text-foreground overflow-hidden p-1", className)} {...props}>
      {heading && (
        <div className="px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {heading}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
);
CommandGroup.displayName = "CommandGroup";

// ----------------------------------------------------
// CommandItem
// ----------------------------------------------------

function getCommandNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getCommandNodeText).join(" ");
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode; [key: string]: unknown };
    return getCommandNodeText(props.children);
  }
  return "";
}

export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: string;
  disabled?: boolean;
  onSelect?: () => void;
  keywords?: string[];
}

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  (
    { className, value, disabled = false, onSelect, keywords, children, onClick, ...props },
    ref
  ) => {
    const {
      search,
      selectedIndex,
      setSelectedIndex,
      registerItem,
      unregisterItem,
      registerItemCallback,
    } = useCommandContext();

    const [itemIdx, setItemIdx] = React.useState<number>(-1);

    // Text search filter
    const itemText = value || getCommandNodeText(children);
    const allSearchable = [itemText, ...(keywords || [])].join(" ").toLowerCase();
    const isVisible = !search || allSearchable.includes(search.trim().toLowerCase());

    React.useEffect(() => {
      if (isVisible && !disabled) {
        const idx = registerItem();
        setItemIdx(idx);
        registerItemCallback(idx, onSelect);
        return () => {
          unregisterItem();
          registerItemCallback(idx, undefined);
        };
      }
    }, [isVisible, disabled, registerItem, unregisterItem, registerItemCallback, onSelect]);

    if (!isVisible) return null;

    const isSelected = selectedIndex === itemIdx;

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          onSelect?.();
        }}
        onMouseEnter={() => {
          if (!disabled && itemIdx !== -1) {
            setSelectedIndex(itemIdx);
          }
        }}
        className={cn(
          "relative flex cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-colors outline-none select-none",
          isSelected
            ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
            : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60",
          disabled && "pointer-events-none cursor-not-allowed opacity-40",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandItem.displayName = "CommandItem";

// ----------------------------------------------------
// CommandShortcut
// ----------------------------------------------------

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CommandShortcut: React.FC<CommandShortcutProps> = ({ className, ...props }) => (
  <span
    className={cn(
      "ml-auto font-mono text-xs tracking-widest text-zinc-400 dark:text-zinc-500",
      className
    )}
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";
