import React from "react";
import { cn } from "../../../lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, variant = "light", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/20 shadow-lg backdrop-blur-md transition-all duration-300",
          variant === "light"
            ? "bg-white/10 hover:bg-white/20 text-slate-800"
            : "bg-slate-900/40 hover:bg-slate-900/50 text-white border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
