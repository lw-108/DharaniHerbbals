import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual variant of the badge.
   * @default "default"
   */
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors";
    const variants: Record<string, string> = {
      default: "border-transparent bg-primary text-primary-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
      outline: "border-input bg-background text-foreground",
      destructive: "border-transparent bg-destructive text-destructive-foreground",
    };
    return (
      <div
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
