import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3.5 py-2 text-sm text-foreground",
        "placeholder:text-foreground-subtle",
        "transition-[border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
        "focus-visible:outline-none focus-visible:border-border-focus focus-visible:ring-4 focus-visible:ring-[var(--ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-24 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground",
      "placeholder:text-foreground-subtle",
      "transition-[border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
      "focus-visible:outline-none focus-visible:border-border-focus focus-visible:ring-4 focus-visible:ring-[var(--ring)]",
      "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Input, Textarea };
