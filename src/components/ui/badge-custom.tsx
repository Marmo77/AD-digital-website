import { cn } from "@/src/lib/utils";
import { ReactNode } from "react";

export function BadgeCustom({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 backdrop-blur-sm",
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="text-xs font-semibold tracking-wide uppercase text-foreground">{children}</span>
    </div>
  );
}
