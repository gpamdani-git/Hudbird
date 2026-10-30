import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textVariants = cva("text-zinc-700 dark:text-[#E5E5E5]", {
  variants: {
    variant: {
      default: "text-[16px] leading-[1.7] tracking-[-0.16px]",
      prose: "text-[16px] leading-[1.7] tracking-[-0.16px] max-w-[65ch]",
      lead: "text-lg sm:text-xl leading-[1.625] text-zinc-600 dark:text-[#828282] max-w-3xl",
      eyebrow:
        "text-[14px] font-extrabold uppercase tracking-[1.4px] leading-5 text-pink-600 dark:text-[#FFB1EE]",
      strong: "font-semibold text-zinc-900 dark:text-white",
      muted: "text-sm text-zinc-500 dark:text-[#828282]",
      small: "text-sm/6 sm:text-xs/6 text-zinc-600 dark:text-zinc-400",
      code: "font-mono text-[13.6px] leading-5 text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-[#323232] rounded px-1.5 py-0.5 tracking-[-0.01em]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TextProps
  extends
    React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as: Component = "p", ...props }, ref) => {
    const Comp = Component as any;
    return <Comp ref={ref} className={cn(textVariants({ variant }), className)} {...props} />;
  }
);
Text.displayName = "Text";

const Strong = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="strong" variant="strong" className={className} {...props} />;
  }
);
Strong.displayName = "Strong";

const Code = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="code" variant="code" className={className} {...props} />;
  }
);
Code.displayName = "Code";

const Eyebrow = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="div" variant="eyebrow" className={className} {...props} />;
  }
);
Eyebrow.displayName = "Eyebrow";

const Lead = React.forwardRef<HTMLElement, Omit<TextProps, "variant" | "as">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} as="p" variant="lead" className={className} {...props} />;
  }
);
Lead.displayName = "Lead";

export { Text, Strong, Code, Eyebrow, Lead, textVariants };
