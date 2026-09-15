import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { useGlassPanel } from "../GlassPanelContext";
import { cn } from "./utils";

/* ── shadcn buttonVariants (used by alert-dialog, calendar, etc.) ── */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/* ── Glassmorphic Button (primary export used across the site) ── */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, asChild = false, children, ...props }, ref) => {
    const glassPanel = useGlassPanel();
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:opacity-50",
          // Glass panel mode: all buttons get glassmorphic treatment
          glassPanel
            ? {
                "bg-sky-500/40 backdrop-blur-xl text-white border border-sky-300/25 shadow-[0_4px_24px_-4px_rgba(14,165,233,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset,0_1px_0_rgba(255,255,255,0.22)_inset,0_0_40px_-8px_rgba(14,165,233,0.15)] hover:bg-sky-500/55 hover:shadow-[0_8px_40px_-4px_rgba(14,165,233,0.55),0_0_0_1px_rgba(255,255,255,0.08)_inset,0_1px_0_rgba(255,255,255,0.28)_inset,0_0_60px_-8px_rgba(14,165,233,0.25)] hover:border-sky-300/35":
                  variant === "primary",
                "bg-white/15 backdrop-blur-xl text-slate-800 border border-white/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-white/25":
                  variant === "secondary",
                "bg-white/10 backdrop-blur-xl border border-white/30 text-slate-800 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-white/20":
                  variant === "outline",
                "bg-white/5 backdrop-blur-md text-slate-700 hover:bg-white/15 hover:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]":
                  variant === "ghost",
                "bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-white/30 hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]":
                  variant === "glass",
                "h-9 px-4 text-sm": size === "sm",
                "h-11 px-8 text-base": size === "md",
                "h-14 px-10 text-lg": size === "lg",
              }
            : {
                "bg-sky-600/80 backdrop-blur-lg text-white border border-sky-400/20 shadow-[0_4px_24px_-6px_rgba(14,165,233,0.45),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_1px_0_rgba(255,255,255,0.15)_inset] hover:bg-sky-600/90 hover:shadow-[0_8px_32px_-4px_rgba(14,165,233,0.5),0_0_0_1px_rgba(255,255,255,0.08)_inset,0_1px_0_rgba(255,255,255,0.2)_inset] hover:border-sky-400/30": variant === "primary",
                "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
                "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900": variant === "outline",
                "hover:bg-slate-100 text-slate-700": variant === "ghost",
                "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30": variant === "glass",
                "h-9 px-4 text-sm": size === "sm",
                "h-11 px-8 text-base": size === "md",
                "h-14 px-10 text-lg": size === "lg",
              },
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
