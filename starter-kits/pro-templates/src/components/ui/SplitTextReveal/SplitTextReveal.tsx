// packages/core/src/components/SplitTextReveal/SplitTextReveal.tsx
"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export type SplitTextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
export type SplitTextBy = "words" | "characters";

export interface SplitTextRevealProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: SplitTextElement;
  by?: SplitTextBy;
  baseOpacity?: number;
  highlightColor?: string;
  scrollOffset?: [string, string];
  classNames?: {
    root?: string;
    token?: string;
  };
}

interface TokenRevealProps {
  token: string;
  progress: any;
  range: [number, number];
  baseOpacity: number;
  isReducedMotion: boolean | null;
  className?: string;
}

function TokenReveal({
  token,
  progress,
  range,
  baseOpacity,
  isReducedMotion,
  className,
}: TokenRevealProps) {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);

  if (isReducedMotion) {
    return <span className={cn("inline-block", className)}>{token}</span>;
  }

  return (
    <motion.span
      style={{ opacity }}
      className={cn("inline-block will-change-[opacity]", className)}
    >
      {token}
    </motion.span>
  );
}

export const SplitTextReveal = React.forwardRef<HTMLElement, SplitTextRevealProps>(
  (
    {
      text,
      as: Tag = "h2",
      by = "words",
      baseOpacity = 0.2,
      scrollOffset = ["start 0.85", "end 0.35"],
      className,
      classNames,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current as HTMLElement);

    const isReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
      target: internalRef,
      offset: scrollOffset as any,
    });

    const tokens = React.useMemo(() => {
      if (by === "characters") {
        return text.split("");
      }
      return text.split(" ");
    }, [text, by]);

    const total = tokens.length;

    return React.createElement(
      Tag,
      {
        ref: internalRef,
        className: cn(
          "inline-block flex-wrap font-display tracking-tight leading-[1.08] select-none",
          classNames?.root,
          className
        ),
        ...props,
      },
      tokens.map((token, index) => {
        // Calculate progressive reveal segment for each word or character
        const start = index / total;
        const end = Math.min(1, (index + 1) / total);

        return (
          <React.Fragment key={`${token}-${index}`}>
            <TokenReveal
              token={token}
              progress={scrollYProgress}
              range={[start, end]}
              baseOpacity={baseOpacity}
              isReducedMotion={isReducedMotion}
              className={classNames?.token}
            />
            {by === "words" && index < total - 1 ? " " : null}
          </React.Fragment>
        );
      })
    );
  }
);

SplitTextReveal.displayName = "SplitTextReveal";
