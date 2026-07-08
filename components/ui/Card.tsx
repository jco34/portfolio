import { cn } from "@/lib/utils";

type CardProps = {
  variant?: "outline" | "solid" | "panel";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  outline: "rounded-card outline outline-1 -outline-offset-1 outline-edge",
  solid: "rounded-card bg-surface",
  panel: "rounded-panel bg-surface-2 outline outline-1 -outline-offset-1 outline-edge",
} as const;

export function Card({ variant = "solid", className, children }: CardProps) {
  return (
    <div className={cn("min-w-0", variantClasses[variant], className)}>
      {children}
    </div>
  );
}
