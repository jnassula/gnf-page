import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
        secondary:
          "bg-surface text-foreground border border-border hover:bg-surface-sunken hover:border-border-strong",
        ghost: "bg-transparent text-foreground hover:bg-surface-sunken",
        soft: "bg-primary-soft text-primary hover:bg-primary-soft-hover",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-surface-sunken",
        inverse:
          "bg-surface-inverse text-foreground-inverse hover:bg-ink-800 shadow-[var(--shadow-md)]",
      },
      size: {
        sm: "h-8 px-3 text-[13px] rounded-[var(--radius-sm)]",
        md: "h-10 px-4 text-sm rounded-[var(--radius-md)]",
        lg: "h-12 px-6 text-[15px] rounded-[var(--radius-md)]",
        xl: "h-14 px-7 text-base rounded-[var(--radius-lg)]",
        icon: "h-10 w-10 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
