// packages/core/src/components/Select/Select.tsx
import React, { useState, useRef, useEffect, createContext, useContext, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../utils/cn";

// --- Context for Sub-components ---
interface SelectContextValue {
  selectedValue?: string;
  onSelectOption: (value: string, label: React.ReactNode) => void;
  size?: "sm" | "md" | "lg";
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("SelectItem must be used within a Select component");
  }
  return context;
}

// --- Trigger CVA Variants ---
export const selectTriggerVariants = cva(
  "w-full inline-flex items-center justify-between text-left transition-all duration-150 outline-none select-none font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        flat: "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
        bordered:
          "bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
      },
      size: {
        sm: "h-9 px-3 text-xs gap-2",
        md: "h-10 px-3.5 text-sm gap-2.5",
        lg: "h-12 px-4 text-base gap-3",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      isInvalid: {
        true: "border-rose-500! dark:border-rose-500! focus-visible:ring-rose-500!",
        false: "",
      },
    },
    defaultVariants: {
      variant: "flat",
      size: "md",
      radius: "md",
      isInvalid: false,
    },
  }
);

export type SelectVariant = "flat" | "bordered";
export type SelectSize = "sm" | "md" | "lg";
export type SelectRadius = "none" | "md" | "lg" | "full";

export interface SelectProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof selectTriggerVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  isInvalid?: boolean;
  name?: string;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Select an option",
      label,
      description,
      errorMessage,
      disabled = false,
      isInvalid = false,
      variant = "flat",
      size = "md",
      radius = "md",
      className,
      children,
      name,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [selectedLabel, setSelectedLabel] = useState<React.ReactNode>(null);

    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : internalValue;

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Extract item label if children are static or when value changes
    useEffect(() => {
      let foundLabel: React.ReactNode = null;
      React.Children.forEach(children, (child) => {
        if (
          React.isValidElement<{ value?: string; children?: React.ReactNode }>(child) &&
          child.props.value === activeValue
        ) {
          foundLabel = child.props.children;
        }
      });
      if (foundLabel) {
        setSelectedLabel(foundLabel);
      } else if (!activeValue) {
        setSelectedLabel(null);
      }
    }, [activeValue, children]);

    // Handle Click Outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen]);

    const handleSelectOption = (itemValue: string, itemLabel: React.ReactNode) => {
      if (!isControlled) {
        setInternalValue(itemValue);
      }
      setSelectedLabel(itemLabel);
      onValueChange?.(itemValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
      }
    };

    return (
      <SelectContext.Provider
        value={{
          selectedValue: activeValue,
          onSelectOption: handleSelectOption,
          size: size || "md",
        }}
      >
        <div
          ref={containerRef}
          className={cn(
            "relative flex w-full flex-col gap-1.5",
            isOpen ? "z-40" : "z-0",
            className
          )}
          {...props}
        >
          {/* Hidden Form Input for Native Form Integration */}
          {name && <input type="hidden" name={name} value={activeValue} disabled={disabled} />}

          {/* Optional Form Label */}
          {label && (
            <label
              htmlFor={selectId}
              className="flex items-center justify-between text-xs font-semibold text-zinc-800 select-none dark:text-zinc-200"
            >
              <span>{label}</span>
            </label>
          )}

          {/* Trigger Button */}
          <div className="relative w-full">
            <button
              id={selectId}
              ref={triggerRef}
              type="button"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-disabled={disabled}
              aria-invalid={isInvalid}
              disabled={disabled}
              onClick={handleToggle}
              className={cn(
                selectTriggerVariants({
                  variant,
                  size,
                  radius,
                  isInvalid,
                })
              )}
            >
              <span
                className={cn(
                  "block flex-1 truncate",
                  !selectedLabel && "font-normal text-zinc-400 dark:text-zinc-500"
                )}
              >
                {selectedLabel || placeholder}
              </span>

              <ChevronDown
                className={cn(
                  "shrink-0 text-zinc-400 transition-transform duration-200 dark:text-zinc-500",
                  size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
                  isOpen && "rotate-180 text-zinc-700 dark:text-zinc-200"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown List Overlay */}
            {isOpen && (
              <div
                role="listbox"
                tabIndex={-1}
                className="animate-in fade-in-0 zoom-in-95 absolute right-0 left-0 z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-zinc-200/60 bg-white p-1.5 shadow-xl duration-100 outline-none dark:border-zinc-800 dark:bg-zinc-900"
              >
                {children}
              </div>
            )}
          </div>

          {/* Description or Error Message */}
          {isInvalid && errorMessage ? (
            <p className="text-xs font-medium text-rose-500 dark:text-rose-400">{errorMessage}</p>
          ) : description ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
          ) : null}
        </div>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = "Select";

// --- Sub-component: SelectItem ---
export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, disabled = false, children, icon, className, ...props }, ref) => {
    const { selectedValue, onSelectOption, size } = useSelectContext();
    const isSelected = selectedValue === value;

    const handleClick = () => {
      if (!disabled) {
        onSelectOption(value, children);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        onSelectOption(value, children);
      }
    };

    return (
      <div
        ref={ref}
        role="option"
        tabIndex={disabled ? -1 : 0}
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex cursor-pointer items-center justify-between rounded-xl transition-all outline-none select-none",
          size === "sm"
            ? "px-2.5 py-1.5 text-xs"
            : size === "lg"
              ? "px-3.5 py-2.5 text-base"
              : "px-3 py-2 text-sm",
          "hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:hover:bg-zinc-800/80 dark:focus-visible:bg-zinc-800/80",
          isSelected
            ? "bg-indigo-50/70 font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
            : "font-normal text-zinc-700 dark:text-zinc-200",
          disabled &&
            "cursor-not-allowed text-zinc-400 opacity-40 hover:bg-transparent dark:hover:bg-transparent",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 truncate">
          {icon && <span className="shrink-0 text-zinc-500">{icon}</span>}
          <span className="truncate">{children}</span>
        </div>

        {isSelected && (
          <Check className="ml-2 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
        )}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";
