import { cn } from "@/lib/utils";

type PillBadgeProps = {
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function PillBadge({ icon, className, children }: PillBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-pill outline outline-1 -outline-offset-1 outline-edge",
        "inline-flex items-center gap-3.5 py-2 pr-2.5 pl-5",
        "text-fg text-sm",
        className,
      )}
    >
      <span>{children}</span>
      {icon ? (
        <span className="rounded-pill bg-chip flex h-9 w-9 items-center justify-center">
          {icon}
        </span>
      ) : null}
    </span>
  );
}
