import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-bg hover:bg-white active:scale-[0.98] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]",
        metallic:
          "text-bg font-semibold bg-[linear-gradient(180deg,#ffffff,#cfcfcf_55%,#9a9a9a)] hover:bg-[linear-gradient(180deg,#ffffff,#dcdcdc_55%,#b0b0b0)] active:scale-[0.98]",
        outline:
          "border border-border-strong text-foreground hover:border-silver hover:bg-surface active:scale-[0.98]",
        ghost: "text-muted hover:text-foreground hover:bg-surface",
        whatsapp:
          "bg-[#0e7c3a] text-white hover:bg-[#11924a] active:scale-[0.98]",
        danger: "bg-danger text-white hover:bg-red-500 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
