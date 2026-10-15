// packages/core/src/components/Slot/Slot.tsx
import * as React from "react";
import { cn } from "@/lib/cn";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, className, style, ...slotProps } = props;

  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const childProps = child.props || {};

    // Combine event handlers
    const mergedProps: Record<string, any> = { ...slotProps, ...childProps };

    // Combine className
    if (className || childProps.className) {
      mergedProps.className = cn(className, childProps.className);
    }

    // Combine style
    if (style || childProps.style) {
      mergedProps.style = { ...style, ...childProps.style };
    }

    // Combine event handlers (e.g. onClick)
    Object.keys(slotProps).forEach((propName) => {
      if (propName.startsWith("on") && typeof (slotProps as any)[propName] === "function") {
        const slotHandler = (slotProps as any)[propName];
        const childHandler = childProps[propName];

        mergedProps[propName] = (...args: any[]) => {
          childHandler?.(...args);
          slotHandler?.(...args);
        };
      }
    });

    // Merge refs safely across React 18 and 19
    const isReact19 = typeof React.version === "string" && React.version.startsWith("19");
    const childRef = isReact19 ? childProps.ref : ((child as any).ref ?? childProps.ref);

    if (forwardedRef || childRef) {
      mergedProps.ref = mergeRefs(forwardedRef, childRef);
    }

    return React.cloneElement(child, mergedProps);
  }

  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }

  return null;
});

Slot.displayName = "Slot";

export const Slottable: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

function mergeRefs<T = any>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}
