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
        flat: "bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        bordered:
          "bg-transparent border border-border text-foreground hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
        true: "border-rose-600! focus-visible:ring-rose-600!",
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
              className="text-foreground flex items-center justify-between text-xs font-semibold select-none"
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
                  !selectedLabel && "text-muted-foreground font-normal"
                )}
              >
                {selectedLabel || placeholder}
              </span>

              <ChevronDown
                className={cn(
                  "text-muted-foreground shrink-0 transition-transform duration-200",
                  size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
                  isOpen && "text-foreground rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown List Overlay */}
            {isOpen && (
              <div
                role="listbox"
                tabIndex={-1}
                className="animate-in fade-in-0 zoom-in-95 border-border/60 bg-popover text-popover-foreground absolute right-0 left-0 z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border p-1.5 shadow-xl duration-100 outline-none"
              >
                {children}
              </div>
            )}
          </div>

          {/* Description or Error Message */}
          {isInvalid && errorMessage ? (
            <p className="text-xs font-medium text-rose-600">{errorMessage}</p>
          ) : description ? (
            <p className="text-muted-foreground text-xs">{description}</p>
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
          "hover:bg-accent focus-visible:bg-accent hover:text-accent-foreground focus-visible:text-accent-foreground",
          isSelected
            ? "bg-accent text-accent-foreground font-semibold"
            : "text-popover-foreground font-normal",
          disabled &&
            "text-muted-foreground cursor-not-allowed opacity-40 hover:bg-transparent dark:hover:bg-transparent",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 truncate">
          {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
          <span className="truncate">{children}</span>
        </div>

        {isSelected && <Check className="text-foreground ml-2 h-4 w-4 shrink-0" />}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";
