import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textVariants = cva("text-zinc-600 dark:text-zinc-400", {
  variants: {
    variant: {
      default: "text-base/6 sm:text-sm/6",
      strong: "font-semibold text-zinc-900 dark:text-white",
      muted: "text-sm text-zinc-500 dark:text-zinc-400",
      small: "text-sm/6 sm:text-xs/6",
      code: "font-mono text-sm/6 sm:text-xs/6 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        // @ts-ignore - Polymorphic component ref assignment
        ref={ref as any}
        // @ts-ignore
        className={cn(textVariants({ variant }), className)}
        {...(props as any)}
      />
    );
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

export { Text, Strong, Code, textVariants };
