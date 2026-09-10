// packages/core/src/components/ComboBox/ComboBox.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export interface ComboBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type ComboBoxVariant = "bordered" | "flat";
export type ComboBoxSize = "sm" | "md" | "lg";

const comboBoxInputVariants = cva(
  "w-full rounded-xl transition-all duration-150 font-normal outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        bordered:
          "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus-within:border-indigo-600 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-2xs",
        flat: "bg-zinc-100 dark:bg-zinc-800/80 border border-transparent hover:bg-zinc-200/70 dark:hover:bg-zinc-800 focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:border-indigo-600 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20",
      },
      size: {
        sm: "min-h-8 text-xs py-1 px-2.5",
        md: "min-h-10 text-sm py-1.5 px-3",
        lg: "min-h-12 text-base py-2 px-3.5",
      },
      isInvalid: {
        true: "!border-rose-500 !ring-rose-500/20 dark:!border-rose-400",
        false: "",
      },
    },
    defaultVariants: {
      variant: "bordered",
      size: "md",
      isInvalid: false,
    },
  }
);

export interface ComboBoxProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof comboBoxInputVariants> {
  options: ComboBoxOption[];
  /** Single selection value (when isMulti is false) */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;

  /** Multi-selection values (when isMulti is true) */
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;

  /** Multi-select mode */
  isMulti?: boolean;

  placeholder?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  disabled?: boolean;
  emptyMessage?: string;
  isClearable?: boolean;
}

const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  (
    {
      className,
      options = [],
      value,
      defaultValue,
      onValueChange,
      values,
      defaultValues,
      onValuesChange,
      isMulti = false,
      placeholder = "Select or search...",
      label,
      description,
      errorMessage,
      variant = "bordered",
      size = "md",
      isInvalid = false,
      disabled = false,
      emptyMessage = "No results found.",
      isClearable = true,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // Controlled or uncontrolled state for single selection
    const [selectedSingle, setSelectedSingle] = React.useState<string>(defaultValue ?? "");
    const currentSingle = value !== undefined ? value : selectedSingle;

    // Controlled or uncontrolled state for multi selection
    const [selectedMulti, setSelectedMulti] = React.useState<string[]>(defaultValues ?? []);
    const currentMulti = values !== undefined ? values : selectedMulti;

    // Active single option label
    const activeSingleOption = options.find((opt) => opt.value === currentSingle);

    // Search query and open states
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState(
      !isMulti && activeSingleOption ? activeSingleOption.label : ""
    );

    // Sync input text when external single value changes
    React.useEffect(() => {
      if (!isMulti) {
        if (activeSingleOption) {
          setSearchQuery(activeSingleOption.label);
        } else if (!currentSingle) {
          setSearchQuery("");
        }
      }
    }, [currentSingle, activeSingleOption, isMulti]);

    // Handle outside click
    React.useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          if (!isMulti) {
            if (activeSingleOption) {
              setSearchQuery(activeSingleOption.label);
            } else {
              setSearchQuery("");
            }
          } else {
            setSearchQuery("");
          }
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [activeSingleOption, isMulti]);

    // Filtered options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) {
        return options;
      }
      if (!isMulti && activeSingleOption && searchQuery === activeSingleOption.label) {
        return options;
      }
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }, [options, searchQuery, activeSingleOption, isMulti]);

    const handleSelectOption = (opt: ComboBoxOption) => {
      if (opt.disabled) return;

      if (isMulti) {
        const isAlreadySelected = currentMulti.includes(opt.value);
        const newValues = isAlreadySelected
          ? currentMulti.filter((v) => v !== opt.value)
          : [...currentMulti, opt.value];

        if (values === undefined) {
          setSelectedMulti(newValues);
        }
        onValuesChange?.(newValues);
        setSearchQuery("");
        inputRef.current?.focus();
      } else {
        if (value === undefined) {
          setSelectedSingle(opt.value);
        }
        setSearchQuery(opt.label);
        onValueChange?.(opt.value);
        setIsOpen(false);
      }
    };

    const handleRemoveTag = (valToRemove: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      const newValues = currentMulti.filter((v) => v !== valToRemove);
      if (values === undefined) {
        setSelectedMulti(newValues);
      }
      onValuesChange?.(newValues);
      inputRef.current?.focus();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMulti) {
        if (values === undefined) {
          setSelectedMulti([]);
        }
        onValuesChange?.([]);
      } else {
        if (value === undefined) {
          setSelectedSingle("");
        }
        onValueChange?.("");
      }
      setSearchQuery("");
      inputRef.current?.focus();
    };

    const hasSelection = isMulti ? currentMulti.length > 0 : Boolean(currentSingle || searchQuery);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("relative flex w-full flex-col gap-1.5", className)}
        {...props}
      >
        {/* Label */}
        {label && (
          <label className="text-sm font-medium text-zinc-800 select-none dark:text-zinc-200">
            {label}
          </label>
        )}

        {/* Input Wrapper Box */}
        <div
          className={cn(
            "relative flex w-full cursor-text flex-wrap items-center gap-1.5 pr-16",
            comboBoxInputVariants({ variant, size, isInvalid }),
            disabled && "cursor-not-allowed bg-zinc-50 opacity-50 dark:bg-zinc-900"
          )}
          onClick={() => {
            if (!disabled) {
              setIsOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          {/* Multi-Select Chips */}
          {isMulti &&
            currentMulti.map((val) => {
              const opt = options.find((o) => o.value === val);
              const label = opt ? opt.label : val;
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-200/80 bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 transition-colors select-none dark:border-zinc-700/80 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  <span className="max-w-[120px] truncate">{label}</span>
                  {!disabled && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => handleRemoveTag(val, e)}
                      className="rounded-sm p-0.5 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
                      aria-label={`Remove ${label}`}
                    >
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  )}
                </span>
              );
            })}

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            placeholder={isMulti && currentMulti.length > 0 ? "" : placeholder}
            disabled={disabled}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="min-w-[80px] flex-1 bg-transparent py-0.5 text-inherit outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />

          {/* Action Buttons (Clear & Chevron) */}
          <div className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center gap-1 text-zinc-400 dark:text-zinc-500">
            {isClearable && hasSelection && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                aria-label="Clear selection"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}

            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) {
                  setIsOpen(!isOpen);
                  if (!isOpen) inputRef.current?.focus();
                }
              }}
              className="rounded-md p-1 text-zinc-400 transition-transform duration-200 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Toggle dropdown"
            >
              <svg
                className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating Dropdown Overlay */}
        {isOpen && !disabled && (
          <div className="animate-in fade-in-0 zoom-in-95 absolute top-full left-0 z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-zinc-200/80 bg-white p-1.5 shadow-xl backdrop-blur-md duration-150 dark:border-zinc-800 dark:bg-zinc-900">
            {filteredOptions.length > 0 ? (
              <ul className="space-y-0.5" role="listbox">
                {filteredOptions.map((opt) => {
                  const isSelected = isMulti
                    ? currentMulti.includes(opt.value)
                    : opt.value === currentSingle;

                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectOption(opt)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-150 select-none",
                        isSelected
                          ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800/80",
                        opt.disabled && "pointer-events-none cursor-not-allowed opacity-40"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <svg
                          className="ml-2 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-3 py-4 text-center text-xs text-zinc-500 select-none dark:text-zinc-400">
                {emptyMessage}
              </div>
            )}
          </div>
        )}

        {/* Description & Error Message */}
        {description && !errorMessage && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
        )}
        {errorMessage && (
          <span className="text-xs font-medium text-rose-500 dark:text-rose-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

ComboBox.displayName = "ComboBox";

export { ComboBox, comboBoxInputVariants };
