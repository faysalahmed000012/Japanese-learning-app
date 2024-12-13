import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
interface DashboardShellProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
}
