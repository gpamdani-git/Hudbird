// packages/core/src/components/Form/Form.tsx
"use client";

import * as React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/cn";
import { Slot } from "../Slot";

// ----------------------------------------------------
// Form Contexts
// ----------------------------------------------------

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

// ----------------------------------------------------
// useFormField Hook
// ----------------------------------------------------

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// ----------------------------------------------------
// FormField
// ----------------------------------------------------

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// ----------------------------------------------------
// FormItem
// ----------------------------------------------------

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("w-full space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = "FormItem";

// ----------------------------------------------------
// FormLabel
// ----------------------------------------------------

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        className={cn(
          "text-foreground text-sm leading-none font-medium select-none",
          error && "text-rose-600 dark:text-rose-500",
          className
        )}
        {...props}
      />
    );
  }
);

FormLabel.displayName = "FormLabel";

// ----------------------------------------------------
// FormControl
// ----------------------------------------------------

export interface FormControlProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const FormControl = React.forwardRef<HTMLElement, FormControlProps>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

// ----------------------------------------------------
// FormDescription
// ----------------------------------------------------

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-muted-foreground text-xs", className)}
        {...props}
      />
    );
  }
);

FormDescription.displayName = "FormDescription";

// ----------------------------------------------------
// FormMessage
// ----------------------------------------------------

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(
          "animate-in fade-in-0 text-xs font-medium text-rose-600 duration-150 dark:text-rose-500",
          className
        )}
        {...props}
      >
        {body}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

export { Form };
