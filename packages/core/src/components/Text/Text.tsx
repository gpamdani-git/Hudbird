import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textVariants = cva("text-zinc-700 dark:text-[#E5E5E5]", {
  variants: {
    variant: {
      default: "text-[16px] leading-[1.7] tracking-[-0.1px]",
      prose: "text-[16px] leading-[1.7] tracking-[-0.1px] max-w-[65ch]",
      lead: "text-lg sm:text-xl leading-[1.625] text-zinc-600 dark:text-zinc-400 max-w-3xl font-normal tracking-[-0.2px]",
      eyebrow:
        "text-xs font-bold uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-400 select-none",
      strong: "font-semibold text-zinc-950 dark:text-white",
      muted: "text-sm text-zinc-500 dark:text-zinc-400 leading-normal",
      small: "text-xs/5 text-zinc-500 dark:text-zinc-400",
      code: "font-mono text-[13px] leading-5 text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-[#202124] border border-black/[0.04] dark:border-white/[0.08] rounded-md px-1.5 py-0.5 tracking-tight",
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
