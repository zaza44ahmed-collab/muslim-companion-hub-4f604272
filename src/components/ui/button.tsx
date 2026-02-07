import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.3)] border border-secondary/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        islamic: "bg-gradient-to-r from-[hsl(158,64%,32%)] via-[hsl(174,62%,35%)] to-[hsl(158,70%,22%)] text-[hsl(40,30%,97%)] shadow-[0_4px_20px_-4px_hsl(158,64%,32%,0.4)] hover:shadow-lg hover:scale-[1.02]",
        gold: "bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,65%)] text-[hsl(160,30%,15%)] shadow-md hover:shadow-lg hover:scale-[1.02]",
        iconPrimary: "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl",
        iconGold: "bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-2xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
        iconLg: "h-14 w-14",
        iconXl: "h-20 w-20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
